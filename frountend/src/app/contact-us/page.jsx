import { CTASection } from "@/components/CTASection";
import ContactPage from "../../components/ContactUs/ContactPage";
import OurExperts from "@/components/AnimatedCounter";
import React from "react";

const doctors = [
    {
        name: "Dr. Neha Rani",
        specialization: "MBBS, Aesthetic Physician",
        experience: "5+ years of clinical experience.",
        image:
            "https://ik.imagekit.io/iwky7g0ee/6e7a8a-2.webp?updatedAt=1755608440235",
    },
    {
        name: "Dr. B.K. Sharma",
        specialization: "MBBS, MD (Skin & VD)",
        experience: "30+ years of experience.",
        image:
            "https://ik.imagekit.io/iwky7g0ee/6e7a8a-3.webp?updatedAt=1755608439693",
    },
];

// ✅ SEO metadata
export const metadata = {
    // A title optimized for local search in Siwan, Bihar.
    title: "Contact & Book Appointment | Derma Healer, Siwan, Bihar",

    // A description that includes the specific city and state.
    description:
        "Book an appointment and consult our expert dermatologists Dr. Neha Rani & Dr. B.K. Sharma at Derma Healer in Siwan, Bihar. Get advanced skin treatments today!",

    // Keywords are now geo-specific.
    keywords: [
        "Dermatology clinic Siwan",
        "Best dermatologist in Bihar",
        "Book dermatologist appointment Siwan",
        "Dr. Neha Rani",
        "Dr. B.K. Sharma",
        "Skin care clinic Siwan",
        "Contact Derma Healer",
    ],

    // Explicitly instruct search engines to index this page.
    robots: "index, follow",

    // --- Open Graph and Twitter are updated for consistency ---
    openGraph: {
        title: "Contact Derma Healer | Siwan, Bihar",
        description:
            "Get in touch with Derma Healer in Siwan, Bihar, for expert dermatology care and consultations with Dr. Neha Rani & Dr. B.K. Sharma.",
        url: "https://dermahealerindia.com/contact-us",
        siteName: "Derma Healer India",
        images: [
            {
                url: "https://dermahealerindia.com/og-contact.jpg",
                width: 1200,
                height: 630,
                alt: "Derma Healer India - Contact Us, Siwan, Bihar",
            },
        ],
        locale: "en_IN",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Contact Derma Healer, Siwan, Bihar",
        description:
            "Contact Derma Healer to book an appointment with our dermatology experts in Siwan, Bihar.",
        images: ["https://dermahealerindia.com/og-contact.jpg"],
    },
};

export default function Contactus() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "MedicalClinic",
        name: "Derma Healer India",
        url: "https://dermahealerindia.com/contact-us",
        logo: "/logo2.png",
        description:
            "Derma Healer is an advanced dermatology and skin care clinic with expert doctors in Siwan, Bihar.",

        // Updated with your specific address and location
        address: {
            "@type": "PostalAddress",
            streetAddress: "North of Gandhi Maidan",
            addressLocality: "Siwan",
            addressRegion: "Bihar",
            postalCode: "841226",
            addressCountry: "IN",
        },
        geo: {
            "@type": "GeoCoordinates",
            // You can find your exact coordinates on Google Maps.
            // These are approximate coordinates for Gandhi Maidan, Siwan.
            latitude: "26.2166",
            longitude: "84.3508",
        },
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "10:00",
                closes: "19:00",
            },
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Saturday"],
                opens: "10:00",
                closes: "14:00",
            },
        ],

        contactPoint: [
            {
                "@type": "ContactPoint",
                telephone: "+91-XXXXXXXXXX",
                contactType: "Booking and Customer Service",
                areaServed: "IN",
                availableLanguage: ["en", "hi"], // Added Hindi as it's common in Bihar
            },
        ],
        medicalSpecialty: "Dermatology",
        physician: doctors.map((doc) => ({
            "@type": "Physician",
            name: doc.name,
            image: doc.image,
            description: `${doc.specialization} - ${doc.experience}`,
            medicalSpecialty: "Dermatology",
            worksFor: {
                "@type": "MedicalClinic",
                name: "Derma Healer India",
            },
        })),
    };
    return (
        <>
            {/* ✅ JSON-LD structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            {/* Page sections */}
            <ContactPage />
            <OurExperts />
            <CTASection />
        </>
    );
}
