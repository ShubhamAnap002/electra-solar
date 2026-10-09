"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

export function Modal({ isOpen, onClose, title, children, maxWidth = "lg" }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog - Deye Clean White Style */}
      <div
        className={cn(
          "relative w-full rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 text-left shadow-2xl transition-all z-10 my-8 text-gray-800 max-h-[90vh] overflow-y-auto",
          maxWidthClasses[maxWidth]
        )}
      >
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          {title && <h3 className="text-xl font-black text-[#222222] tracking-tight">{title}</h3>}
          <button
            type="button"
            className="rounded-full p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors ml-auto"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
