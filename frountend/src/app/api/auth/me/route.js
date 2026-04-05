import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { authMiddleware } from "@/middleware/auth";

export async function GET(req) {
    try {
        await connectDB();

        const decoded = await authMiddleware(req);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }

        const safeUser = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        };

        return NextResponse.json({ user: safeUser });

    } catch (err) {
        console.error("auth/me error:", err.message);

        return NextResponse.redirect(new URL("/auth", req.url));
    }
}