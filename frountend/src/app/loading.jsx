"use client";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-transparent backdrop-blur-xl">
            {/* SVG with subtle floating effect */}
            <div className="w-24 h-24 relative">
                <img
                    src="/icon0.svg"
                    alt="Loading Icon"
                    width={96}
                    height={96}
                    className="animate-bounce drop-shadow-[0_0_25px_rgba(45,212,191,0.7)]"
                />
            </div>

            {/* Main brand line with gradient & shimmer */}
            <p className="mt-4 text-3xl font-extrabold bg-gradient-to-r from-teal-300 via-emerald-400 to-teal-500 bg-clip-text text-transparent animate-pulse relative">
                <span className="relative inline-block">
                    Derma Healer
                    {/* Shine effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent translate-x-[-200%] animate-[shine_2s_linear_infinite]" />
                </span>
            </p>

            {/* Sub tagline */}
            <p className="text-sm md:text-base text-[var(--text)] mt-2 tracking-[0.15em] uppercase">
                Revive • Restore • Rejuvenate
            </p>

            {/* Keyframes for shine */}
            <style jsx>{`
        @keyframes shine {
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
        </div>
    );
}
