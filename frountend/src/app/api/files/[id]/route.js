import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { authMiddleware } from "@/middleware/auth";

// PATCH → Block/Unblock user
export async function PATCH(req, { params }) {
    try {
        const { id } = await params;

        const decoded = await authMiddleware(req);
        if (decoded.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const { blocked } = body;

        await connectDB();

        const user = await User.findByIdAndUpdate(
            id,
            { blocked },
            { new: true }
        );

        if (!user)
            return NextResponse.json({ error: "User not found" }, { status: 404 });

        return NextResponse.json({ success: true, blocked: user.blocked });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: err.message || "Unauthorized" },
            { status: 401 }
        );
    }
}

// DELETE → Delete user
export async function DELETE(req, { params }) {
    try {
        const { id } = await params;

        const decoded = await authMiddleware(req);
        if (decoded.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        await connectDB();

        const user = await User.findByIdAndDelete(id);
        if (!user)
            return NextResponse.json({ error: "User not found" }, { status: 404 });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: err.message || "Unauthorized" },
            { status: 401 }
        );
    }
}
