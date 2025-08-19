"use client";

import Demo from "../components/hero/Demo.jsx";
import { QuickIntroUSP } from "../components/QuickIntroUSP.jsx";
import { TopServicesPreview } from "../components/TopServicesPreview.jsx";
import { Testimonials } from "../components/Testimonials.jsx";
import { BlogTips } from "../components/BlogTips.jsx";
import { CTASection } from "../components/CTASection.jsx";
import { BeforeAfter } from "../components/BeforeAfter.jsx";
import CertificateCarousel from "../components/Certifications.jsx";

export default function Home() {
  return (
    <div>
      <Demo />

      <QuickIntroUSP />

      <BeforeAfter />

      <Testimonials />

      <CertificateCarousel />

      <TopServicesPreview limit={3} />

      <BlogTips />

      <CTASection />
    </div>
  );
}
