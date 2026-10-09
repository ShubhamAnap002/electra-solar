"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS, Product } from "@/lib/data/products";

interface CompareContextType {
  compareList: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("electra_compare_list");
      if (saved) {
        const ids: string[] = JSON.parse(saved);
        const matching = PRODUCTS.filter((p) => ids.includes(p.id));
        setCompareList(matching);
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  const addToCompare = (product: Product) => {
    if (compareList.length >= 4) {
      alert("You can compare up to 4 products at a time.");
      return;
    }
    if (!compareList.some((p) => p.id === product.id)) {
      const updated = [...compareList, product];
      setCompareList(updated);
      try {
        localStorage.setItem("electra_compare_list", JSON.stringify(updated.map((p) => p.id)));
      } catch (e) {}
    }
  };

  const removeFromCompare = (productId: string) => {
    const updated = compareList.filter((p) => p.id !== productId);
    setCompareList(updated);
    try {
      localStorage.setItem("electra_compare_list", JSON.stringify(updated.map((p) => p.id)));
    } catch (e) {}
  };

  const isInCompare = (productId: string) => {
    return compareList.some((p) => p.id === productId);
  };

  const clearCompare = () => {
    setCompareList([]);
    try {
      localStorage.removeItem("electra_compare_list");
    } catch (e) {}
  };

  return (
    <CompareContext.Provider
      value={{ compareList, addToCompare, removeFromCompare, isInCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
