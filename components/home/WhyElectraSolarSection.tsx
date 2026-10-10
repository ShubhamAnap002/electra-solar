"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Award, Users, CheckCircle } from "lucide-react";

export function WhyElectraSolarSection() {
  return (
    <section className="py-20 lg:py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Luxury Solar Villa Showcase (6 cols) */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden min-h-[380px] lg:min-h-[480px] shadow-lg border border-gray-100 group">
            <Image
              src="/images/showcase/solar-home-villa.jpg"
              alt="Electra Solar Premium Residential Rooftop Solar Installation"
              fill
              className="object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Bottom Overlay Label */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-md border border-white/40">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider">
                    Clean Energy Craftsmanship
                  </div>
                  <div className="text-sm font-black text-gray-900">
                    Smart Rooftop Solar Architecture
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 bg-orange-50 text-[#ea580c] font-bold text-xs px-2.5 py-1 rounded-full border border-orange-200">
                    98.4% Efficiency
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Solid Deep Navy Content Box (6 cols) - Zero Artificial Glowing Blobs */}
          <div className="lg:col-span-6 bg-[#091e3a] text-white rounded-3xl p-8 sm:p-12 flex flex-col justify-between shadow-xl relative overflow-hidden border border-white/10">
            
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-[#f97316]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#f97316]" />
                <span>Authorized EnerTech Technical Partner</span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Why Electra Solar?
              </h2>

              {/* Body Copy */}
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                We bring world-class solar technology to India, backed by 35+ years of Pune factory heritage, trusted field service, and turnkey technical support for homes, businesses, and critical infrastructure.
              </p>

              {/* Verified Trust Badges */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-sm text-gray-200">
                  <CheckCircle className="w-4 h-4 text-[#f97316] flex-shrink-0" />
                  <span>Heavy-duty 100% unbalanced phase load tolerance</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-200">
                  <CheckCircle className="w-4 h-4 text-[#f97316] flex-shrink-0" />
                  <span>Sub-5ms zero-break UPS changeover for critical machinery</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-200">
                  <CheckCircle className="w-4 h-4 text-[#f97316] flex-shrink-0" />
                  <span>Direct Pune plant warranty &amp; 24/7 industrial SLA coverage</span>
                </div>
              </div>
            </div>

            {/* Exact 3 Metrics Grid */}
            <div className="relative z-10 pt-8 mt-8 border-t border-white/15 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-3xl sm:text-4xl font-black text-[#f97316] font-mono tracking-tight">
                  35+
                </div>
                <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1">
                  Years Heritage
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                  35,000+
                </div>
                <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1">
                  Systems Commissioned
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-black text-[#f97316] font-mono tracking-tight">
                  100%
                </div>
                <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1">
                  Phase Unbalance
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
