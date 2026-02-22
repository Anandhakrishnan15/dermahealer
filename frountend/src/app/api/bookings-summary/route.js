import { connectDB } from "@/lib/mongodb";
import Bookings from "@/models/Bookings";
import { generateBookingSummaryHtml } from "@/utils/emailHtml";
import { sendEmail } from "@/utils/sendEmail";
// import { sendEmail, generateBookingSummaryHtml } from "@/utils/emailHtml";

// Map doctors to email addresses
const doctorEmails = {
    "Dr. B.K. Sharma": "anandhakrishnanvellat15@gmail.com",
    "Dr. Neha Rani": "anandhubalan78@gmail.com"
};

export async function sendDailyBookingSummary() {
    try {
        await connectDB();

        const today = new Date().toISOString().split("T")[0];
        const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];

        // Aggregate bookings by doctor
        const todayCounts = await Bookings.aggregate([
            { $match: { date: today, paid: true } },
            { $group: { _id: "$doctor", count: { $sum: 1 } } }
        ]);

        const tomorrowCounts = await Bookings.aggregate([
            { $match: { date: tomorrow, paid: true } },
            { $group: { _id: "$doctor", count: { $sum: 1 } } }
        ]);

        const todaySummary = {};
        todayCounts.forEach(item => todaySummary[item._id] = item.count);

        const tomorrowSummary = {};
        tomorrowCounts.forEach(item => tomorrowSummary[item._id] = item.count);

        // Generate one combined HTML with all doctors
        let combinedHtml = '';
        for (const doctor of Object.keys(doctorEmails)) {
            const tCount = todaySummary[doctor] || 0;
            const tmCount = tomorrowSummary[doctor] || 0;
            combinedHtml += generateBookingSummaryHtml(doctor, tCount, tmCount);
        }

        // Send ONE email to all doctors in BCC
        const subject = `📊 Daily Booking Summary - ${today}`;
        const bcc = Object.values(doctorEmails); // send to all doctors in BCC

        await sendEmail({
            to: process.env.EMAIL_USER, // you or a dummy "to" address
            bcc,
            subject,
            html: combinedHtml
        });

        // console.log("✅ Daily booking summary sent to all doctors");

    } catch (err) {
        console.error("❌ Error sending daily booking summary:", err);
    }
}
