"use client";
import Link from "next/link";

export default function Sidebar() {
    return (
        <nav className="space-y-3">
            <Link href="/admin" className="block p-2 rounded hover:bg-gray-100">
                Dashboard
            </Link>
            <Link href="/admin/appointments" className="block p-2 rounded hover:bg-gray-100">
                Appointments
            </Link>
            <Link href="/admin/members" className="block p-2 rounded hover:bg-gray-100">
                Members
            </Link>
            <Link href="/admin/blogs" className="block p-2 rounded hover:bg-gray-100">
                Blogs
            </Link>
        </nav>
    );
}
