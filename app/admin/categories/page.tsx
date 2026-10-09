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
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories || []);
      } else {
        setErrorMessage(data.message || "Failed to fetch categories");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setEditingCategory(null);
    setFormData({
      name: "",
      slug: "",
      shortDesc: "",
      description: "",
      iconName: "Sun",
    });
    setIsModalOpen(true);
  }

  function openEditModal(cat: CategoryInfo) {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      shortDesc: cat.shortDesc || "",
      description: cat.description || "",
      iconName: cat.iconName || "Sun",
    });
    setIsModalOpen(true);
  }

  const handleNameChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      name: val,
      // Auto-slug if creating
      slug: !editingCategory ? val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : prev.slug,
    }));
  };

  async function handleSaveCategory(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const isEdit = !!editingCategory;
      const res = await fetch("/api/admin/categories", {
        method: isEdit ? "PUT" : "POST",
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
      const res = await fetch(`/api/admin/categories?id=${deleteTarget.id}`, {
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
    <div className="space-y-6">
      {/* Notifications */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-emerald-400 hover:text-white">
            <X className="w-4 h-4" />
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
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Product Categories</h1>
              <p className="text-xs text-slate-400">Organize and manage catalog categories & technical classifications</p>
            </div>
          </div>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-medium text-sm shadow-lg shadow-cyan-950/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Filter categories by name or slug..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        />
      </div>

      {/* Grid of Categories */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mb-3" />
          <p className="text-sm font-medium">Loading catalog categories...</p>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 border border-slate-800/80 rounded-2xl">
          <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-medium text-white mb-1">No Categories Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
            {search ? "No categories matched your search criteria." : "Create your first product category to organize your catalog."}
          </p>
          {!search && (
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
            >
              <Plus className="w-4 h-4" /> Add Category
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="group bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-5 transition-all duration-200 hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                      {cat.iconName === "Battery" ? (
                        <Battery className="w-5 h-5" />
                      ) : cat.iconName === "Zap" ? (
                        <Zap className="w-5 h-5" />
                      ) : cat.iconName === "Cpu" ? (
                        <Cpu className="w-5 h-5" />
                      ) : cat.iconName === "Shield" ? (
                        <Shield className="w-5 h-5" />
                      ) : (
                        <Sun className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors text-base">
                        {cat.name}
                      </h3>
                      <span className="text-xs font-mono text-cyan-400/80">/{cat.slug}</span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/60">
                    <Package className="w-3.5 h-3.5 text-cyan-400" />
                    {cat.productCount || 0}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {cat.shortDesc || cat.description || "No description provided."}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <Link
                  href={`/products?category=${cat.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-cyan-400 font-medium transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Live
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Edit Category"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(cat)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="text-lg font-bold text-white">
                {editingCategory ? "Edit Product Category" : "Add New Category"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solar Hybrid Inverters"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">URL Slug *</label>
                <input
                  type="text"
                  required
                  disabled={!!editingCategory}
                  placeholder="e.g. solar-hybrid-inverters"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 font-mono disabled:opacity-60"
                />
                {editingCategory && (
                  <p className="text-[11px] text-slate-500 mt-1">Slug is locked to preserve existing product links.</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Icon Representation</label>
                <select
                  value={formData.iconName}
                  onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Sun">Sun (Solar / Inverter)</option>
                  <option value="Battery">Battery (BESS / Energy Storage)</option>
                  <option value="Zap">Zap (High Power / Online UPS)</option>
                  <option value="Cpu">Cpu (DSP Controller / Technology)</option>
                  <option value="Shield">Shield (Power Conditioning & Protection)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Short Summary / Tagline</label>
                <input
                  type="text"
                  placeholder="Brief 1-line summary for cards and search..."
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Detailed Description</label>
                <textarea
                  rows={3}
                  placeholder="Engineering background and overview of products in this category..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-md shadow-blue-900/30"
                >
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingCategory ? "Update Category" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Delete Category?</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Are you sure you want to remove <strong className="text-white">"{deleteTarget.name}"</strong>?
              {deleteTarget.productCount > 0 && (
                <span className="block mt-2 text-rose-400 font-semibold">
                  Warning: There are {deleteTarget.productCount} products currently assigned to this category. You must reassign or remove them first.
                </span>
              )}
            </p>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteCategory}
                disabled={isDeleting || deleteTarget.productCount > 0}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-medium text-sm transition-all"
              >
                {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
