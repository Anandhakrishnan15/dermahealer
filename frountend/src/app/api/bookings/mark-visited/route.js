import { connectDB } from "@/lib/mongodb";
import Bookings from "@/models/Bookings";
import { sendEmail } from "@/utils/sendEmail";

export async function POST(req) {
    try {
        await connectDB();

        const { orderId } = await req.json();

        if (!orderId) {
            return Response.json(
                { success: false, message: "Order ID required" },
                { status: 400 }
            );
        }

        // ✅ Find booking
        const booking = await Bookings.findOne({ orderId });

        if (!booking) {
            return Response.json(
                { success: false, message: "Booking not found" },
                { status: 404 }
            );
        }

        // ❌ Not paid
        if (!booking.paid) {
            return Response.json(
                { success: false, message: "Payment not completed" },
                { status: 400 }
            );
        }

        // ✅ Prevent duplicate action (🔥 IMPORTANT)
        if (booking.visited) {
            return Response.json({
                success: true,
                message: "Already marked as visited",
            });
        }

        // ✅ Atomic update (better than save)
        await Bookings.updateOne(
            { orderId },
            { $set: { visited: true } }
        );

        // ✅ Send email AFTER update
        if (booking.email) {
            const html = `
                <h2>Thank You ${booking.name} 🙏</h2>
                <p>We appreciate your visit.</p>
                <p>Hope you had a great experience with Dr. ${booking.doctor}.</p>
                <p>Looking forward to seeing you again!</p>
            `;

            try {
                await sendEmail({
                    to: booking.email,
                    subject: "Thank You for Your Visit 💙",
                    html,
                });
            } catch (emailErr) {
                console.error("Email failed:", emailErr);
                // ❗ Don't fail API if email fails
            }
        }

        return Response.json({
            success: true,
            message: "Marked as visited & email sent",
        });

    } catch (err) {
        return Response.json(
            { success: false, message: err.message },
            { status: 500 }
        );
    }
}