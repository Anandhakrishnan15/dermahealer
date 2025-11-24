import { connectDB } from "@/lib/mongodb";
import Bookings from "@/models/Bookings";

async function handleError(error) {
    console.error(error);
    return Response.json(
        { success: false, message: "Server error" },
        { status: 500 }
    );
}

export async function GET() {
    try {
        await connectDB();

        const bookings = await Bookings.find()
            .sort({ createdAt: -1 })
            .lean();

        return Response.json({ success: true, bookings });
    } catch (error) {
        return handleError(error);
    }
}

export async function POST(req) {
    try {
        const data = await req.json().catch(() => null);

        if (!data)
            return Response.json(
                { success: false, message: "Invalid JSON data" },
                { status: 400 }
            );

        await connectDB();

        const booking = await Bookings.create({
            ...data,
            orderId: "ORDER" + Date.now(),
        });

        return Response.json({ success: true, booking });
    } catch (error) {
        return handleError(error);
    }
}
