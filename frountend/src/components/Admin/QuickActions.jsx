"use client";

import Link from "next/link";
import {
    PlusCircle,
    UserPlus,
    Edit,
    Calendar,
    Repeat,
    FileText,
    ClipboardList
} from "lucide-react";

const actions = [
    {
        label: "Add Blog",
        icon: PlusCircle,
        external: true,
        href: "https://blog.dermahealerindia.com/wp-admin/post-new.php",
    },
    {
        label: "Add Staff",
        icon: UserPlus,
        href: "/auth/create-staff",
    },
    {
        label: "Update B&F",
        icon: Edit,
        href: "/admin/TreatmentsEditor",
    },
    {
        label: "Holidays",
        icon: Calendar,
        href: "/admin/holidays",
    },
    {
        label: "Follow-up",
        icon: Repeat,
        href: "/admin/add/follow-up",
    },
    {
        label: "Add Patient",
        icon: FileText,
        href: "/admin/add",
    },
    {
        label: "Appointments",
        icon: ClipboardList,
        href: "/admin/appointments/followup",
    },
];

export default function QuickActions() {
    return (
        <div className="p-6 md:p-8 rounded-3xl shadow-xl bg-[var(--bg)]">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                ⚡ Quick Actions
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">

                {actions.map((action) => {
                    const Icon = action.icon;

                    const card = (
                        <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl 
                        bg-[var(--btn-bg)] text-[var(--text)] 
                        shadow-md hover:shadow-xl 
                        transition-all duration-300 
                        hover:scale-105 active:scale-95">

                            <Icon size={28} className="opacity-80" />

                            <span className="text-sm md:text-base font-semibold text-center">
                                {action.label}
                            </span>
                        </div>
                    );

                    if (action.external) {
                        return (
                            <button
                                key={action.label}
                                onClick={() => window.open(action.href, "_blank")}
                            >
                                {card}
                            </button>
                        );
                    }

                    return (
                        <Link key={action.label} href={action.href}>
                            {card}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}