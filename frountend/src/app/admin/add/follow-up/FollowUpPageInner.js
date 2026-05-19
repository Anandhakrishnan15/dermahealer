"use client";

import { useEffect, useState, useRef } from "react";
import FollowUpForm from "./FollowUpForm";
import Link from "next/link";

export default function FollowUpPageInner() {
    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);

    const controllerRef = useRef(null);
    const requestIdRef = useRef(0);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // 🔥 FETCH (Production Safe)
    const fetchPatients = async (query = "", pageNum = 1) => {
        const requestId = ++requestIdRef.current;

        try {
            setLoading(true);
            setError("");

            if (controllerRef.current) {
                controllerRef.current.abort();
            }

            const controller = new AbortController();
            controllerRef.current = controller;

            const token = localStorage.getItem("token");

            const res = await fetch(
                `/api/add-patient?search=${query}&page=${pageNum}&limit=10`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    signal: controller.signal,
                }
            );

            // ✅ 🔥 TOKEN EXPIRED HANDLING
            if (res.status === 401) {
                localStorage.removeItem("token");
                window.location.href = "/login";
                return;
            }

            const data = await res.json();

            if (requestId !== requestIdRef.current) return;

            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to fetch");
            }

            setPatients(data.patients || []);
            setTotalPages(data.totalPages || 1);

        } catch (err) {
            if (err.name === "AbortError") return;
            console.error(err);
            setError("Failed to load patients 🚨");
        } finally {
            if (requestId === requestIdRef.current) {
                setLoading(false);
            }
        }
    };

    // 🚀 INITIAL LOAD
    useEffect(() => {
        fetchPatients("", 1);
    }, []);

    // 🔍 DEBOUNCE SEARCH
    useEffect(() => {
        const delay = setTimeout(() => {
            setPage(1);
            fetchPatients(search, 1);
        }, 400);

        return () => clearTimeout(delay);
    }, [search]);

    // 🧹 CLEANUP
    useEffect(() => {
        return () => {
            controllerRef.current?.abort();
        };
    }, []);

    // 📄 PAGINATION
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
        fetchPatients(search, newPage);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            {/* 🔥 HEADER */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Follow-Up Management
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Manage patients & follow-ups efficiently
                    </p>
                </div>

                <div className="flex gap-3 w-full md:w-auto items-center">

                    {/* 🔄 RELOAD BUTTON */}
                    <button
                        onClick={() => fetchPatients(search, page)}
                        className="px-4 py-3 bg-gray-200 rounded-xl hover:bg-gray-300 shadow"
                    >
                        🔄 Reload
                    </button>

                    {/* 🔍 SEARCH */}
                    <div className="relative flex-1 md:w-[300px]">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            🔍
                        </span>
                        <input
                            type="text"
                            placeholder="Search name or phone..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border bg-white
                            focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                        />
                    </div>



                    <Link href="/admin/add">
                        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 shadow">
                            ➕ Add Patient
                        </button>
                    </Link>
                </div>
            </div>

            {/* ❌ ERROR */}
            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg border">
                    {error}
                </div>
            )}

            {/* 📊 TABLE */}
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Phone</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Age</th>
                            <th className="p-4 text-left">Gender</th>
                            <th className="p-4 text-left">Treatment</th>
                            <th className="p-4 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="p-8 text-center">
                                    <div className="flex justify-center items-center gap-2 text-gray-500">
                                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                        Loading patients...
                                    </div>
                                </td>
                            </tr>
                        ) : patients.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="p-8 text-center text-gray-500">
                                    No patients found
                                </td>
                            </tr>
                        ) : (
                            patients.map((p, i) => (
                                <tr key={i} className="border-t hover:bg-blue-50 transition">
                                    <td className="p-4 font-medium">{p.fullName}</td>
                                    <td className="p-4">{p.phone}</td>
                                    <td className="p-4">{p.email}</td>
                                    <td className="p-4">{p.age}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                            {p.gender}
                                        </span>
                                    </td>
                                    <td className="p-4">{p.treatment}</td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => {
                                                setSelectedPatient(p);
                                                setShowModal(true);
                                            }}
                                            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700"
                                        >
                                            Follow-up
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* 🔢 PAGINATION */}
            <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-gray-500">
                    Page {page} of {totalPages}
                </p>

                <div className="flex gap-2">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-40"
                    >
                        ← Prev
                    </button>

                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-40"
                    >
                        Next →
                    </button>
                </div>
            </div>

            {/* 📝 MODAL */}
            {showModal && selectedPatient && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm 
        z-50 overflow-y-auto p-4"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="min-h-full flex items-center justify-center py-6"
                    >
                        <div
                            className="bg-white w-full max-w-lg rounded-2xl 
shadow-2xl relative
max-h-[90vh] overflow-y-auto
[-ms-overflow-style:none]
[scrollbar-width:none]
[&::-webkit-scrollbar]:hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* CLOSE BUTTON */}
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-3 right-4 text-lg hover:text-red-500 z-10"
                            >
                                ✖
                            </button>

                            {/* CONTENT */}
                            <div className="p-6">
                                <FollowUpForm
                                    patient={selectedPatient}
                                    setShowModal={setShowModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}