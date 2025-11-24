import Holiday from "@/models/Holiday";
import { connectDB } from "@/lib/mongodb";

export async function POST(req) {
    await connectDB();
    const { date, type, doctor } = await req.json();

    const result = await Holiday.findOneAndDelete({ date, type, doctor });

    if (!result)
        return Response.json({ error: "Holiday not found" });

    return Response.json({ success: true });
}
