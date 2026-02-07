"use client";
import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const CACHE_KEY = "rating_cache";
const CACHE_TIME = 60 * 60 * 1000; // 1 hour

const Rating = () => {
    const [rating, setRating] = useState(null);
    const hasFetched = useRef(false); // prevents strict-mode double call

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const cached = localStorage.getItem(CACHE_KEY);

        // 1️⃣ Use cache if valid
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);

            if (Date.now() - timestamp < CACHE_TIME) {
                setRating(data);
                return;
            }
        }

        // 2️⃣ Fetch API only if cache missing/expired
        const fetchRating = async () => {
            try {
                const res = await fetch("/api/rating");
                const data = await res.json();

                const ratingData = {
                    score: data.score,
                    reviews: data.reviews,
                };

                localStorage.setItem(
                    CACHE_KEY,
                    JSON.stringify({
                        data: ratingData,
                        timestamp: Date.now(),
                    })
                );

                setRating(ratingData);
            } catch (err) {
                console.error("Failed to fetch rating", err);
            }
        };

        fetchRating();
    }, []);

    if (!rating) return null;

    return (
        <div className="flex items-center gap-2">
            {/* ⭐ Stars */}
            <div className="flex text-yellow-400">
                {Array(5)
                    .fill(0)
                    .map((_, i) => (
                        <Star key={i} size={18} className="fill-yellow-400" />
                    ))}
            </div>

            {/* 🔢 Score + Reviews */}
            <span className="text-gray-600 font-medium">
                {rating.score}
                <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                    ({rating.reviews}+ reviews)
                </span>
            </span>
        </div>
    );
};

export default Rating;
