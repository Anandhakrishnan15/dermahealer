"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function MembersPage() {
    const members = [
        { id: 1, name: "Alice Johnson", joinDate: "2024-07-01", email: "alice@example.com", status: "Active" },
        { id: 2, name: "Bob Williams", joinDate: "2024-07-15", email: "bob@example.com", status: "Inactive" },
        { id: 3, name: "Charlie Brown", joinDate: "2024-08-01", email: "charlie@example.com", status: "Active" },
    ];

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Members</h2>

            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="bg-gradient-to-r from-gray-300 to-gray-200 text-[var(--sbg)]">
                            <th className="p-3">ID</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Join Date</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>

                    <AnimatePresence>
                        <tbody>
                            {members.map((member) => (
                                <motion.tr
                                    key={member.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="odd:bg-[var(--bg)] even:bg-[var(--form-bg)] hover:bg-[var(--link-hover)] transition-colors"
                                >
                                    <td className="p-3 font-medium text-gray-700">{member.id}</td>
                                    <td className="p-3">{member.name}</td>
                                    <td className="p-3">{member.joinDate}</td>
                                    <td className="p-3">{member.email}</td>
                                    <td
                                        className={`p-3 font-semibold ${member.status === "Active"
                                                ? "text-green-600"
                                                : "text-red-600"
                                            }`}
                                    >
                                        {member.status}
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
