"use client";

import { motion } from "framer-motion";

export const BeforeAfter = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <motion.section
            className="py-16 bg-[var(--bg)] text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.h2 className="text-4xl font-bold mb-6">
                <span className="">Before</span>
                <span className="mx-2 text-gray-600">&</span>
                <span className="text-[#3e4ad0]">After</span>
            </motion.h2>


            <p className="text-gray-400 max-w-xl mx-auto mb-10">
                See the transformation our treatments can bring. Real results from real clients.
            </p>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                {[
                    {
                        src:
                            "https://rejuvenationmdaesthetics.com/storage/2024/01/co2-laser-resurfacing-before-and-after-rewind-the-clock.webp",
                        alt: "Before treatment",
                        label: "Before",
                    },
                    {
                        src:
                            "https://www.houstonoculofacial.com/files/2016/12/CO2-Laser-Skin-Resurfacing-Before-After-Photo-4.jpg",
                        alt: "After treatment",
                        label: "After",
                    },
                ].map(({ src, alt, label }) => (
                    <motion.div
                        key={label}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="rounded-lg shadow-lg overflow-hidden cursor-pointer"
                    >
                        <img
                            src={src}
                            alt={alt}
                            className="w-full h-auto object-cover rounded-lg"
                            loading="lazy"
                            draggable={false}
                        />
                        <p className="mt-2 font-medium text-gray-700">{label}</p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};
