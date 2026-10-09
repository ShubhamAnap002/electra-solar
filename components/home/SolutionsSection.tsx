"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function SolutionsSection() {
  const deyeSolutions = [
    {
      id: "commercial-pv",
      title: "Commercial & Industrial (C&I)",
      slug: "commercial-industrial-power-solutions",
      image: "/images/products/sunmagic-3ph.webp",
      desc: "Peak shaving, ToD tariff optimization, and seamless DG sync for Indian factories.",
      badge: "Industrial PV",
    },
    {
      id: "bess",
      title: "Commercial Energy Storage",
      slug: "commercial-industrial-power-solutions",
      image: "/images/products/enercube-bess.webp",
      desc: "High-density modular BESS for diesel replacement and maximum demand penalty elimination.",
      badge: "C&I BESS",
    },
    {
      id: "residential-storage",
      title: "Residential Energy Independence",
      slug: "residential-solar-hybrid",
      image: "/images/products/sunmagic-1ph.webp",
      desc: "Zero-break (< 5ms) silent power backup for luxury villas, homes, and private estates.",
      badge: "Residential",
    },
    {
      id: "healthcare-critical",
      title: "Critical Infrastructure & Hospitals",
      slug: "critical-infrastructure-and-healthcare",
      image: "/images/products/online-ups.webp",
      desc: "Hospital-grade true 0ms double-conversion power protection for diagnostic MRI & ICU suites.",
      badge: "Mission Critical",
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#f8fafd] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header - Clean, High Impact */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-widest text-[#015cbb] block">
            Sector Architectures
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1a202c] tracking-tight">
            Tailored Clean Energy Solutions
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Engineered power systems eliminating peak tariffs, voltage dips, and grid unreliability.
          </p>
        </div>

        {/* 4-Column Card Grid - Clean & Uncluttered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deyeSolutions.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-[#015cbb]/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Image Stage */}
                <div className="relative w-full h-44 bg-[#f1f5f9] p-4 flex items-center justify-center overflow-hidden">
                  <div className="relative w-32 h-32">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 250px"
                    />
                  </div>
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#015cbb] px-2.5 py-0.5 rounded-full border border-gray-200/80 shadow-sm">
                    {item.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-[#1a202c] leading-snug group-hover:text-[#015cbb] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-50">
                <Link
                  href={`/solutions/${item.slug}`}
                  className="text-xs font-bold text-[#015cbb] hover:text-[#004896] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
