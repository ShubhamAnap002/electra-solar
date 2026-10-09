import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, Factory, HeartPulse, Wheat, CheckCircle2 } from "lucide-react";
import { SOLUTIONS } from "@/lib/data/solutions";

export const metadata: Metadata = {
  title: "Solar Solutions & Applications | Electra Solar",
  description:
    "Tailored solar hybrid and energy storage solutions for residential villas, industrial factories, healthcare institutions, and agricultural microgrids.",
};

export default function SolutionsPage() {
  const getIcon = (id: string) => {
    switch (id) {
      case "residential-solar":
        return <Home className="w-6 h-6 text-[#015cbb]" />;
      case "commercial-industrial":
        return <Factory className="w-6 h-6 text-[#015cbb]" />;
      case "critical-infrastructure":
        return <HeartPulse className="w-6 h-6 text-[#015cbb]" />;
      default:
        return <Wheat className="w-6 h-6 text-[#015cbb]" />;
    }
  };

  return (
    <div className="py-12 lg:py-16 bg-[#f8fafd] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#015cbb] block">
            Sector Architectures
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#1a202c] tracking-tight">
            Engineered Energy Architectures
          </h1>
          <div className="w-16 h-1 bg-[#015cbb]" />
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Custom power architectures engineered to eliminate peak tariff penalties, equipment resets, and grid outage losses across Indian enterprises.
          </p>
        </div>

        {/* Solutions Grid - Clean & Uncluttered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SOLUTIONS.map((sol) => (
            <div
              key={sol.id}
              className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-[#015cbb]/30 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                    {getIcon(sol.id)}
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-[#015cbb]">
                    {sol.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1a202c] group-hover:text-[#015cbb] transition-colors mb-1.5">
                    {sol.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {sol.subtitle}
                  </p>
                </div>

                {/* 3 Concise Benefit Bullets */}
                <div className="space-y-2 pt-1">
                  {sol.keyBenefits.slice(0, 3).map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#015cbb] flex-shrink-0 mt-0.5" />
                      <span className="font-medium leading-snug">{b.split(":")[0]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-400">
                  Case Study: <strong className="text-gray-700">{sol.caseStudyHighlight.client}</strong>
                </span>
                <Link
                  href={`/solutions/${sol.slug}`}
                  className="bg-[#015cbb] hover:bg-[#004896] text-white px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
