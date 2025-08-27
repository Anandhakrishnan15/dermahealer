"use client";

import { useEffect, useState } from "react";
import { Instagram, Facebook, Globe, MapPin, Youtube } from "lucide-react";

export default function QRLinksPage() {
    const [icons, setIcons] = useState([]);

    useEffect(() => {
        // Generate once on client
        const generated = [...Array(12)].map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            duration: `${5 + Math.random() * 5}s`,
            delay: `${Math.random() * 5}s`,
            type: i % 3,
        }));
        setIcons(generated);
    }, []);

    return (
        <main className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center 
                         bg-gradient-to-br from-[#2b80ff] via-[#1b5bd9] to-[#0a2a6c] 
                         text-white px-6">

            {/* Floating falling icons background */}
            <div className="absolute inset-0 pointer-events-none">
                {icons.map((icon) => (
                    <div
                        key={icon.id}
                        className="absolute top-[-50px] text-white opacity-50 animate-fall"
                        style={{
                            left: icon.left,
                            animationDuration: icon.duration,
                            animationDelay: icon.delay,
                        }}
                    >
                        {icon.type === 0 && <Instagram size={28} className="text-pink-400" />}
                        {icon.type === 1 && <Facebook size={28} className="text-blue-400" />}
                        {icon.type === 2 && <Youtube size={28} className="text-red-500" />}
                    </div>
                ))}
            </div>

            {/* Logo in glass card with float animation */}
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-md shadow-xl mb-4 animate-float z-10">
                <img
                    src="/logo2.png"
                    alt="Derma Healer Logo"
                    className="w-28 h-28 rounded-full object-cover drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
                />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-extrabold tracking-wide z-10">Derma Healer</h1>
            <p className="text-sm opacity-80 mb-8 z-10">Laser & Skin Care Clinic</p>

            {/* Buttons */}
            <div className="w-full max-w-sm space-y-4 z-10">
                {/* Instagram */}
                <a
                    href="https://www.instagram.com/dermahealerindia/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white text-black py-3 px-5 
                               rounded-2xl font-semibold shadow-lg 
                               hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400 
                               hover:text-white hover:scale-105 transition-all duration-300"
                >
                    <Instagram className="text-pink-500 group-hover:text-white" size={20} /> Instagram Profile
                </a>

                {/* Facebook */}
                <a
                    href="https://www.facebook.com/derma.healer.2025"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white text-black py-3 px-5 
                               rounded-2xl font-semibold shadow-lg 
                               hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-400 
                               hover:text-white hover:scale-105 transition-all duration-300"
                >
                    <Facebook className="text-blue-600 group-hover:text-white" size={20} /> Facebook Profile
                </a>

                {/* Maps */}
                <a
                    href="https://maps.app.goo.gl/TiVaxr4iGNtbHdxDA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white text-black py-3 px-5 
                               rounded-2xl font-semibold shadow-lg 
                               hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 
                               hover:text-white hover:scale-105 transition-all duration-300"
                >
                    <MapPin className="text-red-500 group-hover:text-white" size={20} /> Google Maps
                </a>

                {/* Website */}
                <a
                    href="https://dermahealerindia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white text-black py-3 px-5 
                               rounded-2xl font-semibold shadow-lg 
                               hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-400 
                               hover:text-white hover:scale-105 transition-all duration-300"
                >
                    <Globe className="text-green-600 group-hover:text-white" size={20} /> Website
                </a>

                {/* YouTube */}
                <a
                    href="https://www.youtube.com/@dermahealerindia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white text-black py-3 px-5 
                               rounded-2xl font-semibold shadow-lg 
                               hover:bg-gradient-to-r hover:from-red-600 hover:to-rose-500 
                               hover:text-white hover:scale-105 transition-all duration-300"
                >
                    <Youtube className="text-red-600 group-hover:text-white" size={20} /> YouTube Channel
                </a>
            </div>

            {/* Social icons row */}
            <div className="flex gap-8 mt-12 z-10">
                <a
                    href="https://www.instagram.com/dermahealerindia/?hl=en"
                    target="_blank"
                    className="hover:scale-125 transition-transform duration-300"
                >
                    <Instagram size={36} className="text-pink-400 drop-shadow-lg hover:drop-shadow-[0_0_12px_rgba(236,72,153,0.7)]" />
                </a>
                <a
                    href="https://www.facebook.com/derma.healer.2025"
                    target="_blank"
                    className="hover:scale-125 transition-transform duration-300"
                >
                    <Facebook size={36} className="text-blue-400 drop-shadow-lg hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.7)]" />
                </a>
                <a
                    href="https://www.youtube.com/@dermahealerindia"
                    target="_blank"
                    className="hover:scale-125 transition-transform duration-300"
                >
                    <Youtube size={36} className="text-red-500 drop-shadow-lg hover:drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]" />
                </a>
            </div>
        </main>
    );
}
