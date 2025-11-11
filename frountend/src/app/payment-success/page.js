"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, FileText, Home, X, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PaymentSuccess() {
    const router = useRouter();
    const params = useSearchParams();
    const orderId = params.get("orderId");

    const [booking, setBooking] = useState(null);
    const [showBill, setShowBill] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!orderId) return;
        (async () => {
            try {
                const res = await fetch(`/api/bookings/${orderId}`);
                const data = await res.json();
                setBooking(data);
            } catch (err) {
                console.error("Error fetching booking:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, [orderId]);

    const isPaid = booking?.paid === true;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-6 relative overflow-hidden">
            <motion.div
                key="status"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white shadow-2xl rounded-2xl p-8 text-center max-w-md w-full border border-green-100"
            >
                {/* 🌀 Icon and Title */}
                {loading ? (
                    <div className="animate-pulse mb-6">
                        <div className="mx-auto bg-gray-200 rounded-full w-20 h-20 mb-4" />
                        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                    </div>
                ) : isPaid ? (
                    <>
                        <CheckCircle className="w-20 h-20 text-green-500 mb-4 mx-auto animate-bounce" />
                        <h1 className="text-3xl font-semibold text-green-700 mb-2">Payment Successful!</h1>
                        <p className="text-gray-700 mb-6">Your appointment has been confirmed successfully.</p>
                    </>
                ) : (
                    <>
                        <XCircle className="w-20 h-20 text-red-500 mb-4 mx-auto animate-pulse" />
                        <h1 className="text-3xl font-semibold text-red-700 mb-2">Payment Not Completed</h1>
                        <p className="text-gray-700 mb-6">Your booking is not confirmed.</p>
                    </>
                )}

                {/* Booking Details */}
                <div className="text-left space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    {loading ? (
                        <div className="animate-pulse space-y-2">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="h-4 bg-gray-200 rounded w-3/4"></div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <p><strong>Order ID:</strong> {booking.orderId}</p>
                            <p><strong>Name:</strong> {booking.name}</p>
                            <p><strong>Doctor:</strong> {booking.doctor}</p>
                            <p><strong>Date:</strong> {booking.date} at {booking.time}</p>
                            <p><strong>Amount:</strong> ₹{booking.amount}</p>
                            <p>
                                <strong>Status:</strong>{" "}
                                {isPaid ? (
                                    <span className="text-green-600 font-semibold">✅ Paid</span>
                                ) : (
                                    <span className="text-red-500 font-semibold">❌ Not Paid</span>
                                )}
                            </p>
                            <p>
                                <strong>Booking:</strong>{" "}
                                {isPaid ? (
                                    <span className="text-green-600">Confirmed</span>
                                ) : (
                                    <span className="text-red-500">Not Confirmed</span>
                                )}
                            </p>
                        </>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8 justify-center">
                    {loading ? (
                        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
                    ) : isPaid ? (
                        <button
                            onClick={() => setShowBill(true)}
                            className="px-5 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700"
                        >
                            <FileText size={18} />
                            View Bill
                        </button>
                    ) : (
                        <button
                            onClick={() => router.push("/book-appointment")}
                            className="px-5 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600"
                        >
                            Retry Payment
                        </button>
                    )}

                    <button
                        onClick={() => router.push("/")}
                        className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-300"
                    >
                        <Home size={18} />
                        Home
                    </button>
                </div>
            </motion.div>

            {/* 🧾 Bill Popup */}
            <AnimatePresence>
                {showBill && isPaid && (
                    <motion.div
                        key="bill"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm"
                    >
                        <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full relative">
                            <button
                                onClick={() => setShowBill(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            >
                                <X size={20} />
                            </button>

                            <h1 className="text-2xl font-semibold text-green-600 mb-4 text-center">
                                Payment Receipt
                            </h1>

                            <div className="space-y-2 text-gray-700 text-sm">
                                <p><strong>Name:</strong> {booking.name}</p>
                                <p><strong>Doctor:</strong> {booking.doctor}</p>
                                <p><strong>Date:</strong> {booking.date} at {booking.time}</p>
                                <p><strong>Order ID:</strong> {booking.orderId}</p>
                                <p><strong>Txn ID:</strong> {booking.paymentInfo?.txnId}</p>
                                <p><strong>Bank:</strong> {booking.paymentInfo?.bankName}</p>
                                <p><strong>Payment Mode:</strong> {booking.paymentInfo?.paymentMode}</p>
                                <p><strong>Amount:</strong> ₹{booking.paymentInfo?.txnAmount}</p>
                                <p><strong>Txn Date:</strong> {booking.paymentInfo?.txnDate}</p>
                            </div>

                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => window.print()}
                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                                >
                                    Download / Print Bill
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
