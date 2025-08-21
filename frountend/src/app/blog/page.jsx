import BlogList from "./BlogList";

export const metadata = {
    // A more targeted and descriptive title
    title: "Dermatology Blog | Expert Skincare Tips & Insights from Derma Healer",

    // A compelling description that highlights expertise and topics
    description:
        "Explore expert-written articles on skin health, anti-aging, acne treatments, and cosmetic procedures from the dermatologists at Derma Healer in Siwan, Bihar.",

    // Keywords are optional but now focus on high-value, long-tail queries
    keywords: [
        "dermatology blog",
        "skincare tips",
        "acne treatment",
        "hair fall solutions",
        "laser hair removal",
        "anti-aging tips",
        "Siwan dermatologist",
        "dermatologist advice",
    ],

    // Essential for all pages
    robots: "index, follow",

    // --- Open Graph (OG) is crucial for social sharing. It's now more specific. ---
    openGraph: {
        title: "Derma Healer Dermatology Blog",
        description: "Discover expert skincare advice and wellness tips from our doctors in Siwan, Bihar.",
        // The URL is vital and should be uncommented and set correctly
        url: "https://www.dermahealerindia.com/blog",
        siteName: "Derma Healer India",
        images: [
            {
                url: "https://www.dermahealerindia.com/og-blog-image.jpg", // Use a blog-specific image
                width: 1200,
                height: 630,
                alt: "Derma Healer Blog - Expert Dermatology Advice",
            },
        ],
        locale: "en_IN",
        type: "website",
    },

    // --- Twitter Card for consistent sharing across platforms ---
    twitter: {
        card: "summary_large_image",
        title: "Dermatology Blog | Derma Healer, Siwan",
        description: "Read expert articles on skincare and treatments from our dermatology clinic.",
        images: ["https://www.dermahealerindia.com/og-blog-image.jpg"],
    },
};

export default function BlogPage() {
    return <BlogList />;
}
