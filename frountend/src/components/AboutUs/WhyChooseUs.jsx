"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { annotate } from "rough-notation";
import {
    UserCheck,
    Cpu,
    HeartPulse,
    Activity,
    ShieldCheck,
    Star,
} from "lucide-react";

const values = [
    {
        icon: <UserCheck className="text-teal-500 w-8 h-8 mb-3" />,
        title: "Expert Dermatologists",
        desc: "Clinic led by experienced dermatologists with years of trusted care.",
    },
    {
        icon: <Cpu className="text-cyan-500 w-8 h-8 mb-3" />,
        title: "Modern Technology",
        desc: "USFDA-approved lasers and advanced equipment for safe treatments.",
    },
    {
        icon: <HeartPulse className="text-pink-500 w-8 h-8 mb-3" />,
        title: "Personalized Care",
        desc: "Customized plans for skin, hair, and body concerns.",
    },
    {
        icon: <Activity className="text-indigo-500 w-8 h-8 mb-3" />,
        title: "Non-Invasive Treatments",
        desc: "Safe, result-oriented, and minimally invasive procedures.",
    },
    {
        icon: <ShieldCheck className="text-green-500 w-8 h-8 mb-3" />,
        title: "Safe & Hygienic",
        desc: "Clean, patient-friendly environment with strict hygiene protocols.",
    },
    {
        icon: <Star className="text-yellow-500 w-8 h-8 mb-3" />,
        title: "Trusted in Bihar",
        desc: "A well-known clinic with visible results and patient satisfaction.",
    },
];

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const headingVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function WhyChooseUs() {
    const headingRef = useRef(null);
    const annotationRef = useRef(null);

    useEffect(() => {
        if (headingRef.current) {
            annotationRef.current = annotate(headingRef.current, {
                type: "underline",
                color: "#ef4444",
                strokeWidth: 6,
                padding: 4,
                animationDuration: 800,
            });
        }
    }, []);

    return (
        <section className="bg-[var(--bg)] py-16">
            <div className="max-w-6xl mx-auto px-4">
                {/* Heading */}
                <motion.h2
                    className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-500 bg-clip-text text-transparent select-none"
                    variants={headingVariants}
                    initial="hidden"
                    animate="visible"
                    onAnimationComplete={() => annotationRef.current?.show()}
                >
                    Why Choose Derma Healer,{" "}
                    <span ref={headingRef}>Siwan?</span>
                </motion.h2>

                {/* Grid items */}
                <motion.div
                    className="grid md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {values.map(({ icon, title, desc }, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                            }}
                            className="bg-[var(--card)] text-[var(--text)] p-8 rounded-2xl text-center border border-[var(--border)] transition-shadow duration-500"
                        >
                            {/* Center the icon */}
                            <div className="flex justify-center items-center mb-2">
                                {icon}
                            </div>

                            <h3 className="text-xl font-semibold mb-2">{title}</h3>
                            <p className="text-gray-600 text-sm">{desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
