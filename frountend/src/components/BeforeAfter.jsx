"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

export default function BeforeAfterSlideshow({ data }) {
    const [current, setCurrent] = useState(0);

    // Auto change every 5s
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % data.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [data.length]);

    return (
        <div className="bg-[var(--bg)] py-12 px-4 md:px-8 text-center relative overflow-hidden">
            {/* ✅ Section Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-[#242c2c] mb-12">
                BEFORE AND AFTER <span className="text-[#5563ff]">OUR TREATMENT</span>
            </h2>

            <div className="flex justify-center items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16"
                    >
                        {/* Before Card */}
                        <motion.div
                            whileHover={{ rotate: -2, scale: 1.02 }}
                            className="bg-[var(--navbar-bg)] border border-[var(--border)] shadow-lg rounded-md p-3 transform rotate-[-3deg] w-64 relative"
                        >
                            <img
                                src={data[current].beforeImg}
                                alt="Before"
                                className="rounded-sm object-cover h-80 w-full"
                                draggable={false}
                            />
                            <p className="mt-2 font-semibold tracking-wide">BEFORE</p>

                            {/* Arrow (desktop) */}
                            <ArrowRight className="hidden md:block absolute top-1/2 -right-12 w-8 h-8 text-[#5563ff]" />
                        </motion.div>

                        {/* After Card */}
                        <motion.div
                            whileHover={{ rotate: 2, scale: 1.02 }}
                            className="bg-[var(--navbar-bg)] border border-[var(--border)] shadow-lg rounded-md p-3 transform rotate-[3deg] w-64 relative"
                        >
                            <img
                                src={data[current].afterImg}
                                alt="After"
                                className="rounded-sm object-cover h-80 w-full"
                                draggable={false}
                            />
                            <p className="mt-2 font-semibold tracking-wide">AFTER</p>

                            {/* Arrow (mobile stacked) */}
                            <ArrowDown className="md:hidden absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-8 h-8 text-[#5563ff]" />
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ✅ Heading + Description Below */}
            <motion.div
                key={current + "-text"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="mt-8"
            >
                {data[current].heading && (
                    <h3 className="text-xl font-semibold text-[#242c2c] mb-2">
                        {data[current].heading}
                    </h3>
                )}
                <p className="text-gray-700 max-w-2xl mx-auto text-sm md:text-base">
                    {data[current].description}
                </p>
            </motion.div>
        </div>
    );
}
