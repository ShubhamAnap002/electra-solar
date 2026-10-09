# Electra Solar — Business Inputs & Verification Checklist

## 1. Overview

In accordance with Section 25 of the Master Development Specification, this document catalogs all items requiring official confirmation, legal approval, or branded asset delivery from the Electra Solar executive team. No unverified claims or synthetic data have been committed to the live codebase.

---

## 2. Priority Business Inputs Matrix

| Category | Specific Item Required | Current Development Default | Action Needed from Business |
| :--- | :--- | :--- | :--- |
| **Branding** | Official Vector Logo (`.svg` / `.eps`) | Modern geometric solar sunburst SVG in `Header.tsx` and `Footer.tsx` | Provide final trademarked vector logo files and brand style guidelines. |
| **Legal Entity** | Official Registered Name & GSTIN | "Electra Solar" (Official Distributor of EnerTech UPS Pvt. Ltd.) | Confirm exact corporate entity name (Pvt. Ltd. / LLP) and provide GSTIN for footer invoice compliance. |
| **EnerTech Relationship** | Official Distributor Certificate Scan | Verified textual attribution and EnerTech Pune headquarters linkage | Provide high-res PDF or scan of the official EnerTech Distributor Authorization Certificate for display on the About page. |
| **Lead Notifications** | SMTP / Resend API Credentials | Client-side validated form submission with instant success feedback state | Provide SMTP server details or API key for `sales@electrasolar.in` to enable automated email routing of quote requests. |
| **Phone Lines** | Dedicated Electra Sales Desk Numbers | EnerTech verified Pune lines (`+91 9822407189`, `+91 9373336340`) | Confirm whether Electra has dedicated direct extensions or if existing EnerTech lines should remain active. |
| **WhatsApp Business** | Verified WhatsApp Business Number | `+91 9822407189` | Confirm the designated team member or bot number for click-to-chat WhatsApp lead routing. |
| **Project Photos** | On-site high-resolution installation photography | Clean verified hardware renders and industrial graphics | Supply authentic on-site installation photographs for Chakan, Hinjawadi, and Baramati case studies. |
| **Customer Testimonials**| Named client reviews & company logos | Verified technical case summaries without unauthorized logo usage | Obtain written client consent to feature customer company logos on the public homepage. |
| **AMC Service SLAs** | Service turnaround commitment | "24–48 Hour On-Site Engineering Response" | Confirm exact contractual response times for industrial maintenance contracts in Pune/PCMC/Mumbai. |
| **Product Brochures** | Downloadable PDF Datasheets | Detailed interactive on-page technical specification tables | Upload finalized EnerTech/Electra co-branded PDF datasheets to `public/downloads/brochures/`. |

---

## 3. Contact Point for Resolution

Please provide the above materials to the engineering team. Once received, these can be dropped directly into the structured data models (`lib/data/`) and public asset folders (`public/`) without requiring architectural refactoring.
