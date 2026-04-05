"use client";

import { useState } from "react";

const initialForm = {
    fullName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    dob: "",  
    treatment: "",
    address: "",
    notes: "",
};

export default function AddForm() {
    const [form, setForm] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setSubmitted(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const token = localStorage.getItem("token");

            const res = await fetch("/api/add-patient", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // 🔐 IMPORTANT
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to save data");
            }

            // ✅ Success
            setSubmitted(true);
            setForm(initialForm);

        } catch (error) {
            console.error("Submit Error:", error);
            alert(error.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setForm(initialForm);
        setSubmitted(false);
    };

    const inputClassName =
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

    return (
        <div className="mx-auto w-full max-w-5xl p-6 md:p-10">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                <div className="bg-gradient-to-r from-blue-700 via-cyan-600 to-teal-500 px-6 py-8 text-white md:px-10">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">
                        Admin Panel
                    </p>
                    <h1 className="mt-2 text-3xl font-bold md:text-4xl">Add Patient Details</h1>
                    <p className="mt-3 max-w-2xl text-sm text-blue-50 md:text-base">
                        Fill in the patient information below and submit when everything looks correct.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-10">
                    <div className="grid gap-5 md:grid-cols-2">

                        {/* Full Name */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Full Name
                            </label>
                            <input
                                name="fullName"
                                type="text"
                                value={form.fullName}
                                onChange={handleChange}
                                placeholder="Enter patient name"
                                className={inputClassName}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Email Address
                            </label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter email address"
                                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                className={inputClassName}
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Phone Number
                            </label>
                            <input
                                name="phone"
                                type="tel"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="10-digit phone"
                                pattern="[6-9]{1}[0-9]{9}"
                                maxLength="10"
                                inputMode="numeric"
                                className={inputClassName}
                                required
                            />
                        </div>

                        {/* Age */}
                       

                        {/* Gender + DOB (aligned & smaller) */}
                        <div className="md:col-span-2 flex flex-col md:flex-row gap-4">

                            {/* Age */}
                            <div className="flex-1">
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Age
                                </label>
                                <input
                                    name="age"
                                    type="number"
                                    min="0"
                                    max="120"
                                    value={form.age}
                                    onChange={handleChange}
                                    placeholder="Age"
                                    className={inputClassName}
                                    required
                                />
                            </div>

                            {/* Gender */}
                            <div className="flex-1">
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Gender
                                </label>
                                <select
                                    name="gender"
                                    value={form.gender}
                                    onChange={handleChange}
                                    className={`${inputClassName} py-2`}
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* DOB */}
                            <div className="flex-1">
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Date of Birth
                                </label>
                                <input
                                    name="dob"
                                    type="date"
                                    value={form.dob}
                                    onChange={handleChange}
                                    className={`${inputClassName} py-2`}
                                    required
                                />
                            </div>

                        </div>

                        {/* Treatment */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Treatment / Concern
                            </label>
                            <input
                                name="treatment"
                                type="text"
                                value={form.treatment}
                                onChange={handleChange}
                                placeholder="Example: Acne treatment"
                                className={inputClassName}
                                required
                            />
                        </div>

                        {/* Address */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Address
                            </label>
                            <input
                                name="address"
                                type="text"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="Enter address"
                                className={inputClassName}
                            />
                        </div>

                        {/* Notes */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Notes
                            </label>
                            <textarea
                                name="notes"
                                value={form.notes}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Add extra details here"
                                className={`${inputClassName} resize-none`}
                            />
                        </div>

                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-95 disabled:opacity-50"
                        >
                            {isLoading ? "Saving..." : "Save Patient"}
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Reset Form
                        </button>
                    </div>

                    {submitted && (
                        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                            Patient details are ready. Connect this form to your API when you want to save the data permanently.
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
