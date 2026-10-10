import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Turnkey Solar Installations & Project Portfolio | Electra Solar",
  description:
    "Explore our complete gallery of commissioned solar hybrid inverters, BESS energy storage systems, and industrial microgrids across Pune and Maharashtra.",
  alternates: {
    canonical: "https://electrasolar.in/installations",
  },
  openGraph: {
    title: "Turnkey Solar Installations & Project Portfolio | Electra Solar",
    description:
      "Explore commissioned solar hybrid and BESS systems across automotive plants, hospitals, luxury villas, and agro cold chains.",
    url: "https://electrasolar.in/installations",
    siteName: "Electra Solar",
    type: "website",
    images: [
      {
        url: "/images/hero/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Electra Solar Commissioned Installations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Installations & Project Portfolio | Electra Solar",
    description:
      "Explore commissioned solar hybrid and BESS systems across Pune and Maharashtra.",
    images: ["/images/hero/hero-bg.jpg"],
  },
};

export default function InstallationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        name: "Turnkey Installations",
        item: "https://electrasolar.in/installations",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      {children}
    </>
  );
}
