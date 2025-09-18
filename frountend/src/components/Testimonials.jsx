"use client";

import { useEffect } from "react";

export const Testimonials = () => {
    useEffect(() => {
        // Load Elfsight script once
        const scriptId = "elfsight-platform-script";
        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script");
            script.src = "https://elfsightcdn.com/platform.js";
            script.async = true;
            script.id = scriptId;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <section className="py-16 bg-[var(--sbg)]">
            <h2 className="text-center text-3xl font-bold mb-10 text-white">
                What Our Clients Say
            </h2>

            {/* Elfsight Google Reviews Widget */}
            <div
                className="elfsight-app-f6ce44a9-10ff-4066-b850-bd8b976a4890 text-white"
                data-elfsight-app-lazy
            ></div>
        </section>
    );
};
