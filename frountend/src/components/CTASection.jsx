"use client"
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

export const CTASection = () => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };

        handleResize(); // set initial size
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className="relative py-16 bg-indigo-600 text-center text-white overflow-hidden">
            {/* Render Confetti only when dimensions are known */}
            {dimensions.width > 0 && dimensions.height > 0 && (
                <Confetti
                    width={dimensions.width}
                    height={dimensions.height}
                    numberOfPieces={150}
                    recycle={true}
                    gravity={0.2}
                    colors={["#F59E0B", "#EF4444", "#10B981", "#3B82F6", "#8B5CF6"]}
                />
            )}

            <h2 className="text-3xl md:text-4xl font-bold">
                Ready for Your Transformation?
            </h2>
            <p className="mt-2 text-lg max-w-xl mx-auto">
                Book your appointment today and take the first step toward your new look.
            </p>
            <button
                aria-label="Book your appointment now"
                className="mt-6 px-8 py-3 bg-white text-indigo-600 font-bold rounded-full hover:bg-gray-100 transition"
            >
                Book Now
            </button>
        </section>
    );
};
