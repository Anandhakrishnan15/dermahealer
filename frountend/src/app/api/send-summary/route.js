// app/api/send-summary/route.js (Next.js 13+ App Router)
import { sendDailyBookingSummary } from "../bookings-summary/route";
export async function POST(req) {
    try {
        await sendDailyBookingSummary();
        return new Response(JSON.stringify({ success: true, message: "Booking summary sent successfully!" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("❌ Error sending booking summary:", err);
        return new Response(JSON.stringify({ success: false, error: err.message || "Server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
