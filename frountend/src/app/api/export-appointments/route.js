import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Bookings";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        // 1. Validate secret exists
        const AUTH_KEY = process.env.CRON_SECRET;

        if (!AUTH_KEY) {
            console.error("EXPORT_SECRET missing in env");
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        // 2. Validate authorization header
        const authHeader = req.headers.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Missing authorization header" },
                { status: 401 }
            );
        }

        const incomingKey = authHeader.replace("Bearer ", "");

        if (incomingKey !== AUTH_KEY) {
            return NextResponse.json(
                { error: "Unauthorized access" },
                { status: 401 }
            );
        }

        // 3. Connect DB
        await connectDB();

        // 4. Get today's date string safely
        const today = new Date().toISOString().split("T")[0];

        // 5. Query only required fields (FASTER)
        const appointments = await Booking.find(
            { date: { $lt: today } },
            {
                name: 1,
                email: 1,
                phone: 1,
                doctor: 1,
                date: 1,
                time: 1,
                notes: 1,
                amount: 1,
                paid: 1,
                orderId: 1,
                paymentInfo: 1,
                createdAt: 1,
            }
        )
            .sort({ date: -1, time: -1 }) // newest first
            .lean();

        // 6. Clean and format response
        const cleaned = appointments.map((a) => ({
            id: a._id.toString(),

            name: a.name || "",
            email: a.email || "",
            phone: a.phone || "",

            doctor: a.doctor || "",
            date: a.date || "",
            time: a.time || "",

            notes: a.notes || "",

            amount: a.amount || 0,
            paid: a.paid ? "PAID" : "UNPAID",

            orderId: a.orderId || "",

            txnId: a.paymentInfo?.txnId || "",
            bankTxnId: a.paymentInfo?.bankTxnId || "",
            bankName: a.paymentInfo?.bankName || "",
            gatewayName: a.paymentInfo?.gatewayName || "",
            mode: a.paymentInfo?.paymentMode || "",
            txnAmount: a.paymentInfo?.txnAmount || "",
            txnDate: a.paymentInfo?.txnDate || "",
            respMsg: a.paymentInfo?.respMsg || "",

            createdAt: a.createdAt || "",
        }));

        // 7. Return response
        return NextResponse.json(cleaned, {
            status: 200,
            headers: {
                "Cache-Control": "no-store",
            },
        });

    } catch (error) {
        console.error("Export API Error:", error);

        return NextResponse.json(
            {
                error: "Failed to export appointments",
                details: error.message,
            },
            { status: 500 }
        );
    }
}
