"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const doctors = [
    {
        name: "Dr. B.K. Sharma, MBBS, MD (Skin & VD)",
        img: "https://ik.imagekit.io/iwky7g0ee/6e7a8a-3.webp?updatedAt=1755608439693",
        qualification: "Senior consultant dermatologist with 30+ years of experience.",
        specialization:
            "Chronic skin diseases, STD management, vitiligo, psoriasis, eczema, leprosy, and advanced medical dermatology.",
        achievements: [
            "Lifetime member of IADVL (Indian Association of Dermatologists, Venereologists, and Leprologists)",
        ],
        about:
            "Dr. B.K. Sharma brings a wealth of knowledge and decades of experience to the Derma Healer team. Known for his diagnostic acumen and empathetic care, he ensures patients receive trustworthy and result-oriented treatments.",
    },
    {
        name: "Dr. Neha Rani, MBBS, Aesthetic Physician",
        img: "/1754664907584.jpg",
        qualification: "5+ years of clinical experience.",
        specialization:
            "Laser treatments, acne & scar management, pigmentation correction, vitiligo, anti-aging therapies, and hair loss treatments.",
        achievements: ["Certified in advanced laser technologies"],
        about:
            "Dr. Neha Rani is known for her patient-centric approach and expertise in aesthetic dermatology. Her mission is to provide personalized skin solutions using the safest and latest techniques.",
    },
];

export const QuickIntroUSP = () => {
    const [index, setIndex] = useState(0);
    const router = useRouter();

    // Auto switch every 8s
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % doctors.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const doctor = doctors[index];
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, margin: "-100px" });

    const sectionVariant = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <section
            ref={sectionRef}
            className="py-16 bg-[var(--sbg)]"
        >
            <motion.h2
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={sectionVariant}
                className="text-center text-3xl md:text-4xl font-extrabold tracking-tight text-gray-100 mb-12"
            >
                Specialists Behind <span className="text-indigo-500">Derma Healer</span>
            </motion.h2>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10 px-4">
                {/* Animated Image */}
                <AnimatePresence mode="wait">
                    <motion.img
                        key={doctor.img}
                        src={doctor.img}
                        alt={doctor.name}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full rounded-xl shadow-lg"
                    />
                </AnimatePresence>

                {/* Text Content */}
                <div className="text-center md:text-left max-w-lg">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={doctor.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-snug mb-3">
                                <span className="block text-4xl text-gray-100">{doctor.name}</span>
                            </h1>

                            <p className="text-base text-gray-300 leading-relaxed mb-2">
                                <strong>Qualification & Experience:</strong> {doctor.qualification}
                            </p>

                            <p className="text-base text-gray-300 leading-relaxed mb-2">
                                <strong>Specialization:</strong> {doctor.specialization}
                            </p>

                            <ul className="list-disc list-inside text-gray-300 text-sm mb-3">
                                {doctor.achievements.map((ach, i) => (
                                    <li key={i}>{ach}</li>
                                ))}
                            </ul>

                            <p className="text-gray-300 text-sm leading-relaxed">{doctor.about}</p>

                            <motion.a
                                href="#appointment"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="mt-6 inline-block px-5 py-2.5 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-500 transition"
                                onClick={() => router.push("/book-appointment")}
                            >
                                Get an Appointment
                            </motion.a>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
