"use client";
import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import {
    Sparkles, Scissors, Sun, Droplet, Wand2,
    Activity, Scale, Accessibility, Palette, Eraser
} from "lucide-react";

export default function Treatments() {
    const treatments = [
        {
            icon: Sparkles,
            title: "HIFU (High-Intensity Focused Ultrasound) – Non-Surgical Facelift",
            desc: "Achieve skin tightening and facial contouring without surgery. HIFU boosts collagen production, lifts sagging skin, and smoothens wrinkles with visible results in just one session.",
            keywords: "HIFU treatment in Siwan, non-surgical facelift, anti-aging skin tightening",
        },
        {
            icon: Scissors,
            title: "Laser Scar Removal",
            desc: "Our advanced laser technology helps reduce acne scars, injury marks, and post-surgical scars by stimulating new skin regeneration with minimal downtime.",
            keywords: "laser scar removal Siwan, acne scar treatment, skin resurfacing",
        },
        {
            icon: Wand2,
            title: "Laser Hair Removal – Safe & Permanent",
            desc: "Get freedom from waxing and shaving with USFDA-approved laser hair removal. Suitable for all skin types and both men and women.",
            keywords: "permanent hair removal Siwan, laser hair reduction, painless hair removal clinic",
        },
        {
            icon: Droplet,
            title: "HydraFacial – Instant Glow & Deep Cleansing",
            desc: "A globally loved facial that detoxifies, exfoliates, hydrates, and nourishes your skin—all in one session. Ideal for dull, dry, and sensitive skin types.",
            keywords: "HydraFacial in Siwan, skin glow treatment, best facial for dry skin",
        },
        {
            icon: Sun,
            title: "Hyperpigmentation Treatment",
            desc: "We treat melasma, sun spots, freckles and uneven skin tone with customized peels, lasers, and serums that target pigmentation.",
            keywords: "pigmentation treatment Siwan, melasma laser, dark spot removal",
        },
        {
            icon: Activity,
            title: "Hair Loss Treatment",
            desc: "Get fuller, healthier hair with our PRP, mesotherapy, and growth factor treatments tailored to your scalp’s needs. Ideal for men and women with thinning hair.",
            keywords: "hair fall treatment Siwan, PRP for hair, best hair regrowth clinic",
        },
        {
            icon: Scale,
            title: "Fat Loss Treatment – Non-Surgical Body Shaping",
            desc: "Target stubborn fat in belly, thighs, arms, or love handles with our non-invasive fat reduction treatments with HDPEM technology.",
            keywords: "fat loss treatment Siwan, non-surgical inch loss, body contouring clinic",
        },
        {
            icon: Accessibility,
            title: "Urinary Incontinence Treatment (Kegel Chair Therapy)",
            desc: "A revolutionary non-invasive treatment for post-pregnancy and age-related urinary leakage using the latest electromagnetic chair technology.",
            keywords: "urinary incontinence treatment Siwan, kegel chair therapy, bladder control solution",
        },
        {
            icon: Palette,
            title: "Vitiligo Surgery (Punch Grafting & Suction Blister Grafting)",
            desc: "We offer effective surgical options for stable vitiligo patches using advanced techniques to restore pigmentation safely and successfully.",
            keywords: "vitiligo surgery Siwan, punch grafting, white patch treatment clinic",
        },
        {
            icon: Eraser,
            title: "Laser Tattoo Removal – Safe & Effective",
            desc: "Our Q-switched laser gently breaks down tattoo pigments without damaging your skin, removing unwanted tattoos with precision and minimal scarring.",
            keywords: "tattoo removal Siwan, laser tattoo removal clinic, remove permanent tattoo",
        },
    ];

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: i => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.15, type: "spring", stiffness: 100 },
        }),
    };

    return (
        <>
            {/* SEO Meta Tags */}
            <Head>
                <title>Best Skin & Hair Treatments in Siwan | Derma Healer</title>
                <meta
                    name="description"
                    content="Derma Healer Siwan offers HIFU facelift, laser scar removal, HydraFacial, pigmentation & hair loss treatments, fat loss therapy, vitiligo surgery, and more."
                />
                <meta
                    name="keywords"
                    content={treatments.map(t => t.keywords).join(", ")}
                />
            </Head>

            <section className="py-16 bg-[var(--sbg)]">
                <div className="max-w-6xl mx-auto px-6">

                    {/* Animated Heading */}
                    {/* Animated Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-extrabold text-center mb-14"
                    >
                        <motion.span
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.05 } },
                            }}
                            className="inline-block"
                        >
                            {"Our Best".split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="inline-block  text-gray-400"
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </motion.span>

                        <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent ml-2">Treatments</span>

                        <br />

                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="block text-gray-400"
                        >
                            at <span className="bg-gradient-to-tr from-teal-400 via-cyan-400 to-sky-500 bg-clip-text text-transparent font-bold">
                                Derma Healer
                            </span>

                        </motion.span>

                        {/* Animated underline */}
                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                            className="block mx-auto mt-3 h-1 w-40 bg-teal-500 rounded-full origin-left"
                        />
                    </motion.h2>


                    {/* Treatment Cards */}
                    <div className="grid md:grid-cols-2 gap-10">
                        {treatments.map(({ icon: Icon, title, desc, keywords }, i) => (
                            <motion.div
                                key={i}
                                className="rounded-xl shadow-lg p-8 text-center transition-all duration-500
                 bg-[var(--navbar-bg)] text-navbar border border-[var(--border)]
                 hover:bg-gradient-to-r hover:from-teal-600 hover:to-emerald-500
                 hover:scale-[1.05] hover:shadow-2xl group"
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                variants={itemVariants}
                            >
                                <div className="flex justify-center mb-4">
                                    <Icon className="w-12 h-12 text-[var(--primary)] group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors duration-300">
                                    {title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-3 group-hover:text-gray-100 transition-colors duration-300">
                                    {desc}
                                </p>
                                <p className="text-xs text-gray-400 italic group-hover:text-gray-200 transition-colors duration-300">
                                    {keywords}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
