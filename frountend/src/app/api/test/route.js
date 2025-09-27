import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(req) {
    try {
        // 1️⃣ Require admin access
        const session = await requireAdmin(req);
        if (!session) return; // requireAdmin already sent 401/403

        // 2️⃣ Connect to MongoDB
        await connectDB();

        // 3️⃣ Success response
        return NextResponse.json({ message: "DB connected successfully 🚀" });
    } catch (err) {
        console.error("DB check error:", err.message);
        return NextResponse.json(
            { error: "DB connection failed", details: err.message },
            { status: 500 }
        );
    }
}
