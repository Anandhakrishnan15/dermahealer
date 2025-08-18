import BlogList from "./BlogList";

export const metadata = {
    title: "Health & Wellness Blog | Your Clinic",
    description: "Explore expert tips, news & insights from our doctors on health and wellness.",
    keywords: ["health", "wellness", "skin care", "treatments", "clinic blog"],
    openGraph: {
        title: "Health & Wellness Blog | Your Clinic",
        description: "Discover health tips, latest treatments, and expert advice from our doctors.",
        // url: "https://yourwebsite.com/blog",
        siteName: "Your Clinic",
        images: [
            {
                url: "https://yourwebsite.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Health & Wellness Blog",
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

export default function BlogPage() {
    return <BlogList />;
}
