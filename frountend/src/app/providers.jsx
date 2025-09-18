// src/app/providers.jsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function AnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!pathname) return;

        const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
        window.gtag?.("config", process.env.NEXT_PUBLIC_GA_ID, { page_path: url });
    }, [pathname, searchParams]);

    return null;
}

export default function AnalyticsProvider() {
    return (
        <Suspense fallback={null}>
            <AnalyticsTracker />
        </Suspense>
    );
}
