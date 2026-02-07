// app/api/staff/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { authMiddleware } from "@/middleware/auth";

export async function POST(req) {
    try {
        await connectDB();

        // ✅ Verify token inside route
        let decoded;
        try {
            decoded = await authMiddleware(req);
        } catch (err) {
            return NextResponse.json({ error: err.message }, { status: 401 });
        }
        console.log(decoded);
        

        if (decoded.role !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { email, password, username, phone } = await req.json();

        if (!email || !password || !username || !phone) {
            return NextResponse.json({ error: "All fields required" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStaff = await User.create({
            email,
            username,
            phone,
            password: hashedPassword,
            role: "staff",
            blocked: true,
        });

        return NextResponse.json(
            { message: "Staff created", staffId: newStaff._id },
            { status: 201 }
        );
    } catch (err) {
        console.error("❌ Error in staff API:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
