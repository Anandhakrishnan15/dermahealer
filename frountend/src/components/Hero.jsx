"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Sample product data
const products = [
  {
    title: "Mountain Escape",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Forest Walk",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Lake View",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Snowy Peak",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Sunset Beach",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=80",
  },
];

// Infinite horizontal scrolling helper component
const InfiniteRow = ({ children, reverse = false, speed = 30 }) => {
  const containerRef = useRef(null);
  const animationFrameId = useRef(null);
  const pos = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Half width since children duplicated for infinite effect
    const totalWidth = container.scrollWidth / 2;

    const step = () => {
      pos.current += (reverse ? -1 : 1) * (speed / 60); // px per frame @ 60fps

      // Wrap-around logic for seamless loop
      if (pos.current >= totalWidth) pos.current = 0;
      if (pos.current <= 0) pos.current = totalWidth;

      container.style.transform = `translateX(${-pos.current}px)`;
      animationFrameId.current = requestAnimationFrame(step);
    };

    animationFrameId.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId.current);
  }, [reverse, speed]);

  return (
    <div
      ref={containerRef}
      className="flex space-x-20 w-max will-change-transform cursor-grab"
      style={{ userSelect: "none" }}
    >
      {/* Duplicate children twice for seamless scrolling */}
      {[...children, ...children].map((child, i) =>
        React.cloneElement(child, { key: i })
      )}
    </div>
  );
};

export const HeroParallax = ({ products }) => {
  // Duplicate products so we have enough for 3 rows of 5 products each
  const doubled = [...products, ...products];
  const firstRow = doubled.slice(0, 5);
  const secondRow = doubled.slice(5, 10);
  const thirdRow = doubled.slice(10, 15);

  const ref = useRef(null);

  // Scroll progress relative to this container (0 to 1)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Smooth spring config for animations
  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Parallax container motion (rotation and vertical movement)
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-150, 150]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );

  // Subheading animations (fade, scale, float up)
  const subheadingOpacity = useSpring(
    useTransform(scrollYProgress, [0.1, 0.35], [0, 1]),
    springConfig
  );
  const subheadingScale = useSpring(
    useTransform(scrollYProgress, [0.1, 0.35], [0.85, 1]),
    springConfig
  );
  const subheadingTranslateY = useSpring(
    useTransform(scrollYProgress, [0.1, 0.35], [25, 0]),
    springConfig
  );

  // Underline scaling animation (grows from left)
  const underlineScaleX = useSpring(
    useTransform(scrollYProgress, [0.15, 0.4], [0, 1]),
    springConfig
  );

  // Dot fade-in and subtle scale pulse
  const dotOpacity = useSpring(
    useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
    springConfig
  );
  const dotScale = useSpring(
    useTransform(scrollYProgress, [0.3, 0.5], [0.9, 1]),
    { stiffness: 200, damping: 20 }
  );

  return (
    <div
      ref={ref}
      className=" py-20 overflow-hidden antialiased -mt-30 relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      {/* Page Header */}
      <Header />

      {/* Parallax container that moves with scroll */}
      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="flex flex-col items-center"
      >
        {/* Animated Subheading */}
        <motion.h3
          style={{
            opacity: subheadingOpacity,
            scale: subheadingScale,
            translateY: subheadingTranslateY,
          }}
          className="relative text-center font-extrabold text-6xl md:text-8xl text-[var(--text)] mb-20 -mt-40 select-none"
          role="heading"
          aria-level={2}
        >
          treatemens
          {/* Animated underline */}
          <motion.span
            style={{ scaleX: underlineScaleX }}
            className="origin-left absolute left-1/2 -bottom-4 rounded"
            css={{
              width: "60%",
              transformOrigin: "left",
              left: "50%",
              transform: "translateX(-50%)",
              height: 3,
              background:
                "linear-gradient(90deg, #6366f1 0%, #a78bfa 50%, #f472b6 100%)",
              boxShadow:
                "0 0 8px rgba(129, 140, 248, 0.6), 0 0 16px rgba(129, 140, 248, 0.3)",
            }}
          />
          {/* Animated dot below underline */}
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

        {/* Product Rows */}
        <div className="mb-12 w-full max-w-[90vw]">
          <InfiniteRow speed={40}>
            {firstRow.map((product) => (
              <ProductCard product={product} key={product.title} />
            ))}
          </InfiniteRow>
        </div>

        <div className="mb-12 w-full max-w-[90vw]">
          <InfiniteRow reverse speed={25}>
            {secondRow.map((product) => (
              <ProductCard product={product} key={product.title} />
            ))}
          </InfiniteRow>
        </div>

        <div className="overflow-hidden w-full max-w-[90vw]">
          <InfiniteRow speed={35}>
            {thirdRow.map((product) => (
              <ProductCard product={product} key={product.title} />
            ))}
          </InfiniteRow>
        </div>
      </motion.div>
    </div>
  );
};

