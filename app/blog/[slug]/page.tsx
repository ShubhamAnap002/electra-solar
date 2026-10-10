import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  User,
  Calendar,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Share2,
  ShieldCheck,
  Zap,
  Bookmark,
} from "lucide-react";
import { getStoredBlogPosts, getStoredBlogPostBySlug, getStoredProducts } from "@/lib/store";
import { PRODUCTS } from "@/lib/data/products";
import { BlogBlockRenderer } from "@/components/blog/BlogBlockRenderer";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const posts = getStoredBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getStoredBlogPostBySlug(params.slug);
  if (!post) {
    return { title: "Article Not Found | Electra Solar" };
  }

  return {
    title: `${post.title} | Electra Solar Knowledge Hub`,
    description: post.summary,
    alternates: {
      canonical: `https://electrasolar.in/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Electra Solar`,
      description: post.summary,
      url: `https://electrasolar.in/blog/${post.slug}`,
      siteName: "Electra Solar",
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [post.coverImage],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getStoredBlogPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const inlineImages = (post.content.blocks || [])
    .filter((b) => b.type === "image" && Boolean(b.url))
    .map((b: any) =>
      b.url.startsWith("http") ? b.url : `https://electrasolar.in${b.url.startsWith("/") ? b.url : "/" + b.url}`
    );

  const coverUrl = post.coverImage.startsWith("http")
    ? post.coverImage
    : `https://electrasolar.in${post.coverImage.startsWith("/") ? post.coverImage : "/" + post.coverImage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    image: [coverUrl, ...inlineImages],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://electrasolar.in/blog/${post.slug}`,
    },
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "Electra Solar",
      logo: {
        "@type": "ImageObject",
        url: "https://electrasolar.in/images/brand/enertech-partner.png",
      },
    },
    datePublished: "2026-03-01T08:00:00Z",
    dateModified: "2026-04-01T08:00:00Z",
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://electrasolar.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Knowledge Hub",
        item: "https://electrasolar.in/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://electrasolar.in/blog/${post.slug}`,
      },
    ],
  };

  return (
    <article className="bg-[#f8fafd] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      {/* 1. ARTICLE HERO HEADER */}
      <section className="bg-[#091e3a] text-white py-16 lg:py-20 relative border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-5">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-300 font-medium">
            <Link href="/" className="hover:text-[#ea580c] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
            <Link href="/blog" className="hover:text-[#ea580c] transition-colors">
              Knowledge Hub
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-gray-400 truncate max-w-[200px]">{post.category}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-400 text-xs font-bold border border-white/15">
            <span>{post.category}</span>
            <span>•</span>
            <span className="text-gray-300 font-medium">{post.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 text-[#ea580c] font-bold flex items-center justify-center text-xs">
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-white">{post.author}</div>
                <div className="text-[10px] text-gray-400">{post.authorRole}</div>
              </div>
            </div>

            <span className="text-gray-600 hidden sm:inline">•</span>

            <div className="flex items-center gap-1.5 text-gray-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.publishedAt}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARTICLE BODY CONTAINER */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        {/* Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-xl mb-12 border border-gray-200">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>

        {/* Content Body: WordPress-Style Dynamic Blocks OR Legacy Fallback */}
        {post.content.blocks && post.content.blocks.length > 0 ? (
          <BlogBlockRenderer blocks={post.content.blocks} />
        ) : (
          <>
            {/* Lead Introduction Box */}
            {post.content.intro && (
              <div className="p-6 sm:p-8 bg-white rounded-2xl border-l-4 border-[#ea580c] border-t border-r border-b border-gray-200 shadow-sm mb-10 text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
                {post.content.intro}
              </div>
            )}

            {/* Article Body Content */}
            {post.content.sections && post.content.sections.length > 0 && (
              <div className="space-y-10 text-gray-700 leading-relaxed text-sm sm:text-base">
                {post.content.sections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-black text-[#091e3a] tracking-tight">
                      {section.heading}
                    </h2>

                    <div className="space-y-3 text-gray-700">
                      {section.body.map((p, pIdx) => (
                        <p key={pIdx} className="leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>

                    {section.highlightBox && (
                      <div className="my-6 p-5 rounded-2xl bg-orange-50/70 border border-orange-200 flex items-start gap-3 text-xs sm:text-sm text-[#ea580c] font-semibold">
                        <Zap className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#ea580c]" />
                        <span>{section.highlightBox}</span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Conclusion */}
                {post.content.conclusion && (
                  <div className="pt-8 border-t border-gray-200 space-y-3">
                    <h3 className="text-lg sm:text-xl font-black text-[#091e3a]">
                      Summary & Engineering Verdict
                    </h3>
                    <p className="text-gray-700 font-medium leading-relaxed">
                      {post.content.conclusion}
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Related Product Promotion Card */}
        {post.relatedProductSlug && (() => {
          const storedProducts = getStoredProducts();
          const allProducts = storedProducts && storedProducts.length > 0 ? storedProducts : PRODUCTS;
          const relatedProduct = allProducts.find((p) => p.slug === post.relatedProductSlug);
          const targetHref = relatedProduct
            ? `/products/${relatedProduct.category}/${relatedProduct.slug}`
            : "/products";

          return (
            <div className="mt-14 bg-[#091e3a] text-white rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#ea580c]">
                  Featured Hardware Mentioned in Article
                </span>
                <h4 className="text-lg sm:text-xl font-black">{post.relatedProductName}</h4>
                <p className="text-xs text-gray-300">
                  Verified specifications, heavy surge tolerance &amp; direct Pune factory warranty.
                </p>
              </div>

              <Link
                href={targetHref}
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 flex-shrink-0"
              >
                <span>{relatedProduct ? "View Specifications" : "Explore Portfolio"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          );
        })()}

        {/* Share & Back Controls */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ea580c] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Publications</span>
          </Link>

          <div className="flex items-center gap-3 text-xs text-gray-600">
            <span className="font-semibold">Share Guide:</span>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(post.title + " - Read more at https://electrasolar.in/blog/" + post.slug)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
              title="Share on WhatsApp"
            >
              WhatsApp
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=https://electrasolar.in/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-orange-50 text-[#ea580c] hover:bg-orange-100 transition-colors"
              title="Share on LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
