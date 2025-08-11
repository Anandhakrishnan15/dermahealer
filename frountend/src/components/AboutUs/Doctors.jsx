"use client";
import React from "react";

export default function Doctors() {
    return (
        <section className="max-w-6xl mx-auto py-16 px-6">
            <h2 className="text-4xl font-extrabold text-center mb-12 text-[var(--text)]">
                Meet Our Experts
            </h2>
            <div className="grid md:grid-cols-2 gap-10 text-center">
                {[ // Doctors data
                    {
                        name: "Dr. Neha Rani",
                        role: "Founder & Dermatologist",
                        img: "https://dermahealerindia.com//wp-content/uploads/2025/06/6e7a8a-2.png",
                    },
                    
                    {
                        name: "Dr. B.K. Sharma",
                        role: "Senior Dermatologist",
                        img: "https://dermahealerindia.com//wp-content/uploads/2025/06/6e7a8a-3.png",
                    },
                ].map((doc, i) => (
                    <div
                        key={i}
                        className="bg-[var(--sbg)] rounded-xl shadow-lg p-8 cursor-pointer transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                    >
                        <img
                            src={doc.img}
                            alt={doc.name}
                            className="w-52 h-52 rounded-full mx-auto object-cover mb-6 border-4 border-gradient-to-tr from-teal-400 via-cyan-400 to-sky-500"
                            style={{ borderImageSlice: 1, borderWidth: "4px" }}
                        />
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
