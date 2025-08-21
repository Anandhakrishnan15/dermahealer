"use client";
import { useEffect, useRef } from "react";
import { annotate } from "rough-notation";

export default function Founders() {
    const headingRef = useRef(null);

    useEffect(() => {
        if (headingRef.current) {
            const annotation = annotate(headingRef.current, {
                type: "highlight",
                color: "#46ecd5", // cyan highlight
                iterations: 5,
                multiline: true,
            });
            annotation.show();
        }
    }, []);

    const doctors = [
        {
            name: "Dr. Neha Rani",
            role: "Founder & Dermatologist",
            img: "https://ik.imagekit.io/iwky7g0ee/6e7a8a-2.webp?updatedAt=1755608440235",
        },
        {
            name: "Dr. B.K. Sharma",
            role: "Senior Dermatologist",
            img: "https://ik.imagekit.io/iwky7g0ee/6e7a8a-3.webp?updatedAt=1755608439693",
        },
    ];

    return (
        <section className="max-w-6xl mx-auto py-16 px-6">
            {/* Heading with rough-notation highlight */}
            <h2 className="text-6xl font-extrabold text-center mb-12 text-[var(--text)]">
                Meet Our <span ref={headingRef}>Founders</span>
            </h2>

            {/* Doctors Grid */}
            <div className="grid md:grid-cols-2 gap-10 text-center">
                {doctors.map((doc, i) => (
                    <div
                        key={i}
                        className="relative bg-[var(--sbg)] rounded-xl shadow-lg p-8 cursor-pointer transform transition duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
                    >
                        {/* Gradient border wrapper */}
                        <div className="w-52 h-52 mx-auto mb-6 rounded-full bg-gradient-to-tr from-teal-400 via-cyan-400 to-sky-500 p-[3px]">
                            <img
                                src={doc.img}
                                alt={doc.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>

                        <h3 className="text-2xl font-semibold text-gray-200 mb-1">
                            {doc.name}
                        </h3>
                        <p className="text-teal-300 font-medium">{doc.role}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
