"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/lib/data/products";

interface DeyeSubNavbarProps {
  activeCategory?: string;
  onSelectCategory?: (id: string) => void;
}

export function DeyeSubNavbar({ activeCategory = "all", onSelectCategory }: DeyeSubNavbarProps) {
  const pathname = usePathname();

  const navCategories = [
    { id: "all", name: "All Models", href: "/products" },
    ...CATEGORIES.map((c) => ({
      id: c.id,
      name: c.name,
      href: `/products/${c.slug}`,
    })),
  ];

  return (
    <div className="w-full bg-[#f8fafc] border-y border-gray-200 text-gray-700 select-none overflow-hidden sticky top-[68px] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-3 py-2 overflow-x-auto scrollbar-none text-xs whitespace-nowrap">
          {/* Products Prefix with Solar Orange Arrows */}
          <Link
            href="/products"
            className="font-bold text-[#091e3a] flex items-center gap-1.5 flex-shrink-0 text-xs sm:text-[13px] mr-1 hover:text-[#ea580c] transition-colors"
          >
            <span>Products</span>
            <span className="text-[#ea580c] font-mono font-bold tracking-tighter">&gt;&gt;</span>
          </Link>

          {navCategories.map((item, idx) => {
            const isActive = activeCategory === item.id;

            return (
              <React.Fragment key={item.id}>
                {idx > 0 && <span className="text-gray-300 select-none text-[11px]">|</span>}
                {onSelectCategory ? (
                  <button
                    type="button"
                    onClick={() => onSelectCategory(item.id)}
                    className={`font-semibold transition-all px-2.5 py-1 rounded-md text-xs ${
                      isActive
                        ? "text-white bg-[#091e3a] shadow-xs font-bold"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                    }`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`font-semibold transition-all px-2.5 py-1 rounded-md text-xs ${
                      isActive
                        ? "text-white bg-[#091e3a] shadow-xs font-bold"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
