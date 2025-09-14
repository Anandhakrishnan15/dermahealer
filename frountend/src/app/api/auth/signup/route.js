import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connectDB();
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return NextResponse.json({ error: "All fields required" }, { status: 400 });
        }

        // check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return NextResponse.json({ message: "User registered successfully 🚀" }, { status: 201 });
    } catch (err) {
        console.error("Signup error:", err);
        return NextResponse.json({ error: "Signup failed", details: err.message }, { status: 500 });
    }
}
