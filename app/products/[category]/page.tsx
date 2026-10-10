import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/lib/data/products";
import { getStoredProducts, getStoredCategories } from "@/lib/store";
import { ProductsCatalogueView } from "@/components/products/ProductsCatalogueView";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const categories = getStoredCategories();
  const category = categories.find((c) => c.slug === params.category) || CATEGORIES.find((c) => c.slug === params.category);
  if (!category) {
    return { title: "Category Not Found | Electra Solar" };
  }
  const sampleProduct = PRODUCTS.find((p) => p.category === category.slug);
  const ogImage = sampleProduct
    ? `https://electrasolar.in${sampleProduct.image.startsWith("/") ? sampleProduct.image : "/" + sampleProduct.image}`
    : "https://electrasolar.in/images/hero/hero-bg.jpg";

  return {
    title: `${category.name} | EnerTech Authorized Systems | Electra Solar`,
    description: category.description,
    alternates: {
      canonical: `https://electrasolar.in/products/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} | Electra Solar & EnerTech Authorized Systems`,
      description: category.description,
      url: `https://electrasolar.in/products/${category.slug}`,
      siteName: "Electra Solar",
      images: [
        {
          url: ogImage,
          width: 800,
          height: 800,
          alt: category.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | Electra Solar`,
      description: category.description,
      images: [ogImage],
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categories = getStoredCategories();
  const category = categories.find((c) => c.slug === params.category) || CATEGORIES.find((c) => c.slug === params.category);
  if (!category) {
    notFound();
  }
  const products = getStoredProducts().filter((p) => p.published !== false);
  const categoryProducts = products.filter((p) => p.category === category.slug);

  // Schema.org CollectionPage & BreadcrumbList
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} | Electra Solar`,
    description: category.description,
    url: `https://electrasolar.in/products/${category.slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: categoryProducts.map((p, idx) => ({
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
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `https://electrasolar.in/products/${category.slug}`,
      },
    ],
  };

  return (
    <div className="py-12 lg:py-16 bg-[#f8fafd] min-h-screen">
      {/* Schema.org JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#5c5c5c] flex-wrap">
          <Link href="/" className="hover:text-[#ea580c] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/products" className="hover:text-[#ea580c] transition-colors">
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#ea580c] font-bold">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-sm">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ea580c] block">
              Official Category Portfolio
            </span>

            <h1 className="text-3xl sm:text-4xl font-black text-[#091e3a] tracking-tight">
              {category.name}
            </h1>

            <div className="w-14 h-1 bg-[#ea580c]" />

            <p className="text-base text-[#5c5c5c] leading-relaxed pt-1">
              {category.description}
            </p>

            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ea580c] hover:text-[#c2410c]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to All Categories</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Filtered Catalogue */}
        <ProductsCatalogueView
          initialCategory={category.slug}
          initialProducts={products}
          initialCategories={categories}
        />
      </div>
    </div>
  );
}
