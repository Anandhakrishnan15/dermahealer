"use client";
import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";
import Rating from "@/components/hero/Rating"


export const Header = () => {
    const [heroImg, setHeroImg] = useState(0);

    // ✅ Desktop images
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

    // ✅ Mobile images
    const mobileImages = [
        "https://ik.imagekit.io/e8fzvhk22/Untitled%20design.png?updatedAt=1756027157270",
        "https://ik.imagekit.io/e8fzvhk22/Untitled%20design%20(1).png?updatedAt=1756027157151",
    ];
    const doctorNames = [
        "Dr. Neha Rani – Aesthetic Physician",
        "Dr. B.K. Sharma, MBBS, MD (Skin & VD)",
    ];


    // ✅ Auto-change hero image every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setHeroImg((prev) => (prev + 1) % images.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [images.length]);
//    const [rating, setRating] = useState(null); // start as null to show skeleton
//     const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchRating = async () => {
    //         try {
    //             const res = await fetch("/api/rating"); 
    //             const data = await res.json();

    //             setRating({
    //                 score: data.score,
    //                 reviews: data.reviews,
    //             });
    //             setLoading(false); // data loaded
    //         } catch (error) {
    //             console.error("Failed to fetch rating:", error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchRating();
    // }, []);

    return (
        <div className="relative top-0 z-50   mb-10 mx-auto py-0 md:py-10 px-1">
            {/* Desktop */}

            <div className="hidden md:flex items-center">
                <div className="md:flex-1 pr-8">
                    {/* ✅ Heading */}
                    <h1 className="text-6xl font-bold">
                        Glow <span className="text-[#3ed0ca]">Confidently</span>{" "}
                        <span className="inline-flex items-center gap-1">
                            with
                            <span
                                className="text-4xl inline-block animate-floaty"
                                role="img"
                                aria-label="sparkles"
                            >
                                ✨
                            </span>
                        </span>
                        <br />
                        <span className="text-7xl font-bold text-[#5563ff]">
                            Derma Healer
                        </span>
                    </h1>

                    {/* ✅ Tagline */}
                    <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                        Leading Skin & Laser Clinic in Bihar Using{" "}
                        <span className="font-semibold text-[#3ed0ca]">
                            USFDA-Approved Technologies
                        </span>
                    </p>

                    {/* ✅ Ratings & Reviews */}
                    <div className="mt-3 flex items-center flex-wrap gap-3">
                        <Rating />

                        {/* ✅ USFDA Badge */}
                        <span className="inline-flex items-center text-sm font-semibold bg-[#3ed0ca]/10 text-[#3ed0ca] px-3 py-1 rounded-full shadow-sm">
                            <CheckCircle2 size={16} className="mr-1" /> USFDA Approved
                        </span>
                    </div>

                    {/* ✅ CTA Buttons */}
                    <div className="mt-6 flex gap-4">
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
                    </div>
                </div>

                {/* ✅ Hero Image */}
                <img
                    src={images[heroImg].imgurl}
                    alt="Hero Image Large"
                    className="w-100 h-100 object-contain rounded-lg"
                    loading="eager"
                    draggable={false}
                />
            </div>



            {/* Mobile */}
            <div className="relative md:hidden w-full h-full mt-4 rounded-lg shadow-lg overflow-hidden flex bg-[#3ed0ca] mobileStackReverse">
                {/* ✅ Auto-changing Mobile Hero Image */}
                <img
                    src={mobileImages[heroImg % mobileImages.length]}
                    alt="Hero Image Mobile"
                    className="relative z-10 object-cover h-72 sm:h-80 w-full transition-opacity duration-700 ease-in-out"
                    loading="eager"
                    draggable={false}
                    key={heroImg} // 👈 still forces React to reload on change
                />

                {/* ✅ Doctor Name Overlay */}
                <div
                    className="absolute w-50 bottom-10 right-0 rounded-l-sm bg-gray-100 text-teal-600 text-center py-2 z-20 [@media(max-width:495px)]:hidden"
                >
                    <p className="text-sm font-semibold">
                        {doctorNames[heroImg % doctorNames.length]}
                    </p>
                </div>

                {/* ✅ Content Overlay */}
                <div className="absolute flex flex-col justify-center inset-0 px-2 z-30 animate-fade-in">
                    {/* ✅ Heading */}
                    <h1
                        className="
        text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-xl 
        px-2 w-60 responmobilheading
        [@media(max-width:495px)]:px-0
        [@media(max-width:495px)]:w-50
        [@media(max-width:495px)]:text-3xl
        animate-slide-up
      "
                    >
                        Glow
                        <span className="inline-flex items-center gap-1">
                            {/* ✨ Sparkle animation */}
                            <span
                                className="text-2xl sm:text-3xl inline-block animate-bounce-slow"
                                role="img"
                                aria-label="sparkles"
                            >
                                ✨
                            </span>
                        </span>{" "}
                        <span className="text-[#242c2c]">Confidently</span> with{" "}
                        <span className="text-[#5563ff]">Derma Healer</span>
                    </h1>

                    {/* ✅ Tagline */}
                    <p className="text-sm sm:text-base text-white max-w-md drop-shadow-md mb-4 animate-slide-up delay-200">
                        Leading Skin & Laser Clinic in Bihar <br />
                        Using<br />
                        <span className="font-semibold bg-[#ffe680] text-[#161615] px-1 rounded">
                            USFDA-Approved Technologies
                        </span>
                    </p>

                    {/* ✅ CTA Buttons */}
                    <div className="flex gap-3 animate-slide-up delay-400">
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
                    </div>
                </div>
            </div>

        </div>
    );
};
