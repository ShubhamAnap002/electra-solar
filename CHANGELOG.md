# Changelog

All notable changes to the **Electra Solar** website platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-10-09

### Added
- **Foundations & Architecture:**
  - Initialized Next.js 14 App Router project with TypeScript 5.6 and Tailwind CSS 3.4.
  - Implemented global typography resets, custom solar color palette tokens, and smooth scroll behavior.
  - Configured `app/layout.tsx` with global context providers (`CompareContext`, `EnquiryModalContext`) and `metadataBase`.
  - Added XML sitemap generator (`app/sitemap.ts`) supporting 40+ static and dynamic routes.
  - Added crawler configuration (`app/robots.ts`).
  - Added branded 404 error page (`app/not-found.tsx`).
- **Research & Strategy:**
  - Audited live official websites: EnerTech (`enertechups.com`), Deye (`deyeinverter.com`), Luminous (`luminousindia.com`), Cellcronic (`cellcronic.com`), and UTL Solar.
  - Authored comprehensive `WEBSITE_RESEARCH.md` documenting layout patterns, specs, and information architecture.
  - Synthesized full technical documentation suite in `docs/`:
    - `ELECTRA_SOLAR_MASTER_DEVELOPMENT_SPEC.md`
    - `ARCHITECTURE.md`
    - `DATA_DICTIONARY.md`
    - `NEEDS_BUSINESS_INPUT.md`
    - `CONTENT_REQUIREMENTS.md`
    - `SEO_PLAN.md`
    - `ANALYTICS_PLAN.md`
    - `SECURITY_CHECKLIST.md`
    - `QA_CHECKLIST.md`
    - `DEPLOYMENT.md`
    - `DECISIONS.md`
- **Data Models (`lib/data/`):**
  - `products.ts`: 5 categories and 8 verified industrial models (SunMagic 1-Phase, SunMagic 3-Phase, EnerCube BESS, Wall-Mounted HF, LFP Rack Battery, Solar Industrial UPS, High-Current Battery Charger, Industrial Servo Stabilizer).
  - `solutions.ts`: Commercial & Industrial, Residential & Luxury Villas, Hospitals & Critical Care, Rural & Agro Microgrids.
  - `services.ts`: Site Survey & Engineering, Turnkey EPC Installation, AMC & Preventative Maintenance.
  - `projects.ts`: Chakan Automotive (100kVA + 120kWh BESS), Hinjawadi Hospital (40kVA Online UPS), Lonavala Villa (10kVA + 15kWh), Baramati Agro Cold Chain (50kVA + 80kWh).
  - `company.ts`: Verified Pune headquarters, phone lines, email desks, service hubs, and technical FAQs.
- **Hardware Photography & Assets (`public/images/products/`):**
  - Downloaded and verified 8 real hardware renders and branding assets:
    - `sunmagic-1ph.webp`
    - `sunmagic-3ph.webp`
    - `enercube-bess.webp`
    - `wall-mounted-hf.webp`
    - `battery-charger.png`
    - `lfp-battery.webp`
    - `online-ups.webp`
    - `servo-stabilizer.webp`
    - `enertech-partner.png`
    - `hero-bg.jpg`
- **UI Components & Features:**
  - `Header.tsx`: Top trust banner, mega-menu with 5 category dropdowns, comparison tray counter, quote CTA, responsive mobile drawer.
  - `Footer.tsx`: Value pillars, official EnerTech distributor attribution, quick links, Pune office contact, emergency service lines.
  - `ProductCard.tsx`: Deye/Luminous hybrid card with comparison selector, spec badges, and quote trigger.
  - `ProductsCatalogueView.tsx`: Client-side live search, phase filter (Single vs Three Phase), category pill bar, dynamic empty state.
  - `ProductDetailView.tsx`: High-resolution hardware showcase, key metric highlights, subsystem technical spec table, safety protections list, application tags, related products grid.
  - `CompareMatrixView.tsx` & `FloatingCompareTray.tsx`: Up to 4 products side-by-side spec comparison table with difference highlighting.
  - `SolarCalculator.tsx`: Interactive sizing assistant with property selector, bill slider, backup slider, and DG checkbox; calculates recommended kVA, solar kWp, battery kWh, and monthly ₹ savings.
  - `QuoteForm.tsx` & `EnquiryModalContext.tsx`: Universal quote modal with client validation (10-digit Indian mobile) and success state.
  - Homepage sections: `HeroSection.tsx`, `OfficialDistributorSection.tsx`, `FeaturedProductsSection.tsx`, `SolutionsSection.tsx`, `ProjectsSection.tsx`, `FaqSection.tsx`, `CtaSection.tsx`.
- **Quality Assurance & Verification:**
  - Automated test script `scripts/test_pages.py` verified 26 core endpoints with 100% HTTP 200 OK responses.
  - Next.js production build (`npm run build`) completed with 40 static pages and zero errors.
  - Daemon production server running on port 3000.
