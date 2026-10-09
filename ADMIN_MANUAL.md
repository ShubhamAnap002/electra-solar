# Electra Solar — Admin Panel & Google OAuth 2.0 Manual

## 1. Overview

The **Electra Solar Admin Panel** provides a secure, web-based management interface for managing the website's product catalogue, categories, homepage copy, media library, and SEO metadata without editing source code.

### 🛡️ Privacy & Zero-Persistence Architecture
As per strict compliance requirements:
* **No Enquiry Persistence:** Website customer quote requests and contact form submissions are **never stored** in any database, lead table, or CRM.
* **Direct Inbox Delivery:** Every submission is validated on the server and dispatched directly to the configured Electra Solar Gmail account via **Google OAuth 2.0 (Gmail REST API)** with visitor `Reply-To`.

---

## 2. Administrator Access & Credentials

* **Admin Portal URL:** `http://localhost:3000/admin` (or `https://your-domain.com/admin`)
* **Login URL:** `/admin/login`
* **Default Username:** `admin`
* **Default Password:** `Electra@Solar2026!`

*Note: In production, configure `ADMIN_USERNAME` and `ADMIN_PASSWORD_HASH` in `.env.local` to override defaults.*

---

## 3. Modules Guide

### A. Dashboard (`/admin`)
* Real-time metrics on published products, active categories, and asset storage.
* Live Gmail OAuth connection status pill.
* Recent administrative activity log (who modified what and when).
* Quick action shortcuts to publish products, edit content, or run email diagnostics.

### B. Product Management (`/admin/products`)
* Full catalog view with category filters and real-time search.
* **Add New Product (`/admin/products/new`):**
  * **General Information:** Model name, slug, series, category, phase, capacity range, and warranty.
  * **Content & Descriptions:** Product tagline, overview, ideal application sectors, and datasheet download link.
  * **Features & Protections:** Add/remove engineering bullet points and electrical protections.
  * **Technical Specs Table:** Key-value technical specifications grouped by category (Solar Input, AC Output, Battery System, Physical).
* **Edit Product (`/admin/products/[id]`):** Update specs or unpublish items.
* **Live Previews:** Instant links to view the product page on the public website.

### C. Category Management (`/admin/categories`)
* Organize product categories (e.g. Solar Hybrid Inverters, Energy Storage BESS, Online UPS).
* Edit slugs, descriptions, and icon representations.
* Safety checks: Prevents accidental deletion of categories that have active products assigned.

### D. Website Content CMS (`/admin/content`)
* **Homepage Hero Section:** Edit main headline, subheadline, CTA buttons, and key counter badges (e.g. 35+ Years, 100% Phase Support).
* **Why Electra Solar:** Manage the 4 core value proposition pillars.
* **Application Showcases:** Manage Residential, Commercial, Industrial, and Utility sector showcase cards.
* **Switch to Solar Banner:** Update conversion banner headlines, subtitles, and button text.
* **Company & Contact:** Manage phone numbers, support emails, headquarters address, and operating hours.

### E. Media Library (`/admin/media`)
* Drag-and-drop file upload for product photos, brochures, and PDF technical datasheets (up to 15MB each).
* Instant public hosting under `/uploads/`.
* One-click "Copy URL" button for easy insertion into product datasheets and cards.
* Reference checking: Deletion protection for files actively referenced on published pages.

### F. SEO & Search Engine Visibility (`/admin/seo`)
* **Global Meta Defaults:** Default title, fallback meta description, and social share card (OpenGraph image).
* **Page-by-Page Metadata:** Manage titles, meta descriptions, and canonical URLs for `/`, `/products`, `/solutions`, `/calculator`, etc.
* **Google SERP Snippet Preview:** Real-time visual mockup showing how the page appears on Google search results.
* **Indexing Toggle:** One-click `index` vs `noindex` control for each page.

---

## 4. Google OAuth 2.0 Gmail Setup Guide

### Step 1: Create Google Cloud Project
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project named `Electra Solar Website`.

### Step 2: Enable the Gmail API
1. Navigate to **APIs & Services** > **Library**.
2. Search for `Gmail API` and click **Enable**.

### Step 3: Configure OAuth Consent Screen
1. Navigate to **APIs & Services** > **OAuth consent screen**.
2. Select User Type:
   * **Internal** (if using Google Workspace for your organization) or **External**.
3. Fill in App Information:
   * App Name: `Electra Solar`
   * User support email: `sales@electrasolar.in`
4. Add Scopes:
   * Click **Add or Remove Scopes**.
   * Add: `https://www.googleapis.com/auth/gmail.send`
   * Add: `https://www.googleapis.com/auth/userinfo.email`
5. If in Testing mode, add your Gmail address under **Test Users**.

### Step 4: Create OAuth 2.0 Client Credentials
1. Navigate to **APIs & Services** > **Credentials**.
2. Click **Create Credentials** > **OAuth client ID**.
3. Select **Web application**.
4. Set Name: `Electra Solar Web Admin`.
5. Under **Authorized redirect URIs**, add:
   * Development: `http://localhost:3000/api/admin/gmail/callback`
   * Production: `https://your-domain.com/api/admin/gmail/callback`
6. Click **Create** and copy your **Client ID** and **Client Secret**.

### Step 5: Connect Gmail in Admin Panel
1. Open Admin Panel > **Email Integration** (`/admin/email`).
2. Click **Edit OAuth Credentials** and enter:
   * Client ID
   * Client Secret
   * Redirect URI
   * Destination Electra Solar Email (e.g. `sales@electrasolar.in`)
3. Click **Save Configuration**.
4. Click **Connect Gmail**.
5. Grant permissions on Google's consent screen.
6. Once redirected back, click **Send Test Email** to verify end-to-end delivery!

---

## 5. Environment Variables (`.env.local`)

```env
# Admin Panel Security
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=Electra@Solar2026!
ADMIN_SESSION_SECRET=electra-super-secret-session-key-2026

# Google OAuth 2.0 (Optional: can also be configured via /admin/email)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/admin/gmail/callback
```

---

## 6. Troubleshooting

| Issue | Cause | Solution |
|---|---|---|
| `redirect_uri_mismatch` | Google Console redirect URI does not match current host | Ensure exact URI (including http/https and port) is listed in Google Cloud Console. |
| `invalid_grant` | Google refresh token was revoked or expired | Click **Reconnect** on `/admin/email` to re-authorize. |
| Test email delivery failed | Gmail API quota or permission missing | Ensure `https://www.googleapis.com/auth/gmail.send` scope was enabled on the consent screen. |
| Image upload fails | File exceeds 15MB or unsupported format | Upload JPG, PNG, WEBP, or PDF under 15MB. |
