// src/app/treatments/[category]/[slug]/page.jsx
import { treatmentsData } from "../../../../data/treatmentsData";
import TreatmentContent from "../TreatmentContent"; // client component

export default async function TreatmentPage({ params }) {
    const { category, slug } =await params;

    const categoryData = treatmentsData.find(cat =>
        cat.items ? cat.items.some(item => item.href.includes(category)) : cat.href?.includes(category)
    );

    if (!categoryData) return <p>Category not found.</p>;

    const treatment = categoryData.items
        ? categoryData.items.find(item => item.href.includes(slug))
        : categoryData.href?.includes(slug)
            ? categoryData
            : null;

    if (!treatment) return <p>Treatment not found.</p>;

    // Pass the treatment data to a client component
    return <TreatmentContent treatment={treatment} />;
}
