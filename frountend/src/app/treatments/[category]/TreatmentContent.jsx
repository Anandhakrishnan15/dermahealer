// src/app/treatments/[category]/[slug]/TreatmentContent.jsx
"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, Calendar, UserCheck, Star } from "lucide-react";

// Animation Variants
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const containerStagger = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

export default function TreatmentContent({ treatment }) {
    return (
        <main className="max-w-6xl mx-auto p-6 space-y-12">
            {/* Hero Section */}
            <section className="relative h-[500px] rounded-3xl overflow-hidden shadow-lg">
                {treatment.image && (
                    <img
                        src={treatment.image}
                        alt={treatment.label}
                        className="w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/40 flex flex-col justify-center items-center text-center p-6">
                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6 }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg mb-4"
                    >
                        {treatment.label}
                    </motion.h1>
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-2xl"
                    >
                        {treatment.description}
                    </motion.p>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="mt-6 flex gap-4"
                    >
                        <a
                            href="#book"
                            className="bg-[var(--primary-color)] text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-teal-600 transition"
                        >
                            Book Appointment
                        </a>
                        <a
                            href="#consult"
                            className="bg-white text-[var(--primary-color)] px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
                        >
                            Consult Now
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Procedure & Aftercare */}
            <motion.div
                variants={containerStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="flex flex-wrap gap-6"
            >
                {treatment.procedure && (
                    <motion.div
                        variants={fadeUp}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex-1 min-w-[300px] p-6 bg-[var(--card-bg)] rounded-3xl shadow-lg transition-shadow duration-300 hover:shadow-[0_10px_25px_rgba(14,165,233,0.5)]"
                    >
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 text-[var(--text)]">
                            <Clock className="w-6 h-6 text-[var(--primary-color)]" />
                            Procedure
                        </h2>
                        <p className="text-[var(--text)] whitespace-pre-line">
                            {treatment.procedure?.trim()}
                        </p>
                    </motion.div>
                )}

                {treatment.aftercare && (
                    <motion.div
                        variants={fadeUp}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex-1 min-w-[300px] p-6 bg-[var(--card-bg)] rounded-3xl shadow-lg transition-shadow duration-300 hover:shadow-[0_10px_25px_rgba(14,165,233,0.5)]"
                    >
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 text-[var(--text)]">
                            <UserCheck className="w-6 h-6 text-[var(--primary-color)]" />
                            Aftercare
                        </h2>
                        <p className="text-[var(--text)] whitespace-pre-line">
                            {treatment.aftercare?.trim()}
                        </p>
                    </motion.div>
                )}
            </motion.div>

            {/* Key Info */}
            <motion.section
                variants={containerStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid md:grid-cols-3 gap-6"
            >
                {treatment.duration && (
                    <motion.div
                        variants={fadeUp}
                        className="p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-lg transition flex items-start gap-3"
                        style={{ background: "var(--form-bg)" }}
                    >
                        <Clock className="w-7 h-7 text-[var(--primary-color)] mt-1" />
                        <div>
                            <h3 className="text-lg font-semibold text-[var(--text)]">
                                Duration
                            </h3>
                            <p className="text-[var(--text)]">{treatment.duration}</p>
                        </div>
                    </motion.div>
                )}
                {treatment.sessionsRequired && (
                    <motion.div
                        variants={fadeUp}
                        className="p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-lg transition flex items-start gap-3"
                        style={{ background: "var(--form-bg)" }}
                    >
                        <Calendar className="w-7 h-7 text-[var(--primary-color)] mt-1" />
                        <div>
                            <h3 className="text-lg font-semibold text-[var(--text)]">
                                Sessions Required
                            </h3>
                            <p className="text-[var(--text)]">
                                {treatment.sessionsRequired}
                            </p>
                        </div>
                    </motion.div>
                )}
                {treatment.suitableFor && (
                    <motion.div
                        variants={fadeUp}
                        className="p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-lg transition flex items-start gap-3"
                        style={{ background: "var(--form-bg)" }}
                    >
                        <Star className="w-7 h-7 text-[var(--primary-color)] mt-1" />
                        <div>
                            <h3 className="text-lg font-semibold text-[var(--text)]">
                                Suitable For
                            </h3>
                            <p className="text-[var(--text)]">{treatment.suitableFor}</p>
                        </div>
                    </motion.div>
                )}
            </motion.section>

            {/* Benefits */}
            {treatment.benefits && (
                <motion.section
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className="p-8 rounded-3xl shadow-lg"
                    style={{ background: "var(--card-bg)" }}
                >
                    <h2 className="text-4xl font-extrabold mb-6 text-center text-[var(--text)] flex justify-center items-center gap-3">
                        <CheckCircle className="w-8 h-8 text-[var(--primary-color)]" />
                        Benefits
                    </h2>
                    <motion.div
                        variants={containerStagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-4"
                    >
                        {treatment.benefits.map((b, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className="flex items-center gap-3 p-4 bg-[var(--form-bg)] rounded-xl shadow hover:scale-105 transition-transform"
                            >
                                <CheckCircle className="w-6 h-6 text-[var(--primary-color)]" />
                                <p className="text-[var(--text)]">{b}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>
            )}

            {/* Expected Results */}
            {treatment.expectedResults && (
                <motion.section
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className="p-8 rounded-3xl shadow-lg"
                    style={{ background: "var(--card-bg)" }}
                >
                    <h2 className="text-3xl font-bold mb-4 flex items-center text-[var(--text)] gap-2">
                        <CheckCircle className="w-6 h-6 text-[var(--primary-color)]" />
                        Expected Results
                    </h2>
                    <p className="text-[var(--text)] whitespace-pre-line">
                        {treatment.expectedResults}
                    </p>
                </motion.section>
            )}
        </main>
    );
}
