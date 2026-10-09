# Electra Solar — Security Architecture & Hardening Checklist

## 1. Security Overview

Security for the Electra Solar web platform is built on defense-in-depth principles. Because the public site is rendered statically via Next.js Static Site Generation (SSG), the traditional attack surface (SQL injection, database extraction, session hijacking) is drastically reduced.

---

## 2. Hardening Matrix & Audit Status

| Category | Security Control | Implementation Details | Status |
| :--- | :--- | :--- | :--- |
| **Transport** | Strict HTTPS / TLS 1.3 | Enforced via reverse proxy / Vercel Edge / Cloudflare | Verified |
| **HTTP Headers** | `X-Content-Type-Options: nosniff` | Prevents MIME-sniffing exploits | Configured in `next.config.mjs` |
| **HTTP Headers** | `X-Frame-Options: SAMEORIGIN` | Mitigates clickjacking attacks | Configured in `next.config.mjs` |
| **HTTP Headers** | `Referrer-Policy: strict-origin-when-cross-origin` | Protects sensitive URL query parameters | Configured in `next.config.mjs` |
| **Frontend Form** | Strict Regex Client Validation | Enforces clean email format and 10-digit Indian mobile regex | Implemented in `QuoteForm.tsx` |
| **Frontend Form** | Input Sanitization | Trims and escapes all form input strings before dispatch | Implemented |
| **Spam / Bot** | Honeypot Field Protection | Invisible trap field catches automated bot submissions | Built into `QuoteForm.tsx` |
| **API Endpoints** | Rate Limiting | Maximum 5 quote requests per IP per minute via middleware | Configured for deployment |
| **Secrets** | Zero Secret Leakage | All secrets kept server-side; client only exposes `NEXT_PUBLIC_` | Audited in `.env.example` |
| **Version Control**| `.env*.local` Ignored | `.gitignore` prevents accidental commit of staging/production keys | Verified in `.gitignore` |
| **Static Assets** | Local Hosting | All hardware images hosted locally in `public/`; no third-party CDN hijacking risks | Verified |

---

## 3. Recommended Production Security Headers

Add to `next.config.mjs` when deploying to standalone Node.js environments:
```javascript
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
];
```
