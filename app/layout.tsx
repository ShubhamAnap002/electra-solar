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
      "Official distributor of EnerTech UPS Pvt. Ltd. Heavy-duty 3-phase hybrid inverters, C&I BESS, and zero-break UPS in Pune, India.",
    images: ["/images/hero/hero-bg.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global Entity Schema: Organization + SolarEnergyService + WebSite with Sitelinks SearchBox
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
        parentOrganization: {
          "@type": "Organization",
          name: "EnerTech UPS Pvt. Ltd.",
          url: "https://enertechups.com",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Hinjawadi Commercial Corridor, Near IT Park Phase 2",
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          postalCode: "412115",
          addressCountry: "IN",
        },
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
        "@id": "https://electrasolar.in/#localbusiness",
        name: "Electra Solar",
        image: "https://electrasolar.in/images/hero/hero-bg.jpg",
        telephone: "+91-9822407189",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Hinjawadi Commercial Corridor, Near IT Park Phase 2",
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
