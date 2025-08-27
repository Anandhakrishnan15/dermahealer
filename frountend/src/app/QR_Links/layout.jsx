// app/QR_Links/layout.jsx
export const metadata = {
    title: "Derma Healer - Quick Links",
    description:
        "Find all important links for Derma Healer India — Instagram, Facebook, Google Maps, and official website.",
    alternates: {
        canonical: "https://dermahealerindia.com/QR_Links",
    },
    icons: {
        icon: "/logo2.png",
        apple: "/logo2.png",
    },
    openGraph: {
        title: "Derma Healer - Quick Links",
        description:
            "Connect with Derma Healer India across Instagram, Facebook, Google Maps, and our official website.",
        url: "https://dermahealerindia.com/QR_Links",
        images: [{ url: "/logo2.png", width: 600, height: 600, alt: "Derma Healer Logo" }],
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Derma Healer - Quick Links",
        description:
            "Follow us on Instagram, Facebook, Maps, and explore our official website.",
        images: ["/logo2.png"],
    },
};


export default function QRLinksLayout({ children }) {
    return (
      <>
            {children}

      </>
          
           
       
    );
}
