import React from "react";
import type { Metadata } from "next";
import { ProductsCatalogueView } from "@/components/products/ProductsCatalogueView";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Products Catalogue | Solar Hybrid Inverters & BESS | Electra Solar",
  description:
    "Explore Electra Solar's complete catalogue of EnerTech solar hybrid inverters, C&I BESS, lithium storage packs, and 0ms online UPS systems.",
};

export default function ProductsPage() {
  return (
    <div className="py-12 lg:py-16 bg-[#f8fafd] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Page Hero Header - Deye Style */}
        <div className="space-y-3 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#015cbb] block">
            Product Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#222222] tracking-tight">
            Solar Hybrid Inverters & Energy Systems
          </h1>
          <div className="w-16 h-1 bg-[#015cbb]" />
          <p className="text-[#5c5c5c] text-base leading-relaxed">
            Discover verified solar hybrid inverters from 1 kVA to 300 kVA, modular BESS battery storage,
            and precision power conditioning equipment with manufacturer-backed warranties.
          </p>
        </div>

        {/* Interactive Catalogue */}
        <ProductsCatalogueView />
      </div>
    </div>
  );
}
