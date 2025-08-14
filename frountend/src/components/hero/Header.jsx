"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Header = ({ onAnimationComplete }) => {
    const [heroImg, setHeroImg] = useState(0);

    const images = [
        {
            index: 1,
            imgurl: "https://dermahealerindia.com/wp-content/uploads/2025/06/6e7a8a-2.png",
        },
        {
            index: 2,
            imgurl: "https://dermahealerindia.com/wp-content/uploads/2025/06/6e7a8a-3.png",
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

                    <motion.p
                        className="mt-4 text-xl text-gray-600 dark:text-gray-400"
                        variants={textVariants}
                    >
                        Leading Skin & Laser Clinic in Bihar Using{" "}
                        <span className="font-semibold text-[#3ed0ca]">
                            USFDA-Approved Technologies
                        </span>
                    </motion.p>
                </motion.div>

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
                <motion.img
                    src="https://ik.imagekit.io/e8fzvhk22/Untitled%20design.jpg?updatedAt=1754665508921"
                    alt="Hero Image Small"
                    className="relative z-10 object-right object-cover h-80"
                    loading="eager"
                    draggable={false}
                    initial="hidden"
                    animate="visible"
                    variants={imageVariants}
                />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute flex flex-col justify-center inset-0 px-6 z-30"
                >
                    <motion.h1 className="text-5xl font-extrabold px-2 text-white mb-4 drop-shadow-lg w-60">
                        Glow <span className="text-[#242c2c]">Confidently</span> with{" "}
                        <span className="text-[#5563ff]"> Derma Healer</span>
                    </motion.h1>
                    <motion.p className="text-sm text-white max-w-md drop-shadow-md">
                        Leading Skin & Laser Clinic in Bihar <br />
                        Using USFDA-Approved Technologies
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
};
