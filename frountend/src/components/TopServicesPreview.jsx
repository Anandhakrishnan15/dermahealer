"use client";
import React from "react";
import Link from "next/link";
import products from "../data/serviciess";

export const TopServicesPreview = ({ limit = null }) => {
    // If limit is null -> show all, otherwise slice
    const displayedServices = limit ? products.slice(0, limit) : products;

    return (
        <section className="py-8 bg-[var(--bg)]">
            {/* ✅ Heading + Subheading grouped */}
            <div className="text-center mt-5 mb-12">
                <span className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                    Our Signature Services
                </span>
                <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                    Explore our advanced dermatology treatments and specialized skincare services,
                    designed to enhance your natural beauty and address a wide range of skin concerns.
                </p>
            </div>

            {/* ✅ Services Grid */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                {displayedServices.map((service, idx) => (
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
                            <h4 className="text-sm font-semibold text-gray-500 line-clamp-2">
                                {service.subtitle}
                            </h4>
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

            {/* ✅ See More Button */}
            {limit && (
                <div className="flex justify-center mt-10">
                    <Link href="/treatments">
                        <button
                            className="px-6 py-2 bg-transparent border border-teal-600 text-teal-600 
                                       rounded-full text-sm font-medium hover:bg-teal-600 hover:text-white 
                                       transition-all"
                        >
                            See More →
                        </button>
                    </Link>
                </div>
            )}
        </section>
    );
};
