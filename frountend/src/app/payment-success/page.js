"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { CheckCircle, XCircle, FileText, Home, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PaymentSuccess() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState("");

    const toastRef = useRef(false); // ✅ prevent duplicate toast

    const isPaid = booking?.paid === true;

    /* ---------------- FETCH BOOKING ---------------- */
    useEffect(() => {
        if (!orderId) {
            setError("Invalid order ID");
            setLoading(false);
            return;
        }

        (async () => {
            try {
                const res = await fetch(`/api/bookings/${orderId}`);

                if (!res.ok) {
                    setError("Booking not found");
                    setBooking(null);
                    return;
                }

                const data = await res.json();
                setBooking(data);
            } catch (err) {
                console.error("Error fetching booking:", err);
                setError("Something went wrong");
                setBooking(null);
            } finally {
                setLoading(false);
            }
        })();
    }, [orderId]);

    /* ---------------- TOAST + REDIRECT ---------------- */
    useEffect(() => {
        if (toastRef.current) return; // already run
        if (loading) return; // wait for booking to load

        if (booking) {
            if (booking.paid === true) {
                toast.success("🎉 Booking successful");
                toastRef.current = true;

                // redirect after 10s
                const timer = setTimeout(() => {
                    router.push("/treatments");
                }, 10000);

                return () => clearTimeout(timer);
            } else if (booking.paid === false) {
                toast.error("❌ Booking not confirmed. Payment failed.");
                toastRef.current = true;
            }
        } else if (error) {
            toast.error("❌ " + error);
            toastRef.current = true;
        }
    }, [booking, error, loading, router]);

    /* ---------------- SEND EMAIL ONCE ---------------- */
    useEffect(() => {
        if (!booking || !isPaid || emailSent || !booking.email) return;

        (async () => {
            try {
                const res = await fetch("/api/send-confirmation-email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: booking.email,
                        name: booking.name,
                        doctor: booking.doctor,
                        date: booking.date,
                        time: booking.time,
                        orderId: booking.orderId,
                        amount: booking.amount,
                    }),
                });

                if (res.ok) {
                    toast.info("📧 Confirmation email sent. Please check your inbox.");
                    setEmailSent(true);
                }
            } catch (err) {
                toast.error("❌ Failed to send confirmation email");
                console.error(err);
            }
        })();
    }, [booking, isPaid, emailSent]);

    /* ---------------- UI ---------------- */
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-6">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center"
            >
                {loading ? (
                    <div className="animate-pulse space-y-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto" />
                        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto" />
                    </div>
                ) : error ? (
                    <>
                        <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-semibold text-red-600">{error}</h1>
                    </>
                ) : isPaid ? (
                    <>
                        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-semibold text-green-700">
                            Payment Successful
                        </h1>
                        <p className="text-gray-600 mt-2">Your appointment is confirmed</p>
                    </>
                ) : (
                    <>
                        <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-semibold text-red-600">
                            Payment Failed
                        </h1>
                    </>
                )}

                {/* BOOKING DETAILS */}
                {!loading && booking && (
                    <div className="mt-6 text-left bg-gray-50 p-4 rounded-lg space-y-2 text-sm ">
                        <p className="text-[var(--sbg)]"><strong>Order ID:</strong> {booking.orderId}</p>
                        <p className="text-[var(--sbg)]"><strong>Name:</strong> {booking.name}</p>
                        <p className="text-[var(--sbg)]"><strong>Doctor:</strong> {booking.doctor}</p>
                        <p className="text-[var(--sbg)]"><strong>Date:</strong> {booking.date} at {booking.time}</p>
                        <p className="text-[var(--sbg)]"><strong>Amount:</strong> ₹{booking.amount}</p>
                        <p className="text-[var(--sbg)]">
                            <strong>Status:</strong>{" "}
                            {isPaid ? (
                                <span className="text-green-600">Paid</span>
                            ) : (
                                <span className="text-red-500">Not Paid</span>
                            )}
                        </p>
                    </div>
                )}

                {/* ACTIONS */}
                <div className="flex justify-center gap-4 mt-6">
                    {isPaid && booking && (
                        <button
                            onClick={() => window.print()}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            <FileText size={18} /> View / Print Bill
                        </button>
                    )}

                    <button
                        onClick={() => router.push("/")}
                        className="bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <Home size={18} /> Home
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
