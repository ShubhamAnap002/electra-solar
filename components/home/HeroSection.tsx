"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Zap, Smartphone, Globe, Play, Sparkles, CheckCircle2 } from "lucide-react";
import { useEnquiryModal } from "@/components/forms/EnquiryModalContext";
import { COMPANY } from "@/lib/data/company";

export function HeroSection() {
  const { openEnquiryModal } = useEnquiryModal();

  const highlights = [
    {
      icon: <Zap className="w-5 h-5 text-[#00d2ff]" />,
      title: "High Efficiency",
      subtitle: "Up to 98.4%",
    },
    {
      icon: <Smartphone className="w-5 h-5 text-[#00d2ff]" />,
      title: "Smart Monitoring",
      subtitle: "Real-time via App",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#00d2ff]" />,
      title: "Reliable & Durable",
      subtitle: "IP65 Protection",
    },
    {
      icon: <Globe className="w-5 h-5 text-[#00d2ff]" />,
      title: "Global Support",
      subtitle: "Pan-India Turnkey SLA",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#091e3a] via-[#0b2144] to-[#07172c] text-white overflow-hidden border-b border-white/10">
      {/* Background Graphic & Luminous Solar Light Rays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/panels/solar-panel-cta.jpg"
          alt="Electra Solar High Efficiency PV"
          fill
          priority
          className="object-cover object-center opacity-15 mix-blend-screen scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#091e3a]/95 via-[#091e3a]/80 to-[#0b2144]/60" />
        {/* Signature Cyan Radial Glow */}
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#00d2ff]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Description & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-gray-200 text-xs font-semibold backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-pulse" />
              <span className="text-[#00d2ff] font-bold">Official Partner</span>
              <span className="text-gray-400">•</span>
              <span>EnerTech UPS Pvt. Ltd. (Pune Plant • Estd. 1989)</span>
            </div>

            {/* Exact Mockup Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-white tracking-tight leading-[1.12]">
              Powering a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] via-[#80d8ff] to-white">
                Sustainable Tomorrow
              </span>
            </h1>

            {/* Exact Mockup Sub-headline */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              High-efficiency solar inverters and energy storage solutions for homes, businesses and industries.
              Engineered with 100% phase unbalance tolerance and zero-break transfer (&lt; 5ms).
            </p>

            {/* Exact Mockup Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Primary: Vibrant Tech Cyan Pill */}
              <Link
                href="/products"
                className="w-full sm:w-auto bg-[#00d2ff] hover:bg-[#00b4d8] text-[#091e3a] px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-wider shadow-xl shadow-[#00d2ff]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Secondary: Watch Video / Sizing Tool */}
              <button
                onClick={() => openEnquiryModal({ source: "Hero Sizing Consultation CTA" })}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-[#00d2ff]/60 px-7 py-3.5 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <div className="w-5 h-5 rounded-full bg-[#00d2ff]/20 text-[#00d2ff] flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Get Free Consultation</span>
              </button>
            </div>

            {/* Trust Assurance Strip */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs text-gray-300/90 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00d2ff]" />
                Tier-1 Components
              </span>
              <span className="text-gray-600 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00d2ff]" />
                35+ Years Heritage
              </span>
              <span className="text-gray-600 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00d2ff]" />
                35,000+ Commissioned
              </span>
            </div>
          </div>

          {/* Right Column: 3D Studio Showcase from Mockup (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none flex flex-col items-center justify-center">
              {/* Product Visual Container with Ambient Cyan Platform */}
              <div className="relative w-full rounded-3xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-2 group hover:border-[#00d2ff]/50 transition-all duration-500">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/hero/hero-solar-system.jpg"
                    alt="Electra Solar Hybrid Inverter and Battery Energy Storage System"
                    fill
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 550px"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091e3a]/80 via-transparent to-transparent pointer-events-none" />

                  {/* High Precision Live Hardware Overlay Badge */}
                  <div className="absolute top-3 left-3 bg-[#091e3a]/90 backdrop-blur-md border border-[#00d2ff]/40 text-white px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-ping" />
                    <span>Hybrid PCU + LiFePO4 BESS</span>
                  </div>

                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/20 text-[#00d2ff] px-2.5 py-1 rounded-md text-[10px] font-mono font-bold">
                    3kW – 50kW / 500kWh
                  </div>

                  {/* Bottom Hotspot Highlight Banner */}
                  <div className="absolute bottom-3 left-3 right-3 bg-[#091e3a]/90 backdrop-blur-md border border-white/15 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#00d2ff]" />
                        <span>Integrated Microgrid Hub</span>
                      </div>
                      <div className="text-[11px] text-gray-300">Bi-directional inverter + DG synchronization</div>
                    </div>
                    <Link
                      href="/products"
                      className="text-xs font-bold text-[#00d2ff] hover:underline flex items-center gap-1 flex-shrink-0 ml-2"
                    >
                      <span>Specs</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hero Highlights Strip - EXACT 4 PILLARS FROM MOCKUP */}
      <div className="border-t border-white/10 bg-[#061528]/95 backdrop-blur-md py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#00d2ff]/10 border border-[#00d2ff]/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                {item.icon}
              </div>
              <div>
                <div className="font-bold text-white text-sm tracking-tight">{item.title}</div>
                <div className="text-xs text-[#00d2ff] font-medium">{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
