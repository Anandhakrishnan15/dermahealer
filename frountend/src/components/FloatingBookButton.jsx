"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RightSideBookTab() {
    const [floating, setFloating] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setFloating(window.scrollY > 150);
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 485);
        };

        // run once
        handleResize();

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <motion.div
            layout
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 110,
            }}
            className="fixed z-[89]"
            style={{
                right: floating ? 24 : 0,
                bottom: floating ? 24 : "auto",
                top: floating
                    ? "auto"
                    : isMobile
                        ? "300px"   // ✅ mobile position
                        : "20%",   // ✅ desktop position
                transform: floating ? "none" : "translateY(-50%)",
            }}
        >
            <Link href="/book-appointment">
                <motion.div
                    layout
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                    }}
                    className={`
                        flex items-center justify-center
                        font-semibold
                        text-[#131313]
                        bg-gradient-to-b from-[#fff3b0] via-[#d4af37] to-[#8c6b1f]

                        ${floating
                            ? "w-14 h-14 rounded-full"
                            : "px-3 py-2 rounded-l-full"
                        }
                    `}
                    whileHover={{
                        scale: 1.08,
                        boxShadow: "0px 0px 25px rgba(212,175,55,0.8)",
                    }}
                    whileTap={{ scale: 0.96 }}
                >
                    <motion.svg
                        layout
                        xmlns="http://www.w3.org/2000/svg"
                        className={floating ? "w-6 h-6" : "w-5 h-5 mr-2"}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 7V3m8 4V3m-9 8h10m-11 9h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v11a2 2 0 002 2z"
                        />
                    </motion.svg>

                    {!floating && (
                        <motion.span
                            layout
                            style={{
                                writingMode: "vertical-rl",
                                transform: "rotate(180deg)",
                                whiteSpace: "nowrap",
                            }}
                        >
                            Book Now
                        </motion.span>
                    )}
                </motion.div>
            </Link>
        </motion.div>
    );
}
