// app/terms-and-conditions/page.jsx

import Link from "next/link";

export default function TermsAndConditionsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-16 px-6">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 md:p-12">

                <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                    Terms & Conditions
                </h1>

                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    By accessing or using this website, you agree to comply with and be bound by
                    the following terms and conditions. Please read them carefully before using
                    our services.
                </p>

                {/* Section */}
                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    Services
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Derma Healer India provides dermatology and skin care related services through
                    online booking and consultation. All services listed on this website are
                    subject to availability.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    Booking & Payments
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Payments made on this website are required to confirm bookings for services.
                    A booking is considered confirmed only after successful payment.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    Pricing
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    All prices mentioned on the website are inclusive of applicable taxes unless
                    stated otherwise. Prices are subject to change without prior notice.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    Cancellation & Refund
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Bookings once confirmed are non-refundable. Cancellation requests must be
                    made at least 24 hours prior to the scheduled appointment time.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    User Responsibilities
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Users agree to provide accurate and complete information during booking.
                    Any misuse of the website or services may result in restricted or terminated
                    access.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    Intellectual Property
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    All content on this website, including text, images, logos, and design
                    elements, is the property of Derma Healer India and may not be reused without
                    prior written permission.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    Limitation of Liability
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Derma Healer India shall not be liable for any indirect, incidental, or
                    consequential damages arising from the use of this website or services.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    Changes to Terms
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We reserve the right to update or modify these terms at any time. Changes will
                    be effective immediately upon being posted on this page.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    Contact
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    If you have any questions regarding these Terms & Conditions, please contact us
                    at{" "}
                    <span className="font-medium text-teal-500">
                        support@dermahealerindia.com
                    </span>.
                </p>

                {/* CTA Section */}
                <div className="mt-10 flex flex-col md:flex-row gap-4">
                    <Link
                        href="/privacy-policy"
                        className="px-6 py-3 rounded-xl bg-teal-600 text-white font-medium hover:bg-teal-700 transition text-center"
                    >
                        View Privacy Policy
                    </Link>
                    <Link
                        href="/contact-us"
                        className="px-6 py-3 rounded-xl border border-teal-600 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-gray-700 transition text-center"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
}
