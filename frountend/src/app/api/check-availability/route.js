import { connectDB } from "@/lib/mongodb";
import Bookings from "@/models/Bookings";
import Holiday from "@/models/Holiday";
import {
    BOOKING_DOCTORS,
    BOOKING_TIMES,
    MAX_PER_DAY,
    MAX_PER_SLOT,
    getActiveBookingFilter,
} from "@/lib/bookingCapacity";

export async function POST(req) {
    console.time("Availability API Time");
    await connectDB();

    const { doctor, dates } = await req.json();

    if (
        !BOOKING_DOCTORS.includes(doctor) ||
        !Array.isArray(dates) ||
        dates.some((date) => typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date))
    ) {
        return Response.json(
            { message: "Invalid doctor or dates" },
            { status: 400 },
        );
    }

    let result = {};

    // ✅ Fetch holidays using .lean() for fast query performance
    const holidayDocs = await Holiday.find().lean();

    const commonHolidayDates = new Set(
        holidayDocs
            .filter(h => h.type === "common")
            .map(h => h.date)
    );

    const doctorHolidayDates = new Set(
        holidayDocs
            .filter(h => h.type === "doctor" && h.doctor === doctor)
            .map(h => h.date)
    );

    // ✅ Fetch bookings in one query
    const now = new Date();

    await Bookings.updateMany(
        {
            doctor,
            date: { $in: dates },
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

    const bookings = await Bookings.find({
        doctor,
        date: { $in: dates },
        ...getActiveBookingFilter(now),
    }).lean();

    // ✅ Group bookings by date and timing
    const bookingMap = {};

    bookings.forEach(b => {
        if (!bookingMap[b.date]) {
            bookingMap[b.date] = {
                total: 0,
                timings: {}
            };
        }

        bookingMap[b.date].total++;

        bookingMap[b.date].timings[b.time] =
            (bookingMap[b.date].timings[b.time] || 0) + 1;
    });

    // ✅ Helper to check if a "YYYY-MM-DD" string falls on Sunday in IST
    const isSundayIST = (dateStr) => {
        const [year, month, day] = dateStr.split("-").map(Number);
        // Note: Month in JS Date constructor is 0-indexed (month - 1)
        const dateObj = new Date(year, month - 1, day);

        const dayName = new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Kolkata",
            weekday: "short"
        }).format(dateObj);

        return dayName === "Sun";
    };

    // ✅ Build response
    for (const d of dates) {

        // 🚫 Check if Sunday OR Holiday
        const isSunday = isSundayIST(d);
        const isHoliday = commonHolidayDates.has(d) || doctorHolidayDates.has(d);

        if (isSunday || isHoliday) {
            result[d] = {
                totalRemaining: 0,
                timings: {}
            };

            BOOKING_TIMES.forEach(t => {
                result[d].timings[t] = {
                    remaining: 0,
                    available: false
                };
            });

            continue;
        }

        // 🟢 Calculate regular availability
        const totalCount = bookingMap[d]?.total || 0;
        const totalRemaining = Math.max(MAX_PER_DAY - totalCount, 0);

        result[d] = {
            totalRemaining,
            timings: {}
        };

        BOOKING_TIMES.forEach(t => {
            const timingCount = bookingMap[d]?.timings[t] || 0;
            const remaining = Math.max(MAX_PER_SLOT - timingCount, 0);

            result[d].timings[t] = {
                remaining,
                available: remaining > 0 && totalRemaining > 0
            };
        });
    }

    console.timeEnd("Availability API Time");

    return Response.json({ availability: result });
}