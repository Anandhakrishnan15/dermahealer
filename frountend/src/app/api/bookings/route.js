import { connectDB } from "@/lib/mongodb";
import Bookings from "@/models/Bookings";
import Holiday from "@/models/Holiday";
import { randomUUID } from "node:crypto";
import {
  BOOKING_DOCTORS,
  BOOKING_TIMES,
  MAX_PER_DAY,
  MAX_PER_SLOT,
  RESERVATION_HOLD_MS,
  getActiveBookingFilter,
} from "@/lib/bookingCapacity";

let capacityIndexPromise;

async function ensureCapacityIndex() {
  if (!capacityIndexPromise) {
    capacityIndexPromise = Bookings.collection
      .createIndex(
        { doctor: 1, date: 1, time: 1, capacitySeat: 1 },
        {
          unique: true,
          partialFilterExpression: { capacitySeat: { $type: "number" } },
          name: "unique_booking_slot_seat",
        },
      )
      .catch((error) => {
        capacityIndexPromise = null;
        throw error;
      });
  }

  await capacityIndexPromise;
}

function isValidDateString(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return false;
  }

  const [year, month, day] = date.split("-").map(Number);
  return (
    new Date(Date.UTC(year, month - 1, day)).toISOString().slice(0, 10) ===
    date
  );
}

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

function addDaysToDateString(dateStr, days) {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day + days))
        .toISOString()
        .slice(0, 10);
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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

    const query = {};
    const search = searchParams.get("search") || "";
    const dateFilter = searchParams.get("dateFilter") || "all";
    const selectedDate = searchParams.get("selectedDate") || "";
    const paymentFilter = searchParams.get("paymentFilter") || "all";
    const doctorFilter = searchParams.get("doctorFilter") || "all";

    if (search) {
      const escapedSearch = escapeRegExp(search);
      query.$or = [
        { name: { $regex: escapedSearch, $options: "i" } },
        { orderId: { $regex: escapedSearch, $options: "i" } },
      ];
    }

    if (paymentFilter === "paid") {
      query.paid = true;
    } else if (paymentFilter === "unpaid") {
      query.paid = false;
    }

    if (doctorFilter !== "all") {
      query.doctor = doctorFilter;
    }

    switch (dateFilter) {
      case "today":
        query.date = todayIST;
        break;
      case "yesterday":
        query.date = addDaysToDateString(todayIST, -1);
        break;
      case "tomorrow":
        query.date = addDaysToDateString(todayIST, 1);
        break;
      case "last7":
        query.date = {
          $gte: addDaysToDateString(todayIST, -6),
          $lte: todayIST,
        };
        break;
      case "custom":
        query.date = selectedDate || "__no_custom_date_selected__";
        break;
      default:
        break;
    }

    // -------------------------------------------------
    // RUN QUERIES CONCURRENTLY
    // -------------------------------------------------

    const [bookings, filteredBookings, totalBookings, todayAppointments] = await Promise.all([
      Bookings.find(query)
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Bookings.countDocuments(query),

      Bookings.countDocuments(),

      Bookings.countDocuments({
        paid: true,
        date: todayIST,
      }),
    ]);

    // -------------------------------------------------
    // PAGINATION
    // -------------------------------------------------

    const totalPages = Math.ceil(filteredBookings / limit);

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
        total: filteredBookings,

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

        if (
            !BOOKING_DOCTORS.includes(data.doctor) ||
            !BOOKING_TIMES.includes(data.time) ||
            !isValidDateString(data.date)
        ) {
            return Response.json(
                { success: false, message: "Invalid doctor, date, or time slot." },
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

        await ensureCapacityIndex();

        const holiday = await Holiday.findOne({
            date: data.date,
            $or: [
                { type: "common" },
                { type: "doctor", doctor: data.doctor },
            ],
        });

        if (holiday) {
            return Response.json(
                { success: false, message: "The clinic is closed on this date." },
                { status: 400 }
            );
        }

        const now = new Date();
        await Bookings.updateMany(
            {
                doctor: data.doctor,
                date: data.date,
                capacitySeat: { $type: "number" },
                paid: { $ne: true },
                reservationExpiresAt: { $lte: now },
            },
            {
                $unset: {
                    capacitySeat: "",
                    reservationExpiresAt: "",
                },
            },
        );

        const activeBookings = await Bookings.find({
            doctor: data.doctor,
            date: data.date,
            ...getActiveBookingFilter(now),
        })
            .select("time capacitySeat")
            .lean();

        const slotBookings = activeBookings.filter(
            (booking) => booking.time === data.time,
        );

        if (
            activeBookings.length >= MAX_PER_DAY ||
            slotBookings.length >= MAX_PER_SLOT
        ) {
            return Response.json(
                {
                    success: false,
                    message: "This date or time slot just became full. Please choose another.",
                },
                { status: 409 }
            );
        }

        const legacySlotCount = slotBookings.filter(
            (booking) => !Number.isInteger(booking.capacitySeat),
        ).length;
        const occupiedSeats = new Set(
            Array.from({ length: legacySlotCount }, (_, index) => index + 1),
        );

        slotBookings.forEach((booking) => {
            if (Number.isInteger(booking.capacitySeat)) {
                occupiedSeats.add(booking.capacitySeat);
            }
        });

        const availableSeats = Array.from(
            { length: MAX_PER_SLOT },
            (_, index) => index + 1,
        ).filter((seat) => !occupiedSeats.has(seat));
        const orderId = `ORDER${Date.now()}${randomUUID().replace(/-/g, "")}`;

        for (const capacitySeat of availableSeats) {
            try {
                const booking = await Bookings.create({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    doctor: data.doctor,
                    date: data.date,
                    time: data.time,
                    notes: data.notes || "",
                    amount: 50,
                    paid: false,
                    paymentStatus: "PENDING",
                    capacityManaged: true,
                    capacitySeat,
                    reservationExpiresAt: new Date(
                        now.getTime() + RESERVATION_HOLD_MS,
                    ),
                    orderId,
                });

                return Response.json({ success: true, booking });
            } catch (error) {
                const seatConflict =
                    error.code === 11000 &&
                    (error.keyPattern?.capacitySeat ||
                        error.message.includes("unique_booking_slot_seat"));

                if (seatConflict) {
                    continue;
                }

                if (error.name === "ValidationError") {
                    return Response.json(
                        { success: false, message: "Invalid booking details." },
                        { status: 400 }
                    );
                }

                throw error;
            }
        }

        return Response.json(
            {
                success: false,
                message: "This time slot just became full. Please choose another.",
            },
            { status: 409 }
        );
    } catch (error) {
        return handleError(error);
    }
}