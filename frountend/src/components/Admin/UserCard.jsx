"use client";

export default function UserCard({ user, onEditRating }) {
    return (
        <div className="flex items-center justify-between p-6 bg-white/80 backdrop-blur-lg rounded-xl shadow-md">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-teal-400 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                    {user?.username?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        {user?.username || "Unknown User"}

                        {user?.role === "admin" && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                                Admin
                            </span>
                        )}

                        {user?.role === "staff" && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">
                                Staff
                            </span>
                        )}
                    </h2>

                    <p className="text-gray-500 text-sm">{user?.email}</p>
                </div>


            </div>
            {user?.role !== "staff" && (
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
