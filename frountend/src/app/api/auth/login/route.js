import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // put in .env.local

export async function POST(req) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email & Password required" }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email,role:user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return NextResponse.json({
            
            
            message: "Login successful",
            token,
            user: { id: user._id, username: user.username, email: user.email ,role: user.role },
        });
    } catch (err) {
        console.error("Login error:", err);
        return NextResponse.json({ error: "Login failed", details: err.message }, { status: 500 });
    }
}
