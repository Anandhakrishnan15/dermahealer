"use client";
import React from "react";
import { motion } from "framer-motion";

export const ProductCard = ({ product }) => {
    return (
        <a
            href={product.link}
            className="group block relative shrink-0 w-full max-w-sm sm:max-w-md md:max-w-lg rounded-lg overflow-hidden shadow-lg cursor-pointer h-full "
        >
            <motion.div
               
                className="relative h-full w-full flex flex-col justify-between p-4 bg-cover bg-center"
                style={{ backgroundImage: `url(${product.thumbnail})` }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-opacity-30 group-hover:bg-opacity-60 transition duration-300" />

                {/* Content container with backdrop blur */}
                <div
                    className="relative z-10 flex flex-col justify-end h-full text-white overflow-hidden rounded-md"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        padding: "1rem",
                    }}
                >
                    {/* Small background image inside the content box */}
                    <img
                        src={product.smallImage || product.thumbnail}
                        alt={`${product.title} background`}
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-20 pointer-events-none rounded-md"
                        style={{ zIndex: 0 }}
                    />

                    {/* Text content with higher z-index */}
                    <div className="relative z-10">
                        <h2 className="text-xl sm:text-2xl font-semibold drop-shadow-md">
                            {product.title}
                        </h2>
                        {product.description && (
                            <p className="mt-2 text-sm sm:text-base text-gray-200 drop-shadow-md">
                                {product.description}
                            </p>
                        )}
                        <button
                            type="button"
                            className="mt-4 inline-block self-start rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            View More
                        </button>
                    </div>
                </div>
            </motion.div>

        </a>
    );
};
