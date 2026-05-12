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

}) {

    return (

        <div className="overflow-x-auto rounded-lg shadow">

            <table className="min-w-full text-sm text-left border-collapse">

                {/* TABLE HEADER */}
                <thead>

                    <tr className="bg-linear-to-r from-gray-300 to-gray-200 text-(--sbg)">

                        <th className="p-3">
                            Name
                        </th>

                        <th className="p-3">
                            Phone
                        </th>

                        <th className="p-3">
                            Doctor
                        </th>

                        <th className="p-3">
                            Email
                        </th>

                        <th className="p-3">
                            Payment
                        </th>

                        <th className="p-3">
                            Action
                        </th>

                        <th className="p-3">
                            Date
                        </th>

                        <th className="p-3">
                            Time
                        </th>

                        <th className="p-3">
                            Order ID
                        </th>

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

                        {/* NO DATA */}
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
    );
}