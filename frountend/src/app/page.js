"use client";

import { motion } from "framer-motion";

import Demo from "../components/hero/Demo.jsx";
import { QuickIntroUSP } from "../components/QuickIntroUSP.jsx";
import { TopServicesPreview } from "../components/TopServicesPreview.jsx";
import { Testimonials } from "../components/Testimonials.jsx";
import { PromoOffer } from "../components/PromoOffer.jsx";
import { BlogTips } from "../components/BlogTips.jsx";
import { CTASection } from "../components/CTASection.jsx";
import { ContactSocial } from "../components/ContactSocial.jsx";
import { BeforeAfter } from "../components/BeforeAfter.jsx";
import CertificateCarousel from "../components/Certifications.jsx";

// Animation variants
const sectionVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// A small reusable wrapper for scroll reveal
const SectionWrapper = ({ children, delay = 0 }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={sectionVariant}
    transition={{ delay }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <div>
      <SectionWrapper delay={0}><Demo /></SectionWrapper>
      <SectionWrapper delay={0.2}><QuickIntroUSP /></SectionWrapper>
      <SectionWrapper delay={0.2}><BeforeAfter /></SectionWrapper>
      <SectionWrapper delay={0.2}><Testimonials /></SectionWrapper>
      <SectionWrapper delay={0.2}><CertificateCarousel /></SectionWrapper>
      <SectionWrapper delay={0.2}><PromoOffer /></SectionWrapper>
      <SectionWrapper delay={0.2}><TopServicesPreview /></SectionWrapper>
      <SectionWrapper delay={0.2}><BlogTips /></SectionWrapper>
      <SectionWrapper delay={0.2}><CTASection /></SectionWrapper>
      <SectionWrapper delay={0.2}><ContactSocial /></SectionWrapper>
    </div>
  );
}
