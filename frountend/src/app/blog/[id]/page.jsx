// src/app/blog/[id]/page.jsx
import blogPosts from "../../../data/blogPosts";
import { notFound } from "next/navigation";
import BlogContentClient from "./BlogContentClient";

export default async function BlogDetail({ params }) {
    // ✅ Await params because it's async in Next 15+
    const { id } = await params;
    const post = blogPosts.find(p => p.id === id);

    if (!post) return notFound();

    return <BlogContentClient post={post} />;
}
export async function generateMetadata({ params }) {
    const { id } = await params; // ✅ treat params as async
    const post = blogPosts.find(p => p.id === id);

    if (!post) return { title: "Blog Not Found" };

    const plainText = post.content.replace(/<[^>]+>/g, "").slice(0, 160);

    return {
        title: post.title,
        description: plainText,
        // metadataBase: new URL("https://yourdomain.com"),
        openGraph: {
            title: post.title,
            description: plainText,
            images: post.image ? [{ url: post.image }] : [],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: plainText,
            images: post.image ? [post.image] : [],
        },
    };
}
