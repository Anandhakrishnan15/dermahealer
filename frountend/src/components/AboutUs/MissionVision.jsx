"use client";
import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.3, duration: 0.6, ease: "easeOut" },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function MissionVision() {
    return (
        <motion.section
            className="max-w-6xl mx-auto py-16 px-6 grid gap-12 md:grid-cols-2 mandv"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            {/* Mission */}
            <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
                <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-500 bg-clip-text text-transparent">
                    Our Mission
                </h2>
                <div className="w-24 h-1 mb-6 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400" />
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    To provide advanced, ethical, and affordable dermatology and laser
                    treatments, ensuring safe, visible, and lasting results for every
                    patient.
                </p>
            </motion.div>

            {/* Vision */}
            <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
                <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                    Our Vision
                </h2>
                <div className="w-24 h-1 mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    To be the most trusted skin, hair, and laser clinic in Bihar, setting
                    new standards in patient safety, innovation, and treatment results.
                </p>
            </motion.div>

            {/* Core Values */}
            <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
                <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-green-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent">
                    Core Values
                </h2>
                <div className="w-24 h-1 mb-6 rounded-full bg-gradient-to-r from-green-400 to-lime-400" />
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    Compassion, integrity, and innovation guide every treatment we offer.
                    We put our patients first, providing personalized care that inspires confidence.
                </p>
            </motion.div>

            {/* Our Approach */}
            <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
                <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Our Approach
                </h2>
                <div className="w-24 h-1 mb-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    Combining the latest technology with expert care, we customize each
                    treatment plan to deliver effective and lasting results.
                </p>
            </motion.div>

            {/* Commitment to Quality */}
            <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 md:col-span-2"
            >
                <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                    Commitment to Quality
                </h2>
                <div className="w-24 h-1 mb-6 rounded-full bg-gradient-to-r from-pink-400 to-red-400" />
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    We continually evaluate and improve our techniques to uphold the
                    highest standards in dermatology and laser care, ensuring your health
                    and satisfaction come first.
                </p>
            </motion.div>
        </motion.section>
    );
}
