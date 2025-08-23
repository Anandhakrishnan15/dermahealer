"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
        <ProtectedRoute >
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.aside
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed z-50 h-full w-64 shadow-lg p-4"
                        style={{ background: "var(--form-bg)" }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold">Admin Menu</h2>
                            <button onClick={() => setSidebarOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <nav className="space-y-3">
                            <Link href="/admin" className="block p-2 rounded hover:bg-[var(--link-hover)]" onClick={() => setSidebarOpen(!sidebarOpen)} >
                                Dashboard
                            </Link>
                            <Link href="/admin/appointments" className="block p-2 rounded hover:bg-[var(--link-hover)]"onClick={()=>setSidebarOpen(!sidebarOpen)} >
                                Appointments
                            </Link>
                            <Link href="/admin/members" className="block p-2 rounded hover:bg-[var(--link-hover)]"onClick={()=>setSidebarOpen(!sidebarOpen)} >
                                Members
                            </Link>
                            <Link href="/admin/add-blog" className="block p-2 rounded hover:bg-[var(--link-hover)]"onClick={()=>setSidebarOpen(!sidebarOpen)} >
                                Blogs
                            </Link>
                        </nav>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-[var(--bg)] shadow p-4 flex justify-between items-center">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-md bg-[var(--bg)] border hover:bg-[var(--link-hover)]"
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className="text-xl text-[var(--text)] font-bold">Admin Dashboard</h1>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        New Blog
                    </button>
                </header>

                {/* Page Content */}
                <main className="p-6 flex-1"
                    style={{ background: "var(--form-bg)" }}>
                    {children}
                </main>
            </div>
        </div>
        </ProtectedRoute>
        </>
    );
}
