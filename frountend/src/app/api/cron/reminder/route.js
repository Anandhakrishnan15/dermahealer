import { sendRemindersJob } from "@/lib/sendReminders";

export async function GET(req) {
    try {
        console.log("Cron triggered");

        const authHeader =
            req.headers.get("authorization");

        console.log("AUTH:", authHeader);

        if (
            authHeader !==
            `Bearer ${process.env.CRON_SECRET}`
        ) {
            console.log("Unauthorized");

            return new Response(
                "Unauthorized",
                { status: 401 }
            );
        }

        console.log("Running reminders");

        const result =
            await sendRemindersJob();

        console.log("Success");

        return Response.json({
            success: true,
            result,
        });
    } catch (error) {
        console.error("CRON ERROR:", error);

        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}