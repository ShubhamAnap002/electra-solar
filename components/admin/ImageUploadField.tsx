"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, Image as ImageIcon, X, Loader2, CheckCircle2, AlertCircle, Link as LinkIcon, RefreshCw } from "lucide-react";
import { authFetch } from "@/lib/auth/client";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  description?: string;
  recommendedSize?: string;
  className?: string;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  description,
  recommendedSize,
  className = "",
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);
    if (!file.type.startsWith("image/") && !file.name.endsWith(".svg")) {
      setError("Please select a valid image file (JPG, PNG, WEBP, SVG, GIF)");
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setError("File exceeds 15MB size limit");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await authFetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to upload file");
      }

      onChange(data.file.url);
    } catch (err: any) {
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowManualInput(!showManualInput)}
          className="text-[11px] font-semibold text-[#ea580c] hover:underline flex items-center gap-1"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showManualInput ? "Use File Uploader" : "Enter Path Manually"}</span>
        </button>
      </div>

      {description && (
        <p className="text-[11px] text-gray-500 leading-snug">{description}</p>
      )}

      {showManualInput ? (
        <div className="space-y-1.5">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/example.webp or https://..."
            className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 font-mono focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
          />
          <span className="text-[10px] text-gray-400">Direct relative path or public image URL</span>
        </div>
      ) : (
        <div>
          {value ? (
            /* Image Preview Card */
            <div className="relative group border border-gray-200 rounded-2xl bg-white p-3 flex items-center gap-4 shadow-xs">
              <div className="relative w-24 h-20 bg-slate-100 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0 flex items-center justify-center">
                {value.startsWith("/") || value.startsWith("http") ? (
                  <Image
                    src={value}
                    alt={label}
                    fill
                    className="object-contain p-1"
                    sizes="96px"
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                )}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="text-xs font-mono font-bold text-gray-800 truncate" title={value}>
                  {value}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Uploaded & Selected</span>
                  </span>
                  {recommendedSize && (
                    <span>• Rec: {recommendedSize}</span>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#091e3a] hover:text-[#ea580c] transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Replace Image</span>
                  </button>
                  <span className="text-gray-300">•</span>
                  <button
                    type="button"
                    onClick={() => onChange("")}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-rose-800 transition-colors"
                  >
                    <X className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Upload Dropzone */
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-[#ea580c] bg-orange-50/50"
                  : "border-gray-200 bg-slate-50/70 hover:bg-slate-50 hover:border-gray-300"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#ea580c] border border-orange-200 flex items-center justify-center mx-auto mb-2">
                {isUploading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <UploadCloud className="w-5 h-5" />
                )}
              </div>

              <div className="text-xs font-bold text-gray-800">
                {isUploading ? "Uploading to Media Library..." : "Click to upload or drag & drop"}
              </div>

              <div className="text-[11px] text-gray-500 mt-0.5">
                PNG, JPG, WEBP, SVG (max 15MB)
                {recommendedSize && ` • Recommended: ${recommendedSize}`}
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.svg"
            onChange={onFileInputChange}
            className="hidden"
          />
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600 mt-1">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
