"use client";

import { useEffect, useState, useCallback } from "react";

import { useStats } from "@/context/StatsContext";

import { toast } from "react-toastify";

export function useAppointments(filterOptions = {}) {
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [loadingId, setLoadingId] = useState(null);

  const [actionType, setActionType] = useState(null);

  const { setTotalAppointments, setTodayAppointments } = useStats();

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState(null);

  // ---------------------------------------------------------
  // LOAD BOOKINGS - DASHBOARD
  // ---------------------------------------------------------

  const loadBookings = useCallback(async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page: String(page),
        limit: "30",
      });

      if (filterOptions.search) params.set("search", filterOptions.search);
      if (filterOptions.filter) params.set("dateFilter", filterOptions.filter);
      if (filterOptions.selectedDate) params.set("selectedDate", filterOptions.selectedDate);
      if (filterOptions.paymentFilter) params.set("payment", filterOptions.paymentFilter);
      if (filterOptions.doctorFilter) params.set("doctor", filterOptions.doctorFilter);

      const res = await fetch(`/api/bookings?${params.toString()}`);

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

      setPagination(data.pagination);

      setTotalAppointments(data.stats.totalAppointments);

      setTodayAppointments(data.stats.todayAppointments);
    } catch (error) {
      console.error("Error loading bookings:", error);

      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  }, [page, filterOptions.search, filterOptions.filter, filterOptions.selectedDate, filterOptions.paymentFilter, filterOptions.doctorFilter]);

  // ---------------------------------------------------------
  // LOAD ALL TODAY'S BOOKINGS FOR PDF
  // ---------------------------------------------------------

  const getTodayAppointmentsForPDF = useCallback(async () => {
    try {
      /*
       * IMPORTANT:
       *
       * This request is separate from
       * the dashboard pagination.
       *
       * We request ALL bookings.
       */

      const res = await fetch("/api/bookings?all=true");

      if (!res.ok) {
        throw new Error("Failed to fetch appointments for PDF");
      }

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch appointments");
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

      return mapped;
    } catch (error) {
      console.error("PDF appointments error:", error);

      toast.error("Failed to load appointments for PDF");

      return [];
    }
  }, []);

  // ---------------------------------------------------------
  // INITIAL LOAD
  // ---------------------------------------------------------

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

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

        body: JSON.stringify({
          orderId,
        }),
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

        body: JSON.stringify({
          orderId,
        }),
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

  // ---------------------------------------------------------
  // RETURN
  // ---------------------------------------------------------

  return {
    appointments,

    loading,

    loadingId,

    actionType,

    pagination,

    page,

    setPage,

    reloadBookings: loadBookings,

    verifyPayment,

    markVisited,

    getTodayAppointmentsForPDF,
  };
}
