"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Zap } from "lucide-react";

export function ProductRangeSection() {
  const categories = [
    {
      title: "Hybrid Inverters",
      range: "3kW – 50kW",
      desc: "Single & Three-Phase Hybrid PCUs with 100% unbalanced load tolerance.",
      image: "/images/products/sunmagic-3ph.webp",
      href: "/products/solar-hybrid-inverters",
      badge: "Best Seller",
    },
    {
      title: "Battery Storage",
      range: "5kWh – 200kWh+",
      desc: "High-voltage modular LiFePO4 battery banks with automotive-grade BMS.",
      image: "/images/products/enercube-bess.webp",
      href: "/products/bess",
      badge: "Tier-1 LFP",
    },
    {
      title: "Solar Solutions",
      range: "On & Off-Grid",
      desc: "High-efficiency monocrystalline PV panels and integrated solar architectures.",
      image: "/images/products/solar-panel-module.jpg",
      href: "/solutions",
      badge: "High Efficiency",
    },
    {
      title: "Accessories & UPS",
      range: "Monitoring & More",
      desc: "Smart IoT dongles, double-conversion online UPS systems, and battery chargers.",
      image: "/images/products/online-ups.webp",
      href: "/products/solar-online-ups",
      badge: "24/7 Uptime",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-[#f8fafc] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header from Mockup */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#015cbb] mb-1">
              Engineered Product Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              Our Product Range
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1 max-w-xl">
              Advanced energy solutions for a cleaner, smarter future.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#015cbb] hover:text-[#009cff] group transition-colors flex-shrink-0"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Category Cards from Mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm hover:shadow-xl hover:border-[#00d2ff]/60 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Visual Image Stage */}
                <div className="relative w-full h-52 bg-[#f1f5f9]/70 rounded-xl overflow-hidden mb-4 p-4 flex items-center justify-center group-hover:bg-[#e0f2fe]/40 transition-colors">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-contain p-3 group-hover:scale-108 transition-transform duration-500 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <span className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-[#015cbb] px-2 py-0.5 rounded shadow-xs border border-gray-100">
                    {cat.badge}
                  </span>
                </div>

                {/* Card Title & Specs */}
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#015cbb] transition-colors">
                  {cat.title}
                </h3>
                <div className="text-xs font-mono font-bold text-[#00b4d8] mt-0.5">
                  {cat.range}
                </div>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              {/* Bottom Explore Link */}
              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#015cbb] group-hover:text-[#009cff]">
                <span>Explore Models</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
