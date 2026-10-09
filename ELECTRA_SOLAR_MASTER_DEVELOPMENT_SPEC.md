# ELECTRA SOLAR
## Master Website & Digital Growth Platform — Development Specification
**Version:** 1.0  
**Prepared:** 9 October 2026  
**Purpose:** Single source of truth for planning, building, testing, launching, and maintaining the Electra Solar website with Claude Code.

---

## 0. Executive Summary

Electra Solar needs a premium, highly functional website that positions the business as a complete solar and power-solutions provider—not merely a product reseller. Electra Solar is the official distributor of EnerTech and also provides installation and related services. Its real installation portfolio, project photos/videos, technical knowledge, local support, and product expertise should be central proof points.

The website must do more than look attractive. It should help customers understand solutions, discover and compare products, review real projects, find services, trust the company, and submit qualified enquiries. It must be built with a scalable content system so staff can update products, projects, partners, pages, resources, and homepage sections without editing code.

A second strategic opportunity is to use Electra as a proof of concept for a potential **EnerTech Distributor Growth Network**: standardized but customizable distributor websites, shared/approved EnerTech product data, local SEO, ads/landing pages, enquiry automation, lead routing, analytics, distributor recruitment, and repeat-business workflows. This network is a future phase and must not be represented as an already-approved EnerTech initiative.

**Primary north star:** Make Electra Solar one of the easiest, most trustworthy, and technically clear places for customers to understand, compare, select, and enquire about solar/power solutions.

**Business outcomes to optimize for:**
1. More qualified product and solution enquiries.
2. Better conversion from visit → product/solution → enquiry.
3. Greater visibility for local, product, application, and service searches.
4. Stronger trust through real projects, verified product data, and the official EnerTech distributor relationship.
5. Faster publishing and updating through a custom CMS.
6. A reusable foundation for future distributor digital services.

## 1. Business Context and Positioning

### 1.1 Electra Solar positioning
Position Electra Solar as a **solar and power-solutions company offering product supply, installation, commissioning, and related services where confirmed**. Do not present Electra as only a reseller or as an official manufacturer unless that is factually approved.

### 1.2 EnerTech relationship
The official distributor relationship with EnerTech is a major trust signal. Show it prominently and accurately, with wording and logos approved by the business. Do not invent other authorizations, certifications, territories, service commitments, or exclusivity.

### 1.3 Proof-based differentiation
Electra has real installation/project data, photos, videos, and related materials. Use these as a major differentiator:
- Show real projects and installation contexts.
- Connect projects to products, applications, and services.
- Include project details only where approved and verified.
- Do not expose confidential customer data without permission.
- Do not fabricate testimonials, customer names, savings, performance, project capacities, or outcomes.

### 1.4 Audience groups
Design around these audience groups; validate the final list with the business:
- Homeowners / residential buyers.
- Commercial and industrial buyers.
- Hospitals, offices, factories, data centres, and other critical-power users where relevant.
- EPCs, installers, consultants, contractors, and channel partners.
- Existing customers seeking service, replacement, expansion, or upgrades.
- Buyers researching specific products or model numbers.
- Potential partners and future distributor/channel opportunities, if approved.

### 1.5 Core customer questions
The website should answer:
- Which solution/product category fits my application?
- What does Electra supply and install?
- What is the difference between the available options?
- What specifications are verified?
- Has Electra handled similar installations?
- What documentation can I download?
- Can I speak to an expert or request a quote?
- Does Electra support my city/region?
- How do I request a site survey or service?

## 2. Product Principles and Non-Negotiable Rules

1. **Build in phases.** Do not ask Claude Code to implement the whole system blindly in one pass.
2. **Homepage is the flagship page.** Treat it as a product, not a generic template.
3. **Original design, not a clone.** Competitor sites may inform patterns, but do not copy proprietary layout, text, images, or branding.
4. **Verified facts only.** Never invent technical specs, certifications, warranties, reviews, customers, partner relationships, prices, savings, or performance claims.
5. **Data-driven content.** Product/project/partner content must come from a structured data model and CMS wherever appropriate.
6. **SEO-ready HTML.** Important product specifications and explanations must be indexable HTML, not only buried in PDFs or images.
7. **Mobile-first.** No essential functionality or information should be desktop-only.
8. **Accessibility is a requirement.** Keyboard access, contrast, labels, focus states, reduced motion, semantic structure.
9. **Performance matters.** Avoid excessive client JavaScript, unoptimized media, and unnecessary animation.
10. **Security first.** Secrets server-side, role-based admin access, validation, rate limiting, safe uploads, database row-level security.
11. **Enquiry storage is not required in the initial scope.** Initial enquiry flow is form → server endpoint/action → email notification. Add CRM/database lead history only when explicitly approved.
12. **No false claims about AI/SEO.** Structured data and AI-friendly content do not guarantee rankings or AI citations.
13. **Keep the system maintainable.** Reusable components, documented decisions, tests, migrations, and a clear gap audit.
14. **Content must be editable by non-developers.** Staff should be able to update core website content through admin tools.
15. **Do not invent missing business facts.** Create a “Needs Business Input” list and use clearly marked draft placeholders only in development.

## 3. Design Direction and Visual System

### 3.1 Desired aesthetic
Premium, colorful industrial technology:
- Confident and modern, not generic corporate.
- Colorful and energetic while still credible for industrial/solar buyers.
- Clean information hierarchy, generous spacing, strong typography.
- Real product and installation imagery.
- Controlled gradients, glows, depth, and motion—not effects everywhere.
- Strong contrast and clear calls to action.
- A mix of bright, airy product sections and cinematic, dark hero/feature sections.

### 3.2 Suggested palette direction
Treat these as starting tokens to test against actual Electra branding; do not assume official brand colors without confirmation:
- Deep navy/charcoal: trust, hero/footer, technical content.
- Electric blue: UPS/power/technical elements.
- Energetic green: primary action/sustainability.
- Solar yellow/orange: solar category accents and highlights.
- White/off-white: product catalogue, documentation, readability.
- Optional violet/teal accents for selected service/data sections, used sparingly.

