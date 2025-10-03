"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

export default function MembersPage() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await fetch("/api/files", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();

            if (!res.ok) setError(data.error || "Failed to fetch members");
            else setMembers(data.files || []);
        } catch (err) {
            setError("Network error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const toggleBlock = async (id, currentlyBlocked) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`/api/files/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ blocked: !currentlyBlocked }),
            });

            const data = await res.json();

            if (res.ok) {
                fetchMembers(); // refresh list
                toast.success(data.blocked ? "User blocked successfully" : "User unblocked successfully");
            } else {
                toast.error(data.error || "Action failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Network error");
        }
    };


    // ✅ Delete user
    const deleteUser = async (id) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`/api/files/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();

            if (res.ok) {
                fetchMembers(); // refresh list
                toast.success("User deleted successfully");
            } else {
                toast.error(data.error || "Delete failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Network error");
        }
    };



    if (loading)
        return (
            <div className="p-6 flex justify-center items-center text-gray-500">
                Loading members...
            </div>
        );

    if (error)
        return (
            <div className="p-6 text-red-500 font-medium">{error}</div>
        );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Members</h2>

            <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Joined</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>

                    <AnimatePresence>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {members.map((member) => (
                                <motion.tr
                                    key={member._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-3 text-gray-800 font-medium">{member.username}</td>
                                    <td className="px-4 py-3 text-gray-600">{member.email}</td>
                                    <td className="px-4 py-3 text-gray-600">{member.role}</td>
                                    <td className="px-4 py-3 font-semibold">
                                        {member.blocked ? (
                                            <span className="text-red-600">Blocked</span>
                                        ) : (
                                            <span className="text-green-600">Active</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {new Date(member.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <button
                                            onClick={() => toggleBlock(member._id, member.blocked)}
                                            className={`px-3 py-1 rounded text-white font-medium transition-colors ${member.blocked ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                                                }`}
                                        >
                                            {member.blocked ? "Unblock" : "Block"}
                                        </button>
                                        <button
                                            onClick={() => deleteUser(member._id)}
                                            className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-700 text-white font-medium transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </AnimatePresence>
                </table>
            </div>
        </div>
    );
}
