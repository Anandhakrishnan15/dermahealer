// src/app/layout.jsx
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientWrapper from "./ClientWrapper";
import LayoutClient from "./LayoutClient";
import Script from "next/script";
import AnalyticsProvider from "./providers";
import GoogleAnalytics from "./GoogleAnalytics";
import ToastProvider from "@/components/ToastProvider";
import { StatsProvider } from "@/context/StatsContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const playfair = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-playfair",
});

// ✅ SEO Metadata
export const metadata = {
  metadataBase: new URL("https://dermahealerindia.com"),
  title: {
    default: "Derma Healer - Top Skin & Laser Clinic in Siwan, Bihar",
    template: "%s | Derma Healer India",
  },
  description:
    "Derma Healer offers USFDA-approved skin and laser treatments in Siwan, Bihar. Consult expert dermatologists for acne, scars, hair loss, and cosmetic dermatology.",

  // ✅ Canonical correctly placed
  alternates: {
    canonical: "https://dermahealerindia.com",
  },

  icons: {
    icon: "/icon0.svg",
    shortcut: "/icon0.svg",
    apple: "/icon0.svg",
  },

  openGraph: {
    title: "Derma Healer - Skin & Laser Clinic in Siwan, Bihar",
    description:
      "Your trusted clinic for advanced dermatology treatments in Siwan, Bihar. We specialize in acne, laser treatments, hair restoration, and more.",
    url: "https://dermahealerindia.com",
    siteName: "Derma Healer India",
    images: [
      {
        url: "/home.png", // should be 1200x630
        width: 1200,
        height: 630,
        alt: "Derma Healer Clinic Banner",
      },
    ],
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Derma Healer - Your Siwan Dermatology Clinic",
    description:
      "Expert dermatology and cosmetic treatments in Siwan, Bihar. Find solutions for acne, pigmentation, hair loss, and more.",
    images: ["/home.png"],
  },
};

export default function RootLayout({ children }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "Derma Healer India",
    image: "home.png",
    "@id": "https://dermahealerindia.com",
    url: "https://dermahealerindia.com",
    telephone: "+91-919931766933",
    address: {
      "@type": "PostalAddress",
      streetAddress: "North of Gandhi Maidan",
      addressLocality: "Siwan",
      addressRegion: "Bihar",
      postalCode: "841226",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "26.2166",
      longitude: "84.3508",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/derma.healer.2025",
      "https://www.instagram.com/dermahealerindia",
      "https://www.linkedin.com/in/dr-neha-rani-012395ba/",
      "https://www.youtube.com/@dermahealerindia",
    ],
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://dermahealerindia.com/contact-us",
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      name: "Book Appointment",
    },
  };

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <AnalyticsProvider />
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
          crossOrigin="anonymous"
        />

        {/* Google Analytics */}
        <GoogleAnalytics gaId={process.env.GA_ID} />
        
        <meta name="apple-mobile-web-app-title" content="Derma Healer" />
        {/* <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        <LayoutClient>
          <StatsProvider>
          <ClientWrapper>{children}
            <ToastProvider /> {/* ✅ client-only */}
            </ClientWrapper>
          </StatsProvider>
        </LayoutClient>
      </body>
    </html>
  );
}
