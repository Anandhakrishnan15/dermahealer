"use client";
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export const ProductCard = ({ product }) => {
    const router = useRouter();

    return (
        <motion.div
            className="group relative shrink-0 w-[480px] h-[300px] rounded-xl overflow-hidden shadow-lg cursor-pointer infinterscrool"
            onClick={() => router.push(`/treatments/${product.category}/${product.slug}`)}
            whileHover={{ y: -5 }}
        >
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${product.thumbnail})` }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-300"></div>
            </div>

            {/* Content container */}
            <div className="absolute bottom-0 w-full p-6 bg-black/30 text-white">
                <div className="relative z-10 flex justify-between items-end">
                    <div>
                        <h2 className="text-xl font-semibold">{product.title}</h2>
                        {product.description && (
                            <p className="mt-2 text-sm text-gray-200 line-clamp-2">
                                {product.description}
                            </p>
                        )}
                    </div>

                    {/* Icon button */}
                    <motion.button
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="rounded-full bg-indigo-600 p-2 text-white hover:bg-indigo-700 transition-colors duration-300"
                        aria-label={`View details for ${product.title}`}
                    >
                        <ChevronRight size={20} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};
