import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers & Engineering Opportunities | Electra Solar",
  description:
    "Join the clean energy transition with Electra Solar. Explore open careers for solar design engineers, commissioning technicians, and power electronics specialists in Pune.",
  alternates: {
    canonical: "https://electrasolar.in/careers",
  },
  openGraph: {
    title: "Careers & Engineering Opportunities | Electra Solar",
    description:
      "Join our engineering and operations team in Pune. Help build India's next generation of industrial solar hybrid and BESS installations.",
    url: "https://electrasolar.in/careers",
    siteName: "Electra Solar",
    type: "website",
    images: [
      {
        url: "/images/hero/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Careers at Electra Solar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers & Engineering Opportunities | Electra Solar",
    description:
      "Join our engineering and operations team in Pune building C&I solar hybrid and BESS systems.",
    images: ["/images/hero/hero-bg.jpg"],
  },
};

export default function CareersLayout({
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
        name: "Careers",
        item: "https://electrasolar.in/careers",
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
