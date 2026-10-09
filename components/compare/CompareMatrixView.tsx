"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Scale, Sparkles, ArrowRight } from "lucide-react";
import { useCompare } from "@/components/compare/CompareContext";
import { PRODUCTS, Product } from "@/lib/data/products";
import { useEnquiryModal } from "@/components/forms/EnquiryModalContext";

export function CompareMatrixView() {
  const { compareList, removeFromCompare, addToCompare, clearCompare } = useCompare();
  const { openEnquiryModal } = useEnquiryModal();

  // If fewer than 4, products available to add
  const availableToAdd = PRODUCTS.filter((p) => !compareList.some((c) => c.id === p.id));

  const comparisonRows = [
    { label: "Rated Capacity", render: (p: Product) => p.capacityRange },
    { label: "Phase Rating", render: (p: Product) => p.phase },
    { label: "Peak Efficiency", render: (p: Product) => p.efficiency },
    { label: "DC Bus Voltage", render: (p: Product) => p.dcBusVoltage },
    { label: "Internal Topology", render: (p: Product) => p.technology },
    { label: "Transfer Time", render: () => "< 5ms (Zero Break Static Transfer)" },
    { label: "Batteryless Operation", render: (p: Product) => p.category === "solar-hybrid-inverters" ? "Supported" : "N/A" },
    { label: "100% Phase Unbalance", render: (p: Product) => p.phase === "3-Phase" ? "Yes (Full Load Tolerance)" : "N/A (1-Phase)" },
    { label: "DG Synchronization", render: (p: Product) => p.category === "solar-hybrid-inverters" ? "Yes (Integrated Governor)" : "Standard" },
    { label: "Warranty", render: (p: Product) => p.warranty },
    { label: "Target Application", render: (p: Product) => p.idealFor },
  ];

  if (compareList.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center space-y-6 max-w-2xl mx-auto shadow-sm">
        <div className="w-16 h-16 rounded-full bg-[#e6f0fa] text-[#015cbb] flex items-center justify-center mx-auto border border-[#015cbb]/30">
          <Scale className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-[#222222] tracking-tight">
            No Products Selected for Comparison
          </h2>
          <p className="text-[#5c5c5c] text-sm">
            Select 2 or more products from the catalogue to compare capacities, topologies, efficiency, and features side by side.
          </p>
        </div>

        <div className="pt-2">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Quick Add Popular Models:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {PRODUCTS.slice(0, 3).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => addToCompare(p)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f8fafd] border border-gray-200 text-xs font-bold text-[#5c5c5c] hover:text-[#015cbb] hover:border-[#015cbb] transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-[#015cbb]" />
                <span>{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#015cbb] hover:bg-[#004896] text-white px-7 py-3 rounded-full font-bold text-sm shadow-md transition-all"
          >
            <span>Browse All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-[#222222]">Comparing {compareList.length} of 4 Systems</span>
          {compareList.length < 4 && availableToAdd.length > 0 && (
            <select
              onChange={(e) => {
                const found = PRODUCTS.find((p) => p.id === e.target.value);
                if (found) addToCompare(found);
                e.target.value = "";
              }}
              defaultValue=""
              className="bg-[#f8fafd] border border-gray-200 rounded-full px-3.5 py-1.5 text-xs text-[#222222] focus:outline-none focus:border-[#015cbb]"
            >
              <option value="" disabled>+ Add Another Product...</option>
              {availableToAdd.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.capacityRange})
                </option>
              ))}
            </select>
          )}
        </div>

        <button
          type="button"
          onClick={clearCompare}
          className="text-xs font-bold text-gray-400 hover:text-rose-600 transition-colors self-end sm:self-auto"
        >
          Clear Comparison
        </button>
      </div>

      {/* Comparison Table / Matrix - Deye Clean Striped Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-200 bg-[#f8fafd]">
              <th className="p-5 text-xs font-bold text-[#5c5c5c] uppercase tracking-wider w-48 sticky left-0 bg-[#f8fafd] z-10 border-r border-gray-200">
                System Specification
              </th>
              {compareList.map((p) => (
                <th key={p.id} className="p-5 w-64 align-top">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-mono font-bold text-[#015cbb] bg-[#e6f0fa] px-2 py-0.5 rounded border border-[#015cbb]/20">
                        {p.modelCode}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCompare(p.id)}
                        className="text-gray-400 hover:text-rose-600 transition-colors"
                        title="Remove product"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="relative w-full h-32 bg-white rounded-lg p-2 border border-gray-100 flex items-center justify-center">
                      <Image src={p.image} alt={p.name} fill className="object-contain" sizes="200px" />
                    </div>

                    <h4 className="text-sm font-bold text-[#222222] line-clamp-2">{p.name}</h4>

                    <button
                      onClick={() => openEnquiryModal({
                        productName: p.name,
                        source: `Compare Matrix: ${p.name}`,
                      })}
                      className="w-full bg-[#015cbb] hover:bg-[#004896] text-white py-2 rounded-full text-xs font-bold transition-colors shadow-sm"
                    >
                      Get Quote
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
            {comparisonRows.map((row, idx) => (
              <tr
                key={idx}
                className={`transition-colors ${idx % 2 === 0 ? "bg-[#f8fafd]/60" : "bg-white"}`}
              >
                <td className="p-4 sm:p-5 font-bold text-[#222222] sticky left-0 bg-inherit z-10 border-r border-gray-200">
                  {row.label}
                </td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-4 sm:p-5 text-[#444444] font-medium font-mono text-xs">
                    {row.render(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
