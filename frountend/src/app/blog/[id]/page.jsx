import Link from "next/link";
import blogPosts from "../../../data/blogPosts";

export async function generateStaticParams() {
    // Tell Next.js which dynamic routes to pre-render at build time
    return blogPosts.map((post) => ({
        id: post.id.toString(),
    }));
}

export default function BlogDetail({ params }) {
    const post = blogPosts.find((p) => p.id.toString() === params.id);

    if (!post) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold mb-6">Blog post not found.</h2>
                <Link
                    href="/blog"
                    className="mb-8 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    ← Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-5">
            <Link
                href="/blog"
                className=" p-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow-lg"
            >
                ← Back to Blog
            </Link>

            <article>
                <h1 className="text-4xl font-bold mt-4 mb-4">{post.title}</h1>
                <div className="text-gray-500 mb-6">
                    <span>By {post.author}</span> | <time>{post.date}</time>
                </div>
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover rounded mb-8"
                />
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>
        </div>
    );
}
