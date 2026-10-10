import React from "react";
import type { Metadata } from "next";
import { ProductsCatalogueView } from "@/components/products/ProductsCatalogueView";
import { getStoredProducts, getStoredCategories } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products Catalogue | Solar Hybrid Inverters & BESS | Electra Solar",
  description:
    "Explore Electra Solar's complete catalogue of EnerTech solar hybrid inverters, C&I BESS, lithium storage packs, and 0ms online UPS systems.",
  alternates: {
    canonical: "https://electrasolar.in/products",
  },
  openGraph: {
    title: "Products Catalogue | Solar Hybrid Inverters & BESS | Electra Solar",
    description:
      "Explore 1kVA to 300kVA hybrid inverters, BESS energy storage, and industrial online UPS systems.",
    url: "https://electrasolar.in/products",
    siteName: "Electra Solar",
    type: "website",
    images: [
      {
        url: "/images/hero/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Electra Solar Complete Product Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products Catalogue | Solar Hybrid Inverters & BESS",
    description:
      "Explore 1kVA to 300kVA hybrid inverters, BESS energy storage, and industrial online UPS systems.",
    images: ["/images/hero/hero-bg.jpg"],
  },
};

export default function ProductsPage() {
  const products = getStoredProducts().filter((p) => p.published !== false);
  const categories = getStoredCategories();

  // Schema.org CollectionPage & BreadcrumbList
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Products Catalogue | Electra Solar",
    description:
      "Complete catalogue of EnerTech solar hybrid inverters, C&I BESS, lithium storage packs, and 0ms online UPS systems.",
    url: "https://electrasolar.in/products",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://electrasolar.in/products/${p.category}/${p.slug}`,
        name: p.name,
      })),
    },
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://electrasolar.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://electrasolar.in/products",
      },
    ],
  };

  return (
    <div className="py-12 lg:py-16 bg-[#f8fafd] min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Page Hero Header - Deye Style */}
        <div className="space-y-3 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ea580c] block">
            Product Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#091e3a] tracking-tight">
            Solar Hybrid Inverters &amp; Energy Systems
          </h1>
          <div className="w-16 h-1 bg-[#ea580c]" />
          <p className="text-[#5c5c5c] text-base leading-relaxed">
            Discover verified solar hybrid inverters from 1 kVA to 300 kVA, modular BESS battery storage,
            and precision power conditioning equipment with manufacturer-backed warranties.
          </p>
        </div>

        {/* Interactive Catalogue */}
        <ProductsCatalogueView initialProducts={products} initialCategories={categories} />
      </div>
    </div>
  );
}
