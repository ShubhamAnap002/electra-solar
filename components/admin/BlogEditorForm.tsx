"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  BookOpen,
  FileText,
  User,
  Clock,
  Sparkles,
} from "lucide-react";
import { BlogPost } from "@/lib/data/blog";
import { authFetch } from "@/lib/auth/client";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

interface BlogEditorFormProps {
  initialBlog?: BlogPost;
  isNew?: boolean;
}

const BLOG_CATEGORIES = [
  "Engineering & Sizing",
  "Policies & Subsidies",
  "Energy Storage (BESS)",
  "Power Electronics",
];

export function BlogEditorForm({ initialBlog, isNew = false }: BlogEditorFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: initialBlog?.title || "",
    slug: initialBlog?.slug || "",
    category: initialBlog?.category || "Engineering & Sizing",
    author: initialBlog?.author || "Er. Sachin Patil",
    authorRole: initialBlog?.authorRole || "Principal Systems Engineer, Electra Solar (Pune)",
    publishedAt: initialBlog?.publishedAt || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    readTime: initialBlog?.readTime || "5 min read",
    summary: initialBlog?.summary || "",
    coverImage: initialBlog?.coverImage || "/images/showcase/industrial-solar.jpg",
    featured: Boolean(initialBlog?.featured),
    content: {
      intro: initialBlog?.content?.intro || "",
      sections: initialBlog?.content?.sections || [
        {
          heading: "Key Engineering Analysis",
          body: ["Detailed technical analysis and field findings."],
          highlightBox: "",
        },
      ],
      conclusion: initialBlog?.content?.conclusion || "",
    },
    relatedProductSlug: initialBlog?.relatedProductSlug || "sunmagic-three-phase-solar-hybrid-inverter",
    relatedProductName: initialBlog?.relatedProductName || "SunMagic 3-Phase Hybrid Inverter",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => {
      const updates: Partial<BlogPost> = { title };
      if (isNew && (!prev.slug || prev.slug === prev.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""))) {
        updates.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      }
      return { ...prev, ...updates };
    });
  };

  // Section Handlers
  const handleSectionHeadingChange = (index: number, heading: string) => {
    const sections = [...(formData.content?.sections || [])];
    sections[index] = { ...sections[index], heading };
    setFormData((prev) => ({
      ...prev,
      content: { ...prev.content!, sections },
    }));
  };

  const handleSectionBodyChange = (index: number, bodyText: string) => {
    const sections = [...(formData.content?.sections || [])];
    const paragraphs = bodyText.split("\n\n").filter((p) => p.trim().length > 0);
    sections[index] = { ...sections[index], body: paragraphs.length > 0 ? paragraphs : [bodyText] };
    setFormData((prev) => ({
      ...prev,
      content: { ...prev.content!, sections },
    }));
  };

  const handleSectionHighlightChange = (index: number, highlightBox: string) => {
    const sections = [...(formData.content?.sections || [])];
    sections[index] = { ...sections[index], highlightBox };
    setFormData((prev) => ({
      ...prev,
      content: { ...prev.content!, sections },
    }));
  };

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content!,
        sections: [
          ...(prev.content?.sections || []),
          { heading: "New Section Heading", body: ["Write paragraph content here."], highlightBox: "" },
        ],
      },
    }));
  };

  const removeSection = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content!,
        sections: (prev.content?.sections || []).filter((_, i) => i !== index),
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const url = isNew
        ? "/api/admin/blogs"
        : `/api/admin/blogs/${initialBlog?.id || formData.slug}`;
      const method = isNew ? "POST" : "PUT";

      const res = await authFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to save blog post");
      }

      setSuccessMessage(isNew ? "Blog article published successfully!" : "Article changes saved successfully!");

      if (isNew && data.blog?.id) {
        setTimeout(() => {
          router.push(`/admin/blogs/${data.blog.id}`);
        }, 1200);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-xs font-bold text-[#ea580c] uppercase tracking-wider block">
              Knowledge Hub CMS
            </span>
            <h1 className="text-xl font-black text-[#091e3a]">
              {isNew ? "Publish New Technical Article" : `Editing: ${formData.title || "Article"}`}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isNew && formData.slug && (
            <Link
              href={`/blog/${formData.slug}`}
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#091e3a] hover:text-[#ea580c] hover:border-[#ea580c]/40 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>View Live Article</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isNew ? "Publish Article" : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Primary Details Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <BookOpen className="w-4 h-4 text-[#ea580c]" />
          <h2 className="font-bold text-gray-900 text-sm">Article Metadata & Author Info</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Article Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title || ""}
              onChange={handleTitleChange}
              placeholder="e.g. Hybrid Inverters vs On-Grid with DG: Which is Best for Indian C&I Factories?"
              className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              URL Slug *
            </label>
            <div className="flex items-center">
              <span className="bg-slate-100 border border-r-0 border-gray-200 rounded-l-xl px-3 py-2.5 text-xs text-gray-500 font-mono">
                /blog/
              </span>
              <input
                type="text"
                name="slug"
                required
                value={formData.slug || ""}
                onChange={handleChange}
                placeholder="hybrid-vs-ongrid-inverters"
                className="w-full bg-slate-50 border border-gray-200 rounded-r-xl px-3.5 py-2.5 text-xs text-gray-900 font-mono focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Category *
            </label>
            <select
              name="category"
              value={formData.category || "Engineering & Sizing"}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
            >
              {BLOG_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Author Name
            </label>
            <input
              type="text"
              name="author"
              value={formData.author || ""}
              onChange={handleChange}
              placeholder="Er. Sachin Patil"
              className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Author Designation / Desk
            </label>
            <input
              type="text"
              name="authorRole"
              value={formData.authorRole || ""}
              onChange={handleChange}
              placeholder="Principal Systems Engineer, Electra Solar (Pune)"
              className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Publish Date Label
            </label>
            <input
              type="text"
              name="publishedAt"
              value={formData.publishedAt || ""}
              onChange={handleChange}
              placeholder="April 2026"
              className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Estimated Read Time
            </label>
            <input
              type="text"
              name="readTime"
              value={formData.readTime || ""}
              onChange={handleChange}
              placeholder="6 min read"
              className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-3 pt-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={Boolean(formData.featured)}
                onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ea580c]"></div>
            </label>
            <span className="text-xs font-bold text-gray-800">
              Set as Featured Hero Article on Knowledge Hub
            </span>
          </div>
        </div>
      </div>

      {/* Cover Image Upload Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3">
          Cover Image & Summary Excerpt
        </h2>

        <ImageUploadField
          label="Article Banner / Cover Image"
          value={formData.coverImage || ""}
          onChange={(url) => setFormData((prev) => ({ ...prev, coverImage: url }))}
          description="Upload or choose a featured image (1200x630px recommended for social cards)."
        />

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Executive Summary / Search Snippet *
          </label>
          <textarea
            name="summary"
            rows={3}
            value={formData.summary || ""}
            onChange={handleChange}
            placeholder="A short 1-2 sentence technical summary of the article..."
            className="w-full bg-slate-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 leading-relaxed focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Main Content Sections Builder */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#ea580c]" />
            <h2 className="font-bold text-gray-900 text-sm">Article Body & Technical Sections</h2>
          </div>
          <button
            type="button"
            onClick={addSection}
            className="text-xs font-bold text-[#ea580c] hover:text-[#c2410c] flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Section</span>
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Introduction Paragraph
          </label>
          <textarea
            rows={3}
            value={formData.content?.intro || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                content: { ...prev.content!, intro: e.target.value },
              }))
            }
            placeholder="Opening problem statement and context..."
            className="w-full bg-slate-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 leading-relaxed focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
          />
        </div>

        {/* Dynamic Sections */}
        <div className="space-y-5">
          {formData.content?.sections?.map((section, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-50 border border-gray-200 rounded-2xl space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#ea580c] uppercase tracking-wider">
                  Section #{idx + 1}
                </span>
                {formData.content!.sections.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSection(idx)}
                    className="text-gray-400 hover:text-rose-600 transition-colors p-1"
                    title="Remove this section"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={section.heading}
                  onChange={(e) => handleSectionHeadingChange(idx, e.target.value)}
                  placeholder="e.g. The Fatal Flaw of On-Grid Solar with Diesel Generators"
                  className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Section Body Content (Separate multiple paragraphs with blank lines)
                </label>
                <textarea
                  rows={4}
                  value={Array.isArray(section.body) ? section.body.join("\n\n") : section.body}
                  onChange={(e) => handleSectionBodyChange(idx, e.target.value)}
                  placeholder="Paragraph explanation..."
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs text-gray-900 leading-relaxed focus:outline-none focus:border-[#ea580c]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Engineering Highlight Callout Box (Optional)
                </label>
                <input
                  type="text"
                  value={section.highlightBox || ""}
                  onChange={(e) => handleSectionHighlightChange(idx, e.target.value)}
                  placeholder="e.g. Standard on-grid inverters require DG controllers that throttle solar output down to 30%..."
                  className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c]"
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Conclusion & Key Takeaway
          </label>
          <textarea
            rows={3}
            value={formData.content?.conclusion || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                content: { ...prev.content!, conclusion: e.target.value },
              }))
            }
            placeholder="Final engineering recommendation or closing summary..."
            className="w-full bg-slate-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 leading-relaxed focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
          />
        </div>

        {/* Related Equipment Cross-link */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-gray-100">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Related Product Equipment Name
            </label>
            <input
              type="text"
              name="relatedProductName"
              value={formData.relatedProductName || ""}
              onChange={handleChange}
              placeholder="SunMagic 3-Phase Hybrid Inverter (10kVA - 300kVA)"
              className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Related Product Slug
            </label>
            <input
              type="text"
              name="relatedProductSlug"
              value={formData.relatedProductSlug || ""}
              onChange={handleChange}
              placeholder="sunmagic-three-phase-solar-hybrid-inverter"
              className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 font-mono focus:outline-none focus:border-[#ea580c]"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