Use colors semantically and consistently. Avoid turning every section into a different unrelated color theme. Confirm official logos and brand constraints before finalizing tokens.

### 3.3 Motion and interaction
Potential effects:
- Subtle scroll reveals.
- Hover elevation and image zoom on cards.
- Animated counters only for verified metrics.
- Product image/feature transitions.
- Interactive solution selector.
- Smooth, restrained section transitions.
- Reduced-motion support and no motion that blocks access to content.
- No autoplay audio; avoid heavy video backgrounds on mobile.

### 3.4 Reference strategy
The user likes strong product presentation similar in spirit to Deye-style product pages and modern, colorful technology websites. Benchmark Deye, Luminous, UTL, Statcon, Servotech, Cellcronic, and relevant design galleries for patterns such as product discovery, cards, navigation, imagery, and specs. Use them as references, not templates to copy. Prefer official Electra/EnerTech assets and verified project media over generic stock.

### 3.5 Design-system tokens and components
Define and document:
- Colors and semantic roles.
- Typography scale and font loading strategy.
- Spacing scale.
- Border radii, borders, shadows.
- Container widths and breakpoints.
- Motion durations/easing.
- Z-index layers.
- Focus rings and disabled states.

Reusable components should include:
Button, Input, Select, Textarea, Checkbox, Radio, Modal, Drawer, Tabs, Accordion, Badge, Card, ProductCard, ProjectCard, PartnerLogo, SpecTable, DataTable, Breadcrumbs, SearchBox, FilterBar, Pagination, Toast, Skeleton, EmptyState, ErrorState, CTASection, Header, Footer, MobileMenu, DownloadCard, FAQList, FormField, ConsentControl, and AdminPageShell.

## 4. Information Architecture and Navigation

### 4.1 Main navigation
- Home
- Products
- Solutions
- Services
- Projects / Installations
- Partners
- Knowledge Center
- Resources / Downloads
- About
- Contact
- Primary CTA: Request a Quote
- Secondary CTA where appropriate: Book a Site Survey

Header requirements:
- Clear desktop navigation with useful dropdowns/mega-menu where warranted.
- Mobile menu with keyboard support.
- Product search/model search.
- High-visibility CTA.
- Optional phone/WhatsApp links only after contact details are verified.
- Sticky header only if it does not consume too much mobile viewport.

### 4.2 Suggested URL architecture
- `/`
- `/products/`
- `/products/[category]/`
- `/products/[category]/[slug]/`
- `/solutions/`
- `/solutions/[slug]/`
- `/services/`
- `/services/[slug]/`
- `/projects/`
- `/projects/[slug]/`
- `/partners/`
- `/partners/[slug]/`
- `/knowledge/`
- `/knowledge/[slug]/`
- `/resources/`
- `/resources/[slug]/`
- `/locations/[city-or-region]/` only for real, useful service-area content
- `/about/`
- `/contact/`
- `/request-a-quote/`
- `/book-site-survey/`
- `/privacy-policy/`
- `/terms/` where applicable
- `/admin/` (protected)

Keep slugs stable. Use redirects when slugs change. Avoid creating hundreds of thin, duplicate location pages.

## 5. Homepage — Highest Priority

The homepage is the most important page in the system. It should combine discovery, trust, education, proof, and conversion. It must be colorful and modern without sacrificing technical credibility.

### 5.1 Recommended section order
1. Optional announcement/trust strip (only current, verified message).
2. Header/navigation.
3. Hero: concise value proposition, real solar/power installation or product imagery, primary CTA “Request a Quote”, secondary CTA “Explore Products” or “Find My Solution”.
4. Trust microcopy: official EnerTech distributor relationship and confirmed service capabilities.
5. Solution discovery cards.
6. Product category discovery.
7. “Find My Solution” guided pathway.
8. Featured products.
9. Why Electra / capability proof.
10. Official EnerTech relationship, explained contextually—not just a logo.
11. Featured real projects/installations.
12. Services: consultation, supply, installation, commissioning, support only as verified.
13. Industries/applications.
14. Partners/ecosystem.
15. Knowledge/resources and helpful guides.
16. Videos/project stories.
17. Testimonials only if genuine and approved.
18. Service-area/location information.
19. FAQ / answer-first content.
20. Final high-conversion CTA.
21. Complete footer.

Not every section needs equal visual weight. Use section rhythm: dark cinematic hero, light product cards, tinted solution area, project photography, clean proof section, strong CTA, dark footer.

### 5.2 Hero requirements
- One main message and one clear supporting sentence.
- Strong real image or carefully art-directed product/installation composition.
- CTA 1: Request a Quote / Talk to an Expert.
- CTA 2: Explore Products / Find My Solution.
- Optional Book a Site Survey if operationally supported.
- No 5–6 competing buttons.
- Mobile crop must retain the key product/subject.
- Hero should load quickly and avoid layout shift.
- Do not claim “No. 1”, “best”, exact customer counts, years, or service coverage unless verified.

### 5.3 Find My Solution flow
Collect only what is useful:
- Application/industry.
- Approximate load or capacity, if known.
- Grid availability/condition where relevant.
- Backup-duration requirement.
- Battery requirement/type if known.
- City/region.
- Timeline.
- Optional contact details after explaining next step.

Return a relevant category or next-step guidance, not a falsely precise engineering design. Display assumptions and ask a qualified technical person to validate final sizing. Provide a clear CTA to speak to an expert.

### 5.4 Homepage CMS controls
Every major homepage section should support:
- Enable/disable.
- Heading/subheading/body.
- CTA labels and URLs.
- Select featured products/projects/partners/services.
- Upload/replace media.
- Alt text and captions.
- Reorder where sensible.
- Draft/preview/publish.
- Scheduled visibility if feasible.
- Section-level analytics identifier.
- SEO metadata for the page.
- Audit history.

## 6. Products Catalogue and Detail Pages

### 6.1 Product category possibilities
Only include categories supported by the actual catalogue. Potential categories discussed:
- Online UPS.
- Solar hybrid inverters.
- Lithium and lead-acid batteries.
- Power conditioners.
- Battery chargers.
- Energy storage / BESS.
- Other verified EnerTech/Electra products.

