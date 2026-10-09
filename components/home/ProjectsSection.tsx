"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import { PROJECTS } from "@/lib/data/projects";

export function ProjectsSection() {
  const projectPhotos = [
    "/images/products/sunmagic-3ph.webp",
    "/images/products/online-ups.webp",
    "/images/products/sunmagic-1ph.webp",
    "/images/products/enercube-bess.webp",
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#f8fafd] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#015cbb] block">
              Proven Installations
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1a202c] tracking-tight">
              Verified Project Performance
            </h2>
            <p className="text-gray-500 text-sm max-w-xl">
              Turnkey hybrid and BESS systems operating in critical manufacturing, healthcare, and cold chain environments across Maharashtra.
            </p>
          </div>

          <Link
            href="/projects"
            className="text-xs font-bold text-[#015cbb] hover:text-[#004896] uppercase tracking-wider flex items-center gap-1 transition-colors"
          >
            <span>All Case Studies +</span>
          </Link>
        </div>

        {/* 4-Column Technical Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROJECTS.map((proj, idx) => (
            <div
              key={proj.id}
              className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-[#015cbb]/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Stage Container */}
                <div className="relative w-full h-44 bg-[#f1f5f9] p-4 flex items-center justify-center overflow-hidden">
                  <div className="relative w-32 h-32">
                    <Image
                      src={projectPhotos[idx % projectPhotos.length]}
                      alt={proj.title}
                      fill
                      className="object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 250px"
                    />
                  </div>
                  <span className="absolute bottom-2 left-3 text-[10px] font-mono font-bold text-[#015cbb] bg-white/95 px-2 py-0.5 rounded shadow-sm border border-gray-200/60">
                    {proj.capacity}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  {/* Category and Date Bar */}
                  <div className="flex items-center justify-between text-[11px] text-gray-500">
                    <span className="font-semibold text-[#015cbb]">{proj.category}</span>
                    <span className="font-mono">{proj.completionYear}</span>
                  </div>

                  {/* Title */}
                  <Link href={`/projects/${proj.slug}`}>
                    <h3 className="text-sm font-bold text-[#1a202c] group-hover:text-[#015cbb] transition-colors line-clamp-2 leading-snug">
                      {proj.title}
                    </h3>
                  </Link>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <MapPin className="w-3 h-3 text-[#015cbb] flex-shrink-0" />
                    <span className="truncate">{proj.location}</span>
                  </div>

                  {/* Key Metric Highlight */}
                  <div className="p-2.5 rounded-lg bg-[#f8fafd] border border-gray-100 space-y-1">
                    <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                      {proj.impactMetrics[0].label}
                    </div>
                    <div className="text-sm font-bold font-mono text-[#015cbb]">
                      {proj.impactMetrics[0].value}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Link */}
              <div className="px-5 pb-5 pt-0 border-t border-gray-50 flex items-center justify-between">
                <Link
                  href={`/projects/${proj.slug}`}
                  className="text-xs font-bold text-[#015cbb] hover:text-[#004896] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Commissioned
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
