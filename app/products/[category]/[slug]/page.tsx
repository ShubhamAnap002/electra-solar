import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/data/products";
import { getStoredProducts } from "@/lib/store";
import { ProductDetailView } from "@/components/products/ProductDetailView";

interface ProductPageProps {
  params: {
    category: string;
    slug: string;
  };
}

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    category: product.category,
    slug: product.slug,
  }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const products = getStoredProducts();
  const product = products.find((p) => p.slug === params.slug) || PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) {
    return { title: "Product Not Found | Electra Solar" };
  }
  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `https://electrasolar.in${product.image.startsWith("/") ? product.image : "/" + product.image}`;

  return {
    title: `${product.name} (${product.capacityRange}) | Electra Solar`,
    description: `${product.tagline} Industrial-grade specifications and direct factory quotes for ${product.name} manufactured in partnership with EnerTech.`,
    alternates: {
      canonical: `https://electrasolar.in/products/${product.category}/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} (${product.capacityRange}) | Electra Solar`,
      description: product.tagline,
      url: `https://electrasolar.in/products/${product.category}/${product.slug}`,
      siteName: "Electra Solar",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: `${product.name} - ${product.capacityRange}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} (${product.capacityRange}) | Electra Solar`,
      description: product.tagline,
      images: [imageUrl],
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const products = getStoredProducts();
  const product = products.find((p) => p.slug === params.slug) || PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) {
    notFound();
  }

  // Google JSON-LD Structured Data (Product + BreadcrumbList)
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [`https://electrasolar.in${product.image}`],
    description: product.description || product.tagline,
    sku: product.modelCode,
    mpn: product.modelCode,
    brand: {
      "@type": "Brand",
      name: "EnerTech",
    },
    manufacturer: {
      "@type": "Organization",
      name: "EnerTech UPS Pvt. Ltd.",
    },
    category: product.categoryName,
    offers: {
      "@type": "Offer",
      url: `https://electrasolar.in/products/${product.category}/${product.slug}`,
      priceCurrency: "INR",
      price: "0",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Electra Solar",
      },
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
        name: product.categoryName,
        item: `https://electrasolar.in/products/${product.category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `https://electrasolar.in/products/${product.category}/${product.slug}`,
      },
    ],
  };

  return (
    <div className="py-10 lg:py-14 bg-[#f8fafd] min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ProductDetailView product={product} />
      </div>
    </div>
  );
}
