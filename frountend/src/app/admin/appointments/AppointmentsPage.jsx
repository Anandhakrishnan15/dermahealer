"use client";

import { useState, useEffect, useMemo, memo } from "react";
import {
    format,
    isToday,
    isYesterday,
    isTomorrow,
    subDays,
    isWithinInterval,
    parseISO, parse
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useStats } from "@/context/StatsContext";
import { toast } from "react-toastify";
import jsPDF from "jspdf";


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
    const [loadingId, setLoadingId] = useState(null);
    const [actionType, setActionType] = useState(null);
    const [doctorFilter, setDoctorFilter] = useState("all");

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
                visited: b.visited ?? false,
                date: b.date,
                time: b.time,
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

            // ✅ NEW: doctor filter
            let matchesDoctor = true;
            if (doctorFilter !== "all") {
                matchesDoctor = appt.doctor === doctorFilter;
            }

            return matchesSearch && matchesDate && matchesPayment && matchesDoctor;

        });
    }, [appointments, search, filter, selectedDate, paymentFilter, doctorFilter]);

    const verifyPayment = async (orderId) => {
        try {
            setLoadingId(orderId);
            setActionType("verify");

            const res = await fetch("/api/paytm/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId }),
            });

            const data = await res.json();

            if (data.success) {
                // ✅ Update ONLY this row
                setAppointments((prev) =>
                    prev.map((appt) =>
                        appt.id === orderId
                            ? { ...appt, paymentDone: true }
                            : appt
                    )
                );

                toast.success("Payment verified ✅");
            } else {
                toast.error(data.message || "Verification failed");
            }

        } catch (err) {
            console.error(err);
            toast.error("Error verifying payment");
        } finally {
            setLoadingId(null);
            setActionType(null);
        }
    };
    const markVisited = async (orderId) => {
        try {
            setLoadingId(orderId);
            setActionType("visited");

            const res = await fetch("/api/bookings/mark-visited", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId }),
            });

            const data = await res.json();

            if (data.success) {
                // ✅ Update ONLY this row
                setAppointments((prev) =>
                    prev.map((appt) =>
                        appt.id === orderId
                            ? { ...appt, visited: true }
                            : appt
                    )
                );

                toast.success("Marked as visited 🎉");
            } else {
                toast.error(data.message || "Failed");
            }

        } catch (err) {
            console.error(err);
            toast.error("Error marking visited");
        } finally {
            setLoadingId(null);
            setActionType(null);
        }
    };
    const downloadTodayPDF = () => {
        const doc = new jsPDF();

        const todayAppointments = appointments.filter(
            (appt) => isToday(parseISO(appt.date)) && appt.paymentDone
        );

        let y = 20;

        // 🟥🟩 HEADER (DermaHealers centered with colors)
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");

        const text1 = "Derma";
        const text2 = "Healer";

        const pageWidth = doc.internal.pageSize.getWidth();
        const text1Width = doc.getTextWidth(text1);
        const text2Width = doc.getTextWidth(text2);

        const totalWidth = text1Width + text2Width;
        let startX = (pageWidth - totalWidth) / 2;

        // Derma (Red)
        doc.setTextColor(220, 0, 0);
        doc.text(text1, startX, y);

        // Healers (Green)
        doc.setTextColor(0, 150, 0);
        doc.text(text2, startX + text1Width, y);

        // Reset font + color
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);

        // 📄 REPORT TITLE
        y += 10;
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Today’s appointment", 105, y, { align: "center" });

        // Reset
        doc.setFont("helvetica", "normal");

        // 📅 Date + Time
        y += 8;
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const now = new Date();
        doc.text(`Date: ${format(now, "dd MMM yyyy")}`, 20, y);
        doc.text(`Time: ${format(now, "hh:mm a")}`, 150, y);

        // Divider
        y += 6;
        doc.setDrawColor(0);
        doc.line(20, y, 190, y);

        y += 8;

        // 🧾 TABLE HEADER (bold only here)
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);

        doc.text("No", 20, y);
        doc.text("Name", 30, y);
        doc.text("Phone", 80, y);
        doc.text("Doctor", 120, y);
        doc.text("Time", 160, y);

        y += 6;
        doc.line(20, y, 190, y);
        y += 6;

        // 🔽 TABLE DATA (normal text)
        doc.setFont("helvetica", "normal");
        doc.setTextColor(40, 40, 40);

        if (todayAppointments.length === 0) {
            doc.text("No paid patients today.", 20, y);
        } else {
            todayAppointments.forEach((appt, index) => {
                if (y > 270) {
                    doc.addPage();
                    y = 20;
                }

                doc.text(String(index + 1), 20, y);
                doc.text(appt.name || "-", 30, y);
                doc.text(appt.phone || "-", 80, y);
                doc.text(appt.doctor || "-", 120, y);
                doc.text(appt.time || "-", 160, y);

                y += 8;
            });
        }

        // 👥 TOTAL PATIENT COUNT
        y += 10;
        doc.setDrawColor(0);
        doc.line(20, y, 190, y);

        y += 10;

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);

        doc.text(`Total Patients: ${todayAppointments.length}`, 20, y);

        // Reset
        doc.setFont("helvetica", "normal");

        // 📌 FOOTER
        y += 20;
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);

        doc.text(
            "Thank you for choosing Derma Healers",
            105,
            y,
            { align: "center" }
        );

        y += 6;
        doc.text(
            "This is a system-generated report",
            105,
            y,
            { align: "center" }
        );

        // 📄 File name
        const fileDate = format(new Date(), "yyyy-MM-dd");
        doc.save(`dermahealers-paid-${fileDate}.pdf`);
    };
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
                <select
                    value={doctorFilter}
                    onChange={(e) => setDoctorFilter(e.target.value)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                    <option value="all">All Doctors</option>
                    <option value="Dr. Neha Rani">Dr. Neha Rani</option>
                    <option value="Dr. B.K. Sharma">Dr. B.K. Sharma</option>
                </select>
               


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

                <button 
                    className="px-3 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                 onClick={downloadTodayPDF}>
                
                    Today's Patients PDF
                </button>
            </div>


            {/* Table */}
            <div className="overflow-x-auto rounded-lg shadow">

                <table className="min-w-full text-sm text-left border-collapse">

                    <thead>
                        <tr className="bg-gradient-to-r from-gray-300 to-gray-200 text-[var(--sbg)]">
                            <th className="p-3">Name</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">doctor</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Payment</th>
                            <th className="p-3">Action</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Time</th>
                            <th className="p-3">Order ID</th>
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
                                        <td className="p-3 flex gap-2 items-center">

                                            {(() => {
                                                const isPaid = appt.paymentDone === true;
                                                const isVisited = appt.visited === true;

                                                // ❌ Not Paid → Verify
                                                if (!isPaid) {
                                                    return (
                                                        <button
                                                            onClick={() => verifyPayment(appt.id)}
                                                            disabled={loadingId === appt.id}
                                                            className="flex items-center gap-2 px-3 py-1 bg-yellow-500 text-white rounded-lg text-xs hover:bg-yellow-600 disabled:opacity-50"
                                                        >
                                                            {loadingId === appt.id && actionType === "verify" && (
                                                                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                            )}
                                                            {loadingId === appt.id && actionType === "verify"
                                                                ? "Checking..."
                                                                : "Verify"}
                                                        </button>
                                                    );
                                                }

                                                // ✅ Paid but NOT visited
                                                if (isPaid && !isVisited) {
                                                    return (
                                                        <button
                                                            onClick={() => markVisited(appt.id)}
                                                            disabled={loadingId === appt.id}
                                                            className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700 disabled:opacity-50"
                                                        >
                                                            {loadingId === appt.id && actionType === "visited" && (
                                                                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                            )}
                                                            {loadingId === appt.id && actionType === "visited"
                                                                ? "Saving..."
                                                                : "Visited"}
                                                        </button>
                                                    );
                                                }

                                                // ✅ Already visited
                                                if (isVisited) {
                                                    return (
                                                        <span className="text-green-700 text-xs font-semibold">
                                                            ✔ Visited
                                                        </span>
                                                    );
                                                }

                                                return null;
                                            })()}

                                        </td>
                                        <td className="p-3">
                                            {format(parseISO(appt.date), "dd/MM/yyyy")}
                                        </td>
                                        <td className="p-3">
                                            {appt.time}
                                        </td>
                                        <td className="p-3 font-medium text-gray-700">
                                            {appt.id}
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
