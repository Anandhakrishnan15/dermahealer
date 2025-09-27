import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import File from "@/models/User"; // your Mongoose model
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(req) {
    try {
        // 1️⃣ Protect route: only admin
        await requireAdmin(req); // throws if not admin

        // 2️⃣ Connect to MongoDB
        await connectDB();

        // 3️⃣ Fetch all documents
        const files = await File.find().select("-__v"); // exclude version key

        return NextResponse.json({ files });
    } catch (err) {
        console.error("Files API error:", err.message);

        let status = 500;
        if (err.message === "Unauthorized") status = 401;
        if (err.message === "Forbidden") status = 403;

        return NextResponse.json({ error: err.message }, { status });
    }
}
