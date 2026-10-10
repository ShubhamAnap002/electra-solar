import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, CheckCircle, ChevronRight } from "lucide-react";
import { getStoredProjects } from "@/lib/store";

export const metadata: Metadata = {
  title: "Installation Projects & Case Studies | Electra Solar",
  description:
    "Explore verified solar hybrid inverter and BESS installations across automotive plants, hospitals, luxury villas, and agro cold chains in India.",
  alternates: {
    canonical: "https://electrasolar.in/projects",
  },
  openGraph: {
    title: "Commissioned Solar Projects & Case Studies | Electra Solar",
    description:
      "Explore real-world industrial installations across Chakan MIDC, Hinjawadi, Lonavala, and Baramati.",
    url: "https://electrasolar.in/projects",
    siteName: "Electra Solar",
    type: "website",
    images: [
      {
        url: "/images/hero/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Electra Solar Commissioned Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Projects & Case Studies | Electra Solar",
    description:
      "Explore real-world industrial installations across Chakan, Hinjawadi, Lonavala, and Baramati.",
    images: ["/images/hero/hero-bg.jpg"],
  },
};

export default function ProjectsPage() {
  const projects = getStoredProjects();

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Commissioned Solar Projects & Case Studies | Electra Solar",
    description:
      "Explore verified solar hybrid inverter and BESS installations across automotive plants, hospitals, luxury villas, and agro cold chains.",
    url: "https://electrasolar.in/projects",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://electrasolar.in/projects/${p.slug}`,
        name: p.title,
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
        name: "Projects",
        item: "https://electrasolar.in/projects",
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
          <span className="text-[#ea580c] font-semibold">Projects</span>
        </nav>

        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#ea580c] text-xs font-semibold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Field Proven Reliability</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#091e3a] tracking-tight">
            Featured Installation Projects
          </h1>
          <div className="w-16 h-1 bg-[#ea580c] rounded-full" />
          <p className="text-[#5c5c5c] text-base leading-relaxed">
            Discover how Electra Solar and EnerTech hybrid systems deliver uninterrupted power,
            eliminate peak tariff penalties, and protect critical operations across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#ea580c]/40 transition-all shadow-deye-card hover:shadow-deye-hover group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="text-[#ea580c] font-semibold">{proj.category}</span>
                  <span className="font-mono text-[11px] bg-gray-100 px-2.5 py-1 rounded border border-gray-200 text-gray-700">
                    Commissioned {proj.completionYear}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-[#091e3a] group-hover:text-[#ea580c] transition-colors mb-2">
                  {proj.title}
                </h2>

                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
                  <MapPin className="w-4 h-4 text-[#ea580c] flex-shrink-0" />
                  <span>{proj.location}</span>
                </div>

                <div className="bg-orange-50/60 border border-orange-100 rounded-xl px-4 py-2.5 text-sm font-mono text-[#ea580c] font-bold mb-5">
                  System: {proj.capacity}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="text-xs text-gray-700">
                    <strong className="text-[#091e3a] block mb-0.5">The Challenge:</strong>
                    <span className="text-gray-500 line-clamp-2">{proj.challenge}</span>
                  </div>
                  <div className="text-xs text-gray-700">
                    <strong className="text-[#091e3a] block mb-0.5">The Solution:</strong>
                    <span className="text-gray-500 line-clamp-2">{proj.solution}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-gray-50 border border-gray-200 rounded-xl p-3 mb-6">
                  {proj.impactMetrics.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="text-xs">
                      <span className="text-[11px] text-gray-500 block">{m.label}</span>
                      <strong className="text-[#ea580c] font-mono text-sm">{m.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <blockquote className="text-xs text-gray-500 italic max-w-sm truncate">
                  &ldquo;{proj.quoteSnippet}&rdquo;
                </blockquote>
                <Link
                  href={`/projects/${proj.slug}`}
                  className="text-[#ea580c] hover:underline font-semibold text-xs flex items-center gap-1 flex-shrink-0 ml-2"
                >
                  <span>Full Case Study</span>
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
