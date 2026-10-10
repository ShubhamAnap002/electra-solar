import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SolarCalculator } from "@/components/calculator/SolarCalculator";

export const metadata: Metadata = {
  title: "Solar & Inverter Sizing Calculator | ROI Estimator | Electra Solar",
  description:
    "Calculate recommended solar panel capacity, inverter kVA rating, and battery kWh storage based on your facility type and monthly electricity consumption.",
  alternates: {
    canonical: "https://electrasolar.in/calculator",
  },
  openGraph: {
    title: "Solar & Inverter Sizing Calculator | Electra Solar",
    description:
      "Estimate optimal hybrid inverter ratings, solar array size, and lithium battery capacity with ROI paybacks.",
    url: "https://electrasolar.in/calculator",
    siteName: "Electra Solar",
    type: "website",
    images: [
      {
        url: "/images/hero/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Solar Sizing Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar & Battery Sizing Calculator | Electra Solar",
    description:
      "Estimate optimal hybrid inverter ratings, solar array size, and lithium battery capacity.",
    images: ["/images/hero/hero-bg.jpg"],
  },
};

export default function CalculatorPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Electra Solar & BESS Sizing Calculator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    url: "https://electrasolar.in/calculator",
    description:
      "Engineering calculation engine to size solar PV arrays, hybrid inverters, and LiFePO4 battery energy storage systems.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://electrasolar.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sizing Calculator",
        item: "https://electrasolar.in/calculator",
      },
    ],
  };

  return (
    <div className="py-12 lg:py-16 bg-[#f8fafc] min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#ea580c] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#ea580c] font-semibold">Sizing Calculator</span>
        </nav>

        <div className="space-y-3 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ea580c] block">
            System Design &amp; Sizing
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#091e3a] tracking-tight">
            Solar, Inverter &amp; Battery Sizing Assistant
          </h1>
          <div className="w-16 h-1 bg-[#ea580c] rounded-full" />
          <p className="text-gray-600 text-base leading-relaxed">
            Use our engineering calculation engine to determine the optimal hybrid solar inverter rating,
            rooftop solar array size, and lithium battery storage capacity for your specific facility.
          </p>
        </div>

        <SolarCalculator />

        {/* Engineering Methodology Note */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 space-y-3 text-xs text-gray-600 shadow-xs">
          <h2 className="text-sm font-bold text-[#091e3a] uppercase tracking-wider">
            Calculation Methodology &amp; Assumptions
          </h2>
          <p>
            1. <strong>Solar Insolation:</strong> Assumes an average of 4.2 to 4.8 peak sun hours per day across Indian geographic zones, yielding approximately 120 kWh generated per kWp of installed solar PV per month.
          </p>
          <p>
            2. <strong>Inverter Capacity:</strong> Sized to comfortably support inductive motor surges and air-conditioning startup currents without tripping. For 3-phase commercial facilities, inverters are rated with 100% phase unbalance capacity.
          </p>
          <p>
            3. <strong>Battery Storage:</strong> Sized for safe 80% Depth-of-Discharge (DoD) utilizing automotive-grade LiFePO4 cells. Final single-line diagram (SLD) should be validated by an Electra application engineer during a site audit.
          </p>
        </div>
      </div>
    </div>
  );
}
