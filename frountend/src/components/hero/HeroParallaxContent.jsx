"use client";
import React, { useMemo, useEffect, useState } from "react";
import { InfiniteRow } from "./InfiniteRow";
import { ProductCard } from "./ProductCard";
import products from "../../data/serviciess";

export const HeroParallaxContent = () => {
    const doubled = useMemo(() => [...products, ...products], [products]);
    // const [visible, setVisible] = useState(false);

    // Fade-in when component mounts (can also use intersection observer)
    // useEffect(() => {
    //     setVisible(true);
    // }, []);

    return (
        <div className={`flex mt-20 flex-col items-center transition-opacity duration-800 opacity-100`}>
            {/* Title */}
            <h3 className="relative inline-block text-center font-extrabold tracking-wide drop-shadow-md
          bg-clip-text text-transparent bg-gradient-to-r from-[#3ed0ca] via-cyan-400 to-sky-500
          leading-[1.3] pb-1 text-4xl md:text-5xl lg:text-6xl mb-4">
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
        </div>
    );
};
