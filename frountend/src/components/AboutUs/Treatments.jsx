"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Treatments() {
    const treatments = [
        "Acne & Acne Scar Treatment",
        "Pigmentation Removal",
        "Laser Hair Removal",
        "Anti-Aging & Skin Rejuvenation",
        "Hair Restoration (PRP Therapy)",
        "Vitiligo Treatment",
    ];

    // Animation variants for list items
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: i => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.15, type: "spring", stiffness: 100 },
        }),
    };

    return (
        <section className="py-16 bg-[var(--sbg)]">
            <div className="max-w-5xl mx-auto px-6">
                <h2 className="text-4xl font-extrabold text-center mb-12 text-white tracking-wide drop-shadow-md">
                    Our Best Treatments
                </h2>

                <ul className="grid md:grid-cols-2 gap-8 text-center">
                    {treatments.map((treatment, i) => (
                        <motion.li
                            key={i}
                            className="bg-[var(--bg)] rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-2xl hover:scale-[1.05] transition-transform duration-300 select-none  font-semibold"
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={itemVariants}
                        >
                            {treatment}
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
