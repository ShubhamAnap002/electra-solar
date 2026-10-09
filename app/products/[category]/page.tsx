import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { CATEGORIES } from "@/lib/data/products";
import { ProductsCatalogueView } from "@/components/products/ProductsCatalogueView";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = CATEGORIES.find((c) => c.slug === params.category);
  if (!category) {
    return { title: "Category Not Found | Electra Solar" };
  }
  return {
    title: `${category.name} | Electra Solar & EnerTech Authorized Systems`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = CATEGORIES.find((c) => c.slug === params.category);
  if (!category) {
    notFound();
  }

  return (
    <div className="py-12 lg:py-16 bg-[#f8fafd] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Breadcrumbs - Deye Style */}
        <div className="flex items-center gap-2 text-xs text-[#5c5c5c]">
          <Link href="/" className="hover:text-[#015cbb] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/products" className="hover:text-[#015cbb] transition-colors">
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#015cbb] font-bold">{category.name}</span>
        </div>

        {/* Category Header */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-sm">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#015cbb] block">
              Official Category Portfolio
            </span>

            <h1 className="text-3xl sm:text-4xl font-black text-[#222222] tracking-tight">
              {category.name}
            </h1>

            <div className="w-14 h-1 bg-[#015cbb]" />

            <p className="text-base text-[#5c5c5c] leading-relaxed pt-1">
              {category.description}
            </p>

            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#015cbb] hover:text-[#004896]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to All Categories</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Filtered Catalogue */}
        <ProductsCatalogueView initialCategory={category.slug} />
      </div>
    </div>
  );
}
