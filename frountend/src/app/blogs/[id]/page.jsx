import PostClient from "./post-client";

// Dynamic metadata with canonical in head
export async function generateMetadata({ params }) {
    const resolvedParams = await params;   // ✅ Required in Next.js 14
    const { id } = resolvedParams;

    const res = await fetch(
        `https://blog.dermahealerindia.com/wp-json/wp/v2/posts/${id}?_embed`,
        { next: { revalidate: 60 } }
    );

    if (!res.ok) {
        return { title: "Post Not Found", description: "The requested post does not exist." };
    }

    const data = await res.json();
    const featuredImage = data._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
    const ogImage = featuredImage || "/blogog.png";

    // ✅ FIXED canonical path
    const canonicalUrl = `https://www.dermahealerindia.com/blogs/${id}`;

    // Shorten title for SEO
    let seoTitle = data.title.rendered;
    if (seoTitle.length > 60) seoTitle = seoTitle.slice(0, 60) + "...";

    return {
        title: seoTitle,
        description:
            data.excerpt?.rendered.replace(/<[^>]+>/g, "").slice(0, 160) ||
            "Read this post on Derma Healer India",
        alternates: { canonical: canonicalUrl },
        openGraph: {
            title: seoTitle,
            description: data.excerpt?.rendered.replace(/<[^>]+>/g, "").slice(0, 160),
            images: [ogImage],
            type: "article",
            publishedTime: data.date,
            url: canonicalUrl,
        },
        twitter: {
            card: "summary_large_image",
            title: seoTitle,
            description: data.excerpt?.rendered.replace(/<[^>]+>/g, "").slice(0, 160),
            images: [ogImage],
        },
    };
}

export default async function PostPage({ params }) {
    const resolvedParams = await params; // ✅ consistency
    const { id } = resolvedParams;

    const res = await fetch(
        `https://blog.dermahealerindia.com/wp-json/wp/v2/posts/${id}?_embed`,
        { next: { revalidate: 60 } }
    );
    if (!res.ok) return <div>Post not found</div>;

    const data = await res.json();
    const featuredImage = data._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
    const author = data._embedded?.author?.[0]?.name || "Unknown Author";
    const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
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

    const ogImage = featuredImage || "https://www.dermahealerindia.com/default-og-image.jpg";
    const canonicalUrl = `https://www.dermahealerindia.com/blogs/${id}`; // ✅ FIXED

    return (
        <>
            <PostClient post={post} />

            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        headline: post.title,
                        image: ogImage,
                        author: { "@type": "Person", name: post.author },
                        datePublished: data.date,
                        publisher: {
                            "@type": "Organization",
                            name: "Derma Healer India",
                            logo: { "@type": "ImageObject", url: "https://www.dermahealerindia.com/logo.png" },
                        },
                        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
                    }),
                }}
            />
        </>
    );
}
