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
  Briefcase,
  MapPin,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Project } from "@/lib/data/projects";
import { authFetch } from "@/lib/auth/client";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

interface ProjectEditorFormProps {
  initialProject?: Project;
  isNew?: boolean;
}

const PROJECT_CATEGORIES = [
  "Industrial Manufacturing",
  "Healthcare & Diagnostics",
  "Residential Luxury",
  "Agro-Cold Chain",
];

export function ProjectEditorForm({ initialProject, isNew = false }: ProjectEditorFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Project>>({
    title: initialProject?.title || "",
    slug: initialProject?.slug || "",
    category: initialProject?.category || "Industrial Manufacturing",
    location: initialProject?.location || "Chakan MIDC, Pune, Maharashtra",
    capacity: initialProject?.capacity || "100 kVA Solar Hybrid PCU + 120 kWh BESS",
    productsInstalled: initialProject?.productsInstalled || [
      "SunMagic REeFI 3-Phase Solar Hybrid Inverter (100 kVA)",
      "EnerCube Modular Industrial BESS",
    ],
    challenge: initialProject?.challenge || "",
    solution: initialProject?.solution || "",
    impactMetrics: initialProject?.impactMetrics || [
      { label: "Diesel Generator Runtime Reduction", value: "65%" },
      { label: "Grid Voltage Sag Immunity", value: "100% Uptime" },
      { label: "Estimated Payback Period", value: "3.2 Years" },
    ],
    completionYear: initialProject?.completionYear || new Date().getFullYear().toString(),
    image: initialProject?.image || "/images/showcase/industrial-solar.jpg",
    quoteSnippet: initialProject?.quoteSnippet || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => {
      const updates: Partial<Project> = { title };
      if (isNew && (!prev.slug || prev.slug === prev.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""))) {
        updates.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      }
      return { ...prev, ...updates };
    });
  };

  // Products Installed Handlers
  const handleProductInstalledChange = (index: number, val: string) => {
    const updated = [...(formData.productsInstalled || [])];
    updated[index] = val;
    setFormData((prev) => ({ ...prev, productsInstalled: updated }));
  };

  const addProductInstalled = () => {
    setFormData((prev) => ({
      ...prev,
      productsInstalled: [...(prev.productsInstalled || []), "Installed Inverter or Battery Model"],
    }));
  };

  const removeProductInstalled = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      productsInstalled: (prev.productsInstalled || []).filter((_, i) => i !== index),
    }));
  };

  // Metrics Handlers
  const handleMetricChange = (index: number, field: "label" | "value", val: string) => {
    const metrics = [...(formData.impactMetrics || [])];
    metrics[index] = { ...metrics[index], [field]: val };
    setFormData((prev) => ({ ...prev, impactMetrics: metrics }));
  };

  const addMetric = () => {
    setFormData((prev) => ({
      ...prev,
      impactMetrics: [...(prev.impactMetrics || []), { label: "Performance Metric", value: "e.g. 80% Savings" }],
    }));
  };

  const removeMetric = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      impactMetrics: (prev.impactMetrics || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const url = isNew
        ? "/api/admin/projects"
        : `/api/admin/projects/${initialProject?.id || formData.slug}`;
      const method = isNew ? "POST" : "PUT";

      const res = await authFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to save project");
      }

      setSuccessMessage(isNew ? "Installation project added successfully!" : "Project changes saved successfully!");

      if (isNew && data.project?.id) {
        setTimeout(() => {
          router.push(`/admin/projects/${data.project.id}`);
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
            href="/admin/projects"
            className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-xs font-bold text-[#ea580c] uppercase tracking-wider block">
              Turnkey Projects CMS
            </span>
            <h1 className="text-xl font-black text-[#091e3a]">
              {isNew ? "Add Commissioned Installation Site" : `Editing: ${formData.title || "Project"}`}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isNew && formData.slug && (
            <Link
              href={`/projects/${formData.slug}`}
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#091e3a] hover:text-[#ea580c] hover:border-[#ea580c]/40 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>View Live Case Study</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isNew ? "Save Project" : "Save Changes"}</span>
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

      {/* Primary Info Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <Briefcase className="w-4 h-4 text-[#ea580c]" />
          <h2 className="font-bold text-gray-900 text-sm">Facility & Installation Overview</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Project / Facility Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title || ""}
              onChange={handleTitleChange}
              placeholder="e.g. Precision Automotive Component Facility"
              className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              URL Slug *
            </label>
            <div className="flex items-center">
              <span className="bg-slate-100 border border-r-0 border-gray-200 rounded-l-xl px-3 py-2.5 text-xs text-gray-500 font-mono">
                /projects/
              </span>
              <input
                type="text"
                name="slug"
                required
                value={formData.slug || ""}
                onChange={handleChange}
                placeholder="chakan-automotive-plant"
                className="w-full bg-slate-50 border border-gray-200 rounded-r-xl px-3.5 py-2.5 text-xs text-gray-900 font-mono focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Sector / Category *
            </label>
            <select
              name="category"
              value={formData.category || "Industrial Manufacturing"}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
            >
              {PROJECT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Facility Location *
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location || ""}
              onChange={handleChange}
              placeholder="Chakan MIDC, Pune, Maharashtra"
              className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              System Installed Capacity *
            </label>
            <input
              type="text"
              name="capacity"
              required
              value={formData.capacity || ""}
              onChange={handleChange}
              placeholder="100 kVA Solar Hybrid PCU + 120 kWh BESS"
              className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Commissioning Year
            </label>
            <input
              type="text"
              name="completionYear"
              value={formData.completionYear || ""}
              onChange={handleChange}
              placeholder="2025"
              className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Image Upload Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3">
          Site Installation Photo
        </h2>

        <ImageUploadField
          label="Featured Installation Site Photo"
          value={formData.image || ""}
          onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
          description="Upload commissioned rooftop array, inverter control room, or battery bank photo."
        />
      </div>

      {/* Engineering Challenge & Solution */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
        <h2 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3">
          Case Study Details
        </h2>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Operational Challenge Faced *
          </label>
          <textarea
            name="challenge"
            rows={3}
            value={formData.challenge || ""}
            onChange={handleChange}
            placeholder="High-precision robotic welding lines and CNC machining centers experienced frequent resetting..."
            className="w-full bg-slate-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 leading-relaxed focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Electra Solar Engineering Solution *
          </label>
          <textarea
            name="solution"
            rows={3}
            value={formData.solution || ""}
            onChange={handleChange}
            placeholder="Electra Solar engineered and commissioned a turnkey 100 kVA 3-phase hybrid PCU system with 100% unbalanced load tolerance..."
            className="w-full bg-slate-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 leading-relaxed focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Client Testimonial / Feedback Quote Snippet
          </label>
          <textarea
            name="quoteSnippet"
            rows={2}
            value={formData.quoteSnippet || ""}
            onChange={handleChange}
            placeholder="The contactor-less zero-break changeover eliminated CNC resets entirely..."
            className="w-full bg-slate-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 leading-relaxed focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Products Installed & Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Products Installed List */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-sm">Products Installed</h3>
            <button
              type="button"
              onClick={addProductInstalled}
              className="text-xs font-bold text-[#ea580c] hover:text-[#c2410c] flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Model</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {formData.productsInstalled?.map((prod, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={prod}
                  onChange={(e) => handleProductInstalledChange(idx, e.target.value)}
                  placeholder="Inverter / Battery Model"
                  className="flex-1 bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c]"
                />
                {formData.productsInstalled!.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProductInstalled(idx)}
                    className="p-1.5 text-gray-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Impact Metrics List */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-sm">Key Impact Metrics</h3>
            <button
              type="button"
              onClick={addMetric}
              className="text-xs font-bold text-[#ea580c] hover:text-[#c2410c] flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Metric</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {formData.impactMetrics?.map((metric, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={metric.label}
                  onChange={(e) => handleMetricChange(idx, "label", e.target.value)}
                  placeholder="Metric Label (e.g. Savings)"
                  className="w-1/2 bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c]"
                />
                <input
                  type="text"
                  value={metric.value}
                  onChange={(e) => handleMetricChange(idx, "value", e.target.value)}
                  placeholder="Value (e.g. 64%)"
                  className="w-1/2 bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-bold focus:outline-none focus:border-[#ea580c]"
                />
                {formData.impactMetrics!.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMetric(idx)}
                    className="p-1.5 text-gray-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
