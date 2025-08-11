"use client";
import React from "react";
import { motion } from "framer-motion";

export default function FinalCTA() {
    return (
        <section className="relative text-center py-16 overflow-hidden rounded-lg">
            {/* Animated gradient background */}
            <motion.div
                className="absolute inset-0 -z-10 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500"
                style={{ filter: "blur(80px)" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Overlay for better contrast */}
            <div className="absolute inset-0 bg-black/40 -z-5 rounded-lg" />

            {/* Content */}
            <h2 className="relative text-3xl font-extrabold mb-4 text-white font-sans">
                Ready for Healthier Skin?
            </h2>
            <p className="relative mb-8 text-white text-lg max-w-xl mx-auto px-4">
                Book your consultation today and take the first step towards confidence.
            </p>
            <button
                className="relative px-8 py-3 bg-white text-teal-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
                onClick={() => alert("Appointment Scheduled!")}
            >
                Schedule Appointment
            </button>
        </section>
    );
}
