import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { SERVICES } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Engineering Services & Commissioning | Electra Solar",
  description:
    "Comprehensive solar engineering services: site surveys, single-line diagram design, turnkey installation, commissioning, and AMC maintenance in India.",
  alternates: {
    canonical: "https://electrasolar.in/services",
  },
  openGraph: {
    title: "Site Survey, Turnkey EPC & 24/7 AMC Services | Electra Solar",
    description:
      "Comprehensive engineering audits, harmonic analysis, DG synchronization commissioning, and AMC SLA support across India.",
    url: "https://electrasolar.in/services",
    siteName: "Electra Solar",
    type: "website",
    images: [
      {
        url: "/images/hero/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Electra Solar Engineering Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Services & Commissioning | Electra Solar",
    description:
      "Site surveys, electrical single-line diagram design, turnkey commissioning, and 24/7 AMC support.",
    images: ["/images/hero/hero-bg.jpg"],
  },
};

export default function ServicesPage() {
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Engineering Services & Turnkey Commissioning | Electra Solar",
    description:
      "Comprehensive engineering audits, harmonic analysis, DG synchronization commissioning, and AMC SLA support.",
    url: "https://electrasolar.in/services",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: SERVICES.map((srv, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://electrasolar.in/services/${srv.slug}`,
        name: srv.title,
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
        name: "Services",
        item: "https://electrasolar.in/services",
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
          <span className="text-[#ea580c] font-semibold">Services</span>
        </nav>

        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ea580c] block">
            Turnkey Engineering
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#091e3a] tracking-tight">
            Lifecycle Engineering Services
          </h1>
          <div className="w-16 h-1 bg-[#ea580c]" />
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            From electrical load profiling and single-line diagrams (SLD) to synchronized commissioning and round-the-clock industrial maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 transition-all hover:shadow-xl hover:border-[#ea580c]/40 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-orange-50 text-[#ea580c] inline-block">
                  {srv.badge}
                </span>

                <h2 className="text-xl font-bold text-[#091e3a] group-hover:text-[#ea580c] transition-colors">
                  {srv.title}
                </h2>

                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {srv.shortDesc}
                </p>

                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Core Deliverables:
                  </div>
                  {srv.deliverables.slice(0, 3).map((d, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ea580c] flex-shrink-0 mt-0.5" />
                      <span className="font-medium leading-snug">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100">
                <Link
                  href={`/services/${srv.slug}`}
                  className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Explore Service Scope</span>
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
