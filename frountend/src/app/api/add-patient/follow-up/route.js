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
            notifications: { emailSent: false, reminderSent: false, smsSent: false },
            createdBy: user._id,
        });

        // ✅ Send confirmation email
        if (body.email) {
            const advanceFee = doctorAdvanceFees[body.doctor] || 0;
            const html = followUpConfirmationTemplate({
                name: body.name,
                doctor: body.doctor,
                date: body.date,
                time: body.time,
                advanceFee
            });

            await sendEmail({ to: body.email, subject: "Follow-Up Confirmation", html });

            followUp.notifications.emailSent = true;
            await followUp.save();
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

        const updateData = {};

        if (status) updateData.status = status;
        if (paymentStatus !== undefined)
            updateData["payment.isPaid"] = paymentStatus === "paid";
        if (date) updateData["appointment.date"] = new Date(date);
        if (time) updateData["appointment.timeSlot"] = time;

        const updated = await FollowUp.findByIdAndUpdate(id, updateData, { new: true });

        // ✅ Only send email if DATE or TIME changed
        const isDateOrTimeUpdated = date || time;

        if (isDateOrTimeUpdated && updated.patientDetails.email) {
            const advanceFee = doctorAdvanceFees[updated.doctor.name] || 0;

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
            await updated.save();
        }

        return Response.json({ success: true, data: updated });

    } catch (err) {
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