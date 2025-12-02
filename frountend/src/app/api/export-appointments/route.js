import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Bookings";
import { NextResponse } from "next/server";

export async function GET() {
    const AUTH_KEY = process.env.EXPORT_SECRET;

    const incomingKey = req.headers.get("authorization")?.replace("Bearer ", "");

    if (incomingKey !== AUTH_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();

    const today = new Date();

    // Only export past appointments
    const appointments = await Booking.find({
        date: { $lt: today.toISOString().split("T")[0] }
    }).lean();

    const cleaned = appointments.map(a => ({
        id: a._id.toString(),
        name: a.name,
        email: a.email,
        phone: a.phone,
        doctor: a.doctor,
        date: a.date,
        time: a.time,
        notes: a.notes || "",
        amount: a.amount,
        paid: a.paid ? "PAID" : "UNPAID",
        orderId: a.orderId,
        txnId: a.paymentInfo?.txnId || "",
        bankTxnId: a.paymentInfo?.bankTxnId || "",
        bankName: a.paymentInfo?.bankName || "",
        gatewayName: a.paymentInfo?.gatewayName || "",
        mode: a.paymentInfo?.paymentMode || "",
        txnAmount: a.paymentInfo?.txnAmount || "",
        txnDate: a.paymentInfo?.txnDate || "",
        respMsg: a.paymentInfo?.respMsg || "",
        createdAt: a.createdAt,
    }));

    return NextResponse.json(cleaned);
}
