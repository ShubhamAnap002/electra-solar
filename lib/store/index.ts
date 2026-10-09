import fs from "fs";
import path from "path";
import { PRODUCTS, CATEGORIES, Product, CategoryInfo } from "@/lib/data/products";
import { COMPANY, CompanyInfo } from "@/lib/data/company";

const DATA_DIR = path.join(process.cwd(), "data");

// Helper to ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Activity Log Item
export interface ActivityLog {
  id: string;
  action: string;
  module: "Products" | "Categories" | "Content" | "SEO" | "Media" | "Gmail" | "Email" | "Auth";
  details: string;
  timestamp: string;
  user: string;
}

// SEO Configuration
export interface SeoConfig {
  siteTitle: string;
  defaultDescription: string;
  keywords: string;
  ogImage: string;
  googleSiteVerification: string;
  pages: {
    path: string;
    name: string;
    title: string;
    description: string;
    keywords: string;
    canonical: string;
    noIndex: boolean;
  }[];
}

// Site Content Configuration
export interface SiteContent {
  hero: {
    badge: string;
    headline: string;
    headlineHighlight: string;
    subheadline: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    highlights: {
      title: string;
      subtitle: string;
    }[];
  };
  whyElectra: {
    badge: string;
    headline: string;
    description: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    stats: {
      value: string;
      label: string;
    }[];
  };
  applications: {
    headline: string;
    subtitle: string;
    sectors: {
      id: string;
      title: string;
      subtitle: string;
      desc: string;
      href: string;
      image: string;
    }[];
  };
  switchToSolarBanner: {
    badge: string;
    headline: string;
    subtitle: string;
    ctaText: string;
  };
  company: CompanyInfo;
}

// Initial Default SEO
const DEFAULT_SEO: SeoConfig = {
  siteTitle: "Electra Solar — High-Efficiency Hybrid Inverters & Energy Storage",
  defaultDescription: "Official turnkey distributor of EnerTech UPS Pvt. Ltd. (Pune, Estd. 1989). Industrial 100% unbalanced phase hybrid inverters, BESS, and online UPS.",
  keywords: "solar hybrid inverter, enertech ups, deye india, Bess energy storage, 3 phase solar inverter, pune solar manufacturer",
  ogImage: "/images/hero/hero-solar-system.jpg",
  googleSiteVerification: "",
  pages: [
    {
      path: "/",
      name: "Homepage",
      title: "Electra Solar — High-Efficiency Hybrid Inverters & Energy Storage",
      description: "Discover heavy-duty solar hybrid inverters, BESS, and industrial UPS with zero-break transfer and 100% phase unbalance tolerance.",
      keywords: "solar inverters, hybrid pcu, bess, pune",
      canonical: "https://electrasolar.in/",
      noIndex: false,
    },
    {
      path: "/products",
      name: "Product Catalogue",
      title: "Solar Inverters & Power Electronics Catalogue | Electra Solar",
      description: "Explore our full range of 3kW-50kW hybrid inverters, modular LiFePO4 battery storage systems, and industrial online UPS.",
      keywords: "solar products, hybrid inverter specs, lithium battery bank",
      canonical: "https://electrasolar.in/products",
      noIndex: false,
    },
    {
      path: "/calculator",
      name: "Sizing Calculator",
      title: "Solar & Battery System Sizing Calculator | Electra Solar",
      description: "Estimate solar PV capacity, battery storage size, and annual electricity cost savings for homes and industrial facilities.",
      keywords: "solar sizing calculator, solar roi estimator, battery storage calculator",
      canonical: "https://electrasolar.in/calculator",
      noIndex: false,
    },
    {
      path: "/compare",
      name: "Specification Comparison",
      title: "Compare Solar Inverters & Storage Specifications | Electra Solar",
      description: "Side-by-side technical specification comparison for SunMagic hybrid PCUs, EnerCube BESS, and industrial UPS.",
      keywords: "compare inverters, inverter specifications matrix",
      canonical: "https://electrasolar.in/compare",
      noIndex: false,
    },
    {
      path: "/solutions",
      name: "Turnkey Solutions",
      title: "Solar Solutions for Residential, Commercial & Industrial | Electra Solar",
      description: "Engineered solar architectures for luxury villas, commercial office complexes, industrial factories, and microgrids.",
      keywords: "commercial solar, residential solar hybrid, industrial microgrid",
      canonical: "https://electrasolar.in/solutions",
      noIndex: false,
    },
    {
      path: "/services",
      name: "Engineering Services",
      title: "Site Survey, Turnkey EPC & 24/7 AMC Services | Electra Solar",
      description: "Comprehensive engineering audits, harmonic analysis, DG synchronization commissioning, and AMC SLA support.",
      keywords: "solar site survey, solar commissioning, inverter amc pune",
      canonical: "https://electrasolar.in/services",
      noIndex: false,
    },
    {
      path: "/projects",
      name: "Case Studies",
      title: "Commissioned Solar Projects & Case Studies | Electra Solar",
      description: "Explore real-world industrial installations across Chakan, Hinjawadi, Lonavala, and Baramati.",
      keywords: "solar case studies, chakan industrial solar, hospital solar ups",
      canonical: "https://electrasolar.in/projects",
      noIndex: false,
    },
    {
      path: "/about",
      name: "About Us",
      title: "About Electra Solar & EnerTech Engineering Heritage",
      description: "35+ years of parent engineering excellence. Over 35,000 systems commissioned across India and worldwide.",
      keywords: "about electra solar, enertech ups pvt ltd heritage, pune solar company",
      canonical: "https://electrasolar.in/about",
      noIndex: false,
    },
    {
      path: "/contact",
      name: "Contact & Hub Locations",
      title: "Contact Electra Solar Sales & Engineering Desk | Pune Hub",
      description: "Speak directly with our power engineering team for sizing, quotation, and dealer partnership inquiries.",
      keywords: "contact electra solar, pune solar phone, enertech sales desk",
      canonical: "https://electrasolar.in/contact",
      noIndex: false,
    },
  ],
};

