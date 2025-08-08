import { treatmentsData } from "../../../../data/treatmentsData";

export default function TreatmentPage({ params }) {
    const { category, slug } = params;

    const categoryData = treatmentsData.find(cat => cat.category === category);
    if (!categoryData) return <p>Category not found.</p>;

    const treatment = categoryData.items.find(item => item.slug === slug);
    if (!treatment) return <p>Treatment not found.</p>;

    return (
        <main>
            <h1>{treatment.label}</h1>
            <p>{treatment.description}</p>
        </main>
    );
}
