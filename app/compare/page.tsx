import React from "react";
import type { Metadata } from "next";
import { CompareMatrixView } from "@/components/compare/CompareMatrixView";

export const metadata: Metadata = {
  title: "Compare Solar Inverters & Systems | Electra Solar",
  description:
    "Compare technical specifications, phase capacities, topologies, efficiency, and battery voltages of EnerTech solar hybrid inverters side-by-side.",
};

export default function ComparePage() {
  return (
    <div className="py-12 lg:py-16 bg-[#f8fafd] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="space-y-3 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#015cbb] block">
            Side-by-Side Comparison
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#222222] tracking-tight">
            Compare Solar & Energy Systems
          </h1>
          <div className="w-16 h-1 bg-[#015cbb]" />
          <p className="text-[#5c5c5c] text-base leading-relaxed">
            Evaluate electrical characteristics, overload tolerances, DG synchronization capabilities,
            and efficiency ratings across official EnerTech hardware models.
          </p>
        </div>

        <CompareMatrixView />
      </div>
    </div>
  );
}
