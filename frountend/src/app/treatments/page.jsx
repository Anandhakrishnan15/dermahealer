// src/app/treatments/page.jsx
import { TopServicesPreview } from "@/components/TopServicesPreview";
import React from "react";
import products from "../../data/serviciess";
import OurExperts from "@/components/AnimatedCounter";
import { CTASection } from "@/components/CTASection";

// ✅ SEO Metadata
export const metadata = {
    // Localized title for Siwan, Bihar
    title: "Treatments in Siwan, Bihar | Derma Healer",

    // Descriptive, localized description
    description:
        "Explore advanced skin, hair, and body treatments at Derma Healer in Siwan, Bihar. From laser scar removal to hair loss therapy, we offer safe, effective dermatology solutions.",

    // Localized and specific keywords
    keywords: [
        "skin treatments Siwan",
        "hair treatments Siwan",
        "laser therapy Siwan",
        "dermatology clinic Siwan",
        "Derma Healer India",
    ],

    // Explicitly tell robots to index this page
    robots: "index, follow",

    // Crucial for generating absolute URLs
    metadataBase: new URL("https://www.dermahealerindia.com"),

    // Canonical URL for this page
    alternates: {
        canonical: "https://www.dermahealerindia.com/treatments",
    },

    openGraph: {
        title: "Dermatology Treatments | Derma Healer in Siwan",
        description:
            "Discover dermatology treatments including anti-ageing, laser scar removal, hair loss solutions, pigmentation therapy, and more in Siwan, Bihar.",
        url: "https://www.dermahealerindia.com/treatments",
        siteName: "Derma Healer India",
        images: [
            {
                url: "/og-treatments.jpg",
                width: 1200,
                height: 630,
                alt: "Derma Healer Treatments",
            },
        ],
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Dermatology Treatments | Derma Healer in Siwan",
        description:
            "Browse safe and effective dermatology treatments offered by Derma Healer in Siwan, Bihar.",
        images: ["/og-treatments.jpg"],
    },
};

export default function TreatmentsPage() {
    // ✅ Schema.org structured data for treatments
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Treatments at Derma Healer India",
        description:
            "List of advanced skin, hair, and body treatments provided at Derma Healer in Siwan, Bihar.",
        // Link the provider to this item list
        provider: {
            "@type": "MedicalClinic",
            name: "Derma Healer India",
            url: "https://www.dermahealerindia.com",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Siwan",
                addressRegion: "Bihar",
                addressCountry: "IN",
            },
        },
        itemListElement: products.map((product, index) => ({
            "@type": "MedicalProcedure",
            position: index + 1,
            name: product.title,
            description: product.description,
            image: product.thumbnail,
            url: `https://yourwebsite.com/treatments/${product.slug || "#"}`,
            medicalSpecialty: "Dermatology",
        })),
    };

    return (
        <>
            {/* ✅ Inject JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
            <TopServicesPreview />
            <OurExperts/>
            <CTASection/>
            
        </>
    );
}