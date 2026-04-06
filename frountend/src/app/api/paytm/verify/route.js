import PaytmChecksum from "paytmchecksum";
import https from "https";
import { connectDB } from "@/lib/mongodb";
import Bookings from "@/models/Bookings";

export async function POST(req) {
    try {
        const { orderId } = await req.json();

        if (!orderId) {
            return Response.json(
                { success: false, message: "Order ID is required" },
                { status: 400 }
            );
        }

        const mid = process.env.PAYTM_MID;
        const merchantKey = process.env.PAYTM_MERCHANT_KEY;

        if (!mid || !merchantKey) {
            return Response.json(
                { success: false, message: "Missing Paytm credentials" },
                { status: 500 }
            );
        }

        // 🔹 Step 1: Create request body
        const body = {
            mid,
            orderId,
        };

        // 🔹 Step 2: Generate checksum
        const checksum = await PaytmChecksum.generateSignature(
            JSON.stringify(body),
            merchantKey
        );

        const postData = JSON.stringify({
            body,
            head: {
                signature: checksum,
            },
        });

        // 🔹 Step 3: Call Paytm status API
        const paytmRes = await new Promise((resolve, reject) => {
            const options = {
                hostname: "secure.paytmpayments.com",
                path: "/v3/order/status",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": postData.length,
                },
            };

            const request = https.request(options, (res) => {
                let data = "";

                res.on("data", (chunk) => {
                    data += chunk;
                });

                res.on("end", () => {
                    try {
                        resolve(JSON.parse(data));
                    } catch (err) {
                        reject(err);
                    }
                });
            });

            request.on("error", reject);
            request.write(postData);
            request.end();
        });

        const result = paytmRes?.body?.resultInfo;
        const txn = paytmRes?.body;


        await connectDB();

        // 🔥 Step 4: Handle SUCCESS
        if (result?.resultStatus === "TXN_SUCCESS") {
            const updated = await Bookings.findOneAndUpdate(
                { orderId },
                {
                    $set: {
                        paid: true,
                        paymentStatus: "SUCCESS",
                        paymentInfo: {
                            txnId: txn.txnId,
                            bankTxnId: txn.bankTxnId,
                            txnAmount: txn.txnAmount,
                            txnDate: txn.txnDate,
                        },
                    },
                },
                { new: true }
            );

            return Response.json({
                success: true,
                status: "SUCCESS",
                booking: updated,
            });
        }

        // ❌ FAILED / PENDING
        await Bookings.findOneAndUpdate(
            { orderId },
            {
                $set: {
                    paid: false,
                    paymentStatus: result?.resultStatus || "FAILED",
                },
            }
        );

        return Response.json({
            success: false,
            status: result?.resultStatus,
            message: result?.resultMsg,
        });

    } catch (err) {
        console.error("🔥 Verify API error:", err);

        return Response.json(
            { success: false, message: err.message },
            { status: 500 }
        );
    }
}