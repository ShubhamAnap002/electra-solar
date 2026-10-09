"use client";

import React, { useState, useEffect } from "react";
import {
  Globe,
  Save,
  Search,
  ExternalLink,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileText,
  Sliders,
  Check,
  Eye,
  ShieldCheck,
} from "lucide-react";
import { SeoConfig } from "@/lib/store";
import { authFetch } from "@/lib/auth/client";

export default function AdminSeoPage() {
  const [seo, setSeo] = useState<SeoConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"global" | "pages">("pages");
  const [search, setSearch] = useState("");
  const [editingPagePath, setEditingPagePath] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchSeo();
  }, []);

  async function fetchSeo() {
    try {
      setLoading(true);
      const res = await authFetch("/api/admin/seo");
      const data = await res.json();
      if (data.success && data.seo) {
        setSeo(data.seo);
        if (data.seo.pages?.length > 0) {
          setEditingPagePath(data.seo.pages[0].path);
        }
      } else {
        setErrorMessage(data.message || "Failed to load SEO configuration");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to load SEO configuration");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!seo) return;

    setIsSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await authFetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seo),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to save SEO config");
      }

      setSuccessMessage("SEO metadata updated successfully!");
    } catch (err: any) {
      setErrorMessage(err.message || "Error saving SEO config");
    } finally {
      setIsSaving(false);
    }
  }

  const currentPage = seo?.pages.find((p) => p.path === editingPagePath);

  const updateCurrentPage = (field: string, val: any) => {
    if (!seo || !currentPage) return;
    const updatedPages = seo.pages.map((p) => {
      if (p.path === editingPagePath) {
        return { ...p, [field]: val };
      }
      return p;
    });
    setSeo({ ...seo, pages: updatedPages });
  };

  const filteredPages = (seo?.pages || []).filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.path.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-400 mb-4" />
        <p className="text-sm font-medium">Loading search engine indexing configuration...</p>
      </div>
    );
  }

  if (!seo) {
    return (
      <div className="p-8 text-center bg-rose-500/10 border border-rose-500/30 rounded-2xl max-w-lg mx-auto my-12">
        <AlertCircle className="w-10 h-10 text-rose-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-2">Unable to Load SEO</h3>
        <p className="text-xs text-slate-300 mb-4">{errorMessage || "Server error"}</p>
        <button
          onClick={fetchSeo}
          className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">SEO & Search Visibility</h1>
            <p className="text-xs text-slate-400">
              Manage page titles, SERP snippets, meta descriptions, and Google indexing
            </p>
          </div>
        </div>

        <button
          onClick={() => handleSave()}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-medium text-sm shadow-lg shadow-cyan-950/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save SEO Settings
        </button>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-emerald-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-rose-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("pages")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "pages"
              ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm"
              : "text-slate-400 hover:text-white hover:bg-slate-800/50"
          }`}
        >
          <FileText className="w-4 h-4" />
          Page-by-Page Metadata
        </button>
        <button
          onClick={() => setActiveTab("global")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "global"
              ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm"
              : "text-slate-400 hover:text-white hover:bg-slate-800/50"
          }`}
        >
          <Sliders className="w-4 h-4" />
          Global SEO Defaults
        </button>
      </div>

      {/* GLOBAL SETTINGS */}
      {activeTab === "global" && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800/80 pb-4">
            <h2 className="text-base font-bold text-white">Global Meta Defaults</h2>
            <p className="text-xs text-slate-400">Fallback values applied across pages when custom tags are omitted</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Default Site Title</label>
              <input
                type="text"
                value={seo.siteTitle}
                onChange={(e) => setSeo({ ...seo, siteTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Default Meta Description</label>
              <textarea
                rows={3}
                value={seo.defaultDescription}
                onChange={(e) => setSeo({ ...seo, defaultDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
              />
              <span className="text-[11px] text-slate-500">
                Length: {seo.defaultDescription.length} characters (Recommended: 140–160 chars)
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Global Keywords</label>
              <input
                type="text"
                value={seo.keywords}
                onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Social Share Card Image (OG)</label>
                <input
                  type="text"
                  value={seo.ogImage}
                  onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Google Search Console Verification Tag</label>
                <input
                  type="text"
                  placeholder="e.g. google-site-verification=abc..."
                  value={seo.googleSiteVerification}
                  onChange={(e) => setSeo({ ...seo, googleSiteVerification: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGE-BY-PAGE METADATA */}
      {activeTab === "pages" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Pages list */}
          <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search page..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1 max-h-[600px] overflow-y-auto pr-1">
              {filteredPages.map((page) => {
                const isSelected = page.path === editingPagePath;
                return (
                  <button
                    key={page.path}
                    onClick={() => setEditingPagePath(page.path)}
                    className={`w-full text-left p-3 rounded-xl transition-all ${
                      isSelected
                        ? "bg-cyan-500/15 border border-cyan-500/30 text-white"
                        : "hover:bg-slate-800/60 text-slate-400 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-semibold ${isSelected ? "text-cyan-300" : "text-white"}`}>
                        {page.name}
                      </span>
                      {page.noIndex ? (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono">
                          noindex
                        </span>
                      ) : (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                          index
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 truncate block">{page.path}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected page editor */}
          <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
            {currentPage ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <div>
                    <h2 className="text-base font-bold text-white">{currentPage.name}</h2>
                    <span className="text-xs font-mono text-cyan-400">{currentPage.path}</span>
                  </div>
                  <a
                    href={currentPage.path}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Visit Live Page
                  </a>
                </div>

                {/* Google SERP Snippet Preview */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-semibold text-slate-300">Google Search Preview</span>
                  </div>
                  <div className="text-xs font-mono text-emerald-400 truncate">
                    {currentPage.canonical || `https://electrasolar.in${currentPage.path}`}
                  </div>
                  <div className="text-base font-medium text-blue-400 hover:underline cursor-pointer truncate">
                    {currentPage.title || seo.siteTitle}
                  </div>
                  <div className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {currentPage.description || seo.defaultDescription}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-300">Page Meta Title</label>
                      <span
                        className={`text-[11px] ${
                          (currentPage.title?.length || 0) > 60 ? "text-amber-400" : "text-slate-500"
                        }`}
                      >
                        {currentPage.title?.length || 0} / 60 characters
                      </span>
                    </div>
                    <input
                      type="text"
                      value={currentPage.title}
                      onChange={(e) => updateCurrentPage("title", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-300">Meta Description</label>
                      <span
                        className={`text-[11px] ${
                          (currentPage.description?.length || 0) > 160 ? "text-amber-400" : "text-slate-500"
                        }`}
                      >
                        {currentPage.description?.length || 0} / 160 characters
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={currentPage.description}
                      onChange={(e) => updateCurrentPage("description", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Canonical URL</label>
                    <input
                      type="url"
                      value={currentPage.canonical}
                      onChange={(e) => updateCurrentPage("canonical", e.target.value)}
                      placeholder="https://electrasolar.in/..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Keywords</label>
                    <input
                      type="text"
                      value={currentPage.keywords}
                      onChange={(e) => updateCurrentPage("keywords", e.target.value)}
                      placeholder="comma separated keywords"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Indexing Switch */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">Search Engine Indexing</h4>
                      <p className="text-[11px] text-slate-400">
                        When disabled (noindex), Google and search bots will ignore this page.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => updateCurrentPage("noIndex", !currentPage.noIndex)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        !currentPage.noIndex
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                      }`}
                    >
                      {!currentPage.noIndex ? "Indexed (Index, Follow)" : "Hidden (NoIndex, NoFollow)"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-slate-500">Select a page on the left to edit its metadata.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
