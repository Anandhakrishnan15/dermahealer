"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function HolidayAdminPage() {
    const [date, setDate] = useState("");
    const [reason, setReason] = useState("");
    const [type, setType] = useState("common");
    const [doctor, setDoctor] = useState("");
    const [holidays, setHolidays] = useState({
        all: [],
        common: [],
        dr_hena: [],
        dr_sharma: []
    });

    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);

    const { isLoggedIn, staff, loading: authLoading } = useAuth();
    const router = useRouter();

    // AUTH CHECK
    useEffect(() => {
        if (authLoading) return;
        if (!isLoggedIn || staff) {
            toast.warning("Not authorized");
            router.replace("/admin");
            return;
        }
        setChecked(true);
    }, [authLoading, isLoggedIn, staff, router]);

    // LOAD LIST
    const loadHolidays = async () => {
        try {
            const res = await fetch("/api/holidays/list");
            const data = await res.json();
            setHolidays(data || { all: [], common: [], dr_hena: [], dr_sharma: [] });
        } catch (err) {
            toast.error("Failed to load holidays");
        }
    };

    useEffect(() => {
        if (checked) loadHolidays();
    }, [checked]);

    // ADD HOLIDAY
    const addHoliday = async (e) => {
        e.preventDefault();
        if (!date) return toast.error("Select a date");

        setLoading(true);

        const res = await fetch("/api/holidays/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ date, reason, type, doctor }),
        });

        const data = await res.json();
        setLoading(false);

        if (data.error) return toast.error(data.error);

        toast.success("Holiday added!");
        setDate("");
        setReason("");
        setType("common");
        setDoctor("");

        loadHolidays();
    };

    // DELETE HOLIDAY
    const deleteHoliday = async (h) => {
        if (!confirm("Delete this holiday?")) return;

        try {
            const res = await fetch("/api/holidays/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    date: h.date,
                    type: h.type,
                    doctor: h.doctor ?? ""
                }),
            });

            const data = await res.json();
            if (data.error) return toast.error(data.error);

            toast.success("Holiday deleted");
            loadHolidays();
        } catch (err) {
            toast.error("Error deleting");
        }
    };

    if (!checked) return null;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Holiday Manager
                </h1>
                <p className="text-gray-600 mt-2 text-lg">Add and manage clinic & doctor holidays.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* FORM */}
                <form onSubmit={addHoliday} className="p-8 rounded-2xl border bg-white shadow-xl">
                    <h2 className="text-2xl font-semibold mb-6 text-blue-700">Add New Holiday</h2>

                    <div className="flex flex-col gap-5">
                        <div>
                            <label className="font-medium text-gray-700">Select Date *</label>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-3 rounded-xl w-full" required />
                        </div>

                        <div>
                            <label className="font-medium text-gray-700">Holiday Type</label>
                            <select value={type} onChange={(e) => setType(e.target.value)} className="border p-3 rounded-xl w-full">
                                <option value="common">Common Holiday</option>
                                <option value="doctor">Doctor Holiday</option>
                            </select>
                        </div>

                        {type === "doctor" && (
                            <div>
                                <label className="font-medium text-gray-700">Select Doctor</label>
                                <select value={doctor} onChange={(e) => setDoctor(e.target.value)} className="border p-3 rounded-xl w-full">
                                    <option value="">Select Doctor</option>
                                    <option value="Dr. Neha Rani">Dr. Neha Rani</option>
                                    <option value="Dr. B.K. Sharma">Dr. B.K. Sharma</option>

                                </select>
                            </div>
                        )}

                        <div>
                            <label className="font-medium text-gray-700">Reason (optional)</label>
                            <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Eg: Festival, Leave" className="border p-3 rounded-xl w-full" />
                        </div>

                        <button type="submit" disabled={loading} className="mt-4 w-full py-3 rounded-xl text-white bg-blue-600 hover:bg-blue-700">
                            {loading ? "Adding..." : "Add Holiday"}
                        </button>
                    </div>
                </form>

                {/* LISTS */}
                <div className="space-y-6">
                    <HolidayList title="Common Holidays" items={holidays.common} onDelete={deleteHoliday} />
                    <HolidayList title="Dr. Neha Rani - Holidays" items={holidays.dr_hena} onDelete={deleteHoliday} />
                    <HolidayList title="Dr. B.K. Sharma - Holidays" items={holidays.dr_sharma} onDelete={deleteHoliday} />
                </div>
            </div>
        </div>
    );
}

function HolidayList({ title, items = [], onDelete }) {
    return (
        <div className="p-6 rounded-2xl border bg-white shadow-md">
            <h3 className="text-xl font-bold mb-4 text-slate-700">{title}</h3>

            {items.length === 0 ? (
                <p className="text-gray-500">No holidays added.</p>
            ) : (
                <ul className="space-y-3">
                    {items.map((h) => (
                        <li key={h._id} className="flex justify-between items-center p-4 rounded-xl border bg-gray-50">
                            <div>
                                <p className="font-semibold">{h.date}</p>
                                {h.type === "doctor" && (
                                    <p className="text-sm text-blue-600">{h.doctor}</p>
                                )}
                                {h.reason && <p className="text-sm text-gray-600">{h.reason}</p>}
                            </div>

                            <button onClick={() => onDelete(h)} className="px-3 py-2 rounded-lg bg-red-600 text-white">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
