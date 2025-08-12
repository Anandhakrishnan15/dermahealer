"use client";
import BlogsTable from "@/components/Admin/AdminDashboard";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AdminHome() {
    const [showBlogModal, setShowBlogModal] = useState(false);
    const [showAppointmentModal, setShowAppointmentModal] = useState(false);

    const stats = [
        { label: "Total Appointments", value: 124 },
        { label: "Today's Appointments", value: 8 },
        { label: "New Members", value: 15 },
        { label: "Total Blogs", value: 42 },
    ];

    const recentAppointments = [
        { id: 1, name: "John Doe", date: "2025-08-12", service: "Laser Treatment" },
        { id: 2, name: "Jane Smith", date: "2025-08-12", service: "Acne Treatment" },
        { id: 3, name: "Michael Brown", date: "2025-08-11", service: "Hair Removal" },
    ];

    return (
        <div className="space-y-8 p-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-6 rounded-lg shadow hover:shadow-lg transition"
                        style={{ background: "var(--bg)" }}
                    >
                        <h2 className="text-gray-600 text-sm">{stat.label}</h2>
                        <p className="text-2xl font-bold">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="p-6 rounded-lg shadow" style={{ background: "var(--bg)" }}>
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <button
                        className="px-4 py-2 bg-[var(--btn-bg)] text-[var(--text)] rounded-lg hover:bg-[var(--btn-hover)] transition"
                        onClick={() => setShowBlogModal(true)}
                    >
                        ➕ Add Blog
                    </button>
                    <button
                        className="px-4 py-2 bg-[var(--btn-bg)] text-[var(--text)] rounded-lg hover:bg-[var(--btn-hover)] transition"
                        onClick={() => window.location.href = "/auth"}
                    >
                        ➕ Add Doctor
                    </button>
                    <button
                        className="px-4 py-2 bg-[var(--btn-bg)] text-[var(--text)] rounded-lg hover:bg-[var(--btn-hover)] transition"
                        onClick={() => setShowAppointmentModal(true)}
                    >
                        📅 New Appointment
                    </button>
                </div>
            </div>

            {/* Recent Appointments */}
            <div className="p-6 rounded-lg shadow" style={{ background: "var(--bg)" }}>
                <h2 className="text-lg font-semibold mb-4">Recent Appointments</h2>
                <div className="overflow-x-auto rounded-lg">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-gradient-to-r from-gray-300 to-gray-200 text-[var(--sbg)]">
                                <th className="p-3">ID</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Service</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentAppointments.map((appt) => (
                                <tr
                                    key={appt.id}
                                    className="odd:bg-[var(--bg)] even:bg-[var(--form-bg)] hover:bg-[var(--link-hover)] transition-colors"
                                >
                                    <td className="p-3">{appt.id}</td>
                                    <td className="p-3">{appt.name}</td>
                                    <td className="p-3">{appt.date}</td>
                                    <td className="p-3">{appt.service}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Blogs Section */}
            <div className="p-6 rounded-lg shadow" style={{ background: "var(--bg)" }}>
                <h2 className="text-lg font-semibold mb-4">Recent Blogs</h2>
                <BlogsTable />
            </div>

            {/* Blog Modal */}
            {showBlogModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                        <h2 className="text-xl font-bold mb-4">Add New Blog</h2>
                        <input type="text" placeholder="Blog Title" className="border w-full p-2 mb-3 rounded" />
                        <textarea placeholder="Blog Description" className="border w-full p-2 mb-3 rounded" rows="4"></textarea>
                        <input type="file" className="mb-3" />
                        {/* Rich text editor placeholder */}
                        <div className="border p-2 mb-3">[Rich Text Editor Here]</div>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowBlogModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded">Add Blog</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Appointment Modal */}
            {showAppointmentModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                        <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
                        <input type="text" placeholder="Patient Name" className="border w-full p-2 mb-3 rounded" />
                        <div className="mb-3">
                            <label className="block mb-1">Treatment:</label>
                            <div className="flex gap-3">
                                <label><input type="radio" name="treatment" /> Laser</label>
                                <label><input type="radio" name="treatment" /> Acne</label>
                                <label><input type="radio" name="treatment" /> Hair Removal</label>
                            </div>
                        </div>
                        <select className="border w-full p-2 mb-3 rounded">
                            <option>Select Doctor</option>
                            <option>Dr. Smith</option>
                            <option>Dr. Lee</option>
                        </select>
                        <input type="time" className="border w-full p-2 mb-3 rounded" />
                        <input type="date" className="border w-full p-2 mb-3 rounded" />
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowAppointmentModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                            <button className="px-4 py-2 bg-green-500 text-white rounded">Book</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
