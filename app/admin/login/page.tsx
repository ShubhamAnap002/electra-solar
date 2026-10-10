"use client";

import React, { useState, useEffect } from "react";
import { Sun, Lock, User, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if session is already active
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("electra_admin_token") : null;
    if (token) {
      fetch("/api/admin/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      })
        .then((r) => r.json())
        .then((data) => {
          if ((data.success || data.authenticated) && data.user) {
            window.location.href = "/admin";
          }
        })
        .catch(() => {});
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message || "Invalid administrator credentials");
        setLoading(false);
        return;
      }

      // Store token in localStorage as persistent client session backup for Vercel
      if (data.token) {
        localStorage.setItem("electra_admin_token", data.token);
      }

      // Hard redirect ensures the browser dispatches fresh cookies to Vercel/Next.js
      window.location.href = "/admin";
    } catch (err: any) {
      setError("An unexpected network error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Brand Icon & Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#091e3a] text-[#ea580c] shadow-lg mb-4">
            <Sun className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#091e3a]">
            ELECTRA <span className="text-[#ea580c]">SOLAR</span>
          </h1>
          <p className="text-xs uppercase font-bold tracking-widest text-gray-500 mt-1">
            Master CMS Console
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#091e3a] mb-6 pb-4 border-b border-gray-100">
            <ShieldCheck className="w-4 h-4 text-[#ea580c]" />
            <span>Secure Access Control</span>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Administrator Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ea580c] hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Master Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <span className="text-[11px] text-gray-500">
              Default password: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-800 font-mono">Electra@Solar2026!</code>
            </span>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-gray-500">
          Electra Solar Platform • Authorized Turnkey Partner
        </div>
      </div>
    </div>
  );
}
