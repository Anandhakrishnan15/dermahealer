"use client";

import { AnimatePresence } from "framer-motion";

import AppointmentRow from "./AppointmentRow";
import LoadingSkeleton from "./LoadingSkeleton";

export default function AppointmentsTable({

    appointments,
    loading,

    verifyPayment,
    markVisited,

    loadingId,
    actionType,
    pagination,
    setPage

}) {
    return (

        <div className="rounded-lg shadow overflow-hidden">

            {/* TABLE SCROLL */}
            <div className="overflow-x-auto">

                <table className="min-w-full text-sm text-left border-collapse">

                    {/* HEADER */}
                    <thead>

                        <tr className="bg-gradient-to-r from-gray-300 to-gray-200 text-[var(--sbg)]">

                            <th className="p-3">Name</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Doctor</th>
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

                            {/* LOADING */}
                            {loading && (
                                <LoadingSkeleton />
                            )}

                            {/* DATA */}
                            {!loading &&
                                appointments.map((appt) => (

                                    <AppointmentRow
                                        key={appt.id}
                                        appt={appt}
                                        verifyPayment={verifyPayment}
                                        markVisited={markVisited}
                                        loadingId={loadingId}
                                        actionType={actionType}
                                    />

                                ))}

                            {/* EMPTY */}
                            {!loading &&
                                appointments.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan={9}
                                            className="text-center text-gray-500 p-4"
                                        >
                                            No appointments found
                                        </td>

                                    </tr>

                                )}

                        </tbody>

                    </AnimatePresence>

                </table>

            </div>

            {/* PAGINATION */}
            {pagination && (

                <div className="flex items-center justify-center gap-4 p-4 bg-[var(--bg)] border-t">

                    <button
                        disabled={!pagination.hasPrevPage}
                        onClick={() =>
                            setPage((prev) => prev - 1)
                        }
                        className="
                        px-4 py-2 rounded-lg
                        bg-gray-200
                        hover:bg-gray-300
                        transition
                        disabled:opacity-50
                    "
                    >
                        Previous
                    </button>

                    <span className="text-sm font-medium">

                        Page {pagination.page}
                        {" "}of{" "}
                        {pagination.totalPages}

                    </span>

                    <button
                        disabled={!pagination.hasNextPage}
                        onClick={() =>
                            setPage((prev) => prev + 1)
                        }
                        className="
                        px-4 py-2 rounded-lg
                        bg-blue-500 text-white
                        hover:bg-blue-600
                        transition
                        disabled:opacity-50
                    "
                    >
                        Next
                    </button>

                </div>

            )}

        </div>
    );
}