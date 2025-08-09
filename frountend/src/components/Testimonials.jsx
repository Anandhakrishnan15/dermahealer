"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

export const Testimonials = () => {
    const demoTestimonials = [
        {
            quote:
                "Absolutely transformed my skin! The team is professional, caring, and delivers amazing results.",
            name: "Sarah Johnson",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            quote:
                "I’ve never felt more confident. The before/after difference is unbelievable.",
            name: "Michael Lee",
            rating: 4,
            image: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
            quote:
                "From the moment I walked in, I felt at ease. The results exceeded my expectations!",
            name: "Emily Carter",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/68.jpg",
        },
        {
            quote:
                "Skin transformation beyond my expectations. Highly recommend their services!",
            name: "David Green",
            rating: 5,
            image: "https://randomuser.me/api/portraits/men/50.jpg",
        },
    ];

    // Duplicate array so it loops seamlessly
    const loopTestimonials = [...demoTestimonials, ...demoTestimonials];

    return (
        <section className="py-16 bg-[var(--sbg)] overflow-hidden">
            <h2 className="text-center text-3xl font-bold mb-10 text-white">
                What Our Clients Say
            </h2>

            <motion.div
                className="flex gap-6"
                animate={{ x: ["0%", "-50%"] }} // move half of total width
                transition={{
                    repeat: Infinity,
                    duration: 20,
                    ease: "linear",
                }}
            >
                {loopTestimonials.map((t, idx) => (
                    <div
                        key={idx}
                        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg min-w-[280px] max-w-[300px] flex-shrink-0"
                    >
                        <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                            "{t.quote}"
                        </p>

                        <div className="flex items-center gap-3">
                            <img
                                src={t.image}
                                alt={t.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${i < t.rating
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-gray-300 dark:text-gray-600"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <h4 className="font-semibold text-gray-800 dark:text-white">
                                    {t.name}
                                </h4>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </section>
    );
};
