"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Save,
  ExternalLink,
  Sparkles,
  Shield,
  Layers,
  Phone,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { SiteContent } from "@/lib/store";
import { authFetch } from "@/lib/auth/client";

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"hero" | "why" | "applications" | "banner" | "company">("hero");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    try {
      setLoading(true);
      const res = await authFetch("/api/admin/content");
      const data = await res.json();
      if (data.success && data.content) {
        setContent(data.content);
      } else {
        setErrorMessage(data.message || "Failed to load content");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to load content");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!content) return;

    setIsSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await authFetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to save content");
      }

      setSuccessMessage("Website content updated successfully! Public pages reflect your changes.");
    } catch (err: any) {
      setErrorMessage(err.message || "Error saving content");
    } finally {
      setIsSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-400 mb-4" />
        <p className="text-sm font-medium">Loading website copy & sections...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="p-8 text-center bg-rose-500/10 border border-rose-500/30 rounded-2xl max-w-lg mx-auto my-12">
        <AlertCircle className="w-10 h-10 text-rose-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-2">Unable to Load Content</h3>
        <p className="text-xs text-slate-300 mb-4">{errorMessage || "Server error"}</p>
        <button
          onClick={fetchContent}
          className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Website Content CMS</h1>
            <p className="text-xs text-slate-400">
              Edit homepage copy, banners, pillars, and corporate contact details
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700/60 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Preview Website
          </Link>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-medium text-sm shadow-lg shadow-cyan-950/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>
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

      {/* Section Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: "hero", label: "Homepage Hero", icon: Sparkles },
          { id: "why", label: "Why Electra Solar", icon: Shield },
          { id: "applications", label: "Applications", icon: Layers },
          { id: "banner", label: "CTA Banner", icon: FileText },
          { id: "company", label: "Company & Contact", icon: Phone },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Forms Area */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: HERO */}
        {activeTab === "hero" && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800/80 pb-4">
              <h2 className="text-base font-bold text-white">Homepage Hero Section</h2>
              <p className="text-xs text-slate-400">Top visible area with primary value proposition and metrics</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hero Eyebrow Badge</label>
                <input
                  type="text"
                  value={content.hero.badge}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, badge: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hero Headline (Prefix)</label>
                  <input
                    type="text"
                    value={content.hero.headline}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, headline: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Headline Highlight (Colored)</label>
                  <input
                    type="text"
                    value={content.hero.headlineHighlight}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, headlineHighlight: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-cyan-400 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hero Subheadline</label>
                <textarea
                  rows={3}
                  value={content.hero.subheadline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, subheadline: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Button Text</label>
                  <input
                    type="text"
                    value={content.hero.primaryCtaText}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, primaryCtaText: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Button URL</label>
                  <input
                    type="text"
                    value={content.hero.primaryCtaLink}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, primaryCtaLink: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Secondary Button Text</label>
                  <input
                    type="text"
                    value={content.hero.secondaryCtaText}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, secondaryCtaText: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Secondary Button URL</label>
                  <input
                    type="text"
                    value={content.hero.secondaryCtaLink}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, secondaryCtaLink: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="pt-4 border-t border-slate-800/80">
              <label className="block text-xs font-semibold text-slate-300 mb-3">Hero Highlights (4 Badges)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {content.hero.highlights.map((hl, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">Title</span>
                      <input
                        type="text"
                        value={hl.title}
                        onChange={(e) => {
                          const updated = [...content.hero.highlights];
                          updated[idx].title = e.target.value;
                          setContent({ ...content, hero: { ...content.hero, highlights: updated } });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-cyan-400"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">Subtitle</span>
                      <input
                        type="text"
                        value={hl.subtitle}
                        onChange={(e) => {
                          const updated = [...content.hero.highlights];
                          updated[idx].subtitle = e.target.value;
                          setContent({ ...content, hero: { ...content.hero, highlights: updated } });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WHY ELECTRA */}
        {activeTab === "why" && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800/80 pb-4">
              <h2 className="text-base font-bold text-white">Why Electra Solar Section</h2>
              <p className="text-xs text-slate-400">Core engineering differentiators and value pillars</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Badge</label>
                <input
                  type="text"
                  value={content.whyElectra.badge}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      whyElectra: { ...content.whyElectra, badge: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Headline</label>
                <input
                  type="text"
                  value={content.whyElectra.headline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      whyElectra: { ...content.whyElectra, headline: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Description</label>
              <textarea
                rows={3}
                value={content.whyElectra.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    whyElectra: { ...content.whyElectra, description: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-3">
              <label className="block text-xs font-semibold text-slate-300">Key Feature Bullets</label>
              <div>
                <span className="text-[11px] text-slate-500">Bullet 1</span>
                <input
                  type="text"
                  value={content.whyElectra.bullet1}
                  onChange={(e) =>
                    setContent({ ...content, whyElectra: { ...content.whyElectra, bullet1: e.target.value } })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-500">Bullet 2</span>
                <input
                  type="text"
                  value={content.whyElectra.bullet2}
                  onChange={(e) =>
                    setContent({ ...content, whyElectra: { ...content.whyElectra, bullet2: e.target.value } })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-500">Bullet 3</span>
                <input
                  type="text"
                  value={content.whyElectra.bullet3}
                  onChange={(e) =>
                    setContent({ ...content, whyElectra: { ...content.whyElectra, bullet3: e.target.value } })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <label className="block text-xs font-semibold text-slate-300 mb-3">Key Stats (Counters)</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {content.whyElectra.stats.map((st, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div>
                      <span className="text-[10px] text-slate-500">Value (e.g. 10+)</span>
                      <input
                        type="text"
                        value={st.value}
                        onChange={(e) => {
                          const updated = [...content.whyElectra.stats];
                          updated[idx].value = e.target.value;
                          setContent({ ...content, whyElectra: { ...content.whyElectra, stats: updated } });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-cyan-400"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500">Label</span>
                      <input
                        type="text"
                        value={st.label}
                        onChange={(e) => {
                          const updated = [...content.whyElectra.stats];
                          updated[idx].label = e.target.value;
                          setContent({ ...content, whyElectra: { ...content.whyElectra, stats: updated } });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: APPLICATIONS */}
        {activeTab === "applications" && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800/80 pb-4">
              <h2 className="text-base font-bold text-white">Application Showcases</h2>
              <p className="text-xs text-slate-400">Target sectors and architectural solutions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Headline</label>
                <input
                  type="text"
                  value={content.applications.headline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      applications: { ...content.applications, headline: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Subtitle</label>
                <input
                  type="text"
                  value={content.applications.subtitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      applications: { ...content.applications, subtitle: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <label className="block text-xs font-semibold text-slate-300 mb-3">Application Sectors (4 Cards)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.applications.sectors.map((sec, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-400">{sec.title}</span>
                      <span className="text-[11px] text-slate-500">{sec.subtitle}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div>
                        <span className="text-[10px] text-slate-500">Title</span>
                        <input
                          type="text"
                          value={sec.title}
                          onChange={(e) => {
                            const updated = [...content.applications.sectors];
                            updated[idx].title = e.target.value;
                            setContent({ ...content, applications: { ...content.applications, sectors: updated } });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500">Subtitle</span>
                        <input
                          type="text"
                          value={sec.subtitle}
                          onChange={(e) => {
                            const updated = [...content.applications.sectors];
                            updated[idx].subtitle = e.target.value;
                            setContent({ ...content, applications: { ...content.applications, sectors: updated } });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
                        />
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500">Description</span>
                      <textarea
                        rows={2}
                        value={sec.desc}
                        onChange={(e) => {
                          const updated = [...content.applications.sectors];
                          updated[idx].desc = e.target.value;
                          setContent({ ...content, applications: { ...content.applications, sectors: updated } });
                        }}
                        className="w-full mt-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500">Image URL</span>
                      <input
                        type="text"
                        value={sec.image}
                        onChange={(e) => {
                          const updated = [...content.applications.sectors];
                          updated[idx].image = e.target.value;
                          setContent({ ...content, applications: { ...content.applications, sectors: updated } });
                        }}
                        className="w-full mt-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BANNER */}
        {activeTab === "banner" && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800/80 pb-4">
              <h2 className="text-base font-bold text-white">Switch to Solar CTA Banner</h2>
              <p className="text-xs text-slate-400">High-converting call to action banner on the homepage</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Top Eyebrow Badge</label>
                <input
                  type="text"
                  value={content.switchToSolarBanner.badge}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      switchToSolarBanner: { ...content.switchToSolarBanner, badge: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Banner Main Headline</label>
                <input
                  type="text"
                  value={content.switchToSolarBanner.headline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      switchToSolarBanner: { ...content.switchToSolarBanner, headline: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Banner Subtitle</label>
                <textarea
                  rows={3}
                  value={content.switchToSolarBanner.subtitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      switchToSolarBanner: { ...content.switchToSolarBanner, subtitle: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">CTA Button Label</label>
                <input
                  type="text"
                  value={content.switchToSolarBanner.ctaText}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      switchToSolarBanner: { ...content.switchToSolarBanner, ctaText: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: COMPANY & CONTACT */}
        {activeTab === "company" && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800/80 pb-4">
              <h2 className="text-base font-bold text-white">Company Information & Contact Coordinates</h2>
              <p className="text-xs text-slate-400">Official business address, phone, email, and footer parameters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Brand Name</label>
                <input
                  type="text"
                  value={content.company.name}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      company: { ...content.company, name: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tagline</label>
                <input
                  type="text"
                  value={content.company.tagline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      company: { ...content.company, tagline: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-4">
              <h3 className="text-xs font-bold text-slate-200">Phone Contacts</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Sales Phone 1</label>
                  <input
                    type="text"
                    value={content.company.contact.salesPhone1}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        company: {
                          ...content.company,
                          contact: { ...content.company.contact, salesPhone1: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Sales Phone 2</label>
                  <input
                    type="text"
                    value={content.company.contact.salesPhone2}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        company: {
                          ...content.company,
                          contact: { ...content.company.contact, salesPhone2: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Support Phone</label>
                  <input
                    type="text"
                    value={content.company.contact.supportPhone}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        company: {
                          ...content.company,
                          contact: { ...content.company.contact, supportPhone: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Sales Inquiries Email</label>
                  <input
                    type="email"
                    value={content.company.contact.salesEmail}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        company: {
                          ...content.company,
                          contact: { ...content.company.contact, salesEmail: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Support Email</label>
                  <input
                    type="email"
                    value={content.company.contact.supportEmail}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        company: {
                          ...content.company,
                          contact: { ...content.company.contact, supportEmail: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Headquarters Address</label>
                <textarea
                  rows={2}
                  value={content.company.contact.headquartersAddress}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      company: {
                        ...content.company,
                        contact: { ...content.company.contact, headquartersAddress: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-medium text-sm shadow-lg shadow-cyan-950/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save All Changes
          </button>
        </div>
      </form>
    </div>
  );
}
