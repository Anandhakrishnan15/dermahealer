"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

export const Testimonials = () => {
    const demoTestimonials = [
        {
            quote:
                "My acne was severe, and nothing seemed to work until I visited this clinic. Their advanced acne management plan, including oral and topical treatments, cleared my skin completely. Best Leprosy care with expert dermatologists.",
            name: "Palak Kumari",
            rating: 5,
        },
        {
            quote:
                "The team at Derma Healer helped me manage my rosacea with personalized skincare and laser treatments for redness. My skin is now clearer, and I feel more confident. Best place for rosacea treatment!",
            name: "Shiya Kumari",
            rating: 5,
        },
        {
            quote:
                "I started noticing white patches on my skin and consulted here immediately. Early intervention helped prevent the spread, and the results are remarkable. Best clinic for vitiligo treatment in Bihar.",
            name: "Golu Yadav",
            rating: 5,
        },
        {
            quote:
                "I had white patches due to vitiligo, which were spreading. After starting treatment, I noticed significant improvements. Dr. Binay Kumar Sharma provided the best care and guided me through the process. Best vitiligo treatment in Siwan.",
            name: "Rahul Kumar",
            rating: 5,
        },
        {
            quote:
                "I was experiencing hair loss and dandruff, but the experts Dr. B.K. Sharma & Dr. Neha Rani provided the best PRP and scalp treatments. My hair is now thicker and healthier. Highly recommended for hair fall treatment!",
            name: "Prabhunathprasad Yadav",
            rating: 5,
        },
        {
            quote:
                "I had a birthmark on my face that affected my confidence. Their advanced laser technology helped lighten and eventually remove it. Best clinic for birthmark removal in Siwan with expert dermatologist.",
            name: "Sachin Kumar",
            rating: 5,
        },
        {
            quote:
                "I had been battling psoriasis for years with little relief. After consulting Dr. Binay Kumar Sharma at Derma Healer, I started advanced treatment that reduced scaling and itching. My condition is now under control. Best psoriasis treatment in Siwan with long lasting results.",
            name: "Atul Rai",
            rating: 5,
        },
    ];

    // Duplicate array so loop is seamless
    const loopTestimonials = [...demoTestimonials, ...demoTestimonials];

    return (
        <section className="py-16 bg-[var(--sbg)] overflow-hidden">
            <h2 className="text-center text-3xl font-bold mb-10 text-white">
                What Our Clients Say
            </h2>

            <motion.div
                className="flex gap-6"
                animate={{ x: ["0%", "-100%"] }}
                transition={{
                    repeat: Infinity,
                    duration: 40, // slower & smoother
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
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                {t.name.charAt(0)}
                            </div>
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
