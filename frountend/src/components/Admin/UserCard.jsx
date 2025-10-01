"use client";

export default function UserCard({ user, onEditRating }) {
    const isLoading = !user || Object.keys(user).length === 0;

    return (
        <div className="flex items-center justify-between p-6 bg-white/80 backdrop-blur-lg rounded-xl shadow-md">
            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold ${isLoading
                        ? "bg-gray-300 animate-pulse"
                        : "bg-gradient-to-tr from-teal-400 to-blue-500"
                    }`}>
                    {!isLoading && (user?.username?.[0]?.toUpperCase() || "U")}
                </div>

                <div className="flex flex-col gap-1">
                    {/* Username & Role */}
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        {isLoading ? (
                            <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
                        ) : (
                            user?.username || "Unknown User"
                        )}

                        {!isLoading && user?.role === "admin" && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                                Admin
                            </span>
                        )}

                        {!isLoading && user?.role === "staff" && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">
                                Staff
                            </span>
                        )}
                    </h2>

                    {/* Email */}
                    {isLoading ? (
                        <div className="w-48 h-4 bg-gray-300 rounded animate-pulse"></div>
                    ) : (
                        <p className="text-gray-500 text-sm">{user?.email}</p>
                    )}
                </div>
            </div>

            {/* Edit button */}
            {!isLoading && user?.role !== "staff" && (
                <button
                    onClick={onEditRating}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                    Edit Rating
                </button>
            )}
        </div>
    );
}
