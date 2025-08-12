"use client";

import { useState } from "react";
import { format, isToday, isYesterday, subDays, isWithinInterval, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

// Fixed appointment data instead of generating random
const storedAppointments = [
    {
        id: 1,
        name: "John Doe",
        age: 28,
        phone: "+91 9876543201",
        address: "City 1",
        email: "john1@mail.com",
        paymentDone: true,
        date: subDays(new Date(), 0).toISOString(), // today
    },
    {
        id: 2,
        name: "Jane Smith",
        age: 32,
        phone: "+91 9876543202",
        address: "City 2",
        email: "jane2@mail.com",
        paymentDone: false,
        date: subDays(new Date(), 1).toISOString(), // yesterday
    },
    {
        id: 3,
        name: "Sam Wilson",
        age: 40,
        phone: "+91 9876543203",
        address: "City 3",
        email: "sam3@mail.com",
        paymentDone: true,
        date: subDays(new Date(), 5).toISOString(),
    },
];

export default function AppointmentsPage() {
    const [appointments] = useState(storedAppointments);
    const [search, setSearch] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [filter, setFilter] = useState("last7");

    const filteredAppointments = appointments.filter((appt) => {
        const matchesSearch =
            appt.name.toLowerCase().includes(search.toLowerCase()) ||
            appt.id.toString().includes(search);

        const appointmentDate = parseISO(appt.date);
        let matchesDate = true;

        if (filter === "today") {
            matchesDate = isToday(appointmentDate);
        } else if (filter === "yesterday") {
            matchesDate = isYesterday(appointmentDate);
        } else if (filter === "last7") {
            matchesDate = isWithinInterval(appointmentDate, {
                start: subDays(new Date(), 7),
                end: new Date(),
            });
        } else if (filter === "custom" && selectedDate) {
            matchesDate =
                format(appointmentDate, "yyyy-MM-dd") ===
                format(new Date(selectedDate), "yyyy-MM-dd");
        }

        return matchesSearch && matchesDate;
    });

    const FilterButton = ({ label, value }) => (
        <button
            onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${filter === value
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
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
                            <th className="p-3">ID</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Age</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Address</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Payment Done</th>
                            <th className="p-3">Date</th>
                        </tr>
                    </thead>
                    <AnimatePresence>
                        <tbody>
                            {filteredAppointments.map((appt) => (
                                <motion.tr
                                    key={appt.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="odd:bg-[var(--bg)] even:bg-[var(--form-bg)] hover:bg-[var(--link-hover)] transition-colors"

                                >
                                    <td className="p-3 font-medium text-gray-700">{appt.id}</td>
                                    <td className="p-3">{appt.name}</td>
                                    <td className="p-3">{appt.age}</td>
                                    <td className="p-3">{appt.phone}</td>
                                    <td className="p-3">{appt.address}</td>
                                    <td className="p-3">{appt.email}</td>
                                    <td
                                        className={`p-3 font-semibold ${appt.paymentDone ? "text-green-600" : "text-red-500"}`}
                                    >
                                        {appt.paymentDone ? "Yes" : "No"}
                                    </td>
                                    <td className="p-3">{format(parseISO(appt.date), "dd/MM/yyyy")}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </AnimatePresence>
                </table>
            </div>
        </div>
    );
}
