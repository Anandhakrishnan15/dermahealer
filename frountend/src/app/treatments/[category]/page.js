import Link from "next/link";
import { treatmentsData } from "../../../data/treatmentsData";

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
            <main className="max-w-4xl mx-auto p-6 space-y-8">
                {/* Title & Description */}
                <header className="text-center space-y-4">
                    {categoryData.image && (
                        <img
                            src={categoryData.image}
                            alt={categoryData.label}
                            className="w-full h-64 object-cover rounded-2xl shadow-md"
                        />
                    )}
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                        {categoryData.label}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        {categoryData.description}
                    </p>
                </header>

                {/* Benefits */}
                {categoryData.benefits && (
                    <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                            {categoryData.benefits.map((b, i) => (
                                <li key={i}>{b}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Procedure */}
                {categoryData.procedure && (
                    <section className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border">
                        <h2 className="text-2xl font-semibold mb-4">Procedure</h2>
                        <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                            {categoryData.procedure}
                        </p>
                    </section>
                )}

                {/* Key Info */}
                <section className="grid md:grid-cols-2 gap-6">
                    {categoryData.duration && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <h3 className="font-semibold">⏱ Duration</h3>
                            <p>{categoryData.duration}</p>
                        </div>
                    )}
                    {categoryData.sessionsRequired && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <h3 className="font-semibold">📅 Sessions Required</h3>
                            <p>{categoryData.sessionsRequired}</p>
                        </div>
                    )}
                    {categoryData.suitableFor && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <h3 className="font-semibold">✅ Suitable For</h3>
                            <p>{categoryData.suitableFor}</p>
                        </div>
                    )}
                </section>

                {/* Aftercare */}
                {categoryData.aftercare && (
                    <section className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border">
                        <h2 className="text-2xl font-semibold mb-4">Aftercare</h2>
                        <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                            {categoryData.aftercare}
                        </p>
                    </section>
                )}

                {/* Expected Results */}
                {categoryData.expectedResults && (
                    <section className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Expected Results</h2>
                        <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                            {categoryData.expectedResults}
                        </p>
                    </section>
                )}
            </main>

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