Do not create a category or model based solely on a competitor's catalogue.

### 6.2 Product listing features
- Search by product name/model number.
- Category navigation.
- Filters based on actual data: capacity, phase, technology, application, battery compatibility, etc.
- Sorting.
- Pagination or efficient loading for large catalogues.
- Compare 2–4 products where specs are normalized.
- Product cards with image, model/name, category, capacity/rating, 2–4 key verified specs, applications, View Product, Download Datasheet, Get Quote.
- Useful no-results state with alternative categories/contact CTA.
- Mobile filter drawer and usable comparison layout.

### 6.3 Product detail page template
1. Breadcrumb.
2. Product title/model.
3. One-sentence value proposition.
4. Product gallery/video.
5. Primary CTA: Get a Quote.
6. Download Datasheet/Manual, when available.
7. Key specs.
8. Features and benefits.
9. Applications.
10. Full technical specifications.
11. Protection/safety features only when verified.
12. Connectivity/monitoring only when verified.
13. Compatibility and installation notes only when verified.
14. Downloads/document list.
15. FAQs.
16. Related projects/installations.
17. Related services.
18. Related products.
19. Final CTA.

Important specifications should be visible in crawlable HTML. PDFs supplement, not replace, product-page content.

### 6.4 Comparison tool
- Compare 2–4 products.
- Only compare compatible/meaningful fields.
- Normalize units and terminology.
- Show “Not provided” or “Not applicable” instead of guessing.
- Explain meaningful differences without inventing superiority.
- Link to official datasheets.
- Provide expert-review CTA.
- Make comparison usable on mobile.

### 6.5 Product data lifecycle
Create → validate specs against official documents → add media → attach downloads → connect applications/projects → add FAQs → SEO review → publish → monitor → update/archive. Track source and review date for technical data.

## 7. Solutions, Applications, and Services

### 7.1 Solution pages
Each page should answer:
- Who is this for?
- What problem is being solved?
- What solution architecture may be relevant?
- Which products may apply?
- What services are available?
- What real projects demonstrate experience?
- What are the important limitations/assumptions?
- What should the customer do next?

Potential applications: residential, commercial, industrial, critical power/backup, remote/off-grid, energy storage/BESS, and other confirmed Electra applications.

### 7.2 Service pages
Potential services, only where offered:
- Consultation.
- Site survey.
- System design/engineering.
- Product supply.
- Installation.
- Commissioning.
- Testing.
- Monitoring/setup.
- Maintenance/service.
- Troubleshooting.
- Warranty coordination.
- Upgrade/expansion.

Service page template: outcome → process → what is included → customer requirements → verified timelines → service area → proof/projects → FAQs → CTA.

## 8. Projects and Installation Showcase

Projects are a first-class content type and a major differentiator.

### 8.1 Project fields
- Title and slug.
- Location (publicly safe/approved level of detail).
- Customer/application type.
- System capacity and technical details where verified.
- Products installed.
- Installation date.
- Challenge/problem.
- Solution implemented.
- Description.
- Installation photos and final system photos.
- Videos and captions/transcripts.
- Documents if publishable.
- Results/benefits only where measured and approved.
- Maintenance/support details where relevant.
- Related products, services, and solutions.
- Customer permission/confidentiality status.
- CTA.

### 8.2 Project page UX
- Strong photo gallery.
- Project overview and application.
- Challenge → approach → delivered solution.
- Product links.
- Related services.
- Location context.
- Clear quote/contact CTA.
- Related projects.

Do not expose confidential client names, equipment layouts, site details, or documents without approval. Never fabricate ROI or performance numbers.

## 9. Partners and Manufacturer Relationships

Partners should be a proper content module, not only a logo wall.

### 9.1 Categories
- Product/manufacturer partners.
- Official distributor relationships.
- Technology partners.
- Installation/service partners.
- Battery/BESS partners.
- EPC/channel partners.
- Industry associations/certifications only if real and current.

### 9.2 Partner fields
- Name.
- Logo and brand guidelines.
- Category.
- Verified relationship label.
- Description.
- Official website.
- Related products.
- Related projects.
- Related solutions.
- Approved public claims.
- Publication status.
- Last verification date.

Only display labels like “Official Distributor”, “Authorized Partner”, or “Technology Partner” when documented and approved. Electra's EnerTech official-distributor relationship should receive contextual prominence over an ordinary partner logo.

### 9.3 Partner UI
- Curated homepage partner block.
- Partner directory and categories.
- Individual partner pages only where useful.
- Connect partner → product → project → solution.
- Do not imply endorsement or exclusivity without permission.

## 10. Knowledge Center, Resources, and Content

### 10.1 Content types
- How-to guides.
- Technical explainers.
- FAQs.
- Glossary.
- Troubleshooting.
- Product comparisons.
- Application guides.
- Installation guides.
- Maintenance guides.
- Buyer guides.
- Case studies.
- Videos and transcripts.
- Downloadable brochures, datasheets, manuals, and certificates.

### 10.2 Answer-first content format
- Direct answer at the top.
- Clear headings.
- Concise explanation.
- Tables/lists where helpful.
- Technical caveats and assumptions.
- Links to related products, projects, and services.
- Author/reviewer where appropriate.
- Review/update date for technical content.
- References to official documents where appropriate.

AEO/GEO means making content clear, reliable, structured, and useful to search/answer systems—not attempting to trick them. No schema guarantees rankings or AI citations.

## 11. Search, Calculators, and Guided Tools

### 11.1 Site search
Search across:
- Products and model numbers.
- Categories.
- FAQs.
- Projects.
- Resources/articles.
- Services and solutions.
- Partners.

Include autocomplete where useful, keyboard support, useful empty states, typo tolerance only if feasible, and a search analytics event that avoids collecting unnecessary personal data.

### 11.2 Potential calculators
Build only when business/technical inputs and validation are available:
- Solar system size estimator.
- Inverter sizing assistant.
- Battery sizing assistant.
- ROI/savings estimator with transparent assumptions.

