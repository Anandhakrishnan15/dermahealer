// app/privacy/page.jsx

import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-16 px-6">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 md:p-12">

                <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                    Privacy Policy
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    We value your privacy. This page explains how we collect, use, and protect your
                    information when you use our website.
                </p>

                {/* Section */}
                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    Information We Collect
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We collect non-personal information such as the pages you visit, how long you stay,
                    the type of device you use, and general browsing behavior. This data does not
                    personally identify you.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    How We Use This Information
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    The information collected through Google Analytics is used solely to improve the
                    content, functionality, and performance of our website. We do not sell, trade, or
                    share this information with third parties for marketing purposes.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    Cookies
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Google Analytics may use cookies to help us analyze how visitors use the site. These
                    cookies do not contain personally identifiable information.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    Google Analytics
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our website uses Google Analytics to understand how visitors interact with our site.
                    Google Analytics collects information such as the pages you visit, the time you spend
                    on the site, the type of device you use, and other general usage data.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    This information is collected anonymously and is used only to improve the performance
                    and content of our website. No personally identifiable information (such as your name,
                    email, or phone number) is collected through Google Analytics.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    Opt-Out
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    If you prefer not to be tracked by Google Analytics, you can install the{" "}
                    <a
                        href="https://tools.google.com/dlpage/gaoptout"
                        className="text-teal-600 dark:text-teal-400 underline hover:opacity-80 transition"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Google Analytics Opt-out Browser Add-on
                    </a>
                    .
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    Data Security
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We take reasonable measures to protect the data collected through our website.
                    However, please note that no method of data transmission over the Internet is
                    completely secure.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    Changes to This Policy
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We may update this Privacy Policy from time to time. Any changes will be posted on
                    this page with an updated revision date.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
                    Contact
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    If you have any questions about this Privacy Policy, you can contact us at{" "}
                    <span className="font-medium text-teal-500">support@dermahealerindia.com</span>.
                </p>

                {/* CTA Section */}
                <div className="mt-10 flex flex-col md:flex-row gap-4">
                    <Link
                        href="/about-us"
                        className="px-6 py-3 rounded-xl bg-teal-600 text-white font-medium hover:bg-teal-700 transition text-center"
                    >
                        Learn More About Us
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
