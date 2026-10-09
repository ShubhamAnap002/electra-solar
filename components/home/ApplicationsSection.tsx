"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export function ApplicationsSection() {
  const applications = [
    {
      title: "Residential",
      subtitle: "Clean & Reliable",
      desc: "Rooftop hybrid solar with battery backup for luxury villas, apartments and eco-homes.",
      image: "/images/showcase/solar-home-villa.jpg",
      href: "/solutions/residential-solar-hybrid",
    },
    {
      title: "Commercial",
      subtitle: "Save More, Grow More",
      desc: "Grid-tied solar with peak shaving for office parks, shopping centers and corporate hubs.",
      image: "/images/showcase/commercial-solar.jpg",
      href: "/solutions/commercial-industrial-power-solutions",
    },
    {
      title: "Industrial",
      subtitle: "Built for Heavy Load",
      desc: "Heavy-duty 3-phase hybrid PCUs with DG synchronization for factories and cold storage.",
      image: "/images/showcase/industrial-solar.jpg",
      href: "/solutions/critical-infrastructure-and-healthcare",
    },
    {
      title: "Utility",
      subtitle: "Large Scale Solutions",
      desc: "Utility-scale containerized BESS and ground-mount PV plants for microgrids and substations.",
      image: "/images/showcase/utility-solar.jpg",
      href: "/solutions/remote-microgrids-and-agriculture",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#f8fafc] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header from Mockup */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#015cbb] mb-1">
            Engineered Sector Deployments
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
            Applications
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Powering every sector with clean energy.
          </p>
        </div>

        {/* 4 Application Photo Cards from Mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {applications.map((app, idx) => (
            <Link
              key={idx}
              href={app.href}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-2xl hover:border-[#00d2ff]/60 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Photo Stage */}
                <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                  <Image
                    src={app.image}
                    alt={app.title}
                    fill
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <span className="absolute bottom-3 left-3 bg-[#091e3a]/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                    {app.subtitle}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#015cbb] transition-colors">
                    {app.title}
                  </h3>
                  <div className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {app.desc}
                  </div>
                </div>
              </div>

              {/* Bottom Explore Link */}
              <div className="px-5 pb-5 pt-0 flex items-center justify-between text-xs font-bold text-[#015cbb] group-hover:text-[#009cff]">
                <span>View Case Studies</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
