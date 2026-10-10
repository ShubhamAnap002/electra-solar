import React from "react";
import Link from "next/link";
import {
  Package,
  Layers,
  FileText,
  Image as ImageIcon,
  Globe,
  Mail,
  Plus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  BookOpen,
  Briefcase,
  Zap,
} from "lucide-react";
import {
  getStoredProducts,
  getStoredCategories,
  getStoredBlogPosts,
  getStoredProjects,
  getStoredGmailConfig,
  getActivityLogs,
} from "@/lib/store";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const products = getStoredProducts();
  const categories = getStoredCategories();
  const blogs = getStoredBlogPosts();
  const projects = getStoredProjects();
  const gmailConfig = getStoredGmailConfig();
  const activityLogs = getActivityLogs().slice(0, 8);

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Welcome Banner - Daylight Navy + Solar Orange */}
      <div className="bg-[#091e3a] text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-400 text-xs font-bold border border-white/15">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Master Website CMS & Production Control</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Electra Solar Admin Console
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Full WordPress-style control over products, technical specifications, articles, turnkey installations, homepage hero & FAQs, media uploads, and lead delivery.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/blogs/new"
              className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-1.5 flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>New Article</span>
            </Link>

            <Link
              href="/admin/projects/new"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 flex-shrink-0"
            >
              <Briefcase className="w-4 h-4 text-orange-400" />
              <span>Add Project</span>
            </Link>

            <Link
              href="/admin/products/new"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 flex-shrink-0"
            >
              <Package className="w-4 h-4 text-orange-400" />
              <span>Add Product</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 5 Content Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Products Stat */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Hardware Products
            </div>
            <div className="text-3xl font-black text-[#091e3a] mt-1">
              {products.length}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Inverters & BESS</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#ea580c] flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Blog Knowledge Hub Stat */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Blog Articles
            </div>
            <div className="text-3xl font-black text-[#091e3a] mt-1">
              {blogs.length}
            </div>
            <div className="text-[11px] text-gray-500 font-medium mt-1">
              Technical Guides & Policies
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#091e3a] flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Commissioned Sites Stat */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Commissioned Sites
            </div>
            <div className="text-3xl font-black text-[#091e3a] mt-1">
              {projects.length}
            </div>
            <div className="text-[11px] text-gray-500 font-medium mt-1">
              Turnkey Case Studies
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        {/* Gmail Lead Sync Status */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Gmail Lead Sync
            </div>
            <div className="text-base font-black text-gray-900 mt-1 flex items-center gap-1.5">
              {gmailConfig.isConnected ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-700 text-xs truncate max-w-[120px]">
                    {gmailConfig.connectedEmail || "Connected"}
                  </span>
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-amber-700 text-xs">Disconnected</span>
                </>
              )}
            </div>
            <div className="text-[11px] text-gray-500 mt-1">
              {gmailConfig.isConnected ? (
                <span className="text-emerald-600 font-medium">Auto-dispatch active</span>
              ) : (
                <Link href="/admin/email" className="text-[#ea580c] hover:underline font-bold">
                  Connect Gmail &rarr;
                </Link>
              )}
            </div>
          </div>
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              gmailConfig.isConnected
                ? "bg-emerald-50 text-emerald-600"
                : "bg-amber-50 text-amber-600"
            }`}
          >
            <Mail className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Master Action Cards Grid (6 Modules) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Products */}
        <Link
          href="/admin/products"
          className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:border-[#ea580c]/50 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#ea580c] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#091e3a] text-base">
              Product Catalogue
            </h3>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Add new inverters, batteries, and accessories. Edit specifications, model codes, and capacity tiers.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#ea580c]">
            <span>Manage Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Blogs */}
        <Link
          href="/admin/blogs"
          className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:border-[#ea580c]/50 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#091e3a] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#091e3a] text-base">
              Blog & Knowledge Hub
            </h3>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Publish technical guides, PM Surya Ghar subsidy rules, C&I sizing studies, and BESS insights.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#ea580c]">
            <span>Manage Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Projects */}
        <Link
          href="/admin/projects"
          className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:border-[#ea580c]/50 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#091e3a] text-base">
              Turnkey Installations
            </h3>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Showcase commissioned industrial sites across Chakan, Hinjawadi, and Lonavala with real impact metrics.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#ea580c]">
            <span>Manage Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Content & FAQs */}
        <Link
          href="/admin/content"
          className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:border-[#ea580c]/50 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#091e3a] text-base">
              Website Content & FAQs
            </h3>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Update homepage hero copy, headline highlights, CTA banners, contact coordinates, and technical FAQs.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#ea580c]">
            <span>Edit Content & FAQs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Media Library */}
        <Link
          href="/admin/media"
          className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:border-[#ea580c]/50 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#091e3a] text-base">
              Media & Image Library
            </h3>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Upload equipment photos, case study shots, and diagrams with instant URL copy and preview.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#ea580c]">
            <span>Browse Library</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* SEO */}
        <Link
          href="/admin/seo"
          className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:border-[#ea580c]/50 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#091e3a] text-base">
              SEO & Meta Tags
            </h3>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Fine-tune page meta titles, OpenGraph images, canonical URLs, and Google site verification tokens.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#ea580c]">
            <span>Optimize Meta Tags</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Activity Audit Trail */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#ea580c]" />
            <h3 className="font-bold text-[#091e3a] text-sm">
              Recent CMS Activity Audit Trail
            </h3>
          </div>
          <span className="text-[11px] text-gray-500 font-semibold">
            Last {activityLogs.length} actions
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {activityLogs.map((log) => (
            <div key={log.id} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[#091e3a] font-bold text-[10px] uppercase tracking-wider border border-gray-200">
                  {log.module}
                </span>
                <span className="font-semibold text-gray-800">{log.action}:</span>
                <span className="text-gray-600 max-w-xl truncate">{log.details}</span>
              </div>
              <span className="text-gray-400 font-mono text-[10px] hidden sm:inline">
                {new Date(log.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
