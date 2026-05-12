import { connectDB } from "@/lib/mongodb";
import Bookings from "@/models/Bookings";

async function handleError(error) {
    console.error(error);
    return Response.json(
        { success: false, message: "Server error" },
        { status: 500 }
    );
}

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);

        const page =
            Number(searchParams.get("page")) || 1;

        const limit =
            Number(searchParams.get("limit")) || 10;

        const skip = (page - 1) * limit;

        const bookings = await Bookings.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const totalBookings =
            await Bookings.countDocuments();

        const totalPages = Math.ceil(
            totalBookings / limit
        );

        return Response.json({
            success: true,
            bookings,

            pagination: {
                page,
                limit,
                totalBookings,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        });

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
