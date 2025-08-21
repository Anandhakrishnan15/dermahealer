"use client";
import { MapPin, Mail, Phone, Clock, MessageCircle } from "lucide-react";

export default function ContactInfo() {
    return (
        <div
            className="w-full border m-auto p-8 rounded-2xl shadow-md max-w-3xl "
            style={{ background: "var(--card-bg)" }}
        >
            {/* Quote */}
            <p className="italic text-lg mb-4 text-center text-[var(--text)]">
                “Glowing skin starts with a conversation — reach out to us!”
            </p>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-[var(--heading)]">
                Contact Information
            </h2>


            {/* Row 1: Address + Email/Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[var(--text)]">
                {/* Address */}
                <div className="flex items-start gap-3">
                    <MapPin className="text-teal-600 mt-1 flex-shrink-0" size={22} />
                    <div>
                        <h3 className="font-semibold text-lg text-[var(--heading)]">Address</h3>
                        <address className="not-italic leading-relaxed">
                            North of Gandhi Maidan <br />
                            Siwan – 841226 <br />
                            Bihar, India
                        </address>
                        <a
                            href="https://maps.google.com/?q=North+of+Gandhi+Maidan,+Siwan"
                            target="_blank"
                            className="text-teal-600 hover:underline text-sm mt-1 inline-block"
                        >
                            📍 View on Google Maps
                        </a>
                    </div>
                </div>

                {/* Email + Phone + WhatsApp */}
                <div className="space-y-4">
                    {/* Email */}
                    <div className="flex items-start gap-3">
                        <Mail className="text-teal-600 mt-1 flex-shrink-0" size={22} />
                        <div>
                            <h3 className="font-semibold text-lg text-[var(--heading)]">Email</h3>
                            <a
                                href="mailto:hello@clinic.com"
                                className="text-teal-600 hover:underline"
                            >
                                hello@clinic.com
                            </a>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-3">
                        <Phone className="text-teal-600 mt-1 flex-shrink-0" size={22} />
                        <div>
                            <h3 className="font-semibold text-lg text-[var(--heading)]">Phone</h3>
                            <a
                                href="tel:+919876543210"
                                className="text-teal-600 hover:underline"
                            >
                                +91 98765 43210
                            </a>
                        </div>
                    </div>

                    {/* WhatsApp (optional) */}
                    {/* <div className="flex items-start gap-3">
                        <Phone className="text-green-600 mt-1 flex-shrink-0" size={22} />
                        <div>
                            <h3 className="font-semibold text-lg text-[var(--heading)]">
                                WhatsApp
                            </h3>
                            <a
                                href="https://wa.me/919876543210"
                                target="_blank"
                                className="text-green-600 hover:underline"
                            >
                                Chat with us
                            </a>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* Row 2: Office Hours */}
            <div className="mt-10 flex items-start gap-3">
                <Clock className="text-teal-600 mt-1 flex-shrink-0" size={22} />
                <div>
                    <h3 className="font-semibold text-lg text-[var(--heading)] flex items-center gap-2">
                       
                        We’re Here For You
                    </h3>

                    <ul className="grid grid-cols-2 gap-y-2 text-sm md:text-base">
                        <li className="col-span-1 font-medium">Monday – Saturday</li>
                        <li className="col-span-1 text-right">
                            <time dateTime="09:00">9:00 AM</time> –{" "}
                            <time dateTime="17:00">5:00 PM</time>
                        </li>

                        <li className="col-span-1 font-medium">Sunday</li>
                        <li className="col-span-1 text-right text-red-500 font-medium">Closed</li>
                    </ul>

                </div>
            </div>
        </div>



    );
}
