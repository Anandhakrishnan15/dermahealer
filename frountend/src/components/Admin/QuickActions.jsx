"use client";

import Link from "next/link";

export default function QuickActions({ onAddBlog, onBookAppointment }) {
    return (
        <div className="p-6 rounded-lg shadow" style={{ background: "var(--bg)" }}>
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
                <button
                    className="px-4 py-2 bg-[var(--btn-bg)] text-[var(--text)] rounded-lg hover:bg-[var(--btn-hover)] transition"
                    // onClick={onAddBlog}
                    onClick={() => window.open("https://blog.dermahealerindia.com/wp-admin/post-new.php", "_blank")}

                    // https://blog.dermahealerindia.com/wp-admin/post-new.php
                >
                    ➕ Add Blog
                </button>
                <Link href="/auth/create-staff">
                    <button className="px-4 py-2 bg-[var(--btn-bg)] text-[var(--text)] rounded-lg hover:bg-[var(--btn-hover)] transition">
                        ➕ Add Staff
                    </button>
                </Link>

                <Link href="/admin/TreatmentsEditor">
                    <button className="px-4 py-2 bg-[var(--btn-bg)] text-[var(--text)] rounded-lg hover:bg-[var(--btn-hover)] transition">
                        ➕ Update the B&F
                    </button>
                </Link>
                <Link href="/admin/holidays">
                    <button className="px-4 py-2 bg-[var(--btn-bg)] text-[var(--text)] rounded-lg hover:bg-[var(--btn-hover)] transition">
                        ➕ Add Holidays
                    </button>
                </Link>
                {/* <button
                    className="px-4 py-2 bg-[var(--btn-bg)] text-[var(--text)] rounded-lg hover:bg-[var(--btn-hover)] transition"
                    onClick={onBookAppointment}
                >
                    📅 New Appointment
                </button> */}
            </div>
        </div>
    );
}
