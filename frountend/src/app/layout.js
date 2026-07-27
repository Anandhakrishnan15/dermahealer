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

  // Title Optimization: Leads with target keywords + location, strictly within recommended character limits (under 60 chars)
  title: {
    default: "Best Skin & Laser Clinic in Siwan, Bihar | Derma Healer",
    template: "%s | Derma Healer Siwan",
  },

  // Description Optimization: High-converting, action-oriented, includes primary search terms (150–160 chars)
  description:
    "Looking for the best dermatologist in Siwan, Bihar? Derma Healer provides USFDA-approved laser hair removal, acne scar treatment, and hair loss solutions.",

  keywords: [
    "Dermatologist in Siwan",
    "Best skin clinic Siwan Bihar",
    "Laser hair removal Siwan",
    "Acne scar treatment Siwan",
    "Hair loss treatment Bihar",
    "Cosmetic dermatologist Siwan",
    "Derma Healer India",
  ],

  authors: [{ name: "Derma Healer India" }],
  creator: "Derma Healer India",
  publisher: "Derma Healer India",

  alternates: {
    canonical: "/", // Resolves to metadataBase automatically
  },

  icons: {
    icon: "/icon0.svg",
    shortcut: "/icon0.svg",
    apple: "/icon0.svg",
  },

  openGraph: {
    title: "Best Skin & Laser Clinic in Siwan, Bihar | Derma Healer",
    description:
      "Transform your skin and hair with USFDA-approved treatments in Siwan. Specializing in acne, hair restoration, and laser care. Book your consultation today!",
    url: "https://dermahealerindia.com",
    siteName: "Derma Healer India",
    images: [
      {
        url: "https://dermahealerindia.com/home.png",
        width: 1200,
        height: 630,
        alt: "Derma Healer - Advanced Skin & Laser Clinic in Siwan, Bihar",
      },
    ],
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Best Skin & Laser Clinic in Siwan, Bihar | Derma Healer",
    description:
      "Expert skin, hair, and laser treatments in Siwan, Bihar. USFDA-approved care for acne, scars, and hair loss.",
    images: ["/home.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  // ✅ Complete, Validated Schema.org Data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    name: "Derma Healer India",
    alternateName: "Derma Healer Clinic",
    image: "https://dermahealerindia.com/home.png",
    logo: "https://dermahealerindia.com/icon0.svg",
    "@id": "https://dermahealerindia.com/#clinic",
    url: "https://dermahealerindia.com",
    telephone: "+91-9931766933", // Fixed extra '91'
    priceRange: "₹₹",
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
        urlTemplate: "https://dermahealerindia.com/book-appointment",
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
        <GoogleAnalytics gaId={process.env.GA_ID} />
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
          crossOrigin="anonymous"
        />

        {/* Google Analytics */}
        
        
        <meta name="apple-mobile-web-app-title" content="Derma Healer" />
        <meta name="facebook-domain-verification" content="9pj8nclpd6mga7tm1xndaapkdg324z" />
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
