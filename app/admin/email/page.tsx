"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Loader2,
  Send,
  Unlink,
  Key,
  HelpCircle,
  RefreshCw,
  Save,
  Check,
  Settings,
  AlertTriangle,
} from "lucide-react";

interface GmailStatusData {
  isConnected: boolean;
  connectedEmail: string | null;
  recipientEmail: string;
  senderName: string;
  authMethod: "oauth" | "smtp" | "none";
  hasClientId: boolean;
  hasClientSecret: boolean;
  clientId: string;
  redirectUri: string;
  lastTestedAt: string | null;
  lastTestStatus: "success" | "error" | null;
  lastTestMessage: string | null;
}

export default function AdminEmailIntegrationPage() {
  const searchParams = useSearchParams();
  const urlStatus = searchParams?.get("status");
  const urlEmail = searchParams?.get("email");
  const urlError = searchParams?.get("error");

  const [data, setData] = useState<GmailStatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTesting, setIsTesting] = useState(false);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  // Form states
  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [redirectUri, setRedirectUri] = useState("");
  const [showCredentialsForm, setShowCredentialsForm] = useState(false);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (urlStatus === "connected") {
      setSuccessMessage(`Google Account (${urlEmail || "authorized"}) connected successfully!`);
    } else if (urlError) {
      setErrorMessage(decodeURIComponent(urlError));
    }
    fetchStatus();
  }, [urlStatus, urlError, urlEmail]);

  async function fetchStatus() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/gmail/status");
      const result = await res.json();
      if (result.success && result.config) {
        setData(result.config);
        setRecipientEmail(result.config.recipientEmail || "");
        setSenderName(result.config.senderName || "Electra Solar Notification");
        setClientId(result.config.clientId || "");
        setRedirectUri(result.config.redirectUri || "");
      } else {
        setErrorMessage(result.message || "Failed to load Gmail status");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Network error loading status");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    setIsSavingConfig(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const payload: any = {
        recipientEmail,
        senderName,
        clientId,
        redirectUri,
      };
      if (clientSecret) {
        payload.clientSecret = clientSecret;
      }

      const res = await fetch("/api/admin/gmail/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.message || "Failed to save configuration");
      }

      setSuccessMessage("Email settings updated successfully!");
      setClientSecret(""); // clear after saving
      fetchStatus();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to save settings");
    } finally {
      setIsSavingConfig(false);
    }
  }

  async function handleConnectGmail() {
    if (!clientId && !data?.hasClientId) {
      setErrorMessage("Please configure your Google OAuth Client ID first.");
      setShowCredentialsForm(true);
      return;
    }
    window.location.href = "/api/admin/gmail/auth";
  }

  async function handleDisconnect() {
    if (!confirm("Are you sure you want to disconnect Gmail? Website forms will be unable to deliver enquiries until reconnected.")) {
      return;
    }

    setIsDisconnecting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/admin/gmail/disconnect", { method: "POST" });
      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.message || "Failed to disconnect");
      }

      setSuccessMessage("Gmail integration disconnected.");
      fetchStatus();
    } catch (err: any) {
      setErrorMessage(err.message || "Error disconnecting Gmail");
    } finally {
      setIsDisconnecting(false);
    }
  }

  async function handleSendTestEmail() {
    setIsTesting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/admin/gmail/test-email", { method: "POST" });
      const resData = await res.json();

      if (!res.ok || !resData.success) {
        throw new Error(resData.message || "Test email delivery failed");
      }

      setSuccessMessage(resData.message || "Test email sent successfully!");
      fetchStatus();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to deliver test email");
    } finally {
      setIsTesting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-400 mb-4" />
        <p className="text-sm font-medium">Checking Gmail OAuth connection status...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Gmail Integration — Google OAuth 2.0</h1>
            <p className="text-xs text-slate-400">
              Direct form-to-inbox dispatch with official Google OAuth 2.0 authorization
            </p>
          </div>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2">
          {data?.isConnected ? (
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Connected ({data.connectedEmail})
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-slate-500" />
              Disconnected
            </span>
          )}
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
            ✕
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
            ✕
          </button>
        </div>
      )}

      {/* Connection Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">Google OAuth 2.0 Connection</h2>
              {data?.isConnected && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  gmail.send Active
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Connect the official Electra Solar Gmail account via Google's official consent screen. Customer enquiries
              submitted through website forms are immediately dispatched through this authorized account straight to
              your sales team with visitor Reply-To.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {data?.isConnected ? (
              <>
                <button
                  type="button"
                  onClick={handleSendTestEmail}
                  disabled={isTesting}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-all"
                >
                  {isTesting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {isTesting ? "Sending Test..." : "Send Test Email"}
                </button>
                <button
                  type="button"
                  onClick={handleConnectGmail}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-all"
                  title="Re-authorize Google account"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reconnect
                </button>
                <button
                  type="button"
                  onClick={handleDisconnect}
                  disabled={isDisconnecting}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/20 text-xs font-medium transition-all"
                >
                  {isDisconnecting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Unlink className="w-3.5 h-3.5" />}
                  Disconnect
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleConnectGmail}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-xl shadow-cyan-950/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Connect Gmail
              </button>
            )}
          </div>
        </div>

        {/* Delivery Details Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-500 uppercase font-semibold tracking-wider block mb-1">
              Sender Identity
            </span>
            <span className="text-sm font-semibold text-white truncate block">
              {data?.connectedEmail || "Not Connected"}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Authorized via Google OAuth consent screen
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-500 uppercase font-semibold tracking-wider block mb-1">
              Destination Recipient
            </span>
            <span className="text-sm font-semibold text-cyan-400 truncate block">
              {data?.recipientEmail || "sales@electrasolar.in"}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Receives all website quote & contact requests
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-500 uppercase font-semibold tracking-wider block mb-1">
              Last Diagnostic Test
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              {data?.lastTestStatus === "success" ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> Passed
                </span>
              ) : data?.lastTestStatus === "error" ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-400">
                  <AlertCircle className="w-3.5 h-3.5" /> Failed
                </span>
              ) : (
                <span className="text-xs text-slate-400">Never tested</span>
              )}
            </div>
            <span className="text-[11px] text-slate-400 truncate block mt-1" title={data?.lastTestMessage || ""}>
              {data?.lastTestedAt
                ? new Date(data.lastTestedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                : "Run a test email to verify delivery"}
            </span>
          </div>
        </div>
      </div>

      {/* Recipient & Configuration Settings */}
      <form onSubmit={handleSaveSettings} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div>
            <h3 className="text-base font-bold text-white">Email Delivery Configuration</h3>
            <p className="text-xs text-slate-400">Configure recipient inbox and custom sender display</p>
          </div>
          <button
            type="button"
            onClick={() => setShowCredentialsForm(!showCredentialsForm)}
            className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
          >
            <Settings className="w-3.5 h-3.5" />
            {showCredentialsForm ? "Hide OAuth Credentials" : "Edit OAuth Credentials"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Destination Electra Solar Email *
            </label>
            <input
              type="email"
              required
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="sales@electrasolar.in"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Public visitors cannot modify this. All quotes and contact form submissions arrive here.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Sender Name Display
            </label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Electra Solar Notifications"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Friendly sender name displayed in email client header.
            </p>
          </div>
        </div>

        {/* Google Cloud OAuth 2.0 Credentials (Expandable) */}
        {showCredentialsForm && (
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
              <Key className="w-4 h-4" />
              <span>Google Cloud OAuth 2.0 Credentials (Server-Stored)</span>
            </div>
            <p className="text-xs text-slate-400">
              Obtained from Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">OAuth Client ID</label>
                <input
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="xxxx.apps.googleusercontent.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  OAuth Client Secret {data?.hasClientSecret && "(Hidden for security)"}
                </label>
                <input
                  type="password"
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                  placeholder={data?.hasClientSecret ? "•••••••••••••••••••• (Leave blank to keep existing)" : "GOCSPX-xxxx"}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Authorized Redirect URI</label>
                <input
                  type="text"
                  value={redirectUri}
                  onChange={(e) => setRedirectUri(e.target.value)}
                  placeholder="http://localhost:3000/api/admin/gmail/callback"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Must match the Authorized Redirect URI listed in your Google Cloud Console.
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="submit"
            disabled={isSavingConfig}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-md shadow-blue-900/30 transition-all"
          >
            {isSavingConfig ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Configuration
          </button>
        </div>
      </form>

      {/* Step-by-Step Google Cloud Setup Guide */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <span>Google Cloud OAuth 2.0 Setup Guide</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-[11px]">
              1
            </span>
            <h4 className="font-semibold text-white pt-1">Enable Gmail API</h4>
            <p className="text-slate-400">
              Open <a href="https://console.cloud.google.com" target="_blank" rel="noreferrer" className="text-cyan-400 underline">Google Cloud Console</a>, create or select your project, and enable the <strong>Gmail API</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-[11px]">
              2
            </span>
            <h4 className="font-semibold text-white pt-1">Configure Consent Screen</h4>
            <p className="text-slate-400">
              Under <em>OAuth consent screen</em>, choose Internal (Google Workspace) or External, add your support email, and select scope <code className="text-cyan-300">https://www.googleapis.com/auth/gmail.send</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-[11px]">
              3
            </span>
            <h4 className="font-semibold text-white pt-1">Create Web Credentials</h4>
            <p className="text-slate-400">
              Create an OAuth Client ID (Web Application), set Authorized Redirect URI to <code className="text-cyan-300">{redirectUri || "http://localhost:3000/api/admin/gmail/callback"}</code>, paste Client ID & Secret above, and click Connect Gmail.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
