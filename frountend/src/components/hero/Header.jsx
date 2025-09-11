"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";

export const Header = ({ onAnimationComplete }) => {
    const [heroImg, setHeroImg] = useState(0);

    // ✅ Desktop images
    const images = [
        {
            index: 1,
            imgurl: "https://ik.imagekit.io/iwky7g0ee/6e7a8a-2.webp?updatedAt=1755608440235",
        },
        {
            index: 2,
            imgurl: "https://ik.imagekit.io/iwky7g0ee/6e7a8a-3.webp?updatedAt=1755608439693",
        },
    ];

    // ✅ Mobile images
    const mobileImages = [
        "https://ik.imagekit.io/e8fzvhk22/Untitled%20design.png?updatedAt=1756027157270",
        "https://ik.imagekit.io/e8fzvhk22/Untitled%20design%20(1).png?updatedAt=1756027157151",
    ];
    const doctorNames = [
        "Dr. Neha Rani – Aesthetic Physician",
        "Dr. B.K. Sharma, MBBS, MD (Skin & VD)",
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.3, ease: "easeOut", duration: 0.8 },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { ease: "easeOut", duration: 0.8 },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { ease: "easeOut", duration: 0.8 },
        },
    };

    // ✅ Auto-change hero image every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setHeroImg((prev) => (prev + 1) % images.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative top-0 z-50  mb-10 mx-auto py-0 md:py-10 px-1">
            {/* Desktop */}

            <div className="hidden md:flex items-center">
                <motion.div
                    className="md:flex-1 pr-8"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    onAnimationComplete={onAnimationComplete}
                >
                    {/* ✅ Heading */}
                    <motion.h1 className="text-6xl font-bold" variants={textVariants}>
                        Glow <span className="text-[#3ed0ca]">Confidently</span>{" "}
                        <span className="inline-flex items-center gap-1">
                            with
                            <motion.span
                                className="text-4xl"
                                initial={{ y: -5, rotate: 0, opacity: 0 }}
                                animate={{
                                    y: [-5, 0, -5],
                                    rotate: [0, 15, -15, 0],
                                    opacity: 1,
                                }}
                                transition={{
                                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                                    rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                                    opacity: { delay: 0.5, duration: 0.5 },
                                }}
                            >
                                ✨
                            </motion.span>
                        </span>
                        <br />
                        <span className="text-7xl font-bold text-[#5563ff]">
                            Derma Healer
                        </span>
                    </motion.h1>

                    {/* ✅ Tagline */}
                    <motion.p
                        className="mt-4 text-xl text-gray-600 dark:text-gray-400"
                        variants={textVariants}
                    >
                        Leading Skin & Laser Clinic in Bihar Using{" "}
                        <span className="font-semibold text-[#3ed0ca]">
                            USFDA-Approved Technologies
                        </span>
                    </motion.p>

                    {/* ✅ Ratings & Reviews */}
                    <div className="mt-3 flex items-center flex-wrap gap-3">
                        {/* ⭐ Stars */}
                        <div className="flex items-center text-yellow-400">
                            {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                    <Star key={i} size={18} className="fill-yellow-400" />
                                ))}
                        </div>

                        {/* 🔢 Score + Reviews */}
                        <span className="text-gray-500 font-medium">
                            4.9{" "}
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                (241+ reviews)
                            </span>
                        </span>

                        {/* ✅ USFDA Badge */}
                        <span className="inline-flex items-center text-sm font-semibold bg-[#3ed0ca]/10 text-[#3ed0ca] px-3 py-1 rounded-full shadow-sm">
                            <CheckCircle2 size={16} className="mr-1" /> USFDA Approved
                        </span>
                    </div>

                  
                    {/* ✅ CTA Buttons */}
                    <motion.div
                        className="mt-6 flex gap-4"
                        variants={textVariants}
                    >
                        <a
                            href="/contact-us"
                            className="bg-[#3ed0ca] text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-teal-600 transition"
                        >
                            Contact Us
                        </a>
                        <a
                            href="/treatments"
                            className="bg-[#5563ff] text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-[#3a4343] transition"
                        >
                            Our Treatments
                        </a>
                    </motion.div>
                </motion.div>

                {/* ✅ Hero Image */}
                <motion.img
                    src={images[heroImg].imgurl}
                    alt="Hero Image Large"
                    className="w-1/2 h-100 object-cover rounded-lg shadow-lg"
                    loading="eager"
                    draggable={false}
                    initial="hidden"
                    animate="visible"
                    variants={imageVariants}
                />
            </div>


            {/* Mobile */}
            <div className="relative md:hidden w-full h-full rounded-lg shadow-lg overflow-hidden flex bg-[#3ed0ca] mobileStackReverse">
                {/* ✅ Auto-changing Mobile Hero Image */}
                <motion.img
                    src={mobileImages[heroImg % mobileImages.length]}
                    alt="Hero Image Mobile"
                    className="relative z-10 object-cover h-72 sm:h-80 w-full"
                    loading="eager"
                    draggable={false}
                    initial="hidden"
                    animate="visible"
                    variants={imageVariants}
                    key={heroImg} // 👈 ensures re-animation on change
                />

                {/* ✅ Doctor Name Overlay */}
                <div className="absolute w-50 bottom-10 right-0 rounded-l-sm  bg-gray-100 text-teal-600 text-center py-2 z-20 [@media(max-width:495px)]:hidden
