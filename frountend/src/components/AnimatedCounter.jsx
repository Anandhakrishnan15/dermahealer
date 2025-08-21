"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const stats = [
    { label: "Successful Treatments", value: 5000 },
    { label: "Happy Patients", value: 3500 },
    { label: "Years of Expertise", value: 30 },
];

function AnimatedCounter({ value, duration = 2000 }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1); // 0 → 1
            setCount(Math.floor(progress * value));

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    }, [value, duration]);

    return <span>{count.toLocaleString()}</span>;
}

export default function OurExperts() {
    return (
        <section className="relative py-16 px-6 md:px-12 bg-[var(--navbar-bg)] text-center overflow-hidden">
            {/* Top Wave Full Width */}
            <div className="absolute top-0 left-0 w-full">
                <svg
                    viewBox="0 0 1440 320"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-32 fill-[var(--bg)]"
                    preserveAspectRatio="none"
                >
                    <path d="M0,64L48,74.7C96,85,192,107,288,128C384,149,480,171,576,186.7C672,203,768,213,864,186.7C960,160,1056,96,1152,85.3C1248,75,1344,117,1392,138.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
                </svg>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-6xl font-extrabold mb-4 relative z-10">
                <span className="text-[var(--heading)]">Your Skin,</span>{" "}
                <span className="bg-gradient-to-r from-teal-500 to-emerald-600 bg-clip-text text-transparent">
                    Our Expertise
                </span>
            </h2>

            <p className="text-lg text-[var(--text)] max-w-2xl mx-auto mb-12 relative z-10">
                With decades of combined experience, advanced technologies, and a
                patient-first approach, our dermatologists are dedicated to helping you
                achieve healthy and glowing skin.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto relative z-10">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.2 }}
                        viewport={{ once: true }}
                        className="bg-[var(--bg)] shadow-md rounded-2xl p-6"
                    >
                        <h3 className="text-4xl font-bold text-teal-600 mb-2">
                            <AnimatedCounter value={stat.value} duration={2000} />+
                        </h3>
                        <p className="text-[var(--text)] font-medium">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
        </section>


    );
}
