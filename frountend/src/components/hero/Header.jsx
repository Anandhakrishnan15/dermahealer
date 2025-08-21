"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Header = ({ onAnimationComplete }) => {
    const [heroImg, setHeroImg] = useState(0);

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

    // Auto-change hero image every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setHeroImg((prev) => (prev + 1) % images.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative top-8 z-50 max-w-7xl mb-10 mx-auto py-12 md:py-10 px-4">
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
                {/* ✅ Mobile Hero Images */}
                {/* Show this image ONLY above 495px */}
                <motion.img
                    src="https://ik.imagekit.io/e8fzvhk22/Untitled%20design.jpg?updatedAt=1754665508921"
                    alt="Hero Image Small"
                    className="relative z-10 object-right object-cover h-80 hidden [@media(min-width:495px)]:block"
                    loading="eager"
                    draggable={false}
                    initial="hidden"
                    animate="visible"
                    variants={imageVariants}
                />

                {/* Show this image ONLY below 495px */}
                <motion.img
                    src="https://ik.imagekit.io/e8fzvhk22/Untitled%20design.jpg?updatedAt=1754665508921"
                    alt="Hero Image Extra Small"
                    className="relative z-10 object-cover h-72 w-full block [@media(min-width:495px)]:hidden"
                    loading="eager"
                    draggable={false}
                    initial="hidden"
                    animate="visible"
                    variants={imageVariants}
                />


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
                        </span>{" "} <span className="text-[#242c2c]">Confidently</span>{" "}
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
                        Using<br/>
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
