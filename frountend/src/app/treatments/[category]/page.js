// src/app/treatments/[category]/[slug]/page.jsx
import Link from "next/link";
import { treatmentsData } from "../../../data/treatmentsData";
import TreatmentContent from "@/app/treatments/[category]/TreatmentContent";
import Script from "next/script";

// ✅ Generate dynamic metadata for each category
export async function generateMetadata({ params }) {
    const { category } = await params;

    const categoryData = treatmentsData.find((cat) =>
        cat.href ? cat.href.includes(category) : cat.label.toLowerCase().includes(category)
    );

    if (!categoryData) {
        return {
            title: `Treatment Category Not Found | Derma Healer, Siwan`,
            description: `The requested treatment category "${category}" could not be found at Derma Healer in Siwan, Bihar.`,
        };
    }

    const title = `${categoryData.label} Treatments in Siwan, Bihar | Derma Healer India`;
    const description =
        categoryData.description ||
        `Explore advanced ${categoryData.label} treatments offered by Derma Healer in Siwan, Bihar.`;

    const canonicalUrl = `https://www.dermahealerindia.com/treatments/${category}`;

    return {
        title,
        description,
        robots: "index, follow",
        metadataBase: new URL("https://www.dermahealerindia.com"), // Crucial for absolute URLs
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
                    url: categoryData.thumbnail || "/og-treatments.jpg",
                    width: 1200,
                    height: 630,
                    alt: categoryData.label,
                },
            ],
            locale: "en_IN",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [
                categoryData.thumbnail || "/og-treatments.jpg",
            ],
        },
    };
}

export default async function TreatmentCategoryPage({ params }) {
    const { category } = await params;

    const categoryData = treatmentsData.find((cat) =>
        cat.href ? cat.href.includes(category) : cat.label.toLowerCase().includes(category)
    );

    if (!categoryData) {
        return <div>Category <strong>{category}</strong> not found.</div>;
    }

    // ✅ Schema.org structured data for this category page
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage", // Correct type for a list of items
        name: `${categoryData.label} Treatments`,
        description: categoryData.description || `Explore advanced treatments and procedures for ${categoryData.label}.`,
        url: `https://www.dermahealerindia.com/treatments/${category}`,
        about: {
            "@type": "MedicalSpecialty",
            name: "Dermatology",
        },
        hasPart: categoryData.items?.map(item => ({
            "@type": "MedicalProcedure",
            name: item.label,
            url: `https://www.dermahealerindia.com/treatments/${category}/${item.href.replace("/treatments/", "")}`,
        })) || [],
    };

    // If this is a leaf treatment (no sub-items)
    if (!categoryData.items) {
        return <TreatmentContent treatment={categoryData} />;
    }

    // If category has multiple sub-items
    return (
        <>
            <Script
                id="category-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            <main style={{ padding: "1rem" }}>
                <h1>{categoryData.label}</h1>
                <ul>
                    {categoryData.items.map((item) => (
                        <li key={item.href} style={{ marginBottom: "1rem" }}>
                            <Link
                                href={`/treatments/${category}/${item.href.split('/').pop()}`}
                                style={{ color: "blue", textDecoration: "underline" }}
                            >
                                {item.label}
                            </Link>
                            {item.description && <p>{item.description}</p>}
                        </li>
                    ))}
                </ul>
            </main>
        </>
    );
}