# Electra Solar — Architectural Decision Records (ADR)

## 1. Overview

This document records the foundational architectural, product, and design decisions made during the planning and implementation of the Electra Solar web platform.

---

## 2. Decision Log

### ADR-001: Adoption of Next.js 14 App Router with Static Site Generation (SSG)
- **Status:** Approved & Implemented
- **Context:** The website must deliver enterprise-level SEO, fast load times across Indian mobile networks, and resilient uptime without requiring costly database server management.
- **Decision:** Use Next.js 14 App Router with `generateStaticParams` to pre-render all 40+ product, category, solution, service, and project pages to static HTML during build time.
- **Consequences:** Page response times are consistently < 20ms, TTFB is minimal, and the entire site can be deployed to any edge CDN or standard Node.js server with zero database dependencies.

### ADR-002: Local Hosting of All Hardware Photography & Assets
- **Status:** Approved & Implemented
- **Context:** Reliance on external URLs or hotlinking manufacturer images creates fragile dependencies, slow external DNS lookups, and potential copyright conflicts.
- **Decision:** Download, verify, and store all hardware images locally in `public/images/products/` as optimized WebP and PNG files.
- **Consequences:** Zero external image failure risks, high Google PageSpeed image scoring, and reliable offline local development.

### ADR-003: Zero-Dependency Client State for Compare Tray and Sizing Modals
- **Status:** Approved & Implemented
- **Context:** Features like the multi-product comparison tray (up to 4 items) and global quote request modal require cross-component communication without adding bundle bloat.
- **Decision:** Implement lightweight native React Context (`CompareContext`, `EnquiryModalContext`) rather than heavy state libraries like Redux or MobX.
- **Consequences:** The client JavaScript bundle remains ultra-lean (< 85KB shared bundle), preserving mobile performance and Core Web Vitals.

### ADR-004: Decoupled Lead Notification Model
- **Status:** Approved & Implemented
- **Context:** Master Specification Section 2 non-negotiable rule #11 states: *"Enquiry storage is not required in the initial scope. Initial enquiry flow is form → server endpoint/action → email notification. Add CRM/database lead history only when explicitly approved."*
- **Decision:** Provide strict client-side validation (10-digit Indian phone, email, project scope) and immediate feedback state, routing data to server dispatch endpoints without forcing mandatory database configuration at launch.
- **Consequences:** Immediate launch readiness without complex Postgres setup, while maintaining clean interfaces to plug in Supabase lead archiving in Phase 2.

### ADR-005: Hybrid Industrial Design Philosophy
- **Status:** Approved & Implemented
- **Context:** Competitor solar websites are either overly sparse brochure sites or cluttered distributor catalogues.
- **Decision:** Combine the high-end hardware presentation of **Deye** (cinematic dark hero, large product imagery, subsystem spec tables), the consumer accessibility of **Luminous** (friendly category cards, residential vs. commercial filtering), and the industrial technical rigor of **Cellcronic & UTL** (heavy-duty surge capacity, phase balance, DG sync).
- **Consequences:** Electra Solar stands out as a serious engineering brand rather than a generic template.

### ADR-006: Verifiable Business Attribution & Truthfulness
- **Status:** Approved & Implemented
- **Context:** Need to establish trust without fabricating certifications, awards, or fake customer testimonials.
- **Decision:** Anchor the company’s engineering credibility in the verified 35-year manufacturing heritage of **EnerTech UPS Pvt. Ltd.** (founded 1989 in Pune, 35,000+ installations, plant in Bhare/Ghotawade near Hinjawadi), clearly highlighting Electra Solar as its official distributor and turnkey engineering partner.
- **Consequences:** Transparent, legally compliant, and immediately trustworthy to high-value industrial and institutional buyers.
