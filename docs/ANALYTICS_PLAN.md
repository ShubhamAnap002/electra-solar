# Electra Solar — Analytics & Event Tracking Plan

## 1. Overview

This analytics architecture defines the event measurement protocol for Electra Solar. It connects user interactions across the website to Google Analytics 4 (GA4) and Google Tag Manager (GTM) to track marketing attribution, product interest, calculator engagement, and quote lead generation.

---

## 2. Global Configuration

- **GA4 Measurement ID:** Configured via `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local`.
- **GTM Container ID:** Configured via `NEXT_PUBLIC_GTM_ID`.
- **Privacy & Anonymization:** In accordance with modern data privacy principles, IP addresses are anonymized, and no sensitive PII (passwords or full payment details) is dispatched to analytics endpoints.

---

## 3. Core Measurement Events

### 3.1 Product Discovery Events

| Event Name | Trigger Condition | Parameters Tracked |
| :--- | :--- | :--- |
| `view_item_list` | Master catalogue or category page viewed | `item_list_name`, `category_slug`, `product_count` |
| `select_item` | Product card clicked from catalogue or home | `item_id`, `item_name`, `item_category`, `item_series` |
| `view_item` | Product detail page loaded | `item_id`, `item_name`, `item_category`, `capacity_range`, `phase` |
| `compare_add` | Product added to compare tray | `item_id`, `item_name`, `current_tray_count` |
| `compare_view` | Comparison matrix page loaded | `item_ids_compared` (comma-separated list) |

### 3.2 Engineering Tool & Calculator Events

| Event Name | Trigger Condition | Parameters Tracked |
| :--- | :--- | :--- |
| `calculator_interact` | User modifies bill or backup slider | `parameter_modified`, `new_value` |
| `calculator_complete` | User generates system sizing recommendation | `application_type`, `monthly_bill`, `backup_hours`, `recommended_kva`, `recommended_kwp`, `battery_kwh` |

### 3.3 High-Value Conversion Events (`generate_lead`)

| Event Name | Trigger Condition | Parameters Tracked |
| :--- | :--- | :--- |
| `generate_lead` | Quote modal or contact form submitted | `lead_type` (`quote_request`, `site_survey`, `amc_enquiry`), `product_interest`, `city`, `has_load_estimate` |
| `click_to_call` | User clicks primary or secondary phone link | `phone_number_dialed`, `source_section` |
| `click_to_whatsapp` | User clicks floating or embedded WhatsApp CTA | `source_page`, `prefilled_product` |
| `download_datasheet` | User clicks product brochure or technical PDF | `document_name`, `product_id` |

---

## 4. GTM DataLayer Push Pattern

To trigger events cleanly in client components:
```typescript
if (typeof window !== "undefined" && (window as any).dataLayer) {
  (window as any).dataLayer.push({
    event: "generate_lead",
    lead_type: "quote_request",
    product_interest: productName,
    city: userCity,
  });
}
```
