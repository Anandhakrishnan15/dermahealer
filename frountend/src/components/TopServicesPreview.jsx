"use client";
import React from "react";

export const TopServicesPreview = () => {
    const treatments = [
        {
            title: "HIFU (Non-Surgical Facelift)",
            description:
                "Achieve skin tightening and facial contouring without surgery. HIFU boosts collagen production, lifts sagging skin, and smoothens wrinkles with visible results in just one session.",
            image: "https://picsum.photos/400/250?random=1",
        },
        {
            title: "Laser Scar Removal",
            description:
                "Our advanced laser technology helps reduce acne scars, injury marks, and post-surgical scars by stimulating new skin regeneration with minimal downtime.",
            image: "https://picsum.photos/400/250?random=2",
        },
        {
            title: "Laser Hair Removal",
            description:
                "Get freedom from waxing and shaving with USFDA-approved laser hair removal. Suitable for all skin types and both men and women.",
            image: "https://picsum.photos/400/250?random=3",
        },
        {
            title: "HydraFacial – Instant Glow",
            description:
                "A globally loved facial that detoxifies, exfoliates, hydrates, and nourishes your skin—all in one session. Ideal for dull, dry, and sensitive skin types.",
            image: "https://picsum.photos/400/250?random=4",
        },
        {
            title: "Hyperpigmentation Treatment",
            description:
                "We treat melasma, sun spots, freckles, and uneven skin tone with customized peels, lasers, and serums that target the pigmentation.",
            image: "https://picsum.photos/400/250?random=5",
        },
        {
            title: "Hair Loss Treatment",
            description:
                "Get fuller, healthier hair with our PRP, mesotherapy, and growth factor treatments tailored to your scalp’s needs.",
            image: "https://picsum.photos/400/250?random=6",
        },
    ];

    return (
        <section className="py-16 bg-[var(--bg)]">
            <h2 className="text-center text-3xl font-bold mb-10 text-[var(--text)]">
                Our Signature Services
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                {treatments.map((service, idx) => (
                    <div
                        key={idx}
                        className="bg-[var(--sbg)] rounded-xl shadow-md p-6 flex flex-col justify-around 
                       hover:shadow-xl transition duration-300 group
                       h-[400px] w-full"
                    >
                        <div>
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-40 object-cover rounded-lg"
                            />
                            <h3 className="mt-4 text-lg font-semibold text-gray-200 line-clamp-2">
                                {service.title}
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                                {service.description}
                            </p>
                        </div>

                        <button
                            className="mt-4 px-5 py-2 bg-teal-600 text-white rounded-full text-sm 
                         hover:bg-teal-500 transition-all group-hover:scale-105"
                        >
                            Learn More
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};
