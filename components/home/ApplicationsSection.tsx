"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

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
    <section className="py-20 lg:py-24 bg-[#f8fafc] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#ea580c] text-xs font-bold tracking-wider uppercase mb-2 border border-orange-200">
            <span>Engineered Sector Deployments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Applications
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Tailored hybrid power architectures for villas, factories, healthcare, and utility substations.
          </p>
        </div>

        {/* 4 Application Photo Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {applications.map((app, idx) => (
            <Link
              key={idx}
              href={app.href}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-xs hover:shadow-xl hover:border-[#f97316]/60 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Photo Stage */}
                <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                  <Image
                    src={app.image}
                    alt={app.title}
                    fill
                    className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                  <span className="absolute bottom-3 left-3 bg-[#091e3a]/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                    {app.subtitle}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#ea580c] transition-colors">
                    {app.title}
                  </h3>
                  <div className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {app.desc}
                  </div>
                </div>
              </div>

              {/* Bottom Explore Link */}
              <div className="px-5 pb-5 pt-0 flex items-center justify-between text-xs font-bold text-[#091e3a] group-hover:text-[#ea580c] transition-colors">
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
