import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/images/", "/uploads/"],
        disallow: ["/admin/", "/api/admin/", "/api/forms/"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "Google-Extended"],
        allow: ["/", "/images/", "/uploads/"],
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: "https://electrasolar.in/sitemap.xml",
    host: "https://electrasolar.in",
  };
}
