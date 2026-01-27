"use client";

import Link from "next/link";

export default function WorkingOnItPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4 overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 animate-pulse" />

            <div className="relative text-center bg-[var(--sbg)] p-10 rounded-2xl shadow-xl max-w-md w-full animate-fadeIn">
                {/* Spinner */}
                <div className="flex justify-center mb-6">
                    <div className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
                </div>

                <h1 className="text-3xl font-bold text-white mb-4 animate-slideUp">
                    🚧 We’re Working on It
                </h1>

                <p className="text-gray-300 mb-8 leading-relaxed animate-slideUp delay-100">
                    This page is currently under development.
                    Our team is crafting something great for you.
                    <br />
                    Please check back soon!
                </p>

                {/* Home Button */}
                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md
          hover:bg-blue-700 hover:scale-105 transition-all duration-300 animate-slideUp delay-200"
                >
                    ⬅ Go back to Home
                </Link>
            </div>

            {/* Animations */}
            <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
}
