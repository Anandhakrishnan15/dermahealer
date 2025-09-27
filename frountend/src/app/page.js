"use client";

import Demo from "../components/hero/Demo.jsx";
import { TopServicesPreview } from "../components/TopServicesPreview.jsx";
import { Testimonials } from "../components/Testimonials.jsx";
import { BlogTips } from "../components/BlogTips.jsx";
import { CTASection } from "../components/CTASection.jsx";
import CertificateCarousel from "../components/Certifications.jsx";
import BeforeAfterSlideshow from "../components/BeforeAfter.jsx";
import treatments from "@/data/BeforAndAfter.jsx";
import OurExperts from "../components/AnimatedCounter.jsx";
import { HeroParallaxContent } from "@/components/hero/HeroParallaxContent.jsx";
import ResponsiveImageGallery from "@/components/ResponsiveImageGallery.jsx";
import products from "@/data/serviciess.jsx";
import { HeroParallax } from "@/components/hero/HeroParallax.jsx";

export default function Home() {
 
  return (
    <div>
      {/* <Demo /> */}
      <HeroParallax products={products} />;
      <ResponsiveImageGallery />
      <HeroParallaxContent/>
      <TopServicesPreview limit={3} showSeeMore />
      <BeforeAfterSlideshow data={treatments} />
      <Testimonials />
      <CertificateCarousel />
      <BlogTips />
      <OurExperts/>
      <CTASection />
    </div>
  );
}
