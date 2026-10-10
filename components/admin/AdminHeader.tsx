"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, ShieldCheck, Mail, CheckCircle2, AlertTriangle, LogOut } from "lucide-react";

interface AdminHeaderProps {
  gmailConnected: boolean;
  connectedEmail: string | null;
  onLogout: () => void;
  title?: string;
}

export function AdminHeader({ gmailConnected, connectedEmail, onLogout, title }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div>
        <h1 className="text-xl font-black text-gray-900 tracking-tight">
          {title || "Dashboard"}
        </h1>
        <p className="text-xs text-gray-500">
          Electra Solar Content & Systems Management
        </p>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Gmail Connection Status Pill */}
        <Link
          href="/admin/email"
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            gmailConnected
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
              : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 animate-pulse"
          }`}
          title="Click to manage Gmail Google OAuth 2.0 Integration"
        >
          <Mail className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Gmail:</span>
          {gmailConnected ? (
            <span className="flex items-center gap-1 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="max-w-[140px] truncate">{connectedEmail || "Connected"}</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Not Connected</span>
            </span>
          )}
        </Link>

        {/* Public Website Link */}
        <Link
          href="/"
          target="_blank"
          className="hidden md:flex items-center gap-1.5 text-xs font-bold text-[#091e3a] bg-slate-100 hover:bg-slate-200 hover:text-[#ea580c] border border-gray-200 px-3.5 py-1.5 rounded-full transition-colors"
        >
          <span>View Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* Sign out */}
        <button
          onClick={onLogout}
          className="p-2 text-gray-400 hover:text-rose-600 rounded-full hover:bg-gray-100 transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
