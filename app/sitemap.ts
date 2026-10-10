import { MetadataRoute } from "next";
import { PRODUCTS, CATEGORIES } from "@/lib/data/products";
import { SOLUTIONS } from "@/lib/data/solutions";
import { SERVICES } from "@/lib/data/services";
import { PROJECTS } from "@/lib/data/projects";
import { BLOG_POSTS } from "@/lib/data/blog";
import {
  getStoredProducts,
  getStoredCategories,
  getStoredBlogPosts,
  getStoredProjects,
} from "@/lib/store";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://electrasolar.in";
  const now = new Date();
  const recentDate = new Date("2026-04-01T00:00:00Z");

  // Fetch live store items with static fallbacks
  const storedProducts = getStoredProducts();
  const products = (storedProducts && storedProducts.length > 0 ? storedProducts : PRODUCTS).filter(
    (p) => p.published !== false
  );

  const storedCategories = getStoredCategories();
  const categories = storedCategories && storedCategories.length > 0 ? storedCategories : CATEGORIES;

  const storedBlogs = getStoredBlogPosts();
  const blogPosts = storedBlogs && storedBlogs.length > 0 ? storedBlogs : BLOG_POSTS;

  const storedProjects = getStoredProjects();
  const projects = storedProjects && storedProjects.length > 0 ? storedProjects : PROJECTS;

  // 1. High-Value Static Hubs & Tools (Purged 307 redirects like /compare)
  const coreHubs: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: recentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: recentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/installations`,
      lastModified: recentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: recentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: recentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: recentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: recentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: recentDate,
      changeFrequency: "weekly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date("2026-01-01T00:00:00Z"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-01-01T00:00:00Z"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // 2. Product Category Collection Pages
  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/products/${cat.slug}`,
    lastModified: recentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 3. Hardware Product Detail Pages (High Purchase Intent)
  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/products/${p.category}/${p.slug}`,
    lastModified: recentDate,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 4. Engineering Solutions Pages
  const solutionEntries: MetadataRoute.Sitemap = SOLUTIONS.map((s) => ({
    url: `${baseUrl}/solutions/${s.slug}`,
    lastModified: recentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 5. Commissioned Case Study Pages
  const projectEntries: MetadataRoute.Sitemap = projects.map((proj) => ({
    url: `${baseUrl}/projects/${proj.slug}`,
    lastModified: recentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 6. Knowledge Hub Articles (Topical Authority)
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: recentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 7. Specialized Engineering Service Pages
  const serviceEntries: MetadataRoute.Sitemap = SERVICES.map((srv) => ({
    url: `${baseUrl}/services/${srv.slug}`,
    lastModified: recentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...coreHubs,
    ...categoryEntries,
    ...productEntries,
    ...solutionEntries,
    ...projectEntries,
    ...blogEntries,
    ...serviceEntries,
  ];
}
