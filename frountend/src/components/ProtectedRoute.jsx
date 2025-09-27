"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
    const [authorized, setAuthorized] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setAuthorized(true);
        } else {
            setAuthorized(false);
            router.replace("/auth"); // redirect to login page
        }
    }, [router]);

    // while checking, render full-page loader
    if (authorized === null) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="w-16 h-16 border-4 border-teal-500 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }

    // otherwise show the page
    return authorized ? children : null;
}
