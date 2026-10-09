import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { SERVICES } from "@/lib/data/services";
import { QuoteForm } from "@/components/forms/QuoteForm";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({
    slug: s.slug,
  }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return { title: "Service Not Found | Electra Solar" };
  return {
    title: `${service.title} | Electra Solar Engineering`,
    description: service.shortDesc,
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) {
    notFound();
  }

  return (
    <div className="py-12 lg:py-16 bg-[#f8fafd] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#015cbb] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/services" className="hover:text-[#015cbb] transition-colors">
            Services
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#015cbb] font-semibold">{service.title}</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-deye-card">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#015cbb]">
              {service.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#222222] tracking-tight">
              {service.title}
            </h1>
            <div className="w-16 h-1 bg-[#015cbb] rounded-full" />
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              {service.shortDesc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Workflow & Deliverables (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#222222] tracking-tight">
                Service Scope & Execution Philosophy
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Detailed Step-by-Step Workflow */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#222222] tracking-tight">
                Step-by-Step Engineering Execution:
              </h3>
              <div className="space-y-3">
                {service.processSteps.map((st) => (
                  <div
                    key={st.step}
                    className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 flex items-start gap-4 shadow-sm"
                  >
                    <span className="w-9 h-9 rounded-xl bg-blue-50 text-[#015cbb] border border-blue-200 font-mono font-bold flex items-center justify-center flex-shrink-0 text-sm">
                      {st.step}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[#222222]">{st.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {st.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables List */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Confirmed Client Deliverables:
              </h3>
              <div className="space-y-2.5">
                {service.deliverables.map((deliv, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#015cbb] flex-shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-deye-card">
            <h3 className="text-xl font-bold text-[#222222] tracking-tight mb-2">
              Book this Service / Site Survey
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Connect with our field engineering team to schedule a site audit or technical design consultation.
            </p>
            <QuoteForm isCompact={false} />
          </div>
        </div>

        <div className="pt-4">
          <Link href="/services" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-[#015cbb] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all engineering services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
