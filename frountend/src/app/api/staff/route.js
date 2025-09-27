// app/api/staff/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // your NextAuth config
import prisma from "@/lib/prisma"; // your DB client

export async function POST(req) {
    try {
        // 1️⃣ Get session
        const session = await getServerSession(authOptions);

        // 2️⃣ Check if logged in
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 3️⃣ Check if admin
        if (session.user.role !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // 4️⃣ Parse request data
        const { email, password, name } = await req.json();
        if (!email || !password || !name) {
            return NextResponse.json({ error: "All fields required" }, { status: 400 });
        }

        // 5️⃣ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 6️⃣ Create staff user
        const newStaff = await prisma.user.create({
            data: { email, name, password: hashedPassword, role: "staff" },
        });

        return NextResponse.json({ message: "Staff created", staffId: newStaff.id });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
