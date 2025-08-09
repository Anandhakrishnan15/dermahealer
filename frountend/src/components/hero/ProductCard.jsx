"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react"; // or any other icon

export const ProductCard = ({ product }) => {
    const [showIcon, setShowIcon] = useState(false);

    return (
        <a
            href={product.link}
            className="group block relative shrink-0 w-[480px] h-[300px] rounded-xl overflow-hidden shadow-lg cursor-pointer infinterscrool"
            onClick={(e) => {
                if (window.innerWidth < 768) { // mobile
                    e.preventDefault();
                    window.location.href = product.link; // navigate immediately
                }
            }}
        >
            <motion.div
                className="relative h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${product.thumbnail})` }}
                whileHover={{ y: -5 }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-300"></div>

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

                        {/* Icon instead of button */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="rounded-full bg-indigo-600 p-2 text-white hover:bg-indigo-700 transition-colors duration-300"
                        >
                            <ChevronRight size={20} />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </a>
    );
};
