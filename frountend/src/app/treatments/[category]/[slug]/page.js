// src/app/treatments/[category]/[slug]/page.jsx
import { treatmentsData } from "../../../../data/treatmentsData";
import { notFound } from "next/navigation";
import TreatmentContent from "../TreatmentContent";
import Script from "next/script"; // Import Script component

//  Generate metadata dynamically


export async function generateMetadata({ params }) {
    const { category, slug } = await params;

    const treatment = treatmentsData
        .flatMap((cat) => cat.items || [cat])
        .find((item) => item.href.includes(slug));

    if (!treatment) {
        return {
            title: `Treatment Not Found | Derma Healer, Siwan`,
            description: `The requested treatment could not be found.`,
        };
    }

    const title = `${treatment.label || treatment.title} in Siwan, Bihar | Derma Healer India`;
    const description =
        treatment.description ||
        `Learn more about professional ${treatment.label || treatment.title} at Derma Healer in Siwan, Bihar. Schedule a consultation today.`;

    const canonicalUrl = `https://www.dermahealerindia.com/treatments/${category}/${slug}`;

    return {
        title,
        description,
        robots: "index, follow",
        metadataBase: new URL("https://www.dermahealerindia.com"),
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: "Derma Healer India",
            images: [
                {
                    url: treatment.thumbnail || "/og-treatments.jpg",
                    width: 1200,
                    height: 630,
                    alt: treatment.label || treatment.title,
                },
            ],
            locale: "en_IN",
            // ✅ Corrected OpenGraph type
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [
                treatment.thumbnail || "/og-treatments.jpg",
            ],
        },
    };
}

export default async function TreatmentPage({ params }) {
    const { category, slug } = await params;

    const treatment = treatmentsData
        .flatMap((cat) => cat.items || [cat])
        .find((item) => item.href.includes(slug));

    if (!treatment) return <p>Treatment not found.</p>;

    const canonicalUrl = `https://www.dermahealerindia.com/treatments/${category}/${slug}`;

    //  Schema.org structured data for this treatment, now with more details
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        name: treatment.label || treatment.title,
        description: treatment.description,
        image: treatment.thumbnail,
        url: canonicalUrl,
        medicalSpecialty: "Dermatology",
        provider: {
            "@type": "MedicalClinic",
            name: "Derma Healer India",
            url: "https://www.dermahealerindia.com",
            address: {
                "@type": "PostalAddress",
                streetAddress: "North of Gandhi Maidan",
                addressLocality: "Siwan",
                addressRegion: "Bihar",
                postalCode: "841226",
                addressCountry: "IN",
            },
        },
        // A potential action to book an appointment, crucial for service-based businesses
        potentialAction: {
            "@type": "ReserveAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: "https://www.dermahealerindia.com/contact-us",
                actionPlatform: [
                    "https://schema.org/DesktopWebPlatform",
                    "https://schema.org/MobileWebPlatform",
                ],
            },
            name: "Book Appointment",
        },
        // You can add more specific properties if your data has them
        // E.g., bodyLocation: "Face",
        //       howPerformed: "Ablative laser is used to remove a thin layer of skin...",
        //       associatedDisease: "Acne",
    };

    return (
        <>
            {/* Structured data for SEO */}
            <Script
                id="treatment-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
            {/* Client component renders UI */}
            <TreatmentContent treatment={treatment} />
        </>
    );
}