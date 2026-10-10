import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EnquiryModalProvider } from "@/components/forms/EnquiryModalContext";
import { CompareProvider } from "@/components/compare/CompareContext";
import { FloatingCompareTray } from "@/components/compare/FloatingCompareTray";
import { DeyeHelpWidget } from "@/components/ui/DeyeHelpWidget";
import { MobileActionDock } from "@/components/layout/MobileActionDock";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://electrasolar.in"),
  title: "Electra Solar | Official Distributor of EnerTech — Solar Hybrid Inverters & BESS",
  description:
    "Official distributor of EnerTech UPS Pvt. Ltd. High-efficiency solar hybrid inverters (1kVA to 300kVA), C&I BESS, lithium energy storage, and 0ms solar online UPS systems with 35+ years parent engineering pedigree in Pune, India.",
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
  ],
  authors: [{ name: "Electra Solar Solutions" }],
  openGraph: {
    title: "Electra Solar | Solar Hybrid Inverters & Energy Storage Systems",
    description:
      "Engineered for unbroken power. Official distributor of EnerTech UPS Pvt. Ltd. Flagship SunMagic hybrid inverters, BESS, and zero-break critical power.",
    url: "https://electrasolar.in",
    siteName: "Electra Solar",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Electra Solar",
    url: "https://electrasolar.in",
    logo: "https://electrasolar.in/images/brand/enertech-partner.png",
    description: "Official distributor and turnkey engineering partner of EnerTech UPS Pvt. Ltd.",
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
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-9373679255",
        contactType: "customer support",
        areaServed: "IN",
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-gray-800`}>
        <CompareProvider>
          <EnquiryModalProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <FloatingCompareTray />
            <DeyeHelpWidget />
            <MobileActionDock />
          </EnquiryModalProvider>
        </CompareProvider>
      </body>
    </html>
  );
}
