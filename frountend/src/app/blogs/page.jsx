import Link from "next/link";
import ClientOnly from "./ClientOnly"; // We'll define this below

// Fetch paginated posts from WordPress
async function fetchBlogPosts(page = 1, postsPerPage = 6) {
    const res = await fetch(
        `https://blog.dermahealerindia.com/wp-json/wp/v2/posts?_embed&per_page=${postsPerPage}&page=${page}`,
        { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error("Failed to fetch posts");

    const totalPages = Number(res.headers.get("X-WP-TotalPages"));
    const data = await res.json();

    const formattedPosts = data.map((post) => {
        const tagNames = post._embedded?.["wp:term"]?.[1]?.map((tag) => tag.name) || [];
        return {
            id: post.id,
            title: post.title.rendered,
            excerpt: post.excerpt.rendered,
            image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
            author: post._embedded?.author?.[0]?.name || "Unknown",
            date: new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
            tags: tagNames,
        };
    });

    return { posts: formattedPosts, totalPages };
}

// ✅ Metadata for SEO with canonical
export async function generateMetadata({ searchParams }) {
    const resolvedSearchParams = await searchParams; // FIX ✅
    const currentPage = Number(resolvedSearchParams?.page) || 1;

    let seoTitle =
        "Dermatology Blog | Expert Skincare Tips & Insights from Derma Healer";
    if (seoTitle.length > 65) seoTitle = seoTitle.slice(0, 65) + "...";

    const canonicalUrl =
        currentPage > 1
            ? `https://www.dermahealerindia.com/aaa?page=${currentPage}`
            : "https://www.dermahealerindia.com/aaa";

    return {
        title: seoTitle,
        description:
            "Explore expert-written articles on skin health, anti-aging, acne treatments, and cosmetic procedures from the dermatologists at Derma Healer in Siwan, Bihar.",
        alternates: { canonical: canonicalUrl },
        openGraph: {
            title: seoTitle,
            description:
                "Discover expert skincare advice and wellness tips from our doctors in Siwan, Bihar.",
            url: canonicalUrl,
            images: [
                {
                    url: "/blogog.png",
                    width: 1200,
                    height: 630,
                    alt: "Derma Healer Blog - Expert Dermatology Advice",
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: seoTitle,
            description:
                "Read expert articles on skincare and treatments from our dermatology clinic.",
            images: ["https://www.dermahealerindia.com/og-blog-image.jpg"],
        },
    };
}

export default async function BlogPage({ searchParams }) {
    const resolvedSearchParams = await searchParams; // FIX ✅
    const currentPage = Number(resolvedSearchParams?.page) || 1;

    const postsPerPage = 6;
    const { posts, totalPages } = await fetchBlogPosts(currentPage, postsPerPage);

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
                {posts.map(({ id, title, excerpt, author, date, image, tags }) => (
                    <article
                        key={id}
                        className="bg-[var(--sbg)] rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    >
                        <Link href={`/blogs/${id}`}>
                            {image ? (
                                <img
                                    src={image}
                                    alt={`Blog post: ${title}`}
                                    className="w-full h-48 object-cover"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="bg-gray-700 h-48 w-full animate-pulse" />
                            )}
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
                                        {title.length > 60 ? title.slice(0, 60) + "..." : title}
                                    </h2>
                                    {/* Render WordPress HTML safely on client */}
                                    <ClientOnly>
                                        <div
                                            className="text-gray-300 mb-4"
                                            dangerouslySetInnerHTML={{ __html: excerpt }}
                                        />
                                    </ClientOnly>
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

            {/* Pagination */}
            <div className="flex justify-center items-center mt-10 gap-4">
                <Link
                    href={`/aaa?page=${Math.max(currentPage - 1, 1)}`}
                    className={`px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition ${currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                        }`}
                >
                    Previous
                </Link>
                <span className="text-lg font-semibold text-white">
                    Page {currentPage} of {totalPages}
                </span>
                <Link
                    href={`/aaa?page=${Math.min(currentPage + 1, totalPages)}`}
                    className={`px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition ${currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
                        }`}
                >
                    Next
                </Link>
            </div>
        </div>
    );
}


