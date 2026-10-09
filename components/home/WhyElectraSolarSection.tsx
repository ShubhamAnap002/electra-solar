"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Award, Users, CheckCircle } from "lucide-react";

export function WhyElectraSolarSection() {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Luxury Solar Villa Showcase from Mockup (6 cols) */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden min-h-[380px] lg:min-h-[480px] shadow-xl group">
            <Image
              src="/images/showcase/solar-home-villa.jpg"
              alt="Electra Solar Premium Residential Rooftop Solar Installation"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Bottom Overlay Label */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#015cbb] uppercase tracking-wider">
                    Clean Energy Craftsmanship
                  </div>
                  <div className="text-sm font-black text-gray-900">
                    Smart Rooftop Solar Architecture
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 bg-[#e0f2fe] text-[#015cbb] font-bold text-xs px-2.5 py-1 rounded-full">
                    98.4% Efficiency
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Deep Navy Content Box from Mockup (6 cols) */}
          <div className="lg:col-span-6 bg-[#091e3a] text-white rounded-3xl p-8 sm:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden border border-white/10">
            {/* Ambient Cyan Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#00d2ff]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-[#00d2ff]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authorized EnerTech Partner</span>
              </div>

              {/* Exact Mockup Heading */}
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Why Electra Solar?
              </h2>

              {/* Exact Mockup Body Copy */}
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                We bring world-class solar technology from Deye to India, with trusted service, expert support and complete energy solutions for a sustainable future.
              </p>

              {/* Verified Trust Badges */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <CheckCircle className="w-4 h-4 text-[#00d2ff] flex-shrink-0" />
                  <span>Heavy-duty 100% unbalanced phase load tolerance</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <CheckCircle className="w-4 h-4 text-[#00d2ff] flex-shrink-0" />
                  <span>Sub-5ms zero-break UPS changeover for critical machinery</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <CheckCircle className="w-4 h-4 text-[#00d2ff] flex-shrink-0" />
                  <span>Direct Pune factory warranty & 24/7 industrial SLA coverage</span>
                </div>
              </div>
            </div>

            {/* Exact Mockup 3 Metrics Grid */}
            <div className="relative z-10 pt-8 mt-8 border-t border-white/15 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-3xl sm:text-4xl font-black text-[#00d2ff] font-mono tracking-tight">
                  10+
                </div>
                <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1">
                  Years Experience
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                  50+
                </div>
                <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1">
                  Projects Completed
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-black text-[#00d2ff] font-mono tracking-tight">
                  1000+
                </div>
                <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1">
                  Happy Customers
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
