export default function FloatingCallButton() {
    return (
        <a
            href="tel:+919693601499"
            className="fixed bottom-6 right-6 z-[89] group"
        >
            {/* Tooltip */}
            <div
                className="
                absolute right-16 top-1/2 -translate-y-1/2
                bg-black text-white text-sm font-medium
                px-3 py-1.5 rounded-lg
                opacity-0 group-hover:opacity-100
                transition duration-300
                whitespace-nowrap
                shadow-xl
            "
            >
                Call Now
            </div>
            <div className="relative flex items-center justify-center">

                {/* Ring 1 */}
                <span className="absolute w-2 h-2 rounded-full border-2 border-green-400 animate-pingSlow "></span>

                {/* Ring 2 */}
                <span className="absolute w-5 h-5 rounded-full border-2 border-green-500 animate-pingSlow delay-200 "></span>

                {/* Ring 3 */}
                <span className="absolute w-8 h-8 rounded-full border-2 border-green-600 animate-pingSlow delay-400 "></span>

                {/* Ring 4 (max 16px) */}
                <span className="absolute w-11 h-11 rounded-full border-2 border-green-700 animate-pingSlow delay-600 "></span>

                {/* Phone Image */}
                <img
                    src="/3DPhone.png"
                    alt="Call"
                    className="
        relative
        w-16 h-16
        rotate-[30deg]
        hover:rotate-[20deg]
        animate-floaty
        drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]
        group-hover:scale-110
        transition-all duration-300
        z-10
    "
                />

            </div>

        </a>
    );
}
