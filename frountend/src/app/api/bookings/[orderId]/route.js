import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Bookings";

export async function GET(req, { params }) {
    await connectDB();
    const booking = await Booking.findOne({ orderId: params.orderId });
    if (!booking) {
        return Response.json({ error: "Booking not found" }, { status: 404 });
    }
    return Response.json(booking);
}
