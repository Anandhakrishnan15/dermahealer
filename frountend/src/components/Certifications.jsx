"use client";

import React from "react";

const certificates = [
  { id: 1, title: "Advanced Dermatology Course", image: "https://ik.imagekit.io/e8fzvhk22/WhatsApp%20Image%202025-08-14%20at%206.35.05%20PM.jpeg?updatedAt=1755181072077" },
  { id: 2, title: "Clinical Dermatology Certificate", image: "https://ik.imagekit.io/e8fzvhk22/Adobe%20Scan%2014%20Aug%202025-pages-3.jpg?updatedAt=1755181012235" },
  { id: 3, title: "Cosmetic Dermatology Training", image: "https://ik.imagekit.io/e8fzvhk22/Adobe%20Scan%2014%20Aug%202025-pages-2.jpg?updatedAt=1755181012221" },
  { id: 4, title: "Skin Cancer Diagnosis Workshop", image: "https://ik.imagekit.io/e8fzvhk22/Adobe%20Scan%2014%20Aug%202025-pages-1.jpg?updatedAt=1755181012192" },
    { id: 5, title: "Pediatric Dermatology Specialization", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6bOSohq-llFYpvbCQJycTFHyBoG2TaqO39w&s" },
];

// Duplicate list for seamless looping
const duplicatedCertificates = [...certificates, ...certificates];

export default function AutoScrollingCertificates() {
    return (
        <>
            <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .scrolling-wrapper {
          display: flex;
          width: calc(200%);
          animation: scroll-right 20s linear infinite reverse; /* reverse makes it go left→right */
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

            <div className="max-w-full  py-6 overflow-hidden">
                <h2 className="text-5xl font-bold text-center">
                    Dermatology Certificates
                </h2>

                <div className="overflow-hidden no-scrollbar p-15">
                    <div className="scrolling-wrapper">
                        {duplicatedCertificates.map(({ id, title, image }, index) => (
                            <div
                                key={id + "-" + index}
                                className="flex-shrink-0 w-80 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer mx-3"
                            >
                                <img
                                    src={image}
                                    alt={title}
                                    className="w-full h-full object-contain rounded-t-lg"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
