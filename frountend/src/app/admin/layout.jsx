"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu,
    X,
    LogOut,
    Home,
    LayoutDashboard,
    CalendarDays,
    UserPlus,
    Edit,
    Calendar,
    Repeat,
    FileText,
    ClipboardList,
    PlusCircle,
    Plus,
    MoreVertical,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
// import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminLayout({ children }) {
    const [open, setOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname(); // ✅ active route detect
    const [menuOpen, setMenuOpen] = useState(false);

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
        { href: "/", label: "Home", icon: Home },
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/appointments", label: "Appointments", icon: CalendarDays },

        { href: "/auth/create-staff", label: "Add Staff", icon: UserPlus, adminOnly: true },
        { href: "/admin/TreatmentsEditor", label: "Update B&F", icon: Edit, adminOnly: true },
        { href: "/admin/holidays", label: "Holidays", icon: Calendar, adminOnly: true },

        { href: "/admin/add/follow-up", label: "Follow-up", icon: Repeat },
        { href: "/admin/add", label: "Add Patient", icon: FileText },
        { href: "/admin/appointments/followup", label: "Followups", icon: ClipboardList },

        {
            href: "https://blog.dermahealerindia.com/wp-admin/post-new.php",
            label: "Add Blog",
            icon: PlusCircle,
            external: true,
            adminOnly: true
        },
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
                            className="fixed z-50 h-full w-64 p-4 shadow-xl"
                            style={{ background: "var(--form-bg)" }}
                        >
                            {/* Header */}
                            <div className="mb-6 flex items-center justify-between">
                                <Logo />
                                <button onClick={() => setOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Links */}
                            <nav className="space-y-2">
                                {links.map(({ href, label, icon: Icon, adminOnly, external }) => {
                                    if (adminOnly && user?.role !== "admin") return null;

                                    const isActive = pathname === href;

                                    const baseStyle =
                                        "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200";

                                    const activeStyle =
                                        "bg-blue-500 text-white shadow-md";

                                    const normalStyle =
                                        "hover:bg-[var(--link-hover)]";

                                    const content = (
                                        <div
                                            className={`${baseStyle} ${isActive ? activeStyle : normalStyle
                                                }`}
                                        >
                                            <Icon
                                                size={20}
                                                className={`${isActive ? "opacity-100" : "opacity-70"
                                                    }`}
                                            />

                                            <span className="text-sm font-medium">
                                                {label}
                                            </span>
                                        </div>
                                    );

                                    if (external) {
                                        return (
                                            <button
                                                key={href}
                                                onClick={() => window.open(href, "_blank")}
                                                className="w-full text-left"
                                            >
                                                {content}
                                            </button>
                                        );
                                    }

                                    return (
                                        <Link
                                            key={href}
                                            href={href}
                                            onClick={() => setOpen(false)}
                                        >
                                            {content}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Main */}
                <div className="flex flex-1 flex-col">
                    {/* Header */}
                    <header className="relative flex items-center p-4 shadow bg-[var(--bg)]">
                        <button
                            onClick={() => setOpen(true)}
                            className="rounded-md border p-2 hover:bg-[var(--link-hover)]"
                        >
                            <Menu size={24} />
                        </button>

                        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2">
                            <Logo large />
                        </div>
                        <div className="ml-auto flex items-center gap-3">

                            {/* DESKTOP BUTTONS */}
                            <div className="hidden md:flex items-center gap-3">

                                {user?.role === "admin" && (
                                    <Link
                                        href="/admin/add-blog"
                                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                                    >
                                        New Blog
                                    </Link>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>

                            </div>

                            {/* MOBILE/TABLET MENU */}
                            <div className="relative md:hidden">

                                <button
                                    onClick={() =>
                                        setMenuOpen((prev) => !prev)
                                    }
                                    className="rounded-lg border p-2 hover:bg-[var(--link-hover)] transition"
                                >
                                    <MoreVertical size={22} />
                                </button>

                                <AnimatePresence>

                                    {menuOpen && (

                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: -10,
                                            }}

                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}

                                            exit={{
                                                opacity: 0,
                                                y: -10,
                                            }}

                                            transition={{
                                                duration: 0.2,
                                            }}

                                            className="
                        absolute right-0 mt-2
                        w-48 rounded-xl shadow-xl
                        border z-50
                        overflow-hidden
                        bg-[var(--bg)]
                    "
                                        >

                                            {user?.role === "admin" && (

                                                <Link
                                                    href="/admin/add-blog"
                                                    onClick={() =>
                                                        setMenuOpen(false)
                                                    }
                                                    className="
                                flex items-center gap-3
                                px-4 py-3
                                hover:bg-[var(--link-hover)]
                                transition
                            "
                                                >

                                                    <Plus size={18} />

                                                    <span>
                                                        New Blog
                                                    </span>

                                                </Link>

                                            )}

                                            <button
                                                onClick={() => {

                                                    setMenuOpen(false);

                                                    handleLogout();

                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-left transition hover:bg-red-500 hover:text-white"
                                            >

                                                <LogOut size={18} />

                                                <span>
                                                    Logout
                                                </span>

                                            </button>

                                        </motion.div>

                                    )}

                                </AnimatePresence>

                            </div>

                        </div>
                    </header>

                    {/* Content */}
                    <main
                        className="flex-1 p-6"
                        style={{ background: "var(--form-bg)" }}
                    >
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}

/* ✅ Logo */
function Logo({ large }) {
    return (
        <div className="flex items-center gap-2">
            <img
                src="/logo2.png"
                alt="Logo"
                width={large ? 50 : 40}
                height={large ? 50 : 40}
                className="object-contain"
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