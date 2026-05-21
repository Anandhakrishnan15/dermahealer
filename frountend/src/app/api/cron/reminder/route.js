import { sendRemindersJob } from "@/lib/sendReminders";

export async function GET(req) {
    try {
        const authHeader = req.headers.get("authorization");

        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return new Response("Unauthorized", { status: 401 });
        }

        const result = await sendRemindersJob();

        return Response.json({
            success: true,
            result,
        });
    } catch (error) {
        console.error("Cron reminder error:", error);

        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}
