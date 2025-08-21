"use client";

import Demo from "../components/hero/Demo.jsx";
import { QuickIntroUSP } from "../components/QuickIntroUSP.jsx";
import { TopServicesPreview } from "../components/TopServicesPreview.jsx";
import { Testimonials } from "../components/Testimonials.jsx";
import { BlogTips } from "../components/BlogTips.jsx";
import { CTASection } from "../components/CTASection.jsx";
import CertificateCarousel from "../components/Certifications.jsx";
import BeforeAfterSlideshow from "@/components/BeforeAfter.jsx";
import treatments from "@/data/BeforAndAfter.jsx";

export default function Home() {
  
  return (
    <div>
      <Demo />

      <QuickIntroUSP />

      <BeforeAfterSlideshow data={treatments} />

      <Testimonials />

      <CertificateCarousel />

      <TopServicesPreview limit={3} />

      <BlogTips />

      <CTASection />
    </div>
  );
}
