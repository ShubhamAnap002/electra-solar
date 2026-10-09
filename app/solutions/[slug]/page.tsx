import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { SOLUTIONS } from "@/lib/data/solutions";
import { PRODUCTS } from "@/lib/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";

interface SolutionPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({
    slug: s.slug,
  }));
}

export function generateMetadata({ params }: SolutionPageProps): Metadata {
  const solution = SOLUTIONS.find((s) => s.slug === params.slug);
  if (!solution) return { title: "Solution Not Found | Electra Solar" };
  return {
    title: `${solution.title} | Electra Solar`,
    description: solution.overview,
  };
}

export default function SolutionDetailPage({ params }: SolutionPageProps) {
  const solution = SOLUTIONS.find((s) => s.slug === params.slug);
  if (!solution) {
    notFound();
  }

  const recommendedProducts = PRODUCTS.filter((p) =>
    solution.recommendedProductIds.includes(p.id)
  );

  return (
    <div className="py-12 lg:py-16 bg-[#f8fafd] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#015cbb] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/solutions" className="hover:text-[#015cbb] transition-colors">
            Solutions
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#015cbb] font-semibold">{solution.title}</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-deye-card">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#015cbb]">
              {solution.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#222222] tracking-tight">
              {solution.title}
            </h1>
            <div className="w-16 h-1 bg-[#015cbb] rounded-full" />
            <p className="text-lg text-[#015cbb] font-semibold">
              {solution.tagline}
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {solution.subtitle}
            </p>
          </div>
        </div>

        {/* Problem vs Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-3 shadow-sm">
            <div className="text-xs font-bold text-red-600 uppercase tracking-wider">
              Operational Vulnerability & Challenge
            </div>
            <h3 className="text-xl font-bold text-[#222222]">The Grid Dilemma</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {solution.problemStatement}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-3 shadow-sm">
            <div className="text-xs font-bold text-[#015cbb] uppercase tracking-wider">
              Electra Engineered Architecture
            </div>
            <h3 className="text-xl font-bold text-[#222222]">The System Solution</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {solution.solutionArchitecture}
            </p>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 space-y-6 shadow-deye-card">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#222222] tracking-tight">
              Key Operational & Financial Benefits
            </h2>
            <div className="w-12 h-1 bg-[#015cbb] rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {solution.keyBenefits.map((b, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-[#015cbb] flex-shrink-0 mt-0.5" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study Highlight Box */}
        <div className="bg-gradient-to-r from-blue-50/50 via-white to-blue-50/30 border border-blue-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#015cbb]">
                Verified Field Implementation
              </div>
              <h3 className="text-xl font-bold text-[#222222]">
                {solution.caseStudyHighlight.client} — {solution.caseStudyHighlight.location}
              </h3>
            </div>
            <span className="font-mono text-xs text-[#015cbb] bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
              {solution.caseStudyHighlight.systemCapacity}
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {solution.caseStudyHighlight.result}
          </p>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#222222] tracking-tight">
                Recommended Hardware for this Architecture
              </h2>
              <div className="w-12 h-1 bg-[#015cbb] rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {recommendedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        <div className="pt-4">
          <Link href="/solutions" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-[#015cbb] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all energy solutions</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
