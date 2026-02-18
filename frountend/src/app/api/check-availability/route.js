import { connectDB } from "@/lib/mongodb";
import Bookings from "@/models/Bookings";
import Holiday from "@/models/Holiday";

export async function POST(req) {
    console.time("Availability API Time"); // start timer
    await connectDB();

    const { doctor, dates } = await req.json();

    let result = {};

    const timings = [
        "08:30-09:30",
        "10:30-11:30",
        "11:30-12:30",
        "12:30-01:30"
    ];

    // Fetch holidays
    const holidayDocs = await Holiday.find();

    const commonHolidayDates = new Set(
        holidayDocs.filter(h => h.type === "common").map(h => h.date)
    );

    const doctorHolidayDates = new Set(
        holidayDocs
            .filter(h => h.type === "doctor" && h.doctor === doctor)
            .map(h => h.date)
    );

    // 🔥 Fetch ALL bookings in ONE query
    const bookings = await Bookings.find({
        doctor,
        date: { $in: dates },
        paid: true
    });

    // Group bookings by date and time
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

    // Build result
    for (const d of dates) {

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

        const totalRemaining = Math.max(20 - totalCount, 0);

        result[d] = {
            totalRemaining,
            timings: {}
        };

        timings.forEach(t => {

            const timingCount = bookingMap[d]?.timings[t] || 0;

            const remaining = Math.max(2 - timingCount, 0);

            result[d].timings[t] = {
                remaining,
                available: remaining > 0 && totalRemaining > 0
            };

        });

    }
    console.timeEnd("Availability API Time"); // end timer
    return Response.json({ availability: result });

}
