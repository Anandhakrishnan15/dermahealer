"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function MultiImageSlideshow({ data }) {
    const [current, setCurrent] = useState(0);
    const timeoutRef = useRef(null);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % data.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + data.length) % data.length);
    };

    // Clear timeout on unmount
    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    const currentSlide = data[current];

    return (
        <div className="relative w-full max-w-6xl mx-auto py-12 px-4 flex flex-col items-center gap-6">

            {/* ✅ Section Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-8 text-center">
                BEFORE & AFTER<br /> <span className="text-blue-600">OUR TREATMENTS</span>
            </h2>

            {/* Images Section (top, max 3 images) */}
            <AnimatePresence mode="wait" onExitComplete={() => {
                // ⏱ Start timer *after* animation finishes
                clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(nextSlide, 5000);
            }}>
                <motion.div
                    key={current + "-images"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center gap-4 flex-wrap"
                >
                    {currentSlide.images.slice(0, 3).map((imgSrc, index) => (
                        <div key={index} className="rounded-md overflow-hidden shadow-lg w-40 md:w-56">
                            <img
                                src={imgSrc}
                                alt={`${currentSlide.heading} Image ${index + 1}`}
                                className="w-full h-40 md:h-56 object-cover"
                                draggable={false}
                            />
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Text Section */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current + "-text"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl"
                >
                    {currentSlide.heading && (
                        <h3 className="text-2xl md:text-3xl font-semibold text-[var(--text)] mb-2">
                            {currentSlide.heading}
                        </h3>
                    )}
                    <p className="text-gray-700 text-sm md:text-base">{currentSlide.description}</p>

                    {/* Navigation Arrows */}
                    <div className="flex gap-4 justify-center mt-4">
                        <button
                            onClick={prevSlide}
                            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
