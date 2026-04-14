import { sendRemindersJob } from "@/lib/sendReminders";

export async function GET(req) {
    if (
        !req.headers.get("x-vercel-cron") &&
        req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
    ) {
        return new Response("Unauthorized", { status: 401 });
    }

    const result = await sendRemindersJob();

    return Response.json({ success: true, result });
}