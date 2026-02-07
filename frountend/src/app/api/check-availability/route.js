import { connectDB } from "@/lib/mongodb";
import Bookings from "@/models/Bookings";
import Holiday from "@/models/Holiday";

export async function POST(req) {
    await connectDB();

    const { doctor, dates } = await req.json(); // doctor = selected doctor

    let result = {};

    // Fetch ALL holidays
    const holidayDocs = await Holiday.find();

    // Prepare separate lists
    const commonHolidayDates = new Set(
        holidayDocs.filter(h => h.type === "common").map(h => h.date)
    );

    const doctorHolidayDates = new Set(
        holidayDocs
            .filter(h => h.type === "doctor" && h.doctor === doctor)
            .map(h => h.date)
    );

    for (const d of dates) {

        // ✔ BLOCK COMMON HOLIDAY (All Doctors)
        if (commonHolidayDates.has(d)) {
            result[d] = 0;
            continue;
        }

        // ✔ BLOCK SPECIFIC DOCTOR HOLIDAY
        if (doctorHolidayDates.has(d)) {
            result[d] = 0;
            continue;
        }

        // ✔ Count only paid bookings for this doctor on this date
        const count = await Bookings.countDocuments({
            doctor,
            date: d,
            paid: true,
        });

        result[d] = Math.max(10 - count, 0);
    }

    return Response.json({ availability: result });
}
