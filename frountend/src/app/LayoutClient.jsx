// app/LayoutClient.jsx
"use client";

import { usePathname } from "next/navigation";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import NetworkStatusPopup from "@/components/NetworkStatusPopup";

export default function LayoutClient({ children }) {
    const pathname = usePathname();
    const hideNavAndFooter = pathname.startsWith("/QR_Links");

    return (
        <><NetworkStatusPopup />
            {!hideNavAndFooter && <NavBar />}
            {children}
            {!hideNavAndFooter && <Footer />}
        </>
    );
}
