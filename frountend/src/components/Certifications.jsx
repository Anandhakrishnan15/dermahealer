"use client";

import React from "react";

const certificates = [
  { id: 1, title: "Advanced Dermatology Course", image: "https://ik.imagekit.io/iwky7g0ee/Adobe%20Scan%2014%20Aug%202025-pages-2.webp?updatedAt=1755939065716" },
  { id: 2, title: "Clinical Dermatology Certificate", image: "https://ik.imagekit.io/iwky7g0ee/Adobe%20Scan%2014%20Aug%202025-pages-3.webp?updatedAt=1755939065681" },
  { id: 3, title: "Cosmetic Dermatology Training", image: "https://ik.imagekit.io/iwky7g0ee/Adobe%20Scan%2014%20Aug%202025-pages-1.webp?updatedAt=1755939065503" },
  { id: 4, title: "Skin Cancer Diagnosis Workshop", image: "https://ik.imagekit.io/iwky7g0ee/WhatsApp%20Image%202025-08-14%20at%206.35.05%20PM.webp?updatedAt=1755939065442" },
  { id: 5, title: "Pediatric Dermatology Specialization", image: "https://ik.imagekit.io/iwky7g0ee/images.jpg?updatedAt=1755939065029" },
];

// Duplicate list for seamless looping
const duplicatedCertificates = [...certificates, ...certificates];

export default function AutoScrollingCertificates() {
  return (
    <>
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scrolling-wrapper {
          display: flex;
          width: 200%;
          animation: scroll-left 20s linear infinite;
        }
        .scrolling-wrapper:hover {
          animation-play-state: paused;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-full py-12 overflow-hidden">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Dermatology Certificates
        </h2>

        <div className="overflow-hidden no-scrollbar px-6">
          <div className="scrolling-wrapper">
            {duplicatedCertificates.map(({ id, title, image }, index) => (
              <div
                key={id + "-" + index}
                className="flex-shrink-0 w-64 md:w-80 h-64 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer mx-3 bg-white dark:bg-gray-900"
              >
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover rounded-t-lg"
                  loading="lazy"
                />
                <div className="p-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  {title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
