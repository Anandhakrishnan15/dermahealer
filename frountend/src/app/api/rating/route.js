// app/api/rating/route.js
export const runtime = "nodejs";

import { connectDB } from "@/lib/mongodb";
import Rating from "@/models/Rating";
import { NextResponse } from "next/server";

// GET rating
export async function GET() {
    try {
        await connectDB();
        const rating = await Rating.findOne();
        return NextResponse.json(rating || { score: 0, reviews: 0 });
    } catch (err) {
        console.error("GET rating error:", err);
        return NextResponse.json({ error: "Failed to fetch rating" }, { status: 500 });
    }
}

// UPDATE rating
export async function PATCH(req) {
    try {
        await connectDB();
        const { score, reviews } = await req.json();

        const scoreNum = Number(score);
        const reviewsNum = Number(reviews);

        if (Number.isNaN(scoreNum) || Number.isNaN(reviewsNum)) {
            return NextResponse.json(
                { error: "score and reviews must be numbers" },
                { status: 400 }
            );
        }

        const updated = await Rating.findOneAndUpdate(
            {},
            { score: scoreNum, reviews: reviewsNum },
            { new: true, upsert: true, runValidators: true }
        );

        return NextResponse.json(updated);
    } catch (err) {
        console.error("PATCH rating error:", err);
        return NextResponse.json({ error: "Failed to update rating" }, { status: 500 });
    }
}
