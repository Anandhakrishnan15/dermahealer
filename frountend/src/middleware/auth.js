// middleware/auth.js
import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function authMiddleware(req) {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
        throw new Error("No token provided");
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        // Check if required fields exist
        if (!decoded.id || !decoded.email) {
            throw new Error("Invalid token payload");
        }

        return decoded; // return decoded token to the route
    } catch (err) {
        // Customize the error message
        throw new Error(err.message || "Invalid or expired token");
    }
}
