import Link from "next/link";

// ✅ Fetch posts
async function fetchBlogPosts(page = 1, postsPerPage = 6) {
    const res = await fetch(
        `https://blog.dermahealerindia.com/wp-json/wp/v2/posts?_embed&per_page=${postsPerPage}&page=${page}`,
        { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error("Failed to fetch posts");

    const totalPages = Number(res.headers.get("X-WP-TotalPages"));
    const data = await res.json();

    const formattedPosts = data.map((post) => {
        const tagNames =
            post._embedded?.["wp:term"]?.[1]?.map((tag) => tag.name) || [];

        return {
            id: post.id,
            slug: post.slug, // ✅ IMPORTANT
            title: decodeHtml(post.title.rendered),
            excerpt: post.excerpt.rendered,
            image:
                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
            author: post._embedded?.author?.[0]?.name || "Unknown",
            date: new Date(post.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
            tags: tagNames,
        };
    });

    return { posts: formattedPosts, totalPages };
}

// ✅ SEO Metadata
export async function generateMetadata({ searchParams }) {
    const resolvedSearchParams = await searchParams; // ✅ FIX
const currentPage = Number(resolvedSearchParams?.page) || 1;
    const canonicalUrl =
        currentPage > 1
            ? `https://www.dermahealerindia.com/blogs?page=${currentPage}`
            : "https://www.dermahealerindia.com/blogs";

    return {
        title: "Dermatology Blog | Derma Healer India",
        description:
            "Expert skincare tips, acne treatments, hair care and dermatology insights from Derma Healer India.",

        alternates: {
            canonical: canonicalUrl,
        },

        openGraph: {
            title: "Dermatology Blog | Derma Healer India",
            description:
                "Read expert skincare advice and dermatology insights.",
            url: canonicalUrl,
            images: ["https://www.dermahealerindia.com/blogog.png"],
            type: "website",
        },

        twitter: {
            card: "summary_large_image",
            title: "Dermatology Blog | Derma Healer India",
            description:
                "Expert dermatology tips and skincare guides.",
            images: ["https://www.dermahealerindia.com/blogog.png"],
        },
    };
}

// decode HTML
function decodeHtml(html) {
    return html
        .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}

// ✅ MAIN PAGE
export default async function BlogPage({ searchParams }) {
    const resolvedSearchParams = await searchParams; // ✅ FIX

    const currentPage = Number(resolvedSearchParams?.page) || 1;

    const { posts, totalPages } = await fetchBlogPosts(currentPage, 6);
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

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {posts.map(({ id, slug, title, excerpt, author, date, image, tags }) => (
                    <article key={id} className="bg-[var(--sbg)] rounded-lg shadow-md overflow-hidden hover:shadow-xl">

                        {/* ✅ FIXED LINK */}
                        <Link href={`/blogs/${slug}`}>

                            {image && (
                                <img
                                    src={image}
                                    alt={title}
                                    className="w-full h-48 object-cover"
                                />
                            )}

                            <div className="p-6">
                                <div className="mb-2">
                                    {tags.map((tag) => (
                                        <span key={tag} className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h2 className="text-xl font-semibold mb-2 text-white">
                                    {title.length > 60 ? title.slice(0, 60) + "..." : title}
                                </h2>

                                {/* ✅ SERVER RENDERED (SEO FIX) */}
                                <div
                                    className="text-gray-300 mb-4"
                                    dangerouslySetInnerHTML={{ __html: excerpt }}
                                />

                                <div className="text-sm text-gray-400 flex justify-between">
                                    <span>{author}</span>
                                    <time>{date}</time>
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>

            {/* ✅ FIXED PAGINATION */}
            <div className="flex justify-center mt-10 gap-4">
                <Link
                    href={`/blogs?page=${Math.max(currentPage - 1, 1)}`}
                    className="px-4 py-2 bg-gray-200 rounded"
                >
                    Previous
                </Link>

                <span className="text-white">
                    Page {currentPage} of {totalPages}
                </span>

                <Link
                    href={`/blogs?page=${Math.min(currentPage + 1, totalPages)}`}
                    className="px-4 py-2 bg-gray-200 rounded"
                >
                    Next
                </Link>
            </div>
        </div>
    );
}