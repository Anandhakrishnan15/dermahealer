import { connectDB } from "@/lib/mongodb";
import Bookings from "@/models/Bookings";

export async function POST(req) {
    try {
        const data = await req.json();
        await connectDB();
        console.log(data);
        

        const orderId = "ORDER" + Date.now();
        const booking = await Bookings.create({ ...data, orderId });

        return Response.json({ success: true, booking });
    } catch (error) {
        console.error(error);
        return Response.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
