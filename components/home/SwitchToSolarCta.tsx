"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { useEnquiryModal } from "@/components/forms/EnquiryModalContext";
import { COMPANY } from "@/lib/data/company";

export function SwitchToSolarCta() {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-[#091e3a] text-white shadow-xl border border-gray-100">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center relative z-10">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-gray-200 text-xs font-bold border border-white/15">
                <span className="w-2 h-2 rounded-full bg-[#f97316]" />
                <span>Zero Commitment • Free Engineering Sizing</span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Switch to Solar Today
              </h2>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Lower your electricity bills and safeguard against blackouts with industrial-grade hybrid solar power.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                {/* Primary: Solar Orange Pill Button */}
                <button
                  onClick={() => openEnquiryModal({ source: "Switch to Solar Banner CTA" })}
                  className="w-full sm:w-auto bg-[#f97316] hover:bg-[#ea580c] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`tel:${COMPANY.contact.salesPhone1}`}
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-4 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#f97316]" />
                  <span>Call {COMPANY.contact.salesPhone1}</span>
                </a>
              </div>
            </div>

            {/* Right Solar Panels Photo (5 cols) */}
            <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-full min-h-[320px] overflow-hidden">
              <Image
                src="/images/panels/solar-panel-cta.jpg"
                alt="High Efficiency Blue Photovoltaic Solar Panels"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#091e3a] via-transparent to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091e3a] via-transparent to-transparent lg:hidden" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
