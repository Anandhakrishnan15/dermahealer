"use client";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-transparent backdrop-blur-xl">
            {/* Logo with bounce + breathing glow */}
            <div className="w-24 h-24 relative">
                <img
                    src="/icon0.svg"
                    alt="Loading Icon"
                    loading="eager"
                    width={96}
                    height={96}
                    className="animate-bounce animate-[breath_3s_ease-in-out_infinite] drop-shadow-[0_0_25px_rgba(45,212,191,0.7)]"
                />
            </div>

            {/* Brand name with gradient + shimmer */}
            <p className="mt-4 text-3xl font-extrabold bg-gradient-to-r from-teal-300 via-emerald-400 to-teal-500 bg-clip-text text-transparent relative">
                <span className="relative inline-block">
                    Derma Healer
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-200%] animate-[shine_3s_linear_infinite]" />
                </span>
            </p>

            {/* Sub tagline with fade-in */}
            <p className="text-sm md:text-base text-[var(--text)] mt-3 tracking-[0.15em] uppercase animate-fadeIn">
                Revive • Restore • Rejuvenate
            </p>

            {/* Extra animations */}
            <style jsx>{`
        @keyframes shine {
          100% {
            transform: translateX(200%);
          }
        }
        @keyframes breath {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(45, 212, 191, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 25px rgba(45, 212, 191, 0.9));
          }
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1.8s ease-out forwards;
        }
      `}</style>
        </div>
    );
}
