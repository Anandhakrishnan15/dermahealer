import { connectDB } from "@/lib/mongodb";
import Bookings from "@/models/Bookings";

async function handleError(error) {
    console.error(error);
    return Response.json(
        { success: false, message: "Server error" },
        { status: 500 }
    );
}

/* ---------------- HELPER: Get Date String in IST (YYYY-MM-DD) ---------------- */
function getISTDateString(dateObj = new Date()) {
    const options = {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };
    const parts = new Intl.DateTimeFormat("en-GB", options).formatToParts(dateObj);
    const day = parts.find((p) => p.type === "day")?.value;
    const month = parts.find((p) => p.type === "month")?.value;
    const year = parts.find((p) => p.type === "year")?.value;
    return `${year}-${month}-${day}`;
}

/* ---------------- HELPER: Check if YYYY-MM-DD is Sunday in IST ---------------- */
function isSundayIST(dateStr) {
    if (!dateStr) return false;
    const [year, month, day] = dateStr.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);

    const dayName = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        weekday: "short",
    }).format(dateObj);

    return dayName === "Sun";
}

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);

        const page = Number(searchParams.get("page")) || 1;
        const limit = Number(searchParams.get("limit")) || 10;
        const skip = (page - 1) * limit;

        // ✅ Get current date in IST (prevents UTC mismatch after 5:30 PM IST)
        const todayIST = getISTDateString(new Date());

        // ✅ Run queries concurrently with Promise.all for faster response times
        const [bookings, totalBookings, todayAppointments] = await Promise.all([
            Bookings.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Bookings.countDocuments(),
            Bookings.countDocuments({
                paid: true,
                date: todayIST,
            }),
        ]);

        // -------------------------------------------------
        // PAGINATION
        // -------------------------------------------------
        const totalPages = Math.ceil(totalBookings / limit);

        return Response.json({
            success: true,
            bookings,
            stats: {
                totalAppointments: totalBookings,
                todayAppointments,
            },
            pagination: {
                total: totalBookings,
                page,
                limit,
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

        if (!data) {
            return Response.json(
                { success: false, message: "Invalid JSON data" },
                { status: 400 }
            );
        }

        // 🚫 SERVER-SIDE GUARD: Hard-block Sunday bookings
        if (isSundayIST(data.date)) {
            return Response.json(
                { success: false, message: "Clinic is closed on Sundays." },
                { status: 400 }
            );
        }

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