"use client";

import Link from "next/link";
import blogPosts from "../../data/blogPosts";
import { motion } from "framer-motion";
import { useState } from "react";

export default function BlogList() {
    const postsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(blogPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const currentPosts = blogPosts.slice(startIndex, startIndex + postsPerPage);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <motion.div
            className="max-w-7xl mx-auto px-4 py-12"
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            <header className="mb-12 text-center">
                <motion.h1
                    className="text-4xl font-bold mb-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Health & Wellness Blog
                </motion.h1>
                <motion.p
                    className="text-gray-600 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Tips, news & insights from our doctors
                </motion.p>
            </header>

            <motion.div
                className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
            >
                {currentPosts.map(({ id, title, excerpt, author, date, image, tags }) => (
                    <motion.article
                        key={id}
                        className="bg-[var(--sbg)] rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        variants={cardVariants}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link href={`/blog/${id}`}>
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-48 object-cover"
                                loading="lazy"
                            />
                            <div className="p-6 flex flex-col justify-between h-full">
                                <div>
                                    <div className="mb-2">
                                        {tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h2 className="text-2xl text-white font-semibold mb-2 hover:text-blue-600">
                                        {title}
                                    </h2>
                                    <p className="text-gray-300 mb-4">{excerpt}</p>
                                </div>
                                <div className="text-sm text-gray-300 flex justify-between items-center">
                                    <span>By {author}</span>
                                    <time>{date}</time>
                                </div>
                            </div>
                        </Link>
                    </motion.article>
                ))}
            </motion.div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-10 gap-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span className="text-lg font-semibold text-white">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </motion.div>
    );
}
