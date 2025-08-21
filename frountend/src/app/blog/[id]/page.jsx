// src/app/blog/[id]/page.jsx
import blogPosts from "../../../data/blogPosts";
import { notFound } from "next/navigation";
import BlogContentClient from "./BlogContentClient";
import Script from "next/script"; // Import the Script component

// Assuming your blogPosts data now includes author and date
// Example: { id: "1", title: "...", content: "...", image: "...", author: "Dr. Neha Rani", date: "2024-08-21T10:00:00Z" }

export default async function BlogDetail({ params }) {
    const { id } = await params;
    const post = blogPosts.find((p) => p.id === id);

    if (!post) return notFound();

    // Create a JSON-LD schema for the blog post
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://www.yourdomain.com/blog/${post.id}`,
        },
        headline: post.title,
        image: post.image ? post.image : "https://www.yourdomain.com/default-blog-image.jpg",
        datePublished: post.date,
        dateModified: post.date, // Use a last modified date if available
        author: {
            "@type": "Person",
            name: post.author,
        },
        publisher: {
            "@type": "Organization",
            name: "Derma Healer India",
            logo: {
                "@type": "ImageObject",
                url: "https://www.yourdomain.com/logo.png",
                width: 600,
                height: 60,
            },
        },
        description: post.content.replace(/<[^>]+>/g, "").slice(0, 160) + "...",
    };

    return (
        <>
            {/* JSON-LD Script Tag */}
            <Script
                id="blog-article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleSchema),
                }}
            />
            <BlogContentClient post={post} />
        </>
    );
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const post = blogPosts.find((p) => p.id === id);

    if (!post) return { title: "Blog Not Found" };

    const plainText =
        post.content.replace(/<[^>]+>/g, "").slice(0, 160) + "..."; // Add ellipsis for better readability

    const url = `https://www.dermahealerindia.com/blog/${post.id}`;

    return {
        title: post.title + " | Derma Healer Blog", // Added clinic name for branding
        description: plainText,
        metadataBase: new URL("https://www.dermahealerindia.com"), // Crucial for absolute URLs

        // Canonical URL for deduplication
        alternates: {
            canonical: url,
        },

        openGraph: {
            title: post.title,
            description: plainText,
            url: url, // Added URL to the OG object
            images: post.image ? [{ url: post.image, alt: post.title }] : [],
            type: "article",
            locale: "en_IN", // Specify language and region
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: plainText,
            images: post.image ? [post.image] : [],
        },
    };
}