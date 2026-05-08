import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { authMiddleware } from "@/middleware/auth";

export async function GET(req) {

    try {

        await connectDB();

        const decoded = await authMiddleware(req);

        const user = await User.findById(decoded.id)
            .select("-password");

        // User not found
        if (!user) {

            return NextResponse.json(
                {
                    success: false,
                    error: "User not found",
                },
                {
                    status: 404,
                }
            );
        }

        const safeUser = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        };

        return NextResponse.json({
            success: true,
            user: safeUser,
        });

    } catch (err) {

        console.error("auth/me error:", err.message);


        return NextResponse.json(
            {
                success: false,
                error: err.message || "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }
}