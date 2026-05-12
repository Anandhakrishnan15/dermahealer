// components/ProtectedRoute.jsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {

    const [authorized, setAuthorized] = useState(null);

    const router = useRouter();

    useEffect(() => {

        const verifyUser = async () => {

            try {

                const token = localStorage.getItem("token");

                if (!token) {
                    setAuthorized(false);
                    router.replace("/auth");
                    return;
                }

                const res = await fetch("/api/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {

                    localStorage.removeItem("token");

                    setAuthorized(false);

                    router.replace("/auth");

                    return;
                }

                setAuthorized(true);

            } catch (error) {

                localStorage.removeItem("token");

                setAuthorized(false);

                router.replace("/auth");
            }
        };

        verifyUser();

    }, [router]);

    if (authorized === null) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-(--bg)">

                <div className="flex flex-col items-center gap-4">

                    {/* SPINNER */}
                    <div className="relative h-16 w-16">

                        {/* OUTER RING */}
                        <div
                            className="
                    absolute inset-0
                    rounded-full
                    border-4 border-teal-100
                "
                        />

                        {/* SPINNING RING */}
                        <div
                            className="
                    absolute inset-0
                    rounded-full
                    border-4 border-transparent
                    border-t-teal-500
                    border-r-teal-400
                    animate-spin
                "
                        />

                    </div>

                    {/* TEXT */}
                    <div className="text-center">

                        <p className="text-lg font-semibold text-teal-600">
                            Loading
                        </p>

                        <p className="text-sm text-gray-500">
                            Please wait a moment...
                        </p>

                    </div>

                </div>

            </div>
        );
    }

    if (!authorized) return null;

    return children;
}