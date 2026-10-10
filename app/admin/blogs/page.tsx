"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  User,
  Sparkles,
} from "lucide-react";
import { BlogPost } from "@/lib/data/blog";
import { authFetch } from "@/lib/auth/client";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await authFetch("/api/admin/blogs");
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (err) {
      console.error("Failed to fetch blog posts", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await authFetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setBlogs(blogs.filter((b) => b.id !== id));
        setDeleteConfirmId(null);
        setActionMessage("Article successfully deleted.");
        setTimeout(() => setActionMessage(null), 4000);
      }
    } catch (err) {
      console.error("Failed to delete blog post", err);
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(blogs.map((b) => b.category)));

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-orange-50 text-[#ea580c] font-bold text-xs uppercase tracking-wider border border-orange-200">
              Content Engine
            </span>
            <span className="text-xs text-gray-500 font-semibold">
              {blogs.length} Published Articles
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#091e3a] mt-1">
            Knowledge Hub & Blog Articles
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            Manage technical articles, sizing case studies, PM Surya Ghar guides, and industrial power insights.
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Technical Article</span>
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
            placeholder="Search articles by title, author, or keywords..."
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
          <option value="all">All Article Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Articles Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin text-[#ea580c]" />
            <p className="text-xs font-semibold">Loading technical articles...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-16 text-center text-gray-500 space-y-3">
            <BookOpen className="w-10 h-10 mx-auto text-gray-300" />
            <p className="text-sm font-bold text-gray-700">No articles match your search filter</p>
            <p className="text-xs text-gray-500">Try modifying your query or publish a new article.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredBlogs.map((b) => (
              <div
                key={b.id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
              >
                {/* Left Info with Image */}
                <div className="flex items-start gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-gray-200 flex-shrink-0">
                    <Image
                      src={b.coverImage || "/images/showcase/industrial-solar.jpg"}
                      alt={b.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[#091e3a] font-bold text-[10px] uppercase tracking-wider border border-gray-200">
                        {b.category}
                      </span>
                      {b.featured && (
                        <span className="px-2 py-0.5 rounded-md bg-orange-100 text-[#ea580c] font-black text-[10px] uppercase tracking-wider border border-orange-200 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Featured Hero</span>
                        </span>
                      )}
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{b.publishedAt}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{b.readTime}</span>
                    </div>

                    <h3 className="font-bold text-sm text-[#091e3a] hover:text-[#ea580c] transition-colors line-clamp-1">
                      {b.title}
                    </h3>

                    <p className="text-xs text-gray-600 line-clamp-1 max-w-2xl">
                      {b.summary}
                    </p>

                    <p className="text-[11px] text-gray-500">
                      Author: <span className="font-semibold text-gray-700">{b.author}</span> ({b.authorRole})
                    </p>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                  <Link
                    href={`/blog/${b.slug}`}
                    target="_blank"
                    className="p-2 rounded-xl text-gray-500 hover:text-[#ea580c] hover:bg-white border border-transparent hover:border-gray-200 transition-colors"
                    title="View live article"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/admin/blogs/${b.id}`}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-[#091e3a] text-[#091e3a] hover:text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>

                  {deleteConfirmId === b.id ? (
                    <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 rounded-xl p-1">
                      <button
                        onClick={() => handleDelete(b.id)}
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
                      onClick={() => setDeleteConfirmId(b.id)}
                      className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete article"
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
