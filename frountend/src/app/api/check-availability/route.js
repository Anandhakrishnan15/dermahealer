import { connectDB } from "@/lib/mongodb";
import Bookings from "@/models/Bookings";
import Holiday from "@/models/Holiday";

export async function POST(req) {
    console.time("Availability API Time");
    await connectDB();

    const { doctor, dates } = await req.json();

    const timings = [
        "08:30-09:30",
        "10:30-11:30",
        "11:30-12:30",
        "12:30-01:30"
    ];

    const MAX_PER_SLOT = 5;
    const MAX_PER_DAY = timings.length * MAX_PER_SLOT;

    let result = {};

    // ✅ Fetch holidays
    const holidayDocs = await Holiday.find();

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
    const bookings = await Bookings.find({
        doctor,
        date: { $in: dates },
        paid: true
    });

    // ✅ Group bookings
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

    // ✅ Build response
    for (const d of dates) {

        // 🚫 Holiday check
        if (commonHolidayDates.has(d) || doctorHolidayDates.has(d)) {
            result[d] = {
                totalRemaining: 0,
                timings: {}
            };

            timings.forEach(t => {
                result[d].timings[t] = {
                    remaining: 0,
                    available: false
                };
            });

            continue;
        }

        const totalCount = bookingMap[d]?.total || 0;
        const totalRemaining = Math.max(MAX_PER_DAY - totalCount, 0);

        result[d] = {
            totalRemaining,
            timings: {}
        };

        timings.forEach(t => {
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