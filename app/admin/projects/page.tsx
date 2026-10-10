"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  Zap,
} from "lucide-react";
import { Project } from "@/lib/data/projects";
import { authFetch } from "@/lib/auth/client";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await authFetch("/api/admin/projects");
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error("Failed to fetch projects", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await authFetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProjects(projects.filter((p) => p.id !== id));
        setDeleteConfirmId(null);
        setActionMessage("Commissioned project site successfully deleted.");
        setTimeout(() => setActionMessage(null), 4000);
      }
    } catch (err) {
      console.error("Failed to delete project", err);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.capacity.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(projects.map((p) => p.category)));

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-orange-50 text-[#ea580c] font-bold text-xs uppercase tracking-wider border border-orange-200">
              Field Commissioning
            </span>
            <span className="text-xs text-gray-500 font-semibold">
              {projects.length} Commissioned Sites
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#091e3a] mt-1">
            Turnkey Installation Projects & Case Studies
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            Manage real-world industrial installations, hospital solar UPS sites, luxury villa storage, and cold chains.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Commissioned Site</span>
        </Link>
      </div>

      {actionMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by facility name, location, or system capacity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-64 py-2 px-3 bg-slate-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
        >
          <option value="all">All Sectors & Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Projects Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin text-[#ea580c]" />
            <p className="text-xs font-semibold">Loading commissioned projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-16 text-center text-gray-500 space-y-3">
            <Briefcase className="w-10 h-10 mx-auto text-gray-300" />
            <p className="text-sm font-bold text-gray-700">No projects match your filter</p>
            <p className="text-xs text-gray-500">Try modifying your query or add a new commissioned site.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
              >
                {/* Left Info with Image */}
                <div className="flex items-start gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-gray-200 flex-shrink-0">
                    <Image
                      src={p.image || "/images/showcase/industrial-solar.jpg"}
                      alt={p.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[#091e3a] font-bold text-[10px] uppercase tracking-wider border border-gray-200">
                        {p.category}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-[#ea580c] font-bold flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        <span>{p.capacity}</span>
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{p.completionYear}</span>
                    </div>

                    <h3 className="font-bold text-sm text-[#091e3a] hover:text-[#ea580c] transition-colors line-clamp-1">
                      {p.title}
                    </h3>

                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>{p.location}</span>
                    </p>

                    <p className="text-xs text-gray-600 line-clamp-1 max-w-2xl">
                      {p.solution}
                    </p>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                  <Link
                    href={`/projects/${p.slug}`}
                    target="_blank"
                    className="p-2 rounded-xl text-gray-500 hover:text-[#ea580c] hover:bg-white border border-transparent hover:border-gray-200 transition-colors"
                    title="View live case study"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/admin/projects/${p.id}`}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-[#091e3a] text-[#091e3a] hover:text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>

                  {deleteConfirmId === p.id ? (
                    <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 rounded-xl p-1">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] transition-colors cursor-pointer"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-2 py-1 text-gray-600 hover:text-gray-900 text-[11px] font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(p.id)}
                      className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
