import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductRangeSection } from "@/components/home/ProductRangeSection";
import { WhyElectraSolarSection } from "@/components/home/WhyElectraSolarSection";
import { ApplicationsSection } from "@/components/home/ApplicationsSection";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
import { SwitchToSolarCta } from "@/components/home/SwitchToSolarCta";
import { FaqSection } from "@/components/home/FaqSection";

export default function HomePage() {
  return (
    <div className="space-y-0 bg-white">
      {/* 1. Multi-sector Hero Carousel with transparent hardware and pill switcher */}
      <HeroSection />

      {/* 2. De-cluttered Hardware Category Range (4 Clean Cards) */}
      <ProductRangeSection />

      {/* 3. Exact Mockup "Why Electra Solar?" Split Section (Villa Photo + Deep Navy Stats Box) */}
      <WhyElectraSolarSection />

      {/* 4. Exact Mockup "Applications" Photo Grid (Residential, Commercial, Industrial, Utility) */}
      <ApplicationsSection />

      {/* 5. Deep Technical Specifications & Product Browser */}
      <FeaturedProductsSection />

      {/* 6. Exact Mockup "Switch to Solar Today" High-Impact Banner */}
      <SwitchToSolarCta />

      {/* 7. Engineering FAQs & Partnership Assurance */}
      <FaqSection />
    </div>
  );
}
