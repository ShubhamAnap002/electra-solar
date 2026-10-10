import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft, ArrowRight, CheckCircle2, Calculator } from "lucide-react";
import { SOLUTIONS } from "@/lib/data/solutions";
import { PRODUCTS } from "@/lib/data/products";
import { ProductCard } from "@/components/products/ProductCard";

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
    title: `${solution.title} | Turnkey Solar Architecture | Electra Solar`,
    description: solution.overview,
    alternates: {
      canonical: `https://electrasolar.in/solutions/${solution.slug}`,
    },
    openGraph: {
      title: `${solution.title} | Electra Solar`,
      description: solution.overview,
      url: `https://electrasolar.in/solutions/${solution.slug}`,
      siteName: "Electra Solar",
      type: "website",
      images: [
        {
          url: solution.heroImage || "/images/hero/hero-bg.jpg",
          width: 1200,
          height: 630,
          alt: solution.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: solution.title,
      description: solution.overview,
      images: [solution.heroImage || "/images/hero/hero-bg.jpg"],
    },
  };
}

// Helper to resolve case study link from solution metadata
function getCaseStudyHref(slug: string): string {
  switch (slug) {
    case "residential-solar-hybrid":
      return "/projects/lonavala-luxury-eco-villa";
    case "commercial-industrial-power-solutions":
      return "/projects/chakan-automotive-manufacturing-plant";
    case "critical-infrastructure-and-healthcare":
      return "/projects/hinjawadi-multispeciality-hospital";
    case "remote-microgrids-and-agriculture":
      return "/projects/baramati-agro-cold-chain-facility";
    default:
      return "/projects";
  }
}

export default function SolutionDetailPage({ params }: SolutionPageProps) {
  const solution = SOLUTIONS.find((s) => s.slug === params.slug);
  if (!solution) {
    notFound();
  }

  const recommendedProducts = PRODUCTS.filter((p) =>
    solution.recommendedProductIds.includes(p.id)
  );

  const caseStudyHref = getCaseStudyHref(solution.slug);

  // Schema.org Service & BreadcrumbList
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.title,
    serviceType: "Solar Power Architecture & Energy Storage Engineering",
    description: solution.overview,
    url: `https://electrasolar.in/solutions/${solution.slug}`,
    provider: {
      "@type": "Organization",
      name: "Electra Solar",
      url: "https://electrasolar.in",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
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
        name: "Solutions",
        item: "https://electrasolar.in/solutions",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: solution.title,
        item: `https://electrasolar.in/solutions/${solution.slug}`,
      },
    ],
  };

  return (
    <div className="py-12 lg:py-16 bg-[#f8fafd] min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
          <Link href="/" className="hover:text-[#ea580c] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/solutions" className="hover:text-[#ea580c] transition-colors">
            Solutions
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#ea580c] font-semibold">{solution.title}</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-deye-card">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#ea580c]">
              {solution.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#091e3a] tracking-tight">
              {solution.title}
            </h1>
            <div className="w-16 h-1 bg-[#ea580c] rounded-full" />
            <p className="text-lg text-[#ea580c] font-semibold">
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
              Operational Vulnerability &amp; Challenge
            </div>
            <h2 className="text-xl font-bold text-[#091e3a]">The Grid Dilemma</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {solution.problemStatement}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-3 shadow-sm">
            <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider">
              Electra Engineered Architecture
            </div>
            <h2 className="text-xl font-bold text-[#091e3a]">The System Solution</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {solution.solutionArchitecture}
            </p>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 space-y-6 shadow-deye-card">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#091e3a] tracking-tight">
              Key Operational &amp; Financial Benefits
            </h2>
            <div className="w-12 h-1 bg-[#ea580c] rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {solution.keyBenefits.map((b, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-[#ea580c] flex-shrink-0 mt-0.5" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study Highlight Box with Direct Bi-Directional Link */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#ea580c]">
                Verified Field Implementation Proof
              </div>
              <h2 className="text-xl font-bold text-[#091e3a]">
                {solution.caseStudyHighlight.client} — {solution.caseStudyHighlight.location}
              </h2>
            </div>
            <span className="font-mono text-xs text-[#ea580c] bg-orange-100/70 px-3 py-1 rounded-full border border-orange-200 self-start sm:self-auto">
              {solution.caseStudyHighlight.systemCapacity}
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {solution.caseStudyHighlight.result}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-gray-100">
            <Link
              href={caseStudyHref}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#091e3a] hover:text-[#ea580c] transition-colors"
            >
              <span>Read Full Commissioning Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#ea580c]" />
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ea580c] hover:underline"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculate Solar &amp; Battery Sizing for this Architecture</span>
            </Link>
          </div>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#091e3a] tracking-tight">
                Recommended Hardware for this Architecture
              </h2>
              <div className="w-12 h-1 bg-[#ea580c] rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {recommendedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        <div className="pt-4">
          <Link href="/solutions" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-[#ea580c] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all energy solutions</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
