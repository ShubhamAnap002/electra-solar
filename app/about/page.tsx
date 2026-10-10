import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Factory, Award, CheckCircle2, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { COMPANY } from "@/lib/data/company";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Electra Solar | Official Distributor of EnerTech",
  description:
    "Learn about Electra Solar's authorized partnership with EnerTech UPS Pvt. Ltd., 35+ years of power electronics pedigree, and our engineering capabilities in Pune, India.",
  alternates: {
    canonical: "https://electrasolar.in/about",
  },
  openGraph: {
    title: "About Electra Solar | Official Distributor of EnerTech",
    description:
      "Authorized distributor and engineering partner for EnerTech UPS Pvt. Ltd. (Pune, Estd. 1989). Delivering factory-backed solar hybrid inverters and BESS.",
    url: "https://electrasolar.in/about",
    siteName: "Electra Solar",
    type: "website",
    images: [
      {
        url: "/images/hero/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "About Electra Solar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Electra Solar | Official Distributor of EnerTech",
    description:
      "Learn about Electra Solar's authorized partnership with EnerTech UPS Pvt. Ltd. and 35+ years of power electronics pedigree.",
    images: ["/images/hero/hero-bg.jpg"],
  },
};

export default function AboutPage() {
  const rel = COMPANY.distributorRelationship;

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Electra Solar",
    description:
      "Electra Solar is the authorized distributor and systems engineering partner for EnerTech UPS Pvt. Ltd., delivering high-efficiency solar hybrid inverters, BESS, and power conditioning systems in India.",
    url: "https://electrasolar.in/about",
    mainEntity: {
      "@type": "Organization",
      name: COMPANY.name,
      legalName: "Electra Solar Solutions",
      url: "https://electrasolar.in",
      foundingDate: "1989",
      description: COMPANY.legalEntityNotice,
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
        name: "About Us",
        item: "https://electrasolar.in/about",
      },
    ],
  };

  return (
    <div className="py-12 lg:py-16 bg-[#f8fafc] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#ea580c] text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authorized Distributor &amp; Turnkey Partner</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#091e3a] tracking-tight">
            About Electra Solar
          </h1>
          <div className="w-16 h-1 bg-[#ea580c] rounded-full" />
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Positioned at the intersection of heavy industrial power electronics and clean solar energy,
            Electra Solar delivers robust, high-efficiency solar hybrid inverters, BESS, and zero-break
            power systems designed for India’s demanding electrical conditions.
          </p>
        </div>

        {/* Distributor Relationship Deep-Dive Card */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xs relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-[#ea580c] uppercase tracking-wider block mb-1">
                  Manufacturer Pedigree &amp; Scope
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#091e3a] tracking-tight">
                  Official Turnkey Partner of EnerTech UPS Pvt. Ltd.
                </h2>
                <div className="w-12 h-1 bg-[#ea580c] rounded-full my-3" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  Electra Solar is the authorized distributor and systems engineering partner for EnerTech UPS Pvt. Ltd. (Pune, Estd. 1989). We deliver factory-backed solar hybrid inverters, BESS, and zero-break power conditioning systems built to withstand extreme 50°C Indian operating conditions.
                </p>
              </div>

              {/* 4-Metric Executive Scorecard */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
                  <span className="text-[11px] text-gray-500 block">Heritage</span>
                  <strong className="text-[#091e3a] font-mono text-base block font-bold">35+ Years</strong>
                  <span className="text-[10px] text-gray-400">Estd. 1989</span>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
                  <span className="text-[11px] text-gray-500 block">Deployments</span>
                  <strong className="text-[#ea580c] font-mono text-base block font-bold">35,000+</strong>
                  <span className="text-[10px] text-gray-400">Field Proven</span>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
                  <span className="text-[11px] text-gray-500 block">Thermal Limit</span>
                  <strong className="text-[#091e3a] font-mono text-base block font-bold">50°C</strong>
                  <span className="text-[10px] text-gray-400">Ambient Rated</span>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
                  <span className="text-[11px] text-gray-500 block">Plant Hub</span>
                  <strong className="text-[#ea580c] text-sm block font-bold">Pune, IN</strong>
                  <span className="text-[10px] text-gray-400">Make in India</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-5 text-center">
              <div className="relative h-20 w-52 mx-auto">
                <Image
                  src="/images/brand/enertech-partner.png"
                  alt="EnerTech Manufacturer Partner Logo"
                  fill
                  className="object-contain"
                  sizes="208px"
                />
              </div>

              <div className="text-xs text-gray-700 space-y-3 text-left pt-3 border-t border-gray-200">
                <div className="flex items-start gap-2.5">
                  <Factory className="w-4 h-4 text-[#ea580c] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block">Manufacturing &amp; R&amp;D Plant</strong>
                    <span className="text-gray-500 text-[11px] leading-tight block">
                      {rel.plantLocation}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#ea580c] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block">Verified Distributor Scope</strong>
                    <span className="text-gray-500 text-[11px] leading-tight block">
                      {rel.verifiedScope}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 text-xs text-[#ea580c] font-semibold bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ea580c]" />
                  Direct Factory Warranty &amp; Spares Backed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars of Engineering Excellence */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#091e3a] tracking-tight">
              Why Indian Industry Trusts Our Systems
            </h2>
            <div className="w-12 h-1 bg-[#ea580c] mx-auto rounded-full" />
            <p className="text-sm text-gray-600">
              Built for real-world grid irregularities, high inductive loads, and harsh industrial environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#ea580c] flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-[#091e3a]">100% Phase Unbalance Capacity</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Independent phase regulation ensures heavy single-phase machine loads never trigger three-phase inverter trips or voltage sag.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#ea580c] flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-[#091e3a]">Heavy Galvanic Isolation</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Built-in copper isolation transformers completely shield sensitive electronics, CNC machines, and servers from grid surges.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#ea580c] flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-[#091e3a]">Active DG Synchronization</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Integrated governor dynamically throttles solar output during diesel generator operation, eliminating reverse power trips.
              </p>
            </div>
          </div>
        </div>

        {/* Corporate Contact Details */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-[#091e3a] tracking-tight">
              Headquarters &amp; Service Locations
            </h3>
            <div className="w-10 h-0.5 bg-[#ea580c]" />
            <p className="text-xs text-gray-500">
              Serving industrial manufacturing hubs and commercial centers across Western and Pan-India corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs">
            <div className="space-y-2">
              <span className="text-gray-500 uppercase font-semibold text-[11px] block">Corporate Office</span>
              <div className="flex items-start gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-[#ea580c] flex-shrink-0 mt-0.5" />
                <span>{COMPANY.contact.headquartersAddress}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-gray-500 uppercase font-semibold text-[11px] block">Direct Phone Lines</span>
              <div className="space-y-1 text-gray-700 font-mono">
                <div>Sales: <strong className="text-gray-900">{COMPANY.contact.salesPhone1}</strong></div>
                <div>Sales: <strong className="text-gray-900">{COMPANY.contact.salesPhone2}</strong></div>
                <div>Support: <strong className="text-[#ea580c]">{COMPANY.contact.supportPhone}</strong></div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-gray-500 uppercase font-semibold text-[11px] block">Active Service Corridors</span>
              <div className="flex flex-wrap gap-1.5">
                {COMPANY.contact.serviceHubs.map((hub, idx) => (
                  <span key={idx} className="bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200 text-gray-700 text-[11px]">
                    {hub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
