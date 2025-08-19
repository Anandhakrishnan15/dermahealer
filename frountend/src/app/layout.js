import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ClientWrapper from "./ClientWrapper"; // client-side wrapper

// Fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const playfair = Playfair_Display({ weight: "700", subsets: ["latin"], variable: "--font-playfair" });

// ✅ Metadata (server-only)
export const metadata = {
  metadataBase: new URL("https://dermahealerindia.com"),
  title: "Derma Healer - Expert Skin & Laser Clinic in Bihar",
  description:
    "Experience advanced USFDA-approved skin and laser treatments with Derma Healer. Your journey to healthier, glowing skin starts here.",
  icons: { icon: "/logo2.png", shortcut: "/logo2.png", apple: "/logo2.png" },
  openGraph: {
    title: "Derma Healer - Expert Skin & Laser Clinic in Bihar",
    description:
      "Experience advanced USFDA-approved skin and laser treatments with Derma Healer. Your journey to healthier, glowing skin starts here.",
    url: "https://dermahealerindia.com/",
    siteName: "Derma Healer",
    images: [{ url: "/logo2.png", width: 1200, height: 630, alt: "Derma Healer Logo" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Derma Healer - Expert Skin & Laser Clinic in Bihar",
    description:
      "Experience advanced USFDA-approved skin and laser treatments with Derma Healer. Your journey to healthier, glowing skin starts here.",
    images: ["/logo2.png"],
  },
};

// ✅ Root Layout (server)
export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        <NavBar />
        <ClientWrapper>{children}</ClientWrapper>
        <Footer />
      </body>
    </html>
  );
}
