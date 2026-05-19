"use client";

import { useState } from "react";

export default function FollowUpForm({ patient, setShowModal }) {
    const [form, setForm] = useState({
        name: patient?.fullName || "",
        email: patient?.email,
        phone: patient?.phone || "",
        treatment: patient?.treatment || "Consulting",
        date: "",
        doctor: "",
        time: "",

        // ✅ PAYMENT OBJECT
        payment: {
            isPaid: false,
            amount: "",
            method: "",
            transactionId: "",
        },
    });

    const [loading, setLoading] = useState(false);
    const times = ["08:30-09:30", "10:30-11:30", "11:30-12:30", "12:30-01:30"];

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handlePaymentChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            payment: {
                ...prev.payment,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const res = await fetch("/api/add-patient/follow-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...form,
                    payment: {
                        ...form.payment,
                        amount: Number(form.payment.amount) || 0,
                        paidAt: form.payment.isPaid ? new Date() : null,
                    },
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed");
            }

            // ✅ SUCCESS
            alert("✅ Follow-up added successfully!");

            setShowModal(false); // 🔥 CLOSE ONLY HERE

        } catch (err) {
            alert("❌ " + err.message);
        } finally {
            setLoading(false); // only stop loading
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <h2 className="text-xl font-semibold mb-2">
                Add Follow-up
            </h2>

            {/* Name */}
            {/* Name (Disabled Styled) */}
            <input
                type="text"
                name="name"
                value={form.name}
                placeholder="Patient Name"
                disabled
                className="w-full px-4 py-3 rounded-xl border 
               bg-gray-100 text-gray-700 font-medium
               cursor-not-allowed 
               border-gray-200 
               focus:outline-none"
            />

            {/* Email */}
            <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                disabled
                className="w-full px-4 py-3 rounded-xl border 
               bg-gray-100 text-gray-700 font-medium
               cursor-not-allowed 
               border-gray-200 
               focus:outline-none"
            />

            {/* Phone (Disabled Styled) */}
            <input
                type="tel"
                name="phone"
                value={form.phone}
                placeholder="Phone Number"
                disabled
                className="w-full px-4 py-3 rounded-xl border 
               bg-gray-100 text-gray-700 font-medium
               cursor-not-allowed 
               border-gray-200 
               focus:outline-none"
            />
            {/* Treatment */}
            <input
                type="text"
                name="treatment"
                value={form.treatment}
                onChange={handleChange}
                placeholder="Treatment"
                className="w-full px-4 py-3 rounded-xl border
    border-gray-300
    focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex flex-wrap gap-3">

                {/* Date */}
                <div className="flex flex-col">
                    <label className="text-sm text-gray-500 mb-1">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="border rounded-lg px-3 py-2 w-40"
                        required
                    />
                </div>

                {/* Time */}
                <div className="flex flex-col">
                    <label className="text-sm text-gray-500 mb-1">Time</label>

                    <select
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className="border rounded-lg px-3 py-2 w-37.5 bg-white"
                        required
                    >
                        <option value="">Select time</option>

                        {times.map((slot, index) => (
                            <option key={index} value={slot}>
                                {slot}
                            </option>
                        ))}
                    </select>
                </div>

            </div>

            {/* Doctor Select */}
            <select
                name="doctor"
                value={form.doctor}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
            >
                <option value="">Select Doctor</option>
                <option value="Dr. B.K. Sharma">Dr. B.K. Sharma</option>
                <option value="Dr. Neha Rani">Dr. Neha Rani</option>
            </select>

            {/* PAYMENT sTATUS */}
            {/* 💰 PAYMENT SECTION */}
            <div className="border rounded-xl p-4 space-y-3 bg-gray-50">

                <h3 className="font-semibold text-gray-700">Payment Details</h3>

                {/* Payment Status */}
                <select
                    name="isPaid"
                    value={form.payment.isPaid ? "paid" : "unpaid"}
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            payment: {
                                ...prev.payment,
                                isPaid: e.target.value === "paid",
                            },
                        }))
                    }
                    className="w-full border rounded-lg px-3 py-2"
                >
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                </select>

                {/* Amount */}
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={form.payment.amount}
                    onChange={handlePaymentChange}
                    className="w-full border rounded-lg px-3 py-2"
                />

                {/* Payment Method */}
                <select
                    name="method"
                    value={form.payment.method}
                    onChange={handlePaymentChange}
                    className="w-full border rounded-lg px-3 py-2"
                >
                    <option value="">Select Payment Method</option>
                    <option value="cash">Cash</option>
                    <option value="upi">UPI</option>
                    <option value="card">Card</option>
                    <option value="online">Online</option>
                </select>

                {/* Transaction ID */}
                {form.payment.method !== "cash" && form.payment.isPaid && (
                    <input
                        type="text"
                        name="transactionId"
                        placeholder="Transaction ID"
                        value={form.payment.transactionId}
                        onChange={handlePaymentChange}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                )}
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
                {loading ? "Saving..." : "Submit Follow-up"}
            </button>

        </form>
    );
}