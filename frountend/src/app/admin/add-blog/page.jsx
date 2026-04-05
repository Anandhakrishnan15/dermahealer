"use client";

import BlogsPage from "@/components/Admin/AdminDashboard";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default function adminblogPage() {
const { user } = useAuth();
    if (!user || user.role !== "admin") {
        redirect("/"); // or show 403 page
    }
    return (
        <>
            <BlogsPage />
        </>
    );
}
