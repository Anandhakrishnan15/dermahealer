"use client";

import FilterButton from "./FilterButton";

export default function Filters({

    search,
    setSearch,

    filter,
    setFilter,

    selectedDate,
    setSelectedDate,

    paymentFilter,
    setPaymentFilter,

    doctorFilter,
    setDoctorFilter,

    reloadBookings,

    onDownloadPDF,

}) {

    return (

        <div className="flex flex-wrap gap-2 mb-6 items-center">

            {/* SEARCH */}
            <input
                type="text"
                placeholder="Search by Name or ID"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                className="border p-2 rounded-lg w-64 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />

            {/* DATE FILTERS */}
            <FilterButton
                label="Today"
                value="today"
                activeFilter={filter}
                setFilter={setFilter}
            />

            <FilterButton
                label="Yesterday"
                value="yesterday"
                activeFilter={filter}
                setFilter={setFilter}
            />

            <FilterButton
                label="Tomorrow"
                value="tomorrow"
                activeFilter={filter}
                setFilter={setFilter}
            />

            <FilterButton
                label="Last 7 Days"
                value="last7"
                activeFilter={filter}
                setFilter={setFilter}
            />

            {/* PAYMENT FILTER */}
            <FilterButton
                label="Paid"
                value="paid"
                activeFilter={paymentFilter}
                setFilter={setPaymentFilter}
            />

            <FilterButton
                label="Unpaid"
                value="unpaid"
                activeFilter={paymentFilter}
                setFilter={setPaymentFilter}
            />

            {/* DOCTOR FILTER */}
            <select
                value={doctorFilter}
                onChange={(e) =>
                    setDoctorFilter(e.target.value)
                }
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-700"
            >

                <option value="all">
                    All Doctors
                </option>

                <option value="Dr. Neha Rani">
                    Dr. Neha Rani
                </option>

                <option value="Dr. B.K. Sharma">
                    Dr. B.K. Sharma
                </option>

            </select>

            {/* CUSTOM DATE */}
            <input
                type="date"
                value={selectedDate}
                onChange={(e) => {

                    setSelectedDate(e.target.value);

                    setFilter("custom");

                }}
                className="border p-2 rounded-lg shadow-sm"
            />

            {/* RESET */}
            <button
                onClick={() => {

                    setFilter("all");

                    setPaymentFilter("all");

                    setDoctorFilter("all");

                    setSelectedDate("");

                    setSearch("");

                }}
                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400"
            >
                All
            </button>

            {/* RELOAD */}
            <button
                onClick={reloadBookings}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Reload
            </button>

            {/* PDF */}
            <button
                onClick={onDownloadPDF}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
                Today's Patients PDF
            </button>

        </div>
    );
}