// api /corn/reminder
import { NextResponse } from "next/server";

export async function GET(req) {
    if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/add-patient/follow-up/send-reminders`
        );

        const data = await res.json();

        console.log("⏰ Reminder Cron:", data);

        return NextResponse.json({
            success: true,
            job: "reminders",
            data,
        });

    } catch (err) {
        console.error("🔥 Reminder Cron Error:", err);

        return NextResponse.json(
            { success: false },
            { status: 500 }
        );
    }
}