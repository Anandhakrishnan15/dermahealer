import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { InfiniteRow } from "./InfiniteRow";
import { ProductCard } from "./ProductCard";
import { Header } from "./Header";
import { useInView } from "react-intersection-observer";

function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) setMatches(media.matches);
        const listener = () => setMatches(media.matches);
        media.addListener(listener);
        return () => media.removeListener(listener);
    }, [matches, query]);
    return matches;
}

// Helper to merge multiple refs
function useCombinedRefs(...refs) {
    return useCallback(
        (element) => {
            refs.forEach((ref) => {
                if (!ref) return;
                if (typeof ref === "function") {
                    ref(element);
                } else {
                    ref.current = element;
                }
            });
        },
        [refs]
    );
}

export const HeroParallax = ({ products }) => {
    const doubled = useMemo(() => [...products, ...products], [products]);

    // useInView gives a callback ref and inView boolean
    const { ref: inViewRef, inView } = useInView({ threshold: 0.1 });

    // useRef to have a stable object ref for useScroll
    const scrollRef = useRef(null);

    // Combine refs so both get assigned to same element
    const combinedRef = useCombinedRefs(inViewRef, scrollRef);

    // Pass scrollRef to useScroll (not inViewRef since it's a callback ref)
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end start"],
    });

    const isDesktop = useMediaQuery("(min-width: 700px)");

    const springConfig = { stiffness: 300, damping: 30 };

    // Only animate if inView and desktop
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

    // Conditionally apply animations only if inView and desktop
    const rotateX = inView && isDesktop ? baseRotateX : 0;
    const rotateZ = inView && isDesktop ? baseRotateZ : 0;
    const translateY = inView && isDesktop ? baseTranslateY : 0;
    const opacity = inView && isDesktop ? baseOpacity : 1;

    const subheadingOpacity = inView && isDesktop ? baseSubheadingOpacity : 1;
    const subheadingScale = inView && isDesktop ? baseSubheadingScale : 1;
    const subheadingTranslateY = inView && isDesktop ? baseSubheadingTranslateY : 0;

    const underlineScaleX = inView && isDesktop ? baseUnderlineScaleX : 1;
    const dotOpacity = inView && isDesktop ? baseDotOpacity : 1;
    const dotScale = inView && isDesktop ? baseDotScale : 1;

    const headingClass = isDesktop ? "text-6xl md:text-5xl" : "text-4xl";

    return (
        <div
            ref={combinedRef}
            className="overflow-hidden antialiased relative flex flex-col [perspective:1000px] [transform-style:preserve-3d] h-full"
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
                    className={`relative inline-block text-center font-extrabold tracking-wide drop-shadow-md 
bg-clip-text text-transparent bg-gradient-to-r from-[#3ed0ca] via-cyan-400 to-sky-500
leading-[1.3] pb-1
${headingClass} mb-4
${inView && isDesktop ? "-mt-25" : ""} select-none resinfinte`}

                >
                    Our Signature Aesthetic Treatments
                </motion.h3>

                {/* Animated Underline */}
                <motion.div
                    style={{ scaleX: underlineScaleX }}
                    className="origin-center h-[3px] w-60 bg-gradient-to-r from-[#3ed0ca] via-cyan-400 to-sky-500 rounded-full mb-4"
                />

                {/* Tagline */}
                <motion.p
                    style={{
                        opacity: subheadingOpacity,
                        scale: subheadingScale, }}
                    className="text-center text-[var(--text)] max-w-xl mx-auto mb-10 text-lg"
                >
                    Transform your skin with expert care, modern techniques, and a touch of elegance.
                </motion.p>




                <div className={`w-400 overflow-visible ${inView && isDesktop ? " h-150" :" h-105"}`}>
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
