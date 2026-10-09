"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Send, Phone } from "lucide-react";
import { useEnquiryModal } from "@/components/forms/EnquiryModalContext";
import { COMPANY } from "@/lib/data/company";

export function SwitchToSolarCta() {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#015cbb] via-[#024794] to-[#0077b6] text-white shadow-2xl">
          {/* Ambient Lighting & Solar Grid Mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,210,255,0.2),transparent)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center relative z-10">
            {/* Left Content Column from Mockup (7 cols) */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold backdrop-blur-md border border-white/20">
                <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-pulse" />
                <span>Zero Commitment • Free Engineering Sizing</span>
              </div>

              {/* Exact Mockup Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Switch to Solar Today
              </h2>

              {/* Exact Mockup Subtitle */}
              <p className="text-base sm:text-lg text-blue-100 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Lower your electricity bills. Reduce your carbon footprint with industrial-grade hybrid solar power.
              </p>

              {/* Exact Mockup Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                {/* Primary: Vibrant Tech Cyan Pill Button */}
                <button
                  onClick={() => openEnquiryModal({ source: "Switch to Solar Banner CTA" })}
                  className="w-full sm:w-auto bg-[#00d2ff] hover:bg-[#00b4d8] text-[#091e3a] px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider shadow-xl shadow-[#00d2ff]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`tel:${COMPANY.contact.salesPhone1}`}
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/25 px-6 py-4 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  <Phone className="w-4 h-4 text-[#00d2ff]" />
                  <span>Call {COMPANY.contact.salesPhone1}</span>
                </a>
              </div>
            </div>

            {/* Right Solar Panels Photo from Mockup (5 cols) */}
            <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-full min-h-[320px] overflow-hidden">
              <Image
                src="/images/panels/solar-panel-cta.jpg"
                alt="High Efficiency Blue Photovoltaic Solar Panels"
                fill
                className="object-cover object-center scale-105"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              {/* Left-to-Right Gradient Blend so the photo fades into the blue background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#024794] via-transparent to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#024794] via-transparent to-transparent lg:hidden" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
