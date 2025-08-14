"use client";
import { motion } from "framer-motion";
import Doctors from "./Doctors";

// const founders = [
//     {
//         name: "Dr. Neha Rani",
//         title: "MBBS, Aesthetic Physician",
//         img: "https://media.licdn.com/dms/image/v2/D5603AQF0IoT68yVuZw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1643119262711?e=2147483647&v=beta&t=nnXHjSkUZL2B-sSqqO2pgV1KuN5eL8pfrTQLkWgM7eo",
//     },
//     {
//         name: "Dr. B.K. Sharma",
//         title: "MBBS, MD (Skin & VD)",
//         img: "https://media.licdn.com/dms/image/v2/D5603AQGAtIi2spihSA/profile-displayphoto-shrink_800_800/B56ZiKLVkjHUAc-/0/1754664907584?e=1757548800&v=beta&t=YklSdZ1iRxbPkrrDpfj_oLmr4MQKrJk15WRLEX9_0_c",
//     },
// ];

export default function AboutSection() {
    return (
        <section className="py-20 bg-[var(--bg)]">
            {/* Heading */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text)] mb-6"
            >
                Who We Are
            </motion.h2>

            {/* Subheading */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-center text-lg md:text-xl text-indigo-400 mb-12"
            >
                Welcome to <span className="font-semibold">Derma Healer</span> – Best Skin & Laser Clinic in Siwan, Bihar
            </motion.p>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 text-center text-[var(--text)] md:text-left">
                <motion.p className=" leading-relaxed mb-6">
                    Derma Healer is a leading dermatology and aesthetic laser clinic in Siwan, Bihar,
                    dedicated to advanced and affordable skin, hair, and laser treatments. Founded by{" "}
                    <strong>Dr. Neha Rani</strong> and supported by senior dermatologist{" "}
                    <strong>Dr. B.K. Sharma</strong>, our expert team offers personalized care using{" "}
                    <strong>USFDA-approved technologies</strong>.
                </motion.p>

                <motion.p className=" leading-relaxed mb-6">
                    We specialize in treatments for{" "}
                    <strong>
                        acne, acne scars, pigmentation, laser hair removal, vitiligo, anti-aging, skin
                        rejuvenation, PRP therapy
                    </strong>
                    , and more. At Derma Healer, our goal is to combine evidence-based dermatology with
                    compassionate care, ensuring visible results and long-term skin health.
                </motion.p>

                <motion.p className=" leading-relaxed">
                    If you’re searching for the <strong>best dermatologist in Siwan</strong>, or
                    looking for safe and effective <strong>laser treatment in Bihar</strong>, Derma
                    Healer is your trusted destination.
                </motion.p>
            </div>

            {/* Founders Section */}
            <div className="max-w-5xl mx-auto mt-16 px-4">               
                    <Doctors/>
            </div>
        </section>
    );
}
