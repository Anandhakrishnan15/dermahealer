"use client";

export default function RatingModal({ isOpen, onClose, score, setScore, reviews, setReviews, onSave }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-96 p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
                >
                    ✖
                </button>
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Update Rating</h2>
                <div className="space-y-4">
                    <input
                        type="number"
                        step="0.1"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        placeholder="⭐ Score (e.g. 4.9)"
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="number"
                        value={reviews}
                        onChange={(e) => setReviews(e.target.value)}
                        placeholder="💬 Reviews (e.g. 241)"
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <button
                    onClick={onSave}
                    className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
