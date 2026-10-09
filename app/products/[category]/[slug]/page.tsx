import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/data/products";
import { ProductDetailView } from "@/components/products/ProductDetailView";

interface ProductPageProps {
  params: {
    category: string;
    slug: string;
  };
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    category: product.category,
    slug: product.slug,
  }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) {
    return { title: "Product Not Found | Electra Solar" };
  }
  return {
    title: `${product.name} (${product.capacityRange}) | Electra Solar`,
    description: `${product.tagline} Verified specifications, features, and direct distributor quote for ${product.name}.`,
    openGraph: {
      title: `${product.name} | Electra Solar & EnerTech`,
      description: product.tagline,
      images: [product.image],
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) {
    notFound();
  }

  return (
    <div className="py-12 lg:py-16 bg-[#f8fafd] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ProductDetailView product={product} />
      </div>
    </div>
  );
}
