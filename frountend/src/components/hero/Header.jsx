"use client";
import React from "react";
import { motion } from "framer-motion";

export const Header = ({ onAnimationComplete }) => {
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
    

    return (
        <div className="max-w-7xl mx-auto py-12 md:py-10 px-4">
            {/* Desktop */}
            <div className="hidden md:flex">
                <motion.div
                    className="md:flex-1 pr-8"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    onAnimationComplete={onAnimationComplete}
                >
                   

                    <motion.h1 className="text-6xl font-bold" variants={textVariants}>
                        Glow <span className="text-[#3ed0ca]">Confidently</span>{" "}

                        {/* with + sparkle */}
                        <span className="inline-flex items-center gap-1 ">
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
                        <span className="text-7xl font-bold text-[#5563ff]">Derma Healer</span>
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
                    src="https://dermahealerindia.com//wp-content/uploads/2025/06/6e7a8a-2.png"
                    alt="Hero Image Large"
                    className="w-1/2 h-96 object-cover rounded-lg shadow-lg"
                    loading="lazy"
                    draggable={false}
                    initial="hidden"
                    animate="visible"
                    variants={imageVariants}
                />
            </div>

            {/* Mobile */}
            <div className="relative md:hidden w-full h-full rounded-lg shadow-lg overflow-hidden z-19 flex flex-wrap flex-1/2 bg-[#3ed0ca] mobileStackReverse">
                <motion.img
                    src="https://ik.imagekit.io/e8fzvhk22/Untitled%20design.jpg?updatedAt=1754665508921"
                    alt="Hero Image Small"
                    className="relative z-10 object-right object-cover h-80 imagehight"
                    loading="lazy"
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
                    <motion.h1 className="text-5xl font-extrabold border px-2 text-white mb-4 drop-shadow-lg w-60 heroHeadingres">
                        Glow <span className="text-[#242c2c]">Confidently</span> with <span className="text-[#5563ff]"> Derma
                            Healer</span>
                    </motion.h1>
                    <motion.p className="text-sm text-white max-w-md drop-shadow-md subherorespons">
                        Leading Skin & Laser Clinic in Bihar <br />
                        Using USFDA-Approved Technologies
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
};
