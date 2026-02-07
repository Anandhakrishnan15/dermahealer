"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Instagram, Facebook, Globe, MapPin, Youtube } from "lucide-react";

export default function QRLinksPage() {
    const [icons, setIcons] = useState([]);

    // Generate random icons ONLY on client after mount
    useEffect(() => {
        const generated = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            duration: `${5 + Math.random() * 5}s`,
            delay: `${Math.random() * 5}s`,
            type: i % 3,
        }));

        setIcons(generated);
    }, []);

    return (
        <main
            className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center
            bg-gradient-to-br from-[#2b80ff] via-[#1b5bd9] to-[#0a2a6c]
            text-white px-6"
        >
            {/* Floating falling icons background */}
            <div className="absolute inset-0 pointer-events-none">
                {icons.map((icon) => (
                    <div
                        key={icon.id}
                        className="absolute top-[-50px] opacity-50 animate-fall"
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

            {/* Logo */}
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-md shadow-xl mb-4 animate-float z-10">
                <Image
                    src="/logo2.png"
                    alt="Derma Healer Logo"
                    width={112}
                    height={112}
                    className="rounded-full object-cover drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
                    priority
                />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-extrabold tracking-wide z-10">
                Derma Healer
            </h1>
            <p className="text-sm opacity-80 mb-8 z-10">
                Laser & Skin Care Clinic
            </p>

            {/* Buttons */}
            <div className="w-full max-w-sm space-y-4 z-10">
                <LinkButton
                    href="https://www.instagram.com/dermahealerindia/?hl=en"
                    icon={<Instagram size={20} />}
                    hover="hover:from-pink-500 hover:to-orange-400"
                >
                    Instagram Profile
                </LinkButton>

                <LinkButton
                    href="https://www.facebook.com/derma.healer.2025"
                    icon={<Facebook size={20} />}
                    hover="hover:from-blue-600 hover:to-indigo-400"
                >
                    Facebook Profile
                </LinkButton>

                <LinkButton
                    href="https://maps.app.goo.gl/TiVaxr4iGNtbHdxDA"
                    icon={<MapPin size={20} />}
                    hover="hover:from-red-500 hover:to-orange-500"
                >
                    Google Maps
                </LinkButton>

                <LinkButton
                    href="https://dermahealerindia.com"
                    icon={<Globe size={20} />}
                    hover="hover:from-green-600 hover:to-emerald-400"
                >
                    Website
                </LinkButton>

                <LinkButton
                    href="https://www.youtube.com/@dermahealerindia"
                    icon={<Youtube size={20} />}
                    hover="hover:from-red-600 hover:to-rose-500"
                >
                    YouTube Channel
                </LinkButton>
            </div>

            {/* Bottom icons */}
            <div className="flex gap-8 mt-12 z-10">
                <SocialIcon href="https://www.instagram.com/dermahealerindia/?hl=en">
                    <Instagram size={36} className="text-pink-400" />
                </SocialIcon>

                <SocialIcon href="https://www.facebook.com/derma.healer.2025">
                    <Facebook size={36} className="text-blue-400" />
                </SocialIcon>

                <SocialIcon href="https://www.youtube.com/@dermahealerindia">
                    <Youtube size={36} className="text-red-500" />
                </SocialIcon>
            </div>
        </main>
    );
}

/* Reusable components */

function LinkButton({ href, icon, hover, children }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 bg-white text-black py-3 px-5
            rounded-2xl font-semibold shadow-lg
            hover:bg-gradient-to-r ${hover}
            hover:text-white hover:scale-105 transition-all duration-300`}
        >
            {icon}
            {children}
        </a>
    );
}

function SocialIcon({ href, children }) {
    return (
        <a
            href={href}
            target="_blank"
            className="hover:scale-125 transition-transform duration-300 drop-shadow-lg"
        >
            {children}
        </a>
    );
}
