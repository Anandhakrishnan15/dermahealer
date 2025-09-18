import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export function middleware(req) {
    const { pathname } = req.nextUrl;

    // Skip auth for login & signup
    if (pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized, no token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user data
        return NextResponse.next();
    } catch (err) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }
}

// Apply middleware only to /api routes
export const config = {
    matcher: ["/api/:path*"],
};