Every tool must clearly label estimates, assumptions, and limitations. Final sizing and engineering decisions require expert validation. Do not present estimates as certified design or guaranteed savings.

## 12. Enquiry, Email, and Conversion System

### 12.1 Initial scope
Enquiry storage in a database/CRM is **not required initially**. Use:
Website form → server-side route/action → validation/spam controls → email provider → internal team inbox; optionally send customer confirmation. Do not expose provider credentials in the browser.

### 12.2 Enquiry form fields
- Name.
- Company (optional where appropriate).
- Mobile.
- Email.
- City/region.
- Product/solution.
- Required capacity.
- Application.
- Quantity.
- Expected timeline.
- Message.
- Optional file upload.
- Consent/privacy acknowledgement.

Make fields conditional where appropriate, but keep forms short enough to complete.

### 12.3 Email notification format
Subject: `NEW ENQUIRY — ELECTRA SOLAR`
Include:
- Customer name/company.
- Phone/email.
- Location.
- Product/solution.
- Capacity/application/quantity.
- Message.
- Source/landing page.
- Submission timestamp.
- Lead identifier if one is generated.
- Uploaded file link only if upload security is implemented.

Customer confirmation should confirm receipt without promising response times unless approved.

### 12.4 Conversion actions
- Request a Quote.
- Talk to an Expert.
- Book a Site Survey.
- Call.
- WhatsApp.
- Email.
- Download Datasheet.
- Ask about this Product.

Track conversions and errors. Add consent and privacy notice appropriate to the form.

### 12.5 Email service
Use a maintained email provider or configured SMTP (e.g. Resend/SMTP after selection). Configure verified sender domain, SPF/DKIM/DMARC as applicable, deliverability monitoring, failure logging, and retry behavior where suitable. Never hardcode secrets.

## 13. Custom CMS / Admin Panel

The CMS should deliver WordPress-like content control while matching the custom website architecture.

### 13.1 Admin modules
- Dashboard.
- Products.
- Product categories.
- Product specs.
- Product media.
- Product documents.
- Solutions.
- Services.
- Projects.
- Partners.
- FAQs.
- Knowledge articles.
- Pages.
- Homepage sections.
- Menus/navigation.
- Media library.
- Downloads/resources.
- SEO metadata.
- Redirects.
- Website settings.
- Analytics summary/links.
- Users and roles.
- Audit logs.
- Publishing workflow.

### 13.2 Roles
- Super Admin.
- Marketing.
- Sales.
- Editor.
- Viewer.

Define exact permissions before launch. Use least privilege. Sales should not automatically gain permission to change site-wide settings.

### 13.3 Publishing workflow
- Draft.
- Preview.
- Publish.
- Schedule (if implemented).
- Unpublish.
- Archive.
- Revision history/version tracking.
- Audit trail.

### 13.4 CMS requirements
- Search/filter tables.
- Clear validation errors.
- Confirmation for destructive actions.
- Unsaved-changes warning.
- Upload progress and file validation.
- Draft preview.
- Safe slug generation and collision handling.
- SEO fields.
- Alt text requirement for meaningful images.
- No hidden reliance on developer-only workflows for routine content updates.

## 14. Recommended Technical Architecture

### 14.1 Preferred stack if starting from zero
- **Next.js App Router + TypeScript** for public website and admin UI.
- **Supabase PostgreSQL** for structured content/data.
- **Supabase Storage** for images, PDFs, brochures, manuals, certificates, and project media.
- **Supabase Auth** for protected admin access.
- **Row Level Security (RLS)** and server-side authorization.
- **Vercel** for hosting/deployment.
- **Cloudflare** for DNS/CDN/security where appropriate.
- **GitHub** for source control and pull-request/change history.
- **GA4 + Google Tag Manager + Google Search Console** for analytics/search visibility.
- **Email provider such as Resend or SMTP** for enquiry notifications.
- **Claude Code** as primary implementation/debugging/maintenance tool.
- Cursor can be used as a secondary coding workflow if desired.

Use official Next.js Metadata APIs for titles, descriptions, canonical/social metadata, robots/sitemap files, and dynamic page metadata. Follow the current official Supabase Next.js/SSR guidance for server/browser clients, secure auth sessions, and RLS.

### 14.2 Architecture principles
- Claude Code writes and maintains the app; it is not the runtime email or analytics provider.
- Next.js serves pages and handles server-side actions/routes.
- Supabase stores content and files.
- Email provider sends notifications.
- Google services collect analytics/search data.
- Keep service-role secrets server-side only.
- Avoid overengineering before the core public site and CMS are useful.
- Use migrations for database schema changes.
- Make environments explicit: local, preview/staging, production.

### 14.3 Suggested repository layout
```text
app/
  (site)/
  (admin)/
  api/
components/
  ui/
  layout/
  marketing/
  products/
  solutions/
  services/
  projects/
  partners/
  forms/
  search/
  admin/
lib/
  supabase/
  auth/
  seo/
  analytics/
  email/
  search/
  validation/
  security/
  utils/
types/
db/
supabase/
  migrations/
public/
content/
docs/
  ELECTRA_SOLAR_MASTER_DEVELOPMENT_SPEC.md
  ARCHITECTURE.md
  DATA_DICTIONARY.md
  CONTENT_REQUIREMENTS.md
  DEPLOYMENT.md
  QA_CHECKLIST.md
tests/
scripts/
```

## 15. Data Model — Initial Proposal

Use relational tables with foreign keys and indexes; finalize after auditing actual content and requirements.

Core content tables:
- `products`
- `product_categories`
- `product_specs`
- `product_media`
- `product_documents`
- `solutions`
- `solution_products`
- `services`
- `projects`
- `project_products`
- `project_media`
- `partners`
- `partner_products`
- `partner_projects`
- `faqs`
- `knowledge_articles`
- `locations` (only real service locations/areas)
- `pages`
- `homepage_sections`
- `menus`
- `media`
- `documents`
- `seo_metadata`
- `redirects`
- `site_settings`
- `profiles` / admin user profiles
- `role_permissions` or a clearly defined role system
- `audit_logs`

