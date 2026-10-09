# Electra Solar — Data Dictionary & Entity Specifications

## 1. Overview

This document defines the schema, field definitions, data types, and business validation rules for all entities modeled within the Electra Solar platform. All schemas are typed in TypeScript (`lib/data/`) to ensure end-to-end type safety.

---

## 2. Product Entity (`Product`)

Defined in `lib/data/products.ts`. Represents a commercial or industrial power electronics unit supplied by Electra Solar under its EnerTech distribution partnership.

| Field | Type | Description | Example / Allowed Values |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Unique identifier | `"sunmagic-1ph-3kva"` |
| `slug` | `string` | URL-safe slug for routing | `"sunmagic-single-phase-solar-hybrid-inverter"` |
| `name` | `string` | Official product model name | `"SunMagic REeFI 1-Phase Hybrid Inverter"` |
| `series` | `string` | Product series / family name | `"SunMagic Series"` |
| `category` | `string` | Primary functional category | `"solar-hybrid-inverters"`, `"off-grid-pcus"`, `"bess-storage"`, `"industrial-ups"`, `"power-conditioning"` |
| `tagline` | `string` | Short value proposition | `"Heavy-duty DSP hybrid inverter with zero break changeover"` |
| `description` | `string` | Detailed engineering overview | Full markdown / paragraph text |
| `image` | `string` | Local path to hardware render | `"/images/products/sunmagic-1ph.webp"` |
| `phase` | `string` | Electrical AC phase configuration | `"Single Phase (1-Ph)"`, `"Three Phase (3-Ph)"`, `"1-Ph / 3-Ph"` |
| `capacityRange`| `string` | Rated power range in kVA / kW | `"3 kVA – 10 kVA"` |
| `topology` | `string` | Internal power conversion design | `"Transformer-based DSP Bi-Directional Converter"` |
| `keyHighlights`| `string[]` | Top bullet points for quick scan | `["100% Phase Unbalance Capacity", "Zero-Break Changeover < 5ms"]` |
| `specs` | `Object` | Subsystem technical matrix | See Subsystem Specification Matrix below |
| `applications` | `string[]` | Target use cases | `["Residential Rooftops", "Commercial Warehouses", "Hospitals"]` |
| `isFeatured` | `boolean` | Flag for homepage spotlight | `true` or `false` |

### Subsystem Specification Matrix (`specs`)
- **`solarInput`**:
  - `maxPvPower`: Max connected solar array in kWp (e.g. `"12 kWp"`).
  - `mpptVoltageRange`: DC voltage tracking window (e.g. `"180V – 450V DC"`).
  - `maxInputCurrent`: Maximum DC current rating (e.g. `"25 A"`).
- **`acOutput`**:
  - `nominalVoltage`: AC output voltage (e.g. `"230V AC ± 1%"`, `"415V AC ± 1%"`).
  - `frequency`: Operating frequency (`"50 Hz ± 0.5%"`).
  - `waveform`: Output wave purity (`"Pure Sine Wave, THD < 2%"`).
  - `overloadCapacity`: Transient surge handling (e.g. `"150% for 60s, 200% for 5s"`).
  - `changeoverTime`: Transfer duration (e.g. `"< 5ms (Zero Break)"`).
- **`batterySystem`**:
  - `batteryVoltage`: Nominal DC bus voltage (e.g. `"48V DC"`, `"360V DC"`).
  - `batteryChemistry`: Supported battery technologies (`"Lithium-ion (LFP) / Tubular Lead-Acid"`).
  - `chargingEfficiency`: Efficiency percentage (`"95% Peak"`).
- **`physical`**:
  - `dimensions`: Width x Depth x Height (e.g. `"450 x 300 x 600 mm"`).
  - `weight`: Unit net weight (e.g. `"48 kg"`).
  - `operatingTemp`: Permissible ambient range (e.g. `"-10°C to +55°C"`).
  - `ipRating`: Ingress protection classification (`"IP21 / IP54"`).
- **`certifications`**: Array of verified standards (`["CE", "MNRE Approved", "IEC 62109-1/2", "BIS Compliant"]`).

---

## 3. Solution Entity (`Solution`)

Defined in `lib/data/solutions.ts`. Defines turnkey sector offerings tailored for specific Indian business segments.

| Field | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Unique identifier | `"commercial-industrial"` |
| `slug` | `string` | Routing identifier | `"commercial-and-industrial"` |
| `title` | `string` | Display headline | `"Commercial & Industrial Solar Solutions"` |
| `targetAudience`| `string` | Target decision makers | `"Factory owners, warehouse operators, manufacturing units"` |
| `summary` | `string` | 1-2 sentence overview | Value proposition for C&I power stability |
| `typicalCapacity`| `string` | Typical sizing range | `"20 kVA to 300 kVA"` |
| `challengesSolved`| `string[]` | Pain points eliminated | High grid tariffs, DG fuel expenses, motor surge dips |
| `benefits` | `string[]` | Tangible business gains | 60% power cost savings, 100% phase balance handling |
| `recommendedProducts`| `string[]` | Slugs of linked inverters | `["sunmagic-three-phase-solar-hybrid-inverter", "enercube-bess"]` |

---

## 4. Project Case Study Entity (`Project`)

Defined in `lib/data/projects.ts`. Verifiable proof of execution in Maharashtra and western India.

| Field | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Unique identifier | `"chakan-auto-100kva"` |
| `slug` | `string` | Dynamic route segment | `"chakan-auto-components-plant"` |
| `title` | `string` | Case study headline | `"Automotive Components Manufacturing Plant"` |
| `clientType` | `string` | Industry classification | `"Industrial / Manufacturing"` |
| `location` | `string` | City / Industrial Area | `"Chakan MIDC, Pune, Maharashtra"` |
| `capacity` | `string` | Inverter & PV capacity | `"100 kVA Hybrid PCU + 120 kWp Solar"` |
| `batteryStorage` | `string` | Battery configuration | `"120 kWh LFP BESS System"` |
| `annualGeneration`| `string`| Estimated annual yield | `"175,000 kWh / Year"` |
| `completionYear` | `string` | Year of commissioning | `"2025"` |
| `summary` | `string` | Comprehensive background | Detailed operational narrative |

---

## 5. Quote Enquiry Model (`EnquiryPayload`)

Processed by `components/forms/QuoteForm.tsx` and the enquiry notification endpoint.

| Field | Type | Required | Validation Regex / Rule |
| :--- | :--- | :--- | :--- |
| `fullName` | `string` | Yes | Min 3 chars |
| `phone` | `string` | Yes | `^[6-9]\d{9}$` (10-digit Indian mobile) |
| `email` | `string` | Yes | Valid email format RFC 5322 |
| `city` | `string` | Yes | City / Location in India |
| `projectType` | `string` | Yes | Residential, Commercial, Industrial, Hospital, Partner |
| `interestedProduct` | `string` | No | Model name or "General Enquiry" |
| `estimatedLoad` | `string` | No | System kVA or monthly electricity bill |
| `message` | `string` | No | Additional site details or timeline notes |
