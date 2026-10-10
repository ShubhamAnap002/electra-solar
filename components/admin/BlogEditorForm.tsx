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
  MoveUp,
  MoveDown,
  Copy,
  Maximize2,
  Minimize2,
  Eye,
  Edit3,
  Image as ImageIcon,
  List as ListIcon,
  ListOrdered,
  Quote as QuoteIcon,
  Table as TableIcon,
  Lightbulb,
  AlertTriangle,
  Info,
  Zap,
  Calculator,
  Type,
  Layout,
} from "lucide-react";
import {
  BlogPost,
  BlogBlock,
  BlogParagraphBlock,
  BlogHeadingBlock,
  BlogImageBlock,
  BlogCalloutBlock,
  BlogListBlock,
  BlogQuoteBlock,
  BlogTableBlock,
  BlogEmbedBlock,
} from "@/lib/data/blog";
import { authFetch } from "@/lib/auth/client";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { BlogBlockRenderer } from "@/components/blog/BlogBlockRenderer";

interface BlogEditorFormProps {
  initialBlog?: BlogPost;
  isNew?: boolean;
}

const BLOG_CATEGORIES = [
  "Engineering & Sizing",
  "Policies & Subsidies",
  "Energy Storage (BESS)",
  "Power Electronics",
] as const;

// Helper to convert legacy blog format to blocks if needed
function getInitialBlocks(initialBlog?: BlogPost, isNew?: boolean): BlogBlock[] {
  if (initialBlog?.content?.blocks && initialBlog.content.blocks.length > 0) {
    return initialBlog.content.blocks;
  }

  if (initialBlog?.content) {
    const blocks: BlogBlock[] = [];
    if (initialBlog.content.intro) {
      blocks.push({
        id: `block_${Date.now()}_intro`,
        type: "paragraph",
        text: initialBlog.content.intro,
      });
    }

    (initialBlog.content.sections || []).forEach((sec, idx) => {
      blocks.push({
        id: `block_${Date.now()}_h_${idx}`,
        type: "heading",
        level: 2,
        text: sec.heading,
      });

      if (sec.body && sec.body.length > 0) {
        blocks.push({
          id: `block_${Date.now()}_p_${idx}`,
          type: "paragraph",
          text: sec.body.join("\n\n"),
        });
      }

      if (sec.highlightBox) {
        blocks.push({
          id: `block_${Date.now()}_callout_${idx}`,
          type: "callout",
          variant: "tech",
          title: "Technical Engineering Highlight",
          text: sec.highlightBox,
        });
      }
    });

    if (initialBlog.content.conclusion) {
      blocks.push({
        id: `block_${Date.now()}_h_conclusion`,
        type: "heading",
        level: 2,
        text: "Summary & Engineering Verdict",
      });
      blocks.push({
        id: `block_${Date.now()}_conclusion`,
        type: "paragraph",
        text: initialBlog.content.conclusion,
      });
    }

    if (blocks.length > 0) return blocks;
  }

  // Default starter blocks for new articles
  if (isNew) {
    return [
      {
        id: `block_${Date.now()}_1`,
        type: "paragraph",
        text: "Industrial and commercial solar facilities in India require rigorous power electronics sizing to ensure uninterrupted operations and grid compliance. In this comprehensive technical guide, our Pune systems engineering desk analyzes field data and sizing benchmarks.",
      },
      {
        id: `block_${Date.now()}_2`,
        type: "heading",
        level: 2,
        text: "Technical Context & Load Characterization",
      },
      {
        id: `block_${Date.now()}_3`,
        type: "paragraph",
        text: "When evaluating heavy inductive loads such as CNC motors, compressors, and hydraulic pumps, transient starting currents frequently reach 3x to 5x nominal running ratings. Standard string inverters often trip on such surges unless paired with dedicated bi-directional hybrid PCUs.",
      },
      {
        id: `block_${Date.now()}_4`,
        type: "callout",
        variant: "tech",
        title: "Field Sizing Rule of Thumb",
        text: "Always size battery discharge C-rate to support peak surge kVA without exceeding 0.8C continuous discharge on LiFePO4 chemistry.",
      },
    ];
  }

  return [];
}

