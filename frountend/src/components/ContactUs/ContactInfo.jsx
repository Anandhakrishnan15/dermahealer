"use client";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactInfo() {
    return (
        <div
            className="w-full border m-auto p-6 rounded-2xl shadow-md max-w-md md:max-w-none"
            style={{ background: "var(--card-bg)" }}
        >
            <h2 className="text-2xl font-semibold mb-6 text-center md:text-left text-[var(--text)]">
                Contact Information
            </h2>

            <div className="flex flex-col md:flex-row md:space-x-8 text-[var(--text)]">
                {/* Left column */}
                <div className="flex-1 space-y-6 mb-6 md:mb-0">
                    <div className="flex items-start space-x-3">
                        <MapPin className="text-teal-600 mt-1" size={20} />
                        <address className="not-italic">
                            <strong className="block">Address:</strong>
                            North of Gandhi Maidan <br />
                            Siwan – 841226 <br />
                            Bihar, India
                        </address>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Phone className="text-teal-600" size={20} />
                        <p>
                            <strong>Phone:</strong>{" "}
                            <a
                                href="tel:+919876543210"
                                className="text-teal-600 hover:underline"
                            >
                                +91 98765 43210
                            </a>
                        </p>
                    </div>
                </div>

                {/* Right column */}
                <div className="flex-1 space-y-6">
                    <div className="flex items-center space-x-3">
                        <Mail className="text-teal-600" size={20} />
                        <p>
                            <strong>Email:</strong>{" "}
                            <a
                                href="mailto:hello@clinic.com"
                                className="text-teal-600 hover:underline"
                            >
                                hello@clinic.com
                            </a>
                        </p>
                    </div>

                    <div className="flex items-start space-x-3">
                        <Clock className="text-teal-600 mt-1" size={20} />
                        <div>
                            <strong>Office Hours:</strong>
                            <ul className="mt-1 list-disc list-inside">
                                <li>
                                    Mon – Sat:{" "}
                                    <time dateTime="09:00">9:00 AM</time> –{" "}
                                    <time dateTime="17:00">5:00 PM</time>
                                </li>
                                <li>Sun: Closed</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