// Initial Default Content
const DEFAULT_CONTENT: SiteContent = {
  hero: {
    badge: "Official Partner • EnerTech UPS Pvt. Ltd. (Pune Plant • Estd. 1989)",
    headline: "Powering a",
    headlineHighlight: "Sustainable Tomorrow",
    subheadline: "High-efficiency solar inverters and energy storage solutions for homes, businesses and industries. Engineered with 100% phase unbalance tolerance and zero-break transfer (< 5ms).",
    primaryCtaText: "Explore Products",
    primaryCtaLink: "/products",
    secondaryCtaText: "Get Free Consultation",
    secondaryCtaLink: "#consultation",
    highlights: [
      { title: "High Efficiency", subtitle: "Up to 98.4%" },
      { title: "Smart Monitoring", subtitle: "Real-time via App" },
      { title: "Reliable & Durable", subtitle: "IP65 Protection" },
      { title: "Global Support", subtitle: "Pan-India Turnkey SLA" },
    ],
  },
  whyElectra: {
    badge: "Authorized EnerTech Partner",
    headline: "Why Electra Solar?",
    description: "We bring world-class solar technology from Deye to India, with trusted service, expert support and complete energy solutions for a sustainable future.",
    bullet1: "Heavy-duty 100% unbalanced phase load tolerance",
    bullet2: "Sub-5ms zero-break UPS changeover for critical machinery",
    bullet3: "Direct Pune factory warranty & 24/7 industrial SLA coverage",
    stats: [
      { value: "10+", label: "Years Experience" },
      { value: "50+", label: "Projects Completed" },
      { value: "1000+", label: "Happy Customers" },
    ],
  },
  applications: {
    headline: "Applications",
    subtitle: "Powering every sector with clean energy.",
    sectors: [
      {
        id: "residential",
        title: "Residential",
        subtitle: "Clean & Reliable",
        desc: "Rooftop hybrid solar with battery backup for luxury villas, apartments and eco-homes.",
        href: "/solutions/residential-solar-hybrid",
        image: "/images/showcase/solar-home-villa.jpg",
      },
      {
        id: "commercial",
        title: "Commercial",
        subtitle: "Save More, Grow More",
        desc: "Grid-tied solar with peak shaving for office parks, shopping centers and corporate hubs.",
        href: "/solutions/commercial-industrial-power-solutions",
        image: "/images/showcase/commercial-solar.jpg",
      },
      {
        id: "industrial",
        title: "Industrial",
        subtitle: "Built for Heavy Load",
        desc: "Heavy-duty 3-phase hybrid PCUs with DG synchronization for factories and cold storage.",
        href: "/solutions/critical-infrastructure-and-healthcare",
        image: "/images/showcase/industrial-solar.jpg",
      },
      {
        id: "utility",
        title: "Utility",
        subtitle: "Large Scale Solutions",
        desc: "Utility-scale containerized BESS and ground-mount PV plants for microgrids and substations.",
        href: "/solutions/remote-microgrids-and-agriculture",
        image: "/images/showcase/utility-solar.jpg",
      },
    ],
  },
  switchToSolarBanner: {
    badge: "Zero Commitment • Free Engineering Sizing",
    headline: "Switch to Solar Today",
    subtitle: "Lower your electricity bills. Reduce your carbon footprint with industrial-grade hybrid solar power.",
    ctaText: "Book Free Consultation",
  },
  company: COMPANY,
};

