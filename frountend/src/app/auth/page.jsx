"use client";

import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthPage() {
    const { login, isLoggedIn, loading, user } = useAuth();
    const [form, setForm] = useState({ email: "anandh@gmail.com", password: "123456" });
    const [submitLoading, setSubmitLoading] = useState(false);
    const [checked, setChecked] = useState(false); // for auth check
    const router = useRouter();
    const firstLoad = useRef(true);

    // Redirect if already logged in
    useEffect(() => {
        if (!loading && firstLoad.current) {
            firstLoad.current = false; // mark that we've run this once
            if (isLoggedIn) {
                toast.info("You are already logged in!");
                if (user?.role === "admin") {
                    router.replace("/admin");
                } else {
                    router.replace("/admin/appointments");
                }
            } else {
                setChecked(true); // show login page
            }
        }
    }, [loading, isLoggedIn, user, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setSubmitLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            let data;
            try {
                data = await res.json();
            } catch {
                throw new Error("Invalid server response.");
            }

            if (!res.ok) {
                const message = data?.error || `Error ${res.status}: ${res.statusText}`;
                toast.error(message);
                return;
            }

            if (data.token && data.user) {
                const redirectPath =
                    data.user.role === "admin" ? "/admin" : "/admin/appointments";
                    
                router.push(redirectPath);

                login(data.token, data.user);

               
                toast.success("Login successful!");
            } else {
                toast.error("Unexpected response from server.");
            }
        } catch (err) {
            console.error("Login error:", err);
            toast.error(err.message || "Network error. Please try again.");
        } finally {
            setSubmitLoading(false);
        }
    };


    // prevent flicker before auth check
    if (!checked) return null;

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-teal-200 via-white to-teal-100 overflow-hidden">
            <div className="flex w-full">
                {/* LOGIN FORM */}
                <div className="flex w-full md:w-1/2 justify-center items-center p-8">
                    <div className="backdrop-blur-lg bg-white/80 w-full max-w-md rounded-2xl shadow-2xl p-8 border border-white/40">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign in</h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <input
                                type="email"
                                placeholder="Email address"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
                                required
                            />

                            <button
                                type="submit"
                                disabled={submitLoading}
                                className="w-full bg-gradient-to-r from-teal-500 to-green-400 text-white py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
                            >
                                {submitLoading ? "Processing..." : "Sign in →"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* INFO PANEL */}
                <div className="hidden md:flex md:w-1/2 justify-center items-center p-10 bg-gradient-to-br from-teal-600 via-teal-500 to-blue-600 text-white rounded-l-3xl shadow-2xl relative overflow-hidden">
                    {/* Floating gradient blobs */}
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/20 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/10 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-20 left-0 w-80 h-80 bg-white/10 rounded-full animate-pulse"></div>

                    {/* Text content */}
                    <div className="max-w-md space-y-6 relative z-10">
                        <h2 className="text-2xl font-bold uppercase tracking-wide">Welcome Back</h2>
                        <h1 className="text-3xl font-extrabold leading-snug">Let’s Get You Logged In</h1>
                        <p className="text-lg text-gray-100">
                            Enter your credentials to access the network.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
