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
            <div className="flex items-center justify-center min-h-screen">
                Loading...
            </div>
        );
    }

    if (!authorized) return null;

    return children;
}