"use client";

import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import { StickyCTA } from "./StickyCTA";
import { motion } from "framer-motion";
import { Stethoscope, Hospital, MapPin } from "lucide-react";

const doctors = [
    {
        name: "Dr. Neha Rani",
        specialization: "MBBS, Aesthetic Physician",
        experience: "5+ years of clinical experience. ",
        image: "https://ik.imagekit.io/iwky7g0ee/6e7a8a-2.webp?updatedAt=1755608440235", // replace with real
    },
    {
        name: "Dr. B.K. Sharma",
        specialization: "MBBS, MD (Skin & VD)",
        experience: "30+ years of experience.",
        image: "https://ik.imagekit.io/iwky7g0ee/6e7a8a-3.webp?updatedAt=1755608439693",
    },
   
];

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[var(--form-bg)] text-[var(--text)] py-8 px-4 md:px-6">
            {/* Heading */}
            <div className="text-center max-w-2xl mx-auto mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
                    <span className="text-[var(--heading)]">Let’s</span>{" "}
                    <span className="bg-gradient-to-r from-indigo-400 to-teal-500 bg-clip-text text-transparent">
                        Glow Together  
                    </span>
                    <motion.span
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="inline-block"
                    >
                        ✨
                    </motion.span>
                </h1>

                <p className="text-base md:text-lg text-[var(--navbar-text)]">
                    Book a visit, ask us anything about your skin, or share feedback —
                    we’d love to hear from you.
                </p>
            </div>

            {/* Info + Form */}
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto items-stretch">
                {/* Left Info Section with Doctors below */}
                <div className=" flex flex-col gap-6 ">
                    <ContactInfo />

                    {/* Our Experts Section */}
                    <div>
                        

                        <h2 className="text-lg md:text-xl font-semibold mb-3 text-[var(--text)] flex items-center gap-2 justify-center">
                            <Stethoscope className="w-5 h-5 text-teal-600" />
                            Our Skin Experts
                            <Hospital className="w-5 h-5 text-teal-600" />
                        </h2>

                        <div className="grid  sm:grid-cols-2 gap-4">
                            {doctors.map((doc, index) => (
                                <div
                                    key={index}
                                    className=" rounded-lg p-3 flex items-center gap-3 shadow-sm border border-[var(--primary)]"
                                    style={{ background: "var(--card-bg)" }}
                                >
                                    <img
                                        src={doc.image}
                                        alt={doc.name}
                                        className="w-20 h-20 object-cover rounded-full border-2 border-[var(--primary)]"
                                    />
                                    <div className="text-left">
                                        <h3 className="text-sm font-semibold text-[var(--text)]  ">
                                            {doc.name}
                                        </h3>
                                        <p className="text-xs text-[var(--nav)]">
                                            {doc.specialization}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {doc.experience}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Contact Form */}
                <div className="flex flex-col justify-center">
                    {/* <h2 className="text-xl font-semibold mb-2 text-[var(--heading)]">
                        Drop Us a Message 💌
                    </h2>
                    <p className="mb-4 text-gray-600 dark:text-gray-300 text-sm">
                        Fill in the form and our skin experts will get back to you.
                    </p> */}
                    <ContactForm />
                </div>
            </div>

            {/* Google Map Section */}
            <div className="mt-12 max-w-6xl mx-auto text-center">
                <h2 className="text-2xl md:text-4xl font-semibold mb-2 flex items-center justify-center gap-2">
                    <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <MapPin className="w-6 h-6 text-teal-600" />
                    </motion.div>
                    <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                        Find Us
                    </span>
                </h2>

                <p className="text-[var(--navbar-text)] mb-4 text-sm md:text-base">
                    Visit our clinic and let your skin shine brighter!
                </p>

                <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d835.4004106644066!2d84.35932447714788!3d26.228171211501024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3992fc1cb19b4cc3%3A0xb8fe7ccdf85b1005!2sDERMA%20HEALER%20-%20Laser%20%26%20Skin%20Care%20Clinic!5e1!3m2!1sen!2sin!4v1755449194608!5m2!1sen!2sin"
                        width="100%"
                        height="320"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </div>

             {/* <CTASection /> */}
            <StickyCTA />
        </div>
    );
}
