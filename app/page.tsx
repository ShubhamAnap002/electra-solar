import React from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductRangeSection } from "@/components/home/ProductRangeSection";
import { WhyElectraSolarSection } from "@/components/home/WhyElectraSolarSection";
import { ApplicationsSection } from "@/components/home/ApplicationsSection";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
import { SwitchToSolarCta } from "@/components/home/SwitchToSolarCta";
import { FaqSection } from "@/components/home/FaqSection";
import { COMPANY } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "Electra Solar — High-Efficiency Hybrid Inverters & Energy Storage",
  description:
    "Official turnkey distributor of EnerTech UPS Pvt. Ltd. (Pune, Estd. 1989). Industrial 100% unbalanced phase hybrid inverters, BESS, and sub-5ms online UPS.",
  alternates: {
    canonical: "https://electrasolar.in",
  },
  openGraph: {
    title: "Electra Solar — High-Efficiency Hybrid Inverters & Energy Storage",
    description:
      "Discover heavy-duty solar hybrid inverters, BESS, and industrial UPS with zero-break transfer and 100% phase unbalance tolerance.",
    url: "https://electrasolar.in",
    siteName: "Electra Solar",
    images: [
      {
        url: "/images/hero/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Electra Solar Engineering and Power Electronics",
      },
    ],
  },
};

export default function HomePage() {
  // Google Search FAQPage Schema for interactive SERP Accordions
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: COMPANY.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://electrasolar.in/#webpage",
    url: "https://electrasolar.in",
    name: "Electra Solar — High-Efficiency Hybrid Inverters & Energy Storage",
    description:
      "Official distributor of EnerTech UPS Pvt. Ltd. Industrial-grade hybrid inverters, energy storage, and power conditioning systems.",
    isPartOf: {
      "@id": "https://electrasolar.in/#website",
    },
    about: {
      "@id": "https://electrasolar.in/#organization",
    },
  };

  return (
    <div className="space-y-0 bg-white">
      {/* Search Engine Rich Snippet JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 1. Multi-sector Hero Carousel with transparent hardware and pill switcher */}
      <HeroSection />

      {/* 2. De-cluttered Hardware Category Range (4 Clean Cards) */}
      <ProductRangeSection />

      {/* 3. "Why Electra Solar?" Engineering Heritage & Performance Numbers */}
      <WhyElectraSolarSection />

      {/* 4. "Applications" Photo Grid (Residential, Commercial, Industrial, Utility) */}
      <ApplicationsSection />

      {/* 5. Deep Technical Specifications & Product Browser */}
      <FeaturedProductsSection />

      {/* 6. "Switch to Solar Today" High-Impact Action Banner */}
      <SwitchToSolarCta />

      {/* 7. Engineering FAQs & Technical Support */}
      <FaqSection />
    </div>
  );
}
