import { PhoneCall, Calendar } from "lucide-react";

export function StickyCTA() {
    return (
        <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-50">
            {/* Call Now */}
            <a
                href="tel:+1234567890"
                className="group relative flex items-center justify-center w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full shadow-lg text-white focus:outline-none focus:ring-4 focus:ring-green-300 transition"
                aria-label="Call Now"
                title="Call Now"
            >
                <PhoneCall size={24} />

                {/* Tooltip */}
                <span className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 scale-0 rounded bg-gray-900 px-3 py-1.5 text-sm text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap">
                    Call Now
                </span>
            </a>

            {/* Book Appointment */}
            <a
                href="#contact-form"
                className="group relative flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg text-white focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                aria-label="Book Appointment"
                title="Book Appointment"
            >
                <Calendar size={24} />

                {/* Tooltip */}
                <span className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 scale-0 rounded bg-gray-900 px-3 py-1.5 text-sm text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap">
                    Book Appointment
                </span>
            </a>
        </div>
    );
}
