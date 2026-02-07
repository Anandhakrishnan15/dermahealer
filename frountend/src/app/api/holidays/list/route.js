import Holiday from "@/models/Holiday";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
    await connectDB();
    const all = await Holiday.find().sort({ date: 1 });

    const common = all.filter(h => h.type === "common");
    const dr_hena = all.filter(h => h.type === "doctor" && h.doctor === "Dr. Neha Rani");
    const dr_sharma = all.filter(h => h.type === "doctor" && h.doctor === "Dr. B.K. Sharma");

    return Response.json({ all, common, dr_hena, dr_sharma });
}
