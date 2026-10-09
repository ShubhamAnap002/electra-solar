"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Image as ImageIcon,
  Upload,
  FileText,
  Search,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
  FileCode,
  Filter,
} from "lucide-react";
import { MediaFile } from "@/app/api/admin/media/route";
import { authFetch } from "@/lib/auth/client";

export default function AdminMediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "image" | "document">("all");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  async function fetchMedia() {
    try {
      setLoading(true);
      const res = await authFetch("/api/admin/media");
      const data = await res.json();
      if (data.success) {
        setFiles(data.files || []);
      } else {
        setErrorMessage(data.message || "Failed to load media files");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to load media files");
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const file = selectedFiles[0];
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await authFetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to upload file");
      }

      setSuccessMessage(`File "${file.name}" uploaded successfully!`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchMedia();
    } catch (err: any) {
      setErrorMessage(err.message || "Upload error");
    } finally {
      setUploading(false);
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  async function handleDeleteFile() {
    if (!selectedFile) return;

    setDeleting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await authFetch(`/api/admin/media?url=${encodeURIComponent(selectedFile.url)}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete file");
      }

      setSuccessMessage(data.message || "File deleted successfully");
      setSelectedFile(null);
      fetchMedia();
    } catch (err: any) {
      setErrorMessage(err.message || "Delete error");
    } finally {
      setDeleting(false);
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const filteredFiles = files.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || f.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Media & Asset Library</h1>
            <p className="text-xs text-slate-400">
              Upload product photos, brochures, technical datasheets, and website graphics
            </p>
          </div>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,application/pdf,.doc,.docx"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-medium text-sm shadow-lg shadow-cyan-950/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? "Uploading..." : "Upload New File"}
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

      {/* Upload Dropzone area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="cursor-pointer border-2 border-dashed border-slate-800 hover:border-cyan-500/50 bg-slate-900/30 hover:bg-slate-900/60 transition-all rounded-2xl p-6 text-center group"
      >
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
          <Upload className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-white mb-1">Click to browse or drop assets here</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Supports JPG, PNG, WEBP, SVG, and PDF datasheets (Up to 15MB each). Files are instantly hosted at{" "}
          <span className="font-mono text-cyan-400">/uploads/...</span>
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by filename..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800 self-stretch sm:self-auto">
          {(["all", "image", "document"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                typeFilter === t
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t === "all" ? "All Files" : t === "image" ? "Images" : "Datasheets / Docs"}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mb-3" />
          <p className="text-sm font-medium">Scanning media directories...</p>
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 border border-slate-800/80 rounded-2xl">
          <ImageIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-medium text-white mb-1">No Assets Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
            {search ? "No assets match your search term." : "Upload photos and PDFs to populate your media library."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredFiles.map((file, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedFile(file)}
              className="group cursor-pointer bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between"
            >
              <div className="aspect-square bg-slate-950/60 flex items-center justify-center overflow-hidden relative border-b border-slate-800/60">
                {file.type === "image" ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center text-slate-400 p-4 text-center">
                    <FileText className="w-10 h-10 text-rose-400 mb-2" />
                    <span className="text-[10px] font-mono uppercase bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                      {file.extension}
                    </span>
                  </div>
                )}

                {/* Quick copy overlay button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(file.url);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900/90 text-slate-300 hover:text-white hover:bg-cyan-600 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Copy URL"
                >
                  {copiedUrl === file.url ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-3">
                <p className="text-xs font-medium text-white truncate group-hover:text-cyan-300" title={file.name}>
                  {file.name}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                  <span>{formatFileSize(file.size)}</span>
                  <span className="uppercase text-[10px] font-mono text-cyan-400/80">{file.extension}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Asset Preview Modal */}
      {selectedFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="text-base font-bold text-white truncate max-w-md">{selectedFile.name}</h3>
              <button
                onClick={() => setSelectedFile(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[50vh] overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center mb-4 border border-slate-800/80">
              {selectedFile.type === "image" ? (
                <img
                  src={selectedFile.url}
                  alt={selectedFile.name}
                  className="max-h-[48vh] max-w-full object-contain"
                />
              ) : (
                <div className="py-12 flex flex-col items-center">
                  <FileText className="w-16 h-16 text-rose-400 mb-3" />
                  <p className="text-sm font-semibold text-white">Document / Datasheet</p>
                  <p className="text-xs text-slate-400 mt-1 font-mono uppercase">{selectedFile.extension}</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Public Resource URL</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={selectedFile.url}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300"
                  />
                  <button
                    onClick={() => copyToClipboard(selectedFile.url)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
                  >
                    {copiedUrl === selectedFile.url ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedUrl === selectedFile.url ? "Copied" : "Copy"}
                  </button>
                  <a
                    href={selectedFile.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-slate-800/80">
                <div>
                  <span className="text-[10px] text-slate-500 block">File Size</span>
                  <span className="font-semibold text-slate-200">{formatFileSize(selectedFile.size)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Type</span>
                  <span className="font-semibold text-slate-200 uppercase">{selectedFile.extension}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Source</span>
                  <span className="font-semibold text-slate-200">
                    {selectedFile.isCustomUpload ? "Uploads" : "System Asset"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                {selectedFile.isCustomUpload ? (
                  <button
                    type="button"
                    onClick={handleDeleteFile}
                    disabled={deleting}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/20 text-xs font-semibold transition-all"
                  >
                    {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                    Delete File
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-500 italic">System assets cannot be deleted</span>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
