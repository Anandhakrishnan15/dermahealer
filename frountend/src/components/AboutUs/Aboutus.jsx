"use client";
import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        <section className="py-20 bg-[var(--bg)]">
            {/* Heading */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text)] mb-6"
            >
                Who We Are
            </motion.h2>

            {/* Subheading */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-center text-lg md:text-xl text-indigo-400 mb-12"
            >
                Welcome to <span className="font-semibold">Derma Healer</span> – Best Skin & Laser Clinic in Siwan, Bihar
            </motion.p>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 text-center text-[var(--text)] md:text-left space-y-6">
                {[
                    `Derma Healer is a leading dermatology and aesthetic laser clinic in Siwan, Bihar,
                    dedicated to advanced and affordable skin, hair, and laser treatments. Founded by
                    Dr. Neha Rani and supported by senior dermatologist Dr. B.K. Sharma, our expert team offers
                    personalized care using USFDA-approved technologies.`,

                    `We specialize in treatments for acne, acne scars, pigmentation, laser hair removal,
                    vitiligo, anti-aging, skin rejuvenation, PRP therapy, and more. At Derma Healer, our goal
                    is to combine evidence-based dermatology with compassionate care, ensuring visible results
                    and long-term skin health.`,

                    `If you’re searching for the best dermatologist in Siwan, or looking for safe and effective
                    laser treatment in Bihar, Derma Healer is your trusted destination.`
                ].map((text, i) => (
                    <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * i, duration: 0.6 }}
                        className="leading-relaxed"
                    >
                        {text}
                    </motion.p>
                ))}
            </div>

            {/* Founders Section */}
            {/* <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="max-w-5xl mx-auto mt-16 px-4"
            >
                <Doctors />
            </motion.div> */}
        </section>
    );
}
