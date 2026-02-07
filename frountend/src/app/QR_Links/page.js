"use client";

import Image from "next/image";
import { Instagram, Facebook, Globe, MapPin, Youtube } from "lucide-react";

export default function QRLinksPage() {
  // ✅ Generate once, client-side only, NO useEffect
  const [icons] = useStateSafeIcons();

  return (
    <main
      className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center
      bg-gradient-to-br from-[#2b80ff] via-[#1b5bd9] to-[#0a2a6c]
      text-white px-6"
    >
      {/* Floating icons */}
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
          priority
          className="rounded-full object-cover"
        />
      </div>

      <h1 className="text-3xl font-extrabold z-10">Derma Healer</h1>
      <p className="text-sm opacity-80 mb-8 z-10">Laser & Skin Care Clinic</p>

      <div className="w-full max-w-sm space-y-4 z-10">
        <LinkButton href="https://www.instagram.com/dermahealerindia/" icon={<Instagram size={20} />}>
          Instagram Profile
        </LinkButton>

        <LinkButton href="https://www.facebook.com/derma.healer.2025" icon={<Facebook size={20} />}>
          Facebook Profile
        </LinkButton>

        <LinkButton href="https://maps.app.goo.gl/TiVaxr4iGNtbHdxDA" icon={<MapPin size={20} />}>
          Google Maps
        </LinkButton>

        <LinkButton href="https://dermahealerindia.com" icon={<Globe size={20} />}>
          Website
        </LinkButton>

        <LinkButton href="https://www.youtube.com/@dermahealerindia" icon={<Youtube size={20} />}>
          YouTube Channel
        </LinkButton>
      </div>
    </main>
  );
}

/* ================= helpers ================= */

function useStateSafeIcons() {
  return [
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${5 + Math.random() * 5}s`,
      delay: `${Math.random() * 5}s`,
      type: i % 3,
    })),
  ];
}

function LinkButton({ href, icon, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 bg-white text-black py-3 px-5
        rounded-2xl font-semibold shadow-lg
        hover:scale-105 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-400
        hover:text-white transition-all"
    >
      {icon}
      {children}
    </a>
  );
}
