"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

export default function ResponsiveImageGallery({
  images = [
    "/tretmegallary/1.png",
    "/tretmegallary/6.png",
    "/tretmegallary/3.png",
    "/tretmegallary/2.png",
    "/tretmegallary/5.png",
    "/tretmegallary/4.png",
  ],
  bigscrren = [
    "/introbanner/1.png",
    "/introbanner/3.png",
    "/introbanner/6.png",
    "/introbanner/4.png",
    "/introbanner/2.png",
    "/introbanner/5.png",
  ],
  className = "",
  radius = "rounded-2xl",
}) {
  const smallImages = images.slice(0, 6);
  const bigImages = bigscrren.slice(0, 6);

  const overlayTexts = [
    { title: "Acne", subtitle: "Clear Skin, Clear Confidence", link: "/treatments/skin/acne" },
    { title: "Acne Scar", subtitle: "Heal the Past, Reveal Fresh Skin", link: "/treatments/skin/acne-scar" },
    { title: "Hair Loss Treatment", subtitle: "Regrow Naturally, Revive Confidence", link: "/treatments/hair/hair-loss" },
    { title: "Tattoo Removal", subtitle: "Undo the Ink, Refresh Your Skin", link: "/treatments/skin/tattoo-removal" },
    { title: "HIFU", subtitle: "Non-Surgical Face Lift", link: "/treatments/skin/hifu" },
    { title: "Urinary Incontinence", subtitle: "Regain Control, Restore Freedom", link: "/treatments/women/urinary-incontinence" },
  ];

  return (
    <section className={`w-full px-2 py-3 ${className}`}>
      {/* ✅ Big screen layout */}
      <div className="hidden md:flex flex-wrap justify-center gap-4">
        {bigImages.map((src, idx) => (
          <div
            key={idx}
            className={`relative overflow-hidden ${radius} shadow-sm w-[calc(50.33%-1rem)] 
          opacity-0 translate-y-10 animate-fade-slide-up`}
            style={{ animationDelay: `${idx * 150}ms` }} // stagger effect
          >
            <img
              src={src}
              alt={`Gallery image ${idx + 1}`}
              className="w-full h-64 object-cover transition-transform duration-300 ease-out hover:scale-105"
              loading="lazy"
              decoding="async"
            />

            {/* Overlay Text */}
            <div className="absolute top-0 right-0 h-full w-1/2 text-black p-4 sm:p-3 flex flex-col justify-center space-y-2 sm:space-y-1">
              <div className="flex items-center gap-2 sm:gap-1 mb-3 sm:mb-2">
                <img
                  src="/logo2.png"
                  alt="Derma Healer Logo"
                  className="w-10 h-10 sm:w-8 sm:h-8 rounded-full shadow-lg"
                />
                <span className="text-lg sm:text-sm font-semibold tracking-wide">
                  Derma Healer
                </span>
              </div>

              <h3 className="text-3xl md:text-2xl sm:text-lg font-serif font-bold tracking-wide">
                {overlayTexts[idx].title}
              </h3>

              <p className="relative inline-block text-lg md:text-base sm:text-sm mt-1 line-clamp-2">
                {overlayTexts[idx].subtitle}
                <span className="block w-50 h-[2px] bg-teal-400"></span>
              </p>

              <p className="text-sm md:text-xs sm:text-[10px] opacity-90 leading-snug line-clamp-2">
                {overlayTexts[idx].description}
              </p>

              <a
                href={overlayTexts[idx].link}
                className="mt-3 sm:mt-2 w-48 inline-block bg-gradient-to-r from-teal-400 via-teal-500 to-emerald-500 
              hover:from-teal-500 hover:via-teal-600 hover:to-emerald-600 
              text-white font-medium px-4 sm:px-3 py-2 sm:py-1.5 
              rounded-lg shadow-lg text-lg sm:text-base transition-transform transform hover:scale-105"
              >
                Explore Treatments →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Small screen layout */}
      <div className="flex flex-wrap justify-center gap-2 md:hidden">
        {smallImages.map((src, idx) => (
          <div
            key={idx}
            className="opacity-0 translate-y-10 animate-fade-slide-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <Link href={overlayTexts[idx].link} passHref>
              <img
                src={src}
                alt={`Gallery image ${idx + 1}`}
                className="h-60 max-[425px]:h-50 max-[344px]:h-44 object-contain transition-transform duration-300 ease-out hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </Link>
          </div>
        ))}
      </div>
    </section>

  );
}
