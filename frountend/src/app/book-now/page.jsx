"use client";
import { useState } from "react";

export default function BookPage() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        note: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/book", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const data = await res.json();
        alert(data.msg || data.error);
        if (res.ok) {
            setForm({ name: "", phone: "", email: "", date: "", time: "", note: "" });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
            >
                <h1 className="text-2xl font-bold text-center text-blue-600">Book Appointment</h1>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full border p-2 rounded"
                    required
                />

                <textarea
                    placeholder="Additional Notes"
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Book Now
                </button>
            </form>
        </div>
    );
}
