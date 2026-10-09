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
  AlertTriangle,
} from "lucide-react";
import {
  getStoredProducts,
  getStoredCategories,
  getStoredGmailConfig,
  getActivityLogs,
} from "@/lib/store";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const products = getStoredProducts();
  const categories = getStoredCategories();
  const gmailConfig = getStoredGmailConfig();
  const activityLogs = getActivityLogs().slice(0, 8);

  const publishedCount = products.length;
  const categoriesCount = categories.length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#091e3a] via-[#0b2144] to-[#015cbb] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00d2ff]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#00d2ff] text-xs font-bold border border-white/15">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Production Control Center</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Electra Solar Admin Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Manage all commercial product catalogues, technical specifications, homepage content, media files, and official Gmail OAuth delivery.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/products/new"
              className="bg-[#00d2ff] hover:bg-[#00b4d8] text-[#091e3a] px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </Link>

            <Link
              href="/admin/content"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 flex-shrink-0"
            >
              <FileText className="w-4 h-4 text-[#00d2ff]" />
              <span>Edit Content</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Content & System Metrics (Strictly no leads/enquiries) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Products Stat */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Total Products
            </div>
            <div className="text-3xl font-black text-gray-900 mt-1">
              {publishedCount}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Active in catalogue</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#015cbb] flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Categories Stat */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Product Categories
            </div>
            <div className="text-3xl font-black text-gray-900 mt-1">
              {categoriesCount}
            </div>
            <div className="text-[11px] text-gray-500 font-medium mt-1">
              Hybrid, BESS, UPS, etc.
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-50 text-[#00b4d8] flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Static Pages Monitored */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Pre-rendered Pages
            </div>
            <div className="text-3xl font-black text-gray-900 mt-1">
              40
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">
              SSG Full Coverage
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
        </div>

        {/* Gmail OAuth Integration Status */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Gmail OAuth Status
            </div>
            <div className="text-lg font-black text-gray-900 mt-1 flex items-center gap-1.5">
              {gmailConfig.isConnected ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-700 text-sm truncate max-w-[120px]">
                    {gmailConfig.connectedEmail || "Connected"}
                  </span>
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-amber-700 text-sm">Disconnected</span>
                </>
              )}
            </div>
            <div className="text-[11px] text-gray-500 mt-1">
              {gmailConfig.isConnected ? (
                <span className="text-emerald-600 font-medium">Auto-delivering form emails</span>
              ) : (
                <Link href="/admin/email" className="text-[#015cbb] hover:underline font-bold">
                  Connect Gmail &rarr;
                </Link>
              )}
            </div>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            gmailConfig.isConnected ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
          }`}>
            <Mail className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/products"
          className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs hover:shadow-md hover:border-[#015cbb]/50 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#015cbb] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">
              Product Management
            </h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Add new inverters, batteries, and accessories. Edit technical specifications, model codes, and capacity tiers.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#015cbb]">
            <span>Manage Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/admin/content"
          className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs hover:shadow-md hover:border-[#015cbb]/50 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#00b4d8] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">
              Website Content CMS
            </h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Update homepage headlines, call-to-action buttons, trust badges, Why Electra Solar metrics, and company contact details.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#00b4d8]">
            <span>Edit Content</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/admin/email"
          className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs hover:shadow-md hover:border-[#015cbb]/50 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">
              Gmail & Form Delivery
            </h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Configure Google OAuth 2.0 authorization, destination email address, test email delivery, and form routing.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-emerald-600">
            <span>Configure Email</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Activity Logs & Quick Links Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Administrative Updates Log (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-900 text-sm">
                Recent Administrative Activity
              </h3>
              <p className="text-xs text-gray-500">
                Audit trail of recent catalogue and content updates
              </p>
            </div>
            <Clock className="w-4 h-4 text-gray-400" />
          </div>

          <div className="space-y-3">
            {activityLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{log.action}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-[#015cbb]">
                      {log.module}
                    </span>
                  </div>
                  <div className="text-gray-600 text-[11px]">{log.details}</div>
                </div>
                <div className="text-[10px] text-gray-400 text-right whitespace-nowrap pl-3">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System & Operations Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Settings & Tools */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-gray-900 text-sm">
              Quick Management Shortcuts
            </h3>

            <div className="space-y-2">
              <Link
                href="/admin/categories"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-gray-200 transition-all text-xs font-semibold text-gray-700"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-[#015cbb]" />
                  <span>Category Hierarchy</span>
                </div>
                <span className="text-[11px] text-gray-400">{categoriesCount} Categories</span>
              </Link>

              <Link
                href="/admin/media"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-gray-200 transition-all text-xs font-semibold text-gray-700"
              >
                <div className="flex items-center gap-2.5">
                  <ImageIcon className="w-4 h-4 text-[#00b4d8]" />
                  <span>Media Assets Library</span>
                </div>
                <span className="text-[11px] text-gray-400">Upload Files &rarr;</span>
              </Link>

              <Link
                href="/admin/seo"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-gray-200 transition-all text-xs font-semibold text-gray-700"
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-purple-600" />
                  <span>Search Engine Meta Tags</span>
                </div>
                <span className="text-[11px] text-gray-400">Sitemap & Meta &rarr;</span>
              </Link>
            </div>
          </div>

          {/* Form Routing Notice */}
          <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-5 text-xs text-gray-700 space-y-2">
            <div className="font-bold text-[#015cbb] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Direct Gmail Form Architecture</span>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              All website visitor quote requests, consultations, and contact messages are dispatched directly to your configured Electra Solar Gmail inbox. Form submissions are never persisted in a CRM database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
