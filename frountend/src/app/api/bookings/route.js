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

function getISTDateOffset(offset) {
    const [year, month, day] = getISTDateString().split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day + offset));
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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

    // -------------------------------------------------
    // CHECK FOR ALL BOOKINGS REQUEST
    // -------------------------------------------------

    const getAll = searchParams.get("all") === "true";

    // -------------------------------------------------
    // CURRENT DATE IN IST
    // -------------------------------------------------

    const todayIST = getISTDateString(new Date());

    // -------------------------------------------------
    // PDF REQUEST
    // -------------------------------------------------
    // /api/bookings?all=true
    //
    // This does NOT use pagination.
    // It returns every booking.
    // -------------------------------------------------

    if (getAll) {
      const bookings = await Bookings.find()
        .sort({
          createdAt: -1,
        })
        .lean();

      return Response.json({
        success: true,

        bookings,

        // Keep stats available
        // in case they are useful.

        stats: {
          totalAppointments: bookings.length,

          todayAppointments: bookings.filter(
            (booking) => booking.paid === true && booking.date === todayIST,
          ).length,
        },
      });
    }

    // -------------------------------------------------
    // NORMAL DASHBOARD PAGINATION
    // -------------------------------------------------

    const page = Number(searchParams.get("page")) || 1;

    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    const search = searchParams.get("search")?.trim();
    const dateFilter = searchParams.get("dateFilter");
    const selectedDate = searchParams.get("selectedDate");
    const payment = searchParams.get("payment");
    const doctor = searchParams.get("doctor");

    const query = {};

    if (search) {
      const escapedSearch = escapeRegex(search);
      query.$or = [
        { name: { $regex: escapedSearch, $options: "i" } },
        { orderId: { $regex: escapedSearch, $options: "i" } },
        { phone: { $regex: escapedSearch, $options: "i" } },
      ];
    }

    if (dateFilter === "today") {
      query.date = getISTDateString();
    } else if (dateFilter === "yesterday") {
      query.date = getISTDateOffset(-1);
    } else if (dateFilter === "tomorrow") {
      query.date = getISTDateOffset(1);
    } else if (dateFilter === "last7") {
      query.date = { $gte: getISTDateOffset(-7), $lte: getISTDateString() };
    } else if (dateFilter === "custom" && selectedDate) {
      query.date = selectedDate;
    }

    if (payment === "paid") {
      query.paid = true;
    } else if (payment === "unpaid") {
      query.paid = { $ne: true };
    }

    if (doctor && doctor !== "all") {
      query.doctor = doctor;
    }

    // -------------------------------------------------
    // RUN QUERIES CONCURRENTLY
    // -------------------------------------------------

    const [bookings, totalBookings, todayAppointments] = await Promise.all([
      Bookings.find(query)
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Bookings.countDocuments(query),

      Bookings.countDocuments({
        paid: true,
        date: todayIST,
      }),
    ]);

    // -------------------------------------------------
    // PAGINATION
    // -------------------------------------------------

    const totalPages = Math.ceil(totalBookings / limit);

    // -------------------------------------------------
    // RESPONSE
    // -------------------------------------------------

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