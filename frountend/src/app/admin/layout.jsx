"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        setIsLoggingOut(true); // 🔥 Blank UI instantly
        logout();
        router.push("/");
    };

    if (isLoggingOut) {
        // 🧹 Blank or loading screen
        return (
            <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
                <p className="text-gray-600 dark:text-gray-300">Logging out...</p>
            </div>
        );
    }

    return (
        <ProtectedRoute>
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
                                <div className="flex items-center gap-2">
                                    <img
                                        src="/logo2.png"
                                        alt="My Logo"
                                        width={50}
                                        height={50}
                                        className="object-contain"
                                        loading="eager"
                                    />
                                    <h2 className="text-lg font-bold flex items-center gap-1">
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
                                            Derma
                                        </span>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600">
                                            Healer
                                        </span>
                                    </h2>
                                </div>
                                <button onClick={() => setSidebarOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>

                            <nav className="space-y-3">
                                <Link href="/" className="block p-2 rounded hover:bg-[var(--link-hover)]" onClick={() => setSidebarOpen(false)}>Home</Link>
                                <Link href="/admin" className="block p-2 rounded hover:bg-[var(--link-hover)]" onClick={() => setSidebarOpen(false)}>Dashboard</Link>
                                <Link href="/admin/appointments" className="block p-2 rounded hover:bg-[var(--link-hover)]" onClick={() => setSidebarOpen(false)}>Appointments</Link>
                                <Link href="/admin/members" className="block p-2 rounded hover:bg-[var(--link-hover)]" onClick={() => setSidebarOpen(false)}>Members</Link>
                                <Link href="/admin/add-blog" className="block p-2 rounded hover:bg-[var(--link-hover)]" onClick={() => setSidebarOpen(false)}>Blogs</Link>
                            </nav>
                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Main content */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="bg-[var(--bg)] shadow p-4 flex items-center relative">
                        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md bg-[var(--bg)] border hover:bg-[var(--link-hover)]">
                            <Menu size={24} />
                        </button>

                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
                            <Link href="/">
                                <img src="/logo2.png" alt="My Logo" width={50} height={50} className="object-contain" loading="eager" />
                            </Link>
                            <h1 className="text-3xl font-bold flex items-center gap-1">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">Derma</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600">Healer</span>
                            </h1>
                        </div>

                        <div className="ml-auto flex items-center gap-3">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                New Blog
                            </button>
                            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700">
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="p-6 flex-1" style={{ background: "var(--form-bg)" }}>
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
