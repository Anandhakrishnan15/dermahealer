"use client";
import { motion } from "framer-motion";

export default function StatsGrid({ stats }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 rounded-lg shadow hover:shadow-lg transition"
                    style={{ background: "var(--bg)" }}
                >
                    <h2 className="text-gray-600 text-sm">{stat.label}</h2>
                    <p className="text-2xl font-bold">{stat.value}</p>
                </motion.div>
            ))}
        </div>
    );
}
