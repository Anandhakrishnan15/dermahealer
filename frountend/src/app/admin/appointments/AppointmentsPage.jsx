"use client";

import { useState, useEffect, useMemo, memo } from "react";
import {
    format,
    isToday,
    isYesterday,
    isTomorrow,
    subDays,
    isWithinInterval,
    parseISO,
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useStats } from "@/context/StatsContext";


// ---------------------------------------------------------
// ✅ Optimized Filter Button (memo prevents re-renders)
// ---------------------------------------------------------
const FilterButton = memo(({ label, value, activeFilter, setFilter }) => {
    const active = activeFilter === value;

    return (
        <button
            onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${active
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
        >
            {label}
        </button>
    );
});

FilterButton.displayName = "FilterButton";


// ---------------------------------------------------------
// ✅ Main Component
// ---------------------------------------------------------
export default function AppointmentsPage() {

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paymentFilter, setPaymentFilter] = useState("paid"); 
    const [search, setSearch] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [filter, setFilter] = useState("last7");

    const { setTotalAppointments, setTodayAppointments } = useStats();


    // ---------------------------------------------------------
    // ✅ Fetch bookings (optimized)
    // ---------------------------------------------------------
    const loadBookings = async () => {
        try {

            setLoading(true);

            const res = await fetch("/api/bookings?limit=30");

            if (!res.ok) throw new Error("Failed to fetch");

            const data = await res.json();
            
            if (!data.success) return;

            const mapped = data.bookings.map((b) => ({
                id: b.orderId,
                name: b.name,
                doctor: b.doctor,
                phone: b.phone,
                email: b.email,
                paymentDone: b.paid,
                date: b.date,
            }));

            setAppointments(mapped);

        } catch (error) {

            console.error("Error loading bookings:", error);

        } finally {

            setLoading(false);

        }
    };


    // ---------------------------------------------------------
    // ✅ Load on mount
    // ---------------------------------------------------------
    useEffect(() => {
        loadBookings();
    }, []);


    // ---------------------------------------------------------
    // ✅ Update stats (optimized)
    // ---------------------------------------------------------
    useEffect(() => {

        setTotalAppointments(appointments.length);

        const todayCount = appointments.filter((a) =>
            isToday(parseISO(a.date))
        ).length;

        setTodayAppointments(todayCount);

    }, [appointments, setTotalAppointments, setTodayAppointments]);


    // ---------------------------------------------------------
    // ✅ Optimized filtering using useMemo
    // ---------------------------------------------------------
    const filteredAppointments = useMemo(() => {

        return appointments.filter((appt) => {

            const matchesSearch =
                appt.name.toLowerCase().includes(search.toLowerCase()) ||
                appt.id?.toString()?.includes(search);

            const appointmentDate = parseISO(appt.date);

            let matchesDate = true;

            switch (filter) {

                case "today":
                    matchesDate = isToday(appointmentDate);
                    break;

                case "yesterday":
                    matchesDate = isYesterday(appointmentDate);
                    break;

                case "tomorrow":
                    matchesDate = isTomorrow(appointmentDate);
                    break;

                case "last7":
                    matchesDate = isWithinInterval(appointmentDate, {
                        start: subDays(new Date(), 7),
                        end: new Date(),
                    });
                    break;

                case "custom":
                    matchesDate =
                        selectedDate &&
                        format(appointmentDate, "yyyy-MM-dd") === selectedDate;
                    break;

                case "all":
                default:
                    matchesDate = true;
                    break;
            }
            let matchesPayment = true;
            if (paymentFilter === "paid") matchesPayment = appt.paymentDone;
            if (paymentFilter === "unpaid") matchesPayment = !appt.paymentDone;

            return matchesSearch && matchesDate && matchesPayment;

        });
    }, [appointments, search, filter, selectedDate, paymentFilter]);


    // ---------------------------------------------------------
    // UI
    // ---------------------------------------------------------
    return (

        <div className="p-6">

            <h2 className="text-xl font-bold mb-4">
                Appointments
            </h2>


            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6 items-center">

                <input
                    type="text"
                    placeholder="Search by Name or ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded-lg w-64 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />

                <FilterButton label="Today" value="today" activeFilter={filter} setFilter={setFilter} />

                <FilterButton label="Yesterday" value="yesterday" activeFilter={filter} setFilter={setFilter} />

                <FilterButton label="Tomorrow" value="tomorrow" activeFilter={filter} setFilter={setFilter} />

                <FilterButton label="Last 7 Days" value="last7" activeFilter={filter} setFilter={setFilter} />
                    <FilterButton label="Paid" value="paid" activeFilter={paymentFilter} setFilter={setPaymentFilter} />
                    <FilterButton label="Unpaid" value="unpaid" activeFilter={paymentFilter} setFilter={setPaymentFilter} />
               


                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setFilter("custom");
                    }}
                    className="border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <button
                    onClick={() => {
                        setFilter("all");          // reset date filter
                        setPaymentFilter("all");   // reset payment filter
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
    ${filter === "all" && paymentFilter === "all"
                            ? "bg-blue-500 text-white shadow-md"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    All
                </button>

                <button
                    onClick={loadBookings}
                    className="px-3 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                >
                    Reload
                </button>

            </div>


            {/* Table */}
            <div className="overflow-x-auto rounded-lg shadow">

                <table className="min-w-full text-sm text-left border-collapse">

                    <thead>
                        <tr className="bg-gradient-to-r from-gray-300 to-gray-200 text-[var(--sbg)]">
                            <th className="p-3">Order ID</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">doctor</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Payment</th>
                            <th className="p-3">Date</th>
                        </tr>
                    </thead>


                    <AnimatePresence>

                        <tbody>

                            {/* Loading Skeleton */}
                            {loading &&
                                Array.from({ length: 5 }).map((_, i) => (

                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={6} className="p-3 bg-gray-100 h-6"></td>
                                    </tr>

                                ))
                            }

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

                                        <td className="p-3">
                                            {appt.name}
                                        </td>

                                        <td className="p-3">
                                            {appt.phone}
                                        </td>
                                        <td className="p-3">
                                            {appt.doctor}
                                        </td>

                                        <td className="p-3">
                                            {appt.email}
                                        </td>

                                        <td
                                            className={`p-3 font-semibold ${appt.paymentDone
                                                    ? "text-green-600"
                                                    : "text-red-500"
                                                }`}
                                        >
                                            {appt.paymentDone ? "Paid" : "Unpaid"}
                                        </td>

                                        <td className="p-3">
                                            {format(parseISO(appt.date), "dd/MM/yyyy")}
                                        </td>

                                    </motion.tr>

                                ))
                            }


                            {/* No data */}
                            {!loading && filteredAppointments.length === 0 && (

                                <tr>
                                    <td colSpan={6} className="text-center text-gray-500 p-4">
                                        No appointments found
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
