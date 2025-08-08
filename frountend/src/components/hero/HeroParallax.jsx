"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { InfiniteRow } from "./InfiniteRow";
import { ProductCard } from "./ProductCard";
import { Header } from "./Header";

export const HeroParallax = ({ products }) => {
    // Duplicate the products array once for smooth infinite scroll
    const doubled = [...products, ...products];

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const [windowWidth, setWindowWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1000
    );

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

    const baseRotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
    const baseRotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
    const baseTranslateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-150, 150]), springConfig);
    const baseOpacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);

    const baseSubheadingOpacity = useSpring(useTransform(scrollYProgress, [0.1, 0.35], [0, 1]), springConfig);
    const baseSubheadingScale = useSpring(useTransform(scrollYProgress, [0.1, 0.35], [0.85, 1]), springConfig);
    const baseSubheadingTranslateY = useSpring(useTransform(scrollYProgress, [0.1, 0.35], [25, 0]), springConfig);

    const baseUnderlineScaleX = useSpring(useTransform(scrollYProgress, [0.15, 0.4], [0, 1]), springConfig);
    const baseDotOpacity = useSpring(useTransform(scrollYProgress, [0.3, 0.5], [0, 1]), springConfig);
    const baseDotScale = useSpring(useTransform(scrollYProgress, [0.3, 0.5], [0.9, 1]), { stiffness: 200, damping: 20 });

    const rotateX = windowWidth > 700 ? baseRotateX : 0;
    const rotateZ = windowWidth > 700 ? baseRotateZ : 0;
    const translateY = windowWidth > 700 ? baseTranslateY : 0;
    const opacity = windowWidth > 700 ? baseOpacity : 1;

    const subheadingOpacity = windowWidth > 700 ? baseSubheadingOpacity : 1;
    const subheadingScale = windowWidth > 700 ? baseSubheadingScale : 1;
    const subheadingTranslateY = windowWidth > 700 ? baseSubheadingTranslateY : 0;

    const underlineScaleX = windowWidth > 700 ? baseUnderlineScaleX : 1;
    const dotOpacity = windowWidth > 700 ? baseDotOpacity : 1;
    const dotScale = windowWidth > 700 ? baseDotScale : 1;

    const headingClass = windowWidth > 700 ? "text-6xl md:text-8xl" : "text-4xl";

    return (
        <div
            ref={ref}
            className="py-20 overflow-hidden antialiased -mt-30 relative flex flex-col [perspective:1000px] [transform-style:preserve-3d]"
        >
            <Header />
            <motion.div
                style={{ rotateX, rotateZ, translateY, opacity }}
                className="flex flex-col items-center"
            >
                <motion.h3
                    style={{
                        opacity: subheadingOpacity,
                        scale: subheadingScale,
                        translateY: subheadingTranslateY,
                    }}
                    className={`relative text-center font-extrabold ${headingClass} text-[var(--text)] mb-20 ${windowWidth > 700 ? "-mt-40" : ""} select-none`}
                >
                    Our aesthetic treatments
                    <motion.span
                        style={{ scaleX: underlineScaleX }}
                        className="origin-left absolute left-1/2 -bottom-4 rounded"
                        css={{
                            width: "60%",
                            transformOrigin: "left",
                            left: "50%",
                            transform: "translateX(-50%)",
                            height: 3,
                            background: "linear-gradient(90deg, #6366f1 0%, #a78bfa 50%, #f472b6 100%)",
                            boxShadow: "0 0 8px rgba(129, 140, 248, 0.6), 0 0 16px rgba(129, 140, 248, 0.3)",
                        }}
                    />
                    <motion.span
                        style={{ opacity: dotOpacity, scale: dotScale }}
                        className="absolute -bottom-8 rounded-full bg-indigo-600 dark:bg-indigo-400"
                        css={{
                            width: 12,
                            height: 12,
                            left: "50%",
                            transform: "translateX(-50%)",
                            boxShadow: "0 0 8px rgba(99, 102, 241, 0.7)",
                        }}
                    />
                </motion.h3>

                {/* SINGLE InfiniteRow */}
                <div className=" w-full h-80">
                    <InfiniteRow speed={35}>
                        {doubled.map((product) => (
                            <ProductCard product={product} key={product.title + Math.random()} />
                        ))}
                    </InfiniteRow>
                </div>
            </motion.div>
        </div>
    );
};
