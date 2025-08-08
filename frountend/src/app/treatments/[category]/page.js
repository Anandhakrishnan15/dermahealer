import Link from "next/link";
import { treatmentsData } from "../../../data/treatmentsData";

export default function TreatmentCategoryPage({ params }) {
    const { category } = params;

    const categoryData = treatmentsData.find(cat => cat.category === category);

    if (!categoryData) {
        return <div>Category <strong>{category}</strong> not found.</div>;
    }

    return (
        <main style={{ padding: "1rem" }}>
            <h1>{categoryData.label}</h1>
            <ul>
                {categoryData.items.map((item) => (
                    <li key={item.slug}>
                        <Link href={item.href} style={{ color: "blue", textDecoration: "underline" }}>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
