import { treatmentsData } from "../../../../data/treatmentsData";

export default async function TreatmentPage({ params }) {
    const { category, slug } = await params;

    // Find the category
    const categoryData = treatmentsData.find(cat => {
        if (cat.items) {
            return cat.items.some(item => item.href.includes(category));
        } else {
            return cat.href?.includes(category);
        }
    });

    if (!categoryData) return <p>Category not found.</p>;

    // Find the treatment
    let treatment;
    if (categoryData.items) {
        treatment = categoryData.items.find(item => item.href.includes(slug));
    } else if (categoryData.href?.includes(slug)) {
        treatment = categoryData;
    }

    if (!treatment) return <p>Treatment not found.</p>;

    return (
        <main className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Header Section */}
            <header className="text-center space-y-4">
                {treatment.image && (
                    <img
                        src={treatment.image}
                        alt={treatment.label}
                        className="w-full h-64 object-cover rounded-2xl shadow-md"
                    />
                )}
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                    {treatment.label}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    {treatment.description}
                </p>
            </header>

            {/* Benefits */}
            {treatment.benefits && (
                <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        {treatment.benefits.map((b, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="text-green-500">✔</span>
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Procedure */}
            {treatment.procedure && (
                <section className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border">
                    <h2 className="text-2xl font-semibold mb-4">Procedure</h2>
                    <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                        {treatment.procedure}
                    </p>
                </section>
            )}

            {/* Key Info Grid */}
            <section className="grid md:grid-cols-2 gap-6">
                {treatment.duration && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm">
                        <h3 className="font-semibold">⏱ Duration</h3>
                        <p>{treatment.duration}</p>
                    </div>
                )}
                {treatment.sessionsRequired && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm">
                        <h3 className="font-semibold">📅 Sessions Required</h3>
                        <p>{treatment.sessionsRequired}</p>
                    </div>
                )}
                {treatment.suitableFor && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm">
                        <h3 className="font-semibold">✅ Suitable For</h3>
                        <p>{treatment.suitableFor}</p>
                    </div>
                )}
            </section>

            {/* Aftercare */}
            {treatment.aftercare && (
                <section className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border">
                    <h2 className="text-2xl font-semibold mb-4">Aftercare</h2>
                    <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                        {treatment.aftercare}
                    </p>
                </section>
            )}

            {/* Expected Results */}
            {treatment.expectedResults && (
                <section className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Expected Results</h2>
                    <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                        {treatment.expectedResults}
                    </p>
                </section>
            )}
        </main>

    );
}
