import { authMiddleware } from "@/middleware/auth";
import FollowUp from "@/models/FollowUp";
import { connectDB } from "@/lib/mongodb";
import { sendEmail } from "@/utils/sendEmail";
import { followUpConfirmationTemplate } from "@/utils/emailTemplates";

// Doctor advance fees
const doctorAdvanceFees = {
    "Dr. Neha Rani": 350,
    "Dr. B.K. Sharma": 600
};

// ✅ CREATE FOLLOW-UP
export async function POST(req) {
    try {
        await connectDB();

        const user = await authMiddleware(req);
        if (!user) return Response.json({ success: false }, { status: 401 });

        const body = await req.json();

        const followUp = await FollowUp.create({
            patientDetails: {
                name: body.name,
                email: body.email,
                phone: body.phone,
            },
            doctor: { name: body.doctor },
            appointment: {
                date: new Date(body.date),
                timeSlot: body.time,
            },
            payment: {
                isPaid: body.payment?.isPaid || false,
                amount: body.payment?.amount || 0,
                method: body.payment?.method || undefined,
                transactionId: body.payment?.transactionId || "",
                paidAt: body.payment?.isPaid ? new Date() : null,
            },
            status: "scheduled",
            notifications: {
                emailSent: false,
                reminderSent: false,
                smsSent: false,
                whatsappSent: false // ✅ add this
            },
            createdBy: user._id,
        });

        // =========================
        // 📧 EMAIL
        // =========================
        if (body.email) {
            const advanceFee = doctorAdvanceFees[body.doctor] || 0;

            const html = followUpConfirmationTemplate({
                name: body.name,
                doctor: body.doctor,
                date: body.date,
                time: body.time,
                advanceFee
            });

            await sendEmail({
                to: body.email,
                subject: "Follow-Up Confirmation",
                html
            });

            followUp.notifications.emailSent = true;
            await followUp.save();
        }

        // =========================
        // 📲 WHATSAPP (NEW)
        // =========================
        if (body.phone && !followUp.notifications.whatsappSent) {
            try {
                const waRes = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/whatsapp/send`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            to: body.phone,
                            template: "appointment_confirmed ", // 👈 your template name
                            params: [
                                body.name || "Customer",
                                body.doctor,
                                `${body.date} at ${body.time}`,
                                body.service || "Consultation",
                                body.phone || "NILL",
                            ],
                            
                        }),
                    }
                );

                if (waRes.ok) {
                    followUp.notifications.whatsappSent = true;
                    await followUp.save();
                } else {
                    console.error("❌ WhatsApp API failed");
                }

            } catch (err) {
                console.error("❌ WhatsApp error:", err);
            }
        }

        return Response.json({ success: true, data: followUp });

    } catch (err) {
        return Response.json({ success: false, error: err.message }, { status: 500 });
    }
}

// ✅ GET FOLLOW-UPS
export async function GET(req) {
    try {
        await connectDB();
        const user = await authMiddleware(req);
        if (!user) return Response.json({ success: false }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;
        const limit = Number(searchParams.get("limit")) || 10;
        const search = searchParams.get("search") || "";

        // 🔹 Query to search by name OR phone number (case-insensitive)
        const query = {
            createdBy: user._id,
            $or: [
                { "patientDetails.name": { $regex: search, $options: "i" } },
                { "patientDetails.phone": { $regex: search, $options: "i" } }
            ]
        };

        const data = await FollowUp.find(query)
            .sort({ "appointment.date": -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await FollowUp.countDocuments(query);

        return Response.json({ success: true, data, total });

    } catch (err) {
        return Response.json({ success: false, error: err.message }, { status: 500 });
    }
}

// ✅ UPDATE FOLLOW-UP
export async function PATCH(req) {
    try {
        await connectDB();

        const user = await authMiddleware(req);
        if (!user) return Response.json({ success: false }, { status: 401 });

        const { id, status, paymentStatus, date, time } = await req.json();

        // 🧠 Get existing data FIRST (important for comparison)
        const existing = await FollowUp.findById(id);
        if (!existing) {
            return Response.json(
                { success: false, message: "Record not found" },
                { status: 404 }
            );
        }

        // 🧠 Check if date/time actually changed
        const isDateChanged =
            date &&
            new Date(date).toISOString() !==
            new Date(existing.appointment.date).toISOString();

        const isTimeChanged =
            time && time !== existing.appointment.timeSlot;

        const isDateOrTimeUpdated = isDateChanged || isTimeChanged;

        // 🛠 Build update object
        const updateData = {};

        if (status) updateData.status = status;

        if (paymentStatus !== undefined) {
            updateData["payment.isPaid"] = paymentStatus === "paid";
        }

        if (date) updateData["appointment.date"] = new Date(date);

        if (time) updateData["appointment.timeSlot"] = time;

        // 🔄 Update DB
        const updated = await FollowUp.findByIdAndUpdate(id, updateData, {
            new: true,
        });

        // =========================
        // 🚨 ONLY send if date/time changed
        // =========================
        if (isDateOrTimeUpdated) {
            const advanceFee =
                doctorAdvanceFees[updated.doctor.name] || 0;

            // =========================
            // 📧 EMAIL
            // =========================
            if (updated.patientDetails.email) {
                const html = followUpConfirmationTemplate({
                    name: updated.patientDetails.name,
                    doctor: updated.doctor.name,
                    date: updated.appointment.date,
                    time: updated.appointment.timeSlot,
                    advanceFee,
                    status: updated.status,
                    isUpdate: true,
                });

                await sendEmail({
                    to: updated.patientDetails.email,
                    subject: "Follow-Up Schedule Updated",
                    html,
                });

                updated.notifications.emailSent = true;
            }

            // =========================
            // 📲 WHATSAPP
            // =========================
            if (updated.patientDetails.phone) {
                try {
                    const phone = String(
                        updated.patientDetails.phone
                    ).replace(/\D/g, "");

                    const waRes = await fetch(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/api/whatsapp/send`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                to: phone,
                                template: "followup_schedule_update",
                                params: [
                                    updated.patientDetails.name || "Customer",
                                    updated.doctor.name || "Doctor",
                                    new Date(
                                        updated.appointment.date
                                    ).toLocaleDateString(),
                                    updated.appointment.timeSlot || "",
                                ],
                            }),
                        }
                    );

                    const waData = await waRes.json();

                    if (waRes.ok && !waData.error) {
                        updated.notifications.whatsappSent = true;
                    } else {
                        console.error("❌ WhatsApp failed:", waData);
                    }
                } catch (err) {
                    console.error("❌ WhatsApp error:", err);
                }
            }

            // ✅ Save notification flags
            await updated.save();
        }

        return Response.json({ success: true, data: updated });

    } catch (err) {
        console.error("PATCH ERROR:", err);

        return Response.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}

// ✅ DELETE FOLLOW-UP
export async function DELETE(req) {
    try {
        await connectDB();
        const user = await authMiddleware(req);
        if (!user) return Response.json({ success: false }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        await FollowUp.findByIdAndDelete(id);
        return Response.json({ success: true });

    } catch (err) {
        return Response.json({ success: false, error: err.message }, { status: 500 });
    }
}