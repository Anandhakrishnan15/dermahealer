"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AasPage() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const postsPerPage = 6;

    // Fetch posts with _embed
    useEffect(() => {
        setLoading(true);

        async function fetchPosts(page = 1) {
            try {
                const res = await fetch(
                    `https://blog.dermahealerindia.com/wp-json/wp/v2/posts?_embed&per_page=${postsPerPage}&page=${page}`
                );

                if (!res.ok) throw new Error(`Error fetching posts: ${res.status}`);

                const data = await res.json();
                const total = res.headers.get("X-WP-TotalPages");
                setTotalPages(Number(total));

                const formattedPosts = data.map((post) => {
                    const tagNames =
                        post._embedded?.["wp:term"]?.[1]?.map((tag) => tag.name) || [];

                    return {
                        id: post.id,
                        title: post.title.rendered,
                        excerpt: post.excerpt.rendered,
                        content: post.content.rendered,
                        image:
                            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
                        author: post._embedded?.author?.[0]?.name || "Unknown",
                        date: new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }),
                        tags: tagNames,
                    };
                });

                setBlogPosts(formattedPosts);
            } catch (err) {
                console.error(err);
                setBlogPosts([]);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts(currentPage);
    }, [currentPage]);

    // Skeleton loader for posts
    const SkeletonCard = () => (
        <div className="animate-pulse bg-[var(--sbg)] rounded-lg overflow-hidden h-72">
            <div className="bg-gray-700 h-48 w-full" />
            <div className="p-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                    <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-600 rounded w-full"></div>
                </div>
                <div className="h-4 bg-gray-600 rounded w-1/3 mt-4"></div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-2 text-[var(--text)]">
                    Health & Wellness Blog
                </h1>
                <p className="text-gray-400 text-lg">
                    Tips, news & insights from our doctors
                </p>
            </header>

            <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {loading
                    ? Array.from({ length: postsPerPage }).map((_, idx) => (
                        <SkeletonCard key={idx} />
                    ))
                    : blogPosts.map(({ id, title, excerpt, author, date, image, tags }) => (
                        <article
                            key={id}
                            className="bg-[var(--sbg)] rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        >
                            <Link href={`/aaa/${id}`}>
                                {image ? (
                                    <img
                                        src={image}
                                        alt={title}
                                        className="w-full h-48 object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="bg-gray-700 h-48 w-full animate-pulse" />
                                )}
                                <div className="p-6 flex flex-col justify-between h-full">
                                    <div>
                                        <div className="mb-2">
                                            {tags.length > 0
                                                ? tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))
                                                : Array.from({ length: 2 }).map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className="inline-block bg-gray-600 animate-pulse h-4 w-10 mr-2 rounded"
                                                    />
                                                ))}
                                        </div>
                                        <h2 className="text-2xl text-white font-semibold mb-2 hover:text-blue-600">
                                            {title}
                                        </h2>
                                        <p
                                            className="text-gray-300 mb-4"
                                            dangerouslySetInnerHTML={{ __html: excerpt }}
                                        />
                                    </div>
                                    <div className="text-sm text-gray-300 flex justify-between items-center">
                                        <span>{author}</span>
                                        <time>{date}</time>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
            </div>

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
        </div>
    );
}
