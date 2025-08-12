export default function ContactInfo() {
    return (
        <div className="w-full border m-auto p-6 rounded shadow-md max-w-md md:max-w-none" style={{ background: "var(--card-bg)" }}>
            <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
                Contact Information
            </h2>

            <div className="flex flex-col md:flex-row md:space-x-8 text-[var(--text)]">
                {/* Left column */}
                <div className="flex-1 space-y-4 mb-6 md:mb-0">
                    <div>
                        <strong>Address:</strong>
                        <address className="not-italic mt-1">
                            123 Main Street<br />
                            Suite 456<br />
                            Springfield, XY 12345<br />
                            United States
                        </address>
                    </div>
                    <div>
                        <strong>Phone:</strong>{" "}
                        <a href="tel:+1234567890" className="text-blue-600 hover:underline">
                            +1 (234) 567-890
                        </a>
                    </div>
                </div>

                {/* Right column */}
                <div className="flex-1 space-y-4">
                    <div>
                        <strong>Email:</strong>{" "}
                        <a href="mailto:info@clinic.com" className="text-blue-600 hover:underline">
                            info@clinic.com
                        </a>
                    </div>
                    <div>
                        <strong>Office Hours:</strong>
                        <ul className="mt-1 list-disc list-inside">
                            <li>Mon - Fri: 9:00 AM - 6:00 PM</li>
                            <li>Sat: 9:00 AM - 2:00 PM</li>
                            <li>Sun: Closed</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
