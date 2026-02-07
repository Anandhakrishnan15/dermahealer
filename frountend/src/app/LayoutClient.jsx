"use client";

import { usePathname } from "next/navigation";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import NetworkStatusPopup from "@/components/NetworkStatusPopup";
import { AuthProvider } from "@/context/AuthContext";
// import { ToastContainer } from "react-toastify";

export default function LayoutClient({ children }) {
    const pathname = usePathname();

    // Hide NavBar & Footer for QR_Links and all admin pages
    const hideNavAndFooter =
        pathname.startsWith("/QR_Links") || pathname.startsWith("/admin") || pathname.startsWith("/auth");

    return (
        <>
            <NetworkStatusPopup />
            {!hideNavAndFooter && <NavBar />}
            <AuthProvider>{children}
            </AuthProvider>
            {!hideNavAndFooter && <Footer />}
        </>
    );
}
