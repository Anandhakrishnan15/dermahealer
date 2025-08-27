"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { InfiniteRow } from "./InfiniteRow";
import { ProductCard } from "./ProductCard";
import { Header } from "./Header";
import ResponsiveImageGallery from "../ResponsiveImageGallery";

export const HeroParallax = ({ products }) => {
    const doubled = useMemo(() => [...products, ...products], [products]);

    // In-view detection
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    return (
        <div className="overflow-hidden antialiased relative flex flex-col h-full">
            {/* Header */}
            <Header />
            <ResponsiveImageGallery />

            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center"
            >
                <h3
                    className="relative inline-block text-center font-extrabold tracking-wide drop-shadow-md 
                    bg-clip-text text-transparent bg-gradient-to-r from-[#3ed0ca] via-cyan-400 to-sky-500
                    leading-[1.3] pb-1 text-4xl md:text-5xl lg:text-6xl mb-4"
                >
                    Our Signature Aesthetic Treatments
                </h3>

                {/* Underline */}
                <div className="h-[3px] w-60 bg-gradient-to-r from-[#3ed0ca] via-cyan-400 to-sky-500 rounded-full mb-4" />

                {/* Tagline */}
                <p className="text-center text-[var(--text)] max-w-xl mx-auto mb-10 text-lg">
                    Transform your skin with expert care, modern techniques, and a touch of elegance.
                </p>

                {/* Infinite Row */}
                <div className="w-full h-[400px] overflow-visible">
                    <InfiniteRow speed={35}>
                        {doubled.map((product, index) => (
                            <ProductCard product={product} key={`${product.title}-${index}`} />
                        ))}
                    </InfiniteRow>
                </div>
            </motion.div>
        </div>
    );
};
