// src/app/treatments/[category]/[slug]/TreatmentContent.jsx
"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, Calendar, UserCheck, Star } from "lucide-react";

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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl font-extrabold text-white drop-shadow-lg mb-4"
                    >
                        {treatment.label}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-lg text-white/90 max-w-2xl"
                    >
                        {treatment.description}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
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

           

            {/* Procedure & Aftercare as cards */}
            <div className="flex flex-wrap gap-6">
                {treatment.procedure && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 min-w-[300px] p-6 bg-[var(--card-bg)] dark:bg-[var(--card-bg-dark)] rounded-3xl shadow-lg transition-shadow duration-300 hover:shadow-[0_10px_25px_rgba(14,165,233,0.5)]"
                    >
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 text-[var(--heading-color)]">
                            <Clock className="w-6 h-6 text-[var(--primary-color)]" />
                            Procedure
                        </h2>
                        <p className="text-[var(--text-color)] whitespace-pre-line">
                            {treatment.procedure?.trim()}
                        </p>
                    </motion.div>
                )}

                {treatment.aftercare && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 min-w-[300px] p-6 bg-[var(--card-bg)] dark:bg-[var(--card-bg-dark)] rounded-3xl shadow-lg transition-shadow duration-300 hover:shadow-[0_10px_25px_rgba(14,165,233,0.5)]"
                    >
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 text-[var(--heading-color)]">
                            <UserCheck className="w-6 h-6 text-[var(--primary-color)]" />
                            Aftercare
                        </h2>
                        <p className="text-[var(--text-color)] whitespace-pre-line">
                            {treatment.aftercare?.trim()}
                        </p>
                    </motion.div>
                )}
            </div>



            {/* Key Info */}
            <section className="grid md:grid-cols-3 gap-6">
                {treatment.duration && (
                    <motion.div className="p-6 bg-teal-50 dark:bg-gray-800 rounded-2xl shadow-lg hover:scale-105 transition flex items-center gap-3">
                        <Clock className="w-6 h-6 text-[var(--primary-color)]" />
                        <div>
                            <h3 className="text-xl font-semibold mb-1 text-gray-200">Duration</h3>
                            <p className="text-gray-200">{treatment.duration}</p>
                        </div>
                    </motion.div>
                )}
                {treatment.sessionsRequired && (
                    <motion.div className="p-6 bg-teal-50 dark:bg-gray-800 rounded-2xl shadow-lg hover:scale-105 transition flex items-center gap-3">
                        <Calendar className="w-6 h-6 text-[var(--primary-color)]" />
                        <div>
                            <h3 className="text-xl font-semibold mb-1 text-gray-200">Sessions Required</h3>
                            <p className="text-gray-200">{treatment.sessionsRequired}</p>
                        </div>
                    </motion.div>
                )}
                {treatment.suitableFor && (
                    <motion.div className="p-6 bg-teal-50 dark:bg-gray-800 rounded-2xl shadow-lg hover:scale-105 transition flex items-center gap-3">
                        <Star className="w-6 h-6 text-[var(--primary-color)]" />
                        <div>
                            <h3 className="text-xl font-semibold mb-1 text-gray-200">Suitable For</h3>
                            <p className="text-gray-200" >{treatment.suitableFor}</p>
                        </div>
                    </motion.div>
                )}
            </section>

            {/* Benefits */}
            {treatment.benefits && (
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-teal-50 to-teal-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-lg"
                >
                    <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-200 flex justify-center items-center gap-3">
                        <CheckCircle className="w-8 h-8 text-[var(--primary-color)]" />
                        Benefits
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {treatment.benefits.map((b, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 p-4 bg-[var(--card-bg)] dark:bg-[var(--card-bg-dark)] rounded-xl shadow hover:scale-105 transition-transform"
                            >
                                <CheckCircle className="w-6 h-6 text-[var(--primary-color)]" />
                                <p className="text-gray-200">{b}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>
            )}

            {/* Expected Results */}
            {treatment.expectedResults && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-lg"
                >
                    <h2 className="text-3xl font-bold mb-4 flex items-center text-gray-200 gap-2">
                        <CheckCircle className="w-6 h-6 text-[var(--primary-color)]" />
                        Expected Results
                    </h2>
                    <p className="text-gray-200 whitespace-pre-line">
                        {treatment.expectedResults}
                    </p>
                </motion.section>
            )}

            
        </main>
    );
}
