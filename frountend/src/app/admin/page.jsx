"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

import UserCard from "@/components/Admin/UserCard";
import StatsGrid from "@/components/Admin/StatsGrid";
import QuickActions from "@/components/Admin/QuickActions";
import RecentAppointments from "@/components/Admin/RecentAppointments";
import RatingModal from "@/components/Admin/RatingModal";
import BlogModal from "@/components/Admin/BlogModal";
import AppointmentModal from "@/components/Admin/AppointmentModal";
import BlogsTable from "@/components/Admin/AdminDashboard";

export default function AdminHome() {
    const { user } = useAuth();
    const [showBlogModal, setShowBlogModal] = useState(false);
    const [showAppointmentModal, setShowAppointmentModal] = useState(false);
    const [showRatingModal, setShowRatingModal] = useState(false);

    const [score, setScore] = useState("");
    const [reviews, setReviews] = useState("");

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
            method: "POST",
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
            <StatsGrid stats={stats} />
            <QuickActions onAddBlog={() => setShowBlogModal(true)} onBookAppointment={() => setShowAppointmentModal(true)} />
            <RecentAppointments appointments={recentAppointments} />

            {/* Blogs Section */}
            <div className="p-6 rounded-lg shadow" style={{ background: "var(--bg)" }}>
                <h2 className="text-lg font-semibold mb-4">Recent Blogs</h2>
                <BlogsTable />
            </div>

            {/* Modals */}
            <RatingModal
                isOpen={showRatingModal}
                onClose={() => setShowRatingModal(false)}
                score={score}
                setScore={setScore}
                reviews={reviews}
                setReviews={setReviews}
                onSave={updateRating}
            />
            <BlogModal isOpen={showBlogModal} onClose={() => setShowBlogModal(false)} />
            <AppointmentModal isOpen={showAppointmentModal} onClose={() => setShowAppointmentModal(false)} />
        </div>
    );
}
