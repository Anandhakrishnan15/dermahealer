"use client";
import { useRouter } from "next/navigation";
import { use } from "react"; // 👈 import use from react
import blogPosts from "../../../data/blogPosts";

export default function BlogDetail({ params }) {
    const router = useRouter();

    // ✅ unwrap params
    const unwrappedParams = use(params);
    const postId = Array.isArray(unwrappedParams.id)
        ? unwrappedParams.id[0]
        : unwrappedParams.id;

    const post = blogPosts.find((p) => p.id.toString() === postId);

    if (!post) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-2xl font-bold">Post not found</h2>
                <button
                    onClick={() => router.back()}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg shadow transition"
                >
                    ← Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <button
                onClick={() => router.back()}
                className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg shadow transition"
            >
                ← Back to Blogs
            </button>

            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-500 mb-2">
                By {post.author} | {post.date}
            </p>
            <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <div
                className="custom-prose prose max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

        </div>
    );
}
