"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ArrowRight, Scale } from "lucide-react";
import { useCompare } from "@/components/compare/CompareContext";

export function FloatingCompareTray() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl bg-white/95 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-3 sm:p-4 text-gray-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        {/* Left: Indicator */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#e6f0fa] text-[#015cbb] flex items-center justify-center border border-[#015cbb]/30">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#222222] flex items-center gap-2">
              <span>Compare Models</span>
              <span className="text-xs bg-[#e6f0fa] border border-[#015cbb]/30 text-[#015cbb] px-2 py-0.5 rounded-full font-mono font-bold">
                {compareList.length} / 4
              </span>
            </div>
            <p className="text-[11px] text-[#5c5c5c] hidden sm:block">Side-by-side technical specs evaluation</p>
          </div>
        </div>

        {/* Center: Selected Products Pill Gallery */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
          {compareList.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 bg-[#f8fafd] border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs flex-shrink-0"
            >
              <div className="w-7 h-7 relative rounded bg-white p-0.5 border border-gray-200">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                  sizes="28px"
                />
              </div>
              <span className="font-semibold text-[#222222] max-w-[110px] truncate">{item.name}</span>
              <button
                type="button"
                onClick={() => removeFromCompare(item.id)}
                className="text-gray-400 hover:text-rose-600 transition-colors p-0.5"
                title="Remove"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={clearCompare}
            className="text-xs font-bold text-[#5c5c5c] hover:text-gray-800 transition-colors px-2 py-1"
          >
            Clear all
          </button>
          <Link
            href="/compare"
            className="bg-[#015cbb] hover:bg-[#004896] text-white px-5 py-2 rounded-full text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