">
                    <p className="text-sm font-semibold">
                        {doctorNames[heroImg % doctorNames.length]}
                    </p>
                </div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.3 },
                        },
                    }}
                    className="absolute flex flex-col justify-center inset-0 px-2 z-30"
                >
                    {/* ✅ Heading */}
                    <motion.h1
                        variants={{
                            hidden: { opacity: 0, y: 40 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
                        }}
                        className="
                            text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-xl 
                            px-2 w-60 responmobilheading
                            [@media(max-width:495px)]:px-0
                            [@media(max-width:495px)]:w-50
                            [@media(max-width:495px)]:text-3xl
                        "
                    >
                        Glow<span className="inline-flex items-center gap-1">
                            {/* ✨ Sparkle animation */}
                            <motion.span
                                className="text-2xl sm:text-3xl"
                                initial={{ y: -5, rotate: 0, opacity: 0 }}
                                animate={{
                                    y: [-5, 0, -5],
                                    rotate: [0, 15, -15, 0],
                                    opacity: 1,
                                }}
                                transition={{
                                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                                    rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                                    opacity: { delay: 0.5, duration: 0.5 },
                                }}
                            >
                                ✨
                            </motion.span>
                        </span>{" "}
                        <span className="text-[#242c2c]">Confidently</span>{" "}
                        with{" "}
                        <span className="text-[#5563ff]">Derma Healer</span>
                    </motion.h1>

                    {/* ✅ Tagline */}
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
                        }}
                        className="text-sm sm:text-base text-white max-w-md drop-shadow-md mb-4"
                    >
                        Leading Skin & Laser Clinic in Bihar <br />
                        Using<br />
                        <span className="font-semibold bg-[#ffe680] text-[#161615] px-1 rounded">
                            USFDA-Approved Technologies
                        </span>
                    </motion.p>

                    {/* ✅ CTA Buttons */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.4 } },
                        }}
                        className="flex gap-3"
                    >
                        <a
                            href="/contact"
                            className="bg-white text-[#3ed0ca] font-semibold px-4 py-2 rounded-full text-sm shadow hover:bg-gray-100 transition"
                        >
                            Contact Us
                        </a>
                        <a
                            href="/treatments"
                            className="bg-[#1f2937] text-white font-semibold px-4 py-2 rounded-full text-sm shadow hover:bg-[#111827] transition"
                        >
                            Our Treatments
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};
