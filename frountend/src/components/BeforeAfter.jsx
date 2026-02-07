"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function MultiImageSlideshow() {
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(true);

    // --- Lazy fetch treatments
    useEffect(() => {
        const controller = new AbortController();
        const fetchTreatments = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/update-treatments", { signal: controller.signal });
                if (!res.ok) throw new Error("Failed to fetch treatments");
                const treatments = await res.json();
                setData(treatments.treatments || []);
            } catch (err) {
                if (err.name !== "AbortError") console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTreatments();
        return () => controller.abort();
    }, []);

    // --- Auto-slide every 5s
    useEffect(() => {
        if (!data.length) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % data.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [data]);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % data.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + data.length) % data.length);

    // --- Skeleton loader
    if (loading)
        return (
            <div className="relative w-full max-w-6xl mx-auto py-12 px-4 flex flex-col items-center gap-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
                    BEFORE & AFTER<br /> <span className="text-blue-600">OUR TREATMENTS</span>
                </h2>
                <div className="flex justify-center gap-4 flex-wrap animate-pulse">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-40 md:w-56 h-40 md:h-56 bg-gray-300 rounded-md" />
                    ))}
                </div>
                <div className="text-center mt-6 space-y-2">
                    <div className="h-6 w-64 md:w-96 bg-gray-300 rounded mx-auto animate-pulse"></div>
                    <div className="h-4 w-80 md:w-96 bg-gray-300 rounded mx-auto animate-pulse"></div>
                </div>
            </div>
        );

    if (!data.length) return <p className="text-center py-12">No treatments available.</p>;

    const currentSlide = data[current];

    return (
        <div className="relative w-full max-w-6xl mx-auto py-12 px-4 flex flex-col items-center gap-6">
            <h2 className="text-3xl md:text-4xl font-bold [var(--text)] mb-8 text-center">
                BEFORE & AFTER<br /> <span className="text-blue-600">OUR TREATMENTS</span>
            </h2>

            {/* Images Section */}
            <div className="flex justify-center gap-4 flex-wrap transition-all duration-500 ease-in-out">
                {currentSlide.images.slice(0, 3).map((imgSrc, index) => (
                    <div key={index} className="rounded-md overflow-hidden shadow-lg w-40 md:w-56">
                        <img
                            src={imgSrc}
                            alt={`${currentSlide.heading} Image ${index + 1}`}
                            className="w-full h-40 md:h-56 object-cover transition-transform duration-300 hover:scale-105"
                            loading="lazy"
                            draggable={false}
                        />
                    </div>
                ))}
            </div>

            {/* Text Section */}
            <div className="text-center max-w-3xl transition-opacity duration-500 ease-in-out mt-6">
                <h3 className="text-2xl md:text-3xl font-semibold [var(--text)] mb-2">{currentSlide.heading}</h3>
                <p className="[var(--text)] text-sm md:text-base">{currentSlide.description}</p>

                <div className="flex gap-4 justify-center mt-4">
                    <button
                        onClick={prevSlide}
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
