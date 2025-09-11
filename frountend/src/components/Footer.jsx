"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[var(--sbg)] text-gray-50 py-10 px-6">
            <div
                className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
            >
                {/* Column 1 - Logo + Contact */}
                <div className="flex flex-col gap-5 animate-fadeIn">
                    <div className="flex items-center gap-2">
                        <img
                            src="/logo2.png"
                            alt="DermaHealer Logo"
                            loading="eager"
                            className="h-10 w-auto object-contain"
                        />
                        <span className="font-bold text-3xl">DermaHealer</span>
                    </div>
                    <p className="text-sm opacity-80 leading-relaxed">
                        Expert Skin & Laser Clinic in Bihar. Advanced{" "}
                        <span className="text-blue-400 underline">USFDA-approved</span>{" "}
                        treatments for glowing skin.
                    </p>

                    {/* Contact Info */}
                    <ul className="space-y-4 text-sm mt-2 leading-relaxed">
                        <li className="flex items-center gap-2">
                            <span className="text-xl">📍</span>
                            <span>North of Gandhi Maidan, Siwan – 841226, Bihar, India</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-xl">📞</span>
                            <span>+91 9931766983</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-xl">📞</span>
                            <span>+91 9693601499</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-xl">✉</span>
                            <span>support@dermahealerindia.com</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-xl">🕒</span>
                            <span>Mon–Sat: 10 AM – 5 PM</span>
                        </li>
                    </ul>



                    {/* Social Links */}
                    <div className="mt-4">
                        <h4 className="font-semibold mb-3 text-sm">Follow Us</h4>
                        <div className="flex gap-6"> {/* increased gap between icons */}
                            {/* Facebook */}
                            <a
                                href="https://www.facebook.com/derma.healer.2025"
                                target="_blank"
                                className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-lg shadow-lg hover:bg-teal-400 hover:text-white hover:scale-110 transition-all"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/dermahealerindia/?hl=en"
                                target="_blank"
                                className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-lg shadow-lg hover:bg-teal-400 hover:text-white hover:scale-110 transition-all"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            {/* LinkedIn */}
                            <a
                                href="https://www.linkedin.com/in/dr-neha-rani-012395ba/"
                                target="_blank"
                                className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-lg shadow-lg hover:bg-teal-400 hover:text-white hover:scale-110 transition-all"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            {/* YouTube */}
                            <a
                                href="https://www.youtube.com/@dermahealerindia"
                                target="_blank"
                                className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-lg shadow-lg hover:bg-teal-400 hover:text-white hover:scale-110 transition-all"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Column 2 - Quick Links */}
                <div className="animate-slideUp">
                    <h4 className="font-semibold mb-4 text-xl relative inline-block">
                        Quick Links
                        <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-blue-500 to-transparent"></span>
                    </h4>
                    <ul className="space-y-3 text-sm">
                        {[
                            { href: "/", label: "Home" },
                            { href: "/treatments", label: "Treatments" },
                            { href: "/about-us", label: "About Us" },
                            { href: "/blog", label: "Blog" },
                            { href: "/contact-us", label: "Contact" },
                        ].map((link, i) => (
                            <li key={i} className="flex items-center gap-2 hover:translate-x-1 transition">
                                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">{">"}</span>
                                <Link
                                    href={link.href}
                                    className="hover:underline hover:text-teal-400 transition"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3 - Our Treatments */}
                <div className="animate-slideUp delay-100">
                    <h4 className="font-semibold mb-4 text-xl relative inline-block">
                        Our Treatments
                        <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-blue-500 to-transparent"></span>
                    </h4>
                    <ul className="space-y-3 text-sm">
                        {[
                            { name: "HIFU – Non-Surgical Facelift", href: "/treatments/face/hifu", popular: true },
                            { name: "Hyperpigmentation Treatment", href: "/treatments/face/pigmentation" },
                            { name: "Fat Loss Treatment", href: "/treatments/body/body-treatment" },
                            { name: "Laser Hair Removal", href: "/treatments/hair/laser-hair-removal", popular: true },
                            { name: "Vitiligo Surgery", href: "/treatments/skin/vitiligo" },
                            { name: "Xanthelasma Removal", href: "/treatments/face/xanthelasma-removal" },
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 hover:translate-x-1 transition">
                                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">{">"}</span>
                                <Link href={item.href} className="hover:underline hover:text-teal-400 transition flex items-center gap-1">
                                    {item.name}
                                    {item.popular && (
                                        <span className="ml-2 text-xs bg-blue-600 px-2 py-0.5 rounded-full text-white animate-pulse">
                                            Popular
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 4 - More Services */}
                <div className="animate-slideUp delay-200">
                    <h4 className="font-semibold mb-4 text-xl relative inline-block">
                        More Services
                        <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-blue-500 to-transparent"></span>
                    </h4>
                    <ul className="space-y-3 text-sm">
                        {[
                            { name: "Carbon Laser Toning", href: "/treatments/face/carbon-laser-toning" },
                            { name: "Vampire Facial", href: "/treatments/face/vampire-facial" },
                            { name: "Tattoo Removal", href: "/treatments/tattoo-removal", popular: true },
                            { name: "Wart Removal", href: "/treatments/skin/wart-removal" },
                            { name: "Laser Scar Removal", href: "/treatments/face/acne-scar" },
                            { name: "HydraFacial", href: "/treatments/face/hydrafacial" },
                            { name: "PRP", href: "/treatments/hair/prp-therapy" },
                            { name: "Urinary Incontinence", href: "/treatments/wellness-health/urinary-incontinence", popular: true },
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 hover:translate-x-1 transition">
                                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">{">"}</span>
                                <Link href={item.href} className="hover:underline hover:text-teal-400 transition flex items-center gap-1">
                                    {item.name}
                                    {item.popular && (
                                        <span className="ml-2 text-xs bg-blue-600 px-2 py-0.5 rounded-full text-white animate-pulse">
                                            Popular
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="mt-12 border-t border-gray-600 pt-6 flex flex-col md:flex-row items-center justify-between text-sm opacity-80 gap-4">
                <p className="animate-fadeIn">&copy; {new Date().getFullYear()} DermaHealer. All rights reserved.</p>
                <div className="flex items-center gap-2 animate-fadeIn delay-200">
                    <p>
                        Built by{" "}
                        <a
                            href="https://www.linkedin.com/in/anandha-krishnan-5b0a36248"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-teal-400 transition"
                        >
                            Anandhakrishnan
                        </a>
                    </p>
                    <img
                        src="https://ik.imagekit.io/e8fzvhk22/mylogo?updatedAt=1754921880920"
                        alt="Anandhakrishnan Logo"
                        loading="lazy"
                        className="h-7 w-7 object-contain hover:scale-110 transition-transform"
                    />
                </div>
            </div>
        </footer>
    );
}
// "use client";
// import React from "react";
// import Link from "next/link";
// import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

// export default function Footer() {
//     return (
//         <footer className="bg-gradient-to-br from-[#1e2838] to-[#2a3547] relative overflow-hidden text-gray-200">
//             {/* Shimmer line */}
//             <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-[shimmer_3s_infinite]"></div>

//             <div className="max-w-7xl mx-auto px-6 py-16">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
//                     {/* Column 1 - Logo + Contact */}
//                     <div className="flex flex-col gap-6">
//                         <div className="flex items-center gap-3">
//                             <img
//                                 src="/logo2.png"
//                                 alt="DermaHealer Logo"
//                                 loading="eager"
//                                 className="h-10 w-auto object-contain"
//                             />
//                             <h2 className="text-2xl font-bold">DermaHealer</h2>
//                         </div>
//                         <p className="text-gray-400 text-sm leading-relaxed">
//                             Expert Skin & Laser Clinic in Bihar. Advanced <span className="text-blue-400 font-medium">USFDA-approved</span> treatments for glowing skin.
//                         </p>

//                         {/* Contact Info */}
//                         <ul className="flex flex-col gap-3 text-sm">
//                             <li className="flex items-center gap-2 hover:text-blue-400 transition">📍 North of Gandhi Maidan, Siwan – 841226, Bihar, India</li>
//                             <li className="flex items-center gap-2 hover:text-blue-400 transition">📞 +91 9931766983</li>
//                             <li className="flex items-center gap-2 hover:text-blue-400 transition">📞 +91 9693601499</li>
//                             <li className="flex items-center gap-2 hover:text-blue-400 transition">✉ support@dermahealerindia.com</li>
//                             <li className="flex items-center gap-2 hover:text-blue-400 transition">🕒 Mon–Sat: 10 AM – 5 PM</li>
//                         </ul>

//                         {/* Social Links */}
//                         <div className="mt-4">
//                             <h3 className="text-white font-semibold mb-3">Follow Us</h3>
//                             <div className="flex gap-4">
//                                 {[{
//                                     icon: <Facebook size={18} />,
//                                     href: "https://www.facebook.com/derma.healer.2025"
//                                 }, {
//                                     icon: <Instagram size={18} />,
//                                     href: "https://www.instagram.com/dermahealerindia/?hl=en"
//                                 }, {
//                                     icon: <Linkedin size={18} />,
//                                     href: "https://www.linkedin.com/in/dr-neha-rani-012395ba/"
//                                 }, {
//                                     icon: <Youtube size={18} />,
//                                     href: "https://www.youtube.com/@dermahealerindia"
//                                 }].map((s, i) => (
//                                     <a key={i} href={s.href} target="_blank" className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-lg shadow-md hover:bg-blue-500 hover:text-white hover:scale-110 transition-all relative overflow-hidden">
//                                         {s.icon}
//                                         <span className="absolute inset-0 rounded-lg"></span>
//                                     </a>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Column 2 - Quick Links */}
//                     <div>
//                         <h3 className="text-xl font-bold mb-4 relative inline-block">
//                             Quick Links
//                             <span className="absolute left-0 -bottom-1 w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
//                         </h3>
//                         <ul className="flex flex-col gap-2 text-gray-400">
//                             {[
//                                 { href: "/", label: "Home" },
//                                 { href: "/treatments", label: "Treatments" },
//                                 { href: "/about-us", label: "About Us" },
//                                 { href: "/blog", label: "Blog" },
//                                 { href: "/contact-us", label: "Contact" },
//                             ].map((link, i) => (
//                                 <li key={i} className="flex items-center gap-2 hover:text-blue-400 transition transform hover:translate-x-1">
//                                     <span className="text-blue-400">{'>'}</span>
//                                     <Link href={link.href}>{link.label}</Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Column 3 - Treatments */}
//                     <div>
//                         <h3 className="text-xl font-bold mb-4 relative inline-block">
//                             Our Treatments
//                             <span className="absolute left-0 -bottom-1 w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
//                         </h3>
//                         <ul className="flex flex-col gap-2 text-gray-400">
//                             {[
//                                 { name: "HIFU – Non-Surgical Facelift", href: "/treatments/face/hifu" },
//                                 { name: "Laser Hair Removal", href: "/treatments/hair/laser-hair-removal" },
//                                 { name: "Hyperpigmentation Treatment", href: "/treatments/face/pigmentation" },
//                                 { name: "Fat Loss Treatment", href: "/treatments/body/body-treatment" },
//                                 { name: "Vitiligo Surgery", href: "/treatments/skin/vitiligo" },
//                                 { name: "Xanthelasma Removal", href: "/treatments/face/xanthelasma-removal" },
//                             ].map((item, i) => (
//                                 <li key={i} className="flex items-center gap-2 hover:text-blue-400 transition transform hover:translate-x-1">
//                                     <span className="text-blue-400">{'>'}</span>
//                                     <Link href={item.href}>{item.name}</Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Column 4 - More Services */}
//                     <div>
//                         <h3 className="text-xl font-bold mb-4 relative inline-block">
//                             More Services
//                             <span className="absolute left-0 -bottom-1 w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
//                         </h3>
//                         <ul className="flex flex-col gap-2 text-gray-400">
//                             {[
//                                 { name: "Carbon Laser Toning", href: "/treatments/face/carbon-laser-toning" },
//                                 { name: "Vampire Facial", href: "/treatments/face/vampire-facial" },
//                                 { name: "Wart Removal", href: "/treatments/skin/wart-removal" },
//                                 { name: "Laser Scar Removal", href: "/treatments/face/acne-scar" },
//                                 { name: "HydraFacial", href: "/treatments/face/hydrafacial", popular: true },
//                                 { name: "PRP", href: "/treatments/hair/prp-therapy" },
//                                 { name: "Urinary Incontinence", href: "/treatments/wellness-health/urinary-incontinence" },
//                                 { name: "Tattoo Removal", href: "/treatments/tattoo-removal" },
//                             ].map((item, i) => (
//                                 <li key={i} className="flex items-center gap-2 hover:text-blue-400 transition transform hover:translate-x-1">
//                                     <Link href={item.href} className="flex items-center gap-1">
//                                         {item.name}
//                                         {item.popular && (
//                                             <span className="ml-1 bg-gradient-to-br from-blue-500 to-blue-700 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">Popular</span>
//                                         )}
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>

//                 {/* Footer Bottom */}
//                 <div className="mt-12 border-t border-gray-600 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
//                     <p>© {new Date().getFullYear()} DermaHealer. All rights reserved.</p>
//                     <div className="flex items-center gap-2">
//                         <p>
//                             Built by <a href="https://www.linkedin.com/in/anandha-krishnan-5b0a36248" target="_blank" className="text-blue-400 hover:text-blue-300 transition">Anandhakrishnan</a>
//                         </p>
//                         <img src="https://ik.imagekit.io/e8fzvhk22/mylogo?updatedAt=1754921880920" alt="Anandhakrishnan Logo" className="h-7 w-7 object-contain hover:scale-110 transition-transform" />
//                     </div>
//                 </div>
//             </div>

//             <style jsx>{`
//                 @keyframes shimmer {
//                     0% { transform: translateX(-100%); }
//                     100% { transform: translateX(100%); }
//                 }
//                 .animate-[shimmer_3s_infinite] {
//                     animation: shimmer 3s linear infinite;
//                 }
//             `}</style>
//         </footer>
//     );
// }
