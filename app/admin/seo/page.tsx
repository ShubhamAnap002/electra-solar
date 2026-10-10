"use client";

import React, { useState, useEffect } from "react";
import {
  Globe,
  Save,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileText,
  Sliders,
  Eye,
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
        <Loader2 className="w-9 h-9 animate-spin text-[#ea580c] mb-3" />
        <p className="text-xs font-semibold">Loading search engine indexing configuration...</p>
      </div>
    );
  }

  if (!seo) {
    return (
      <div className="p-8 text-center bg-rose-50 border border-rose-200 rounded-2xl max-w-lg mx-auto my-12 space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h3 className="text-lg font-bold text-[#091e3a]">Unable to Load SEO</h3>
        <p className="text-xs text-gray-600">{errorMessage || "Server error"}</p>
        <button
          onClick={fetchSeo}
          className="px-5 py-2 rounded-xl bg-[#091e3a] text-white text-xs font-bold hover:bg-[#07172c] transition-colors cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-orange-50 text-[#ea580c] font-bold text-xs uppercase tracking-wider border border-orange-200">
              Visibility Engine
            </span>
            <span className="text-xs text-gray-500 font-semibold">
              {seo.pages.length} Pages Configured
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#091e3a] mt-1">SEO & Search Visibility</h1>
          <p className="text-xs text-gray-600 mt-1">
            Manage page meta titles, SERP snippets, OpenGraph descriptions, canonical URLs, and indexing.
          </p>
        </div>

        <button
          onClick={() => handleSave()}
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer w-full sm:w-auto"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save SEO Settings</span>
        </button>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-emerald-700 hover:text-emerald-900 cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-rose-700 hover:text-rose-900 cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab("pages")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "pages"
              ? "bg-[#091e3a] text-white shadow-sm"
              : "text-gray-500 hover:text-gray-900 hover:bg-slate-100"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Page-by-Page Metadata ({seo.pages.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("global")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "global"
              ? "bg-[#091e3a] text-white shadow-sm"
              : "text-gray-500 hover:text-gray-900 hover:bg-slate-100"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Global Defaults & Verification</span>
        </button>
      </div>

      {/* GLOBAL SETTINGS */}
      {activeTab === "global" && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-sm font-bold text-[#091e3a]">Global Meta Defaults</h2>
            <p className="text-xs text-gray-500">Fallback values applied across pages when custom tags are omitted</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Default Site Title
              </label>
              <input
                type="text"
                value={seo.siteTitle}
                onChange={(e) => setSeo({ ...seo, siteTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Default Meta Description
              </label>
              <textarea
                rows={3}
                value={seo.defaultDescription}
                onChange={(e) => setSeo({ ...seo, defaultDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
              />
              <span className="text-[11px] text-gray-500 mt-1 block">
                Length: {seo.defaultDescription.length} characters (Recommended: 140–160 chars)
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Global Keywords
              </label>
              <input
                type="text"
                value={seo.keywords}
                onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Social Share Card Image (OG Image)
                </label>
                <input
                  type="text"
                  value={seo.ogImage}
                  onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 font-mono focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Google Search Console Verification Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. google-site-verification=abc..."
                  value={seo.googleSiteVerification}
                  onChange={(e) => setSeo({ ...seo, googleSiteVerification: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 font-mono focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
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
          <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search page..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-1 max-h-[620px] overflow-y-auto pr-1">
              {filteredPages.map((page) => {
                const isSelected = page.path === editingPagePath;
                return (
                  <button
                    key={page.path}
                    onClick={() => setEditingPagePath(page.path)}
                    className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer ${
                      isSelected
                        ? "bg-orange-50 border border-orange-200 text-[#091e3a]"
                        : "hover:bg-slate-50 text-gray-700 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold ${isSelected ? "text-[#ea580c]" : "text-gray-900"}`}>
                        {page.name}
                      </span>
                      {page.noIndex ? (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-50 text-rose-600 font-mono border border-rose-200">
                          noindex
                        </span>
                      ) : (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">
                          index
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-gray-500 truncate block">{page.path}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected page editor */}
          <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
            {currentPage ? (
              <>
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="text-base font-bold text-[#091e3a]">{currentPage.name}</h2>
                    <span className="text-xs font-mono text-[#ea580c]">{currentPage.path}</span>
                  </div>
                  <a
                    href={currentPage.path}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#ea580c] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Visit Live Page</span>
                  </a>
                </div>

                {/* Google SERP Snippet Preview */}
                <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <Eye className="w-3.5 h-3.5 text-[#ea580c]" />
                    <span className="font-bold text-gray-700">Google SERP Snippet Preview</span>
                  </div>
                  <div className="text-xs font-mono text-emerald-700 truncate">
                    {currentPage.canonical || `https://electrasolar.in${currentPage.path}`}
                  </div>
                  <div className="text-base font-medium text-[#1a0dab] hover:underline cursor-pointer truncate">
                    {currentPage.title || seo.siteTitle}
                  </div>
                  <div className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                    {currentPage.description || seo.defaultDescription}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Page Meta Title
                      </label>
                      <span
                        className={`text-[11px] ${
                          (currentPage.title?.length || 0) > 60 ? "text-amber-600 font-bold" : "text-gray-500"
                        }`}
                      >
                        {currentPage.title?.length || 0} / 60 characters
                      </span>
                    </div>
                    <input
                      type="text"
                      value={currentPage.title}
                      onChange={(e) => updateCurrentPage("title", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Meta Description
                      </label>
                      <span
                        className={`text-[11px] ${
                          (currentPage.description?.length || 0) > 160 ? "text-amber-600 font-bold" : "text-gray-500"
                        }`}
                      >
                        {currentPage.description?.length || 0} / 160 characters
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={currentPage.description}
                      onChange={(e) => updateCurrentPage("description", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Canonical URL
                    </label>
                    <input
                      type="url"
                      value={currentPage.canonical}
                      onChange={(e) => updateCurrentPage("canonical", e.target.value)}
                      placeholder="https://electrasolar.in/..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 font-mono focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Target Keywords
                    </label>
                    <input
                      type="text"
                      value={currentPage.keywords}
                      onChange={(e) => updateCurrentPage("keywords", e.target.value)}
                      placeholder="comma separated keywords"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Indexing Switch */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Search Engine Indexing</h4>
                      <p className="text-[11px] text-gray-500">
                        When disabled (noindex), Google and search bots will ignore this page.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => updateCurrentPage("noIndex", !currentPage.noIndex)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        !currentPage.noIndex
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-rose-100 text-rose-800 border border-rose-300"
                      }`}
                    >
                      {!currentPage.noIndex ? "Indexed (Index, Follow)" : "Hidden (NoIndex, NoFollow)"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">Select a page on the left to edit its metadata.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
