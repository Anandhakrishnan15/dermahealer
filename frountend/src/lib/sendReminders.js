import { connectDB } from "@/lib/mongodb";
import FollowUp from "@/models/FollowUp";
import { followUpReminderTemplate } from "@/utils/emailTemplates";
import { sendEmail } from "@/utils/sendEmail";

export async function sendRemindersJob() {
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

        // ✅ Fetch only pending reminders
        const followUps = await FollowUp.find({
            status: "scheduled",
            "appointment.date": {
                $gte: tomorrowStart,
                $lte: tomorrowEnd,
            },
            "notifications.reminderSent": false,
        })
            .select("_id patientDetails doctor appointment treatment")
            .lean();

        // console.log(`📦 Found: ${followUps.length}`);
        // console.log('============followUps========================');
        // console.log(followUps); 
        // console.log('====================================');

        if (!followUps.length) {
            return { success: true, message: "No reminders" };
        }

        let reminderSentIds = new Set(); // ✅ prevent duplicates
        let failed = [];

        // ✅ Track numbers to avoid spamming same number
        const processedPhones = new Set();

        for (const item of followUps) {
            const email = item?.patientDetails?.email;
            const phone = item?.patientDetails?.phone;

            const name = item.patientDetails.name;
            const doctor = item.doctor.name;
            const date = item.appointment.date;
            const time = item.appointment.timeSlot;
            const treatment = item.treatment;

            let sent = false;

            // =========================
            // 📧 EMAIL
            // =========================
            try {
                if (email) {
                    const html = followUpReminderTemplate({
                        name,
                        doctor,
                        date,
                        time,
                    });

                    await sendEmail({
                        to: email,
                        subject: "Appointment Reminder - Tomorrow",
                        html,
                    });

                    sent = true;
                    console.log(`📧 Email sent to ${email}`);
                }
            } catch (err) {
                failed.push({
                    type: "email",
                    id: item._id,
                    error: err.message,
                });
            }

            // =========================
            // 📱 WHATSAPP (SAFE MODE)
            // =========================
            try {
                if (phone) {
                    let formattedPhone = String(phone).replace(/\D/g, "");

                    if (!formattedPhone.startsWith("91")) {
                        formattedPhone = "91" + formattedPhone;
                    }

                    // ✅ Avoid sending multiple times to same number
                    if (!processedPhones.has(formattedPhone)) {
                        const res = await fetch(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/api/whatsapp/send`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    to: formattedPhone,
                                    template: "appointment_reminder",
                                    params: [
                                        name,
                                        doctor,
                                        new Date(date).toLocaleDateString("en-IN"),
                                        time,
                                        treatment
                                    ],
                                }),
                            }
                        );

                        const data = await res.json();

                        if (!data.success) throw new Error(data.message);

                        processedPhones.add(formattedPhone); // ✅ mark used
                        sent = true;

                        console.log(`📱 WA sent to ${formattedPhone}`);

                        // ⏳ Delay (VERY IMPORTANT)
                        await new Promise((res) => setTimeout(res, 500));
                    }
                }
            } catch (err) {
                failed.push({
                    type: "whatsapp",
                    id: item._id,
                    error: err.message,
                });
            }

            // ✅ Mark reminder if ANY worked
            if (sent) {
                reminderSentIds.add(item._id);
            }
        }

        // =========================
        // ✅ UPDATE DB ONCE
        // =========================
        if (reminderSentIds.size > 0) {
            await FollowUp.updateMany(
                { _id: { $in: Array.from(reminderSentIds) } },
                {
                    $set: {
                        "notifications.reminderSent": true,
                        "notifications.reminderSentAt": new Date(),
                    },
                }
            );
        }

        // console.log("=================================");
        // console.log(`📊 Total: ${followUps.length}`);
        // console.log(`✅ Reminder Sent: ${reminderSentIds.size}`);
        // console.log(`❌ Failed: ${failed.length}`);
        // console.log("=================================");

        return {
            success: true,
            total: followUps.length,
            reminderSent: reminderSentIds.size,
            failed,
        };

    } catch (err) {
        console.error("🔥 ERROR:", err);

        return {
            success: false,
            error: err.message,
        };
    }
}