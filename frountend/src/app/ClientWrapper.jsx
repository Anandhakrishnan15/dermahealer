"use client";
import { useEffect } from "react";

export default function ClientWrapper({ children }) {
    // Silence only 'non-passive event listener' warnings
    useEffect(() => {
        const originalWarn = console.warn;
        console.warn = (...args) => {
            if (args[0] && typeof args[0] === "string" && args[0].includes("Added non-passive event listener")) {
                return; // ignore this specific warning
            }
            originalWarn(...args); // show other warnings
        };
        return () => {
            console.warn = originalWarn;
        };
    }, []);

    return <>{children}</>;
}
