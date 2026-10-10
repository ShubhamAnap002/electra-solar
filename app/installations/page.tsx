"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  MapPin,
  Calendar,
  Zap,
  ArrowRight,
  TrendingDown,
  ChevronRight,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
} from "lucide-react";
import { PROJECTS, Project } from "@/lib/data/projects";
import { useEnquiryModal } from "@/components/forms/EnquiryModalContext";

export default function InstallationsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [projectsList, setProjectsList] = useState<Project[]>(PROJECTS);
  const { openEnquiryModal } = useEnquiryModal();

  React.useEffect(() => {
    fetch("/api/admin/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.projects)) {
          setProjectsList(data.projects);
        }
      })
      .catch(() => {});
  }, []);

  const categories = [
    { id: "all", label: "All Turnkey Sites" },
    { id: "Industrial Manufacturing", label: "Industrial & Factories" },
    { id: "Healthcare & Diagnostics", label: "Hospitals & Critical" },
    { id: "Agro-Cold Chain", label: "Cold Chain & Agro" },
    { id: "Residential Luxury", label: "Villas & Residential" },
  ];

  const filteredProjects = projectsList.filter((p) => {
    if (activeCategory === "all") return true;
    return p.category === activeCategory;
  });

  // Image mapping for richer visual representation
  const projectImages: Record<string, string> = {
    "chakan-automotive-plant": "/images/showcase/industrial-solar.jpg",
    "hinjawadi-multispeciality-hospital": "/images/showcase/commercial-solar.jpg",
    "lonavala-luxury-villa": "/images/showcase/solar-home-villa.jpg",
    "baramati-agro-cold-chain": "/images/showcase/utility-solar.jpg",
  };

  return (
    <div className="bg-[#f8fafd] min-h-screen">
      {/* 1. HERO HEADER */}
      <section className="bg-[#091e3a] text-white py-16 lg:py-20 relative overflow-hidden border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-gray-300 font-medium">
              <Link href="/" className="hover:text-[#ea580c] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-[#ea580c] font-bold">Installations</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-400 text-xs font-bold border border-white/15">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Commissioning Track Record • EnerTech Hardware</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Real Turnkey Installations &{" "}
              <span className="text-[#ea580c]">
                Commissioned Sites
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
              Explore authentic C&I hybrid plants, hospital isolation UPS setups, and containerized BESS installations engineered by Electra Solar across Maharashtra and India.
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 mt-10 border-t border-white/15 text-left">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#f97316] font-mono">35,000+</div>
              <div className="text-xs text-gray-300 mt-0.5">Systems Commissioned</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">100%</div>
              <div className="text-xs text-gray-300 mt-0.5">DG Synchronization Uptime</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#f97316] font-mono">&lt; 5ms</div>
              <div className="text-xs text-gray-300 mt-0.5">Zero Break Transfer</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">35+ Yrs</div>
              <div className="text-xs text-gray-300 mt-0.5">EnerTech Parent Heritage</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER STRIP & PROJECTS GALLERY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16 space-y-10">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? "bg-[#091e3a] text-white shadow-sm"
                  : "bg-white text-gray-600 hover:text-[#ea580c] border border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Installations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#ea580c]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Visual Header */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <Image
                    src={projectImages[project.id] || project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#091e3a]/90 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-mono px-2.5 py-1 rounded-md border border-white/20">
                    Commissioned {project.completionYear}
                  </div>

                  {/* Bottom Image Overlay: Title & Capacity */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#ea580c]">
                      {project.capacity}
                    </div>
                    <h3 className="text-xl font-black tracking-tight leading-snug">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Location & Hardware */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                      <MapPin className="w-4 h-4 text-[#ea580c] flex-shrink-0" />
                      <span>{project.location}</span>
                    </div>

                    {/* Installed Hardware Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.productsInstalled.map((prod, idx) => (
                        <span
                          key={idx}
                          className="bg-orange-50 text-[#ea580c] border border-orange-200 px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                        >
                          {prod}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Challenge & Solution Summary */}
                  <div className="space-y-3 text-xs leading-relaxed">
                    <div>
                      <span className="font-bold text-gray-900 block mb-0.5">Engineering Challenge:</span>
                      <p className="text-gray-600">{project.challenge}</p>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block mb-0.5">Turnkey Architecture:</span>
                      <p className="text-gray-600">{project.solution}</p>
                    </div>
                  </div>

                  {/* 4-Stat Impact Grid */}
                  <div className="bg-[#f8fafd] rounded-2xl p-4 border border-gray-100 grid grid-cols-2 gap-3">
                    {project.impactMetrics.map((stat, sIdx) => (
                      <div key={sIdx}>
                        <div className="text-base sm:text-lg font-black text-[#091e3a] font-mono">
                          {stat.value}
                        </div>
                        <div className="text-[11px] text-gray-500 font-medium leading-tight mt-0.5">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Client Quote */}
                  <blockquote className="border-l-2 border-[#ea580c] pl-3 py-1 text-xs italic text-gray-600">
                    &ldquo;{project.quoteSnippet}&rdquo;
                  </blockquote>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-xs font-bold text-[#ea580c] hover:underline flex items-center gap-1"
                >
                  <span>Detailed Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    openEnquiryModal({
                      source: `Installation Card: ${project.title}`,
                      productName: project.capacity,
                    })
                  }
                  className="w-full sm:w-auto bg-[#ea580c] hover:bg-[#c2410c] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Request Similar Sizing</span>
                  <Zap className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Turnkey Assurance CTA */}
        <div className="bg-[#091e3a] border border-gray-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ea580c]">
              Zero-Commitment Field Engineering Survey
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Ready to Commission Solar Hybrid Power at Your Plant?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
              Our Pune electrical engineering desk conducts comprehensive on-site load audits, harmonic measurements, and PVsyst feasibility studies within 48 hours.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openEnquiryModal({ source: "Installations Page Bottom CTA" })}
            className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 flex-shrink-0"
          >
            <span>Book Onsite Load Survey</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
