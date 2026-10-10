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
  Package,
  Layers,
  FileText,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Product, ProductSpec, CATEGORIES } from "@/lib/data/products";
import { authFetch } from "@/lib/auth/client";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

interface ProductEditorFormProps {
  initialProduct?: Product;
  isNew?: boolean;
}

export function ProductEditorForm({ initialProduct, isNew = false }: ProductEditorFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"general" | "content" | "features" | "specs">("general");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: initialProduct?.name || "",
    slug: initialProduct?.slug || "",
    modelCode: initialProduct?.modelCode || "",
    series: initialProduct?.series || "Flagship Series",
    category: initialProduct?.category || "solar-hybrid-inverters",
    categoryName: initialProduct?.categoryName || "Solar Hybrid Inverters",
    highlightBadge: initialProduct?.highlightBadge || "High Efficiency",
    capacityRange: initialProduct?.capacityRange || "10 kVA – 300 kVA",
    phase: initialProduct?.phase || "3-Phase",
    technology: initialProduct?.technology || "High-Frequency DSP Controlled",
    efficiency: initialProduct?.efficiency || "98.4%",
    dcBusVoltage: initialProduct?.dcBusVoltage || "360V – 750V",
    mpptChannels: initialProduct?.mpptChannels || "Dual MPPT",
    image: initialProduct?.image || "/images/products/sunmagic-3ph.webp",
    tagline: initialProduct?.tagline || "",
    description: initialProduct?.description || "",
    idealFor: initialProduct?.idealFor || "Industrial & Commercial Facilities",
    warranty: initialProduct?.warranty || "5 Years Factory Warranty",
    datasheetUrl: initialProduct?.datasheetUrl || "",
    keyFeatures: initialProduct?.keyFeatures || [
      "100% unbalanced phase load tolerance for uneven industrial loads.",
      "< 5ms zero-break UPS transfer prevents server and CNC restarts.",
      "Dual MPPT channels with 99.9% dynamic tracking efficiency.",
      "Smart auto-start DG synchronization reduces diesel consumption by 70%.",
    ],
    protections: initialProduct?.protections || [
      "Anti-Islanding Protection (IEEE 1547)",
      "PV Reverse Polarity Guard",
      "Short Circuit & Over-Current Isolation",
      "Galvanic Isolation Surge Diverter",
    ],
    specs: initialProduct?.specs || [
      { category: "Solar PV Input", label: "Max DC Input Power", value: "15,000 Wp" },
      { category: "Solar PV Input", label: "MPPT Voltage Range", value: "150V – 850V" },
      { category: "Inverter Output", label: "Nominal AC Output", value: "10 kVA / 10 kW" },
      { category: "Inverter Output", label: "Transfer Time", value: "< 5ms Zero Break" },
      { category: "Battery System", label: "Battery Voltage Range", value: "40V – 60V Low Voltage" },
      { category: "Physical Specs", label: "Protection Rating", value: "IP65 Outdoor Rated" },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Features list handlers
  const handleFeatureChange = (index: number, val: string) => {
    const updated = [...(formData.keyFeatures || [])];
    updated[index] = val;
    setFormData((prev) => ({ ...prev, keyFeatures: updated }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      keyFeatures: [...(prev.keyFeatures || []), "New technical feature specification"],
    }));
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      keyFeatures: (prev.keyFeatures || []).filter((_, i) => i !== index),
    }));
  };

  // Specs table handlers
  const handleSpecChange = (index: number, field: keyof ProductSpec, val: string) => {
    const updated = [...(formData.specs || [])];
    updated[index] = { ...updated[index], [field]: val };
    setFormData((prev) => ({ ...prev, specs: updated }));
  };

  const addSpecRow = () => {
    setFormData((prev) => ({
      ...prev,
      specs: [
        ...(prev.specs || []),
        { category: "General", label: "Specification Label", value: "Specification Value" },
      ],
    }));
  };

  const removeSpecRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specs: (prev.specs || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const url = isNew
        ? "/api/admin/products"
        : `/api/admin/products/${initialProduct?.id || formData.slug}`;
      const method = isNew ? "POST" : "PUT";

      const res = await authFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMessage(data.message || "Failed to save product.");
        setLoading(false);
        return;
      }

      setSuccessMessage(
        isNew
          ? "Product created successfully! Changes are live on the website."
          : "Product updated successfully! Specifications refreshed on the website."
      );

      if (isNew && data.product?.id) {
        setTimeout(() => {
          router.push(`/admin/products/${data.product.id}`);
        }, 1500);
      }
    } catch (err: any) {
      setErrorMessage("Network error occurred while saving product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-gray-900 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">
              {isNew ? "Add New Commercial Product" : `Edit ${formData.name || "Product"}`}
            </h2>
            <p className="text-xs text-gray-500">
              {isNew
                ? "Configure hardware identity, technical parameters, and category."
                : `Model Code: ${formData.modelCode || "Unspecified"}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isNew && formData.slug && (
            <Link
              href={`/products/${formData.category}/${formData.slug}`}
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#091e3a] hover:text-[#ea580c] hover:border-[#ea580c]/40 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>View Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save & Publish</span>
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

      {/* Editor Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "general"
              ? "bg-[#091e3a] text-white shadow-xs"
              : "text-gray-500 hover:text-gray-900 hover:bg-slate-100"
          }`}
        >
          General & Specs
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("content")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "content"
              ? "bg-[#091e3a] text-white shadow-xs"
              : "text-gray-500 hover:text-gray-900 hover:bg-slate-100"
          }`}
        >
          Descriptions & Media
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("features")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "features"
              ? "bg-[#091e3a] text-white shadow-xs"
              : "text-gray-500 hover:text-gray-900 hover:bg-slate-100"
          }`}
        >
          Key Features & Protections
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("specs")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "specs"
              ? "bg-[#091e3a] text-white shadow-xs"
              : "text-gray-500 hover:text-gray-900 hover:bg-slate-100"
          }`}
        >
          Technical Specifications Table ({formData.specs?.length || 0})
        </button>
      </div>

      {/* Tab 1: General & Hardware Info */}
      {activeTab === "general" && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-6">
          <h3 className="font-bold text-gray-900 text-sm border-b pb-3">Hardware Identification</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="e.g. SunMagic REeFI 3-Phase"
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                URL Slug *
              </label>
              <input
                type="text"
                name="slug"
                required
                value={formData.slug || ""}
                onChange={handleChange}
                placeholder="e.g. sunmagic-three-phase-solar-hybrid-inverter"
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 font-mono focus:outline-none focus:border-[#ea580c]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Model Code *
              </label>
              <input
                type="text"
                name="modelCode"
                required
                value={formData.modelCode || ""}
                onChange={handleChange}
                placeholder="e.g. SUN-10/20/30/50K-SG06LP3"
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 font-mono focus:outline-none focus:border-[#ea580c]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <select
                name="category"
                value={formData.category || "solar-hybrid-inverters"}
                onChange={(e) => {
                  const cat = CATEGORIES.find((c) => c.slug === e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    category: e.target.value as any,
                    categoryName: cat?.name || e.target.value,
                  }));
                }}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Capacity Range
              </label>
              <input
                type="text"
                name="capacityRange"
                value={formData.capacityRange || ""}
                onChange={handleChange}
                placeholder="e.g. 10 kVA – 300 kVA"
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Electrical Phase
              </label>
              <select
                name="phase"
                value={formData.phase || "3-Phase"}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c]"
              >
                <option value="1-Phase">1-Phase</option>
                <option value="3-Phase">3-Phase</option>
                <option value="1-Phase & 3-Phase">1-Phase & 3-Phase</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Peak Efficiency
              </label>
              <input
                type="text"
                name="efficiency"
                value={formData.efficiency || ""}
                onChange={handleChange}
                placeholder="e.g. 98.4%"
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Highlight Badge
              </label>
              <input
                type="text"
                name="highlightBadge"
                value={formData.highlightBadge || ""}
                onChange={handleChange}
                placeholder="e.g. Flagship 3-Phase PCU"
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Inverter Series
              </label>
              <input
                type="text"
                name="series"
                value={formData.series || ""}
                onChange={handleChange}
                placeholder="e.g. SunMagic Industrial"
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Content & Media */}
      {activeTab === "content" && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-6">
          <h3 className="font-bold text-gray-900 text-sm border-b pb-3">Marketing & Descriptive Content</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Marketing Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline || ""}
                onChange={handleChange}
                placeholder="e.g. Industrial 3-phase hybrid inverter with 100% phase unbalance tolerance"
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Detailed Product Overview
              </label>
              <textarea
                name="description"
                rows={5}
                value={formData.description || ""}
                onChange={handleChange}
                placeholder="Comprehensive technical description of the equipment..."
                className="w-full bg-slate-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 leading-relaxed focus:outline-none focus:border-[#ea580c]"
              />
            </div>

            <div>
              <ImageUploadField
                label="Primary Product Equipment Photo"
                value={formData.image || ""}
                onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
                description="Upload high-resolution transparent PNG or WebP of the inverter or battery cabinet."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Datasheet Download URL
                </label>
                <input
                  type="text"
                  name="datasheetUrl"
                  value={formData.datasheetUrl || ""}
                  onChange={handleChange}
                  placeholder="/downloads/datasheets/sunmagic-3ph.pdf"
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 font-mono focus:outline-none focus:border-[#ea580c]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Warranty Term
                </label>
                <input
                  type="text"
                  name="warranty"
                  value={formData.warranty || ""}
                  onChange={handleChange}
                  placeholder="5 Years Factory Warranty"
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Ideal Application Sector
                </label>
                <input
                  type="text"
                  name="idealFor"
                  value={formData.idealFor || ""}
                  onChange={handleChange}
                  placeholder="Industrial & Commercial Facilities"
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Key Features & Protections */}
      {activeTab === "features" && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Key Engineering Features</h3>
                <p className="text-xs text-gray-500">Bullets displayed in the main product feature list</p>
              </div>
              <button
                type="button"
                onClick={addFeature}
                className="bg-blue-50 text-[#015cbb] hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Bullet</span>
              </button>
            </div>

            <div className="space-y-2">
              {(formData.keyFeatures || []).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-6 text-center text-xs font-bold text-gray-400">{idx + 1}.</span>
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    className="flex-1 bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c]"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(idx)}
                    className="p-2 text-gray-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Technical Specifications Table */}
      {activeTab === "specs" && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Technical Specifications Table</h3>
              <p className="text-xs text-gray-500">Structured parameters displayed on public product page</p>
            </div>
            <button
              type="button"
              onClick={addSpecRow}
              className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Spec Row</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-gray-500 uppercase tracking-wider font-bold border-b">
                <tr>
                  <th className="py-2.5 px-3">Subsystem Category</th>
                  <th className="py-2.5 px-3">Parameter Label</th>
                  <th className="py-2.5 px-3">Rated Value</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(formData.specs || []).map((spec, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={spec.category}
                        onChange={(e) => handleSpecChange(idx, "category", e.target.value)}
                        placeholder="e.g. Solar PV Input"
                        className="w-full bg-slate-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-900"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={spec.label}
                        onChange={(e) => handleSpecChange(idx, "label", e.target.value)}
                        placeholder="e.g. MPPT Voltage Range"
                        className="w-full bg-slate-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-900"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(idx, "value", e.target.value)}
                        placeholder="e.g. 150V – 850V"
                        className="w-full bg-slate-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-gray-900"
                      />
                    </td>
                    <td className="py-2 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => removeSpecRow(idx)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
