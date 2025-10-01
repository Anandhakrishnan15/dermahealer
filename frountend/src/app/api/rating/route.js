// app/api/rating/route.js
import { connectDB } from "@/lib/mongodb";
import Rating from "@/models/Rating";
import { NextResponse } from "next/server";

// GET the current rating
export async function GET() {
    try {
        await connectDB();

        const rating = await Rating.findOne();
        if (!rating) {
            return NextResponse.json({ score: 0, reviews: 0 });
        }

        return NextResponse.json(rating);
    } catch (err) {
        console.error("Failed to fetch rating:", err);
        return NextResponse.json(
            { error: "Failed to fetch rating" },
            { status: 500 }
        );
    }
}

// POST update rating
export async function PATCH(req) {
    try {
        await connectDB();

        const { score, reviews } = await req.json();

        if (score === undefined || reviews === undefined) {
            return NextResponse.json(
                { error: "score and reviews are required" },
                { status: 400 }
            );
        }

        const updated = await Rating.findOneAndUpdate(
            {},
            { score, reviews, updatedAt: new Date() },
            { new: true, upsert: true }
        );

        return NextResponse.json(updated);
    } catch (err) {
        console.error("Failed to update rating:", err);
        return NextResponse.json(
            { error: "Failed to update rating" },
            { status: 500 }
        );
    }
}
