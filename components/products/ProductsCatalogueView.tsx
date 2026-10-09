"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, Filter, RotateCcw } from "lucide-react";
import { PRODUCTS, CATEGORIES, Product, CategoryInfo } from "@/lib/data/products";
import { ProductCard } from "@/components/products/ProductCard";

interface ProductsCatalogueViewProps {
  initialCategory?: string;
  initialProducts?: Product[];
  initialCategories?: CategoryInfo[];
}

export function ProductsCatalogueView({
  initialCategory,
  initialProducts,
  initialCategories,
}: ProductsCatalogueViewProps) {
  const [productsList, setProductsList] = useState<Product[]>(initialProducts || PRODUCTS);
  const categoriesList = initialCategories || CATEGORIES;

  useEffect(() => {
    async function refreshProducts() {
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
    refreshProducts();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "all");
  const [selectedPhase, setSelectedPhase] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
      // Phase filter
      if (selectedPhase !== "all") {
        if (selectedPhase === "1-Phase" && product.phase !== "1-Phase" && product.phase !== "1-Phase & 3-Phase") {
          return false;
        }
        if (selectedPhase === "3-Phase" && product.phase !== "3-Phase" && product.phase !== "1-Phase & 3-Phase") {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSeries = product.series.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesSpecs = product.capacityRange.toLowerCase().includes(query);
        if (!matchesName && !matchesSeries && !matchesDesc && !matchesSpecs) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedPhase, searchQuery]);

  const handleReset = () => {
    setSelectedCategory("all");
    setSelectedPhase("all");
    setSearchQuery("");
  };

  return (
    <div className="space-y-6">
      {/* Deye Signature Dark Sub-Nav Category Strip (Exact Replica from Screenshot) */}
      <div className="bg-[#18202c] text-white rounded-2xl px-5 py-3.5 shadow-md">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none text-xs whitespace-nowrap">
          <span className="font-bold text-white flex items-center gap-1.5 flex-shrink-0 text-sm mr-1">
            <span>Products</span>
            <span className="text-[#51b2e3] font-mono">&gt;&gt;</span>
          </span>

          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`font-semibold transition-colors px-3 py-1.5 rounded-lg ${
              selectedCategory === "all"
                ? "text-white bg-[#015cbb] shadow-sm"
                : "text-gray-300 hover:text-white hover:bg-white/5"
            }`}
          >
            All Products
          </button>

          {categoriesList.map((cat) => (
            <React.Fragment key={cat.id}>
              <span className="text-gray-600 select-none">|</span>
              <button
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`font-semibold transition-colors px-3 py-1.5 rounded-lg ${
                  selectedCategory === cat.id
                    ? "text-white bg-[#015cbb] shadow-sm"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat.name}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Search and Secondary Phase Filter Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input (7 cols) */}
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by model, capacity (e.g. 100kVA, SunMagic, 48V)..."
              className="w-full bg-[#f8fafd] border border-gray-200 rounded-full pl-10 pr-4 py-2.5 text-sm text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#015cbb] focus:ring-1 focus:ring-[#015cbb] transition-colors"
            />
          </div>

          {/* Phase Filter (3 cols) */}
          <div className="md:col-span-3">
            <select
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value)}
              className="w-full bg-[#f8fafd] border border-gray-200 rounded-full px-4 py-2.5 text-sm text-[#222222] focus:outline-none focus:border-[#015cbb] focus:ring-1 focus:ring-[#015cbb] transition-colors font-medium"
            >
              <option value="all">All Electrical Phases</option>
              <option value="1-Phase">Single Phase (230V)</option>
              <option value="3-Phase">Three Phase (415V)</option>
            </select>
          </div>

          {/* Reset Filters (2 cols) */}
          <div className="md:col-span-2 flex items-center justify-end">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-full text-xs font-bold border border-gray-200 text-[#5c5c5c] hover:text-[#015cbb] hover:border-[#015cbb] transition-colors flex items-center gap-1.5 w-full justify-center bg-gray-50 hover:bg-blue-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Count & Feedback */}
      <div className="flex items-center justify-between text-xs text-[#5c5c5c] px-1">
        <div>
          Showing <strong className="text-[#222222]">{filteredProducts.length}</strong> verified models
          {selectedCategory !== "all" && (
            <span> in <span className="text-[#015cbb] font-semibold">{CATEGORIES.find((c) => c.id === selectedCategory)?.name}</span></span>
          )}
        </div>
        <div className="text-[11px] text-gray-400 hidden sm:block">
          Select products to compare specs side-by-side
        </div>
      </div>

      {/* Product Grid - 4 Columns on Desktop as in Deye Reference Screenshot */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#f5f7fa] text-gray-400 flex items-center justify-center mx-auto">
            <Filter className="w-8 h-8 text-[#015cbb]" />
          </div>
          <h3 className="text-xl font-bold text-[#222222]">No Matching Products Found</h3>
          <p className="text-sm text-[#5c5c5c] max-w-md mx-auto">
            We couldn’t find any models matching your exact filters. Try adjusting your search query or reset the filters.
          </p>
          <button
            onClick={handleReset}
            className="bg-[#015cbb] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-sm"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
