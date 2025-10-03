"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function CreateStaffPage() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        role: "staff",
    });
    const [loading, setLoading] = useState(false);
    const { isLoggedIn, staff, loading: authLoading } = useAuth();
    const [checked, setChecked] = useState(false);
    const router = useRouter();

    // Check auth & role
    useEffect(() => {
        if (!authLoading) {
            if (!isLoggedIn) {
                toast.warning("You are not authorized");
                router.replace("/auth");
            } else if (staff) {
                toast.warning("Staff cannot access this page");
                router.replace("/auth");
            } else {
                setChecked(true);
            }
        }
    }, [isLoggedIn, authLoading, staff, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const res = await fetch("/api/auth/staff", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(data.message);
                setForm({ username: "", email: "", phone: "", password: "", role: "staff" });
            } else {
                toast.error(data.error || "Error creating staff.");
            }
        } catch {
            toast.error("Network error.");
        } finally {
            setLoading(false);
        }
    };

    if (!checked) return null;

    return (
        <>
            <ProtectedRoute>
                <div className="flex min-h-screen bg-gradient-to-br from-teal-200 via-white to-teal-100 overflow-hidden">
                    <div className="flex w-full">

                        {/* INFO PANEL */}
                        <div className="hidden md:flex md:w-1/2 justify-center items-center p-10 bg-gradient-to-br from-teal-600 via-teal-500 to-blue-600 text-white rounded-r-3xl shadow-2xl relative transition-transform duration-700 ease-out transform translate-x-0 opacity-100">

                            <div className="absolute -top-0 -left-10 w-60 h-60 bg-white/20 rounded-full animate-floaty shadow-xl"></div>
                            <div className="absolute -bottom-20 -left-0 w-60 h-60 bg-white/10 rounded-full animate-pulse shadow-xl"></div>

                            <div className="max-w-md space-y-6 relative z-10">
                                <h2 className="text-2xl font-bold uppercase tracking-wide text-teal-100">
                                    Admin Panel
                                </h2>
                                <h1 className="text-3xl font-extrabold leading-snug">Create New Staff</h1>
                                <p className="text-lg text-gray-100">
                                    Add new staff members with secure credentials and assign their role.
                                </p>

                                {/* ✅ Dashboard Link */}
                                <Link
                                    href="/admin"
                                    className="inline-block px-6 py-3 bg-white text-teal-600 font-semibold rounded-xl shadow-md hover:bg-gray-200 transition"
                                >
                                    Go to Dashboard
                                </Link>
                            </div>
                        </div>

                        {/* STAFF CREATION FORM */}
                        <div className="flex w-full md:w-1/2 justify-center items-center p-8 transition-transform duration-700 ease-out transform translate-x-0 opacity-100">
                            <div className="backdrop-blur-lg bg-white/80 w-full max-w-md rounded-2xl shadow-2xl p-8 border border-white/40 animate-fade-in">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Staff Account</h2>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={form.username}
                                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none transition disabled:opacity-50"
                                        required
                                        disabled={loading}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none transition disabled:opacity-50"
                                        required
                                        disabled={loading}
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone number"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none transition disabled:opacity-50"
                                        required
                                        disabled={loading}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none transition disabled:opacity-50"
                                        required
                                        disabled={loading}
                                    />
                                    <select
                                        value={form.role}
                                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                                        className="w-full border p-3 rounded-lg transition disabled:opacity-50"
                                        disabled={loading}
                                    >
                                        <option value="staff">Staff</option>
                                    </select>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-teal-500 to-green-400 text-white py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
                                    >
                                        {loading ? "Creating..." : "Create Account"}
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </ProtectedRoute>
        </>
    );
}
