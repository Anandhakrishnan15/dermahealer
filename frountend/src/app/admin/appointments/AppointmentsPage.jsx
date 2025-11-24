"use client";

import { useState, useEffect } from "react";
import {
    format,
    isToday,
    isYesterday,
    subDays,
    isWithinInterval,
    parseISO,
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [filter, setFilter] = useState("last7");

    // ---------------------------------------------------------
    // 🔥 Fetch REAL DATA from your Bookings API
    // ---------------------------------------------------------
    useEffect(() => {
        const loadBookings = async () => {
            try {
                const res = await fetch("/api/bookings");
                const data = await res.json();

                if (!data.success) return;

                // FIXED: correct mapping
                const mapped = data.bookings.map((b) => ({
                    id: b.orderId,
                    name: b.name,
                    // age: b.age || "---",
                    phone: b.phone,
                    // address: b.address || "---",
                    email: b.email,
                    paymentDone: b.paid,
                    date: b.date, // must be an ISO date in DB
                }));

                setAppointments(mapped);
            } catch (err) {
                console.log("Error loading bookings:", err);
            } finally {
                setLoading(false);
            }
        };

        loadBookings();
    }, []);

    // ---------------------------------------------------------
    // 🔎 Search + Filter Logic
    // ---------------------------------------------------------
    const filteredAppointments = appointments.filter((appt) => {
        const matchesSearch =
            appt.name.toLowerCase().includes(search.toLowerCase()) ||
            appt.id?.toString()?.includes(search);

        const appointmentDate = parseISO(appt.date);
        let matchesDate = true;

        if (filter === "today") matchesDate = isToday(appointmentDate);
        else if (filter === "yesterday") matchesDate = isYesterday(appointmentDate);
        else if (filter === "last7") {
            matchesDate = isWithinInterval(appointmentDate, {
                start: subDays(new Date(), 7),
                end: new Date(),
            });
        } else if (filter === "custom" && selectedDate) {
            matchesDate = format(appointmentDate, "yyyy-MM-dd") === selectedDate;
        }

        return matchesSearch && matchesDate;
    });

    const FilterButton = ({ label, value }) => (
        <button
            onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${filter === value
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
        >
            {label}
        </button>
    );

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Appointments</h2>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6 items-center">
                <input
                    type="text"
                    placeholder="Search by Name or ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded-lg w-64 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />

                <FilterButton label="Today" value="today" />
                <FilterButton label="Yesterday" value="yesterday" />
                <FilterButton label="Last 7 Days" value="last7" />
                <FilterButton label="All" value="all" />

                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setFilter("custom");
                    }}
                    className="border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="bg-gradient-to-r from-gray-300 to-gray-200 text-[var(--sbg)]">
                            <th className="p-3">Order ID</th>
                            <th className="p-3">Name</th>
                            {/* <th className="p-3">Age</th> */}
                            <th className="p-3">Phone</th>
                            {/* <th className="p-3">Address</th> */}
                            <th className="p-3">Email</th>
                            <th className="p-3">Payment Done</th>
                            <th className="p-3">Date</th>
                        </tr>
                    </thead>

                    <AnimatePresence>
                        <tbody>
                            {/* Loading Skeleton */}
                            {loading &&
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="p-3 bg-gray-100 h-4" colSpan={8}></td>
                                    </tr>
                                ))}

                            {/* Data */}
                            {!loading &&
                                filteredAppointments.map((appt) => (
                                    <motion.tr
                                        key={appt.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="odd:bg-[var(--bg)] even:bg-[var(--form-bg)] hover:bg-[var(--link-hover)] transition-colors"
                                    >
                                        <td className="p-3 font-medium text-gray-700">
                                            {appt.id}
                                        </td>
                                        <td className="p-3">{appt.name}</td>
                                        {/* <td className="p-3">{appt.age}</td> */}
                                        <td className="p-3">{appt.phone}</td>
                                        {/* <td className="p-3">{appt.address}</td> */}
                                        <td className="p-3">{appt.email}</td>
                                        <td
                                            className={`p-3 font-semibold ${appt.paymentDone ? "text-green-600" : "text-red-500"
                                                }`}
                                        >
                                            {appt.paymentDone ? "Yes" : "No"}
                                        </td>
                                        <td className="p-3">
                                            {format(parseISO(appt.date), "dd/MM/yyyy")}
                                        </td>
                                    </motion.tr>
                                ))}

                            {/* No Data */}
                            {!loading && filteredAppointments.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="text-center text-gray-500 p-4"
                                    >
                                        No appointments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </AnimatePresence>
                </table>
            </div>
        </div>
    );
}

