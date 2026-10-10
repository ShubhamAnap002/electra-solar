"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS, Product } from "@/lib/data/products";
import { ProductCard } from "@/components/products/ProductCard";

export function FeaturedProductsSection() {
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.products && data.products.length > 0) {
            setProductsList(data.products);
          }
        }
      } catch (e) {
        // Fallback to static
      }
    }
    loadProducts();
  }, []);

  const filteredProducts = productsList.filter((p) => {
    if (filter === "all") return p.isFeatured || p.category === "solar-hybrid-inverters";
    if (filter === "hybrid") return p.category === "solar-hybrid-inverters";
    if (filter === "bess") return p.category === "bess" || p.category === "batteries";
    if (filter === "ups") return p.category === "solar-online-ups" || p.category === "power-conditioning";
    return true;
  });

  return (
    <section className="py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#ea580c] block mb-2">
              Featured Hardware
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Solar Inverters &amp; Power Electronics
            </h2>
            <div className="w-16 h-1 bg-[#ea580c] mt-2 mb-3" />
            <p className="text-gray-600 text-sm max-w-xl">
              Authentic hardware models with verified technical ratings. Heavy surge tolerance and continuous industrial cycling.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#f8fafc] border border-gray-200 p-1.5 rounded-full overflow-x-auto">
            {[
              { id: "all", label: "All Models" },
              { id: "hybrid", label: "Hybrid Inverters" },
              { id: "bess", label: "BESS & Storage" },
              { id: "ups", label: "Industrial UPS" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  filter === tab.id
                    ? "bg-[#091e3a] text-white shadow-xs"
                    : "text-gray-600 hover:text-[#ea580c]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA to Product Catalogue */}
        <div className="mt-14 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#091e3a] hover:bg-[#0c2447] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all"
          >
            <span>Explore Complete Product Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
