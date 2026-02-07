// refund - and - cancellation
// app/refund-and-cancellation/page.jsx

import Link from "next/link";

export default function RefundAndCancellationPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-16 px-6">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 md:p-12">

                <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                    Refund & Cancellation Policy
                </h1>

                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    This policy outlines the terms related to cancellations and refunds for services
                    booked through our website. Please read it carefully before making a booking.
                </p>

                {/* Section */}
                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    Booking Confirmation
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    A booking is considered confirmed only after successful payment. Once confirmed,
                    the appointment slot is reserved exclusively for the customer.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    Cancellation Policy
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Cancellation requests must be made at least 24 hours prior to the scheduled
                    appointment time. Requests made after this period may not be accepted.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    Refund Policy
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Bookings once confirmed are non-refundable. In exceptional cases such as
                    duplicate payment or technical error, refunds may be processed after
                    verification.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    Refund Processing Time
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    If a refund is approved, the amount will be processed within 7–10 working days
                    to the original mode of payment, depending on the payment provider.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    No-Show Policy
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Failure to attend the appointment without prior cancellation will be treated
                    as a no-show, and no refund will be provided.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    Changes to This Policy
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We reserve the right to modify this Refund & Cancellation Policy at any time.
                    Changes will be effective immediately upon being posted on this page.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    Contact
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    For refund or cancellation related queries, please contact us at{" "}
                    <span className="font-medium text-teal-500">
                        support@dermahealerindia.com
                    </span>.
                </p>

                {/* CTA Section */}
                <div className="mt-10 flex flex-col md:flex-row gap-4">
                    <Link
                        href="/terms-and-conditions"
                        className="px-6 py-3 rounded-xl bg-teal-600 text-white font-medium hover:bg-teal-700 transition text-center"
                    >
                        View Terms & Conditions
                    </Link>
                    <Link
                        href="/contact-us"
                        className="px-6 py-3 rounded-xl border border-teal-600 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-gray-700 transition text-center"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
}
