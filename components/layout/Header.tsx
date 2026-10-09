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
  Scale,
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
import { useCompare } from "@/components/compare/CompareContext";
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
  const { compareList } = useCompare();
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
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        return <Sun className="w-4 h-4 text-[#015cbb]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-4 h-4 text-[#015cbb]" />;
      case "Layers":
        return <Layers className="w-4 h-4 text-[#015cbb]" />;
      case "BatteryCharging":
        return <BatteryCharging className="w-4 h-4 text-[#015cbb]" />;
      default:
        return <Zap className="w-4 h-4 text-[#015cbb]" />;
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
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* 1. TOP UTILITY & INDUSTRIAL TRUST STRIP (Deye + Luminous + UTL Best Practice) */}
      <div
        className={`bg-[#18202c] text-[11px] sm:text-xs px-4 text-gray-300 transition-all duration-300 overflow-hidden ${
          isScrolled
            ? "max-h-0 py-0 opacity-0 border-none"
            : "max-h-14 py-1.5 opacity-100 border-b border-gray-800"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Official Partnership & Plant Location */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#015cbb]/30 text-[#80d8ff] border border-[#015cbb]/60 font-semibold text-[10px] tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-[#51b2e3]" />
              Official Turnkey Distributor
            </span>
            <span className="hidden md:inline text-gray-300">
              EnerTech UPS Pvt. Ltd. (Pune Plant • Estd. 1989)
            </span>
            <span className="hidden xl:inline text-gray-500">•</span>
            <span className="hidden xl:inline text-emerald-400 font-medium">
              Over 35,000+ Systems Commissioned
            </span>
          </div>

          {/* Right: Technical Support Hotline + Free Sizing Tool + Region */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 ml-auto text-xs flex-shrink-0">
            <a
              href={`tel:${COMPANY.contact.salesPhone1}`}
              className="flex items-center gap-1.5 text-gray-200 hover:text-[#51b2e3] transition-colors"
              title="Speak directly with our power engineering team"
            >
              <Phone className="w-3.5 h-3.5 text-[#51b2e3]" />
              <span className="font-semibold">{COMPANY.contact.salesPhone1}</span>
            </a>

            <span className="text-gray-700 hidden sm:inline">|</span>

            <Link
              href="/calculator"
              className="hidden sm:flex items-center gap-1 text-[#51b2e3] hover:text-white transition-colors font-semibold"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Sizing Tool</span>
            </Link>

            <span className="text-gray-700 hidden sm:inline">|</span>

            <Link
              href="/contact"
              className="hidden md:flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              <MapPin className="w-3 h-3 text-gray-400" />
              <span>Maharashtra Hubs</span>
            </Link>

            <span className="text-gray-700 hidden sm:inline">|</span>

            {/* Region / Language Capsule */}
            <div className="inline-flex items-center gap-1.5 bg-gray-800/90 text-gray-200 px-2.5 py-0.5 rounded-full border border-gray-700 text-[11px] font-medium shadow-inner">
              <span className="text-xs">🇮🇳</span>
              <span>India (EN)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR - Option 1 Deye Global Flagship Sapphire Header */}
      <nav
        className={`w-full bg-[#091e3a] text-white transition-all duration-300 ${
          isScrolled
            ? "shadow-[0_8px_30px_rgba(0,0,0,0.3)] py-3 border-b border-white/10"
            : "border-b border-white/10 shadow-[0_2px_15px_rgba(0,0,0,0.15)] py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo - High precision industrial aesthetic */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#015cbb] via-[#00d2ff] to-[#51b2e3] p-0.5 shadow-md group-hover:scale-105 transition-all flex-shrink-0">
              <div className="w-full h-full bg-[#091e3a] rounded-[10px] flex items-center justify-center">
                <Sun className="w-5 h-5 text-[#00d2ff] group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                ELECTRA <span className="text-[#00d2ff]">SOLAR</span>
              </span>
              <span className="text-[10px] text-cyan-200/70 font-semibold tracking-wider uppercase flex items-center gap-1">
                Authorized EnerTech Partner
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with World-Class Mega-Menus */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 flex-shrink-0">
            <Link
              href="/"
              className={`relative px-2.5 xl:px-3.5 py-2 text-[13px] xl:text-[14px] uppercase font-semibold tracking-wider transition-colors whitespace-nowrap ${
                pathname === "/"
                  ? "text-[#00d2ff] font-bold after:absolute after:bottom-0 after:left-2.5 xl:after:left-3.5 after:right-2.5 xl:after:right-3.5 after:h-[2.5px] after:bg-[#00d2ff] after:rounded-full"
                  : "text-gray-200 hover:text-[#00d2ff]"
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
                    ? "text-[#00d2ff] font-bold after:absolute after:bottom-0 after:left-2.5 xl:after:left-3.5 after:right-2.5 xl:after:right-3.5 after:h-[2.5px] after:bg-[#00d2ff] after:rounded-full"
                    : "text-gray-200 hover:text-[#00d2ff]"
                }`}
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMegaMenu === "products" ? "rotate-180 text-[#00d2ff]" : ""
                  }`}
                />
              </Link>

              {/* WORLD-CLASS PRODUCTS MEGA-MENU DROPDOWN */}
              {activeMegaMenu === "products" && (
                <div
                  onMouseEnter={() => handleMouseEnterMenu("products")}
                  onMouseLeave={handleMouseLeaveMenu}
                  className="absolute top-full -left-20 w-[880px] bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.15)] border-t-4 border-t-[#015cbb] rounded-b-2xl p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200 before:absolute before:-top-3 before:left-0 before:right-0 before:h-4 before:content-['']"
                >
                  <div className="grid grid-cols-12 gap-6">
                    {/* Column 1: Categories (5 cols) */}
                    <div className="col-span-5 border-r border-gray-100 pr-4 space-y-2">
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-2 pb-1">
                        Power Electronics Categories
                      </div>
                      <div className="space-y-1">
                        {CATEGORIES.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/products/${cat.slug}`}
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#f0f7ff] transition-all group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#e6f0fa] flex items-center justify-center flex-shrink-0 group-hover:bg-[#015cbb] group-hover:text-white transition-colors">
                              {getCategoryIcon(cat.iconName)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-[#1a202c] group-hover:text-[#015cbb] transition-colors truncate">
                                {cat.name}
                              </div>
                              <div className="text-[11px] text-gray-500 truncate">{cat.shortDesc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Flagship Product Showcase (4 cols) */}
                    <div className="col-span-4 bg-[#f8fafd] rounded-xl p-4 border border-gray-200/80 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-black uppercase tracking-wider bg-[#e53e3e] text-white px-2 py-0.5 rounded">
                            Flagship
                          </span>
                          <span className="text-[10px] font-mono text-gray-500 font-bold">10 - 300 kVA</span>
                        </div>
                        <h4 className="text-xs font-bold text-[#1a202c] leading-tight mb-2">
                          SunMagic 3-Phase REeFI Industrial PCU
                        </h4>
                        <div className="relative w-full h-28 my-1 flex items-center justify-center">
                          <Image
                            src="/images/products/sunmagic-3ph.webp"
                            alt="SunMagic 3-Phase Solar Hybrid Inverter"
                            fill
                            className="object-contain filter drop-shadow-md hover:scale-105 transition-transform"
                            sizes="200px"
                          />
                        </div>
                        <div className="text-[11px] text-gray-600 space-y-1 pt-1">
                          <div className="flex items-center gap-1.5 text-xs text-[#015cbb] font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#015cbb]" />
                            <span>100% Phase Unbalance Support</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#015cbb]" />
                            <span>&lt; 5ms Zero Break Transfer</span>
                          </div>
                        </div>
                      </div>

                      <Link
                        href="/products/solar-hybrid-inverters/sunmagic-three-phase-solar-hybrid-inverter"
                        className="mt-3 w-full bg-[#015cbb] hover:bg-[#004896] text-white py-2 px-3 rounded-lg text-xs font-bold text-center block transition-colors"
                      >
                        View Specifications →
                      </Link>
                    </div>

                    {/* Column 3: Engineering Tools & Quick Resources (3 cols) */}
                    <div className="col-span-3 space-y-3">
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pb-1">
                        Engineering Suite
                      </div>

                      <Link
                        href="/calculator"
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Calculator className="w-4 h-4 text-[#015cbb] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-[#1a202c]">Sizing Calculator</div>
                          <div className="text-[10px] text-gray-500">Accurate kVA & battery sizing</div>
                        </div>
                      </Link>

                      <Link
                        href="/compare"
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Scale className="w-4 h-4 text-[#015cbb] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-[#1a202c]">Compare Models</div>
                          <div className="text-[10px] text-gray-500">Side-by-side technical specs</div>
                        </div>
                      </Link>

                      <div className="pt-2 border-t border-gray-100">
                        <Link
                          href="/products"
                          className="text-xs font-bold text-[#015cbb] hover:underline flex items-center gap-1"
                        >
                          <span>Explore All 8 Verified Models</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
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
                    ? "text-[#00d2ff] font-bold after:absolute after:bottom-0 after:left-2.5 xl:after:left-3.5 after:right-2.5 xl:after:right-3.5 after:h-[2.5px] after:bg-[#00d2ff] after:rounded-full"
                    : "text-gray-200 hover:text-[#00d2ff]"
                }`}
              >
                <span>Solutions</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMegaMenu === "solutions" ? "rotate-180 text-[#00d2ff]" : ""
                  }`}
                />
              </Link>

              {/* SOLUTIONS MEGA-MENU DROPDOWN */}
              {activeMegaMenu === "solutions" && (
                <div
                  onMouseEnter={() => handleMouseEnterMenu("solutions")}
                  onMouseLeave={handleMouseLeaveMenu}
                  className="absolute top-full -left-20 w-[720px] bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.25)] border-t-4 border-t-[#00d2ff] rounded-b-2xl p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200 before:absolute before:-top-3 before:left-0 before:right-0 before:h-4 before:content-['']"
                >
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pb-3">
                    Engineered Sector Architectures
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {SOLUTIONS.map((sol) => (
                      <Link
                        key={sol.id}
                        href={`/solutions/${sol.slug}`}
                        className="p-3.5 rounded-xl border border-gray-100 hover:border-[#00d2ff]/40 hover:bg-[#f0f7ff] transition-all group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold text-[#015cbb] bg-[#e6f0fa] px-2 py-0.5 rounded">
                              {sol.badge}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-[#1a202c] group-hover:text-[#015cbb] transition-colors mb-1">
                            {sol.title}
                          </div>
                          <div className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                            {sol.tagline}
                          </div>
                        </div>
                        <div className="mt-2 text-[11px] font-bold text-[#015cbb] flex items-center gap-1">
                          <span>Explore Architecture</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Solar Calculator Promo Strip */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between bg-[#f0f7ff] p-3 rounded-xl">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#015cbb] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Calculator className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#1a202c]">Interactive System Sizing Tool</div>
                        <div className="text-[11px] text-gray-500">Calculate inverter capacity, battery bank & annual savings</div>
                      </div>
                    </div>
                    <Link
                      href="/calculator"
                      className="text-xs font-bold text-[#015cbb] hover:underline flex items-center gap-1 flex-shrink-0 ml-3"
                    >
                      <span>Open Calculator</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* SERVICES TRIGGER */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnterMenu("services")}
              onMouseLeave={handleMouseLeaveMenu}
            >
              <Link
                href="/services"
                className={`relative flex items-center gap-1 px-2.5 xl:px-3.5 py-2 text-[13px] xl:text-[14px] uppercase font-semibold tracking-wider transition-colors whitespace-nowrap ${
                  pathname.startsWith("/services")
                    ? "text-[#00d2ff] font-bold after:absolute after:bottom-0 after:left-2.5 xl:after:left-3.5 after:right-2.5 xl:after:right-3.5 after:h-[2.5px] after:bg-[#00d2ff] after:rounded-full"
                    : "text-gray-200 hover:text-[#00d2ff]"
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMegaMenu === "services" ? "rotate-180 text-[#00d2ff]" : ""
                  }`}
                />
              </Link>

              {/* SERVICES DROPDOWN */}
              {activeMegaMenu === "services" && (
                <div
                  onMouseEnter={() => handleMouseEnterMenu("services")}
                  onMouseLeave={handleMouseLeaveMenu}
                  className="absolute top-full left-0 w-80 bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-t-4 border-t-[#00d2ff] rounded-b-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 before:absolute before:-top-3 before:left-0 before:right-0 before:h-4 before:content-['']"
                >
                  <div className="space-y-1">
                    <Link
                      href="/services/site-survey-and-engineering-design"
                      className="block p-2.5 rounded-lg hover:bg-[#f0f7ff] transition-colors"
                    >
                      <div className="text-xs font-bold text-[#1a202c] hover:text-[#015cbb]">
                        1. Site Survey & SLD Design
                      </div>
                      <div className="text-[11px] text-gray-500">Harmonic & load analysis audits</div>
                    </Link>

                    <Link
                      href="/services/turnkey-installation-and-commissioning"
                      className="block p-2.5 rounded-lg hover:bg-[#f0f7ff] transition-colors"
                    >
                      <div className="text-xs font-bold text-[#1a202c] hover:text-[#015cbb]">
                        2. Turnkey Installation
                      </div>
                      <div className="text-[11px] text-gray-500">DG sync, mounting & testing</div>
                    </Link>

                    <Link
                      href="/services/amc-and-preventive-maintenance"
                      className="block p-2.5 rounded-lg hover:bg-[#f0f7ff] transition-colors"
                    >
                      <div className="text-xs font-bold text-[#1a202c] hover:text-[#015cbb]">
                        3. AMC & Maintenance
                      </div>
                      <div className="text-[11px] text-gray-500">24/7 industrial SLA coverage</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/projects"
              className={`relative px-2.5 xl:px-3.5 py-2 text-[13px] xl:text-[14px] uppercase font-semibold tracking-wider transition-colors whitespace-nowrap ${
                pathname.startsWith("/projects")
                  ? "text-[#00d2ff] font-bold after:absolute after:bottom-0 after:left-2.5 xl:after:left-3.5 after:right-2.5 xl:after:right-3.5 after:h-[2.5px] after:bg-[#00d2ff] after:rounded-full"
                  : "text-gray-200 hover:text-[#00d2ff]"
              }`}
            >
              Projects
            </Link>

            <Link
              href="/about"
              className={`relative px-2.5 xl:px-3.5 py-2 text-[13px] xl:text-[14px] uppercase font-semibold tracking-wider transition-colors whitespace-nowrap ${
                pathname.startsWith("/about")
                  ? "text-[#00d2ff] font-bold after:absolute after:bottom-0 after:left-2.5 xl:after:left-3.5 after:right-2.5 xl:after:right-3.5 after:h-[2.5px] after:bg-[#00d2ff] after:rounded-full"
                  : "text-gray-200 hover:text-[#00d2ff]"
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`relative px-2.5 xl:px-3.5 py-2 text-[13px] xl:text-[14px] uppercase font-semibold tracking-wider transition-colors whitespace-nowrap ${
                pathname.startsWith("/contact")
                  ? "text-[#00d2ff] font-bold after:absolute after:bottom-0 after:left-2.5 xl:after:left-3.5 after:right-2.5 xl:after:right-3.5 after:h-[2.5px] after:bg-[#00d2ff] after:rounded-full"
                  : "text-gray-200 hover:text-[#00d2ff]"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right Action Suite - Deye + Luminous + UTL Best-in-Class Controls */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0 ml-2 xl:ml-4">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 text-gray-300 hover:text-[#00d2ff] rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
              title="Search products, models, capacity..."
              aria-label="Open Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Compare Pill Indicator */}
            <Link
              href="/compare"
              className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                compareList.length > 0
                  ? "bg-[#00d2ff]/20 text-[#00d2ff] border-[#00d2ff]/50 shadow-sm"
                  : "bg-white/10 text-gray-200 border-white/20 hover:border-[#00d2ff]/40 hover:text-[#00d2ff]"
              }`}
              title="Compare specifications"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Compare</span>
              {compareList.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#00d2ff] text-[#091e3a] font-black flex items-center justify-center text-[10px]">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* Deye Signature High-Contrast Vibrant Tech Cyan Pill Button */}
            <button
              onClick={() => openEnquiryModal({ source: "Header Primary Button" })}
              className="flex-shrink-0 whitespace-nowrap bg-[#00d2ff] hover:bg-[#00b4d8] text-[#091e3a] font-black rounded-full px-5 py-2 text-xs uppercase tracking-wider shadow-lg shadow-[#00d2ff]/25 hover:shadow-[#00d2ff]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 group"
            >
              <span>Get Quote</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Hamburger Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 text-gray-700 hover:text-[#015cbb]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link href="/compare" className="p-2 text-gray-700 relative" title="Compare">
              <Scale className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#015cbb] text-white text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#1a202c] hover:text-[#015cbb] rounded-lg transition-colors"
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
                className="block px-3 py-2 rounded-lg text-sm font-bold text-[#1a202c] hover:bg-gray-50"
              >
                Home
              </Link>

              {/* Mobile Products Accordion */}
              <div className="border-t border-gray-100 pt-2">
                <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Product Categories
                </div>
                <div className="space-y-1 pl-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products/${cat.slug}`}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-gray-700 hover:text-[#015cbb] hover:bg-blue-50"
                    >
                      <div className="w-6 h-6 rounded bg-[#e6f0fa] flex items-center justify-center">
                        {getCategoryIcon(cat.iconName)}
                      </div>
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                  <Link
                    href="/products"
                    className="block px-3 py-2 text-xs font-bold text-[#015cbb]"
                  >
                    View All Products & Models →
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
                      className="block px-3 py-2 rounded-lg text-xs text-gray-700 hover:text-[#015cbb]"
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
                  <span className="text-[10px] bg-[#e6f0fa] text-[#015cbb] font-bold px-2 py-0.5 rounded-full">
                    Tool
                  </span>
                </Link>
                <Link
                  href="/projects"
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50"
                >
                  Case Studies & Installations
                </Link>
                <Link
                  href="/about"
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50"
                >
                  About EnerTech & Electra Solar
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50"
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
                  className="w-full bg-gradient-to-r from-[#015cbb] to-[#51b2e3] text-white py-3 rounded-full font-bold text-xs shadow-md flex items-center justify-center gap-2"
                >
                  <span>Request Engineering Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={`tel:${COMPANY.contact.salesPhone1}`}
                  className="w-full py-2.5 rounded-full text-center text-xs font-bold border border-gray-300 text-gray-800 flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#015cbb]" />
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
                placeholder="Search by model (e.g. SunMagic, BESS, 100kVA, Stabilizer)..."
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
                        className="text-xs bg-gray-100 hover:bg-[#e6f0fa] hover:text-[#015cbb] text-gray-700 px-3 py-1.5 rounded-full transition-colors"
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
                          className="text-xs text-gray-700 hover:text-[#015cbb] font-medium p-2 rounded hover:bg-gray-50 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#015cbb]" />
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
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f0f7ff] border border-transparent hover:border-[#015cbb]/20 transition-all group"
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
                        <div className="text-xs font-bold text-[#1a202c] group-hover:text-[#015cbb] transition-colors truncate">
                          {prod.name}
                        </div>
                        <div className="text-[11px] font-mono text-[#015cbb] font-semibold">
                          {prod.modelCode} • {prod.capacityRange}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#015cbb] group-hover:translate-x-1 transition-all" />
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
  );
}
