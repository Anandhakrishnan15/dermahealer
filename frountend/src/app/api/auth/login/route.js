import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function POST(req) {
    try {
        await connectDB();

        const { email, password } = await req.json();

        // ✅ Validate input
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // ✅ Find user
        const user = await User.findOne({ email });

        // 🔒 Don't reveal if user exists
        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // ✅ Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // 🔥 JWT with 18h expiry
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            JWT_SECRET,
            {
                expiresIn: "8h", // ✅ UPDATED
            }
        );

        // ✅ Safe user object
        const safeUser = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        };

        return NextResponse.json({
            message: "Login successful",
            token,
            user: safeUser,
        });

    } catch (err) {
        console.error("Login error:", err.message);

        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}