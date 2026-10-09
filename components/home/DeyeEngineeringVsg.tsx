"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { useEnquiryModal } from "@/components/forms/EnquiryModalContext";

export function DeyeEngineeringVsg() {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <section className="py-24 bg-white border-b border-gray-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Deye Watermark Typography "DSP / VSG" */}
          <div className="lg:col-span-3 text-center lg:text-right border-b lg:border-b-0 lg:border-r-2 border-gray-200 pb-6 lg:pb-0 lg:pr-10">
            <div className="text-7xl sm:text-8xl lg:text-[130px] font-black tracking-tighter text-[#3a3a3a]/15 leading-none select-none">
              DSP
            </div>
            <div className="text-sm font-bold uppercase tracking-widest text-[#015cbb] mt-2">
              Virtual Synchronous Generator
            </div>
          </div>

          {/* Center Column: Engineering Benefits Narrative */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#015cbb] block">
              Core Technical Advantage
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-[#222222] tracking-tight leading-tight">
              Improving Business Benefits & Power Resilience
            </h3>

            <p className="text-[#5c5c5c] text-sm sm:text-base leading-relaxed">
              EnerTech’s full series bi-directional solar hybrid inverters support advanced Virtual Synchronous Generator (VSG) algorithms. During grid failure, the inverter synchronizes directly with diesel generators without requiring additional third-party EMS devices.
            </p>

            <p className="text-[#5c5c5c] text-sm sm:text-base leading-relaxed">
              With frequency droop control, contactor-less zero-break static transfer (&lt; 5ms), and 100% phase unbalance immunity, Electra Solar installations thrive in unstable grid corridors without causing nuisance trips or voltage dips.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#222222]">
              <span className="flex items-center gap-1.5 bg-[#f5f7fa] px-3 py-1.5 rounded-full border border-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#015cbb]" />
                Zero-Break &lt; 5ms
              </span>
              <span className="flex items-center gap-1.5 bg-[#f5f7fa] px-3 py-1.5 rounded-full border border-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#015cbb]" />
                100% Phase Tolerance
              </span>
              <span className="flex items-center gap-1.5 bg-[#f5f7fa] px-3 py-1.5 rounded-full border border-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#015cbb]" />
                No Extra EMS Required
              </span>
            </div>

            <div className="pt-4">
              <button
                onClick={() => openEnquiryModal({ source: "Deye Engineering VSG Section" })}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#015cbb] hover:text-[#004896]"
              >
                <span>Consult an EnerTech Systems Engineer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Hardware Render with Signature Blue Circular Glow */}
          <div className="lg:col-span-4 relative flex items-center justify-center">
            {/* Deye Blue Circular Halo */}
            <div className="absolute w-56 h-56 rounded-full bg-[#015cbb]/10 border-2 border-[#015cbb]/30 animate-pulse pointer-events-none" />

            <div className="relative z-10 w-52 h-72">
              <Image
                src="/images/products/sunmagic-1ph.webp"
                alt="DSP Bi-Directional Inverter Hardware"
                fill
                className="object-contain filter drop-shadow-[-10px_20px_15px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
