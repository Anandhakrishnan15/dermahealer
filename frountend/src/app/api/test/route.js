import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
    try {
        await connectDB();
        return NextResponse.json({ message: "DB connected successfully 🚀" });
    } catch (err) {
        return NextResponse.json(
            { error: "DB connection failed", details: err.message },
            { status: 500 }
        );
    }
}
