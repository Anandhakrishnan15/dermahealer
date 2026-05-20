import { sendRemindersJob } from "@/lib/sendReminders";

export async function GET(req) {
    const authHeader = req.headers.get("authorization");

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response("Unauthorized", { status: 401 });
    }

    const result = await sendRemindersJob();

    return Response.json({
        success: true,
        result,
    });
}