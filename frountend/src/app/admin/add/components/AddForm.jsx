"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { z } from "zod";


// ==========================
// ✅ ZOD SCHEMA
// ==========================
const patientSchema = z.object({
    fullName: z.string().min(2, "Name is too short").max(50),
    email: z.string().email("Invalid email"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
    age: z.coerce
        .number({
            invalid_type_error: "Enter age",
        })
        .min(1, "Enter a valid age")
        .max(120, "Age looks too high"),

    gender: z
        .string()
        .refine((val) => ["male", "female"].includes(val), {
            message: "Select a gender",
        }),
    dob: z.string().min(1, "Date of birth reqd"),
    treatment: z.string().min(2, "Enter treatment"),
    address: z.string().optional(),
    notes: z.string().max(300).optional(),
});
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
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        document.body.style.overflow = submitted ? "hidden" : "auto";
    }, [submitted]);

    // ==========================
    // 🔒 HANDLE CHANGE
    // ==========================
    const handleChange = (e) => {
        const { name, value } = e.target;

        let cleanValue = value.replace(/[<>]/g, "");

        // 📱 phone only numbers
        if (name === "phone") {
            cleanValue = cleanValue.replace(/\D/g, "").slice(0, 10);
        }

        setForm((prev) => ({ ...prev, [name]: cleanValue }));

        // ✅ clear error on typing
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

        // ==========================
    // ✅ VALIDATION
    // ==========================
        const validateForm = () => {
            const result = patientSchema.safeParse(form);

            if (!result.success) {
                const fieldErrors = {};

                const firstError = result.error.issues[0]; // ✅ FIX

                if (firstError) {
                    toast.error("check the form");

                    const field = firstError.path[0];
                    document.querySelector(`[name="${field}"]`)?.focus();
                }

                result.error.issues.forEach((err) => {
                    fieldErrors[err.path[0]] = err.message;
                });

                setErrors(fieldErrors);
                return false;
            }

            setErrors({});
            return true;
        };

    // ==========================
    // 🔁 RESET
    // ==========================
    const handleReset = () => {
        if (!confirm("Are you sure you want to reset?")) return;

        setForm(initialForm);
        setErrors({});
        setSubmitted(false);
    };

    // ==========================
    // 🚀 SUBMIT
    // ==========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return; // ❌ removed double toast

        setIsLoading(true);

        try {
            const token = localStorage.getItem("token");

            const res = await fetch("/api/add-patient", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to save");
            }

            toast.success("Patient added successfully ✅");

            setSubmitted(true);
            setForm(initialForm);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // ==========================
    // 🎨 STYLES
    // ==========================
    // const inputClass =
    //     "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 shadow-sm";

    const errorText = "text-red-500 text-xs mt-1 animate-shake";
    const inputClass = (field) =>
        `w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all shadow-sm
    ${errors[field]
            ? "border-red-500 bg-red-50 focus:ring-red-200 animate-shake"
            : "border-slate-200 bg-slate-50 text-slate-800 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
        }`;

    return (
        <>
            <div className="max-w-5xl mx-auto p-6 md:p-10">
                <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100">

                    {/* HEADER */}
                    <div className="bg-linear-to-r from-blue-600 via-cyan-500 to-teal-500 p-8 text-white">
                        <h1 className="text-3xl font-bold">Add Patient</h1>
                        <p className="text-sm opacity-90 mt-1">
                            Enter patient details securely
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">

                        {/* FULL NAME */}
                        <div>
                            <label className="text-sm font-semibold text-slate-700 mb-1 block">
                                Full Name
                            </label>
                            <input
                                name="fullName"
                                value={form.fullName}
                                disabled={isLoading}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className={inputClass("fullName")}
                            />
                            {errors.fullName && <p className={errorText}>{errors.fullName}</p>}
                        </div>

                        {/* EMAIL + PHONE */}
                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label className="text-sm font-semibold text-slate-700 mb-1 block">
                                    Email
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    disabled={isLoading}
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com"
                                    className={inputClass("email")}
                                />
                                {errors.email && <p className={errorText}>{errors.email}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700 mb-1 block">
                                    Phone
                                </label>
                                <input
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    className={inputClass("phone")}
                                    disabled={isLoading}
                                />
                                {errors.phone && <p className={errorText}>{errors.phone}</p>}
                            </div>
                        </div>

                        {/* AGE + GENDER + DOB */}
                        <div className="grid md:grid-cols-3 gap-5">
                            <div>
                                <label className="text-sm font-semibold text-slate-700 mb-1 block">
                                    Age
                                </label>
                                <input
                                    name="age"
                                    type="number"
                                    value={form.age}
                                    disabled={isLoading}
                                    placeholder="Age"
                                    onChange={handleChange}
                                    className={inputClass("age")}
                                />
                                {errors.age && <p className={errorText}>{errors.age}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700 mb-1 block">
                                    Gender
                                </label>
                                <select
                                    name="gender"
                                    disabled={isLoading}
                                    value={form.gender}
                                    onChange={handleChange}
                                    className={inputClass("gender")}
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                {errors.gender && <p className={errorText}>{errors.gender}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700 mb-1 block">
                                    Date of Birth
                                </label>
                                <input
                                    name="dob"
                                    type="date"
                                    disabled={isLoading}
                                    value={form.dob}
                                    onChange={handleChange}
                                    className={inputClass("dob")}
                                />
                                {errors.dob && <p className={errorText}>{errors.dob}</p>}
                            </div>
                        </div>

                        {/* TREATMENT + ADDRESS */}
                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label className="text-sm font-semibold text-slate-700 mb-1 block">
                                    Treatment
                                </label>
                                <input
                                    name="treatment"
                                    value={form.treatment}
                                    disabled={isLoading}
                                    onChange={handleChange}
                                    placeholder="Laser Therapy"
                                    className={inputClass("treatment")}
                                />
                                {errors.treatment && <p className={errorText}>{errors.treatment}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700 mb-1 block">
                                    Address
                                </label>
                                <input
                                    name="address"
                                    disabled={isLoading}
                                    value={form.address}
                                    onChange={handleChange}
                                    placeholder="City, Area"
                                    className={inputClass("address")}
                                />
                                {errors.address && <p className={errorText}>{errors.address}</p>}
                            </div>
                        </div>

                        {/* NOTES */}
                        <div>
                            <label className="text-sm font-semibold text-slate-700 mb-1 block">
                                Notes
                            </label>
                            <textarea
                                name="notes"
                                value={form.notes}
                                onChange={handleChange}
                                disabled={isLoading}
                                placeholder="Additional details about patient..."
                                className={`${inputClass("notes")} min-h-30 resize-none`}
                            />
                            {errors.notes && <p className={errorText}>{errors.notes}</p>}
                        </div>

                        <div className="flex gap-4 pt-4">

                            {/* RESET BUTTON */}
                            <button
                                type="button"
                                onClick={handleReset}
                                disabled={isLoading}
                                className="flex-1 border border-slate-300 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-100 transition disabled:opacity-50"
                            >
                                Reset
                            </button>

                            {/* SUBMIT BUTTON */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 bg-linear-to-r from-blue-600 to-teal-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.01] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Saving...
                                    </>
                                ) : (
                                    "Save Patient"
                                )}
                            </button>

                        </div>
                    </form>

                    {/* SUCCESS MODAL */}
                    {submitted && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                            <div className="bg-white p-6 rounded-2xl text-center shadow-xl w-[90%] max-w-sm">

                                <h2 className="text-xl font-bold text-green-600">
                                    ✅ Patient Saved
                                </h2>

                                <p className="text-sm text-slate-500 mt-2">
                                    Data stored successfully
                                </p>

                                <div className="flex gap-3 mt-5">
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="flex-1 border py-2 rounded-lg"
                                    >
                                        Add More
                                    </button>

                                    <button
                                        onClick={() => router.push("/admin/add/follow-up")}
                                        className="flex-1 bg-green-600 text-white py-2 rounded-lg"
                                    >
                                        Follow-up
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}