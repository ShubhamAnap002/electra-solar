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
    <div className="min-h-screen bg-gradient-to-br from-[#061528] via-[#091e3a] to-[#07172c] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Brand Icon & Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#015cbb] via-[#00d2ff] to-[#51b2e3] p-0.5 shadow-xl shadow-[#00d2ff]/20 mb-4">
            <div className="w-full h-full bg-[#091e3a] rounded-[14px] flex items-center justify-center">
              <Sun className="w-8 h-8 text-[#00d2ff]" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            ELECTRA <span className="text-[#00d2ff]">SOLAR</span>
          </h1>
          <p className="text-xs uppercase font-bold tracking-widest text-cyan-200/70 mt-1">
            Enterprise Admin Console
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#00d2ff] mb-6 pb-4 border-b border-white/10">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Access Control</span>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
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
                  className="w-full bg-black/40 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00d2ff] focus:ring-1 focus:ring-[#00d2ff] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
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
                  className="w-full bg-black/40 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00d2ff] focus:ring-1 focus:ring-[#00d2ff] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00d2ff] hover:bg-[#00b4d8] text-[#091e3a] font-black py-3.5 rounded-xl text-sm uppercase tracking-wider shadow-lg shadow-[#00d2ff]/25 hover:shadow-[#00d2ff]/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <span className="text-[11px] text-gray-400">
              Default password: <code className="bg-black/40 px-1.5 py-0.5 rounded text-cyan-200">Electra@Solar2026!</code>
            </span>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-gray-500">
          Electra Solar Platform • Authorized EnerTech Turnkey Partner
        </div>
      </div>
    </div>
  );
}
