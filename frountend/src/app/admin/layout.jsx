"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }) {
    const [open, setOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        setLoggingOut(true);
        logout();
        router.push("/auth");
    };

    if (loggingOut)
        return (
            <div className="flex h-screen items-center justify-center bg-white dark:bg-gray-900">
                <p className="text-gray-600 dark:text-gray-300">Logging out...</p>
            </div>
        );

    const links = [
        { href: "/", label: "Home" },
        { href: "/admin", label: "Dashboard" },
        { href: "/admin/appointments", label: "Appointments" },
        { href: "/admin/members", label: "Members", adminOnly: true },
        { href: "/admin/add-blog", label: "Blogs", adminOnly: true },
        { href: "/admin/holidays", label: "Holidays", adminOnly: true },
        { href: "/admin/Members", label: "Members", adminOnly: true },

        // Members
    ];

    return (
        <ProtectedRoute>
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <AnimatePresence>
                    {open && (
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.3 }}
                            className="fixed z-50 h-full w-64 p-4 shadow-lg"
                            style={{ background: "var(--form-bg)" }}
                        >
                            <div className="mb-6 flex items-center justify-between">
                                <Logo />
                                <button onClick={() => setOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>

                            <nav className="space-y-3">
                                {links.map(({ href, label, adminOnly }) => {
                                    if (adminOnly && user?.role !== "admin") return null; // 👈 Hide if not admin
                                    return (
                                        <Link
                                            key={href}
                                            href={href}
                                            onClick={() => setOpen(false)}
                                            className="block rounded p-2 hover:bg-[var(--link-hover)]"
                                        >
                                            {label}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Main */}
                <div className="flex flex-1 flex-col">
                    <header className="relative flex items-center p-4 shadow bg-[var(--bg)]">
                        <button
                            onClick={() => setOpen(true)}
                            className="rounded-md border bg-[var(--bg)] p-2 hover:bg-[var(--link-hover)]"
                        >
                            <Menu size={24} />
                        </button>

                        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3">
                            <Logo large />
                        </div>

                        <div className="ml-auto flex items-center gap-3">
                            <Link
                                href="/admin/add-blog"
                                className={`rounded-lg px-4 py-2 text-white ${user?.role === "admin"
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "bg-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                New Blog
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    </header>

                    <main className="flex-1 p-6" style={{ background: "var(--form-bg)" }}>
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}

function Logo({ large }) {
    return (
        <div className="flex items-center gap-2">
            <img
                src="/logo2.png"
                alt="Logo"
                width={large ? 50 : 40}
                height={large ? 50 : 40}
                className="object-contain"
                loading="eager"
            />
            <h2
                className={`font-bold ${large ? "text-3xl" : "text-lg"
                    } flex items-center gap-1`}
            >
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                    Derma
                </span>
                <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
                    Healer
                </span>
            </h2>
        </div>
    );
}
