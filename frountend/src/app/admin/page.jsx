"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

import UserCard from "@/components/Admin/UserCard";
import StatsGrid from "@/components/Admin/StatsGrid";
import QuickActions from "@/components/Admin/QuickActions";
import RatingModal from "@/components/Admin/RatingModal";
import BlogsTable from "@/components/Admin/AdminDashboard";
import AppointmentsPage from "./appointments/AppointmentsPage";

export default function AdminHome() {
    const { user } = useAuth();
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [score, setScore] = useState("");
    const [reviews, setReviews] = useState("");

    const isAdmin = user?.role === "admin";

    const stats = [
        { label: "Total Appointments", value: 124 },
        { label: "Today's Appointments", value: 8 },
        { label: "New Members", value: 15 },
        { label: "Total Blogs", value: 42 },
    ];

    const recentAppointments = [
        { id: 1, name: "John Doe", date: "2025-08-12", service: "Laser Treatment" },
        { id: 2, name: "Jane Smith", date: "2025-08-12", service: "Acne Treatment" },
        { id: 3, name: "Michael Brown", date: "2025-08-11", service: "Hair Removal" },
    ];

    const updateRating = async () => {
        await fetch("/api/rating", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ score: Number(score), reviews: Number(reviews) }),
        });
        alert("✅ Rating updated!");
        setShowRatingModal(false);
        setScore("");
        setReviews("");
    };

    return (
        <div className="space-y-8 p-6">
            <UserCard user={user} onEditRating={() => setShowRatingModal(true)} />

            {/* Admin-only QuickActions */}
            {isAdmin && (
                <QuickActions
                    onAddBlog={() => setShowBlogModal(true)}
                    onBookAppointment={() => setShowAppointmentModal(true)}
                />
            )}

            {/* Stats - visible to all */}
            <StatsGrid stats={stats} />

            {/* Recent Appointments - visible to all */}
            {/* <RecentAppointments appointments={recentAppointments} /> */}
            <AppointmentsPage/>

            {/* Admin-only Blogs Table */}
            {isAdmin && (
                <div className="p-6 rounded-lg shadow" style={{ background: "var(--bg)" }}>
                    <h2 className="text-lg font-semibold mb-4">Recent Blogs</h2>
                    <BlogsTable />
                </div>
            )}

            {/* Rating Modal */}
            <RatingModal
                isOpen={showRatingModal}
                onClose={() => setShowRatingModal(false)}
                score={score}
                setScore={setScore}
                reviews={reviews}
                setReviews={setReviews}
                onSave={updateRating}
            />
        </div>
    );
}
