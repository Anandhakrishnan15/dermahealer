"use client";
import React from "react";
import Link from "next/link";
import products from "../data/serviciess";

export const TopServicesPreview = () => {
    return (
        <section className="py-16 bg-[var(--bg)]">
            <h2 className="text-center text-3xl font-bold mb-10 text-[var(--text)]">
                Our Signature Services
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                {products.slice(0, 3).map((service, idx) => (
                    <div
                        key={idx}
                        className="bg-[var(--sbg)] rounded-xl shadow-md p-6 flex flex-col justify-between 
                       hover:shadow-xl transition duration-300 group
                       h-[400px] w-full"
                    >
                        <div>
                            <img
                                src={service.thumbnail}
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

                        <Link href={`/treatments/${service.category}/${service.slug}`}>
                            <button
                                className="mt-4 px-5 py-2 bg-teal-600 text-white rounded-full text-sm 
                                hover:bg-teal-500 transition-all group-hover:scale-105"
                            >
                                Learn More
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};
