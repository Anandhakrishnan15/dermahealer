"use client"
import { motion } from "framer-motion";

export const QuickIntroUSP = () => {
    return (
        <section className="py-16 bg-[var(--sbg)]">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10 px-4">

                {/* Animated Image on Left */}
                <motion.img
                    src="https://media.licdn.com/dms/image/v2/D5603AQGAtIi2spihSA/profile-displayphoto-shrink_800_800/B56ZiKLVkjHUAc-/0/1754664907584?e=1757548800&v=beta&t=YklSdZ1iRxbPkrrDpfj_oLmr4MQKrJk15WRLEX9_0_c"
                    alt="Derma Healer - Best Skin & Laser Clinic in Siwan Bihar"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full rounded-xl shadow-lg"
                />

                {/* Text Content */}
                <div className="text-center md:text-left max-w-lg">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight leading-snug"
                        style={{ letterSpacing: "-0.5px" }}
                    >
                        <span className="block">Derma Healer</span>
                        <span className="block text-indigo-600 dark:text-indigo-400">
                            Skin & Laser Experts in Siwan
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="mt-4 text-base text-gray-600 dark:text-gray-300 leading-relaxed"
                    >
                        Led by <strong>Dr. Neha Rani</strong> and <strong>Dr. B.K. Sharma</strong>, we offer
                        advanced, USFDA-approved treatments for <strong>acne</strong>, <strong>pigmentation</strong>,
                        <strong> laser hair removal</strong>, <strong>anti-aging</strong>, and more — blending
                        science with compassionate care.
                    </motion.p>

                    <motion.a
                        href="#appointment"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="mt-6 inline-block px-5 py-2.5 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-500 transition"
                    >
                        Get an Appointment
                    </motion.a>
                </div>
            </div>
        </section>
    );
};
