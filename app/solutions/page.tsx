import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, Factory, HeartPulse, Wheat, CheckCircle2, ChevronRight } from "lucide-react";
import { SOLUTIONS } from "@/lib/data/solutions";

export const metadata: Metadata = {
  title: "Solar Solutions & Sector Architectures | Electra Solar",
  description:
    "Tailored solar hybrid and energy storage solutions for residential villas, industrial factories, healthcare institutions, and agricultural microgrids in India.",
  alternates: {
    canonical: "https://electrasolar.in/solutions",
  },
  openGraph: {
    title: "Turnkey Solar Solutions for C&I, Healthcare & Residential | Electra Solar",
    description:
      "Engineered solar architectures for luxury villas, commercial office complexes, industrial factories, and microgrids.",
    url: "https://electrasolar.in/solutions",
    siteName: "Electra Solar",
    type: "website",
    images: [
      {
        url: "/images/hero/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Electra Solar Energy Architectures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Solutions & Applications | Electra Solar",
    description:
      "Tailored solar hybrid and energy storage architectures for Indian industrial facilities and villas.",
    images: ["/images/hero/hero-bg.jpg"],
  },
};

export default function SolutionsPage() {
  const getIcon = (id: string) => {
    switch (id) {
      case "residential-solar":
        return <Home className="w-6 h-6 text-[#ea580c]" />;
      case "commercial-industrial":
        return <Factory className="w-6 h-6 text-[#ea580c]" />;
      case "critical-infrastructure":
        return <HeartPulse className="w-6 h-6 text-[#ea580c]" />;
      default:
        return <Wheat className="w-6 h-6 text-[#ea580c]" />;
    }
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Solar Energy Architectures & Sector Solutions | Electra Solar",
    description:
      "Tailored solar hybrid and energy storage solutions for residential villas, industrial factories, healthcare institutions, and microgrids.",
    url: "https://electrasolar.in/solutions",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: SOLUTIONS.map((s, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://electrasolar.in/solutions/${s.slug}`,
        name: s.title,
      })),
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
        name: "Solutions",
        item: "https://electrasolar.in/solutions",
      },
    ],
  };

  return (
    <div className="py-12 lg:py-16 bg-[#f8fafd] min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#ea580c] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#ea580c] font-semibold">Solutions</span>
        </nav>

        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ea580c] block">
            Sector Architectures
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#091e3a] tracking-tight">
            Engineered Energy Architectures
          </h1>
          <div className="w-16 h-1 bg-[#ea580c]" />
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Custom power architectures engineered to eliminate peak tariff penalties, equipment resets, and grid outage losses across Indian enterprises.
          </p>
        </div>

        {/* Solutions Grid - Clean & Uncluttered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SOLUTIONS.map((sol) => (
            <div
              key={sol.id}
              className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-[#ea580c]/40 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                    {getIcon(sol.id)}
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#ea580c]">
                    {sol.badge}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#091e3a] group-hover:text-[#ea580c] transition-colors mb-1.5">
                    {sol.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {sol.subtitle}
                  </p>
                </div>

                {/* 3 Concise Benefit Bullets */}
                <div className="space-y-2 pt-1">
                  {sol.keyBenefits.slice(0, 3).map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#ea580c] flex-shrink-0 mt-0.5" />
                      <span className="font-medium leading-snug">{b.split(":")[0]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-400">
                  Case Study: <strong className="text-gray-700">{sol.caseStudyHighlight.client}</strong>
                </span>
                <Link
                  href={`/solutions/${sol.slug}`}
                  className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
