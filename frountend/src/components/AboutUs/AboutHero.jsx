"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const slides = [
    {
        image:
            "https://cdn.openviowebsites.com/source/sites/0108d591-ced0-4e7f-b2e4-dda4d075f24a/images/botox-banner.webp",
        title: "Safe & Hygienic Environment",
        subtitle: "Your safety is important to us. We maintain the highest standards.",
    },
    {
        image:
            "https://www.shutterstock.com/image-photo/beautiful-young-woman-getting-rejuvenating-600nw-1375025153.jpg",
        title: "Effective Treatment Results",
        subtitle: "We provide solutions for hair loss, pigmentation, and more.",
    },
    {
        image: "https://www.charmaclinic.com/images/blog/1707124362_banner.webp",
        title: "Latest Technology & Training",
        subtitle: "Our staff are highly trained, exceeding top clinic standards.",
    },
    {
        image:
            "https://www.shutterstock.com/image-photo/beautiful-young-woman-getting-rejuvenating-600nw-1375025153.jpg",
        title: "Effective Treatment Results",
        subtitle: "We provide solutions for hair loss, pigmentation, and more.",
    },
];

const colors = [{ style: { color: "#3ed0ca" } }]; // teal

export default function AboutHero() {
    const [index, setIndex] = useState(0);
    const [coloredWordIndex, setColoredWordIndex] = useState(null);
    const [coloredWordColor, setColoredWordColor] = useState(null);

    const titleWords = slides[index].title.split(" ");
    const isLeft = index % 2 === 0;

    useEffect(() => {
        // Pick a random colored word index and color AFTER client mount and every time slide changes
        setColoredWordIndex(Math.floor(Math.random() * titleWords.length));
        setColoredWordColor(colors[Math.floor(Math.random() * colors.length)]);
    }, [index]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full h-[600px] overflow-hidden ">
            {/* Background */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={slides[index].image}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                        backgroundImage: `url(${slides[index].image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            </AnimatePresence>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Text container */}
            <div className="absolute inset-0 flex items-center px-8 ">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isLeft ? 50 : -50 }}
                        transition={{ duration: 0.8 }}
                        className={`max-w-xl w-full ${isLeft ? "text-left" : "text-right"}`}
                        style={{
                            marginLeft: isLeft ? 0 : "auto",
                            marginRight: isLeft ? "auto" : 0,
                        }}
                    >
                        <h1 className="text-8xl  font-bold mb-4 flex flex-wrap text-white font-playfair ">
                            {titleWords.map((word, i) => (
                                <span
                                    key={i}
                                    className="mr-2"
                                    style={i === coloredWordIndex ? coloredWordColor?.style : undefined}
                                >
                                    {word}
                                </span>
                            ))}
                        </h1>

                        <p className="text-lg text-left text-gray-300 mb-4">{slides[index].subtitle}</p>

                        <motion.div
                            className="mb-6 h-1 w-32 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            style={{ originX: 0 }}
                        />

                        <p className="text-sm text-gray-400 italic mb-6">
                            Experience the difference with expert care and advanced technology.
                        </p>

                        <button
                            className="bg-teal-400 hover:bg-cyan-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition"
                        >
                            <Link href="/treatments">Learn More</Link>
                        </button>

                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
