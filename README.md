# Electra Solar — Official Website & Digital Growth Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Build Status](https://img.shields.io/badge/Build-Passing%20(40%20Pages%20SSG)-success?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/Status-Production%20Ready-green?style=for-the-badge)](#)

> **Electra Solar** is the official distributor and turnkey engineering partner of **EnerTech UPS Pvt. Ltd.** (Pune, founded 1989), delivering heavy-duty solar hybrid inverters, off-grid PCUs, battery energy storage systems (BESS), and power conditioning solutions across Maharashtra and India.

---

## 🌟 Key Features & Innovations

1. **Deye-Inspired Hardware Showcase:**
   - Cinematic dark hero backdrop paired with crisp, clean product cards.
   - High-resolution, self-hosted hardware photography with transparent renders.
   - Comprehensive technical subsystem spec tables (Solar PV input, Inverter AC output, Battery storage parameters, Physical dimensions, Safety protections).

2. **Luminous-Style Customer Discovery:**
   - Intuitive categorization across 5 product families and 4 industry application sectors.
   - Real-time client-side live search and phase filtering (Single Phase vs. Three Phase).

3. **Cellcronic & UTL Industrial Rigor:**
   - Clear technical communication emphasizing heavy-duty capabilities: 100% phase unbalance tolerance, zero-break transfer (< 5ms), DG synchronization, and dual MPPT tracking.

4. **Interactive Multi-Product Comparison Matrix (`/compare`):**
   - Compare up to 4 models side-by-side with difference highlighting.
   - Persistent compare drawer accessible across the entire catalogue.

5. **Solar & Battery Sizing Calculator (`/calculator`):**
   - Dynamic engineering assistant tailored to Indian property types (Home, Commercial, Factory, Hospital).
   - Real-time estimation of recommended inverter kVA, solar array kWp, battery kWh storage, and estimated monthly ₹ electricity bill savings.

6. **Universal Quote & Site Survey Flow:**
   - Accessible modal triggerable from any product or solution CTA.
   - Strict client-side validation (10-digit Indian phone regex, email, city, project scope).
   - Immediate confirmation state with zero external points of failure.

7. **Enterprise SEO & Structured Data:**
   - Automatic dynamic XML sitemap (`/sitemap.xml`) covering all 40+ static routes.
   - Schema.org JSON-LD structured data (`Organization`, `Product`, `FAQPage`, `BreadcrumbList`).
   - Open Graph and Twitter Card social metadata.

---

## 📁 Repository Structure

```text
solar_website/
├── app/                               # Next.js App Router (Pages, Layouts, Metadata)
│   ├── layout.tsx                     # Global HTML layout with providers and metadata
│   ├── page.tsx                       # Flagship Homepage
│   ├── products/                      # Master Catalogue & Dynamic Product Detail SSG
│   ├── compare/                       # Interactive Side-by-Side Comparison Matrix
│   ├── calculator/                    # Solar System & Battery Sizing Assistant
│   ├── solutions/                     # Turnkey Solutions (C&I, Residential, Hospitals, Agro)
│   ├── services/                      # Engineering Services (Site Survey, EPC, AMC)
│   ├── projects/                      # Real Maharashtra Case Studies (Chakan, Hinjawadi, etc.)
│   ├── about/                         # Company Background & 35-yr EnerTech Pedigree
│   ├── contact/                       # Multi-line Pune Sales & Service Contact Hub
│   ├── sitemap.ts                     # Dynamic XML Sitemap Generator
│   ├── robots.ts                      # Search Spider Rules
│   └── not-found.tsx                  # Branded 404 Recovery Screen
├── components/                        # Modular React UI Components
│   ├── ui/                            # Atomic primitives (Button, Badge, Modal, Input)
│   ├── layout/                        # Header with Mega-Menu & Responsive Footer
│   ├── products/                      # ProductCard, CatalogueView, DetailView
│   ├── compare/                       # CompareContext, CompareTray, CompareMatrix
│   ├── calculator/                    # SolarCalculator interactive engineering model
│   ├── forms/                         # QuoteForm, EnquiryModalContext
│   └── home/                          # HeroSection, TrustSection, FeaturedProducts, etc.
├── lib/                               # Data Models & Strongly-Typed Catalogs
│   └── data/                          # products.ts, solutions.ts, services.ts, projects.ts, company.ts
├── public/                            # Static Media Assets
│   └── images/products/               # Verified hardware renders & partner branding
├── docs/                              # Project Documentation & Operation Manuals
│   ├── ELECTRA_SOLAR_MASTER_DEVELOPMENT_SPEC.md
│   ├── ARCHITECTURE.md
│   ├── DATA_DICTIONARY.md
│   ├── NEEDS_BUSINESS_INPUT.md
│   ├── CONTENT_REQUIREMENTS.md
│   ├── SEO_PLAN.md
│   ├── ANALYTICS_PLAN.md
│   ├── SECURITY_CHECKLIST.md
│   ├── QA_CHECKLIST.md
│   ├── DEPLOYMENT.md
│   └── DECISIONS.md
├── scripts/                           # Automated Route & Verification Suite
│   └── test_pages.py                  # Validates 26 core endpoints with HTTP 200
├── CHANGELOG.md                       # Release History
└── README.md                          # Project Manual
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18.x or 20.x+ (Recommended: `node -v >= 18.17.0`)
- npm or yarn

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd solar_website
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```
This pre-renders all 40 static pages with full Static Site Generation (SSG).

### 5. Launch Production Server
```bash
npm run start -- -p 3000
```

### 6. Run Automated Verification Test Suite
Ensure the production server is active on port 3000, then run:
```bash
python scripts/test_pages.py
```
This validates that all 26 core routes return HTTP 200 with zero broken paths.

---

## 📚 Technical Documentation

Complete architectural manuals, operational specifications, and deployment guides are available in the `docs/` folder:
- [Master Development Specification](docs/ELECTRA_SOLAR_MASTER_DEVELOPMENT_SPEC.md)
- [System Architecture](docs/ARCHITECTURE.md)
- [Data Dictionary & Schemas](docs/DATA_DICTIONARY.md)
- [Needs Business Input Checklist](docs/NEEDS_BUSINESS_INPUT.md)
- [Content Guidelines & Tone](docs/CONTENT_REQUIREMENTS.md)
- [SEO & Search Strategy](docs/SEO_PLAN.md)
- [Analytics & GTM Event Plan](docs/ANALYTICS_PLAN.md)
- [Security Hardening Checklist](docs/SECURITY_CHECKLIST.md)
- [Quality Assurance & Test Plan](docs/QA_CHECKLIST.md)
- [Deployment & Hosting Guide](docs/DEPLOYMENT.md)
- [Architectural Decision Records (ADR)](docs/DECISIONS.md)

---

## 🏢 Business Identity & Attribution

- **Brand:** Electra Solar
- **Manufacturing Partner:** EnerTech UPS Pvt. Ltd. (Pune, Maharashtra — Founded 1989)
- **Regional Head Office:** Pune, Maharashtra, India
- **Key Products:** SunMagic Hybrid PCUs (1-Ph & 3-Ph), EnerCube BESS, LFP Lithium Batteries, Industrial Online Solar UPS, Power Conditioning Units.
