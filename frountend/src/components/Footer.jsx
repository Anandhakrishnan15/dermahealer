"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import products from "../data/serviciess";

export default function Footer() {
    return (
        <footer className="bg-[var(--sbg)] text-gray-50 py-10 px-6">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-8">
                {/* Logo + Contact + Social */}
                <div className="w-full sm:w-[45%] md:w-[25%] flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <img
                            src="/logo2.png"
                            alt="DermaHealer Logo"
                            loading="eager"
                            className="h-10 w-auto object-contain"
                        />
                        <span className="font-bold text-xl">DermaHealer</span>
                    </div>
                    <p className="text-sm opacity-80">
                        Expert Skin & Laser Clinic in Bihar. Advanced USFDA-approved
                        treatments for glowing skin.
                    </p>

                    <h4 className="font-semibold mb-2">Contact Us</h4>
                    <ul className="space-y-2 text-sm">
                        <li>📍 North of Gandhi Maidan, Siwan – 841226, Bihar, India</li>
                        <li>
                            📞 <a href="tel:+919931766933" className="hover:underline hover:text-teal-400">+91 9931766933</a>
                        </li>
                        <li>
                            📞 <a href="tel:+919693601499" className="hover:underline hover:text-teal-400">+91 9693601499</a>
                        </li>
                        <li>
                            ✉ <a href="mailto:support@dermahealerindia.com" className="hover:underline hover:text-teal-400">support@dermahealerindia.com</a>
                        </li>
                        <li>🕒 Mon–Sat: 10 AM – 5 PM</li>
                    </ul>

                    <div className="mt-4">
                        <h4 className="font-semibold mb-2 text-sm">Follow Us</h4>
                        <div className="flex gap-4">
                            <a
                                href="https://www.facebook.com/derma.healer.2025"
                                target="_blank"
                                className="hover:text-teal-400"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/dermahealerindia/?hl=en"
                                target="_blank"
                                className="hover:text-teal-400"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/dr-neha-rani-012395ba/"
                                target="_blank"
                                className="hover:text-teal-400"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.youtube.com/@dermahealerindia"
                                target="_blank"
                                className="hover:text-teal-400"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Quick Links */}
               
<div className="w-auto min-w-[120px] ">
                    <h4 className="font-semibold mb-3 text-xl">Quick Links</h4>
                    <ul className="space-y-2">
                        {[
                            { href: "/", label: "Home" },
                            { href: "/treatments", label: "Treatments" },
                            { href: "/about-us", label: "About Us" },
                            { href: "/blog", label: "Blog" },
                            { href: "/contact-us", label: "Contact" },
                        ].map((link, i) => (
                            <li key={i}>
                                <Link
                                    href={link.href}
                                    className="hover:underline hover:text-teal-400 text-sm"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Treatments */}
                <div className="w-full md:flex-1 text-left md:text-center">
                    <h4 className="font-semibold mb-3 text-xl">Our Treatments</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {products.map((service, idx) => (
                            <Link
                                key={idx}
                                href={`/treatments/${service.category}/${service.slug}`}
                                className="text-sm truncate hover:underline hover:text-teal-400 transition"
                                title={service.title}
                            >
                                {service.title}
                            </Link>
                        ))}
                    </div>
                </div>



            </div>

            {/* Bottom Bar */}
            <div className="mt-10 border-t border-gray-600 pt-4 flex flex-col md:flex-row flex-wrap items-center justify-between text-sm opacity-80 gap-2">
                <p>&copy; {new Date().getFullYear()} DermaHealer. All rights reserved.</p>
                <div className="flex items-center gap-2">
                    <p>
                        Built by{" "}
                        <a
                            href="https://www.linkedin.com/in/anandha-krishnan-5b0a36248"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-teal-400 transition"
                        >
                            Anandhakrishnan
                        </a>
                    </p>
                    <img
                        src="https://ik.imagekit.io/e8fzvhk22/mylogo?updatedAt=1754921880920"
                        alt="Anandhakrishnan Logo"
                        loading="lazy"
                        className="h-7 w-7 object-contain"
                    />
                </div>
            </div>
        </footer>
    );
}
