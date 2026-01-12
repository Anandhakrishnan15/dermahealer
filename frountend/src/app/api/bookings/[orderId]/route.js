// app/api/bookings/[orderId]/route.js
export const runtime = "nodejs";

import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Bookings";

export async function GET(req, { params }) {
    await connectDB();

    const { orderId } = await params; // 👈 IMPORTANT

    const booking = await Booking.findOne({ orderId });

    if (!booking) {
        return Response.json(
            { error: "Booking not found" },
            { status: 404 }
        );
    }

    return Response.json(booking);
}
