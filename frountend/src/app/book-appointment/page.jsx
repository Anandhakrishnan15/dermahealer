import BookAppointmentForm from "./components/BookAppointmentForm";
import Link from "next/link";

export const metadata = {
  metadataBase: new URL("https://www.dermahealerindia.com"),
  title: "Book Appointment | Best Dermatologist in Siwan | Derma Healer",
  description:
    "Book appointment with Dr. Neha Rani and Dr. B.K. Sharma at Derma Healer, Siwan. Advanced laser, acne, pigmentation, vitiligo & hair treatments in Bihar.",
  keywords: [
    "Best dermatologist in Siwan",
    "Skin specialist in Siwan Bihar",
    "Laser treatment in Siwan",
    "Dr Neha Rani appointment",
    "Dr BK Sharma MD Skin",
    "Acne treatment Siwan",
    "Vitiligo treatment Bihar"
  ],
  alternates: {
    canonical: "/book-appointment",
  },
  openGraph: {
    title: "Book Dermatologist Appointment in Siwan | Derma Healer",
    description:
      "Consult experienced dermatologists in Siwan. Book online appointment now.",
    url: "https://www.dermahealerindia.com/book-appointment",
    siteName: "Derma Healer",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Appointment | Derma Healer Siwan",
    description:
      "Book appointment with expert dermatologists in Siwan, Bihar.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BookingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "name": "Derma Healer",
        "url": "https://www.dermahealerindia.com",
        "telephone": "+91 9931766933",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "North of Gandhi Maidan",
          "addressLocality": "Siwan",
          "addressRegion": "Bihar",
          "postalCode": "841226",
          "addressCountry": "IN"
        }
      },
      {
        "@type": "Physician",
        "name": "Dr. Neha Rani",
        "medicalSpecialty": "Aesthetic Dermatology",
        "worksFor": {
          "@type": "MedicalBusiness",
          "name": "Derma Healer"
        }
      },
      {
        "@type": "Physician",
        "name": "Dr. B.K. Sharma",
        "medicalSpecialty": "Dermatology"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.dermahealerindia.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Book Appointment",
            "item": "https://www.dermahealerindia.com/book-appointment"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Who is the best dermatologist in Siwan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Derma Healer in Siwan is led by Dr. Neha Rani and Dr. B.K. Sharma with 35+ years combined experience."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer laser treatment in Siwan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we provide USFDA-approved laser treatments for acne scars, pigmentation and hair removal."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Booking Form */}
      <BookAppointmentForm />
    </>
  );
}
