import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft, ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import { getStoredProjects, getStoredProjectBySlug } from "@/lib/store";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const projects = getStoredProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getStoredProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found | Electra Solar" };
  return {
    title: `${project.title} (${project.location}) | Case Study | Electra Solar`,
    description: `Installation case study: ${project.title} in ${project.location}. Capacity: ${project.capacity}. Verified engineering metrics & commissioning.`,
    alternates: {
      canonical: `https://electrasolar.in/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Electra Solar Case Study`,
      description: `Installation case study: ${project.title} in ${project.location}. System: ${project.capacity}.`,
      url: `https://electrasolar.in/projects/${project.slug}`,
      siteName: "Electra Solar",
      type: "article",
      images: [
        {
          url: project.image || "/images/hero/hero-bg.jpg",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

// Helper to resolve installed hardware string to specific product detail route
function getProductLink(name: string): { href: string; label: string } {
  const lower = name.toLowerCase();
  if (lower.includes("3-phase") || lower.includes("three phase") || (lower.includes("sunmagic") && lower.includes("100"))) {
    return {
      href: "/products/solar-hybrid-inverters/sunmagic-three-phase-solar-hybrid-inverter",
      label: "View 3-Phase PCU Specs",
    };
  }
  if (lower.includes("single") || lower.includes("1-phase")) {
    return {
      href: "/products/solar-hybrid-inverters/sunmagic-single-phase-solar-hybrid-inverter",
      label: "View 1-Phase PCU Specs",
    };
  }
  if (lower.includes("enercube") || lower.includes("bess")) {
    return {
      href: "/products/bess/enercube-commercial-battery-energy-storage-system",
      label: "View EnerCube BESS Specs",
    };
  }
  if (lower.includes("online ups") || lower.includes("ups")) {
    return {
      href: "/products/solar-online-ups/solar-online-ups-system",
      label: "View Solar Online UPS Specs",
    };
  }
  if (lower.includes("lfp") || lower.includes("lithium") || lower.includes("battery")) {
    return {
      href: "/products/batteries/lfp-lithium-iron-phosphate-battery-module",
      label: "View LFP Battery Specs",
    };
  }
  if (lower.includes("stabilizer") || lower.includes("servo")) {
    return {
      href: "/products/power-conditioning/industrial-servo-voltage-stabilizer",
      label: "View Servo Stabilizer Specs",
    };
  }
  return {
    href: "/products",
    label: "Explore Equipment Specs",
  };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = getStoredProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  // Schema.org CaseStudy/Article & BreadcrumbList
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${project.title} — Solar Hybrid Installation Case Study`,
    description: `Turnkey installation case study: ${project.title} in ${project.location}. System: ${project.capacity}.`,
    image: `https://electrasolar.in${project.image || "/images/hero/hero-bg.jpg"}`,
    author: {
      "@type": "Organization",
      name: "Electra Solar Engineering Desk",
    },
    publisher: {
      "@type": "Organization",
      name: "Electra Solar",
      logo: {
        "@type": "ImageObject",
        url: "https://electrasolar.in/images/brand/enertech-partner.png",
      },
    },
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
    datePublished: `${project.completionYear}-01-01`,
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
        name: "Projects",
        item: "https://electrasolar.in/projects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `https://electrasolar.in/projects/${project.slug}`,
      },
    ],
  };

  return (
    <div className="py-12 lg:py-16 bg-[#f8fafd] min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
          <Link href="/projects" className="hover:text-[#ea580c] transition-colors">
            Projects
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#ea580c] font-semibold">{project.title}</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-deye-card relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#ea580c]">
                {project.category}
              </span>
              <span className="text-xs font-mono text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded border border-gray-200">
                Commissioned {project.completionYear}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#091e3a] tracking-tight">
              {project.title}
            </h1>
            <div className="w-16 h-1 bg-[#ea580c] rounded-full" />

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-[#ea580c]" />
              <span>{project.location}</span>
            </div>

            <div className="inline-block bg-orange-50/70 border border-orange-200 rounded-xl px-4 py-2 font-mono text-[#ea580c] font-bold text-sm sm:text-base">
              Installed Capacity: {project.capacity}
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {project.impactMetrics.map((m, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-5 text-center space-y-1 shadow-sm">
              <span className="text-xs text-gray-500 block">{m.label}</span>
              <strong className="text-2xl font-extrabold text-[#ea580c] font-mono block">
                {m.value}
              </strong>
            </div>
          ))}
        </div>

        {/* Challenge vs Solution Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-3 shadow-sm">
            <div className="text-xs font-bold text-red-600 uppercase tracking-wider">
              Operational Challenge
            </div>
            <h2 className="text-xl font-bold text-[#091e3a]">The Vulnerability</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-3 shadow-sm">
            <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider">
              Engineered Implementation
            </div>
            <h2 className="text-xl font-bold text-[#091e3a]">The Solution</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Products Installed Box with High-Equity Internal Links */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-deye-card">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-[#091e3a]">Verified Hardware Installed On-Site</h2>
            <div className="w-10 h-0.5 bg-[#ea580c]" />
            <p className="text-xs text-gray-500">
              Click any equipment model to view certified manufacturer datasheets and technical specifications.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {project.productsInstalled.map((prodName, idx) => {
              const linkInfo = getProductLink(prodName);
              return (
                <Link
                  key={idx}
                  href={linkInfo.href}
                  className="group flex items-center justify-between gap-3 bg-slate-50 hover:bg-orange-50/50 p-4 rounded-xl border border-gray-200 hover:border-orange-300 transition-all shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#ea580c] flex-shrink-0" />
                    <div>
                      <span className="text-sm font-bold text-gray-900 group-hover:text-[#ea580c] transition-colors block">
                        {prodName}
                      </span>
                      <span className="text-[11px] text-gray-500 font-medium">
                        Direct Factory Distribution
                      </span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-[#ea580c] flex-shrink-0">
                    <span className="hidden sm:inline">{linkInfo.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Client Quote */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-sm">
          <blockquote className="text-lg sm:text-xl text-gray-700 italic max-w-2xl mx-auto leading-relaxed">
            &ldquo;{project.quoteSnippet}&rdquo;
          </blockquote>
          <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider">
            Verified Plant / Facility Operations Feedback
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <Link href="/projects" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-[#ea580c] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all projects</span>
          </Link>
          <Link href="/contact">
            <Button variant="deye-primary" size="sm">
              <span>Discuss a Similar Project</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
