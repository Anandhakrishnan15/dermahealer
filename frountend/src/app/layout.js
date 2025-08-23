import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ClientWrapper from "./ClientWrapper";

// Fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const playfair = Playfair_Display({ weight: "700", subsets: ["latin"], variable: "--font-playfair" });

// ✅ All-in-One SEO Metadata
export const metadata = {
  metadataBase: new URL("https://dermahealerindia.com"),

  // A more specific and SEO-friendly title for the homepage
  title: "Derma Healer - Top Skin & Laser Clinic in Siwan, Bihar",

  // Canonical URL for the homepage
  alternates: {
    canonical: "https://dermahealerindia.com",
  },

  description:
    "Derma Healer offers USFDA-approved skin and laser treatments in Siwan, Bihar. Consult our expert dermatologists for acne, hair loss, and cosmetic dermatology.",

  icons: {
    icon: "/logo2.png",
    shortcut: "/logo2.png",
    apple: "/logo2.png",
  },

  openGraph: {
    title: "Derma Healer - Skin & Laser Clinic in Siwan, Bihar",
    description:
      "Your trusted clinic for advanced dermatology treatments in Siwan, Bihar. We specialize in acne, laser treatments, hair restoration, and more.",
    url: "https://dermahealerindia.com",
    siteName: "Derma Healer India",
    images: [{ url: "/logo2.png", width: 1200, height: 630, alt: "Derma Healer Logo" }],
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Derma Healer - Your Siwan Dermatology Clinic",
    description:
      "Expert dermatology and cosmetic treatments in Siwan, Bihar. Find solutions for acne, pigmentation, hair loss, and more.",
    images: ["/logo2.png"],
  },
};

// ✅ Root Layout
export default function RootLayout({ children }) {
  // ✅ Updated with your specific location, contact, and social media links
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Derma Healer India",
    "image": "/logo.jpg",
    "@id": "https://dermahealerindia.com",
    "url": "https://dermahealerindia.com",
    "telephone": "+91-919931766933", // Use your real phone number
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "North of Gandhi Maidan",
      "addressLocality": "Siwan",
      "addressRegion": "Bihar",
      "postalCode": "841226",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "26.2166", // Use your exact coordinates
      "longitude": "84.3508" // Use your exact coordinates
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/derma.healer.2025",
      "https://www.instagram.com/dermahealerindia/?hl=en",
      "https://www.linkedin.com/in/dr-neha-rani-012395ba/",
      "https://www.youtube.com/@dermahealerindia"
    ],
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://dermahealerindia.com/contact-us",
        "actionPlatform": ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"]
      },
      "name": "Book Appointment"
    }
  };

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* ✅ Global structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

        <NavBar />
        <ClientWrapper>{children}</ClientWrapper>
        <Footer />
      </body>
    </html>
  );
}

