"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQs() {
    const faqs = [
        {
            q: "Are your aesthetic treatments safe?",
            a: "Yes, all our procedures are dermatologist-supervised, USFDA-approved, and follow strict safety and hygiene protocols to ensure minimal risk and maximum results."
        },
        {
            q: "Can anyone receive aesthetic or laser treatments?",
            a: "Most of our treatments are suitable for both men and women across all age groups, depending on skin type and medical history. A consultation is essential to assess your eligibility and customize the treatment."
        },
        {
            q: "Where is your clinic located?",
            a: "Derma Healer – Advanced Skin & Laser Clinic is located North of Gandhi Maidan, Siwan, Bihar."
        },
        {
            q: "Do you offer treatments for hair fall and baldness?",
            a: "Yes. We provide PRP therapy, mesotherapy, and growth factor treatments tailored to individual hair loss patterns. These are non-surgical and medically backed solutions."
        },
        {
            q: "Is laser tattoo removal painful or does it leave a scar?",
            a: "Our Q-switched laser breaks down tattoo ink safely with minimal pain and no scarring when done in recommended sessions. Mild discomfort may be felt, similar to a rubber band snap."
        },
    ];


    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="max-w-4xl mx-auto py-16 px-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl m-10 shadow-lg">
            <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-900 tracking-tight font-sans">
                Frequently Asked Questions
            </h2>
            <div className="space-y-6">
                {faqs.map((faq, i) => {
                    const isOpen = i === openIndex;

                    return (
                        <motion.div
                            key={i}
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="border border-gray-300 rounded-2xl overflow-hidden shadow-md bg-[var(--bbg)]"
                        >
                            <button
                                onClick={() => toggleFAQ(i)}
                                className={`flex justify-between items-center w-full px-8 py-5 text-left
                  focus:outline-none
                  transition-colors duration-300
                  ${isOpen ? "bg-blue-100 text-blue-900" : "hover:bg-blue-50 text-blue-800"}`}
                                aria-expanded={isOpen}
                            >
                                <h3 className="text-xl font-semibold tracking-wide">{faq.q}</h3>
                                <motion.span
                                    animate={{ rotate: isOpen ? 45 : 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="text-3xl font-extrabold text-blue-600 select-none"
                                >
                                    +
                                </motion.span>
                            </button>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        key="content"
                                        initial={{ opacity: 0, scaleY: 0, paddingTop: 0, paddingBottom: 0 }}
                                        animate={{ opacity: 1, scaleY: 1, paddingTop: 20, paddingBottom: 24 }}
                                        exit={{ opacity: 0, scaleY: 0, paddingTop: 0, paddingBottom: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        style={{ transformOrigin: "top" }}
                                        className="px-8 text-gray-700 text-lg overflow-hidden border-t border-blue-200"
                                    >
                                        <p className="whitespace-pre-line">{faq.a}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
