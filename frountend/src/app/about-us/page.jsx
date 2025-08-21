import AboutHero from "@/components/AboutUs/AboutHero";
import AboutSection from "@/components/AboutUs/Aboutus";
import Doctors from "@/components/AboutUs/Doctors";
import FAQs from "@/components/AboutUs/FAQs";
import FinalCTA from "@/components/AboutUs/FinalCTA";
import MissionVision from "@/components/AboutUs/MissionVision";
import Treatments from "@/components/AboutUs/Treatments";
import WhyChooseUs from "@/components/AboutUs/WhyChooseUs";
import OurExperts from "@/components/AnimatedCounter";
import React from "react";

// SEO metadata
export const metadata = {
    // A more descriptive, keyword-rich title for better SEO.
    title: "Meet Our Expert Dermatologists & Clinic | Derma Healer India",

    // A concise and compelling description with key phrases.
    // It's under 160 characters and includes a call to action.
    description:
        "Learn about the mission, vision, and expert dermatologists at Derma Healer India. We are trusted for advanced skin care and laser treatments across India.",

    // The keywords meta tag is less critical for modern SEO, but you can still use it.
    // I've added more specific and long-tail phrases.
    keywords: [
        "Dermatology clinic India",
        "Expert dermatologists India",
        "Best skin care clinic",
        "Laser treatment clinic",
        "Derma Healer doctors",
        "Acne treatment specialist India",
        "Skin cancer screening",
    ],

    // Add the robots tag to explicitly tell search engines to index and follow links.
    // Next.js handles this by default, but it's good practice for clarity.
    robots: "index, follow",

    // --- Open Graph (OG) is excellent, but let's make the text consistent ---
    openGraph: {
        title: "Meet Our Experts | Derma Healer India",
        description:
            "Discover our expert dermatologists, advanced treatments, and why Derma Healer India is trusted for skin care solutions across India.",
        url: "https://www.dermahealerindia.com/about-us",
        siteName: "Derma Healer India",
        images: [
            {
                url: "https://www.dermahealerindia.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Derma Healer India - About Us",
            },
        ],
        locale: "en_IN",
        type: "website",
    },

    // --- Twitter Card is also great, let's keep the text consistent ---
    twitter: {
        card: "summary_large_image",
        title: "Meet Our Dermatology Experts | Derma Healer India",
        description:
            "Meet our dermatology experts and explore treatments at Derma Healer India, a trusted clinic for advanced skin care.",
        images: ["https://www.dermahealerindia.com/og-image.jpg"],
    },
};

export default function AboutUs() {
    return (
        <>
            <AboutHero />
            <AboutSection />
            <MissionVision />
            <WhyChooseUs />
            <Doctors />
            <Treatments />
            <FAQs />
            <OurExperts />
            <FinalCTA />
        </>
    );
}
