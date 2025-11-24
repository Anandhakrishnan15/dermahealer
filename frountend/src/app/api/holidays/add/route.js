import Holiday from "@/models/Holiday";
import { connectDB } from "@/lib/mongodb";

export async function POST(req) {
    await connectDB();
    const { date, reason, type, doctor } = await req.json();

    if (!date) return Response.json({ error: "Date is required" });

    if (type === "doctor" && !doctor)
        return Response.json({ error: "Doctor is required" });

    const exists = await Holiday.findOne({ date, type, doctor });

    if (exists)
        return Response.json({ error: "Already added!" });

    await Holiday.create({ date, reason, type, doctor });

    return Response.json({ success: true });
}