// Generic JSON read with fallback
function readJsonFile<T>(filename: string, fallback: T): T {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), "utf-8");
    return fallback;
  }
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Error reading ${filename}, using fallback:`, err);
    return fallback;
  }
}

// Generic JSON write
function writeJsonFile<T>(filename: string, data: T): void {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// Log admin activity
export function recordActivity(action: string, module: ActivityLog["module"], details: string, user = "Admin") {
  const logs = getActivityLogs();
  const newLog: ActivityLog = {
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    action,
    module,
    details,
    timestamp: new Date().toISOString(),
    user,
  };
  logs.unshift(newLog);
  // Keep last 100 activities
  writeJsonFile("activity-logs.json", logs.slice(0, 100));
}

export function getActivityLogs(): ActivityLog[] {
  return readJsonFile<ActivityLog[]>("activity-logs.json", [
    {
      id: "log_init",
      action: "System Initialized",
      module: "Auth",
      details: "Electra Solar Admin Data Store established.",
      timestamp: new Date().toISOString(),
      user: "System",
    },
  ]);
}

// Products API
export function getStoredProducts(): Product[] {
  return readJsonFile<Product[]>("products.json", PRODUCTS);
}

export function saveStoredProducts(products: Product[]): void {
  writeJsonFile("products.json", products);
}

export function getStoredProductBySlug(slug: string): Product | undefined {
  const products = getStoredProducts();
  return products.find((p) => p.slug === slug);
}

// Categories API
export function getStoredCategories(): CategoryInfo[] {
  return readJsonFile<CategoryInfo[]>("categories.json", CATEGORIES);
}

export function saveStoredCategories(categories: CategoryInfo[]): void {
  writeJsonFile("categories.json", categories);
}

// Site Content API
export function getStoredSiteContent(): SiteContent {
  return readJsonFile<SiteContent>("site-content.json", DEFAULT_CONTENT);
}

export function saveStoredSiteContent(content: SiteContent): void {
  writeJsonFile("site-content.json", content);
}

// SEO API
export function getStoredSeo(): SeoConfig {
  return readJsonFile<SeoConfig>("seo.json", DEFAULT_SEO);
}

export function saveStoredSeo(seo: SeoConfig): void {
  writeJsonFile("seo.json", seo);
}

// Gmail Configuration
export interface GmailConfig {
  isConnected: boolean;
  connectedEmail: string | null;
  recipientEmail: string;
  senderName: string;
  authMethod: "oauth" | "smtp" | "none";
  oauth: {
    clientId: string;
    clientSecret: string;
    refreshToken: string | null;
    accessToken: string | null;
    tokenExpiry: number | null;
    redirectUri: string;
  };
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
  };
  lastTestedAt: string | null;
  lastTestStatus: "success" | "error" | null;
  lastTestMessage: string | null;
}

const DEFAULT_GMAIL_CONFIG: GmailConfig = {
  isConnected: false,
  connectedEmail: null,
  recipientEmail: "sales@electrasolar.in",
  senderName: "Electra Solar Notification",
  authMethod: "oauth",
  oauth: {
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN || null,
    accessToken: null,
    tokenExpiry: null,
    redirectUri: process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/api/admin/gmail/callback",
  },
  smtp: {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
  lastTestedAt: null,
  lastTestStatus: null,
  lastTestMessage: null,
};

export function getStoredGmailConfig(): GmailConfig {
  return readJsonFile<GmailConfig>("gmail-config.json", DEFAULT_GMAIL_CONFIG);
}

export function saveStoredGmailConfig(config: GmailConfig): void {
  writeJsonFile("gmail-config.json", config);
}
