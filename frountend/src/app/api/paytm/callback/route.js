import PaytmChecksum from "paytmchecksum";
import Bookings from "@/models/Bookings";
import { connectDB } from "@/lib/mongodb";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const body = Object.fromEntries(formData);

        console.log("📩 Paytm Callback Data Received:", body);

        const paytmChecksum = body.CHECKSUMHASH;
        delete body.CHECKSUMHASH;

        const isValid = PaytmChecksum.verifySignature(
            body,
            process.env.PAYTM_MERCHANT_KEY,
            paytmChecksum
        );

        if (!isValid) {
            return Response.redirect(
                `${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed?reason=checksum-error`,
                302
            );
        }

        if (body.STATUS === "TXN_SUCCESS") {

            await connectDB();

            // ✅ Get updated booking
            const booking = await Bookings.findOneAndUpdate(
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

            // ✅ 🔥 Call WhatsApp API
            // if (booking?.phone) {
            //     try {
            //         await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/whatsapp/send`, {
            //             method: "POST",
            //             headers: {
            //                 "Content-Type": "application/json",
            //             },
            //             body: JSON.stringify({
            //                 to: booking.phone,
            //                 template: "booking_confirmation_2",
            //                 params: [
            //                     booking.name || "Customer",
            //                     booking.date || "",
            //                     booking.time || "",
            //                     booking.service || "Consultation",
            //                 ],
            //             }),
            //         });
            //     } catch (err) {
            //         console.error("WhatsApp send failed:", err);
            //     }
            // }

            return Response.redirect(
                `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?orderId=${body.ORDERID}`,
                302
            );

        } else {
            return Response.redirect(
                `${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed?reason=${encodeURIComponent(
                    body.RESPMSG || "Transaction failed"
                )}`,
                302
            );
        }

    } catch (err) {
        return Response.redirect(
            `${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed?reason=server-error`,
            302
        );
    }
}