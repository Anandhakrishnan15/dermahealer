import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connectDB();
        const { username, email, phone, password, role } = await req.json();

        if (!username || !email || !password || !phone) {
            return NextResponse.json({ error: "All fields required" }, { status: 400 });
        }

        // check if email or phone exists
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return NextResponse.json({ error: "Email or phone already exists" }, { status: 400 });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            phone,
            password: hashedPassword,
            role: role || "staff", // default to staff
            blocked: true, // blocked by default
        });

        await newUser.save();

        return NextResponse.json({ message: "Staff account created successfully" }, { status: 201 });
    } catch (err) {
        console.error("Create staff error:", err);
        return NextResponse.json({ error: "Failed to create staff", details: err.message }, { status: 500 });
    }
}
