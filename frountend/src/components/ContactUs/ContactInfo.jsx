export default function ContactInfo() {
    return (
        <div
            className="w-full border m-auto p-6 rounded shadow-md max-w-md md:max-w-none"
            style={{ background: "var(--card-bg)" }}
        >
            <h2 className="text-2xl font-semibold mb-6 text-center md:text-left text-[var(--text)]">
                Contact Information
            </h2>

            <div className="flex flex-col md:flex-row md:space-x-8 text-[var(--text)]">
                {/* Left column */}
                <div className="flex-1 space-y-4 mb-6 md:mb-0">
                    <div>
                        <strong>Address:</strong>
                        <address className="not-italic mt-1">
                            North of Gandhi Maidan <br />
                            Siwan – 841226 <br />
                            Bihar, India
                        </address>
                    </div>
                    <div>
                        <strong>Phone:</strong>{" "}
                        <a
                            href="tel:+919876543210"
                            className="text-teal-600 hover:underline"
                        >
                            +91 98765 43210
                        </a>
                    </div>
                </div>

                {/* Right column */}
                <div className="flex-1 space-y-4">
                    <div>
                        <strong>Email:</strong>{" "}
                        <a
                            href="mailto:hello@clinic.com"
                            className="text-teal-600 hover:underline"
                        >
                            hello@clinic.com
                        </a>
                    </div>
                    <div>
                        <strong>Office Hours:</strong>
                        <ul className="mt-1 list-disc list-inside">
                            <li>Mon – Sat: 9:00 AM – 5:00 PM</li>
                            <li>Sun: Closed</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
