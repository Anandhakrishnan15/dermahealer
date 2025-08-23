"use client";

import { useEffect, useState } from "react";
import NotFound from "../app/not-found"; // your 404 component

export default function ProtectedRoute({ children }) {
    const [authorized, setAuthorized] = useState(null);

    useEffect(() => {
        // check token in localStorage
        const token = localStorage.getItem("token");
        if (token) {
            setAuthorized(true);
        } else {
            setAuthorized(false);
        }
    }, []);

    // while checking, render nothing (avoid flicker)
    if (authorized === null) return null;

    // if no token, show 404
    if (!authorized) return <NotFound />;

    // otherwise show the page
    return children;
}
