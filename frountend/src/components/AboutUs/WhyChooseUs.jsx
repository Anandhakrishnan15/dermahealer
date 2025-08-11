"use client";
import React from "react";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    CheckCircle2,
    Cpu,
    ClipboardCheck,
} from "lucide-react";

const values = [
    {
        title: "Safe & Hygienic Environment",
        desc: "Your safety is our priority with a clean, patient-friendly clinic.",
        icon: <ShieldCheck className="text-teal-400 w-8 h-8 mx-auto mb-4" />,
    },
    {
        title: "Effective Treatment Results",
        desc: "Proven solutions for acne, pigmentation, hair loss, and more.",
        icon: <CheckCircle2 className="text-cyan-400 w-8 h-8 mx-auto mb-4" />,
    },
    {
        title: "Latest Technology & Training",
        desc: "Highly trained staff exceeding top clinic standards.",
        icon: <Cpu className="text-indigo-500 w-8 h-8 mx-auto mb-4" />,
    },
    {
        title: "Ongoing Quality Checks",
        desc: "Regular reviews to maintain excellence in care.",
        icon: <ClipboardCheck className="text-purple-500 w-8 h-8 mx-auto mb-4" />,
    },
];

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const headingVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function WhyChooseUs() {
    return (
        <section className="bg-[var(--bg)] py-16">
            <div className="max-w-6xl mx-auto px-4">
                <motion.h2
                    className="text-3xl font-extrabold text-center mb-12 bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-500 bg-clip-text text-transparent select-none"
                    variants={headingVariants}
                    initial="hidden"
                    animate="visible"
                >
                    Why Choose Derma Healer?
                </motion.h2>

                <motion.div
                    className="grid md:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {values.map(({ title, desc, icon }, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(62, 208, 202, 0.3)" }}
                            className="bg-[var(--card)] text-[var(--text)] p-8 rounded-xl cursor-pointer text-center border border-[var(--border)] transition-shadow duration-5 ease-in-out"
                        >
                            {icon}
                            <h3 className="font-semibold text-xl mb-3">{title}</h3>
                            <p className="text-gray-600 text-sm">{desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
