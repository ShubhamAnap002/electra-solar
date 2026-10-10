import React from "react";
import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, ShieldCheck, MessageSquare, Sparkles, CheckCircle2 } from "lucide-react";
import { COMPANY } from "@/lib/data/company";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata: Metadata = {
  title: "Contact Electra Solar | Commercial Enquiries & Engineering Support",
  description:
    "Get in touch with Electra Solar for factory-direct quotes, technical load audits, dealer inquiries, and after-sales support in Pune, Maharashtra.",
  alternates: {
    canonical: "https://electrasolar.in/contact",
  },
  openGraph: {
    title: "Contact Electra Solar | Commercial Enquiries & Engineering Support",
    description:
      "Get in touch with Electra Solar for factory-direct quotes, technical load audits, and after-sales support in Pune, Maharashtra.",
    url: "https://electrasolar.in/contact",
    siteName: "Electra Solar",
    type: "website",
    images: [
      {
        url: "/images/hero/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Electra Solar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Electra Solar | Commercial Enquiries & Engineering Support",
    description:
      "Direct technical consultation and quotes for industrial solar inverters and BESS systems.",
    images: ["/images/hero/hero-bg.jpg"],
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Electra Solar",
    description:
      "Connect with certified solar application engineers for factory-direct quotations, technical load audits, and turnkey solar solutions.",
    url: "https://electrasolar.in/contact",
    mainEntity: {
      "@type": "LocalBusiness",
      name: COMPANY.name,
      telephone: COMPANY.contact.salesPhone1,
      email: COMPANY.contact.salesEmail,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Hinjawadi Commercial Corridor, Near IT Park Phase 2",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        postalCode: "412115",
        addressCountry: "IN",
      },
    },
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://electrasolar.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact Us",
        item: "https://electrasolar.in/contact",
      },
    ],
  };

  return (
    <div className="py-12 lg:py-16 bg-[#f8fafc] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#ea580c] text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect with Certified Application Engineers</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#091e3a] tracking-tight">
            Contact Electra Solar
          </h1>
          <div className="w-16 h-1 bg-[#ea580c] rounded-full" />
          <p className="text-gray-600 text-base leading-relaxed">
            Whether you require an official product quotation, a preliminary system sizing consultation,
            or dealer network information, our Pune technical desk is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div>
                <span className="text-xs font-bold text-[#ea580c] uppercase tracking-wider block mb-1">
                  Commercial Sales Desk
                </span>
                <h3 className="text-xl font-black text-[#091e3a]">Direct Phone Enquiries</h3>
              </div>

              <div className="space-y-3">
                <a
                  href={`tel:${COMPANY.contact.salesPhone1}`}
                  className="flex items-center gap-3 p-3.5 bg-gray-50 border border-gray-200 rounded-xl hover:border-orange-300 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-orange-50 text-[#ea580c] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-500 block">Commercial Desk 1</span>
                    <strong className="text-gray-900 font-mono text-sm group-hover:text-[#ea580c] transition-colors">
                      {COMPANY.contact.salesPhone1}
                    </strong>
                  </div>
                </a>

                <a
                  href={`tel:${COMPANY.contact.salesPhone2}`}
                  className="flex items-center gap-3 p-3.5 bg-gray-50 border border-gray-200 rounded-xl hover:border-orange-300 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-orange-50 text-[#ea580c] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-500 block">Commercial Desk 2</span>
                    <strong className="text-gray-900 font-mono text-sm group-hover:text-[#ea580c] transition-colors">
                      {COMPANY.contact.salesPhone2}
                    </strong>
                  </div>
                </a>

                <a
                  href={`tel:${COMPANY.contact.supportPhone}`}
                  className="flex items-center gap-3 p-3.5 bg-gray-50 border border-gray-200 rounded-xl hover:border-orange-300 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-orange-50 text-[#ea580c] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-500 block">Technical Care &amp; Support</span>
                    <strong className="text-gray-900 font-mono text-sm group-hover:text-[#ea580c] transition-colors">
                      {COMPANY.contact.supportPhone}
                    </strong>
                  </div>
                </a>
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-3 text-xs text-gray-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#ea580c] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block">Corporate Office &amp; Distribution Hub</strong>
                    <span className="text-gray-500 text-[11px] leading-relaxed block mt-0.5">
                      {COMPANY.contact.headquartersAddress}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#ea580c] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block">Email Proposals</strong>
                    <span className="text-[#ea580c] text-[11px] block mt-0.5 font-mono">
                      {COMPANY.contact.salesEmail}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block">Operational Hours</strong>
                    <span className="text-gray-500 text-[11px] block mt-0.5">
                      {COMPANY.contact.workingHours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Channel Partner Notice */}
            <div className="bg-orange-50/60 border border-orange-200 rounded-2xl p-5 text-xs text-gray-700 space-y-2">
              <div className="font-bold text-[#ea580c] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#ea580c]" />
                <span>EPC Contractors &amp; Solar Installers</span>
              </div>
              <p className="text-gray-600 leading-relaxed text-[11px]">
                Are you an EPC contractor, electrical consultant, or regional installer? We offer authorized wholesale distributor pricing, engineering SLD validation, and direct dispatch across India. Select &ldquo;Commercial&rdquo; in the form to request channel pricing.
              </p>
            </div>
          </div>

          {/* Right Column: Embedded Quote Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xs">
            <div className="mb-6">
              <span className="text-xs font-bold text-[#ea580c] uppercase tracking-wider block mb-1">
                Fast Turnaround
              </span>
              <h2 className="text-2xl font-black text-[#091e3a] tracking-tight">
                Submit Technical Proposal Request
              </h2>
              <div className="w-10 h-0.5 bg-[#ea580c] my-2" />
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