Potential shared fields for publishable records:
- id.
- title/name.
- slug.
- summary/description.
- status (`draft`, `published`, `archived`).
- created_at / updated_at.
- created_by / updated_by.
- published_at.
- SEO title/description/canonical/indexing flags where appropriate.
- source/verification notes for technical facts where appropriate.

Do not duplicate fields blindly across tables. Document relationships, indexes, constraints, and deletion behavior. Prefer explicit junction tables for many-to-many relationships. Use database migrations committed to Git.

### 15.1 Enquiries in phase 1
Do not create a lead-management database unless the scope changes. The website can send email notifications without persistent lead storage. If future lead routing/CRM is approved, add a separate, privacy-reviewed lead model with access control, consent, retention rules, and auditability.

## 16. SEO, Local SEO, AEO/GEO

### 16.1 Technical SEO
- Server-rendered/indexable page content.
- Unique titles and meta descriptions.
- Canonicals.
- XML sitemap.
- robots.txt.
- Appropriate schema/structured data.
- Open Graph/social metadata.
- Breadcrumbs.
- Semantic HTML.
- Optimized image sizes/formats.
- Descriptive filenames and alt text.
- Clean URLs.
- Correct 404 and 301 redirects.
- No accidental `noindex`.
- Internal linking.
- Pagination/canonical rules where applicable.
- Mobile performance.
- Accessibility.
- Avoid duplicate/thin pages.

### 16.2 Entity and company facts
Keep consistent, verified details for:
- Business name.
- Address/location details as approved.
- Contact information.
- Service areas.
- Official distributor relationship.
- Social profiles.
- Team/expertise.
- Certifications (only verified).
- Company description.

Use Organization/LocalBusiness/other schema only when appropriate and factually accurate. Product schema only for eligible, correctly represented product content. Validate structured data before launch.

### 16.3 Local SEO
- Maintain Google Business Profile where applicable.
- Consistent business information.
- Real service-area/location pages only where there is genuine coverage and unique value.
- Real local project evidence.
- Local product/application language naturally.
- Do not generate doorway pages or fake addresses.

### 16.4 Internal-link strategy
Search/guide → product → project → service → enquiry. Also connect:
- Product ↔ application/solution.
- Product ↔ project.
- Partner ↔ products/projects.
- Knowledge article ↔ products/services.
- Location/service area ↔ relevant projects and services.

### 16.5 Search Console and content operations
Use Google Search Console to monitor indexing, queries, impressions, CTR, and pages; use GA4/GTM for website behavior and conversions. Claude Code can help audit duplicate metadata, missing alt text, broken links, orphan pages, schema errors, and content completeness, but it does not replace human review, authoritative content, backlinks, or actual customer evidence.

## 17. Analytics and Measurement

### 17.1 Events
- `page_view`
- `product_view`
- `product_search`
- `filter_used`
- `comparison_started`
- `comparison_completed`
- `datasheet_download`
- `project_view`
- `video_play`
- `calculator_started`
- `calculator_completed`
- `quote_started`
- `quote_submitted`
- `site_survey_started`
- `site_survey_submitted`
- `phone_click`
- `whatsapp_click`
- `email_click`
- `partner_view`
- `solution_view`

Define event parameters and avoid sending unnecessary personally identifiable information to analytics.

### 17.2 Dashboard questions
- Which pages bring visitors?
- Which products are viewed most?
- What are visitors searching for?
- Which pages lead to enquiries?
- Which channels generate qualified enquiries (if sales outcomes are later tracked)?
- Which cities/regions generate demand?
- What are mobile vs desktop conversion differences?
- Which downloads and projects assist conversion?

Measure real outcomes, not only impressions or vanity metrics.

## 18. Performance, Accessibility, and Security

### 18.1 Performance
- Optimize the hero/LCP asset.
- Use responsive, compressed images (WebP/AVIF where appropriate).
- Lazy-load below-the-fold media.
- Reserve image dimensions to prevent CLS.
- Minimize client-side JavaScript.
- Prefer server components where appropriate.
- Cache/revalidate content sensibly.
- Paginate large catalogues.
- Compress PDFs/media.
- Optimize font loading.
- Avoid heavy motion libraries unless needed.
- Test on real mobile-sized viewports and slower connections.

### 18.2 Accessibility
- Semantic HTML.
- Keyboard navigation.
- Visible focus.
- Correct labels and error messages.
- Contrast checks.
- Alt text.
- Reduced-motion support.
- Accessible dropdowns and mobile menus.
- Accessible tables and forms.
- Never rely on color alone.
- Screen-reader announcements for success/errors.

### 18.3 Security
- Supabase RLS policies.
- Server-side authorization on every admin mutation.
- Secure auth/session handling.
- No service-role key or email secret in client bundle.
- Input validation and sanitization.
- Rate limiting on forms and APIs.
- Spam/bot protection.
- Upload type/size checks and safe storage policies.
- Security headers.
- Audit logs for sensitive admin actions.
- Dependency updates.
- Backups and recovery plan.
- Least-privilege roles.
- No secrets in Git or prompt files.
- Never use production credentials in screenshots/tests.

## 19. Future Strategic Opportunity: EnerTech Distributor Growth Network

This is a future opportunity to discuss with EnerTech leadership. It is not automatically part of Electra's initial website scope, and must not be presented as approved until EnerTech agrees.

### 19.1 Core idea
Build a standardized digital growth platform for EnerTech distributors. Each distributor has its own website/identity, while approved common product data, design foundations, enquiry automation, analytics, and workflows can be reused.

The central insight:
**Customers often search locally for a product or solution; the local distributor captures the enquiry, while EnerTech benefits when its products are discovered, quoted, sold, and reordered.**

### 19.2 Common platform + local customization
Common/centrally managed elements:
- Approved EnerTech product catalogue and technical data.
- Approved media and product documents.
- Shared product page templates.
- SEO foundations.
- Enquiry form system.
- Email automation.
- Analytics conventions.
- Product launch content.
- Security and quality standards.

