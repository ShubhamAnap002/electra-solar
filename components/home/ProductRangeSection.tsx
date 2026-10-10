"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";

export function ProductRangeSection() {
  const categories = [
    {
      title: "Solar Hybrid Inverters",
      range: "3kW – 50kW (Parallel to 800kW)",
      subtitle: "Zero-break transfer with 100% phase unbalance tolerance",
      image: "/images/products/sunmagic-3ph.webp",
      href: "/products/solar-hybrid-inverters",
      badge: "Hybrid PCU",
    },
    {
      title: "Modular LiFePO4 Batteries",
      range: "5kWh – 200kWh+ High Voltage",
      subtitle: "Prismatic lithium cells with active balancing intelligent BMS",
      image: "/images/products/lfp-battery.webp",
      href: "/products/batteries",
      badge: "LFP Storage",
    },
    {
      title: "Commercial & Industrial BESS",
      range: "50kWh – 2MWh Turnkey Systems",
      subtitle: "Turnkey energy storage for peak shaving and tariff management",
      image: "/images/products/enercube-bess.webp",
      href: "/products/bess",
      badge: "C&I Storage",
    },
    {
      title: "Industrial Online UPS & Power",
      range: "10kVA – 300kVA Double Conversion",
      subtitle: "Zero-transfer online power conditioning for mission-critical loads",
      image: "/images/products/online-ups.webp",
      href: "/products/solar-online-ups",
      badge: "Power Quality",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold tracking-widest uppercase mb-3 border border-slate-200">
            <span>35+ YEARS TECHNICAL HERITAGE</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-[#091e3a] tracking-tight leading-tight">
            Engineered Power Electronics &amp; Storage
          </h2>
          
          <p className="text-sm sm:text-base text-gray-600 mt-2.5 leading-relaxed max-w-2xl mx-auto">
            Industrial-grade hybrid inverters, modular energy storage, and power conditioning manufactured in technical partnership with EnerTech UPS Pvt. Ltd.
          </p>
        </div>

        {/* 4 Clean Hardware Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs hover:shadow-xl hover:border-[#ea580c]/60 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Visual Image Studio Stage */}
                <div className="relative w-full h-48 bg-gradient-to-b from-slate-50 to-slate-100/70 rounded-xl overflow-hidden mb-4 p-4 flex items-center justify-center border border-slate-100 group-hover:from-orange-50/30 group-hover:to-orange-50/60 transition-colors">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-contain p-3 filter drop-shadow-md group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <span className="absolute top-2.5 right-2.5 bg-white/95 text-[10px] font-bold text-gray-700 px-2 py-0.5 rounded shadow-xs border border-gray-200 uppercase tracking-wider">
                    {cat.badge}
                  </span>
                </div>

                {/* Card Title & Specs */}
                <h3 className="text-base font-bold text-[#091e3a] group-hover:text-[#ea580c] transition-colors leading-snug">
                  {cat.title}
                </h3>
                
                <div className="text-xs font-mono font-bold text-[#ea580c] mt-1">
                  {cat.range}
                </div>
                
                <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2">
                  {cat.subtitle}
                </p>
              </div>

              {/* Bottom Explore Link */}
              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#091e3a] group-hover:text-[#ea580c] transition-colors">
                <span>Explore Series</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#ea580c]" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Catalog Action Bar */}
        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#091e3a] hover:text-[#ea580c] border border-gray-300 hover:border-[#ea580c] bg-white px-6 py-2.5 rounded-full shadow-xs hover:shadow-md transition-all"
          >
            <span>View All Verified Products &amp; Datasheets</span>
            <ArrowRight className="w-4 h-4 text-[#ea580c]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
