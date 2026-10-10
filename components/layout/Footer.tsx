"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sun,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  MessageSquare,
  ChevronDown,
  Award,
  CheckCircle,
} from "lucide-react";
import { COMPANY } from "@/lib/data/company";

export function Footer() {
  // Mobile accordion state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    hardware: false,
    solutions: false,
    company: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <footer className="bg-[#091e3a] text-gray-300 text-sm border-t border-white/10">
      {/* MAIN FOOTER NAVIGATION (Desktop 4-Col Grid / Mobile Clean Accordions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Brand, Authorization & Hotline (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 p-1 shadow-sm flex-shrink-0 flex items-center justify-center">
                <Sun className="w-5 h-5 text-[#f97316]" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                ELECTRA <span className="text-[#f97316]">SOLAR</span>
              </span>
            </Link>

            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              Official turnkey distributor and engineering partner of{" "}
              <strong className="text-white font-semibold">EnerTech UPS Pvt. Ltd. (Pune Plant • Estd. 1989)</strong>.
              Delivering heavy-duty bi-directional hybrid inverters, C&amp;I BESS, and sub-5ms zero-break online UPS systems across India.
            </p>

            {/* Compact Direct Connect Box */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <a
                href={`tel:${COMPANY.contact.salesPhone1}`}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#f97316]" />
                <span>{COMPANY.contact.salesPhone1}</span>
              </a>

              <a
                href={`https://wa.me/91${COMPANY.contact.salesPhone1.replace(/\D/g, "")}?text=Hello%20Electra%20Solar,%20I%20would%20like%20to%20consult%20with%20an%20engineer%20regarding%20hybrid%20solar%20and%20BESS%20systems.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Desk</span>
              </a>
            </div>

            <div className="text-[11px] text-gray-400 flex items-center gap-1.5 pt-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span>Head Office: Pune, Maharashtra • Pan-India Turnkey Commissioning</span>
            </div>
          </div>

          {/* Column 2: Solar Hardware (3 cols on lg) */}
          <div className="lg:col-span-3 border-t border-white/5 lg:border-t-0 pt-4 lg:pt-0">
            <button
              type="button"
              onClick={() => toggleSection("hardware")}
              className="w-full flex items-center justify-between text-white font-bold text-xs uppercase tracking-wider mb-3 lg:mb-4 lg:cursor-default"
            >
              <span className="text-white font-bold tracking-wide">Solar Hardware</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 lg:hidden transition-transform duration-200 ${
                  openSections.hardware ? "rotate-180" : ""
                }`}
              />
            </button>

            <ul
              className={`space-y-2.5 text-xs ${
                openSections.hardware ? "block" : "hidden lg:block"
              }`}
            >
              <li>
                <Link
                  href="/products/solar-hybrid-inverters/sunmagic-three-phase-solar-hybrid-inverter"
                  className="hover:text-[#f97316] transition-colors font-medium text-gray-300"
                >
                  SunMagic 3-Phase Hybrid (10-50kW)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/bess/enercube-commercial-battery-energy-storage-system"
                  className="hover:text-[#f97316] transition-colors font-medium text-gray-300"
                >
                  EnerCube C&amp;I BESS (5-200kWh+)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/solar-hybrid-inverters/sunmagic-single-phase-solar-hybrid-inverter"
                  className="hover:text-[#f97316] transition-colors text-gray-300"
                >
                  SunMagic 1-Phase Hybrid (3-10kW)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/batteries/lfp-lithium-iron-phosphate-battery-module"
                  className="hover:text-[#f97316] transition-colors text-gray-300"
                >
                  51.2V LiFePO4 Battery Banks
                </Link>
              </li>
              <li>
                <Link
                  href="/products/solar-online-ups/solar-online-ups-system"
                  className="hover:text-[#f97316] transition-colors text-gray-300"
                >
                  Industrial Online UPS (10-300kVA)
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  href="/products"
                  className="text-[#f97316] hover:text-white font-semibold flex items-center gap-1 text-[11px]"
                >
                  <span>Explore Full Portfolio</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions & Technical Tools (2.5 cols on lg) */}
          <div className="lg:col-span-2 border-t border-white/5 lg:border-t-0 pt-4 lg:pt-0">
            <button
              type="button"
              onClick={() => toggleSection("solutions")}
              className="w-full flex items-center justify-between text-white font-bold text-xs uppercase tracking-wider mb-3 lg:mb-4 lg:cursor-default"
            >
              <span className="text-white font-bold tracking-wide">Solutions &amp; Tools</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 lg:hidden transition-transform duration-200 ${
                  openSections.solutions ? "rotate-180" : ""
                }`}
              />
            </button>

            <ul
              className={`space-y-2.5 text-xs ${
                openSections.solutions ? "block" : "hidden lg:block"
              }`}
            >
              <li>
                <Link
                  href="/solutions/commercial-industrial-power-solutions"
                  className="hover:text-[#f97316] transition-colors text-gray-300"
                >
                  Commercial &amp; Industrial (C&amp;I)
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/residential-solar-hybrid"
                  className="hover:text-[#f97316] transition-colors text-gray-300"
                >
                  Residential Luxury Villas
                </Link>
              </li>
              <li>
                <Link
                  href="/installations"
                  className="hover:text-[#f97316] transition-colors font-medium text-gray-300"
                >
                  Real Project Installations
                </Link>
              </li>
              <li>
                <Link
                  href="/calculator"
                  className="hover:text-[#f97316] transition-colors font-medium text-gray-300"
                >
                  Solar &amp; BESS Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company, Careers & Knowledge (3 cols on lg) */}
          <div className="lg:col-span-3 border-t border-white/5 lg:border-t-0 pt-4 lg:pt-0">
            <button
              type="button"
              onClick={() => toggleSection("company")}
              className="w-full flex items-center justify-between text-white font-bold text-xs uppercase tracking-wider mb-3 lg:mb-4 lg:cursor-default"
            >
              <span className="text-white font-bold tracking-wide">Company &amp; Insights</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 lg:hidden transition-transform duration-200 ${
                  openSections.company ? "rotate-180" : ""
                }`}
              />
            </button>

            <ul
              className={`space-y-2.5 text-xs ${
                openSections.company ? "block" : "hidden lg:block"
              }`}
            >
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#f97316] transition-colors text-gray-300"
                >
                  About Electra Solar
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-[#f97316] transition-colors font-semibold text-white flex items-center gap-1.5"
                >
                  <span>Careers</span>
                  <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[10px] rounded font-bold">
                    Hiring
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#f97316] transition-colors font-semibold text-gray-200"
                >
                  Solar Knowledge Hub &amp; Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#f97316] transition-colors text-gray-300"
                >
                  Regional Hubs: Pune • Mumbai • Jaipur
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.contact.salesEmail}`}
                  className="text-gray-300 hover:text-[#f97316] transition-colors font-mono"
                >
                  {COMPANY.contact.salesEmail}
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* STREAMLINED TRUST & QUALITY HALLMARK STRIP */}
      <div className="border-t border-white/10 py-4 px-4 sm:px-6 lg:px-8 bg-[#061528]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-medium text-gray-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#f97316]" />
              Official EnerTech Turnkey Partner
            </span>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#f97316]" />
              ISO 9001:2015 Certified
            </span>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#f97316]" />
              Make in India (Pune Plant)
            </span>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <span>MNRE Approved Hardware</span>
          </div>

          <div className="text-[11px] text-gray-400">
            35,000+ Commissioned Systems Across India
          </div>
        </div>
      </div>

      {/* MINIMALIST BOTTOM LEGAL BAR */}
      <div className="border-t border-white/5 py-4 px-4 sm:px-6 lg:px-8 text-xs text-gray-400 bg-[#040e1b]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="text-[11px]">
            © {new Date().getFullYear()} Electra Solar Solutions. Authorized EnerTech Partner. All rights reserved.
          </div>

          <div className="flex items-center gap-5 text-[11px]">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap
            </Link>
            <Link href="/admin" className="hover:text-[#f97316] transition-colors text-gray-400 font-medium">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