// Header component at top of page
export const Header = () => {
    // Animation variants for text container
    const containerVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.3,
                ease: "easeOut",
                duration: 0.8,
            },
        },
    };

    // Animation variants for each text element
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                ease: "easeOut",
                duration: 0.8,
            },
        },
    };

    // Animation variants for images (fade + slide)
    const imageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                ease: "easeOut",
                duration: 0.8,
            },
        },
    };

    return (
        <div className="max-w-7xl mx-auto py-12 md:py-24 px-4">
            {/* Large screen layout */}
            <div className="hidden md:flex">
                {/* Text on left with animation */}
                <motion.div
                    className="md:flex-1 pr-8"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.h1 className="text-6xl font-bold" variants={textVariants}>
                        Glow <span className="text-[#3ed0ca]">Confidently</span> with <br />
                        Derma Healer
                    </motion.h1>

                    <motion.p className="mt-4 text-xl text-gray-600 dark:text-gray-400" variants={textVariants}>
                        Leading Skin & Laser Clinic in Bihar Using{" "}
                        <span className="font-semibold text-[#3ed0ca]">USFDA-Approved Technologies</span>
                    </motion.p>
                </motion.div>

                {/* Image on right with animation */}
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

            {/* Tablet & Mobile layout */}
            <div className="relative md:hidden w-full h-full rounded-lg shadow-lg overflow-hidden z-19 flex flex-wrap flex-1/2 bg-[#3ed0ca]  mobileStackReverse">
                <motion.img
                    src="https://ik.imagekit.io/e8fzvhk22/Untitled%20design.jpg?updatedAt=1754665508921"
                    alt="Hero Image Small"
                    className="relative  z-10 object-right object-cover  h-80  imagehight"
                    loading="lazy"
                    draggable={false}
                    initial="hidden"
                    animate="visible"
                    variants={imageVariants}
                />

                {/* Blurred gray overlay */}
                {/* <div className="absolute inset-0 bg-opacity-40 backdrop-blur-sm z-20" /> */}

                {/* Overlay Text with smooth fade & slide */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute flex flex-col justify-center inset-0   px-6 z-30"
                >
                    <motion.h1 className="text-5xl font-extrabold border px-2 py- text-white mb-4 drop-shadow-lg w-60 heroHeadingres">
                        Glow <span className="text-[#242c2c]">Confidently</span> with Derma Healer
                    </motion.h1>

                    <motion.p className="text-sm text-white max-w-md drop-shadow-md subherorespons">
                        Leading Skin & Laser Clinic in Bihar <br/>Using USFDA-Approved Technologies
                    </motion.p>

                    
                </motion.div>
               
            </div>
        </div>
    );
};

// Single product card with hover effects
export const ProductCard = ({ product }) => {
  return (
    <a
      href={product.link}
      className="group block relative shrink-0 w-full max-w-sm sm:max-w-md md:max-w-lg rounded-lg overflow-hidden shadow-lg cursor-pointer h-80 sm:h-96"
    >
      <motion.div
        whileHover={{ y: -20 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
        className="relative h-full w-full"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-left-top transition-transform duration-300 group-hover:scale-105"
          width={600}
          height={600}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" />

        {/* Title */}
        <h2 className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 text-white text-xl font-semibold transition-opacity duration-300">
          {product.title}
        </h2>
      </motion.div>
    </a>
  );
};


// Default export for quick demo/testing
export default function Demo() {
  return <HeroParallax products={products} />;
}
