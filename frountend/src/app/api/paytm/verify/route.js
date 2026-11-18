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
        const body = { mid, orderId };

        // 🔹 Step 2: Generate checksum
        const checksum = await PaytmChecksum.generateSignature(
            JSON.stringify(body),
            merchantKey
        );

        const postData = JSON.stringify({
            body,
            head: { signature: checksum },
        });

        // 🔹 Step 3: Call Paytm API
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

        // 🔥 SUCCESS CASE
        // 🔥 SUCCESS CASE
        if (result?.resultStatus === "TXN_SUCCESS") {
            const paymentInfo = {
                txnId: txn.txnId,
                bankTxnId: txn.bankTxnId,
                txnAmount: txn.txnAmount,
                txnDate: txn.txnDate,
            };

            const updated = await Bookings.findOneAndUpdate(
                {
                    orderId,
                    $or: [
                        { capacityManaged: { $ne: true } },
                        { paid: true },
                        { capacitySeat: { $type: "number" } },
                    ],
                },
                {
                    $set: {
                        paid: true,
                        paymentStatus: "SUCCESS",
                        paymentInfo,
                    },
                    $unset: {
                        reservationExpiresAt: "",
                    },
                },
                { new: true }
            );

            if (!updated) {
                const expiredBooking = await Bookings.findOne({
                    orderId,
                    capacityManaged: true,
                });

                if (expiredBooking) {
                    await Bookings.updateOne(
                        { orderId, paid: { $ne: true } },
                        {
                            $set: {
                                paid: false,
                                paymentStatus: "CAPACITY_CONFLICT",
                                paymentInfo,
                            },
                            $unset: {
                                capacitySeat: "",
                                reservationExpiresAt: "",
                            },
                        },
                    );

                    return Response.json(
                        {
                            success: false,
                            status: "CAPACITY_CONFLICT",
                            message:
                                "Payment succeeded after the slot hold expired. Contact the clinic.",
                        },
                        { status: 409 }
                    );
                }

                return Response.json(
                    { success: false, message: "Booking not found" },
                    { status: 404 }
                );
            }

            // =========================
            // 📧 EMAIL (already yours)
            // =========================
            if (updated.email && !updated.emailSent) {
                try {
                    const emailRes = await fetch(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/api/send-confirmation-email`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: updated.email,
                                name: updated.name,
                                doctor: updated.doctor,
                                date: updated.date,
                                time: updated.time,
                                orderId: updated.orderId,
                                amount: updated.amount,
                            }),
                        }
                    );

                    if (emailRes.ok) {
                        await Bookings.updateOne(
                            { orderId },
                            { $set: { emailSent: true } }
                        );
                    }
                } catch (err) {
                    console.error("❌ Email error:", err);
                }
            }

            // =========================
            // 📲 WHATSAPP (NEW)
            // =========================
            // if (updated.phone && !updated.whatsappSent) {
            //     try {
            //         const waRes = await fetch(
            //             `${process.env.NEXT_PUBLIC_BASE_URL}/api/whatsapp/send`,
            //             {
            //                 method: "POST",
            //                 headers: {
            //                     "Content-Type": "application/json",
            //                 },
            //                 body: JSON.stringify({
            //                     to: updated.phone,
            //                     template: "booking_confirmation_2",
            //                     params: [
            //                         updated.name || "Customer",
            //                         updated.date || "",
            //                         updated.time || "",
            //                         updated.service || "Consultation",
            //                     ],
            //                 }),
            //             }
            //         );

            //         if (waRes.ok) {
            //             await Bookings.updateOne(
            //                 { orderId },
            //                 { $set: { whatsappSent: true } }
            //             );
            //         } else {
            //             console.error("❌ WhatsApp API failed");
            //         }
            //     } catch (err) {
            //         console.error("❌ WhatsApp error:", err);
            //     }
            // }

            return Response.json({
                success: true,
                status: "SUCCESS",
                message: "Payment verified, email sent",
                booking: updated,
            });
        }

        // ❌ FAILED / PENDING
        const isPending = result?.resultStatus === "PENDING";
        const failedPaymentUpdate = {
            $set: {
                paid: false,
                paymentStatus: isPending ? "PENDING" : "FAILED",
            },
        };

        if (!isPending) {
            failedPaymentUpdate.$unset = {
                capacitySeat: "",
                reservationExpiresAt: "",
            };
        }

        await Bookings.findOneAndUpdate({ orderId }, failedPaymentUpdate);

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