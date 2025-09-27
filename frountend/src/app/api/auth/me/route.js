// app/api/auth/me/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { authMiddleware } from "@/middleware/auth";

export async function GET(req) {
    try {
        // 1️⃣ Connect to MongoDB
        await connectDB();

        // 2️⃣ Authenticate user
        const decoded = await authMiddleware(req); // throws if invalid

        // 3️⃣ Find user by ID and exclude password
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // 4️⃣ Role-aware response (optional)
        const safeUser = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role, // admin or staff
            createdAt: user.createdAt,
        };

        return NextResponse.json({ user: safeUser });
    } catch (err) {
        console.error("auth/me error:", err.message);
        return NextResponse.json(
            { error: err.message || "Unauthorized" },
            { status: 401 }
        );
    }
}
