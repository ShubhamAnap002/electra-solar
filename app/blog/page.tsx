import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Clock,
  User,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Calendar,
  Share2,
} from "lucide-react";
import { getStoredBlogPosts } from "@/lib/store";

export const metadata: Metadata = {
  title: "Solar Knowledge Hub & Engineering Insights | Electra Solar",
  description:
    "Expert technical guides, C&I solar sizing analyses, PM Surya Ghar subsidy rules, and commercial BESS battery storage insights from Electra Solar engineers in Pune.",
  keywords: [
    "Solar Hybrid Inverter Guide",
    "PM Surya Ghar Yojana Subsidy",
    "Commercial BESS Peak Shaving",
    "3 Phase Inverter Phase Unbalance",
    "DG Synchronization Solar Inverter",
    "Solar EPC Insights Pune",
  ],
};

export default function BlogIndexPage() {
  const blogs = getStoredBlogPosts();
  const featuredPost = blogs.find((p) => p.featured) || blogs[0];
  const regularPosts = blogs.filter((p) => p.id !== featuredPost?.id);

  return (
    <div className="bg-[#f8fafd] min-h-screen">
      {/* 1. HERO HEADER */}
      <section className="bg-[#091e3a] text-white py-16 lg:py-20 relative overflow-hidden border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs text-gray-300 font-medium">
              <Link href="/" className="hover:text-[#ea580c] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-[#ea580c] font-bold">Knowledge Hub</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-400 text-xs font-bold border border-white/15">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Solar Engineering Hub • Technical Guides & Policies</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Solar Knowledge &{" "}
              <span className="text-[#ea580c]">
                Engineering Insights
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
              Practical techno-commercial analyses, regulatory guides, and power electronics tutorials written by our Pune engineering desk.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN BLOG CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16 space-y-12">
        {/* Featured Post Card */}
        {featuredPost && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 relative h-72 sm:h-96 w-full overflow-hidden">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#091e3a]/90 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow-md">
                    <Sparkles className="w-3 h-3 text-[#ea580c]" />
                    <span>Featured Deep Dive</span>
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 space-y-4">
                <div className="flex items-center gap-3 text-xs text-[#ea580c] font-bold">
                  <span className="bg-orange-50 text-[#ea580c] border border-orange-200 px-2.5 py-0.5 rounded-full">
                    {featuredPost.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-gray-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-[#091e3a] tracking-tight group-hover:text-[#ea580c] transition-colors leading-snug">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-sm text-[#5c5c5c] leading-relaxed line-clamp-3">
                  {featuredPost.summary}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-gray-100 text-xs">
                  <div>
                    <div className="font-bold text-gray-900">{featuredPost.author}</div>
                    <div className="text-[11px] text-gray-500">{featuredPost.authorRole}</div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ea580c] text-white font-bold text-xs hover:bg-[#c2410c] transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-200">
            <h3 className="text-xl sm:text-2xl font-black text-[#091e3a]">
              Latest Engineering Guides
            </h3>
            <span className="text-xs text-[#5c5c5c] font-semibold">
              {blogs.length} Technical Publications
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-[#ea580c]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#091e3a]/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h4 className="text-lg font-black text-[#091e3a] group-hover:text-[#ea580c] transition-colors leading-snug line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h4>

                    <p className="text-xs text-[#5c5c5c] leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-100 flex items-center justify-between mt-4">
                  <span className="text-[11px] font-semibold text-gray-600 truncate max-w-[180px]">
                    {post.author}
                  </span>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#ea580c] group-hover:underline"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Engineering Consultation Callout */}
        <div className="bg-[#091e3a] border border-gray-800 text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ea580c]">
              Direct Engineering Consultation
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Need Custom System Sizing or SLD Review?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
              Our Pune engineering desk helps EPC contractors, factories, and consultants with harmonic audits, PVsyst simulation files, and official turnkey quotes.
            </p>
            <div className="pt-2">
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 bg-[#ea580c] hover:bg-[#c2410c] text-white px-7 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                <span>Launch Sizing Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
