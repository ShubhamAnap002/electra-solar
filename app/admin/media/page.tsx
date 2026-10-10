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

    setUploading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    try {
      const res = await authFetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Upload failed");
      }

      setSuccessMessage(`Successfully uploaded ${data.uploaded?.length || 1} file(s)!`);
      fetchMedia();
    } catch (err: any) {
      setErrorMessage(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
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
    try {
      const res = await authFetch(`/api/admin/media?url=${encodeURIComponent(selectedFile.url)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete file");
      }
      setSuccessMessage("File deleted successfully");
      setSelectedFile(null);
      fetchMedia();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to delete file");
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
    <div className="space-y-6 max-w-7xl pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-orange-50 text-[#ea580c] font-bold text-xs uppercase tracking-wider border border-orange-200">
              Media Hub
            </span>
            <span className="text-xs text-gray-500 font-semibold">
              {files.length} Assets Stored
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#091e3a] mt-1">Media & Asset Library</h1>
          <p className="text-xs text-gray-600 mt-1">
            Upload equipment photos, brochures, technical datasheets, and website graphics with instant URLs.
          </p>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,application/pdf,.doc,.docx"
            multiple
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            <span>{uploading ? "Uploading..." : "Upload New Files"}</span>
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

      {/* Upload Dropzone area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="cursor-pointer border-2 border-dashed border-gray-300 hover:border-[#ea580c] bg-white hover:bg-orange-50/20 transition-all rounded-2xl p-6 text-center shadow-sm group"
      >
        <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-[#ea580c] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
          <Upload className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-gray-900 mb-1">Click to browse or drop media assets here</h3>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          Supports JPG, PNG, WEBP, SVG, and PDF datasheets. Files are instantly saved to{" "}
          <span className="font-mono text-[#ea580c] font-bold">/uploads/...</span>
        </p>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by filename..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-gray-200 self-stretch sm:self-auto">
          {(["all", "image", "document"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                typeFilter === t
                  ? "bg-[#091e3a] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t === "all" ? "All Files" : t === "image" ? "Images" : "Datasheets / Docs"}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin text-[#ea580c] mb-3" />
          <p className="text-xs font-semibold">Scanning media directories...</p>
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-3">
          <ImageIcon className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="text-sm font-bold text-gray-700">No Assets Found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            {search ? "No assets match your search term." : "Upload photos and PDFs to populate your media library."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredFiles.map((file, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedFile(file)}
              className="group cursor-pointer bg-white border border-gray-200 hover:border-[#ea580c]/50 rounded-2xl overflow-hidden transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div className="aspect-square bg-slate-50 flex items-center justify-center overflow-hidden relative border-b border-gray-100">
                {file.type === "image" ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400 p-4 text-center">
                    <FileText className="w-10 h-10 text-rose-500 mb-2" />
                    <span className="text-[10px] font-mono uppercase bg-slate-100 px-2 py-0.5 rounded text-gray-700 border border-gray-200">
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
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-gray-700 hover:text-white hover:bg-[#ea580c] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Copy URL"
                >
                  {copiedUrl === file.url ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-3">
                <p className="text-xs font-bold text-gray-900 truncate group-hover:text-[#ea580c]" title={file.name}>
                  {file.name}
                </p>
                <div className="flex items-center justify-between text-[11px] text-gray-500 mt-1">
                  <span>{formatFileSize(file.size)}</span>
                  <span className="uppercase text-[10px] font-mono text-[#ea580c] font-bold">{file.extension}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Asset Preview Modal */}
      {selectedFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-xl shadow-xl p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-base font-bold text-[#091e3a] truncate max-w-md">{selectedFile.name}</h3>
              <button
                onClick={() => setSelectedFile(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[50vh] overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center mb-4 border border-gray-200">
              {selectedFile.type === "image" ? (
                <img
                  src={selectedFile.url}
                  alt={selectedFile.name}
                  className="max-h-[48vh] max-w-full object-contain"
                />
              ) : (
                <div className="py-12 flex flex-col items-center">
                  <FileText className="w-16 h-16 text-rose-500 mb-3" />
                  <p className="text-sm font-bold text-gray-900">Document / Datasheet</p>
                  <p className="text-xs text-gray-500 mt-1 font-mono uppercase">{selectedFile.extension}</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Public Resource URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={selectedFile.url}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-gray-200 text-xs font-mono text-[#ea580c] font-bold"
                  />
                  <button
                    onClick={() => copyToClipboard(selectedFile.url)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#091e3a] hover:bg-[#07172c] text-white text-xs font-bold cursor-pointer"
                  >
                    {copiedUrl === selectedFile.url ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUrl === selectedFile.url ? "Copied" : "Copy"}</span>
                  </button>
                  <a
                    href={selectedFile.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-gray-700"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-gray-100">
                <div>
                  <span className="text-[10px] text-gray-500 block">File Size</span>
                  <span className="font-bold text-gray-900">{formatFileSize(selectedFile.size)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">Type</span>
                  <span className="font-bold text-gray-900 uppercase">{selectedFile.extension}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">Source</span>
                  <span className="font-bold text-gray-900">
                    {selectedFile.isCustomUpload ? "Uploads" : "System Asset"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                {selectedFile.isCustomUpload ? (
                  <button
                    type="button"
                    onClick={handleDeleteFile}
                    disabled={deleting}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white border border-rose-200 text-xs font-bold transition-all cursor-pointer"
                  >
                    {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                    <span>Delete File</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-gray-500 italic">System assets cannot be deleted</span>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer"
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
