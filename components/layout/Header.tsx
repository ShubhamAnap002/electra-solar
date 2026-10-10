"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Sun,
  ShieldCheck,
  Phone,
  Mail,
  Menu,
  X,
  ChevronDown,
  Layers,
  BatteryCharging,
  Zap,
  ArrowRight,
  Search,
  Calculator,
  Download,
  Building2,
  Home,
  HeartPulse,
  Trees,
  CheckCircle2,
  Sparkles,
  MapPin,
  ExternalLink,
  MessageSquare,
  Wrench,
  Clock,
  Compass,
} from "lucide-react";
import { useEnquiryModal } from "@/components/forms/EnquiryModalContext";
import { CATEGORIES, PRODUCTS } from "@/lib/data/products";
import { COMPANY } from "@/lib/data/company";
import { SOLUTIONS } from "@/lib/data/solutions";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { openEnquiryModal } = useEnquiryModal();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterMenu = (menuName: string) => {
    if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
    setActiveMegaMenu(menuName);
  };

  const handleMouseLeaveMenu = () => {
    menuTimerRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (!isScrolled && scrollY > 50) {
        setIsScrolled(true);
      } else if (isScrolled && scrollY < 15) {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  // Close menus on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMegaMenu(null);
    setIsSearchModalOpen(false);
  }, [pathname]);

  // Focus search input when modal opens
  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchModalOpen]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Sun":
        return <Sun className="w-4 h-4 text-[#ea580c]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-4 h-4 text-[#ea580c]" />;
      case "Layers":
        return <Layers className="w-4 h-4 text-[#ea580c]" />;
      case "BatteryCharging":
        return <BatteryCharging className="w-4 h-4 text-[#ea580c]" />;
      default:
        return <Zap className="w-4 h-4 text-[#ea580c]" />;
    }
  };

  const filteredSearchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.modelCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.capacityRange.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      {/* 1. TOP UTILITY & INDUSTRIAL TRUST STRIP (Static Natural Scroll - Zero Layout Shift) */}
      <div className="w-full bg-[#f8fafc] text-[11px] sm:text-xs px-4 text-gray-600 border-b border-gray-200/80 py-1.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Official Partnership & Plant Location */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 text-[#ea580c] border border-orange-200 font-bold text-[10px] tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ea580c]" />
              Official Turnkey Distributor
            </span>
            <span className="hidden md:inline text-gray-700 font-medium">
              EnerTech UPS Pvt. Ltd. (Pune Plant • Estd. 1989)
            </span>
            <span className="hidden xl:inline text-gray-300">•</span>
            <span className="hidden xl:inline text-emerald-700 font-semibold">
              35,000+ Systems Commissioned
            </span>
          </div>

          {/* Right: Technical Support Hotline + Free Sizing Tool + Region */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 ml-auto text-xs flex-shrink-0">
            {/* Commercial Sales Desk */}
            <a
              href="tel:+919822407189"
              className="flex items-center gap-1.5 text-gray-700 hover:text-[#ea580c] transition-colors"
              title="Speak directly with Pune Commercial Sales Desk"
            >
              <Phone className="w-3.5 h-3.5 text-[#ea580c]" />
              <span className="font-medium text-gray-500 hidden xl:inline">Sales:</span>
              <span className="font-bold">+91 98224 07189</span>
            </a>

            <span className="text-gray-300 hidden sm:inline">|</span>

            {/* 24/7 Technical Support Line (from EnerTech Image 2) */}
            <a
              href="tel:+919373679255"
              className="hidden md:flex items-center gap-1.5 text-gray-700 hover:text-[#ea580c] transition-colors"
              title="24/7 Technical Care & Support Desk"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-medium text-gray-500 hidden xl:inline">Support:</span>
              <span className="font-bold">+91 93736 79255</span>
            </a>

            <span className="text-gray-300 hidden md:inline">|</span>

            <Link
              href="/calculator"
              className="hidden sm:flex items-center gap-1 text-gray-700 hover:text-[#ea580c] transition-colors font-semibold"
            >
              <Calculator className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>Sizing Tool</span>
            </Link>

            <span className="text-gray-300 hidden sm:inline">|</span>

            <Link
              href="/contact"
              className="hidden md:flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <MapPin className="w-3 h-3 text-gray-400" />
              <span>Maharashtra Hubs</span>
            </Link>

            <span className="text-gray-300 hidden sm:inline">|</span>

            {/* Region / Language Capsule */}
            <div className="inline-flex items-center gap-1.5 bg-white text-gray-700 px-2.5 py-0.5 rounded-full border border-gray-200 text-[11px] font-medium shadow-xs">
              <span className="text-xs">🇮🇳</span>
              <span>India (EN)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR - STICKY TOP-0, CONSTANT HEIGHT (ZERO SHAKING) */}
      <header
        className={`sticky top-0 z-50 w-full bg-white text-gray-900 border-b border-gray-200 transition-shadow duration-200 ${
          isScrolled ? "shadow-md" : "shadow-xs"
        }`}
      >
        <nav className="w-full py-3.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo - Crisp Light Aesthetic from Reference 1 */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0 min-w-[210px]">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 p-1 shadow-xs group-hover:scale-105 transition-all flex-shrink-0 flex items-center justify-center">
              <Sun className="w-6 h-6 text-[#f97316] group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-[#091e3a] flex items-center gap-1.5 whitespace-nowrap">
                ELECTRA <span className="text-[#f97316]">SOLAR</span>
              </span>
              <span className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase flex items-center gap-1 whitespace-nowrap">
                Authorized EnerTech Partner
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Clean Charcoal Typography */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 flex-shrink-0">
            <Link
              href="/"
              className={`relative px-2.5 xl:px-3.5 py-2 text-[13px] xl:text-[14px] uppercase font-semibold tracking-wider transition-colors whitespace-nowrap ${
                pathname === "/"
                  ? "text-[#ea580c] font-bold after:absolute after:bottom-0 after:left-2.5 xl:after:left-3.5 after:right-2.5 xl:after:right-3.5 after:h-[2.5px] after:bg-[#ea580c] after:rounded-full"
                  : "text-gray-700 hover:text-[#ea580c]"
              }`}
            >
              Home
            </Link>

            {/* PRODUCTS MEGA MENU TRIGGER */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnterMenu("products")}
              onMouseLeave={handleMouseLeaveMenu}
            >
              <Link
                href="/products"
                className={`relative flex items-center gap-1 px-2.5 xl:px-3.5 py-2 text-[13px] xl:text-[14px] uppercase font-semibold tracking-wider transition-colors whitespace-nowrap ${
                  pathname.startsWith("/products")
                    ? "text-[#ea580c] font-bold after:absolute after:bottom-0 after:left-2.5 xl:after:left-3.5 after:right-2.5 xl:after:right-3.5 after:h-[2.5px] after:bg-[#ea580c] after:rounded-full"
                    : "text-gray-700 hover:text-[#ea580c]"
                }`}
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMegaMenu === "products" ? "rotate-180 text-[#ea580c]" : "text-gray-400"
                  }`}
                />
              </Link>

              {/* WORLD-CLASS PRODUCTS MEGA-MENU DROPDOWN (ENERTECH 3-PILLAR INDUSTRIAL ARCHITECTURE) */}
              {activeMegaMenu === "products" && (
                <div
                  onMouseEnter={() => handleMouseEnterMenu("products")}
                  onMouseLeave={handleMouseLeaveMenu}
                  className="absolute top-full -left-28 w-[980px] xl:w-[1060px] bg-white border border-gray-200 shadow-[0_25px_60px_rgba(9,30,58,0.18)] border-t-4 border-t-[#091e3a] rounded-b-2xl p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200 before:absolute before:-top-3 before:left-0 before:right-0 before:h-4 before:content-['']"
                >
                  <div className="grid grid-cols-12 gap-5">
                    {/* PILLAR 1: SOLAR PRODUCTS & HYBRID (3 cols) */}
                    <div className="col-span-3 space-y-3 border-r border-gray-100 pr-3">
                      <div className="flex items-center gap-1.5 pb-1 border-b border-orange-100">
                        <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
                        <h4 className="text-xs font-black uppercase tracking-wider text-[#ea580c]">
                          Solar Products
                        </h4>
                      </div>

                      <div className="space-y-1">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pt-1">
                          Solar Hybrid Inverters
                        </div>
                        <Link
                          href="/products/solar-hybrid-inverters/sunmagic-three-phase-solar-hybrid-inverter"
                          className="block p-1.5 rounded-lg hover:bg-orange-50/70 transition-colors group"
                        >
                          <div className="text-xs font-bold text-[#091e3a] group-hover:text-[#ea580c] leading-tight">
                            SunMagic 3-Phase Hybrid
                          </div>
                          <div className="text-[10px] text-gray-500 font-medium">10 - 300 kVA • 100% Unbalance</div>
                        </Link>

                        <Link
                          href="/products/solar-hybrid-inverters/sunmagic-single-phase-solar-hybrid-inverter"
                          className="block p-1.5 rounded-lg hover:bg-orange-50/70 transition-colors group"
                        >
                          <div className="text-xs font-bold text-[#091e3a] group-hover:text-[#ea580c] leading-tight">
                            SunMagic 1-Phase Hybrid
                          </div>
                          <div className="text-[10px] text-gray-500 font-medium">3 - 15 kVA • Heavy Surge</div>
                        </Link>

                        <Link
                          href="/products/solar-hybrid-inverters/wall-mounted-hf-solar-hybrid-inverter"
                          className="block p-1.5 rounded-lg hover:bg-orange-50/70 transition-colors group"
                        >
                          <div className="text-xs font-bold text-[#091e3a] group-hover:text-[#ea580c] leading-tight">
                            Wall-Mount HF Inverter
                          </div>
                          <div className="text-[10px] text-gray-500 font-medium">3 - 6 kW • Transformerless</div>
                        </Link>

                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pt-2 border-t border-gray-100">
                          Balance of System
                        </div>
                        <Link
                          href="/products/solar-hybrid-inverters"
                          className="block p-1.5 rounded-lg hover:bg-orange-50/70 transition-colors group"
                        >
                          <div className="text-xs font-semibold text-gray-700 group-hover:text-[#ea580c]">
                            Solar On-Grid Inverters
                          </div>
                          <div className="text-[10px] text-gray-400">Export &amp; DG Synchronization</div>
                        </Link>
                        <Link
                          href="/products/solar-hybrid-inverters"
                          className="block p-1.5 rounded-lg hover:bg-orange-50/70 transition-colors group"
                        >
                          <div className="text-xs font-semibold text-gray-700 group-hover:text-[#ea580c]">
                            Remote Monitoring (RMS)
                          </div>
                          <div className="text-[10px] text-gray-400">Modbus &amp; Mobile App</div>
                        </Link>
                      </div>
                    </div>

                    {/* PILLAR 2: CRITICAL POWER & PROTECTION (3 cols) */}
                    <div className="col-span-3 space-y-3 border-r border-gray-100 pr-3">
                      <div className="flex items-center gap-1.5 pb-1 border-b border-blue-100">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <h4 className="text-xs font-black uppercase tracking-wider text-blue-700">
                          Critical Power
                        </h4>
                      </div>

                      <div className="space-y-1">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pt-1">
                          Online UPS Systems
                        </div>
                        <Link
                          href="/products/solar-online-ups/solar-online-ups-system"
                          className="block p-1.5 rounded-lg hover:bg-blue-50/70 transition-colors group"
                        >
                          <div className="text-xs font-bold text-[#091e3a] group-hover:text-blue-600 leading-tight">
                            True Online Solar UPS
                          </div>
                          <div className="text-[10px] text-gray-500 font-medium">1-1 Ph, 3-1 Ph, 3-3 Ph • 0ms</div>
                        </Link>

                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pt-2 border-t border-gray-100">
                          Power Conditioning
                        </div>
                        <Link
                          href="/products/power-conditioning/industrial-servo-voltage-stabilizer"
                          className="block p-1.5 rounded-lg hover:bg-blue-50/70 transition-colors group"
                        >
                          <div className="text-xs font-bold text-[#091e3a] group-hover:text-blue-600 leading-tight">
                            Industrial Servo Stabilizers
                          </div>
                          <div className="text-[10px] text-gray-500 font-medium">1 kVA – 1000 kVA Balanced</div>
                        </Link>

                        <Link
                          href="/products/power-conditioning/industrial-igbt-scr-battery-charger"
                          className="block p-1.5 rounded-lg hover:bg-blue-50/70 transition-colors group"
                        >
                          <div className="text-xs font-bold text-[#091e3a] group-hover:text-blue-600 leading-tight">
                            IGBT / SCR Battery Chargers
                          </div>
                          <div className="text-[10px] text-gray-500 font-medium">Float Cum Boost Rectifiers</div>
                        </Link>

                        <Link
                          href="/products/power-conditioning"
                          className="block p-1.5 rounded-lg hover:bg-blue-50/70 transition-colors group"
                        >
                          <div className="text-xs font-semibold text-gray-700 group-hover:text-blue-600">
                            Static Frequency Converters
                          </div>
                          <div className="text-[10px] text-gray-400">50 Hz ⇄ 60 Hz / 400 Hz</div>
                        </Link>
                      </div>
                    </div>

                    {/* PILLAR 3: SOLAR BESS & ENERGY STORAGE (3 cols) */}
                    <div className="col-span-3 space-y-3 border-r border-gray-100 pr-3">
                      <div className="flex items-center gap-1.5 pb-1 border-b border-emerald-100">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                        <h4 className="text-xs font-black uppercase tracking-wider text-emerald-700">
                          Solar BESS &amp; Storage
                        </h4>
                      </div>

                      <div className="space-y-1">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pt-1">
                          Commercial Energy Storage
                        </div>
                        <Link
                          href="/products/bess/enercube-commercial-battery-energy-storage-system"
                          className="block p-1.5 rounded-lg hover:bg-emerald-50/70 transition-colors group"
                        >
                          <div className="text-xs font-bold text-[#091e3a] group-hover:text-emerald-600 leading-tight">
                            EnerCube Commercial BESS
                          </div>
                          <div className="text-[10px] text-gray-500 font-medium">50kW / 100kWh – 1MWh Modular</div>
                        </Link>

                        <Link
                          href="/products/bess"
                          className="block p-1.5 rounded-lg hover:bg-emerald-50/70 transition-colors group"
                        >
                          <div className="text-xs font-bold text-[#091e3a] group-hover:text-emerald-600 leading-tight">
                            Hybrid Eco Series BESS
                          </div>
                          <div className="text-[10px] text-gray-500 font-medium">Turnkey Peak Shaving</div>
                        </Link>

                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pt-2 border-t border-gray-100">
                          Batteries Offered
                        </div>
                        <Link
                          href="/products/batteries/lfp-lithium-iron-phosphate-battery-module"
                          className="block p-1.5 rounded-lg hover:bg-emerald-50/70 transition-colors group"
                        >
                          <div className="text-xs font-bold text-[#091e3a] group-hover:text-emerald-600 leading-tight">
                            LFP Lithium Battery Modules
                          </div>
                          <div className="text-[10px] text-gray-500 font-medium">51.2V 100Ah/200Ah • 6000+ Cycles</div>
                        </Link>

                        <Link
                          href="/products/batteries"
                          className="block p-1.5 rounded-lg hover:bg-emerald-50/70 transition-colors group"
                        >
                          <div className="text-xs font-semibold text-gray-700 group-hover:text-emerald-600">
                            Industrial VRLA / SMF Banks
                          </div>
                          <div className="text-[10px] text-gray-400">High-rate industrial discharge</div>
                        </Link>
                      </div>
                    </div>

                    {/* PILLAR 4: HARDWARE SPOTLIGHT & SIZING (3 cols) */}
                    <div className="col-span-3 bg-gradient-to-b from-[#f8fafd] to-slate-100/70 rounded-xl p-3.5 border border-gray-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] font-black uppercase tracking-wider bg-[#091e3a] text-white px-2 py-0.5 rounded">
                            Pune Built
                          </span>
                          <span className="text-[10px] font-bold text-[#ea580c]">10 - 300 kVA</span>
                        </div>
                        <h5 className="text-xs font-black text-[#091e3a] leading-tight mb-1">
                          SunMagic 3-Phase Industrial PCU
                        </h5>
                        <p className="text-[10px] text-gray-500 leading-snug mb-2">
                          Heavy-duty 100% phase unbalance tolerance with sub-5ms UPS changeover.
                        </p>
                        <div className="relative w-full h-24 my-1 flex items-center justify-center bg-white rounded-lg border border-slate-200/80 p-1">
                          <Image
                            src="/images/products/sunmagic-3ph.webp"
                            alt="SunMagic 3-Phase Solar Hybrid Inverter"
                            fill
                            className="object-contain filter drop-shadow-md hover:scale-105 transition-transform"
                            sizes="180px"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        <Link
                          href="/calculator"
                          className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white py-2 px-2.5 rounded-lg text-[11px] font-bold text-center flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                        >
                          <Calculator className="w-3.5 h-3.5" />
                          <span>Solar Sizing Calculator →</span>
                        </Link>
                        <Link
                          href="/products"
                          className="w-full bg-white hover:bg-gray-50 text-[#091e3a] border border-gray-200 py-1.5 px-2.5 rounded-lg text-[10px] font-bold text-center block transition-colors"
                        >
                          Explore Full Catalog (8 Models)
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM MEGA-MENU SUB-BAR */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2 text-gray-600 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#ea580c]" />
                      <span>Direct EnerTech Pune Plant Warranty &amp; Turnkey Pan-India Engineering SLA</span>
                    </div>
                    <a
                      href="tel:+919822407189"
                      className="text-[#ea580c] font-bold hover:underline flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Sales &amp; Sizing Desk: +91 98224 07189</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* SOLUTIONS MEGA MENU TRIGGER */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnterMenu("solutions")}
              onMouseLeave={handleMouseLeaveMenu}
            >
              <Link
                href="/solutions"
                className={`relative flex items-center gap-1 px-2.5 xl:px-3.5 py-2 text-[13px] xl:text-[14px] uppercase font-semibold tracking-wider transition-colors whitespace-nowrap ${
                  pathname.startsWith("/solutions")
                    ? "text-[#ea580c] font-bold after:absolute after:bottom-0 after:left-2.5 xl:after:left-3.5 after:right-2.5 xl:after:right-3.5 after:h-[2.5px] after:bg-[#ea580c] after:rounded-full"
                    : "text-gray-700 hover:text-[#ea580c]"
                }`}
              >
                <span>Solutions</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMegaMenu === "solutions" ? "rotate-180 text-[#ea580c]" : "text-gray-400"
                  }`}
                />
              </Link>

              {/* SOLUTIONS MEGA-MENU DROPDOWN */}
              {activeMegaMenu === "solutions" && (
                <div
                  onMouseEnter={() => handleMouseEnterMenu("solutions")}
                  onMouseLeave={handleMouseLeaveMenu}
                  className="absolute top-full -left-20 w-[720px] bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.15)] border-t-4 border-t-[#091e3a] rounded-b-2xl p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200 before:absolute before:-top-3 before:left-0 before:right-0 before:h-4 before:content-['']"
                >
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pb-3">
                    Engineered Sector Architectures
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {SOLUTIONS.map((sol) => (
                      <Link
                        key={sol.id}
                        href={`/solutions/${sol.slug}`}
                        className="p-3.5 rounded-xl border border-gray-200/80 hover:border-orange-300 hover:bg-orange-50/40 transition-all group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold text-[#ea580c] bg-orange-100/70 px-2 py-0.5 rounded">
                              {sol.badge}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-[#091e3a] group-hover:text-[#ea580c] transition-colors mb-1">
                            {sol.title}
                          </div>
                          <div className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                            {sol.tagline}
                          </div>
                        </div>
                        <div className="mt-2 text-[11px] font-bold text-[#ea580c] flex items-center gap-1">
                          <span>Explore Architecture</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Solar Calculator Promo Strip */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between bg-slate-50 border border-slate-200/80 p-3 rounded-xl">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#091e3a] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Calculator className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#091e3a]">Interactive System Sizing Tool</div>
                        <div className="text-[11px] text-gray-500">Calculate inverter capacity, battery bank & annual savings</div>
                      </div>
                    </div>
                    <Link
                      href="/calculator"
                      className="text-xs font-bold text-[#ea580c] hover:underline flex items-center gap-1 flex-shrink-0 ml-3"
                    >
                      <span>Open Calculator</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* COMPANY DROPDOWN TRIGGER (Consolidates About, Installations, Insights, Careers, Services) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnterMenu("company")}
              onMouseLeave={handleMouseLeaveMenu}
            >
              <button
                type="button"
                className={`relative flex items-center gap-1 px-2.5 xl:px-3.5 py-2 text-[13px] xl:text-[14px] uppercase font-semibold tracking-wider transition-colors whitespace-nowrap ${
                  pathname.startsWith("/about") ||
                  pathname.startsWith("/installations") ||
                  pathname.startsWith("/projects") ||
                  pathname.startsWith("/blog") ||
                  pathname.startsWith("/careers") ||
                  pathname.startsWith("/services")
                    ? "text-[#ea580c] font-bold after:absolute after:bottom-0 after:left-2.5 xl:after:left-3.5 after:right-2.5 xl:after:right-3.5 after:h-[2.5px] after:bg-[#ea580c] after:rounded-full"
                    : "text-gray-700 hover:text-[#ea580c]"
                }`}
              >
                <span>Company</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMegaMenu === "company" ? "rotate-180 text-[#ea580c]" : "text-gray-400"
                  }`}
                />
              </button>

              {/* COMPANY DROPDOWN MENU */}
              {activeMegaMenu === "company" && (
                <div
                  onMouseEnter={() => handleMouseEnterMenu("company")}
                  onMouseLeave={handleMouseLeaveMenu}
                  className="absolute top-full -left-10 w-80 bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border-t-4 border-t-[#ea580c] rounded-b-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 before:absolute before:-top-3 before:left-0 before:right-0 before:h-4 before:content-['']"
                >
                  <div className="space-y-1">
                    <Link
                      href="/about"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-orange-50/60 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-100/70 text-[#ea580c] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900 group-hover:text-[#ea580c]">
                          About Us &amp; Heritage
                        </div>
                        <div className="text-[11px] text-gray-500">35+ Years Pune plant partnership</div>
                      </div>
                    </Link>

                    <Link
                      href="/installations"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-orange-50/60 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-100/70 text-[#ea580c] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900 group-hover:text-[#ea580c]">
                          Real Installations
                        </div>
                        <div className="text-[11px] text-gray-500">Chakan, Hinjawadi, Baramati sites</div>
                      </div>
                    </Link>

                    <Link
                      href="/blog"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-orange-50/60 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-100/70 text-[#ea580c] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900 group-hover:text-[#ea580c]">
                          Knowledge Hub &amp; Blog
                        </div>
                        <div className="text-[11px] text-gray-500">Technical solar &amp; subsidy guides</div>
                      </div>
                    </Link>

                    <Link
                      href="/careers"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-orange-50/60 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900 group-hover:text-[#ea580c] flex items-center gap-1.5">
                          <span>Careers &amp; Engineering</span>
                          <span className="text-[9px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded">Hiring</span>
                        </div>
                        <div className="text-[11px] text-gray-500">Solar design &amp; field engineers</div>
                      </div>
                    </Link>

                    <Link
                      href="/services"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-orange-50/60 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-100/70 text-[#ea580c] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Wrench className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900 group-hover:text-[#ea580c]">
                          Turnkey Services &amp; SLA
                        </div>
                        <div className="text-[11px] text-gray-500">Site audits, DG sync &amp; 24/7 SLA</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className={`relative px-2.5 xl:px-3.5 py-2 text-[13px] xl:text-[14px] uppercase font-semibold tracking-wider transition-colors whitespace-nowrap ${
                pathname.startsWith("/contact")
                  ? "text-[#ea580c] font-bold after:absolute after:bottom-0 after:left-2.5 xl:after:left-3.5 after:right-2.5 xl:after:right-3.5 after:h-[2.5px] after:bg-[#ea580c] after:rounded-full"
                  : "text-gray-700 hover:text-[#ea580c]"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right Action Suite - Clean Reference Replica */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0 ml-2 xl:ml-4">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 text-gray-600 hover:text-[#ea580c] rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
              title="Search products, models, capacity..."
              aria-label="Open Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Reference 1 Deep Navy "Get a Quote" Pill Button */}
            <button
              onClick={() => openEnquiryModal({ source: "Header Primary Button" })}
              className="flex-shrink-0 whitespace-nowrap bg-[#091e3a] hover:bg-[#0c2447] text-white font-bold rounded-full px-5 py-2.5 text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 group"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Hamburger Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 text-gray-700 hover:text-[#ea580c]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#091e3a] hover:text-[#ea580c] rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION DRAWER */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white shadow-2xl animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
            <div className="px-4 py-5 space-y-3">
              <Link
                href="/"
                className="block px-3 py-2 rounded-lg text-sm font-bold text-[#091e3a] hover:bg-orange-50/60"
              >
                Home
              </Link>

              {/* Mobile Products Accordion (3 EnerTech Engineering Pillars) */}
              <div className="border-t border-gray-100 pt-2">
                <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Power Electronics Catalog
                </div>
                <div className="space-y-2 pl-2">
                  {/* Pillar 1: Solar Products */}
                  <div className="bg-orange-50/40 rounded-xl p-2.5 border border-orange-100">
                    <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
                      <span>Solar Products &amp; Inverters</span>
                    </div>
                    <div className="space-y-1 pl-3 text-xs">
                      <Link
                        href="/products/solar-hybrid-inverters/sunmagic-three-phase-solar-hybrid-inverter"
                        className="block py-1 text-gray-700 hover:text-[#ea580c] font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        SunMagic 3-Phase Hybrid (10 - 300 kVA)
                      </Link>
                      <Link
                        href="/products/solar-hybrid-inverters/sunmagic-single-phase-solar-hybrid-inverter"
                        className="block py-1 text-gray-700 hover:text-[#ea580c] font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        SunMagic 1-Phase Hybrid (3 - 15 kVA)
                      </Link>
                      <Link
                        href="/products/solar-hybrid-inverters/wall-mounted-hf-solar-hybrid-inverter"
                        className="block py-1 text-gray-700 hover:text-[#ea580c] font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Wall-Mount HF Inverter (3 - 6 kW)
                      </Link>
                    </div>
                  </div>

                  {/* Pillar 2: Critical Power */}
                  <div className="bg-blue-50/40 rounded-xl p-2.5 border border-blue-100">
                    <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span>Critical Power &amp; Quality</span>
                    </div>
                    <div className="space-y-1 pl-3 text-xs">
                      <Link
                        href="/products/solar-online-ups/solar-online-ups-system"
                        className="block py-1 text-gray-700 hover:text-blue-700 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        True Online Solar UPS (0ms Seamless)
                      </Link>
                      <Link
                        href="/products/power-conditioning/industrial-servo-voltage-stabilizer"
                        className="block py-1 text-gray-700 hover:text-blue-700 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Industrial Servo Stabilizers (1 - 1000 kVA)
                      </Link>
                      <Link
                        href="/products/power-conditioning/industrial-igbt-scr-battery-charger"
                        className="block py-1 text-gray-700 hover:text-blue-700 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        IGBT / SCR Industrial Battery Chargers
                      </Link>
                    </div>
                  </div>

                  {/* Pillar 3: BESS & Storage */}
                  <div className="bg-emerald-50/40 rounded-xl p-2.5 border border-emerald-100">
                    <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span>Solar BESS &amp; Storage</span>
                    </div>
                    <div className="space-y-1 pl-3 text-xs">
                      <Link
                        href="/products/bess/enercube-commercial-battery-energy-storage-system"
                        className="block py-1 text-gray-700 hover:text-emerald-700 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        EnerCube BESS (50kW / 100kWh – 1MWh)
                      </Link>
                      <Link
                        href="/products/batteries/lfp-lithium-iron-phosphate-battery-module"
                        className="block py-1 text-gray-700 hover:text-emerald-700 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        LFP LiFePO4 Battery Modules (51.2V)
                      </Link>
                    </div>
                  </div>

                  <Link
                    href="/products"
                    className="block px-3 py-2 text-xs font-bold text-[#ea580c] hover:underline"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    View All Power Electronics Models →
                  </Link>
                </div>
              </div>

              {/* Solutions */}
              <div className="border-t border-gray-100 pt-2">
                <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Solutions & Applications
                </div>
                <div className="space-y-1 pl-2">
                  {SOLUTIONS.map((sol) => (
                    <Link
                      key={sol.id}
                      href={`/solutions/${sol.slug}`}
                      className="block px-3 py-2 rounded-lg text-xs text-gray-700 hover:text-[#ea580c]"
                    >
                      {sol.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-2 space-y-1">
                <Link
                  href="/calculator"
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50"
                >
                  <span>Solar Sizing Calculator</span>
                  <span className="text-[10px] bg-orange-100 text-[#ea580c] font-bold px-2 py-0.5 rounded-full">
                    Tool
                  </span>
                </Link>
                <Link
                  href="/installations"
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Real Installations & Projects
                </Link>
                <Link
                  href="/blog"
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Solar Knowledge Hub & Blog
                </Link>
                <Link
                  href="/careers"
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Careers & Engineering Hiring</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-full">
                    Hiring
                  </span>
                </Link>
                <Link
                  href="/about"
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About EnerTech & Electra Solar
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact & Hub Locations
                </Link>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openEnquiryModal({ source: "Mobile Drawer" });
                  }}
                  className="w-full bg-[#091e3a] hover:bg-[#ea580c] text-white py-3 rounded-full font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <span>Request Engineering Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={`tel:${COMPANY.contact.salesPhone1}`}
                  className="w-full py-2.5 rounded-full text-center text-xs font-bold border border-gray-300 text-gray-800 flex items-center justify-center gap-2 hover:border-[#ea580c] hover:text-[#ea580c] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ea580c]" />
                  <span>Call {COMPANY.contact.salesPhone1}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 3. INTERACTIVE SPOTLIGHT SEARCH MODAL */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-150">
            {/* Search Input Bar */}
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, models, capacity, or ratings..."
                className="w-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
              />
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Suggestions or Live Results */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {searchQuery.trim() === "" ? (
                <div className="space-y-4">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Popular Hardware Searches
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "SunMagic 3-Phase",
                      "SunMagic 1-Phase",
                      "EnerCube BESS",
                      "51.2V LFP Lithium",
                      "Servo Stabilizer",
                      "Solar Online UPS",
                    ].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="text-xs bg-gray-100 hover:bg-orange-50 hover:text-[#ea580c] text-gray-700 px-3 py-1.5 rounded-full transition-colors font-medium"
                      >
                        {term}
                      </button>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Browse by Category
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/products/${cat.slug}`}
                          onClick={() => setIsSearchModalOpen(false)}
                          className="text-xs text-gray-700 hover:text-[#ea580c] font-medium p-2 rounded hover:bg-orange-50/50 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]" />
                          <span>{cat.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : filteredSearchResults.length > 0 ? (
                <div className="space-y-2">
                  <div className="text-xs text-gray-500 mb-2">
                    Found {filteredSearchResults.length} matching products:
                  </div>
                  {filteredSearchResults.map((prod) => (
                    <Link
                      key={prod.id}
                      href={`/products/${prod.category}/${prod.slug}`}
                      onClick={() => setIsSearchModalOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50/50 border border-transparent hover:border-orange-200 transition-all group"
                    >
                      <div className="w-12 h-12 relative bg-white rounded-lg p-1 border border-gray-100 flex-shrink-0">
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          className="object-contain"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#091e3a] group-hover:text-[#ea580c] transition-colors truncate">
                          {prod.name}
                        </div>
                        <div className="text-[11px] font-mono text-[#ea580c] font-semibold">
                          {prod.modelCode} • {prod.capacityRange}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#ea580c] group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-sm text-gray-500">
                  No matching models found for &quot;{searchQuery}&quot;. Try searching &quot;SunMagic&quot; or &quot;BESS&quot;.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  </>
  );
}
