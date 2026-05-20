import { connectDB } from "@/lib/mongodb";
import FollowUp from "@/models/FollowUp";
import { followUpReminderTemplate } from "@/utils/emailTemplates";
import { sendEmail } from "@/utils/sendEmail";

export async function sendRemindersJob() {
    try {
        await connectDB();

        // =========================
        // ✅ UTC DATE RANGE
        // =========================
        const tomorrowStart = new Date();
        tomorrowStart.setUTCDate(
            tomorrowStart.getUTCDate() + 1
        );
        tomorrowStart.setUTCHours(0, 0, 0, 0);

        const tomorrowEnd = new Date();
        tomorrowEnd.setUTCDate(
            tomorrowEnd.getUTCDate() + 1
        );
        tomorrowEnd.setUTCHours(
            23,
            59,
            59,
            999
        );

        console.log("=================================");
        console.log("📅 Tomorrow Start:", tomorrowStart);
        console.log("📅 Tomorrow End:", tomorrowEnd);
        console.log("=================================");

        // =========================
        // ✅ FETCH FOLLOWUPS
        // =========================
        const followUps = await FollowUp.find({
            $or: [
                { status: "scheduled" },
                { "appointment.status": "scheduled" }
            ],

            "appointment.date": {
                $gte: tomorrowStart,
                $lte: tomorrowEnd,
            },

            "notifications.reminderSent": false,
        }).lean();

        console.log(`📦 Found: ${followUps.length}`);

        if (!followUps.length) {
            return {
                success: true,
                message: "No reminders found",
            };
        }

        // =========================
        // ✅ TRACKERS
        // =========================
        const reminderSentIds = new Set();
        const processedPhones = new Set();

        let failed = [];

        // =========================
        // ✅ LOOP
        // =========================
        for (const item of followUps) {
            try {
                const email =
                    item?.patientDetails?.email?.trim();

                const phone =
                    item?.patientDetails?.phone;

                const name =
                    item?.patientDetails?.name ||
                    "Patient";

                const doctor =
                    item?.doctor?.name ||
                    "Doctor";

                const date =
                    item?.appointment?.date;

                const time =
                    item?.appointment?.timeSlot ||
                    "";

                const treatment =
                    item?.appointment?.treatment ||
                    item?.treatment ||
                    "";

                let emailSent = false;
                let whatsappSent = false;

                console.log(
                    `\n👤 Processing: ${name}`
                );

                // =========================
                // 📧 EMAIL
                // =========================
                try {
                    if (
                        email &&
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                            email
                        )
                    ) {
                        const html =
                            followUpReminderTemplate({
                                name,
                                doctor,
                                date,
                                time,
                            });

                        await sendEmail({
                            to: email,
                            subject:
                                "Appointment Reminder - Tomorrow",
                            html,
                        });

                        emailSent = true;

                        console.log(
                            `📧 Email sent -> ${email}`
                        );
                    } else {
                        console.log(
                            `⚠️ Invalid email for ${name}`
                        );
                    }
                } catch (err) {
                    console.error(
                        `❌ Email failed for ${name}:`,
                        err.message
                    );

                    failed.push({
                        type: "email",
                        id: item._id,
                        patient: name,
                        error: err.message,
                    });
                }

                // =========================
                // 📱 WHATSAPP
                // =========================
                try {
                    if (phone) {
                        let formattedPhone =
                            String(phone).replace(
                                /\D/g,
                                ""
                            );

                        if (
                            !formattedPhone.startsWith(
                                "91"
                            )
                        ) {
                            formattedPhone =
                                "91" +
                                formattedPhone;
                        }

                        if (
                            formattedPhone.length >=
                            12 &&
                            !processedPhones.has(
                                formattedPhone
                            )
                        ) {
                            const res =
                                await fetch(
                                    `${process.env.BASE_URL}/api/whatsapp/send`,
                                    {
                                        method:
                                            "POST",
                                        headers: {
                                            "Content-Type":
                                                "application/json",
                                        },
                                        body: JSON.stringify(
                                            {
                                                to: formattedPhone,
                                                template:
                                                    "appointment_reminder",
                                                params:
                                                    [
                                                        name,
                                                        doctor,
                                                        new Date(
                                                            date
                                                        ).toLocaleDateString(
                                                            "en-IN"
                                                        ),
                                                        time,
                                                        treatment,
                                                    ],
                                            }
                                        ),
                                    }
                                );

                            const data =
                                await res.json();

                            if (
                                !res.ok ||
                                data.failed > 0
                            ) {
                                throw new Error(
                                    data
                                        ?.failedList?.[0]
                                        ?.error ||
                                    "WhatsApp failed"
                                );
                            }

                            processedPhones.add(
                                formattedPhone
                            );

                            whatsappSent = true;

                            console.log(
                                `📱 WhatsApp sent -> ${formattedPhone}`
                            );

                            // small delay
                            await new Promise(
                                (res) =>
                                    setTimeout(
                                        res,
                                        500
                                    )
                            );
                        } else {
                            console.log(
                                `⚠️ Invalid phone for ${name}`
                            );
                        }
                    }
                } catch (err) {
                    console.error(
                        `❌ WhatsApp failed for ${name}:`,
                        err.message
                    );

                    failed.push({
                        type: "whatsapp",
                        id: item._id,
                        patient: name,
                        error: err.message,
                    });
                }

                // =========================
                // ✅ MARK SUCCESS
                // =========================
                if (
                    emailSent ||
                    whatsappSent
                ) {
                    reminderSentIds.add(
                        item._id
                    );
                }
            } catch (err) {
                console.error(
                    "🔥 LOOP ERROR:",
                    err
                );
            }
        }

        // =========================
        // ✅ UPDATE DB
        // =========================
        if (reminderSentIds.size > 0) {
            await FollowUp.updateMany(
                {
                    _id: {
                        $in: Array.from(
                            reminderSentIds
                        ),
                    },
                },
                {
                    $set: {
                        "notifications.reminderSent":
                            true,
                        "notifications.reminderSentAt":
                            new Date(),
                    },
                }
            );
        }

        console.log("=================================");
        console.log(
            `📊 Total Found: ${followUps.length}`
        );
        console.log(
            `✅ Sent: ${reminderSentIds.size}`
        );
        console.log(
            `❌ Failed: ${failed.length}`
        );
        console.log("=================================");

        return {
            success: true,
            total: followUps.length,
            reminderSent:
                reminderSentIds.size,
            failed,
        };
    } catch (err) {
        console.error(
            "🔥 REMINDER JOB ERROR:",
            err
        );

        return {
            success: false,
            error: err.message,
        };
    }
}