export function BlogEditorForm({ initialBlog, isNew = false }: BlogEditorFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");

  // Core Metadata State
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: initialBlog?.title || "",
    slug: initialBlog?.slug || "",
    category: initialBlog?.category || "Engineering & Sizing",
    author: initialBlog?.author || "Er. Sachin Patil",
    authorRole: initialBlog?.authorRole || "Principal Systems Engineer, Electra Solar (Pune)",
    publishedAt:
      initialBlog?.publishedAt ||
      new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    readTime: initialBlog?.readTime || "6 min read",
    summary: initialBlog?.summary || "",
    coverImage: initialBlog?.coverImage || "/images/showcase/industrial-solar.jpg",
    featured: Boolean(initialBlog?.featured),
    relatedProductSlug:
      initialBlog?.relatedProductSlug || "sunmagic-three-phase-solar-hybrid-inverter",
    relatedProductName:
      initialBlog?.relatedProductName || "SunMagic 3-Phase Hybrid Inverter",
  });

  // Dynamic Modular Blocks State
  const [blocks, setBlocks] = useState<BlogBlock[]>(() =>
    getInitialBlocks(initialBlog, isNew)
  );

  // Auto calculate word count & read time
  const totalWords = blocks.reduce((acc, block) => {
    if (block.type === "paragraph" || block.type === "heading") {
      return acc + (block.text ? block.text.trim().split(/\s+/).length : 0);
    }
    if (block.type === "callout" || block.type === "quote") {
      return acc + (block.text ? block.text.trim().split(/\s+/).length : 0);
    }
    return acc;
  }, 0);

  const estimatedReadTime = `${Math.max(1, Math.ceil(totalWords / 200))} min read`;

  // Handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => {
      const updates: Partial<BlogPost> = { title };
      if (
        isNew &&
        (!prev.slug ||
          prev.slug ===
            prev.title
              ?.toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, ""))
      ) {
        updates.slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }
      return { ...prev, ...updates };
    });
  };

  // Block Manipulation Handlers
  const updateBlock = (index: number, updated: Partial<BlogBlock>) => {
    setBlocks((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...updated } as BlogBlock;
      return next;
    });
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    setBlocks((prev) => {
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const next = [...prev];
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next;
    });
  };

  const deleteBlock = (index: number) => {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const duplicateBlock = (index: number) => {
    setBlocks((prev) => {
      const target = prev[index];
      const clone: BlogBlock = {
        ...target,
        id: `block_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      };
      const next = [...prev];
      next.splice(index + 1, 0, clone);
      return next;
    });
  };

  const insertBlockAt = (index: number, type: BlogBlock["type"]) => {
    const newId = `block_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    let newBlock: BlogBlock;

    switch (type) {
      case "heading":
        newBlock = { id: newId, type: "heading", level: 2, text: "New Section Heading" };
        break;
      case "image":
        newBlock = {
          id: newId,
          type: "image",
          url: "/images/showcase/commercial-solar.jpg",
          caption: "Technical schematic illustration or real-world installation photo",
          alt: "Industrial solar inverter installation",
          layout: "contained",
        };
        break;
      case "callout":
        newBlock = {
          id: newId,
          type: "callout",
          variant: "tech",
          title: "Hardware Specification Notice",
          text: "Enter specific technical details, inverter voltage parameters, or sizing notes.",
        };
        break;
      case "list":
        newBlock = {
          id: newId,
          type: "list",
          style: "bullet",
          items: [
            "Continuous 100% unbalanced phase tolerance across R, Y, and B phases.",
            "Integrated DG synchronization governor with reverse power prevention.",
            "Sub-5ms static transfer switch for seamless critical UPS operation.",
          ],
        };
        break;
      case "quote":
        newBlock = {
          id: newId,
          type: "quote",
          text: "True energy independence for Indian factories requires smart bidirectional control between solar PV, lithium storage, and the diesel generator.",
          author: "Er. Sachin Patil, Principal Engineer",
        };
        break;
      case "table":
        newBlock = {
          id: newId,
          type: "table",
          headers: ["Parameter", "Standard On-Grid", "EnerTech Hybrid PCU"],
          rows: [
            ["Operation During Power Cut", "Shuts down (Anti-Islanding)", "Continuous Power (<5ms transfer)"],
            ["DG Synchronization", "Requires external throttling relay", "Direct governor integration built-in"],
            ["Phase Unbalance Tolerance", "Max 15% before trip", "100% independent per-phase regulation"],
          ],
          caption: "Comparative techno-commercial assessment.",
        };
        break;
      case "embed":
        newBlock = {
          id: newId,
          type: "embed",
          targetType: "calculator",
          title: "Interactive System Sizing Tool",
          description: "Calculate your factory solar kW, battery kWh requirement, and DISCOM payback period.",
        };
        break;
      case "paragraph":
      default:
        newBlock = {
          id: newId,
          type: "paragraph",
          text: "Write your article paragraph here. Explain the engineering concepts in detail.",
        };
        break;
    }

    setBlocks((prev) => {
      const next = [...prev];
      next.splice(index, 0, newBlock);
      return next;
    });
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (!formData.title?.trim()) throw new Error("Article title is required");
      if (!formData.slug?.trim()) throw new Error("URL slug is required");

      const payload: Partial<BlogPost> = {
        ...formData,
        readTime: estimatedReadTime,
        content: {
          blocks,
          // Sync legacy fields so any non-block consumer remains intact
          intro: blocks.find((b) => b.type === "paragraph")?.text || formData.summary || "",
          sections: [
            {
              heading: "Engineering Overview",
              body: blocks
                .filter((b) => b.type === "paragraph")
                .map((b) => b.text),
            },
          ],
          conclusion: "Commissioned and verified by Electra Solar engineering desk.",
        },
      };

      const endpoint = isNew ? "/api/admin/blogs" : `/api/admin/blogs/${initialBlog?.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await authFetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to save article");
      }

      setSuccessMessage(
        isNew
          ? "Blog post published successfully with all in-article media blocks!"
          : "Blog post updated successfully!"
      );

      setTimeout(() => {
        router.push("/admin/blogs");
      }, 1200);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-8 ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-[#091e3a] p-4 sm:p-8 overflow-y-auto text-white"
          : ""
      }`}
    >
      {/* 1. TOP HEADER & WORKSPACE TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-colors ${
              isFullscreen
                ? "bg-white/10 text-gray-200 hover:bg-white/20"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Articles</span>
          </Link>

          <div>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider block ${
                isFullscreen ? "text-[#ea580c]" : "text-[#ea580c]"
              }`}
            >
              WordPress-Style Long-Form Builder
            </span>
            <h1
              className={`text-xl sm:text-2xl font-black tracking-tight ${
                isFullscreen ? "text-white" : "text-[#091e3a]"
              }`}
            >
              {isNew ? "Create Long-Form Technical Article" : `Edit Article: ${formData.title}`}
            </h1>
          </div>
        </div>

        {/* Action Controls & Mode Switchers */}
        <div className="flex items-center gap-2.5">
          {/* Read Time & Word Count Badge */}
          <div
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold ${
              isFullscreen
                ? "bg-white/10 text-gray-300"
                : "bg-gray-100 text-gray-700 border border-gray-200"
            }`}
          >
            <span>{totalWords} words</span>
            <span>•</span>
            <span className="text-[#ea580c]">{estimatedReadTime}</span>
          </div>

          {/* Fullscreen / Black Box Canvas Toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Distraction-Free Mode"}
            className={`p-2.5 rounded-xl border transition-colors ${
              isFullscreen
                ? "bg-[#ea580c] text-white border-orange-500 hover:bg-orange-600"
                : "bg-white text-gray-700 border-gray-300 hover:border-orange-500"
            }`}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Tab Switch: Editor vs Live Preview */}
          <div className="inline-flex p-1 rounded-xl bg-gray-200/80 border border-gray-300">
            <button
              type="button"
              onClick={() => setActiveTab("editor")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "editor"
                  ? "bg-white text-[#091e3a] shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "preview"
                  ? "bg-white text-[#ea580c] shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
          </div>

          {/* Save / Publish Button */}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isNew ? "Publish Article" : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2 font-bold animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 2. TAB CONTENT: EDITOR VS LIVE PREVIEW */}
      {activeTab === "preview" ? (
        /* LIVE PREVIEW CANVAS (Shows exact public layout) */
        <div className="bg-white text-gray-900 rounded-3xl border border-gray-200 p-6 sm:p-12 shadow-sm max-w-4xl mx-auto space-y-8">
          <div className="border-b border-gray-100 pb-6 space-y-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-50 text-[#ea580c] border border-orange-200">
              {formData.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-[#091e3a] tracking-tight">
              {formData.title || "Untitled Article"}
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              {formData.summary}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-500 pt-2">
              <span className="font-bold text-gray-900">{formData.author}</span>
              <span>•</span>
              <span>{formData.publishedAt}</span>
              <span>•</span>
              <span className="font-mono text-[#ea580c] font-bold">{estimatedReadTime}</span>
            </div>
          </div>

          {/* Render All Modular Blocks */}
          <BlogBlockRenderer blocks={blocks} showTableOfContents={true} />
        </div>
      ) : (
        /* VISUAL BLOCK BUILDER */
        <div className="space-y-8 max-w-5xl mx-auto">
          {/* ARTICLE METADATA DRAWER */}
          <div
            className={`rounded-3xl p-6 sm:p-8 space-y-6 border transition-all ${
              isFullscreen
                ? "bg-[#102a4d] border-gray-700 text-white"
                : "bg-white border-gray-200 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between border-b pb-4 border-gray-200/50">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ea580c]">
                <FileText className="w-4 h-4" />
                <span>Article Title &amp; SEO Configuration</span>
              </div>
              <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={Boolean(formData.featured)}
                  onChange={(e) => setFormData((p) => ({ ...p, featured: e.target.checked }))}
                  className="rounded border-gray-300 text-[#ea580c] focus:ring-orange-500 w-4 h-4"
                />
                <span>Feature on Knowledge Hub Hero</span>
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold block mb-1.5">
                  Article Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  required
                  placeholder="e.g. Sizing 3-Phase Solar Hybrid Inverters for 100% Phase Unbalanced Factory Loads"
                  className="w-full text-base sm:text-lg font-bold p-3.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#ea580c] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold block mb-1">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                    placeholder="sizing-solar-hybrid-inverters-phase-unbalance"
                    className="w-full text-xs font-mono p-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#ea580c] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold block mb-1">Topic Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#ea580c] focus:outline-hidden"
                  >
                    {BLOG_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold block mb-1">Author Name &amp; Role</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Er. Sachin Patil"
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#ea580c] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">
                  Executive Summary / Meta Description
                </label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  rows={2}
                  placeholder="A concise 2-sentence summary that appears in Google search snippets and card previews."
                  className="w-full text-xs p-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#ea580c] focus:outline-hidden"
                />
              </div>

              {/* Cover Image Uploader */}
              <div className="pt-2">
                <ImageUploadField
                  label="Featured Cover Image"
                  value={formData.coverImage || ""}
                  onChange={(url) => setFormData((p) => ({ ...p, coverImage: url }))}
                  description="Recommended: 1200x675 or 16:9 ratio. Appears at the top of the article and social shares."
                />
              </div>
            </div>
          </div>

          {/* MODULAR BLOCKS CANVAS (WordPress Gutenberg Experience) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#ea580c] block">
                  Content Stream
                </span>
                <h2
                  className={`text-xl font-black ${
                    isFullscreen ? "text-white" : "text-[#091e3a]"
                  }`}
                >
                  Article Blocks ({blocks.length} elements)
                </h2>
              </div>

              <span className="text-xs text-gray-400">
                Drag or reorder blocks freely. Add inline images between paragraphs.
              </span>
            </div>

            {/* Blocks List */}
            <div className="space-y-5">
              {blocks.map((block, index) => (
                <div key={block.id} className="space-y-3 group">
                  {/* Quick Inserter Button Above Block */}
                  <div className="flex items-center justify-center -my-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-px bg-orange-300 flex-grow" />
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-300 text-orange-700 text-[10px] font-bold shadow-xs">
                      <Plus className="w-3 h-3" />
                      <span>Insert between:</span>
                      <button
                        type="button"
                        onClick={() => insertBlockAt(index, "paragraph")}
                        className="hover:underline font-bold text-[#ea580c]"
                      >
                        + Paragraph
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() => insertBlockAt(index, "image")}
                        className="hover:underline font-bold text-[#ea580c]"
                      >
                        + Image
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() => insertBlockAt(index, "callout")}
                        className="hover:underline font-bold text-[#ea580c]"
                      >
                        + Callout
                      </button>
                    </div>
                    <div className="h-px bg-orange-300 flex-grow" />
                  </div>

                  {/* Block Container Card */}
                  <div
                    className={`rounded-2xl p-5 sm:p-6 border transition-all ${
                      isFullscreen
                        ? "bg-[#132c4e] border-gray-700 text-white shadow-md"
                        : "bg-white border-gray-200 text-gray-900 shadow-xs hover:border-orange-300"
                    }`}
                  >
                    {/* Block Toolbar Header */}
                    <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-gray-100/30">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-orange-500/10 text-[#ea580c] flex items-center justify-center font-mono text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#ea580c] flex items-center gap-1.5">
                          {block.type === "paragraph" && <Type className="w-3.5 h-3.5" />}
                          {block.type === "heading" && <Type className="w-3.5 h-3.5" />}
                          {block.type === "image" && <ImageIcon className="w-3.5 h-3.5" />}
                          {block.type === "callout" && <Zap className="w-3.5 h-3.5" />}
                          {block.type === "list" && <ListIcon className="w-3.5 h-3.5" />}
                          {block.type === "quote" && <QuoteIcon className="w-3.5 h-3.5" />}
                          {block.type === "table" && <TableIcon className="w-3.5 h-3.5" />}
                          {block.type === "embed" && <Sparkles className="w-3.5 h-3.5" />}
                          <span>{block.type.toUpperCase()} BLOCK</span>
                        </span>
                      </div>

                      {/* Position & Delete Controls */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveBlock(index, "up")}
                          disabled={index === 0}
                          title="Move Block Up"
                          className="p-1.5 rounded-lg hover:bg-gray-200/50 text-gray-500 disabled:opacity-30"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveBlock(index, "down")}
                          disabled={index === blocks.length - 1}
                          title="Move Block Down"
                          className="p-1.5 rounded-lg hover:bg-gray-200/50 text-gray-500 disabled:opacity-30"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => duplicateBlock(index)}
                          title="Duplicate Block"
                          className="p-1.5 rounded-lg hover:bg-gray-200/50 text-gray-500"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteBlock(index)}
                          title="Delete Block"
                          className="p-1.5 rounded-lg hover:bg-red-100 text-red-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* BLOCK CONTENT FORMS */}
                    {/* 1. PARAGRAPH BLOCK */}
                    {block.type === "paragraph" && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold block text-gray-600">
                          Body Text (Paragraphs separated by blank line)
                        </label>
                        <textarea
                          value={block.text}
                          onChange={(e) => updateBlock(index, { text: e.target.value })}
                          rows={4}
                          placeholder="Type or paste your technical analysis, field insights, or findings..."
                          className="w-full text-sm p-3.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#ea580c] focus:outline-hidden leading-relaxed font-sans"
                        />
                      </div>
                    )}

                    {/* 2. HEADING BLOCK */}
                    {block.type === "heading" && (
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                        <div className="sm:col-span-3">
                          <label className="text-xs font-bold block text-gray-600 mb-1">
                            Heading Level
                          </label>
                          <select
                            value={block.level}
                            onChange={(e) =>
                              updateBlock(index, {
                                level: Number(e.target.value) as 2 | 3,
                              })
                            }
                            className="w-full text-xs p-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-bold"
                          >
                            <option value={2}>H2 (Major Section)</option>
                            <option value={3}>H3 (Sub-Topic)</option>
                          </select>
                        </div>
                        <div className="sm:col-span-9">
                          <label className="text-xs font-bold block text-gray-600 mb-1">
                            Heading Text
                          </label>
                          <input
                            type="text"
                            value={block.text}
                            onChange={(e) => updateBlock(index, { text: e.target.value })}
                            placeholder="e.g. Sub-5ms Static Transfer Switch Mechanics"
                            className="w-full text-sm font-black p-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#ea580c] focus:outline-hidden"
                          />
                        </div>
                      </div>
                    )}

                    {/* 3. IN-ARTICLE IMAGE BLOCK (WORDPRESS STYLE) */}
                    {block.type === "image" && (
                      <div className="space-y-4">
                        <ImageUploadField
                          label="In-Article Photo / Diagram"
                          value={block.url}
                          onChange={(url) => updateBlock(index, { url })}
                          description="Upload technical wiring diagram, SLD schematic, oscilloscope wave, or installation photo."
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="sm:col-span-2">
                            <label className="text-xs font-bold block text-gray-600 mb-1">
                              Image Caption (Displayed beneath image)
                            </label>
                            <input
                              type="text"
                              value={block.caption || ""}
                              onChange={(e) => updateBlock(index, { caption: e.target.value })}
                              placeholder="Figure 1: Single Line Diagram of SunMagic DG Synchronization Panel"
                              className="w-full text-xs p-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#ea580c] focus:outline-hidden"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold block text-gray-600 mb-1">
                              Display Width
                            </label>
                            <select
                              value={block.layout || "contained"}
                              onChange={(e) =>
                                updateBlock(index, {
                                  layout: e.target.value as "contained" | "full" | "wide",
                                })
                              }
                              className="w-full text-xs p-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-bold"
                            >
                              <option value="contained">Standard Contained</option>
                              <option value="wide">Wide Showcase</option>
                              <option value="full">Full Width</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 4. CALLOUT BLOCK */}
                    {block.type === "callout" && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="text-xs font-bold block text-gray-600 mb-1">
                              Callout Type
                            </label>
                            <select
                              value={block.variant}
                              onChange={(e) =>
                                updateBlock(index, {
                                  variant: e.target.value as any,
                                })
                              }
                              className="w-full text-xs p-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-bold"
                            >
                              <option value="tech">⚡ Hardware Tech Spec</option>
                              <option value="tip">💡 Engineering Pro-Tip</option>
                              <option value="warning">⚠️ Caution / Operational Warning</option>
                              <option value="calculation">🔢 Math Formula / Sizing</option>
                              <option value="info">ℹ️ Technical Notice</option>
                            </select>
                          </div>

                          <div className="sm:col-span-2">
                            <label className="text-xs font-bold block text-gray-600 mb-1">
                              Callout Header Title
                            </label>
                            <input
                              type="text"
                              value={block.title || ""}
                              onChange={(e) => updateBlock(index, { title: e.target.value })}
                              placeholder="e.g. Critical Safety Precaution"
                              className="w-full text-xs p-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#ea580c] focus:outline-hidden font-bold"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-bold block text-gray-600 mb-1">
                            Callout Message
                          </label>
                          <textarea
                            value={block.text}
                            onChange={(e) => updateBlock(index, { text: e.target.value })}
                            rows={2}
                            placeholder="Detailed advisory, formula, or takeaway point..."
                            className="w-full text-xs p-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#ea580c] focus:outline-hidden"
                          />
                        </div>
                      </div>
                    )}

                    {/* 5. LIST BLOCK */}
                    {block.type === "list" && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-gray-600">
                            List Items ({block.items?.length || 0})
                          </label>
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                updateBlock(index, {
                                  style: block.style === "bullet" ? "numbered" : "bullet",
                                })
                              }
                              className="text-xs font-bold text-[#ea580c] hover:underline"
                            >
                              Switch to {block.style === "bullet" ? "Numbered" : "Bullet"}
                            </button>
                            <span>•</span>
                            <button
                              type="button"
                              onClick={() =>
                                updateBlock(index, {
                                  items: [...(block.items || []), "New technical point"],
                                })
                              }
                              className="text-xs font-bold text-[#ea580c] hover:underline flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Item</span>
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {(block.items || []).map((item, itemIdx) => (
                            <div key={itemIdx} className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-gray-400 w-5 text-right">
                                {block.style === "numbered" ? `${itemIdx + 1}.` : "•"}
                              </span>
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => {
                                  const updatedItems = [...block.items];
                                  updatedItems[itemIdx] = e.target.value;
                                  updateBlock(index, { items: updatedItems });
                                }}
                                className="flex-grow text-xs p-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#ea580c] focus:outline-hidden"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedItems = block.items.filter((_, i) => i !== itemIdx);
                                  updateBlock(index, { items: updatedItems });
                                }}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 6. QUOTE BLOCK */}
                    {block.type === "quote" && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-bold block text-gray-600 mb-1">
                            Quote Text
                          </label>
                          <textarea
                            value={block.text}
                            onChange={(e) => updateBlock(index, { text: e.target.value })}
                            rows={2}
                            placeholder="Enter quotation or authoritative engineer statement..."
                            className="w-full text-xs p-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#ea580c] focus:outline-hidden font-serif italic"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold block text-gray-600 mb-1">
                            Author / Speaker Attribution
                          </label>
                          <input
                            type="text"
                            value={block.author || ""}
                            onChange={(e) => updateBlock(index, { author: e.target.value })}
                            placeholder="e.g. Er. Sachin Patil, Chief Technical Officer"
                            className="w-full text-xs p-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#ea580c] focus:outline-hidden"
                          />
                        </div>
                      </div>
                    )}

                    {/* 7. TABLE BLOCK */}
                    {block.type === "table" && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-gray-600">
                            Table Grid ({block.headers?.length} cols x {block.rows?.length} rows)
                          </label>
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const newHeaders = [...block.headers, `Col ${block.headers.length + 1}`];
                                const newRows = block.rows.map((r) => [...r, "Data"]);
                                updateBlock(index, { headers: newHeaders, rows: newRows });
                              }}
                              className="text-xs font-bold text-[#ea580c] hover:underline"
                            >
                              + Add Column
                            </button>
                            <span>•</span>
                            <button
                              type="button"
                              onClick={() => {
                                const newRow = new Array(block.headers.length).fill("Data");
                                updateBlock(index, { rows: [...block.rows, newRow] });
                              }}
                              className="text-xs font-bold text-[#ea580c] hover:underline"
                            >
                              + Add Row
                            </button>
                          </div>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-gray-200">
                          <table className="w-full text-xs">
                            <thead className="bg-[#091e3a] text-white">
                              <tr>
                                {block.headers.map((h, hIdx) => (
                                  <th key={hIdx} className="p-2 border-r border-gray-700">
                                    <input
                                      type="text"
                                      value={h}
                                      onChange={(e) => {
                                        const newHeaders = [...block.headers];
                                        newHeaders[hIdx] = e.target.value;
                                        updateBlock(index, { headers: newHeaders });
                                      }}
                                      className="w-full bg-transparent text-white font-bold text-xs focus:outline-hidden"
                                    />
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {block.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="border-t border-gray-200">
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="p-2 border-r border-gray-200">
                                      <input
                                        type="text"
                                        value={cell}
                                        onChange={(e) => {
                                          const newRows = [...block.rows];
                                          newRows[rIdx][cIdx] = e.target.value;
                                          updateBlock(index, { rows: newRows });
                                        }}
                                        className="w-full bg-transparent text-gray-900 text-xs focus:outline-hidden"
                                      />
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* 8. EMBED BLOCK */}
                    {block.type === "embed" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold block text-gray-600 mb-1">
                            Embed Card Title
                          </label>
                          <input
                            type="text"
                            value={block.title}
                            onChange={(e) => updateBlock(index, { title: e.target.value })}
                            className="w-full text-xs p-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold block text-gray-600 mb-1">
                            Callout Tool Type
                          </label>
                          <select
                            value={block.targetType}
                            onChange={(e) =>
                              updateBlock(index, {
                                targetType: e.target.value as "product" | "calculator",
                              })
                            }
                            className="w-full text-xs p-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-bold"
                          >
                            <option value="calculator">Interactive Sizing Calculator</option>
                            <option value="product">Featured Product Hardware</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* BIG "+ ADD BLOCK" LAUNCHPAD AT BOTTOM */}
            <div
              className={`p-6 sm:p-8 rounded-3xl border text-center space-y-4 ${
                isFullscreen
                  ? "bg-[#102a4d] border-gray-700"
                  : "bg-white border-dashed border-2 border-orange-300 shadow-xs"
              }`}
            >
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ea580c] block">
                  Add Content Element
                </span>
                <h3
                  className={`text-lg font-black ${
                    isFullscreen ? "text-white" : "text-[#091e3a]"
                  }`}
                >
                  Choose a Block to Insert at the End of Your Article
                </h3>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => insertBlockAt(blocks.length, "paragraph")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#ea580c] font-bold text-xs border border-orange-200 transition-colors shadow-2xs"
                >
                  <Type className="w-3.5 h-3.5" />
                  <span>+ Paragraph</span>
                </button>

                <button
                  type="button"
                  onClick={() => insertBlockAt(blocks.length, "image")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200 transition-colors shadow-2xs"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>+ In-Article Image</span>
                </button>

                <button
                  type="button"
                  onClick={() => insertBlockAt(blocks.length, "heading")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200 transition-colors shadow-2xs"
                >
                  <Type className="w-3.5 h-3.5" />
                  <span>+ Heading (H2/H3)</span>
                </button>

                <button
                  type="button"
                  onClick={() => insertBlockAt(blocks.length, "callout")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-xs border border-amber-200 transition-colors shadow-2xs"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>+ Callout Box</span>
                </button>

                <button
                  type="button"
                  onClick={() => insertBlockAt(blocks.length, "list")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs border border-purple-200 transition-colors shadow-2xs"
                >
                  <ListIcon className="w-3.5 h-3.5" />
                  <span>+ Bullet / Step List</span>
                </button>

                <button
                  type="button"
                  onClick={() => insertBlockAt(blocks.length, "quote")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-colors shadow-2xs"
                >
                  <QuoteIcon className="w-3.5 h-3.5" />
                  <span>+ Pull Quote</span>
                </button>

                <button
                  type="button"
                  onClick={() => insertBlockAt(blocks.length, "table")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200 transition-colors shadow-2xs"
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>+ Spec Table</span>
                </button>

                <button
                  type="button"
                  onClick={() => insertBlockAt(blocks.length, "embed")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-colors shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>+ Tool Embed</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
