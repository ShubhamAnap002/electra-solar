import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft, CheckCircle2 } from "lucide-react";
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
    alternates: {
      canonical: `https://electrasolar.in/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Electra Solar Engineering Services`,
      description: service.shortDesc,
      url: `https://electrasolar.in/services/${service.slug}`,
      siteName: "Electra Solar",
      type: "website",
      images: [
        {
          url: "/images/hero/hero-bg.jpg",
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.shortDesc,
      images: ["/images/hero/hero-bg.jpg"],
    },
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) {
    notFound();
  }

  // Schema.org Service & BreadcrumbList
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: "Solar Engineering & Power Systems Commissioning",
    description: service.description,
    url: `https://electrasolar.in/services/${service.slug}`,
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
        name: "Services",
        item: "https://electrasolar.in/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `https://electrasolar.in/services/${service.slug}`,
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
          <Link href="/services" className="hover:text-[#ea580c] transition-colors">
            Services
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#ea580c] font-semibold">{service.title}</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-deye-card">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#ea580c]">
              {service.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#091e3a] tracking-tight">
              {service.title}
            </h1>
            <div className="w-16 h-1 bg-[#ea580c] rounded-full" />
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              {service.shortDesc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Workflow & Deliverables (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#091e3a] tracking-tight">
                Service Scope &amp; Execution Philosophy
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Detailed Step-by-Step Workflow */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#091e3a] tracking-tight">
                Step-by-Step Engineering Execution:
              </h3>
              <div className="space-y-3">
                {service.processSteps.map((st) => (
                  <div
                    key={st.step}
                    className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 flex items-start gap-4 shadow-sm"
                  >
                    <span className="w-9 h-9 rounded-xl bg-orange-50 text-[#ea580c] border border-orange-200 font-mono font-bold flex items-center justify-center flex-shrink-0 text-sm">
                      {st.step}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[#091e3a]">{st.title}</h4>
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
                    <CheckCircle2 className="w-4 h-4 text-[#ea580c] flex-shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-deye-card">
            <h3 className="text-xl font-bold text-[#091e3a] tracking-tight mb-2">
              Book this Service / Site Survey
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Connect with our field engineering team to schedule a site audit or technical design consultation.
            </p>
            <QuoteForm isCompact={false} />
          </div>
        </div>

        <div className="pt-4">
          <Link href="/services" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-[#ea580c] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all engineering services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
