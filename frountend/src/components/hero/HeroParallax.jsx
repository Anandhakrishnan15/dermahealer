"use client";

import React, { useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { InfiniteRow } from "./InfiniteRow";
import { ProductCard } from "./ProductCard";
import { Header } from "./Header";
import { useInView } from "react-intersection-observer";

export const HeroParallax = ({ products }) => {
    const doubled = useMemo(() => [...products, ...products], [products]);
    const [headerDone, setHeaderDone] = useState(false);

    // Ref for the scroll container
    const scrollRef = useRef(null);

    // In-view trigger
    const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });
    const combinedRef = (el) => {
        scrollRef.current = el;
        inViewRef(el);
    };

    // Scroll progress
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end start"],
    });

    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 700;
    const springConfig = { stiffness: 300, damping: 30 };

    // Parallax transforms
    const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.25], [15, 0]), springConfig);
    const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.25], [20, 0]), springConfig);
    const translateY = useSpring(useTransform(scrollYProgress, [0, 0.25], [-150, 150]), springConfig);
    const opacity = useSpring(useTransform(scrollYProgress, [0, 0.25], [0.3, 1]), springConfig);

    const subheadingOpacity = useSpring(useTransform(scrollYProgress, [0.1, 0.35], [0, 1]), springConfig);
    const subheadingScale = useSpring(useTransform(scrollYProgress, [0.1, 0.35], [0.9, 1]), springConfig);
    const subheadingTranslateY = useSpring(useTransform(scrollYProgress, [0.1, 0.35], [30, 0]), springConfig);
    const underlineScaleX = useSpring(useTransform(scrollYProgress, [0.15, 0.4], [0, 1]), springConfig);

    const headingClass = isDesktop ? "text-6xl md:text-5xl" : "text-4xl";

    return (
        <div
            ref={combinedRef}
            className="overflow-hidden antialiased relative flex flex-col [perspective:1000px] [transform-style:preserve-3d] h-full"
        >
            {/* Header */}
            <Header onAnimationComplete={() => setHeaderDone(true)} />

            {headerDone ? (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                        rotateX: isDesktop ? rotateX : 0,
                        rotateZ: isDesktop ? rotateZ : 0,
                        translateY: isDesktop ? translateY : 0,
                        opacity: isDesktop ? opacity : 1,
                    }}
                    className="flex flex-col items-center"
                >
                    <motion.h3
                        style={{
                            opacity: inView && isDesktop ? subheadingOpacity : 1,
                            scale: inView && isDesktop ? subheadingScale : 1,
                            translateY: inView && isDesktop ? subheadingTranslateY : 0,
                        }}
                        className={`relative inline-block text-center font-extrabold tracking-wide drop-shadow-md 
              bg-clip-text text-transparent bg-gradient-to-r from-[#3ed0ca] via-cyan-400 to-sky-500
              leading-[1.3] pb-1 ${headingClass} mb-4`}
                    >
                        Our Signature Aesthetic Treatments
                    </motion.h3>

                    {/* Underline */}
                    <motion.div
                        style={{ scaleX: inView && isDesktop ? underlineScaleX : 1 }}
                        className="origin-center h-[3px] w-60 bg-gradient-to-r from-[#3ed0ca] via-cyan-400 to-sky-500 rounded-full mb-4"
                    />

                    {/* Tagline */}
                    <motion.p
                        style={{
                            opacity: inView && isDesktop ? subheadingOpacity : 1,
                            scale: inView && isDesktop ? subheadingScale : 1,
                        }}
                        className="text-center text-[var(--text)] max-w-xl mx-auto mb-10 text-lg"
                    >
                        Transform your skin with expert care, modern techniques, and a touch of elegance.
                    </motion.p>

                    {/* Infinite Row */}
                    <div className={`w-400 overflow-visible ${inView && isDesktop ? "h-130" : "h-100"}`}>
                        <InfiniteRow speed={35}>
                            {doubled.map((product, index) => (
                                <ProductCard product={product} key={`${product.title}-${index}`} />
                            ))}
                        </InfiniteRow>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex justify-center items-center h-60"
                >
                    <span className="animate-pulse text-gray-500">...</span>
                </motion.div>
            )}
        </div>
    );
};
