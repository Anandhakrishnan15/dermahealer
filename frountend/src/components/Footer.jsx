"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import products from "../data/serviciess"; // ✅ Import all services

export default function Footer() {
    return (
        <footer className="bg-[var(--sbg)] text-gray-50 py-10 px-6">
            <div className="max-w-7xl mx-auto flex flex-wrap gap-8">

                {/* Logo + tagline */}
                <div className="w-full sm:w-[45%] md:w-[20%]">
                    <div className="flex items-center space-x-2 mb-4">
                        <img
                            src="/logo2.png"
                            alt="DermaHealer Logo"
                            className="h-10 w-auto object-contain"
                        />
                        <span className="font-bold text-xl">DermaHealer</span>
                    </div>
                    <p className="text-sm opacity-80">
                        Expert Skin & Laser Clinic in Bihar. Advanced USFDA-approved treatments for glowing skin.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="w-full sm:w-[45%] md:w-[15%]">
                    <h4 className="font-semibold mb-3">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:underline">Home</Link></li>
                        <li><Link href="/treatments" className="hover:underline">Treatments</Link></li>
                        <li><Link href="/about-us" className="hover:underline">About Us</Link></li>
                        <li><Link href="/blog" className="hover:underline">Blog</Link></li>
                        <li><Link href="/contact-us" className="hover:underline">Contact</Link></li>
                    </ul>
                </div>

                {/* Treatments List */}
                <div className="w-full md:w-[30%]">
                    <h4 className="font-semibold mb-3">Our Treatments</h4>
                    <ul className="space-y-2 text-sm pr-2">
                        {products.map((service, idx) => (
                            <li key={idx} className="truncate">
                                <a
                                    href={`/treatments/${service.category}/${service.slug}`}
                                    className="hover:underline block truncate"
                                    title={service.title}
                                >
                                    {service.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div className="w-full sm:w-[45%] md:w-[20%]">
                    <h4 className="font-semibold mb-3">Contact Us</h4>
                    <ul className="space-y-2 text-sm break-words">
                        <li>
                            📍 North of Gandhi Maidan <br />
                            Siwan – 841226 <br />
                            Bihar, India
                        </li>
                        <li>
                            📞 <a href="tel:+919931766933" className="hover:underline">+91 9931766933</a>
                        </li>
                        <li>
                            📞 <a href="tel:+919693601499" className="hover:underline">+91 9693601499</a>
                        </li>
                        <li className="break-all">
                            ✉ <a href="mailto:support@dermahealerindia.com" className="hover:underline">
                                support@dermahealerindia.com
                            </a>
                        </li>
                        <li>🕒 Mon–Sat: 10 AM – 5 PM</li>
                    </ul>
                </div>


                {/* Social Media */}
                <div className="w-full sm:w-[45%] md:w-[15%]">
                    <h4 className="font-semibold mb-3">Follow Us</h4>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/derma.healer.2025" target="_blank" className="hover:text-teal-400"><Facebook /></a>
                        <a href="https://www.instagram.com/dermahealerindia/?hl=en" target="_blank" className="hover:text-teal-400"><Instagram /></a>
                        <a href="https://www.linkedin.com/in/dr-neha-rani-012395ba/" target="_blank" className="hover:text-teal-400"><Linkedin /></a>
                        <a href="https://www.youtube.com/@dermahealerindia" target="_blank" className="hover:text-teal-400"><Youtube /></a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-10 border-t border-gray-600 pt-4 flex flex-col md:flex-row items-center justify-between text-sm opacity-80">
                <p>&copy; {new Date().getFullYear()} DermaHealer. All rights reserved.</p>

                <div className="flex items-center space-x-2 mt-2 md:mt-0">
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
                        className="h-6 w-6 object-contain"
                    />
                </div>
            </div>
        </footer>

    );
}
