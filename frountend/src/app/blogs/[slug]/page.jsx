import { notFound } from "next/navigation";
import PostClient from "./post-client";

// ✅ Fetch by slug
async function getPost(slug) {
    const res = await fetch(
        `https://blog.dermahealerindia.com/wp-json/wp/v2/posts?slug=${slug}&_embed`,
        { next: { revalidate: 60 } }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data[0];
}

// ✅ METADATA (unchanged)
export async function generateMetadata({ params }) {
    const resolvedParams = await params; // ✅ FIX

    const { slug } = resolvedParams;

    const data = await getPost(slug);
    if (!data) {
        return {
            title: "Post Not Found",
            description: "This post does not exist",
        };
    }

    const featuredImage =
        data._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "https://www.dermahealerindia.com/blogog.png";

    const description =
        data.excerpt?.rendered.replace(/<[^>]+>/g, "").slice(0, 160) ||
        "Read this blog on Derma Healer India";

    const canonicalUrl = `https://www.dermahealerindia.com/blog/${slug}`;

    return {
        title: data.title.rendered,
        description,
        metadataBase: new URL("https://www.dermahealerindia.com"),
        alternates: { canonical: canonicalUrl },

        openGraph: {
            title: data.title.rendered,
            description,
            url: canonicalUrl,
            images: [featuredImage],
            type: "article",
            locale: "en_IN",
        },

        twitter: {
            card: "summary_large_image",
            title: data.title.rendered,
            description,
            images: [featuredImage],
        },
    };
}

// ✅ PAGE
export default async function PostPage({ params }) {
    const resolvedParams = await params; // ✅ FIX

    const { slug } = resolvedParams;

    const data = await getPost(slug);
    if (!data) return notFound();

    const featuredImage =
        data._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

    const author =
        data._embedded?.author?.[0]?.name || "Unknown Author";

    const formattedDate = new Date(data.date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const post = {
        title: data.title.rendered,
        content: data.content.rendered,
        image: featuredImage,
        author,
        date: formattedDate,
    };

    const canonicalUrl = `https://www.dermahealerindia.com/blog/${slug}`;

    return (
        <>
            {/* ✅ UI COMPONENT */}
            <PostClient post={post} />

            {/* ✅ JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        headline: post.title,
                        image: featuredImage,
                        author: {
                            "@type": "Person",
                            name: author,
                        },
                        datePublished: data.date,
                        dateModified: data.modified,
                        publisher: {
                            "@type": "Organization",
                            name: "Derma Healer India",
                            logo: {
                                "@type": "ImageObject",
                                url: "https://www.dermahealerindia.com/logo.png",
                            },
                        },
                        mainEntityOfPage: {
                            "@type": "WebPage",
                            "@id": canonicalUrl,
                        },
                    }),
                }}
            />
        </>
    );
}