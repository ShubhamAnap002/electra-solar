"use client";

import React from "react";
import Link from "next/link";
import {
  Sun,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  ArrowRight,
  Award,
  CheckCircle,
  MessageSquare,
  Calculator,
  Scale,
  Download,
  Building,
  Wrench,
  ExternalLink,
  ChevronRight,
  Send,
  Zap,
} from "lucide-react";
import { useEnquiryModal } from "@/components/forms/EnquiryModalContext";
import { CATEGORIES } from "@/lib/data/products";
import { COMPANY } from "@/lib/data/company";

export function Footer() {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <footer className="bg-[#091e3a] text-gray-400 text-sm border-t border-white/10">
      {/* 1. INTERACTIVE PRE-FOOTER CONSULTATION & SIZING LEAD MAGNET */}
      <div className="bg-gradient-to-r from-[#015cbb] via-[#024794] to-[#00b4d8] text-white py-12 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle Ambient Background Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,210,255,0.2),transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold backdrop-blur-sm border border-white/20">
              <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-pulse" />
              <span>Direct Factory Technical Support</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Planning a Solar, Hybrid, or Battery Storage Project?
            </h3>
            <p className="text-sm text-blue-100 leading-relaxed font-normal">
              Connect with an EnerTech power electronics engineer in Pune. Receive verified system sizing,
              Single-Line Diagrams (SLD), and an official turnkey quotation within 2 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => openEnquiryModal({ source: "Footer Pre-Lead Magnet" })}
              className="w-full sm:w-auto bg-[#00d2ff] hover:bg-[#00b4d8] text-[#091e3a] px-7 py-3.5 rounded-full font-black text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Request Engineering Proposal</span>
            </button>

            <a
              href={`https://wa.me/91${COMPANY.contact.salesPhone1.replace(/\D/g, "")}?text=Hello%20Electra%20Solar,%20I%20would%20like%20to%20consult%20with%20an%20engineer%20regarding%20EnerTech%20solar%20systems.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25d366] hover:bg-[#20ba59] text-white px-5 py-3.5 rounded-full font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. TOP 4 INDUSTRIAL TRUST PILLARS BANNER (Deye & Luminous Quality Seal) */}
      <div className="border-b border-gray-800/80 py-8 px-4 sm:px-6 bg-[#0a0f1d]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#015cbb]/20 text-[#51b2e3] flex items-center justify-center border border-[#015cbb]/30 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Official EnerTech Distributor</div>
              <div className="text-xs text-gray-400">Genuine components & factory warranty backing</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#1e8ec6]/20 text-[#51b2e3] flex items-center justify-center border border-[#1e8ec6]/30 flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">35+ Years Parent Heritage</div>
              <div className="text-xs text-gray-400">Over 35,000+ satisfied industrial installations</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 flex-shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Make In India Certified</div>
              <div className="text-xs text-gray-400">Heavy-duty 50°C thermal engineering for India</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#015cbb]/20 text-[#51b2e3] flex items-center justify-center border border-[#015cbb]/30 flex-shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Dedicated Field Engineering</div>
              <div className="text-xs text-gray-400">Onsite survey, sizing & 24/7 breakdown support</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN FOOTER MULTI-COLUMN MEGA NAVIGATION (World-Class Industrial Architecture) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Column 1: Brand Info & Distributor Relationship (2 cols on md) */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#015cbb] to-[#51b2e3] p-0.5 shadow-sm flex-shrink-0">
                <div className="w-full h-full bg-[#0f172a] rounded-[10px] flex items-center justify-center">
                  <Sun className="w-5 h-5 text-[#51b2e3]" />
                </div>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                ELECTRA <span className="text-[#51b2e3]">SOLAR</span>
              </span>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed">
              Official distributor and turnkey engineering partner of{" "}
              <strong className="text-white">EnerTech UPS Pvt. Ltd. (Pune)</strong>. Supplying, sizing,
              and commissioning bi-directional hybrid inverters, BESS storage, and 0ms online UPS systems across India.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-start gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-[#51b2e3] flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{COMPANY.contact.headquartersAddress}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-4 h-4 text-[#51b2e3] flex-shrink-0" />
                <span>{COMPANY.contact.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Inverters & Power Electronics */}
          <div>
            <div className="text-white font-bold text-sm tracking-wide uppercase mb-4 border-b border-gray-800 pb-2">
              Solar Inverters
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/products/solar-hybrid-inverters/sunmagic-single-phase-solar-hybrid-inverter"
                  className="hover:text-white transition-colors"
                >
                  SunMagic 1-Phase Hybrid (1-15kVA)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/solar-hybrid-inverters/sunmagic-three-phase-solar-hybrid-inverter"
                  className="hover:text-white transition-colors font-semibold text-gray-200"
                >
                  SunMagic 3-Phase REeFI (10-300kVA)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/solar-hybrid-inverters/wall-mounted-hf-solar-hybrid-inverter"
                  className="hover:text-white transition-colors"
                >
                  Wall-Mounted HF Inverter (3-10kW)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/solar-online-ups/solar-online-ups-system"
                  className="hover:text-white transition-colors"
                >
                  Solar Online UPS 0ms (1-60kVA)
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  href="/products"
                  className="text-[#51b2e3] hover:text-white font-semibold flex items-center gap-1"
                >
                  <span>Explore All Inverters</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Storage & Power Conditioning */}
          <div>
            <div className="text-white font-bold text-sm tracking-wide uppercase mb-4 border-b border-gray-800 pb-2">
              Storage & Conditioning
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/products/bess/enercube-commercial-battery-energy-storage-system"
                  className="hover:text-white transition-colors font-semibold text-gray-200"
                >
                  EnerCube C&I BESS (50-500kWh)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/batteries/lfp-lithium-iron-phosphate-battery-module"
                  className="hover:text-white transition-colors"
                >
                  51.2V LiFePO4 Rack Packs (100-314Ah)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/power-conditioning/industrial-servo-voltage-stabilizer"
                  className="hover:text-white transition-colors"
                >
                  Servo Voltage Stabilizers (10-300kVA)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/power-conditioning/industrial-igbt-scr-battery-charger"
                  className="hover:text-white transition-colors"
                >
                  Substation FCBC Chargers (24-220V)
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  href="/compare"
                  className="text-[#51b2e3] hover:text-white font-semibold flex items-center gap-1"
                >
                  <span>Technical Compare Matrix</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Solutions & Sizing Tools */}
          <div>
            <div className="text-white font-bold text-sm tracking-wide uppercase mb-4 border-b border-gray-800 pb-2">
              Solutions & Sizing
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/solutions/commercial-industrial-power-solutions"
                  className="hover:text-white transition-colors"
                >
                  Commercial & Industrial (C&I)
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/residential-solar-hybrid"
                  className="hover:text-white transition-colors"
                >
                  Residential Luxury Villas
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/critical-infrastructure-and-healthcare"
                  className="hover:text-white transition-colors"
                >
                  Hospitals & Diagnostic Imaging
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/remote-microgrids-and-agriculture"
                  className="hover:text-white transition-colors"
                >
                  Agro Microgrids & Cold Storage
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  href="/calculator"
                  className="text-[#51b2e3] hover:text-white font-semibold flex items-center gap-1"
                >
                  <span>Solar & BESS Calculator</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Direct Hotline & Dealer Connect */}
          <div>
            <div className="text-white font-bold text-sm tracking-wide uppercase mb-4 border-b border-gray-800 pb-2">
              Hotlines & Support
            </div>
            <ul className="space-y-3 text-xs">
              <li>
                <div className="text-[10px] text-gray-500 uppercase font-semibold">Commercial Sales</div>
                <a
                  href={`tel:${COMPANY.contact.salesPhone1}`}
                  className="text-white font-mono font-bold hover:text-[#51b2e3] transition-colors block"
                >
                  {COMPANY.contact.salesPhone1}
                </a>
                <a
                  href={`tel:${COMPANY.contact.salesPhone2}`}
                  className="text-gray-400 font-mono hover:text-[#51b2e3] transition-colors block text-[11px]"
                >
                  {COMPANY.contact.salesPhone2}
                </a>
              </li>
              <li>
                <div className="text-[10px] text-gray-500 uppercase font-semibold">Technical Assistance</div>
                <a
                  href={`tel:${COMPANY.contact.supportPhone}`}
                  className="text-white font-mono hover:text-[#51b2e3] transition-colors block"
                >
                  {COMPANY.contact.supportPhone}
                </a>
              </li>
              <li>
                <div className="text-[10px] text-gray-400 uppercase font-semibold">Email Sales Desk</div>
                <a
                  href={`mailto:${COMPANY.contact.salesEmail}`}
                  className="text-[#00d2ff] hover:underline block font-semibold"
                >
                  {COMPANY.contact.salesEmail}
                </a>
              </li>

              {/* Newsletter Subscription from Mockup */}
              <li className="pt-2">
                <div className="text-xs font-bold text-white mb-1.5">Subscribe to our newsletter</div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you for subscribing to Electra Solar engineering updates!");
                  }}
                  className="flex items-center gap-1.5"
                >
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#00d2ff] transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[#00d2ff] hover:bg-[#00b4d8] text-[#091e3a] p-2 rounded-lg font-black transition-colors flex-shrink-0"
                    title="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. OFFICIAL CERTIFICATION & STANDARDS STRIP (UTL & Luminous Hallmarks) */}
      <div className="border-t border-gray-800/60 py-6 px-4 sm:px-6 bg-[#080d1a]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="text-gray-400 font-semibold text-xs">
            Manufacturing Quality Standards & Approvals:
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-300">
            <span className="bg-gray-800/80 px-2.5 py-1 rounded border border-gray-700">
              ISO 9001:2015 Quality Management
            </span>
            <span className="bg-gray-800/80 px-2.5 py-1 rounded border border-gray-700">
              MNRE Approved Systems
            </span>
            <span className="bg-gray-800/80 px-2.5 py-1 rounded border border-gray-700">
              CE Compliance
            </span>
            <span className="bg-gray-800/80 px-2.5 py-1 rounded border border-gray-700">
              IEC 62109 & IEC 62040 Standard
            </span>
            <span className="bg-gray-800/80 px-2.5 py-1 rounded border border-gray-700">
              Make in India
            </span>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM LEGAL & COMPLIANCE BAR */}
      <div className="border-t border-gray-800 py-6 px-4 sm:px-6 text-xs text-gray-500 bg-[#060a14]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Electra Solar Solutions. All rights reserved.
            <span className="block text-[11px] text-gray-500 mt-0.5">
              Official Turnkey Distributor of EnerTech UPS Pvt. Ltd. (Pune, Maharashtra, India).
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">
              Dealer Network
            </Link>
            <Link href="/sitemap.xml" className="hover:text-gray-300 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
