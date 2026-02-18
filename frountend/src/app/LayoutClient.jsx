"use client";

import { usePathname } from "next/navigation";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import NetworkStatusPopup from "@/components/NetworkStatusPopup";
import { AuthProvider } from "@/context/AuthContext";
import FloatingCallButton from "@/components/FloatingCallButton";
// import FloatingCallButton from "@/components/FloatingCallButton.jsx";

export default function LayoutClient({ children }) {
    const pathname = usePathname();

    // Routes where NavBar & Footer should be hidden
    const hideLayoutRoutes = ["/QR_Links", "/admin", "/auth"];

    // Routes where booking button should be hidden
    const hideBookingRoutes = [
        "/QR_Links",
        "/admin",
        "/auth",
        "/book-appointment",
    ];

    const shouldHideLayout = hideLayoutRoutes.some(route =>
        pathname.startsWith(route)
    );

    const shouldHideBooking = hideBookingRoutes.some(route =>
        pathname.startsWith(route)
    );

    return (
        <>
            <NetworkStatusPopup />

            {!shouldHideLayout && <NavBar />}

            {!shouldHideBooking && <FloatingCallButton />}

            <AuthProvider>
                {children}
            </AuthProvider>

            {!shouldHideLayout && <Footer />}
        </>
    );
}
