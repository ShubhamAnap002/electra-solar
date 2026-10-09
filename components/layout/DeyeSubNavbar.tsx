"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/data/products";

interface DeyeSubNavbarProps {
  activeCategory?: string;
  onSelectCategory?: (id: string) => void;
}

export function DeyeSubNavbar({ activeCategory = "all", onSelectCategory }: DeyeSubNavbarProps) {
  const pathname = usePathname();

  const isProductsPage = pathname.startsWith("/products");

  const navCategories = [
    { id: "all", name: "All Models", href: "/products" },
    ...CATEGORIES.map((c) => ({
      id: c.id,
      name: c.name,
      href: `/products/${c.slug}`,
    })),
  ];

  return (
    <div className="w-full bg-[#18202c] border-y border-gray-800 text-white shadow-inner select-none overflow-hidden sticky top-[68px] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-3 py-2.5 overflow-x-auto scrollbar-none text-xs whitespace-nowrap">
          {/* Products Prefix with Cyan Arrows (Exact Deye Screenshot Replica) */}
          <Link
            href="/products"
            className="font-bold text-white flex items-center gap-1.5 flex-shrink-0 text-xs sm:text-[13px] mr-1 hover:text-[#51b2e3] transition-colors"
          >
            <span>Products</span>
            <span className="text-[#51b2e3] font-mono font-bold tracking-tighter">&gt;&gt;</span>
          </Link>

          {navCategories.map((item, idx) => {
            const isActive = activeCategory === item.id;

            return (
              <React.Fragment key={item.id}>
                {idx > 0 && <span className="text-gray-600 select-none text-[11px]">|</span>}
                {onSelectCategory ? (
                  <button
                    type="button"
                    onClick={() => onSelectCategory(item.id)}
                    className={`font-semibold transition-all px-2.5 py-1 rounded-md text-xs ${
                      isActive
                        ? "text-white bg-[#015cbb] shadow-sm font-bold"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`font-semibold transition-all px-2.5 py-1 rounded-md text-xs ${
                      isActive
                        ? "text-white bg-[#015cbb] shadow-sm font-bold"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
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
