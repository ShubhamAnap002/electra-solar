import React from "react";
import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, ShieldCheck, MessageSquare, Sparkles, CheckCircle2 } from "lucide-react";
import { COMPANY } from "@/lib/data/company";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata: Metadata = {
  title: "Contact Electra Solar | Commercial Enquiries & Engineering Support",
  description:
    "Get in touch with Electra Solar for factory-direct quotes, technical load audits, dealer inquiries, and after-sales support in Pune, Maharashtra.",
};

export default function ContactPage() {
  return (
    <div className="py-12 lg:py-16 bg-[#f8fafd] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#015cbb] text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect with Certified Application Engineers</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#222222] tracking-tight">
            Contact Electra Solar
          </h1>
          <div className="w-16 h-1 bg-[#015cbb] rounded-full" />
          <p className="text-[#5c5c5c] text-base leading-relaxed">
            Whether you require an official product quotation, a preliminary system sizing consultation,
            or dealer network information, our Pune technical desk is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-deye-card">
              <div>
                <span className="text-xs font-bold text-[#015cbb] uppercase tracking-wider block mb-1">
                  Commercial Sales Desk
                </span>
                <h3 className="text-xl font-bold text-[#222222]">Direct Phone Enquiries</h3>
              </div>

              <div className="space-y-3">
                <a
                  href={`tel:${COMPANY.contact.salesPhone1}`}
                  className="flex items-center gap-3 p-3.5 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#015cbb] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#015cbb] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-500 block">Commercial Desk 1</span>
                    <strong className="text-[#222222] font-mono text-sm group-hover:text-[#015cbb] transition-colors">
                      {COMPANY.contact.salesPhone1}
                    </strong>
                  </div>
                </a>

                <a
                  href={`tel:${COMPANY.contact.salesPhone2}`}
                  className="flex items-center gap-3 p-3.5 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#015cbb] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#015cbb] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-500 block">Commercial Desk 2</span>
                    <strong className="text-[#222222] font-mono text-sm group-hover:text-[#015cbb] transition-colors">
                      {COMPANY.contact.salesPhone2}
                    </strong>
                  </div>
                </a>

                <a
                  href={`tel:${COMPANY.contact.supportPhone}`}
                  className="flex items-center gap-3 p-3.5 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#015cbb] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#015cbb] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-500 block">Technical Care & Support</span>
                    <strong className="text-[#222222] font-mono text-sm group-hover:text-[#015cbb] transition-colors">
                      {COMPANY.contact.supportPhone}
                    </strong>
                  </div>
                </a>
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-3 text-xs text-gray-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#015cbb] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#222222] block">Corporate Office & Distribution Hub</strong>
                    <span className="text-gray-500 text-[11px] leading-relaxed block mt-0.5">
                      {COMPANY.contact.headquartersAddress}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#015cbb] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#222222] block">Email Proposals</strong>
                    <span className="text-[#015cbb] text-[11px] block mt-0.5 font-mono">
                      {COMPANY.contact.salesEmail}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#222222] block">Operational Hours</strong>
                    <span className="text-gray-500 text-[11px] block mt-0.5">
                      {COMPANY.contact.workingHours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Channel Partner Notice */}
            <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-5 text-xs text-gray-700 space-y-2">
              <div className="font-bold text-[#015cbb] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#015cbb]" />
                <span>EPC Contractors & Solar Installers</span>
              </div>
              <p className="text-gray-600 leading-relaxed text-[11px]">
                Are you an EPC contractor, electrical consultant, or regional installer? We offer authorized wholesale distributor pricing, engineering SLD validation, and direct dispatch across India. Select &ldquo;Commercial&rdquo; in the form to request channel pricing.
              </p>
            </div>
          </div>

          {/* Right Column: Embedded Quote Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-deye-card">
            <div className="mb-6">
              <span className="text-xs font-bold text-[#015cbb] uppercase tracking-wider block mb-1">
                Fast Turnaround
              </span>
              <h2 className="text-2xl font-bold text-[#222222] tracking-tight">
                Submit Technical Proposal Request
              </h2>
              <div className="w-10 h-0.5 bg-[#015cbb] my-2" />
              <p className="text-xs text-gray-500 mt-1">
                Provide your project specifications below. Our senior power engineer will contact you with sizing and quote documents.
              </p>
            </div>

            <QuoteForm isCompact={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
