"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Scale, Check, Sparkles } from "lucide-react";
import { Product } from "@/lib/data/products";
import { useCompare } from "@/components/compare/CompareContext";
import { useEnquiryModal } from "@/components/forms/EnquiryModalContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const { openEnquiryModal } = useEnquiryModal();
  const isCompared = isInCompare(product.id);

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const shortCategory =
    product.shortType ||
    (product.categoryName === "Solar Hybrid Inverters"
      ? "Hybrid Inverter"
      : product.categoryName);

  const capacityBadge =
    product.capacityBadge ||
    (product.capacityRange.includes("–")
      ? product.capacityRange.split("–")[0].trim() + " - " + product.capacityRange.split("–")[1].split("(")[0].trim()
      : product.capacityRange.split("(")[0].trim());

  const specsList =
    product.displaySpecs && product.displaySpecs.length > 0
      ? product.displaySpecs
      : [
          product.phase,
          product.mpptChannels.includes("MPPT") ? "Dual MPPT Channels" : "DSP Controlled",
          "LV Battery Supported",
        ];

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-3xl p-5 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:border-[#015cbb]/40 transition-all duration-300 hover:-translate-y-1.5 h-full">
      {/* Floating Compare Button in Top Right */}
      <button
        type="button"
        onClick={toggleCompare}
        className={`absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          isCompared
            ? "bg-[#015cbb] text-white shadow-md ring-2 ring-[#015cbb]/30"
            : "bg-gray-100/80 hover:bg-[#015cbb] text-gray-400 hover:text-white"
        }`}
        title={isCompared ? "Remove from comparison" : "Add to side-by-side comparison"}
        aria-label="Toggle comparison"
      >
        <Scale className="w-3.5 h-3.5" />
      </button>

      {/* Main Content Area */}
      <div>
        {/* Top Product Showcase (Image + Right Side Badging) */}
        <div className="flex flex-row items-center gap-3 sm:gap-4 pt-1 pb-3">
          {/* Left: Photorealistic Inverter Hardware Visual */}
          <Link
            href={`/products/${product.category}/${product.slug}`}
            className="relative w-1/2 h-44 sm:h-48 flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ease-out"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain filter drop-shadow-[0_12px_18px_rgba(0,0,0,0.14)]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
            />
          </Link>

          {/* Right: Red NEW Badge + Title + Deye Blue Capacity Pill + Spec Box */}
          <div className="w-1/2 flex flex-col items-start justify-center pr-1 space-y-1.5">
            {/* Red NEW Pill Badge (matches Deye screenshot) */}
            <div>
              <span className="bg-[#e53e3e] text-white text-[9px] font-black px-1.5 py-0.5 rounded-[2px] uppercase tracking-wider inline-block">
                NEW
              </span>
            </div>

            {/* Category / Type Header */}
            <Link
              href={`/products/${product.category}/${product.slug}`}
              className="text-xs sm:text-[13px] font-bold text-[#222222] tracking-tight leading-tight hover:text-[#015cbb] transition-colors line-clamp-1"
              title={shortCategory}
            >
              {shortCategory}
            </Link>

            {/* Deye Signature Bold Blue Capacity Pill */}
            <div className="w-full bg-[#015cbb] text-white py-1 px-2.5 rounded-full font-black text-[11px] sm:text-xs text-center tracking-tight shadow-sm whitespace-nowrap overflow-hidden text-ellipsis">
              {capacityBadge}
            </div>

            {/* Deye Style Spec Box with Clean Borders */}
            <div className="w-full bg-[#fbfcfd] border border-gray-200/90 rounded-lg p-2 text-[10px] sm:text-[11px] text-[#444444] space-y-0.5 font-medium text-center shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
              {specsList.slice(0, 3).map((spec, i) => (
                <div key={i} className={`truncate ${i === 2 ? "text-[#015cbb] font-semibold" : ""}`}>
                  {spec}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Area: Deye Dark Capsule Model Code + Clean Action Footer */}
      <div className="mt-2 pt-2 border-t border-gray-100 space-y-2">
        {/* Deye Dark Grey Pill Button with Model Code (matches screenshot) */}
        <Link
          href={`/products/${product.category}/${product.slug}`}
          className="w-full bg-[#2b2f38] group-hover:bg-[#015cbb] text-white text-[10px] sm:text-[11px] font-mono font-medium py-2 px-3 rounded-xl text-center block transition-all tracking-tight truncate shadow-sm group-hover:shadow-md"
          title={`View specifications for ${product.modelCode}`}
        >
          {product.modelCode}
        </Link>

        {/* Action Micro-Bar */}
        <div className="flex items-center justify-between text-xs pt-1 px-1">
          <Link
            href={`/products/${product.category}/${product.slug}`}
            className="text-gray-500 hover:text-[#015cbb] font-semibold text-[11px] flex items-center gap-1 transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              openEnquiryModal({
                productName: product.name,
                source: `ProductCard Quick Quote: ${product.name}`,
              });
            }}
            className="text-[#015cbb] hover:text-[#004896] bg-blue-50 hover:bg-blue-100/80 px-3 py-1 rounded-full font-bold text-[11px] transition-colors border border-blue-200"
          >
            Quote ↗
          </button>
        </div>
      </div>
    </div>
  );
}