Distributor-specific elements:
- Logo and branding.
- Contact details and location.
- Service area.
- Local products/availability as agreed.
- Local projects/installations.
- Local services.
- Local campaigns/offers.
- Local testimonials with permission.
- Phone/WhatsApp/email CTAs.
- Local SEO content.
- Homepage section selection and modest customization.

The platform should not force every distributor to have an identical-looking website. It should enable a consistent quality baseline and controlled customizations.

### 19.3 Enquiry flow concept
Customer submits an enquiry on a distributor site:
1. Validate and protect the form.
2. Send customer confirmation email.
3. Send the distributor the enquiry.
4. Notify EnerTech only according to a documented, agreed lead-sharing policy.
5. Track delivery failures and consent/communication preferences.
6. In a later phase, add status tracking/CRM if approved.

Before rollout, agree on lead ownership, customer-data sharing, duplicate handling, distributor response expectations, escalation, marketing consent, and who may contact the customer. Do not automatically send every customer's full details to EnerTech without an approved policy.

### 19.4 Central distributor finder
On EnerTech's central site, a future “Find a Distributor” flow could use:
- City/region.
- Product/application.
- Service requirement.
- Relevant approved distributors.
- Call/WhatsApp/enquiry action.

Routing must use verified territories, product capability, service coverage, and distributor availability. Do not promise a distributor is authorized or available without verification.

### 19.5 Lead routing and sales funnel
Future flow:
Customer → enquiry → distributor routing → contact → quotation → order → installation/service → repeat business.

Potential statuses:
- New.
- Assigned.
- Contacted.
- Qualified.
- Quotation sent.
- Won.
- Lost.
- Follow-up due.

A future dashboard could measure lead volume, response time, quotes, orders, and conversion only when reliable data is provided. Avoid invented revenue claims.

### 19.6 Ads and local marketing
Potential future services:
- Local Google Search campaigns.
- Meta campaigns where appropriate.
- Product/application landing pages.
- City-specific campaigns only where real service/territory coverage exists.
- Central EnerTech product-awareness and launch campaigns.
- Distributor-level lead-generation campaigns.
- Campaign tagging and source attribution.

Measure ad spend → landing visits → enquiries → qualified leads → quotes → orders → revenue, where the distributor shares outcomes. Do not promise performance before a pilot. Define who owns the ad account, who pays media spend, approvals, privacy, and reporting.

### 19.7 Distributor recruitment
Potential “Become an EnerTech Distributor” funnel:
- Dedicated landing page.
- Verified product/market information.
- Clear description of actual support available.
- Territory opportunity only where EnerTech genuinely seeks coverage.
- Application form.
- Qualification and sales review.
- Meeting/evaluation.
- Approval and onboarding.

Potential application fields:
- City/territory.
- Existing business and years in industry.
- Customer base/markets.
- Product categories.
- Sales and technical team.
- Service capability.
- Existing brands.
- Infrastructure.
- Investment capacity/annual business range only if appropriate and approved.
- Target market.

Potential referral program through existing distributors requires EnerTech's commercial approval and documented terms.

### 19.8 Distributor marketing-in-a-box
Potential monthly kit:
- Approved product page/content.
- Brochure/datasheet.
- Social post creative/copy.
- WhatsApp creative/copy.
- Email template.
- Product FAQ.
- Application guide.
- Campaign landing page.
- Product launch checklist.

### 19.9 Repeat-business engine
Potential lifecycle:
- Installation follow-up.
- Scheduled service/maintenance reminders where applicable.
- AMC/service opportunities if offered.
- Battery replacement/upgrade opportunities where technically and commercially appropriate.
- Capacity expansion.
- Additional products/solutions.
- BESS/solar/backup upgrade opportunities.
Use customer consent, correct product/lifecycle data, and human review. Avoid unapproved mass marketing.

### 19.10 Pilot approach
Use Electra as a proof of concept first. Before proposing broad rollout, document:
- Baseline organic traffic and enquiry volume.
- Product page engagement.
- Enquiry sources.
- Form completion and email delivery.
- Sales response time if available.
- Quotes/orders if distributors share results.
- Maintenance effort and customization cost.
Then present a measured pilot to EnerTech leadership. Do not promise a particular lift before evidence.

## 20. Content and Asset Discovery Checklist

Before final content production, collect and verify:
- Official Electra logo, formats, colors, brand guidelines.
- Official EnerTech distributor proof and approved logo usage.
- Company profile and approved positioning.
- Contact information and service areas.
- Product catalogue and official model list.
- Datasheets, brochures, manuals, certificates.
- Product images and approved videos.
- Technical specifications with source documents.
- Services actually offered.
- Installation/project list.
- Approved project photos/videos and permissions.
- Project technical details and measured outcomes.
- Partner list, categories, logos, and proof of relationship.
- Approved testimonials/reviews.
- FAQs from real customer questions.
- Team/technical expertise details if publishable.
- Privacy policy, terms, cookie/analytics consent requirements.
- Email sender/domain details.
- Google Business Profile, GA4, GTM, Search Console access.
- Existing domain/DNS/hosting/GitHub/Supabase account ownership.
- Any existing website or repository that must be preserved or migrated.

If information is missing, Claude Code must create a structured `docs/NEEDS_BUSINESS_INPUT.md` list instead of inventing details.

## 21. Build Plan and Delivery Phases

### Phase 0 — Discovery (no major coding yet)
- Inspect repository and current files.
- Identify whether a site already exists and what must be preserved.
- Read this spec fully.
- Inventory assets and content.
- Record missing facts and decisions.
- Confirm domain, brand, contact, product, partner, service and legal content.
- Produce architecture plan, route map, design tokens, data schema, component map, analytics plan, and acceptance criteria.
- Ask concise questions only where a decision blocks safe progress.

### Phase 1 — Foundation
- Set up Next.js + TypeScript.
- Set up linting/formatting and tests.
- Set up Supabase clients and environment variables.
- Create database migrations.
- Establish auth/RLS and admin roles.
- Establish design tokens and reusable primitives.
- Create base layout/header/footer.
- Establish SEO defaults and analytics architecture.
- Set up development/staging/production configuration.

