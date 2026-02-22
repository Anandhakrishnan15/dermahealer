// app/api/cron/route.js
import { NextResponse } from "next/server";
import { sendDailyBookingSummary } from "../bookings-summary/route";
// import { sendDailyBookingSummary } from "@/lib/sendDailyBookingSummary";

export async function GET(req) {
    // Optional: security check
    if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        await sendDailyBookingSummary();
        return NextResponse.json({ message: "Daily summary sent!" });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to send daily summary" }, { status: 500 });
    }
}