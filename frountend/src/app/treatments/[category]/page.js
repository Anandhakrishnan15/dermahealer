import Link from "next/link";
import { treatmentsData } from "../../../data/treatmentsData";
import TreatmentContent from "@/app/treatments/[category]/TreatmentContent";

export default async function TreatmentCategoryPage({ params }) {
    const { category } = await params; // ✅ destructure directly

    const categoryData = treatmentsData.find(cat =>
        cat.href ? cat.href.includes(category) : cat.label.toLowerCase().includes(category)
    );

    if (!categoryData) {
        return <div>Category <strong>{category}</strong> not found.</div>;
    }

    if (!categoryData.items) {
        return (
           
            <TreatmentContent treatment={categoryData} />

        );
    }

    return (
        <main style={{ padding: "1rem" }}>
            <h1>{categoryData.label}</h1>
            <ul>
                {categoryData.items.map((item) => (
                    <li key={item.href} style={{ marginBottom: "1rem" }}>
                        <Link
                            href={item.href}
                            style={{ color: "blue", textDecoration: "underline" }}
                        >
                            {item.label}
                        </Link>
                        {item.description && <p>{item.description}</p>}
                    </li>
                ))}
            </ul>
        </main>
    );
}