### Phase 2 — Homepage flagship
- Build responsive homepage sections.
- Use verified assets or clear development placeholders.
- Implement key CTAs and conversion tracking.
- Implement solution discovery flow if approved.
- Review desktop/tablet/mobile screenshots and iterate.
- Test performance, accessibility, and visual consistency.

### Phase 3 — Product system
- Product categories/listing.
- Search/filter/sort/pagination.
- Product details.
- Specs and downloads.
- Related products/projects/services.
- Comparison tool if data is complete.
- Enquiry flow.

### Phase 4 — Solutions and services
- Solution landing/detail pages.
- Services landing/detail pages.
- Guided tools/calculators only with validated inputs.
- Internal linking.

### Phase 5 — Proof, projects, and partners
- Projects directory/detail pages.
- Media gallery/video.
- Partner directory/detail pages.
- Testimonials only if verified.
- Link products, partners, projects, and solutions.

### Phase 6 — Knowledge and resources
- Knowledge center.
- FAQ content.
- Downloadable resources.
- Search across content types.
- Article review/update fields.

### Phase 7 — Custom CMS
- Admin auth and roles.
- CRUD for core content.
- Media/document uploads.
- Homepage section management.
- SEO and redirects.
- Draft/preview/publish workflow.
- Audit logs and validation.

### Phase 8 — SEO, analytics, email, security
- Metadata, canonicals, sitemap, robots, schema.
- Analytics events and conversion reporting.
- Email deliverability.
- Form rate limiting and anti-spam.
- Security/RLS audit.
- Broken link and content-completeness scripts.

### Phase 9 — QA and launch
- Functional, responsive, accessibility, performance, SEO, security, and content QA.
- Resolve critical issues.
- Production environment and domain/DNS.
- Search Console and analytics verification.
- Backups and rollback plan.
- Launch checklist and post-launch monitoring.

### Phase 10 — Continuous optimization
- Review real search/query data.
- Improve pages with evidence.
- Add products and projects.
- Measure conversion funnel.
- Test CTA/content changes.
- Plan distributor-network pilot separately.

## 22. Testing and Definition of Done

A feature is not done because it renders. It is done when it works, is accessible, secure, responsive, indexable where intended, and handles empty/error/loading states.

### Functional
- Navigation and mobile menu.
- Search, filters, sorting, pagination.
- Product pages and related links.
- Downloads and file permissions.
- Comparison logic.
- Enquiry form validation.
- Email sends and failures are handled.
- Admin CRUD and roles.
- Media upload validation.
- Draft/preview/publish.
- Redirects and 404.
- No broken links or dead buttons.

### SEO
- Unique title/description.
- Canonical correctness.
- Sitemap/robots.
- Schema validity.
- OG images.
- Breadcrumbs.
- Internal links.
- Correct indexability.
- Alt text.
- No accidental duplicate/thin pages.

### Performance
- Mobile LCP/CLS/INP review.
- Image weights and responsive sizes.
- JS and font weight.
- Caching/revalidation.
- No major layout shifts.
- Usable on slower connections.

### Accessibility
- Keyboard navigation.
- Visible focus.
- Labels/errors.
- Contrast.
- Reduced motion.
- Semantic structure.
- Accessible menus, modals, tables, forms.

### Security
- RLS and server-side role checks.
- Secrets protected.
- Upload validation.
- Rate limits and spam controls.
- Security headers.
- Audit logs.
- Backup/restore plan.

### Content
- No unapproved placeholder claims.
- Specs match source documents.
- Partner relationships verified.
- Project permissions confirmed.
- Company/contact details correct.
- All critical CTA destinations work.

### Release gate
Do not declare launch-ready if there are unresolved critical security issues, broken enquiry delivery, exposed secrets, incorrect technical claims, inaccessible core navigation, or severe mobile usability problems.

## 23. Claude Code Working Instructions

Use Claude Code as lead product designer, UX architect, senior Next.js engineer, Supabase architect, SEO engineer, accessibility engineer, and QA lead—but require it to explain trade-offs and verify its work.

### 23.1 Required working method
1. Read this full spec before coding.
2. Inspect the repository before changing anything.
3. Do not overwrite or delete existing work without explaining the impact.
4. First produce a plan and identify missing inputs.
5. Build one phase at a time.
6. Use small, reviewable changes.
7. Run tests/lint/type checks after meaningful changes.
8. Inspect browser screenshots at desktop/tablet/mobile sizes if browser tooling is available.
9. Fix the underlying cause of visual or functional bugs rather than applying random CSS patches.
10. Maintain docs, migrations, and a changelog as appropriate.
11. Never claim a test passed unless it was actually run.
12. At the end of each phase, report: changed files, features completed, tests run/results, remaining gaps, and next step.
13. Keep a live checklist against this spec.
14. Do not fabricate business content or use competitor assets without rights.
15. Use current official documentation for framework/API details; avoid relying on stale memory.

### 23.2 Required documents inside repository
- `docs/ELECTRA_SOLAR_MASTER_DEVELOPMENT_SPEC.md` — this document.
- `docs/ARCHITECTURE.md`
- `docs/DATA_DICTIONARY.md`
- `docs/NEEDS_BUSINESS_INPUT.md`
- `docs/CONTENT_REQUIREMENTS.md`
- `docs/SEO_PLAN.md`
- `docs/ANALYTICS_PLAN.md`
- `docs/SECURITY_CHECKLIST.md`
- `docs/QA_CHECKLIST.md`
- `docs/DEPLOYMENT.md`
- `docs/DECISIONS.md` — key architectural/product decisions.
- `CHANGELOG.md`

### 23.3 Environment variable handling
- Provide `.env.example` with names and safe dummy values only.
- Never commit `.env.local` or real credentials.
- Document where each secret is created and used.
- Separate public client variables from server-only secrets.
- Verify production environment variables before deployment.
- Rotate any credential accidentally exposed.

## 24. Master Kickoff Prompt for Claude Code

