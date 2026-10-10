import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { EnquiryModalProvider } from "@/components/forms/EnquiryModalContext";
import { PublicLayoutWrapper } from "@/components/layout/PublicLayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://electrasolar.in"),
  title: {
    default: "Electra Solar | Solar Hybrid Inverters, C&I BESS & Online UPS Pune",
    template: "%s | Electra Solar",
  },
  description:
    "Official distributor of EnerTech UPS Pvt. Ltd. (Pune, Estd. 1989). Industrial 100% phase-unbalanced hybrid inverters (1kVA-300kVA), C&I BESS, and zero-break online UPS.",
  keywords: [
    "Electra Solar",
    "EnerTech Solar Inverter",
    "Solar Hybrid Inverter India",
    "SunMagic Solar Inverter",
    "3 Phase Hybrid Inverter Pune",
    "BESS Energy Storage India",
    "Lithium Battery 51.2V",
    "Batteryless Solar Inverter",
    "DG Synchronization Inverter",
    "Industrial UPS Pune",
    "Solar EPC Maharashtra",
  ],
  authors: [{ name: "Electra Solar Engineering Desk" }],
  creator: "Electra Solar",
  publisher: "Electra Solar",
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://electrasolar.in",
  },
  other: {
    "geo.region": "IN-MH, IN-RJ",
    "geo.placename": "Pune, Mumbai, Jaipur",
    "geo.position": "18.5913;73.7389",
    "ICBM": "18.5913, 73.7389",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Electra Solar | Solar Hybrid Inverters & Industrial Energy Storage",
    description:
      "Engineered for unbroken power. Official distributor of EnerTech UPS Pvt. Ltd. Flagship SunMagic hybrid inverters, BESS, and sub-5ms zero-break critical power.",
    url: "https://electrasolar.in",
    siteName: "Electra Solar",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Electra Solar Industrial Hybrid Inverters and BESS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Electra Solar | Solar Hybrid Inverters & Energy Storage Systems",
    description:
      "Official distributor of EnerTech UPS Pvt. Ltd. Heavy-duty 3-phase hybrid inverters, C&I BESS, and zero-break UPS in Pune, Mumbai, Jaipur.",
    images: ["/images/hero/hero-bg.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global Entity Schema: Organization (with sameAs Knowledge Graph) + Multi-Location LocalBusiness (Pune, Mumbai, Jaipur) + WebSite
  const globalSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://electrasolar.in/#organization",
        name: "Electra Solar",
        url: "https://electrasolar.in",
        logo: "https://electrasolar.in/images/brand/enertech-partner.png",
        description:
          "Official distributor and turnkey engineering partner of EnerTech UPS Pvt. Ltd. (Pune Plant • Estd. 1989).",
        sameAs: [
          "https://enertechups.com",
          "https://www.linkedin.com/company/electra-solar-india",
          "https://www.indiamart.com/electrasolar/",
          "https://maps.google.com/?q=18.5913,73.7389",
        ],
        parentOrganization: {
          "@type": "Organization",
          name: "EnerTech UPS Pvt. Ltd.",
          url: "https://enertechups.com",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "SR. No. 399/1-2, Plot No. 5, Bhare P.O. Ghotawade, Near Hinjawadi IT Park Phase 2",
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          postalCode: "412115",
          addressCountry: "IN",
        },
        department: [
          {
            "@type": ["LocalBusiness", "SolarEnergyService"],
            "@id": "https://electrasolar.in/#localbusiness-pune",
            name: "Electra Solar - Pune Headquarters & Systems Plant",
          },
          {
            "@type": ["LocalBusiness", "SolarEnergyService"],
            "@id": "https://electrasolar.in/#localbusiness-mumbai",
            name: "Electra Solar - Mumbai Regional Commercial Hub",
          },
          {
            "@type": ["LocalBusiness", "SolarEnergyService"],
            "@id": "https://electrasolar.in/#localbusiness-jaipur",
            name: "Electra Solar - Jaipur North-West Regional Center",
          },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+91-9822407189",
            contactType: "sales",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi", "Marathi"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+91-9373679255",
            contactType: "technical support",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi", "Marathi"],
          },
        ],
      },
      {
        "@type": ["LocalBusiness", "SolarEnergyService"],
        "@id": "https://electrasolar.in/#localbusiness-pune",
        name: "Electra Solar - Pune Headquarters & Systems Plant",
        image: "https://electrasolar.in/images/hero/hero-bg.jpg",
        telephone: "+91-9822407189",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "SR. No. 399/1-2, Plot No. 5, Bhare P.O. Ghotawade, Near Hinjawadi IT Park Phase 2",
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          postalCode: "412115",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 18.5913,
          longitude: 73.7389,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "19:00",
          },
        ],
      },
      {
        "@type": ["LocalBusiness", "SolarEnergyService"],
        "@id": "https://electrasolar.in/#localbusiness-mumbai",
        name: "Electra Solar - Mumbai Regional Commercial Hub",
        image: "https://electrasolar.in/images/hero/hero-bg.jpg",
        telephone: "+91-9373336340",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Level 5, Solitaire Corporate Park, Chakala, Andheri East",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          postalCode: "400069",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 19.1136,
          longitude: 72.8697,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:30",
            closes: "18:30",
          },
        ],
      },
      {
        "@type": ["LocalBusiness", "SolarEnergyService"],
        "@id": "https://electrasolar.in/#localbusiness-jaipur",
        name: "Electra Solar - Jaipur North-West Regional Center",
        image: "https://electrasolar.in/images/hero/hero-bg.jpg",
        telephone: "+91-9373679255",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Plot No. G-12, Sitapura Industrial Area, Phase III, Near RIICO",
          addressLocality: "Jaipur",
          addressRegion: "Rajasthan",
          postalCode: "302022",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 26.7825,
          longitude: 75.8272,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:30",
            closes: "18:30",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://electrasolar.in/#website",
        url: "https://electrasolar.in",
        name: "Electra Solar",
        publisher: {
          "@id": "https://electrasolar.in/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://electrasolar.in/products?search={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-gray-800`}>
        <EnquiryModalProvider>
          <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
        </EnquiryModalProvider>
      </body>
    </html>
  );
}
