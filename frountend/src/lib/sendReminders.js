import { connectDB } from "@/lib/mongodb";
import FollowUp from "@/models/FollowUp";
import { followUpReminderTemplate } from "@/utils/emailTemplates";
import { sendEmail } from "@/utils/sendEmail";

export async function sendRemindersJob() {
    try {
        await connectDB();

        console.log("⏰ Reminder Job Started");

        const now = new Date(
            new Date().toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
            })
        );
        const tomorrowStart = new Date(now);
        tomorrowStart.setDate(now.getDate() + 1);
        tomorrowStart.setHours(0, 0, 0, 0);

        const tomorrowEnd = new Date(now);
        tomorrowEnd.setDate(now.getDate() + 1);
        tomorrowEnd.setHours(23, 59, 59, 999);

        console.log("📅 Tomorrow Start:", tomorrowStart);
        console.log("📅 Tomorrow End:", tomorrowEnd);

        
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

        console.log(`📦 Found FollowUps: ${followUps.length}`);

        if (!followUps.length) {
            return {
                success: true,
                message: "No reminders",
            };
        }

        let reminderSentIds = new Set();
        let failed = [];

        // ✅ Prevent duplicate WA to same number
        const processedPhones = new Set();

        
        for (const item of followUps) {
            try {
                const email = item?.patientDetails?.email;
                const phone = item?.patientDetails?.phone;

                const name = item?.patientDetails?.name || "Patient";
                const doctor = item?.doctor?.name || "Doctor";
                const date = item?.appointment?.date;
                const time = item?.appointment?.timeSlot || "";
                const treatment = item?.treatment || "Consultation";

                let sent = false;

                console.log("=================================");
                console.log("👤 Processing:", name);
                console.log("📱 Phone:", phone);
                console.log("💉 Treatment:", treatment);
                console.log("=================================");

              
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

                        console.log(`📧 Email sent to ${email}`);

                        sent = true;
                    }
                } catch (err) {
                    console.error("📧 EMAIL ERROR:", err);

                    failed.push({
                        type: "email",
                        id: item._id,
                        error: err.message,
                    });
                }

                // =========================
                // 📱 WHATSAPP
                // =========================
                try {
                    if (phone) {
                        let formattedPhone = String(phone).replace(/\D/g, "");

                        if (!formattedPhone.startsWith("91")) {
                            formattedPhone = "91" + formattedPhone;
                        }

                        // ✅ Skip duplicate numbers
                        if (!processedPhones.has(formattedPhone)) {

                            console.log("📱 Sending WA to:", formattedPhone);

                            const response = await fetch(
                                `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`,
                                {
                                    method: "POST",
                                    headers: {
                                        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        messaging_product: "whatsapp",
                                        to: formattedPhone,
                                        type: "template",
                                        template: {
                                            name: "appointment_reminder",
                                            language: {
                                                code: "en_US",
                                            },
                                            components: [
                                                {
                                                    type: "body",
                                                    parameters: [
                                                        {
                                                            type: "text",
                                                            text: String(name),
                                                        },
                                                        {
                                                            type: "text",
                                                            text: String(doctor),
                                                        },
                                                        {
                                                            type: "text",
                                                            text: new Date(date).toLocaleDateString("en-IN"),
                                                        },
                                                        {
                                                            type: "text",
                                                            text: String(time),
                                                        },
                                                        {
                                                            type: "text",
                                                            text: String(treatment),
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    }),
                                }
                            );

                            const data = await response.json();

                            console.log("📱 WA RESPONSE:", data);

                            if (!response.ok || data.error) {
                                throw new Error(
                                    data?.error?.message || "WhatsApp failed"
                                );
                            }

                            processedPhones.add(formattedPhone);

                            console.log(`✅ WA sent to ${formattedPhone}`);

                            sent = true;

                            // ⏳ Delay
                            await new Promise((res) =>
                                setTimeout(res, 500)
                            );
                        }
                    }
                } catch (err) {
                    console.error("📱 WHATSAPP ERROR:", err);

                    failed.push({
                        type: "whatsapp",
                        id: item._id,
                        error: err.message,
                    });
                }

                // =========================
                // ✅ UPDATE SUCCESS
                // =========================
                if (sent) {
                    reminderSentIds.add(item._id);
                }

            } catch (err) {
                console.error("🔥 LOOP ERROR:", err);

                failed.push({
                    type: "general",
                    id: item?._id,
                    error: err.message,
                });
            }
        }

        // =========================
        // ✅ UPDATE DB
        // =========================
        if (reminderSentIds.size > 0) {
            await FollowUp.updateMany(
                {
                    _id: {
                        $in: Array.from(reminderSentIds),
                    },
                },
                {
                    $set: {
                        "notifications.reminderSent": true,
                        "notifications.reminderSentAt": new Date(),
                    },
                }
            );

            console.log(
                `✅ Updated reminders: ${reminderSentIds.size}`
            );
        }

        console.log("=================================");
        console.log(`📊 Total: ${followUps.length}`);
        console.log(`✅ Sent: ${reminderSentIds.size}`);
        console.log(`❌ Failed: ${failed.length}`);
        console.log("=================================");

        return {
            success: true,
            total: followUps.length,
            reminderSent: reminderSentIds.size,
            failed,
        };

    } catch (err) {
        console.error("🔥 MAIN ERROR:", err);

        return {
            success: false,
            error: err.message,
        };
    }
}