Copy the prompt below into Claude Code after placing this document at `docs/ELECTRA_SOLAR_MASTER_DEVELOPMENT_SPEC.md`.

> You are the lead product designer, UX architect, senior Next.js/TypeScript engineer, Supabase architect, SEO/AEO/GEO engineer, accessibility engineer, security reviewer, and QA lead for the Electra Solar website.
>
> **First read `docs/ELECTRA_SOLAR_MASTER_DEVELOPMENT_SPEC.md` completely. Do not start implementation until you have inspected the repository and produced a concise discovery report.**
>
> The objective is to build a premium, colorful, modern, trustworthy solar/power-solutions website for Electra Solar. Electra Solar is the official distributor of EnerTech and provides installation and related services; verify exact claims and scope against supplied business materials. This is not merely a reseller brochure. The website must excel at product discovery, solution education, real project proof, service discovery, enquiries, SEO/local SEO, and non-developer content management.
>
> Preferred stack if starting from zero: Next.js App Router + TypeScript, Supabase PostgreSQL/Storage/Auth with RLS, Vercel deployment, Cloudflare where appropriate, GitHub, GA4/GTM/Search Console, and an email provider selected for server-side enquiry notifications. Follow current official documentation. Do not introduce unnecessary services or complexity.
>
> **Design requirement:** create an original, premium, colorful industrial-tech design system. Use strong typography, spacious layouts, rich real imagery, product cards, restrained motion, clean technical information, and clear conversion paths. Explore a controlled palette using navy, electric blue, energetic green, solar yellow/orange, and light backgrounds, subject to actual brand guidance. Use competitor sites only as pattern inspiration; do not clone them or reuse copyrighted assets without permission. The homepage is the flagship page and receives extra design iteration.
>
> **Business features:** implement homepage, products/categories/details, solutions, services, projects/installations, partners, knowledge/resources, site search, enquiry forms/email automation, SEO foundations, analytics events, and a custom CMS with roles and publishing controls. Add product comparison and calculators only when verified structured data and validated assumptions are available. Initial enquiries do not need to be stored in a database/CRM; send them securely by email. Do not silently add lead storage or marketing automation requiring consent.
>
> **Data integrity:** never invent product specifications, warranties, certifications, partner status, prices, reviews, customer names, project results, service areas, contact details, savings, or performance metrics. If a fact is missing, add it to `docs/NEEDS_BUSINESS_INPUT.md`; use clearly marked non-production placeholders only during development. Keep important specs in crawlable HTML and attach official documents where available.
>
> **Implementation method:** (1) inspect repository and assets; (2) create discovery report, architecture, route map, data model, design tokens, component map, analytics plan, and acceptance criteria; (3) implement the foundation; (4) build the homepage and iterate with screenshots; (5) implement products; (6) solutions/services; (7) projects/partners; (8) knowledge/resources; (9) CMS; (10) SEO, email, analytics, security and QA; (11) perform a complete gap audit. Work phase-by-phase with small, testable changes.
>
> For every feature, verify loading, empty, error, success, keyboard, mobile, accessibility, SEO, security, and maintainability states as applicable. Run lint/type checks/tests after meaningful changes and report actual results. Do not claim success without verification. Keep the required docs current. Protect all secrets, enforce server-side authorization and Supabase RLS, validate uploads/forms, and rate-limit public endpoints.
>
> **Future opportunity:** a multi-distributor EnerTech growth network (customizable distributor websites, shared approved product data, local SEO/ads, lead routing, distributor recruitment, analytics, repeat-business workflows) is a separate future phase. Do not build or represent it as approved without explicit business authorization. Design the Electra foundation so future expansion is possible without prematurely implementing multi-tenancy.
>
> **Your first response must contain only:** repository findings; current architecture (if any); missing business inputs; proposed route map; proposed database schema/relationships; design-system direction; implementation phases; risks/dependencies; and acceptance criteria for Phase 1. Wait for review before large destructive changes. Then proceed incrementally once the plan is approved.
>
> At the end, compare the implementation against every section of the master spec, list complete/partial/missing items, provide test evidence, and give a prioritized launch-readiness report.

## 25. Open Decisions / Business Inputs Required

Do not assume these are already settled:
1. Final logo files and official brand guidelines.
2. Exact legal/business name and approved company description.
3. Confirmed contact details, addresses, and service areas.
4. Official wording and evidence for EnerTech distributor status.
5. Complete product catalogue and approved technical documents.
6. Which product categories are in scope at launch.
7. Services actually offered and where.
8. Approved project list, photos/videos, permissions, and measurable results.
9. Partner list and approved relationship labels.
10. Approved testimonials and customer permissions.
11. Domain ownership, DNS, hosting, GitHub, and Supabase account ownership.
12. Email sender/domain and internal recipients.
13. Whether WhatsApp integration is a click-to-chat link or a real API workflow.
14. Privacy policy, consent language, analytics consent requirements, and file-upload policy.
15. Admin roles and who can publish.
16. Budget/plan limits and expected traffic/catalogue size.
17. Languages needed at launch.
18. Whether any existing website content must be migrated.
19. Whether a calculator is desired for launch or later.
20. Which conversion is the primary KPI: quote, call, WhatsApp, site survey, or a combination.

## 26. Official Technical References

Use current official documentation during implementation; the links below are starting points and must be rechecked when coding:
- Next.js Metadata and Open Graph: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Next.js metadata API: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Supabase Next.js tutorial: https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs
- Supabase server-side authentication: https://supabase.com/docs/guides/auth/server-side
- Supabase Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
- Google Search Console: https://search.google.com/search-console/about
- Google Analytics: https://analytics.google.com/
- Google Tag Manager: https://tagmanager.google.com/

## 27. Final Product Standard

The final website should feel like a carefully designed, premium solar/power-solutions experience—not a generic AI template. It must combine colorful visual quality with technical clarity, genuine proof, a reliable enquiry path, strong local/search foundations, and a CMS that staff can actually use.

**Build the right foundation, prove the value with Electra Solar, measure real outcomes, and only then expand into the broader EnerTech distributor growth network.**
