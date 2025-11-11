import PaytmChecksum from "paytmchecksum";
import Bookings from "@/models/Bookings";
import { connectDB } from "@/lib/mongodb";

export async function POST(req) {
    try {
        // 1️⃣ Parse the Paytm callback form data
        const formData = await req.formData();
        const body = Object.fromEntries(formData);

        console.log("📩 Paytm Callback Data Received:", body);

        // 2️⃣ Extract and remove checksum
        const paytmChecksum = body.CHECKSUMHASH;
        delete body.CHECKSUMHASH;

        // 3️⃣ Verify checksum
        const isValid = PaytmChecksum.verifySignature(
            body,
            process.env.PAYTM_MERCHANT_KEY,
            paytmChecksum
        );

        if (!isValid) {
            console.error("❌ Invalid Paytm checksum for order:", body.ORDERID);
            return Response.redirect(
                `${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed?reason=checksum-error`,
                302
            );
        }

        // 4️⃣ Check transaction status
        if (body.STATUS === "TXN_SUCCESS") {
            console.log("✅ Payment success for order:", body.ORDERID);

            await connectDB();

            await Bookings.findOneAndUpdate(
                { orderId: body.ORDERID },
                {
                    $set: {
                        paid: true,
                        paymentInfo: {
                            txnId: body.TXNID,
                            bankTxnId: body.BANKTXNID,
                            bankName: body.BANKNAME,
                            gatewayName: body.GATEWAYNAME,
                            paymentMode: body.PAYMENTMODE,
                            txnAmount: body.TXNAMOUNT,
                            txnDate: body.TXNDATE,
                            respMsg: body.RESPMSG,
                        },
                    },
                },
                { new: true }
            );
            // 5️⃣ Redirect user to success page
            return Response.redirect(
                `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?orderId=${body.ORDERID}`,
                302
            );
        } else {
            console.error("❌ Payment failed:", body.RESPMSG);
            return Response.redirect(
                `${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed?reason=${encodeURIComponent(
                    body.RESPMSG || "Transaction failed"
                )}`,
                302
            );
        }
    } catch (err) {
        console.error("🔥 Callback handling error:", err);
        return Response.redirect(
            `${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed?reason=server-error`,
            302
        );
    }
}
