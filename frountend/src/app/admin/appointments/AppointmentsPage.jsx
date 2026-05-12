"use client";

import { useEffect, useMemo, useState } from "react";

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
  } = useAppointments();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("last7");
  const [selectedDate, setSelectedDate] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("paid");
  const [doctorFilter, setDoctorFilter] = useState("all");
// const { setTotalAppointments, setTodayAppointments } = useStats();
  const filteredAppointments = useMemo(() => {

    return filterAppointments({
      appointments,
      search,
      filter,
      selectedDate,
      paymentFilter,
      doctorFilter,
    });

  }, [
    appointments,
    search,
    filter,
    selectedDate,
    paymentFilter,
    doctorFilter,
  ]);
   

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        Appointments
      </h2>

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
        onDownloadPDF={() =>
          downloadTodayPDF(appointments)
        }
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