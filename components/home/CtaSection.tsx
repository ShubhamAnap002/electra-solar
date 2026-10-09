"use client";

import React from "react";
import { Phone, Mail, MapPin, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { COMPANY } from "@/lib/data/company";

export function CtaSection() {
  return (
    <>
      {/* Deye .init-260116-2 Online Service & Fast Quote Section */}
      <section className="py-24 bg-[#0d1b2a] text-white relative overflow-hidden border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Direct Factory & Distributor Support Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#51b2e3] block">
                Direct Engineering Support
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Official Engineering & Online Service
              </h2>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Connect directly with Electra Solar and EnerTech’s application engineering team in Pune for system sizing, single-line diagrams (SLD), and distributor pricing.
              </p>

              {/* Direct Service Lines */}
              <div className="space-y-4 pt-2 text-sm text-gray-300">
                <div className="border-l-2 border-[#015cbb] pl-4">
                  <div className="text-xs text-gray-400 uppercase font-bold">Email Desk</div>
                  <a
                    href={`mailto:${COMPANY.contact.salesEmail}`}
                    className="text-base font-semibold text-white hover:text-[#51b2e3] transition-colors"
                  >
                    {COMPANY.contact.salesEmail}
                  </a>
                </div>

                <div className="border-l-2 border-[#51b2e3] pl-4">
                  <div className="text-xs text-gray-400 uppercase font-bold">Sales & Sizing Lines</div>
                  <div className="text-base font-bold font-mono text-white">
                    {COMPANY.contact.salesPhone1} / {COMPANY.contact.salesPhone2}
                  </div>
                </div>

                <div className="border-l-2 border-[#015cbb] pl-4">
                  <div className="text-xs text-gray-400 uppercase font-bold">Emergency Technical Service (Pune)</div>
                  <div className="text-base font-bold font-mono text-[#51b2e3]">
                    {COMPANY.contact.supportPhone}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-gray-400">
                <Clock className="w-4 h-4 text-[#51b2e3]" />
                <span>Response Time: 24–48 hours on-site engineering across Maharashtra</span>
              </div>
            </div>

            {/* Right Column: Embedded Technical Quote Form */}
            <div className="lg:col-span-7">
              <div className="bg-white text-gray-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#015cbb] block">
                    Fast Proposal Request
                  </span>
                  <h3 className="text-2xl font-black text-[#222222] tracking-tight">
                    Request System Sizing & Price Proposal
                  </h3>
                  <p className="text-xs text-[#5c5c5c] mt-1">
                    Fill in your project details. An EnerTech certified application engineer will prepare your quote.
                  </p>
                </div>

                <QuoteForm isCompact={false} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deye .init-260116-3 Headquarters & Factory Strip */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f8fafd] border border-gray-200">
              <div className="w-12 h-12 rounded-xl bg-[#e6f0fa] flex items-center justify-center text-[#015cbb] flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#222222] mb-1">Manufacturing & Technical Plant</h4>
                <p className="text-xs text-[#5c5c5c] leading-relaxed">
                  Bhare/Ghotawade, Near Hinjawadi IT Park Phase 3, Pune, Maharashtra, India.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f8fafd] border border-gray-200">
              <div className="w-12 h-12 rounded-xl bg-[#e6f0fa] flex items-center justify-center text-[#015cbb] flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#222222] mb-1">Commercial & Direct Sales</h4>
                <p className="text-xs text-[#5c5c5c] leading-relaxed font-mono">
                  +91 9822407189 / +91 9373336340<br />
                  Mon–Sat, 9:00 AM – 7:00 PM IST
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f8fafd] border border-gray-200">
              <div className="w-12 h-12 rounded-xl bg-[#e6f0fa] flex items-center justify-center text-[#015cbb] flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#222222] mb-1">Engineering Enquiry Desk</h4>
                <p className="text-xs text-[#5c5c5c] leading-relaxed">
                  contact@electrasolar.in<br />
                  sales@electrasolar.in
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
