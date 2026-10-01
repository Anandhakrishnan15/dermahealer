"use client";

import { useMemo, useState } from "react";

import Filters from "./components/Filters";

import AppointmentsTable from "./components/AppointmentsTable";

import { useAppointments } from "./hooks/useAppointments";

import { filterAppointments } from "./utils/filters";

import { downloadTodayPDF } from "./utils/pdfGenerator";

export default function AppointmentsPage() {
  const {
    appointments,

    loading,

    pagination,

    page,

    setPage,

    verifyPayment,

    markVisited,

    reloadBookings,

    loadingId,

    actionType,

    getTodayAppointmentsForPDF,
  } = useAppointments();

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("last7");

  const [selectedDate, setSelectedDate] = useState("");

  const [paymentFilter, setPaymentFilter] = useState("paid");

  const [doctorFilter, setDoctorFilter] = useState("all");

  // ---------------------------------------------------------
  // FILTER DASHBOARD DATA
  // ---------------------------------------------------------

  const filteredAppointments = useMemo(() => {
    return filterAppointments({
      appointments,

      search,

      filter,

      selectedDate,

      paymentFilter,

      doctorFilter,
    });
  }, [appointments, search, filter, selectedDate, paymentFilter, doctorFilter]);

  // ---------------------------------------------------------
  // DOWNLOAD TODAY PDF
  // ---------------------------------------------------------

  const handleDownloadPDF = async () => {
    try {
      // Get ALL appointments,
      // NOT just current dashboard page.

      const allAppointments = await getTodayAppointmentsForPDF();

      if (!allAppointments || allAppointments.length === 0) {
        await downloadTodayPDF([]);

        return;
      }

      await downloadTodayPDF(allAppointments);
    } catch (error) {
      console.error("PDF download error:", error);
    }
  };

  // ---------------------------------------------------------
  // PAGE
  // ---------------------------------------------------------

  return (
    <div className="p-2 md:p-3">
      <h2 className="text-2xl font-bold mb-3">Appointments</h2>

      <Filters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        paymentFilter={paymentFilter}
        setPaymentFilter={setPaymentFilter}
        doctorFilter={doctorFilter}
        setDoctorFilter={setDoctorFilter}
        reloadBookings={reloadBookings}
        onDownloadPDF={handleDownloadPDF}
      />

      <AppointmentsTable
        appointments={filteredAppointments}
        loading={loading}
        verifyPayment={verifyPayment}
        markVisited={markVisited}
        loadingId={loadingId}
        actionType={actionType}
        pagination={pagination}
        setPage={setPage}
      />
    </div>
  );
}
