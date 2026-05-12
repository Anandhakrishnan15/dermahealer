"use client";

import { memo } from "react";

import { motion } from "framer-motion";

import {
    format,
    parseISO,
} from "date-fns";

const AppointmentRow = memo(({

    appt,

    verifyPayment,

    markVisited,

    loadingId,

    actionType,

}) => {

    return (

        <motion.tr

            initial={{
                opacity: 0,
                y: 10,
            }}

            animate={{
                opacity: 1,
                y: 0,
            }}

            exit={{
                opacity: 0,
                y: -10,
            }}

            transition={{
                duration: 0.2,
            }}

            className="odd:bg-(--bg) even:bg-(--form-bg) hover:bg-(--link-hover) transition-colors"
        >

            {/* NAME */}
            <td className="p-3">
                {appt.name}
            </td>

            {/* PHONE */}
            <td className="p-3">
                {appt.phone}
            </td>

            {/* DOCTOR */}
            <td className="p-3">
                {appt.doctor}
            </td>

            {/* EMAIL */}
            <td className="p-3">
                {appt.email}
            </td>

            {/* PAYMENT */}
            <td
                className={`p-3 font-semibold ${appt.paymentDone
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
            >
                {appt.paymentDone
                    ? "Paid"
                    : "Unpaid"}
            </td>

            {/* ACTION */}
            <td className="p-3 flex gap-2 items-center">

                {(() => {

                    const isPaid =
                        appt.paymentDone === true;

                    const isVisited =
                        appt.visited === true;

                    // NOT PAID
                    if (!isPaid) {

                        return (

                            <button
                                onClick={() =>
                                    verifyPayment(appt.id)
                                }

                                disabled={
                                    loadingId === appt.id
                                }

                                className="flex items-center gap-2 px-3 py-1 bg-yellow-500 text-white rounded-lg text-xs hover:bg-yellow-600 disabled:opacity-50"
                            >

                                {loadingId === appt.id &&
                                    actionType === "verify" && (

                                        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>

                                    )}

                                {loadingId === appt.id &&
                                    actionType === "verify"
                                    ? "Checking..."
                                    : "Verify"}

                            </button>

                        );
                    }

                    // PAID BUT NOT VISITED
                    if (isPaid && !isVisited) {

                        return (

                            <button
                                onClick={() =>
                                    markVisited(appt.id)
                                }

                                disabled={
                                    loadingId === appt.id
                                }

                                className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700 disabled:opacity-50"
                            >

                                {loadingId === appt.id &&
                                    actionType === "visited" && (

                                        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>

                                    )}

                                {loadingId === appt.id &&
                                    actionType === "visited"
                                    ? "Saving..."
                                    : "Visited"}

                            </button>

                        );
                    }

                    // VISITED
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

            {/* DATE */}
            <td className="p-3">

                {format(
                    parseISO(appt.date),
                    "dd/MM/yyyy"
                )}

            </td>

            {/* TIME */}
            <td className="p-3">
                {appt.time}
            </td>

            {/* ORDER ID */}
            <td className="p-3 font-medium text-gray-700">
                {appt.id}
            </td>

        </motion.tr>
    );
});

AppointmentRow.displayName =
    "AppointmentRow";

export default AppointmentRow;