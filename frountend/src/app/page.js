import Link from "next/link";
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
// import Hero from "../components/Hero.jsx"

export default function Home() {
  return (
    <div>
      {/* <Hero /> */}
      <Demo />
      <QuickIntroUSP />
      {/* <TopServicesPreview /> */}
      <BeforeAfter />
      <Testimonials />
      <CertificateCarousel />
      <PromoOffer />
      <BlogTips />
      <CTASection />
      <ContactSocial />
      
    </div>
  );
}
