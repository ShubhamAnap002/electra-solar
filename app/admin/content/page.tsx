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
  HelpCircle,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
} from "lucide-react";
import { SiteContent } from "@/lib/store";
import { authFetch } from "@/lib/auth/client";

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "hero" | "why" | "applications" | "banner" | "company" | "faqs"
  >("hero");
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
        // Ensure company.faqs array exists
        const loadedContent = { ...data.content };
        if (!loadedContent.company.faqs) {
          loadedContent.company.faqs = [];
        }
        setContent(loadedContent);
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

  // FAQ Handlers
  const handleFaqChange = (index: number, field: "question" | "answer" | "category", value: string) => {
    if (!content) return;
    const faqs = [...(content.company.faqs || [])];
    faqs[index] = { ...faqs[index], [field]: value };
    setContent({
      ...content,
      company: { ...content.company, faqs },
    });
  };

  const addFaq = () => {
    if (!content) return;
    setContent({
      ...content,
      company: {
        ...content.company,
        faqs: [
          ...(content.company.faqs || []),
          {
            question: "New Technical FAQ Question",
            answer: "Comprehensive engineering answer and explanation.",
            category: "Technical Specifications",
          },
        ],
      },
    });
  };

  const removeFaq = (index: number) => {
    if (!content) return;
    setContent({
      ...content,
      company: {
        ...content.company,
        faqs: (content.company.faqs || []).filter((_, i) => i !== index),
      },
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
        <Loader2 className="w-9 h-9 animate-spin text-[#ea580c] mb-3" />
        <p className="text-xs font-semibold">Loading website copy & sections...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="p-8 text-center bg-rose-50 border border-rose-200 rounded-2xl max-w-lg mx-auto my-12 space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h3 className="text-lg font-bold text-[#091e3a]">Unable to Load Content</h3>
        <p className="text-xs text-gray-600">{errorMessage || "Server error"}</p>
        <button
          onClick={fetchContent}
          className="px-5 py-2 rounded-xl bg-[#091e3a] text-white text-xs font-bold hover:bg-[#07172c] transition-colors cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl pb-12">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-orange-50 text-[#ea580c] font-bold text-xs uppercase tracking-wider border border-orange-200">
              Live Copy Editor
            </span>
            <span className="text-xs text-gray-500 font-semibold">
              6 Sections Configured
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#091e3a] mt-1">Website Content & FAQs</h1>
          <p className="text-xs text-gray-600 mt-1">
            Edit homepage hero copy, headline highlights, CTA banners, contact coordinates, and technical FAQs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#091e3a] hover:text-[#ea580c] hover:border-[#ea580c]/40 transition-colors shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Preview Website</span>
          </Link>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save All Content</span>
          </button>
        </div>
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

      {/* Section Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
        {[
          { id: "hero", label: "Homepage Hero", icon: Sparkles },
          { id: "why", label: "Why Electra Solar", icon: Shield },
          { id: "applications", label: "Applications", icon: Layers },
          { id: "banner", label: "CTA Banner", icon: FileText },
          { id: "company", label: "Company & Contact", icon: Phone },
          { id: "faqs", label: "Technical FAQs", icon: HelpCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-[#091e3a] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-900 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Forms Area */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: HERO */}
        {activeTab === "hero" && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-sm font-bold text-[#091e3a]">Homepage Hero Section</h2>
              <p className="text-xs text-gray-500">Top visible area with primary value proposition and metrics</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Badge Pill Text
                </label>
                <input
                  type="text"
                  value={content.hero.badge}
                  onChange={(e) =>
                    setContent({ ...content, hero: { ...content.hero, badge: e.target.value } })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Main Headline
                  </label>
                  <input
                    type="text"
                    value={content.hero.headline}
                    onChange={(e) =>
                      setContent({ ...content, hero: { ...content.hero, headline: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Headline Highlight (Orange Emphasis)
                  </label>
                  <input
                    type="text"
                    value={content.hero.headlineHighlight}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, headlineHighlight: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Sub-headline / Paragraph
                </label>
                <textarea
                  rows={3}
                  value={content.hero.subheadline}
                  onChange={(e) =>
                    setContent({ ...content, hero: { ...content.hero, subheadline: e.target.value } })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 leading-relaxed focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Primary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={content.hero.primaryCtaText}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, primaryCtaText: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Primary CTA Link
                  </label>
                  <input
                    type="text"
                    value={content.hero.primaryCtaLink}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, primaryCtaLink: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 font-mono focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WHY ELECTRA */}
        {activeTab === "why" && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-sm font-bold text-[#091e3a]">Why Electra Solar Section</h2>
              <p className="text-xs text-gray-500">Value pillars, engineering credentials, and statistics</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Badge Text
                </label>
                <input
                  type="text"
                  value={content.whyElectra.badge}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      whyElectra: { ...content.whyElectra, badge: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Headline
                </label>
                <input
                  type="text"
                  value={content.whyElectra.headline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      whyElectra: { ...content.whyElectra, headline: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={content.whyElectra.description}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      whyElectra: { ...content.whyElectra, description: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 leading-relaxed focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Feature Bullet 1
                  </label>
                  <input
                    type="text"
                    value={content.whyElectra.bullet1}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        whyElectra: { ...content.whyElectra, bullet1: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Feature Bullet 2
                  </label>
                  <input
                    type="text"
                    value={content.whyElectra.bullet2}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        whyElectra: { ...content.whyElectra, bullet2: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Feature Bullet 3
                  </label>
                  <input
                    type="text"
                    value={content.whyElectra.bullet3}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        whyElectra: { ...content.whyElectra, bullet3: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: APPLICATIONS */}
        {activeTab === "applications" && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-sm font-bold text-[#091e3a]">Application Sectors</h2>
              <p className="text-xs text-gray-500">Residential, Commercial, Industrial, and Utility cards</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={content.applications.headline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      applications: { ...content.applications, headline: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Section Subtitle
                </label>
                <input
                  type="text"
                  value={content.applications.subtitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      applications: { ...content.applications, subtitle: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              {content.applications.sectors.map((sec, idx) => (
                <div key={sec.id} className="p-4 bg-slate-50 border border-gray-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#ea580c] uppercase tracking-wider">
                      Sector {idx + 1}: {sec.id}
                    </span>
                    <span className="text-[11px] font-mono text-gray-500">{sec.href}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={sec.title}
                        onChange={(e) => {
                          const sectors = [...content.applications.sectors];
                          sectors[idx] = { ...sectors[idx], title: e.target.value };
                          setContent({
                            ...content,
                            applications: { ...content.applications, sectors },
                          });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={sec.subtitle}
                        onChange={(e) => {
                          const sectors = [...content.applications.sectors];
                          sectors[idx] = { ...sectors[idx], subtitle: e.target.value };
                          setContent({
                            ...content,
                            applications: { ...content.applications, sectors },
                          });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">Description</label>
                    <input
                      type="text"
                      value={sec.desc}
                      onChange={(e) => {
                        const sectors = [...content.applications.sectors];
                        sectors[idx] = { ...sectors[idx], desc: e.target.value };
                        setContent({
                          ...content,
                          applications: { ...content.applications, sectors },
                        });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CTA BANNER */}
        {activeTab === "banner" && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-sm font-bold text-[#091e3a]">Switch to Solar CTA Banner</h2>
              <p className="text-xs text-gray-500">Bottom promotional callout before footer</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Badge
              </label>
              <input
                type="text"
                value={content.switchToSolarBanner.badge}
                onChange={(e) =>
                  setContent({
                    ...content,
                    switchToSolarBanner: {
                      ...content.switchToSolarBanner,
                      badge: e.target.value,
                    },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Headline
              </label>
              <input
                type="text"
                value={content.switchToSolarBanner.headline}
                onChange={(e) =>
                  setContent({
                    ...content,
                    switchToSolarBanner: {
                      ...content.switchToSolarBanner,
                      headline: e.target.value,
                    },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Subtitle
              </label>
              <textarea
                rows={2}
                value={content.switchToSolarBanner.subtitle}
                onChange={(e) =>
                  setContent({
                    ...content,
                    switchToSolarBanner: {
                      ...content.switchToSolarBanner,
                      subtitle: e.target.value,
                    },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 leading-relaxed focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                CTA Button Text
              </label>
              <input
                type="text"
                value={content.switchToSolarBanner.ctaText}
                onChange={(e) =>
                  setContent({
                    ...content,
                    switchToSolarBanner: {
                      ...content.switchToSolarBanner,
                      ctaText: e.target.value,
                    },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
              />
            </div>
          </div>
        )}

        {/* TAB 5: COMPANY & CONTACT */}
        {activeTab === "company" && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-sm font-bold text-[#091e3a]">Company Identity & Contact Info</h2>
              <p className="text-xs text-gray-500">Corporate addresses, phone numbers, and legal notices</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  value={content.company.name}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      company: { ...content.company, name: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Tagline
                </label>
                <input
                  type="text"
                  value={content.company.tagline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      company: { ...content.company, tagline: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-4">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Phone Contacts & Desks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Sales Phone 1
                  </label>
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Sales Phone 2
                  </label>
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Support Phone
                  </label>
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Sales Email
                  </label>
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Support Email
                  </label>
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Headquarters Address
                </label>
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 leading-relaxed focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: FAQS */}
        {activeTab === "faqs" && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-[#091e3a]">Frequently Asked Questions Manager</h2>
                <p className="text-xs text-gray-500">
                  Manage technical, phase unbalance, warranty, and DG synchronization questions displayed on the website.
                </p>
              </div>
              <button
                type="button"
                onClick={addFaq}
                className="text-xs font-bold text-[#ea580c] hover:text-[#c2410c] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Question</span>
              </button>
            </div>

            <div className="space-y-4">
              {content.company.faqs && content.company.faqs.length > 0 ? (
                content.company.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-slate-50 border border-gray-200 rounded-2xl space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#ea580c] uppercase tracking-wider">
                        FAQ #{idx + 1}
                      </span>
                      {content.company.faqs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFaq(idx)}
                          className="text-gray-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                          title="Remove FAQ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Question *
                        </label>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                          placeholder="e.g. Can the hybrid inverter run with zero phase balance?"
                          className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Category / Group
                        </label>
                        <input
                          type="text"
                          value={faq.category}
                          onChange={(e) => handleFaqChange(idx, "category", e.target.value)}
                          placeholder="Technical Specifications"
                          className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Answer *
                      </label>
                      <textarea
                        rows={3}
                        value={faq.answer}
                        onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                        placeholder="Detailed technical explanation..."
                        className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs text-gray-900 leading-relaxed focus:outline-none focus:border-[#ea580c]"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-xs">No FAQs yet. Click &quot;Add Question&quot; above to create one.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save All Content Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
