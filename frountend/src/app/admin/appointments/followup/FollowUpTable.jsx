"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { debounce } from "lodash";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Pencil, CheckCircle, Trash2, Loader2 } from "lucide-react";

export default function FollowUpTable() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    const [selected, setSelected] = useState(null);
    const [showEdit, setShowEdit] = useState(false);

    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [loadingId, setLoadingId] = useState(null);
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const getToken = () => localStorage.getItem("token");

    /* ✅ FETCH */
    const fetchData = async (query = "") => {
        try {
            const res = await fetch(`/api/add-patient/follow-up?search=${query}`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });

            const json = await res.json();

            if (json.success) {
                setData(json.data);
            } else {
                setData([]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    /* ✅ DEBOUNCE FIX */
    const debouncedFetch = useMemo(() => {
        return debounce((q) => fetchData(q), 300);
    }, []);

    useEffect(() => {
        debouncedFetch(search);

        return () => {
            debouncedFetch.cancel();
        };
    }, [search, debouncedFetch]);

    // /* ✅ INITIAL LOAD */
    // useEffect(() => {
    //     fetchData("");
    // }, []);

    /* ✅ MARK DONE (⚡ OPTIMISTIC UPDATE) */
    const markDone = async (id) => {
        if (loadingId) return;

        setLoadingId(id);

        // ⚡ instantly update UI
        setData((prev) =>
            prev.map((item) =>
                item._id === id ? { ...item, status: "completed" } : item
            )
        );

        const res = await fetch("/api/add-patient/follow-up", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify({ id, status: "completed" }),
        });

        if (res.ok) {
            toast.success("Marked as done ✅");
        } else {
            toast.error("Failed ❌");

            // ❗ rollback if failed
            fetchData(search);
        }

        setLoadingId(null);
    };

    /* ✅ DELETE (⚡ OPTIMISTIC UPDATE) */
    const deleteItem = async () => {
        if (deleteLoading) return;

        setDeleteLoading(true);

        // ⚡ instantly remove from UI
        const backup = data;
        setData((prev) => prev.filter((item) => item._id !== deleteId));

        const res = await fetch(`/api/add-patient/follow-up?id=${deleteId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });

        if (res.ok) {
            toast.success("Deleted 🗑️");
            setShowDelete(false);
        } else {
            toast.error("Delete failed ❌");

            // ❗ rollback
            setData(backup);
        }

        setDeleteLoading(false);
    };

    /* 📊 STATS */
    const total = data.length;
    const completed = data.filter((d) => d.status === "completed").length;
    const scheduled = data.filter((d) => d.status === "scheduled").length;
    const cancelled = data.filter((d) => d.status === "cancelled").length;
    const noShow = data.filter((d) => d.status === "no-show").length;
    const unpaid = data.filter((d) => !d.payment?.isPaid).length;

    /* 🎨 STATUS UI */
    const getStatusUI = (status) => {
        switch (status) {
            case "completed":
                return { label: "Done", className: "bg-green-100 text-green-600" };
            case "scheduled":
                return { label: "Pending", className: "bg-yellow-100 text-yellow-600" };
            case "cancelled":
                return { label: "Cancelled", className: "bg-red-100 text-red-600" };
            case "no-show":
                return { label: "Missed", className: "bg-gray-200 text-gray-600" };
            default:
                return { label: status, className: "bg-gray-100 text-gray-600" };
        }
    };

    return (
        <div className="p-6 space-y-6">

            {/* 🔝 NAVBAR */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Follow-Up Dashboard</h1>

                <div className="flex gap-3">
                    <Link href="/admin" className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                        Dashboard
                    </Link>
                    <Link href="/admin/add" className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                        Patients
                    </Link>
                    <Link href="/admin/add/follow-up" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        + Add Follow-Up
                    </Link>
                </div>
            </div>

            {/* 📊 STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-white rounded-xl shadow">
                    <p className="text-gray-500">Total</p>
                    <h2 className="text-2xl font-bold">{total}</h2>
                </div>

                <div className="p-4 bg-green-50 rounded-xl shadow">
                    <p className="text-green-600">Done</p>
                    <h2 className="text-2xl font-bold">{completed}</h2>
                </div>

                <div className="p-4 bg-yellow-50 rounded-xl shadow">
                    <p className="text-yellow-600">Pending</p>
                    <h2 className="text-2xl font-bold">{scheduled}</h2>
                </div>

                <div className="p-4 bg-red-50 rounded-xl shadow">
                    <p className="text-red-600">Payment Pending</p>
                    <h2 className="text-2xl font-bold">{unpaid}</h2>
                </div>
            </div>

            {/* 🔍 SEARCH */}
            <input
                type="text"
                placeholder="Search patient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-200 p-3 border rounded-xl shadow-sm"
            />

            {/* 📋 TABLE */}
            <div className="bg-white rounded-2xl shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-4">Patient</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Doctor</th>
                            <th className="p-4">Payment</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Time</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item) => {
                            const statusUI = getStatusUI(item.status);

                            return (
                                <tr key={item._id} className="border-t hover:bg-gray-50">
                                    <td className="p-4 font-medium">{item.patientDetails?.name}</td>
                                    <td className="p-4">{item.patientDetails?.phone}</td>
                                    <td className="p-4">{item.doctor?.name}</td>

                                    <td className="p-4">
                                        {item.payment?.isPaid ? (
                                            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                                                Paid
                                            </span>
                                        ) : (
                                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                                                Unpaid
                                            </span>
                                        )}
                                    </td>

                                    <td className="p-4">
                                        {item.appointment?.date
                                            ? new Date(item.appointment.date).toLocaleDateString()
                                            : "-"}
                                    </td>

                                    <td className="p-4">{item.appointment?.timeSlot}</td>

                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-sm ${statusUI.className}`}>
                                            {statusUI.label}
                                        </span>
                                    </td>

                                    <td className="p-4 flex gap-2 justify-center">

                                        {/* EDIT - disabled for completed/done */}
                                        <button
                                            onClick={() => {
                                                if (item.status !== "completed" && item.status !== "done") {
                                                    setSelected(item);
                                                    setShowEdit(true);
                                                }
                                            }}
                                            disabled={item.status === "completed" || item.status === "done"}
                                            className={`p-2 rounded-lg ${item.status === "completed" || item.status === "done"
                                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                    : "bg-blue-500 text-white hover:bg-blue-600"
                                                }`}
                                        >
                                            <Pencil size={16} />
                                        </button>

                                        {/* DONE - only if not completed AND payment done */}
                                        {item.status !== "completed" && item.status !== "done" && (
                                            <button
                                                disabled={loadingId === item._id || !item.payment?.isPaid}
                                                onClick={() => markDone(item._id)}
                                                className={`p-2 rounded-lg ${!item.payment?.isPaid
                                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                        : "bg-green-500 text-white hover:bg-green-600"
                                                    }`}
                                            >
                                                {loadingId === item._id ? (
                                                    <Loader2 size={16} className="animate-spin" />
                                                ) : (
                                                    <CheckCircle size={16} />
                                                )}
                                            </button>
                                        )}

                                        {/* DELETE - always enabled */}
                                        <button
                                            onClick={() => {
                                                setDeleteId(item._id);
                                                setShowDelete(true);
                                            }}
                                            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {data.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        No follow-ups found
                    </div>
                )}
            </div>

            {/* ✏️ EDIT MODAL */}
            {showEdit && selected && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="bg-white p-6 rounded-2xl w-100 space-y-4"
                    >
                        <h2 className="text-xl font-semibold">Edit Follow-Up</h2>

                        <select
                            value={selected.payment?.isPaid ? "paid" : "unpaid"}
                            onChange={(e) =>
                                setSelected({
                                    ...selected,
                                    payment: { isPaid: e.target.value === "paid" },
                                })
                            }
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="paid">Paid</option>
                            <option value="unpaid">Unpaid</option>
                        </select>

                        <input
                            type="date"
                            value={selected.appointment?.date?.split("T")[0]}
                            onChange={(e) =>
                                setSelected({
                                    ...selected,
                                    appointment: {
                                        ...selected.appointment,
                                        date: e.target.value,
                                    },
                                })
                            }
                            className="w-full p-2 border rounded-lg"
                        />

                        <input
                            type="text"
                            value={selected.appointment?.timeSlot}
                            onChange={(e) =>
                                setSelected({
                                    ...selected,
                                    appointment: {
                                        ...selected.appointment,
                                        timeSlot: e.target.value,
                                    },
                                })
                            }
                            className="w-full p-2 border rounded-lg"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowEdit(false)}
                                className="px-4 py-2 bg-gray-200 rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                disabled={saveLoading}
                                onClick={async () => {
                                    if (saveLoading) return;
                                    setSaveLoading(true);

                                    const res = await fetch("/api/add-patient/follow-up", {
                                        method: "PATCH",
                                        headers: {
                                            "Content-Type": "application/json",
                                            Authorization: `Bearer ${getToken()}`,
                                        },
                                        body: JSON.stringify({
                                            id: selected._id,
                                            paymentStatus: selected.payment?.isPaid ? "paid" : "unpaid",
                                            date: selected.appointment?.date,
                                            time: selected.appointment?.timeSlot,
                                        }),
                                    });

                                    if (res.ok) {
                                        toast.success("Updated ✨");
                                        setShowEdit(false);
                                        fetchData();
                                    } else {
                                        toast.error("Update failed ❌");
                                    }

                                    setSaveLoading(false);
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
                            >
                                {saveLoading ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save"
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* ⚠️ DELETE MODAL */}
            {showDelete && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="bg-white p-6 rounded-2xl text-center space-y-4"
                    >
                        <h2 className="text-lg font-semibold text-red-600">
                            Delete Follow-Up?
                        </h2>

                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => setShowDelete(false)}
                                className="px-4 py-2 bg-gray-200 rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                disabled={deleteLoading}
                                onClick={deleteItem}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
                            >
                                {deleteLoading ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    "Delete"
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}