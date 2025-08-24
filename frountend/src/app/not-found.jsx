"use client";

// Save this file as pages/404.jsx if using Pages Router
// or app/not-found.jsx if using App Router (Next.js 13+)
// It uses Tailwind CSS and Framer Motion. Icons from lucide-react.

import { motion } from "framer-motion";
import { Home, Search, Mail, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
    const router = useRouter();
    const [query, setQuery] = useState("");

    // keyboard shortcut: press "h" to go home
    useEffect(() => {
        const onKey = (e) => {
            if (e.key.toLowerCase() === "h") router.push("/");
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [router]);

    const onSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    };

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--text)] relative overflow-hidden">
            {/* Subtle background grid */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_65%)]"
            >
                <svg className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-20" width="1200" height="1200">
                    <defs>
                        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="1200" height="1200" fill="url(#grid)" />
                </svg>
            </div>

            {/* Content */}
            <main className="relative z-10 mx-auto max-w-4xl px-6 py-20 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <span className="inline-flex items-center gap-2 rounded-full bg-[var(--card)] px-3 py-1 text-xs shadow-sm ring-1 ring-black/5">
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Oops! Page not found</span>
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05, duration: 0.5 }}
                    className="font-bold tracking-tight text-5xl md:text-7xl text-[var(--heading)]"
                >
                    404
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="mt-4 max-w-2xl text-[var(--navbar-text)]"
                >
                    The page you’re looking for doesn’t exist or has been moved.
                </motion.p>

                {/* Search */}
                <motion.form
                    onSubmit={onSearch}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="mt-8 w-full max-w-xl"
                    role="search"
                    aria-label="Site search"
                >
                    <div className="flex items-stretch rounded-2xl ring-1 ring-black/10 bg-white/60 dark:bg-white/5 shadow-sm backdrop-blur-md focus-within:ring-2 focus-within:ring-[var(--button-primary)]">
                        <div className="pl-4 flex items-center">
                            <Search className="h-5 w-5 opacity-70" aria-hidden />
                        </div>
                        <input
                            className="flex-1 bg-transparent px-3 py-3 outline-none text-sm placeholder:text-[var(--navbar-text)]/70"
                            placeholder="Search our site"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            aria-label="Search query"
                        />
                        <button
                            type="submit"
                            className="m-1 rounded-xl px-4 text-sm font-medium bg-[var(--button-primary)] text-white shadow hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--button-primary)]"
                        >
                            Search
                        </button>
                    </div>
                </motion.form>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mt-8 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-3"
                >
                    <Link
                        href="/"
                        className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--button-primary)] px-5 py-3 font-medium  shadow hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--button-primary)]"
                    >
                        <Home className="h-4 w-4" />
                        Home
                    </Link>
                    <button
                        onClick={() => router.back()}
                        className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--card)] px-5 py-3 font-medium text-[var(--text)] shadow ring-1 ring-black/5 hover:bg-[color-mix(in_oklab,var(--card),black_2%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-primary)]"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Go Back
                    </button>
                    <Link
                        href="/contact"
                        className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--card)] px-5 py-3 font-medium text-[var(--text)] shadow ring-1 ring-black/5 hover:bg-[color-mix(in_oklab,var(--card),black_2%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-primary)]"
                    >
                        <Mail className="h-4 w-4" />
                        Contact Us
                    </Link>
                </motion.div>

                {/* Helpful links */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    className="mt-10 text-sm text-[var(--navbar-text)]"
                >
                    <p className="mb-3">Here are some helpful links:</p>
                    <ul className="flex flex-wrap items-center justify-center gap-3">
                        <li>
                            <Link href="/about-us" className="underline-offset-4 hover:underline">
                                About
                            </Link>
                        </li>
                        {/* <li>
                            <Link href="/services" className="underline-offset-4 hover:underline">
                                Services
                            </Link>
                        </li> */}
                        <li>
                            <Link href="/blog" className="underline-offset-4 hover:underline">
                                Blog
                            </Link>
                        </li>
                       /
                    </ul>
                </motion.div>
            </main>

            {/* Large decorative 404 in background */}
            <div aria-hidden className="pointer-events-none select-none absolute inset-x-0 bottom-0 flex justify-center opacity-10">
                <div className="font-black text-[20rem] leading-none tracking-tighter text-[var(--heading)]/70 hidden md:block">
                    404
                </div>
            </div>
        </div>
    );
}