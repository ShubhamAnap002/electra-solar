# Electra Solar — Comprehensive SEO & Search Strategy Plan

## 1. Search Strategy Overview

The Electra Solar search strategy is designed to capture high-intent commercial, industrial, and institutional solar buyers across Pune, Maharashtra, and greater India. Rather than focusing solely on generic consumer keywords like "solar panels", the strategy targets high-value technical inquiries such as "3-phase solar hybrid inverter Pune", "solar PCU with DG synchronization", and "industrial BESS system manufacturer Pune".

---

## 2. Technical SEO Architecture

### 2.1 Metadata & Social Graph
All pages leverage Next.js App Router `generateMetadata` with:
- **Canonical URLs:** Enforced via `metadataBase: new URL("https://electrasolar.in")`.
- **Title Tag Formulation:** `[Primary Entity/Product Name] | Electra Solar - Official EnerTech Distributor`.
- **Meta Description:** 150–160 character engineering summaries highlighting key specs, zero-break transfer, and warranty.
- **Open Graph & Twitter Cards:** Complete `og:title`, `og:description`, `og:image`, and `og:type` tags.

### 2.2 Structured Data (JSON-LD)
Schema.org markup implemented across the site:
- **Organization Schema:** Highlights Electra Solar, official partnership with EnerTech UPS Pvt. Ltd., Pune coordinates, contact numbers, and verified social channels.
- **Product Schema:** Embedded on all `/products/[category]/[slug]` pages with brand attribution, SKU, category, and technical capabilities.
- **BreadcrumbList Schema:** Outlines hierarchical navigation paths for Google site links.
- **FAQPage Schema:** Embedded on `/` and `/about` with collapsible answers formatted for Google rich FAQ snippets.

### 2.3 Automated Crawl Directives
- **XML Sitemap (`/sitemap.xml`):** Generated dynamically by `app/sitemap.ts`, listing all 40+ static pages with change frequencies and priority ratings (1.0 for Homepage, 0.9 for Products, 0.8 for Solutions).
- **Robots.txt (`/robots.txt`):** Allows all legitimate crawlers while referencing the dynamic XML sitemap endpoint.

---

## 3. High-Priority Keyword Clusters

### Cluster A: Industrial & Commercial Solar Inverters
- `three phase solar hybrid inverter Pune`
- `heavy duty industrial solar PCU Maharashtra`
- `solar inverter with 100% phase unbalance`
- `solar power conditioning unit DG synchronization`
- `solar hybrid inverter with zero break changeover`

### Cluster B: Energy Storage & BESS
- `industrial battery energy storage system Pune`
- `containerized BESS Maharashtra`
- `commercial LFP solar battery system`
- `solar microgrid with lithium battery storage`

### Cluster C: Brand & Authorized Distribution
- `EnerTech solar inverter distributor Pune`
- `EnerTech SunMagic inverter dealer Maharashtra`
- `EnerTech UPS official distributor`
- `EnerTech hybrid inverter price and specifications`

### Cluster D: Local Engineering & Installation Services
- `solar EPC company Chakan MIDC`
- `commercial rooftop solar installation Hinjawadi`
- `industrial solar inverter AMC Pune`
- `solar site survey and power audit Maharashtra`
