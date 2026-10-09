"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { useEnquiryModal } from "@/components/forms/EnquiryModalContext";

export function DeyeFlagshipShowcase() {
  const { openEnquiryModal } = useEnquiryModal();

  const technicalMetrics = [
    {
      title: "100% Phase Unbalance",
      desc: "Tolerates severe uneven load distribution across phases without tripping or voltage sags.",
    },
    {
      title: "< 5ms Zero-Break Transfer",
      desc: "Contactor-less static transfer protects industrial CNCs, textile machines, and medical equipment.",
    },
    {
      title: "Direct DG Synchronization",
      desc: "Modulates solar generation dynamically to operate alongside diesel generators without reverse power.",
    },
    {
      title: "50°C Ambient Thermal Rating",
      desc: "Built with heavy copper galvanic isolation and industrial IGBTs for harsh Indian environments.",
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-white relative overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Clean Hardware Stage with Subtle Glowing Accent (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Subtle Circular Ambient Glow */}
            <div className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-[#015cbb]/10 border-2 border-[#015cbb]/30 animate-pulse pointer-events-none" />

            <div className="relative z-10 w-full max-w-sm flex items-center justify-center">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96">
                <Image
                  src="/images/products/sunmagic-3ph.webp"
                  alt="SunMagic 3-Phase Heavy Duty Hybrid Inverter"
                  fill
                  className="object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)] hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 350px"
                />
              </div>
            </div>
          </div>

          {/* Right Column: High-Precision Technical Proposition (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#015cbb] text-xs font-bold border border-blue-200">
                <Zap className="w-3.5 h-3.5" />
                <span>Heavy Industrial Flagship</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1a202c] tracking-tight leading-tight">
                SunMagic REeFI 3-Phase Hybrid PCU
              </h2>
              <div className="text-lg sm:text-xl font-bold text-[#015cbb] font-mono">
                10 kVA to 300 kVA Modular Capacity
              </div>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed pt-1">
                Engineered specifically for demanding Indian manufacturing, multi-storey commercial campuses, and healthcare networks requiring unbroken three-phase solar power.
              </p>
            </div>

            {/* 4-Item Technical Metric Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {technicalMetrics.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#f8fafd] border border-gray-200/80 space-y-1"
                >
                  <div className="flex items-center gap-2 text-[#015cbb] font-bold text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed pl-6">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={() =>
                  openEnquiryModal({
                    productName: "SunMagic 3-Phase Solar Hybrid Inverter",
                    source: "Flagship Innovation Section",
                  })
                }
                className="bg-[#015cbb] hover:bg-[#004896] text-white px-7 py-3 rounded-full font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span>Request Technical Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/products/solar-hybrid-inverters/sunmagic-three-phase-solar-hybrid-inverter"
                className="inline-flex items-center gap-2 text-[#015cbb] hover:text-[#004896] font-bold text-xs sm:text-sm px-6 py-3 rounded-full border border-gray-300 hover:border-[#015cbb] transition-all"
              >
                <span>Full Datasheet Specifications</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
