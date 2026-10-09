# Electra Solar — System Architecture & Technical Design

## 1. Executive Technical Summary

The Electra Solar web platform is engineered as a modern, high-performance, enterprise-grade web application built on **Next.js 14 (App Router)** with **TypeScript**, **Tailwind CSS**, and **Lucide React**. It is designed to serve as the digital flagship for Electra Solar—the official distributor of EnerTech UPS Pvt. Ltd. (Pune)—delivering instant load times, zero layout shift, deep crawlability, and rich interactive engineering tools.

---

## 2. Technology Stack

| Layer | Technology | Rationale & Selection Criteria |
| :--- | :--- | :--- |
| **Framework** | Next.js 14.2.15 (App Router) | Static Site Generation (SSG) for 40+ product & solution pages; high SEO scores, fast TTFB. |
| **Language** | TypeScript 5.6 | Strict type-safety across electrical specifications, product attributes, and calculator math. |
| **Styling** | Tailwind CSS 3.4 + PostCSS | Utility-first design tokens, responsive breakpoints, zero runtime CSS overhead, accessible color contrast. |
| **Icons** | Lucide React | Clean, scalable SVG icons aligned with industrial and energy UI aesthetics. |
| **Asset Engine** | Local WebP / PNG in `public/` | 100% self-hosted verified product renders, zero reliance on external CDNs or hotlinks. |
| **State Layer** | React Context (`CompareContext`, `EnquiryModalContext`) | Lightweight, zero-dependency client state for cross-page comparison and global quote trigger. |
| **Testing** | Automated Python HTTP & Route Verification Suite (`scripts/test_pages.py`) | Verifies all 40+ endpoints, status 200, static asset resolution, and JSON-LD schema presence. |

---

## 3. Directory & File Structure

```text
solar_website/
├── app/                               # Next.js App Router root
│   ├── layout.tsx                     # Global HTML shell, font declarations, MetadataBase, Context Providers
│   ├── page.tsx                       # Homepage (Hero, Trust Banner, Featured Products, Solutions, Projects, FAQ)
│   ├── globals.css                    # Tailwind CSS directives, typography resets, smooth scrolling
│   ├── sitemap.ts                     # Dynamic XML Sitemap generation for search engines
│   ├── robots.ts                      # Web crawler directives
│   ├── not-found.tsx                  # Branded 404 error page with quick recovery links
│   ├── products/                      # Product Catalogue & Dynamic Routing
│   │   ├── page.tsx                   # Master Catalogue with category filter and search
│   │   ├── [category]/
│   │   │   ├── page.tsx               # Category-level catalogue listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # Product detail page with SSG generateStaticParams
│   ├── compare/                       # Interactive Side-by-Side Product Comparison Matrix
│   ├── calculator/                    # Solar System & Battery Sizing Calculator
│   ├── solutions/                     # Turnkey Industry Solutions (Residential, C&I, Healthcare, Microgrid)
│   ├── services/                      # Engineering Services (Site Survey, Turnkey EPC, AMC)
│   ├── projects/                      # Real Maharashtra / Industrial Case Studies
│   ├── about/                         # Company Heritage & EnerTech Distributor Credentials
│   ├── contact/                       # Multi-channel Pune Headquarters & Service Hubs Contact
│   ├── privacy-policy/                # Compliance & Data Privacy
│   └── terms/                         # Terms of Service & Technical Disclaimers
├── components/                        # Reusable Component Architecture
│   ├── ui/                            # Atomic UI primitives (Button, Badge, Modal, Input)
│   ├── layout/                        # Global Header with Mega-Menu, Top Trust Bar, Responsive Footer
│   ├── products/                      # ProductCard, ProductsCatalogueView, ProductDetailView
│   ├── compare/                       # CompareContext, FloatingCompareTray, CompareMatrixView
│   ├── calculator/                    # SolarCalculator interactive engineering model
│   ├── forms/                         # QuoteForm, EnquiryModalContext, Field validation
│   └── home/                          # HeroSection, OfficialDistributorSection, SolutionsSection, etc.
├── lib/                               # Business Logic & Data Models
│   └── data/                          # Strongly typed catalogs (products.ts, solutions.ts, services.ts, etc.)
├── public/                            # Static media assets
│   └── images/products/               # Verified hardware photography (SunMagic, EnerCube, Batteries)
├── docs/                              # Project specification, checklists, and handover manuals
└── scripts/                           # Automated build validation and route verification scripts
```

---

## 4. Key Architectural Patterns

### 4.1 Static Site Generation (SSG) with `generateStaticParams`
All product detail pages (`/products/[category]/[slug]`), category listings (`/products/[category]`), solution overviews (`/solutions/[slug]`), services (`/services/[slug]`), and case studies (`/projects/[slug]`) are pre-rendered into static HTML at build time. This guarantees sub-100ms response times, zero database downtime risks during traffic surges, and immediate indexing by search spiders.

### 4.2 Decoupled Client State
- **Product Comparison (`CompareContext`):** Allows users to select up to 4 models from any page or category. Selections persist via React state with visual notification in the header badge and a floating quick-access drawer (`FloatingCompareTray`).
- **Global Lead Capture (`EnquiryModalContext`):** Any "Request a Quote", "Speak to an Engineer", or "Order Brochure" button across the website triggers the accessible quote modal pre-filled with the active product or solution context.

### 4.3 Data Model Design
All product data in `lib/data/products.ts` adheres to strict TypeScript interfaces (`Product`, `ElectricalSpecs`, `ProtectionFeature`, etc.). Specs are categorized into clear subsystems:
- Input / PV Generator ratings
- AC Output / Inverter specs
- Battery & Energy Storage parameters
- Physical / Environmental dimensions
- Certifications & Compliance standards (MNRE, CE, IEC, BIS)

---

## 5. Security & Reliability Model

1. **Static First:** Because pages are statically generated, there are zero SQL injection or backend exploitation vectors exposed to the public internet.
2. **Strict Client-Side Validation:** All forms enforce name, email, 10-digit Indian mobile format (`^[6-9]\d{9}$`), and system capacity validation before dispatch.
3. **External Dependencies Minimalized:** No heavy third-party UI libraries or CDNs. All assets and scripts are bundled natively.
4. **Environment Isolation:** Secrets are isolated to server runtimes via `.env.local` and `.env.example`.
