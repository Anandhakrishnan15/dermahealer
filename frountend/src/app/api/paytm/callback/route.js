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

            const paymentInfo = {
                txnId: body.TXNID,
                bankTxnId: body.BANKTXNID,
                bankName: body.BANKNAME,
                gatewayName: body.GATEWAYNAME,
                paymentMode: body.PAYMENTMODE,
                txnAmount: body.TXNAMOUNT,
                txnDate: body.TXNDATE,
                respMsg: body.RESPMSG,
            };

            // ✅ Get updated booking
            const booking = await Bookings.findOneAndUpdate(
                {
                    orderId: body.ORDERID,
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

            if (!booking) {
                const expiredBooking = await Bookings.findOne({
                    orderId: body.ORDERID,
                    capacityManaged: true,
                });

                if (expiredBooking) {
                    await Bookings.updateOne(
                        { orderId: body.ORDERID, paid: { $ne: true } },
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

                    return Response.redirect(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed?reason=${encodeURIComponent(
                            "Payment succeeded after the slot hold expired. Please contact the clinic.",
                        )}`,
                        302
                    );
                }

                return Response.redirect(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed?reason=booking-not-found`,
                    302
                );
            }

            // ✅ 🔥 Call WhatsApp API
            if (booking?.phone) {
                try {
                    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/whatsapp/send`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            to: booking.phone,
                            template: "appointment_confirmed",
                            params: [
                                booking.name || "Customer",
                                booking.doctor,
                                `${booking.date} at ${booking.time}`,
                                booking.service || "Consultation",
                                booking.orderId ||"NILL",
                            ],
                        }),
                    });
                } catch (err) {
                    console.error("WhatsApp send failed:", err);
                }
            }

            return Response.redirect(
                `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?orderId=${body.ORDERID}`,
                302
            );

        } else {
            if (body.STATUS === "TXN_FAILURE") {
                await connectDB();
                await Bookings.updateOne(
                    { orderId: body.ORDERID, paid: { $ne: true } },
                    {
                        $set: {
                            paid: false,
                            paymentStatus: "FAILED",
                        },
                        $unset: {
                            capacitySeat: "",
                            reservationExpiresAt: "",
                        },
                    },
                );
            }

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