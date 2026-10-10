"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Layers,
  Plus,
  Search,
  Edit2,
  Trash2,
  Package,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Loader2,
  X,
  Sun,
  Battery,
  Zap,
  Cpu,
  Shield,
  HelpCircle,
} from "lucide-react";
import { CategoryInfo } from "@/lib/data/products";
import { authFetch } from "@/lib/auth/client";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryInfo | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    shortDesc: "",
    description: "",
    iconName: "Sun",
  });

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState<CategoryInfo | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      setLoading(true);
      const res = await authFetch("/api/admin/categories");
      const data = await res.json();
      if (data.success && data.categories) {
        setCategories(data.categories);
      } else {
        setErrorMessage(data.message || "Failed to load categories");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  const renderIcon = (iconName: string) => {
    const props = { className: "w-5 h-5" };
    switch (iconName) {
      case "Sun":
        return <Sun {...props} className="w-5 h-5 text-[#ea580c]" />;
      case "Battery":
        return <Battery {...props} className="w-5 h-5 text-emerald-600" />;
      case "Zap":
        return <Zap {...props} className="w-5 h-5 text-amber-500" />;
      case "Cpu":
        return <Cpu {...props} className="w-5 h-5 text-blue-600" />;
      case "Shield":
        return <Shield {...props} className="w-5 h-5 text-purple-600" />;
      default:
        return <HelpCircle {...props} className="w-5 h-5 text-gray-500" />;
    }
  };

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      slug: "",
      shortDesc: "",
      description: "",
      iconName: "Sun",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cat: CategoryInfo) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      shortDesc: cat.shortDesc || "",
      description: cat.description || "",
      iconName: cat.iconName || "Sun",
    });
    setIsModalOpen(true);
  };

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: editingCategory ? prev.slug : name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    }));
  };

  async function handleSaveCategory(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const isEdit = !!editingCategory;
    const url = isEdit ? `/api/admin/categories?id=${editingCategory.id}` : "/api/admin/categories";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await authFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to save category");
      }

      setSuccessMessage(isEdit ? "Category updated successfully" : "Category created successfully");
      setIsModalOpen(false);
      fetchCategories();
    } catch (err: any) {
      setErrorMessage(err.message || "Error saving category");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteCategory() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await authFetch(`/api/admin/categories?id=${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete category");
      }

      setSuccessMessage(data.message || "Category deleted successfully");
      setDeleteTarget(null);
      fetchCategories();
    } catch (err: any) {
      setErrorMessage(err.message || "Error deleting category");
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  }

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase()) ||
      c.shortDesc?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-orange-50 text-[#ea580c] font-bold text-xs uppercase tracking-wider border border-orange-200">
              Taxonomy & Grouping
            </span>
            <span className="text-xs text-gray-500 font-semibold">
              {categories.length} Active Categories
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#091e3a] mt-1">Product Categories</h1>
          <p className="text-xs text-gray-600 mt-1">
            Organize catalog categories, technical classifications, and navigation filters.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
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
            <X className="w-4 h-4" />
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
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Filter categories by name, slug, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin text-[#ea580c] mb-3" />
          <p className="text-xs font-semibold">Loading catalog categories...</p>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-3">
          <Layers className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="text-sm font-bold text-gray-700">No Categories Found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            {search ? "No categories matched your search criteria." : "Create your first product category."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white border border-gray-200 hover:border-[#ea580c]/40 rounded-2xl p-5 transition-all shadow-sm flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
                    {renderIcon(cat.iconName || "Sun")}
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[#091e3a] font-bold text-[10px] border border-gray-200 flex items-center gap-1">
                    <Package className="w-3 h-3 text-[#ea580c]" />
                    <span>{cat.productCount} Products</span>
                  </span>
                </div>

                <h3 className="font-bold text-sm text-[#091e3a] group-hover:text-[#ea580c] transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] font-mono text-gray-400 block mb-2">/{cat.slug}</span>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {cat.shortDesc || cat.description || "No description provided."}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href={`/products/${cat.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-[#ea580c] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Live</span>
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-[#091e3a] hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Edit Category"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(cat)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg shadow-xl p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-base font-bold text-[#091e3a]">
                {editingCategory ? "Edit Product Category" : "Add New Category"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solar Hybrid Inverters"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  disabled={!!editingCategory}
                  placeholder="e.g. solar-hybrid-inverters"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 font-mono disabled:opacity-60 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                />
                {editingCategory && (
                  <p className="text-[11px] text-gray-500 mt-1">Slug is locked to preserve existing product links.</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Icon Representation
                </label>
                <select
                  value={formData.iconName}
                  onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                >
                  <option value="Sun">Sun (Solar / Inverter)</option>
                  <option value="Battery">Battery (BESS / Energy Storage)</option>
                  <option value="Zap">Zap (High Power / Online UPS)</option>
                  <option value="Cpu">Cpu (DSP Controller / Technology)</option>
                  <option value="Shield">Shield (Power Conditioning & Protection)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Short Summary / Tagline
                </label>
                <input
                  type="text"
                  placeholder="Brief 1-line summary for cards..."
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Engineering background and overview..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 leading-relaxed focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{editingCategory ? "Update Category" : "Create Category"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-xl p-6">
            <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500 mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#091e3a] mb-2">Delete Category?</h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Are you sure you want to remove <strong className="text-gray-900">&quot;{deleteTarget.name}&quot;</strong>?
              {deleteTarget.productCount > 0 && (
                <span className="block mt-2 text-rose-600 font-bold">
                  Warning: There are {deleteTarget.productCount} products currently assigned to this category. You must reassign or remove them first.
                </span>
              )}
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteCategory}
                disabled={isDeleting || deleteTarget.productCount > 0}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
