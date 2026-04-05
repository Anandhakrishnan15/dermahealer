import { connectDB } from "@/lib/mongodb";
import FollowUp from "@/models/FollowUp";
import { followUpReminderTemplate } from "@/utils/emailTemplates";
import { sendEmail } from "@/utils/sendEmail";

export async function GET() {
    const apiStart = Date.now();

    try {
        await connectDB();

        // ✅ IST Time
        const now = new Date(
            new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
        );

        const tomorrowStart = new Date(now);
        tomorrowStart.setDate(now.getDate() + 1);
        tomorrowStart.setHours(0, 0, 0, 0);

        const tomorrowEnd = new Date(now);
        tomorrowEnd.setDate(now.getDate() + 1);
        tomorrowEnd.setHours(23, 59, 59, 999);

        // ⏱ DB Query
        const dbStart = Date.now();

        const followUps = await FollowUp.find({
            status: "scheduled",
            "appointment.date": {
                $gte: tomorrowStart,
                $lte: tomorrowEnd,
            },
            "notifications.reminderSent": false,
        })
            .select("_id patientDetails doctor appointment") // 🔥 only needed fields
            .lean(); // 🔥 faster (no mongoose overhead)

        const dbTime = Date.now() - dbStart;

        console.log(`📦 DB: ${dbTime} ms | Found: ${followUps.length}`);

        if (followUps.length === 0) {
            return Response.json({
                success: true,
                message: "No reminders to send",
                performance: { dbTime, totalTime: Date.now() - apiStart },
            });
        }

        let sentIds = [];
        let failedCount = 0;

        const BATCH_SIZE = 5; // ⚡ safe parallel limit
        const loopStart = Date.now();

        for (let i = 0; i < followUps.length; i += BATCH_SIZE) {
            const batch = followUps.slice(i, i + BATCH_SIZE);

            await Promise.all(
                batch.map(async (item) => {
                    const emailStart = Date.now();

                    try {
                        if (!item.patientDetails?.email) return;

                        const html = followUpReminderTemplate({
                            name: item.patientDetails.name,
                            doctor: item.doctor.name,
                            date: item.appointment.date,
                            time: item.appointment.timeSlot,
                        });

                        await sendEmail({
                            to: item.patientDetails.email,
                            subject: "Appointment Reminder - Tomorrow",
                            html,
                        });

                        sentIds.push(item._id);

                        console.log(
                            `✅ ${item.patientDetails.email} | ${Date.now() - emailStart} ms`
                        );

                    } catch (err) {
                        failedCount++;
                        console.error(
                            `❌ ${item.patientDetails?.email} | ${err.message}`
                        );
                    }
                })
            );
        }

        const loopTime = Date.now() - loopStart;

        // 🔥 BULK UPDATE (instead of .save() in loop)
        const updateStart = Date.now();

        if (sentIds.length > 0) {
            await FollowUp.updateMany(
                { _id: { $in: sentIds } },
                { $set: { "notifications.reminderSent": true } }
            );
        }

        const updateTime = Date.now() - updateStart;

        const totalTime = Date.now() - apiStart;

        console.log("=================================");
        console.log(`🚀 API DONE`);
        console.log(`📊 Total: ${followUps.length}`);
        console.log(`✅ Sent: ${sentIds.length}`);
        console.log(`❌ Failed: ${failedCount}`);
        console.log(`⏱ DB: ${dbTime} ms`);
        console.log(`⏱ Email: ${loopTime} ms`);
        console.log(`⏱ Update: ${updateTime} ms`);
        console.log(`⚡ Total: ${totalTime} ms`);
        console.log("=================================");

        return Response.json({
            success: true,
            total: followUps.length,
            sent: sentIds.length,
            failed: failedCount,
            performance: {
                dbTime,
                loopTime,
                updateTime,
                totalTime,
            },
        });

    } catch (err) {
        const totalTime = Date.now() - apiStart;

        console.error("🔥 API ERROR:", err);
        console.log(`⚡ Failed in ${totalTime} ms`);

        return Response.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}