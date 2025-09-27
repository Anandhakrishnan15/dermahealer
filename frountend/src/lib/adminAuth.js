import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function requireAdmin(req) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
        return decoded; // contains id, role, etc.
    } catch (err) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}
