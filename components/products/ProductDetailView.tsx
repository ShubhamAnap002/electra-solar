"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Download,
  Scale,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Check,
  Layers,
} from "lucide-react";
import { Product, PRODUCTS } from "@/lib/data/products";
import { useCompare } from "@/components/compare/CompareContext";
import { useEnquiryModal } from "@/components/forms/EnquiryModalContext";

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const { openEnquiryModal } = useEnquiryModal();
  const isCompared = isInCompare(product.id);

  // Group specs by category
  const specCategories = Array.from(
    new Set(product.specs.map((s) => s.category || "General Specifications"))
  );

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isFeatured)
  ).slice(0, 3);

  return (
    <div className="space-y-16">
      {/* 1. Breadcrumbs - Deye Style */}
      <div className="flex items-center gap-2 text-xs text-[#5c5c5c]">
        <Link href="/" className="hover:text-[#015cbb] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link href="/products" className="hover:text-[#015cbb] transition-colors">
          Products
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link href={`/products/${product.category}`} className="hover:text-[#015cbb] transition-colors">
          {product.categoryName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-[#015cbb] font-bold truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </div>

      {/* 2. Flagship Product Showcase Hero - Deye Style Clean White */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Interactive Image Stage (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative w-full h-80 sm:h-96 lg:h-[450px] bg-[#f8fafd] border border-gray-100 rounded-xl p-6 flex items-center justify-center overflow-hidden group">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                className="object-contain p-4 filter drop-shadow-lg group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <span className="absolute bottom-3 right-3 text-[11px] font-mono text-gray-500 bg-white/90 px-2.5 py-1 rounded border border-gray-200 shadow-sm">
                Official Hardware Render
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
                    className={`relative w-20 h-20 rounded-lg bg-[#f8fafd] p-2 border transition-all flex-shrink-0 ${
                      selectedImage === img
                        ? "border-[#015cbb] ring-2 ring-[#015cbb]/30"
                        : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-contain p-1" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Model Specs & Inquiry Engine (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-[#e6f0fa] text-[#015cbb] px-2.5 py-0.5 rounded-full border border-[#015cbb]/20">
                  {product.highlightBadge}
                </span>
                <span className="text-xs font-mono font-bold text-[#015cbb] bg-gray-100 px-2.5 py-0.5 rounded border border-gray-200">
                  {product.modelCode}
                </span>
                <span className="text-xs text-gray-500 font-semibold">
                  {product.series}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-[#222222] tracking-tight leading-tight">
                {product.name}
              </h1>

              <div className="w-12 h-1 bg-[#015cbb] my-3" />

              <p className="text-sm sm:text-base text-[#5c5c5c] leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Verified Key Specs Matrix - Deye Light Table Style */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#f5f7fa] border border-gray-200 rounded-xl p-4 text-xs">
              <div>
                <span className="block text-[11px] text-gray-500 font-medium">Rated Capacity</span>
                <strong className="text-[#222222] font-mono text-sm block">{product.capacityRange}</strong>
              </div>
              <div>
                <span className="block text-[11px] text-gray-500 font-medium">Phase Rating</span>
                <strong className="text-[#015cbb] text-sm block">{product.phase}</strong>
              </div>
              <div>
                <span className="block text-[11px] text-gray-500 font-medium">Peak Efficiency</span>
                <strong className="text-[#015cbb] font-mono text-sm block">{product.efficiency}</strong>
              </div>
              <div>
                <span className="block text-[11px] text-gray-500 font-medium">DC Voltage Bus</span>
                <strong className="text-[#222222] font-mono block truncate">{product.dcBusVoltage}</strong>
              </div>
              <div>
                <span className="block text-[11px] text-gray-500 font-medium">Transfer Time</span>
                <strong className="text-[#015cbb] font-mono block">&lt; 5ms Zero Break</strong>
              </div>
              <div>
                <span className="block text-[11px] text-gray-500 font-medium">Warranty</span>
                <strong className="text-[#222222] block">5 Years Factory</strong>
              </div>
            </div>

            {/* Ideal For Microcopy */}
            <div className="text-xs text-[#5c5c5c] bg-white p-3.5 rounded-lg border border-gray-200">
              <strong className="text-[#222222]">Target Application: </strong>
              <span>{product.idealFor}</span>
            </div>

            {/* Direct CTAs - Deye Style */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => openEnquiryModal({
                  productName: product.name,
                  source: `ProductDetail: ${product.name}`,
                })}
                className="w-full sm:w-auto bg-[#015cbb] hover:bg-[#004896] text-white px-7 py-3 rounded-full font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Request Official Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => (isCompared ? removeFromCompare(product.id) : addToCompare(product))}
                className={`w-full sm:w-auto inline-flex items-center justify-center font-bold rounded-full px-5 py-3 text-sm border transition-all ${
                  isCompared
                    ? "bg-[#015cbb] text-white border-[#015cbb]"
                    : "bg-white text-[#015cbb] border-[#015cbb]/40 hover:bg-[#e6f0fa]"
                }`}
              >
                <Scale className="w-4 h-4 mr-2" />
                <span>{isCompared ? "Compared (Remove)" : "Add to Comparison"}</span>
              </button>

              <button
                onClick={() => openEnquiryModal({
                  productName: product.name,
                  source: `Datasheet Download: ${product.name}`,
                })}
                className="w-full sm:w-auto inline-flex items-center justify-center font-semibold rounded-full px-5 py-3 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4 mr-2 text-[#015cbb]" />
                <span>Datasheet</span>
              </button>
            </div>

            {/* Factory Trust Stamp */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#5c5c5c]">
              <span className="flex items-center gap-1.5 text-[#015cbb] font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Direct EnerTech Pune Plant Warranty</span>
              </span>
              <span className="text-[11px] font-mono text-gray-400">Make in India</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Deep Product Overview & Engineering Features */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Key Features (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-black text-[#222222] tracking-tight">
              Engineering Architecture & Capabilities
            </h2>
            <div className="w-12 h-1 bg-[#015cbb]" />
            <p className="text-[#5c5c5c] text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-base font-bold text-[#222222] tracking-tight">Key Operational Highlights:</h3>
            <div className="space-y-2.5">
              {product.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-xl p-3.5 flex items-start gap-3 text-xs sm:text-sm text-[#444444] shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#015cbb] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Built-in Protections & Applications (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Protections Box */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-[#015cbb] font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>Industrial Safety & Protections</span>
            </div>
            <ul className="space-y-2 text-xs text-[#5c5c5c]">
              {product.protections.map((prot, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#015cbb] flex-shrink-0 mt-0.5" />
                  <span>{prot}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Applications Box */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-[#015cbb] font-bold text-sm">
              <Layers className="w-5 h-5" />
              <span>Recommended Target Applications</span>
            </div>
            <ul className="space-y-2 text-xs text-[#5c5c5c]">
              {product.applications.map((app, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#015cbb] flex-shrink-0 mt-0.5" />
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Complete Technical Specifications Table - Deye Striped Clean Table */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#015cbb] block mb-1">
              Engineering Datasheet
            </span>
            <h2 className="text-2xl font-black text-[#222222] tracking-tight">
              Verified Technical Specifications
            </h2>
            <p className="text-xs text-[#5c5c5c] mt-1">
              Certified manufacturer ratings conforming to CEA and BIS power electronics standards.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openEnquiryModal({
              productName: product.name,
              source: `Custom Specs Request: ${product.name}`,
            })}
            className="text-xs font-bold text-[#015cbb] hover:text-[#004896] flex items-center gap-1.5"
          >
            <span>Consult an engineer about customized ratings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-8">
          {specCategories.map((catName) => {
            const catSpecs = product.specs.filter((s) => (s.category || "General Specifications") === catName);
            return (
              <div key={catName} className="space-y-3">
                <h3 className="text-xs font-bold text-[#015cbb] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#015cbb] rounded-full" />
                  <span>{catName}</span>
                </h3>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100 text-xs sm:text-sm">
                  {catSpecs.map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      className={`grid grid-cols-1 sm:grid-cols-12 p-3 sm:px-5 sm:py-3.5 transition-colors gap-1 sm:gap-4 ${
                        sIdx % 2 === 0 ? "bg-[#f8fafd]" : "bg-white"
                      }`}
                    >
                      <div className="sm:col-span-5 text-[#5c5c5c] font-medium">
                        {spec.label}
                      </div>
                      <div className="sm:col-span-7 text-[#222222] font-semibold font-mono">
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

      {/* 5. Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-[#222222] tracking-tight">
              Complementary Inverters & Systems
            </h3>
            <Link
              href="/products"
              className="text-xs font-bold text-[#015cbb] hover:text-[#004896] flex items-center gap-1 uppercase tracking-wider"
            >
              <span>View all products +</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#015cbb]/40 transition-colors shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-36 bg-[#f8fafd] rounded-lg mb-3 p-2">
                    <Image src={rel.image} alt={rel.name} fill className="object-contain" sizes="200px" />
                  </div>
                  <h4 className="text-sm font-bold text-[#222222] line-clamp-1 mb-1">{rel.name}</h4>
                  <div className="text-xs text-[#015cbb] font-mono font-bold mb-2">{rel.capacityRange}</div>
                </div>
                <Link
                  href={`/products/${rel.category}/${rel.slug}`}
                  className="w-full text-center py-2 rounded-full text-xs font-bold border border-[#015cbb] text-[#015cbb] hover:bg-[#e6f0fa] transition-colors"
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
