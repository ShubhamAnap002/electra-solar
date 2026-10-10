"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Download,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Check,
  Layers,
  Phone,
  Cpu,
  Zap,
} from "lucide-react";
import { Product, PRODUCTS } from "@/lib/data/products";
import { useEnquiryModal } from "@/components/forms/EnquiryModalContext";

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const { openEnquiryModal } = useEnquiryModal();

  // Group specs by category
  const specCategories = Array.from(
    new Set(product.specs.map((s) => s.category || "General Specifications"))
  );

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isFeatured)
  ).slice(0, 3);

  // Dynamic transfer / cycle spec depending on product category
  const isBattery = product.category === "batteries" || product.category === "bess";
  const isUPS = product.category === "solar-online-ups";
  const dynamicMetricLabel = isBattery ? "Cycle Life" : isUPS ? "Transfer Time" : "Transfer Time";
  const dynamicMetricValue = isBattery
    ? "6,000+ Cycles (80% DoD)"
    : isUPS
    ? "0ms (True Online)"
    : "< 5ms Zero Break";

  // Topic Cluster Internal Link Mapping
  let relatedCaseStudyHref = "/projects/chakan-automotive-manufacturing-plant";
  let relatedSolutionHref = "/solutions/commercial-industrial-power-solutions";
  let caseStudyName = "Precision Automotive Facility, Chakan MIDC";

  if (product.category === "solar-online-ups") {
    relatedCaseStudyHref = "/projects/hinjawadi-multispeciality-hospital";
    relatedSolutionHref = "/solutions/critical-infrastructure-and-healthcare";
    caseStudyName = "Multi-Speciality Hospital, Hinjawadi";
  } else if (product.category === "batteries" || product.slug.includes("single-phase")) {
    relatedCaseStudyHref = "/projects/lonavala-luxury-eco-villa";
    relatedSolutionHref = "/solutions/residential-solar-hybrid";
    caseStudyName = "Luxury Eco-Villa, Lonavala";
  }

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
        <Link href="/" className="hover:text-[#ea580c] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link href="/products" className="hover:text-[#ea580c] transition-colors">
          Products
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link href={`/products/${product.category}`} className="hover:text-[#ea580c] transition-colors">
          {product.categoryName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-[#091e3a] font-bold">
          {product.name}
        </span>
      </nav>

      {/* 2. Flagship Product Showcase Hero - Architectural Clean White */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Image Stage (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative w-full h-80 sm:h-96 lg:h-[460px] bg-gradient-to-b from-white to-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex items-center justify-center overflow-hidden group shadow-2xs">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                className="object-contain p-4 filter drop-shadow-2xl group-hover:scale-104 transition-transform duration-500 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <span className="absolute top-3.5 left-3.5 text-[11px] font-semibold text-slate-700 bg-white/95 px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
                Pune Factory Hardware
              </span>
              <span className="absolute bottom-3.5 right-3.5 text-[11px] font-mono text-slate-500 bg-white/90 px-2.5 py-1 rounded-md border border-slate-200">
                {product.modelCode}
              </span>
            </div>

            {/* Gallery Thumbnails */}
            {product.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-xl bg-slate-50 p-2 border transition-all flex-shrink-0 ${
                      selectedImage === img
                        ? "border-[#ea580c] ring-2 ring-orange-200 bg-orange-50/20"
                        : "border-slate-200 hover:border-slate-300 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-contain p-1" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Model Specs & Inquiry Engine (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-orange-50 text-[#ea580c] px-2.5 py-0.5 rounded-full border border-orange-200">
                  {product.highlightBadge}
                </span>
                <span className="text-xs font-mono font-bold text-[#091e3a] bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                  {product.modelCode}
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  {product.series}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#091e3a] tracking-tight leading-tight">
                {product.name}
              </h1>

              <div className="w-12 h-1 bg-[#ea580c] my-3 rounded-full" />

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Verified Key Specs Matrix - Clean Light Table Style (No Truncation) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-slate-50/70 border border-slate-200/90 rounded-xl p-3.5 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-slate-100">
                <span className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Rated Capacity</span>
                <strong className="text-gray-900 font-mono text-xs sm:text-sm block leading-snug">{product.capacityRange}</strong>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-100">
                <span className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Phase Rating</span>
                <strong className="text-[#ea580c] text-xs sm:text-sm block leading-snug font-bold">{product.phase}</strong>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-100">
                <span className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Peak Efficiency</span>
                <strong className="text-[#ea580c] font-mono text-xs sm:text-sm block leading-snug">{product.efficiency}</strong>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-100">
                <span className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">DC Bus / Voltage</span>
                <strong className="text-gray-900 font-mono text-xs sm:text-sm block leading-snug break-words">{product.dcBusVoltage}</strong>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-100">
                <span className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">{dynamicMetricLabel}</span>
                <strong className="text-[#ea580c] font-mono text-xs sm:text-sm block leading-snug">{dynamicMetricValue}</strong>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-100">
                <span className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Warranty</span>
                <strong className="text-gray-900 text-xs sm:text-sm block leading-snug font-bold">{product.warranty || "5 Years Factory"}</strong>
              </div>
            </div>

            {/* Target Application Card */}
            <div className="text-xs text-gray-700 bg-white p-3.5 rounded-xl border border-gray-200 flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-[#ea580c] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#091e3a]">Target Application: </strong>
                <span>{product.idealFor}</span>
              </div>
            </div>

            {/* Direct CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => openEnquiryModal({
                  productName: product.name,
                  source: `ProductDetail: ${product.name}`,
                })}
                className="flex-1 bg-[#091e3a] hover:bg-[#ea580c] text-white px-7 py-3 rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Request Factory Quote</span>
                <ArrowRight className="w-4 h-4 text-[#ea580c]" />
              </button>

              <button
                type="button"
                onClick={() => openEnquiryModal({
                  productName: product.name,
                  source: `Datasheet Download: ${product.name}`,
                })}
                className="inline-flex items-center justify-center font-bold rounded-full px-5 py-3 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-[#ea580c] hover:border-[#ea580c] transition-colors"
              >
                <Download className="w-4 h-4 mr-2 text-[#ea580c]" />
                <span>Datasheet</span>
              </button>
            </div>

            {/* Direct Hotline & Factory Trust */}
            <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-600">
              <a
                href="tel:+919822412345"
                className="inline-flex items-center gap-1.5 font-bold text-[#091e3a] hover:text-[#ea580c] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#ea580c]" />
                <span>Pune Sales Desk: +91 98224 12345</span>
              </a>
              <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>EnerTech Plant Warranty • Make in India</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Deep Product Overview & Engineering Features */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column: Key Features (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-[#091e3a] tracking-tight">
              Engineering Architecture &amp; Capabilities
            </h2>
            <div className="w-12 h-1 bg-[#ea580c] rounded-full" />
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-sm sm:text-base font-bold text-[#091e3a] tracking-tight flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#ea580c]" />
              <span>Key Operational Highlights</span>
            </h3>
            <div className="space-y-2.5">
              {product.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-xl p-3.5 flex items-start gap-3 text-xs sm:text-sm text-gray-700 shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#ea580c] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Built-in Protections & Applications (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Protections Box */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 text-[#091e3a] font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-[#ea580c]" />
              <span>Industrial Safety &amp; Protections</span>
            </div>
            <ul className="space-y-2 text-xs text-gray-600">
              {product.protections.map((prot, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#ea580c] flex-shrink-0 mt-0.5" />
                  <span>{prot}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Applications Box */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 text-[#091e3a] font-bold text-sm">
              <Layers className="w-5 h-5 text-[#ea580c]" />
              <span>Target Deployment Applications</span>
            </div>
            <ul className="space-y-2 text-xs text-gray-600">
              {product.applications.map((app, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#ea580c] flex-shrink-0 mt-0.5" />
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Complete Technical Specifications Table */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#ea580c] block mb-1">
              Engineering Datasheet
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#091e3a] tracking-tight">
              Verified Technical Specifications
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Certified manufacturer ratings conforming to CEA and BIS power electronics standards.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openEnquiryModal({
              productName: product.name,
              source: `Custom Specs Request: ${product.name}`,
            })}
            className="text-xs font-bold text-[#ea580c] hover:underline flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Custom rating consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-8">
          {specCategories.map((catName) => {
            const catSpecs = product.specs.filter((s) => (s.category || "General Specifications") === catName);
            return (
              <div key={catName} className="space-y-3">
                <h3 className="text-xs font-bold text-[#091e3a] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#ea580c] rounded-full" />
                  <span>{catName}</span>
                </h3>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100 text-xs sm:text-sm">
                  {catSpecs.map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      className={`grid grid-cols-1 sm:grid-cols-12 p-3 sm:px-5 sm:py-3.5 transition-colors gap-1 sm:gap-4 ${
                        sIdx % 2 === 0 ? "bg-[#f8fafc]" : "bg-white"
                      }`}
                    >
                      <div className="sm:col-span-5 text-gray-600 font-medium">
                        {spec.label}
                      </div>
                      <div className="sm:col-span-7 text-gray-900 font-semibold font-mono">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Provenance & Commissioning Case Study Cross-Link (Topic Cluster Linkage) */}
      <div className="bg-gradient-to-r from-[#091e3a] to-[#0d2a52] text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-1.5 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#ea580c] block">
            Field Provenance &amp; Commissioning Proof
          </span>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight">
            See This Hardware Class Commissioned at {caseStudyName}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Review real-world industrial data, diesel generator reduction metrics, and voltage stabilization results from operational facilities.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
          <Link
            href={relatedCaseStudyHref}
            className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-xs hover:shadow-md transition-all flex items-center gap-1.5"
          >
            <span>Read Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={relatedSolutionHref}
            className="border border-white/25 hover:border-white/60 text-white px-4 py-2.5 rounded-full font-semibold text-xs transition-colors"
          >
            <span>Target Solution Architecture</span>
          </Link>
        </div>
      </div>

      {/* 6. Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-[#091e3a] tracking-tight">
              Complementary Inverters &amp; Systems
            </h3>
            <Link
              href="/products"
              className="text-xs font-bold text-[#ea580c] hover:underline flex items-center gap-1 uppercase tracking-wider"
            >
              <span>View all products +</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-orange-300 transition-colors shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-36 bg-gradient-to-b from-white to-slate-50 rounded-lg mb-3 p-2 flex items-center justify-center border border-slate-100">
                    <Image src={rel.image} alt={rel.name} fill className="object-contain p-2" sizes="200px" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 line-clamp-1 mb-1">{rel.name}</h4>
                  <div className="text-xs text-[#ea580c] font-mono font-bold mb-2">{rel.capacityRange}</div>
                </div>
                <Link
                  href={`/products/${rel.category}/${rel.slug}`}
                  className="w-full text-center py-2 rounded-full text-xs font-bold border border-gray-200 text-[#091e3a] hover:border-[#ea580c] hover:text-[#ea580c] hover:bg-orange-50/50 transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
