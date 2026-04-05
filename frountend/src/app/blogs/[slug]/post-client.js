"use client";

import { useRouter } from "next/navigation";

export default function PostClient({ post }) {
    const router = useRouter();

    return (
        <div className="max-w-4xl mx-auto p-6">

            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg shadow transition"
            >
                ← Back to Blogs
            </button>

            {/* Title */}
            <h1
                className="text-3xl font-bold mb-4"
                dangerouslySetInnerHTML={{ __html: post.title }}
            />

            {/* Meta */}
            <p className="text-gray-500 mb-4">
                By {post.author} | {post.date}
            </p>

            {/* Image */}
            {post.image && (
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                />
            )}

            {/* Content */}
            <div
                className="custom-prose prose max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </div>
    );
}