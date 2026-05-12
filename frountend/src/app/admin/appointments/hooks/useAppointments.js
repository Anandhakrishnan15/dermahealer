"use client";

import { useEffect, useState, useCallback } from "react";
import { useStats } from "@/context/StatsContext";
import { toast } from "react-toastify";
import { isToday, parseISO } from "date-fns";

export function useAppointments() {
    const [appointments, setAppointments] = useState([]);
   
    const [loading, setLoading] = useState(true);

    const [loadingId, setLoadingId] = useState(null);

    const [actionType, setActionType] = useState(null);
    const {
        setTotalAppointments,
        setTodayAppointments,
    } = useStats();

    // ---------------------------------------------------------
    // LOAD BOOKINGS
    // ---------------------------------------------------------
    const loadBookings = useCallback(async () => {
        try {
            setLoading(true);

            const res = await fetch("/api/bookings?limit=30");

            if (!res.ok) {
                throw new Error("Failed to fetch");
            }

            const data = await res.json();

            if (!data.success) {
                throw new Error(data.message);
            }

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

            toast.error("Failed to load appointments");
        } finally {
            setLoading(false);
        }
    }, []);

    // ---------------------------------------------------------
    // INITIAL LOAD
    // ---------------------------------------------------------
    useEffect(() => {
        loadBookings();
    }, [loadBookings]);
    useEffect(() => {

        setTotalAppointments(
            appointments.length
        );

        const todayCount =
            appointments.filter(
                (a) =>
                    a.paymentDone &&
                    isToday(parseISO(a.date))
            ).length;

        setTodayAppointments(todayCount);

    }, [
        appointments,
        setTotalAppointments,
        setTodayAppointments,
    ]);
    // ---------------------------------------------------------
    // VERIFY PAYMENT
    // ---------------------------------------------------------
    const verifyPayment = async (orderId) => {
        try {
            setLoadingId(orderId);

            setActionType("verify");

            const res = await fetch("/api/paytm/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderId }),
            });

            const data = await res.json();

            if (data.success) {
                setAppointments((prev) =>
                    prev.map((appt) =>
                        appt.id === orderId
                            ? {
                                ...appt,
                                paymentDone: true,
                            }
                            : appt,
                    ),
                );

                toast.success("Payment verified ✅");
            } else {
                toast.error(data.message || "Verification failed");
            }
        } catch (error) {
            console.error(error);

            toast.error("Error verifying payment");
        } finally {
            setLoadingId(null);

            setActionType(null);
        }
    };

    // ---------------------------------------------------------
    // MARK VISITED
    // ---------------------------------------------------------
    const markVisited = async (orderId) => {
        try {
            setLoadingId(orderId);

            setActionType("visited");

            const res = await fetch("/api/bookings/mark-visited", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderId }),
            });

            const data = await res.json();

            if (data.success) {
                setAppointments((prev) =>
                    prev.map((appt) =>
                        appt.id === orderId
                            ? {
                                ...appt,
                                visited: true,
                            }
                            : appt,
                    ),
                );

                toast.success("Marked as visited 🎉");
            } else {
                toast.error(data.message || "Failed");
            }
        } catch (error) {
            console.error(error);

            toast.error("Error marking visited");
        } finally {
            setLoadingId(null);

            setActionType(null);
        }
    };

    return {
        appointments,

        loading,

        loadingId,

        actionType,

        reloadBookings: loadBookings,

        verifyPayment,

        markVisited,
    };
}
