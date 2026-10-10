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
  }, [productsList, selectedCategory, selectedPhase, searchQuery]);

  const handleReset = () => {
    setSelectedCategory("all");
    setSelectedPhase("all");
    setSearchQuery("");
  };

  return (
    <div className="space-y-6">
      {/* Clean Light Theme Category Filter Strip */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-2.5 sm:p-3 shadow-xs">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none text-xs whitespace-nowrap">
          <span className="font-bold text-[#091e3a] flex items-center gap-1.5 flex-shrink-0 text-xs uppercase tracking-wider mr-2 pl-2">
            Categories:
          </span>

          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`font-semibold transition-all px-3.5 py-1.5 rounded-xl text-xs ${
              selectedCategory === "all"
                ? "text-white bg-[#091e3a] shadow-xs"
                : "text-gray-600 hover:text-[#091e3a] hover:bg-gray-100"
            }`}
          >
            All Products
          </button>

          {categoriesList.map((cat) => (
            <React.Fragment key={cat.id}>
              <button
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`font-semibold transition-all px-3.5 py-1.5 rounded-xl text-xs ${
                  selectedCategory === cat.id
                    ? "text-white bg-[#091e3a] shadow-xs"
                    : "text-gray-600 hover:text-[#091e3a] hover:bg-gray-100"
                }`}
              >
                {cat.name}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Search and Secondary Phase Filter Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input (7 cols) */}
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by model, series, or capacity..."
              className="w-full bg-[#f8fafc] border border-gray-200 rounded-full pl-10 pr-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-colors"
            />
          </div>

          {/* Phase Filter (3 cols) */}
          <div className="md:col-span-3">
            <select
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value)}
              className="w-full bg-[#f8fafc] border border-gray-200 rounded-full px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-colors font-medium"
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
              className="px-4 py-2.5 rounded-full text-xs font-bold border border-gray-200 text-gray-600 hover:text-[#ea580c] hover:border-orange-200 transition-colors flex items-center gap-1.5 w-full justify-center bg-gray-50 hover:bg-orange-50/50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Count & Feedback */}
      <div className="flex items-center justify-between text-xs text-gray-500 px-1">
        <div>
          Showing <strong className="text-gray-900">{filteredProducts.length}</strong> verified models
          {selectedCategory !== "all" && (
            <span> in <span className="text-[#ea580c] font-semibold">{CATEGORIES.find((c) => c.id === selectedCategory)?.name}</span></span>
          )}
        </div>
        <div className="text-[11px] text-gray-400 hidden sm:block">
          EnerTech certified industrial hardware
        </div>
      </div>

      {/* Product Grid - 4 Columns on Desktop */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
            <Filter className="w-8 h-8 text-[#ea580c]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No Matching Products Found</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            We couldn’t find any models matching your exact filters. Try adjusting your search query or reset the filters.
          </p>
          <button
            onClick={handleReset}
            className="bg-[#091e3a] hover:bg-[#ea580c] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-sm transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
