"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  ShieldCheck, 
  Leaf, 
  Zap, 
  Headphones, 
  Home, 
  Building2, 
  HeartPulse, 
  BatteryCharging,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useEnquiryModal } from "@/components/forms/EnquiryModalContext";

interface HeroSlide {
  id: string;
  pillLabel: string;
  pillIcon: React.ReactNode;
  bgImage: string;
  bgAlt: string;
  kicker: string;
  headlineMain: string;
  headlineHighlight: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  productImage: string;
  productAlt: string;
  productCategoryBadge: string;
  productCapacityBadge: string;
  productTitle: string;
  productSpec: string;
  productLink: string;
}

export function HeroSection() {
  const { openEnquiryModal } = useEnquiryModal();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides: HeroSlide[] = [
    {
      id: "residential",
      pillLabel: "Home & Villa",
      pillIcon: <Home className="w-3.5 h-3.5" />,
      bgImage: "/images/showcase/solar-home-villa.jpg",
      bgAlt: "Electra Solar Residential Rooftop Solar & Hybrid Inverter Installation",
      kicker: "RESIDENTIAL SOLAR",
      headlineMain: "Powering Homes with",
      headlineHighlight: "Solar",
      subtitle: "Zero-break hybrid power and battery backup for homes.",
      primaryCtaText: "Explore Products",
      primaryCtaLink: "/products/solar-hybrid-inverters",
      productImage: "/images/products/sunmagic-3ph.webp",
      productAlt: "SunMagic 3-Phase Industrial Solar Hybrid Inverter",
      productCategoryBadge: "Hybrid PCU",
      productCapacityBadge: "10kW – 50kW",
      productTitle: "SunMagic Series",
      productSpec: "Zero-Break Transfer • 100% Phase Unbalanced",
      productLink: "/products/solar-hybrid-inverters",
    },
    {
      id: "industrial",
      pillLabel: "Industrial (C&I)",
      pillIcon: <Building2 className="w-3.5 h-3.5" />,
      bgImage: "/images/showcase/industrial-solar.jpg",
      bgAlt: "Electra Solar Commercial & Industrial Turnkey Solar Installation",
      kicker: "C&I FACTORIES",
      headlineMain: "Zero-Break Power for",
      headlineHighlight: "Industry",
      subtitle: "Heavy-duty hybrid power with seamless DG synchronization.",
      primaryCtaText: "Explore Industrial",
      primaryCtaLink: "/solutions/commercial-industrial-power-solutions",
      productImage: "/images/products/enercube-bess.webp",
      productAlt: "EnerCube Commercial Battery Energy Storage System (BESS)",
      productCategoryBadge: "Commercial BESS",
      productCapacityBadge: "50kVA – 500kVA+",
      productTitle: "EnerCube Series",
      productSpec: "Peak Shaving • Seamless DG Integration",
      productLink: "/products/bess",
    },
    {
      id: "healthcare",
      pillLabel: "Critical Healthcare",
      pillIcon: <HeartPulse className="w-3.5 h-3.5" />,
      bgImage: "/images/showcase/utility-solar.jpg",
      bgAlt: "Electra Solar Healthcare & Mission Critical Hospital Solar UPS",
      kicker: "HEALTHCARE & HOSPITALS",
      headlineMain: "Uninterrupted Power for",
      headlineHighlight: "Life Systems",
      subtitle: "Hospital-grade isolated online UPS with zero flicker.",
      primaryCtaText: "Explore Healthcare",
      primaryCtaLink: "/solutions/critical-infrastructure-and-healthcare",
      productImage: "/images/products/online-ups.webp",
      productAlt: "True Solar Online UPS Double Conversion System",
      productCategoryBadge: "Solar Online UPS",
      productCapacityBadge: "20kVA – 250kVA",
      productTitle: "Solar Online UPS",
      productSpec: "True 0ms Double-Conversion • Galvanic Isolation",
      productLink: "/products/solar-online-ups",
    },
    {
      id: "batteries",
      pillLabel: "Battery Storage",
      pillIcon: <BatteryCharging className="w-3.5 h-3.5" />,
      bgImage: "/images/showcase/commercial-solar.jpg",
      bgAlt: "Electra Solar Lithium LiFePO4 Energy Storage Solutions",
      kicker: "LFP BATTERY STORAGE",
      headlineMain: "Next-Gen LiFePO4",
      headlineHighlight: "Storage",
      subtitle: "Modular lithium storage with 4,500+ deep cycles.",
      primaryCtaText: "Explore Batteries",
      primaryCtaLink: "/products/batteries",
      productImage: "/images/products/lfp-battery.webp",
      productAlt: "Electra Solar LiFePO4 Lithium Iron Phosphate Rack Battery Pack",
      productCategoryBadge: "Lithium LFP",
      productCapacityBadge: "5.12kWh – 100kWh+",
      productTitle: "ProSeries LFP Storage",
      productSpec: "4,500+ Cycles • Automotive-Grade Prismatic Cells",
      productLink: "/products/batteries",
    },
  ];

  // Auto-advance every 4 seconds (within 3 to 5 sec as requested)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const active = slides[currentSlide];

  const bottomFeatures = [
    {
      icon: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />,
      label: "Reliable Performance",
      sub: "IP65 • Sub-5ms UPS",
    },
    {
      icon: <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />,
      label: "Clean Energy",
      sub: "100% Green Self-Use",
    },
    {
      icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#f97316]" />,
      label: "Higher Efficiency",
      sub: "Up to 98.4% Peak",
    },
    {
      icon: <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />,
      label: "Dedicated Support",
      sub: "Pune Plant 24/7 SLA",
    },
  ];

  return (
    <section 
      className="relative min-h-[520px] lg:min-h-[560px] flex flex-col justify-between text-white overflow-hidden bg-gray-900 border-b border-gray-200 select-none"
    >
      {/* Background Slides with Cross-Fade Opacity */}
      {slides.map((s, idx) => (
        <div 
          key={s.id} 
          className={`absolute inset-0 z-0 transition-opacity duration-700 ease-in-out ${
            idx === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={s.bgImage}
            alt={s.bgAlt}
            fill
            priority={idx === 0}
            className="object-cover object-center scale-100"
            sizes="100vw"
          />
          {/* Natural Sunlit Scrim: Left-to-Right gradient for crisp typography */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 lg:to-transparent" />
        </div>
      ))}

      {/* Soft bottom vignette to seat the 4 bottom feature badges */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none z-0" />

      {/* Desktop Side Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="hidden xl:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/75 border border-white/20 text-white items-center justify-center transition-all hover:scale-105 active:scale-95"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="hidden xl:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/75 border border-white/20 text-white items-center justify-center transition-all hover:scale-105 active:scale-95"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Main Hero Grid Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-10 lg:pb-10 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center w-full">
          
          {/* Left Column: Sector Pills, Minimal Kicker, Headline, 1-Line Subtitle, CTAs */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-3.5 text-center lg:text-left">
            
            {/* 1. SECTOR NAVIGATION PILLS ABOVE HEADLINE */}
            <div 
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 pb-1"
            >
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${
                    currentSlide === idx
                      ? "bg-[#ea580c] text-white shadow-md scale-105 ring-2 ring-[#ea580c]/50"
                      : "bg-black/45 hover:bg-black/65 text-gray-200 hover:text-white border border-white/25"
                  }`}
                >
                  {s.pillIcon}
                  <span>{s.pillLabel}</span>
                </button>
              ))}
            </div>

            {/* 2. MINIMAL KICKER */}
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gray-200 drop-shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse" />
              <span>{active.kicker}</span>
            </div>

            {/* 3. PUNCHY MINIMAL HEADLINE */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12] drop-shadow-md min-h-[50px] sm:min-h-[60px] lg:min-h-[70px] flex items-center justify-center lg:justify-start">
              <span>
                {active.headlineMain}{" "}
                <span className="text-[#f97316]">
                  {active.headlineHighlight}
                </span>
              </span>
            </h1>

            {/* 4. ULTRA-MINIMAL 1-LINE SUBTITLE */}
            <p className="text-sm sm:text-base text-gray-200 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal drop-shadow-sm">
              {active.subtitle}
            </p>

            {/* 5. ACTION BUTTONS */}
            <div 
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1"
            >
              <Link
                href={active.primaryCtaLink}
                className="w-full sm:w-auto bg-[#f97316] hover:bg-[#ea580c] text-white px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
              >
                <span>{active.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => openEnquiryModal({ source: `Hero CTA - ${active.pillLabel}` })}
                className="w-full sm:w-auto bg-black/35 hover:bg-black/55 text-white border border-white/40 hover:border-white px-6 py-3.5 rounded-full font-semibold text-xs transition-all flex items-center justify-center gap-2"
              >
                <span>Talk to an Expert</span>
              </button>
            </div>

            {/* 6. PARTNERSHIP TRUST LINE */}
            <div className="pt-1 flex items-center justify-center lg:justify-start gap-2 text-xs text-gray-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Official EnerTech Technical Partner (Pune Plant • Estd. 1989)</span>
            </div>

          </div>

          {/* Right Column: TRANSPARENT FLOATING HARDWARE STAGE (NO WHITE BOX) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* Transparent Floating Hardware Render with 3D Drop Shadow */}
            <div className="relative w-full h-64 sm:h-72 lg:h-80 flex items-center justify-center">
              <Image
                key={active.productImage}
                src={active.productImage}
                alt={active.productAlt}
                fill
                priority
                className="object-contain p-2 drop-shadow-[0_25px_35px_rgba(0,0,0,0.75)] hover:scale-105 transition-all duration-500 ease-out"
                sizes="(max-width: 1024px) 100vw, 420px"
              />
            </div>

            {/* Sleek Translucent Frosted Glass Hardware Dock */}
            <div 
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="mt-2 w-full max-w-xs sm:max-w-sm bg-black/55 backdrop-blur-md border border-white/20 rounded-2xl p-3 px-4 shadow-xl flex items-center justify-between transition-all"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-black tracking-tight text-white truncate">
                    {active.productTitle}
                  </span>
                  <span className="bg-[#ea580c] text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                    {active.productCapacityBadge}
                  </span>
                </div>
                <div className="text-[11px] text-gray-300 truncate mt-0.5">
                  {active.productSpec}
                </div>
              </div>
              
              <Link
                href={active.productLink}
                className="text-xs font-bold text-[#f97316] hover:text-white flex items-center gap-1 flex-shrink-0 transition-colors bg-white/10 hover:bg-[#ea580c] px-3 py-1.5 rounded-full border border-white/20"
              >
                <span>Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Feature Strip - 4 Grounded Pillars Over the Lawn */}
      <div className="relative z-10 border-t border-white/15 bg-black/45 backdrop-blur-md py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bottomFeatures.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all shadow-sm">
                {item.icon}
              </div>
              <div>
                <div className="font-bold text-white text-xs tracking-tight">
                  {item.label}
                </div>
                <div className="text-[10px] text-gray-300 font-medium">
                  {item.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
