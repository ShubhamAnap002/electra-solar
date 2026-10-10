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
import { authFetch } from "@/lib/auth/client";

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
      const res = await authFetch("/api/admin/gmail/status");
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

      const res = await authFetch("/api/admin/gmail/config", {
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
      const res = await authFetch("/api/admin/gmail/disconnect", { method: "POST" });
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
      const res = await authFetch("/api/admin/gmail/test-email", { method: "POST" });
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
        <Loader2 className="w-10 h-10 animate-spin text-[#ea580c] mb-4" />
        <p className="text-sm font-medium">Checking Gmail OAuth connection status...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#ea580c]">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#091e3a] tracking-tight">Gmail Integration — Google OAuth 2.0</h1>
            <p className="text-xs text-gray-500">
              Direct form-to-inbox dispatch with official Google OAuth 2.0 authorization
            </p>
          </div>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2">
          {data?.isConnected ? (
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Connected ({data.connectedEmail})
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-600">
              <span className="w-2 h-2 rounded-full bg-gray-400" />
              Disconnected
            </span>
          )}
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-emerald-700 hover:text-emerald-900 font-bold">
            ✕
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-red-700 hover:text-red-900 font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Connection Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#091e3a]">Google OAuth 2.0 Connection</h2>
              {data?.isConnected && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-200">
                  gmail.send Active
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
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
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#ea580c] border border-orange-200 text-xs font-semibold transition-all"
                >
                  {isTesting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {isTesting ? "Sending Test..." : "Send Test Email"}
                </button>
                <button
                  type="button"
                  onClick={handleConnectGmail}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium transition-all"
                  title="Re-authorize Google account"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reconnect
                </button>
                <button
                  type="button"
                  onClick={handleDisconnect}
                  disabled={isDisconnecting}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-medium transition-all"
                >
                  {isDisconnecting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Unlink className="w-3.5 h-3.5" />}
                  Disconnect
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleConnectGmail}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#ea580c] hover:bg-orange-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
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
          <div className="p-4 rounded-xl bg-slate-50 border border-gray-200">
            <span className="text-[11px] text-gray-500 uppercase font-semibold tracking-wider block mb-1">
              Sender Identity
            </span>
            <span className="text-sm font-semibold text-[#091e3a] truncate block">
              {data?.connectedEmail || "Not Connected"}
            </span>
            <span className="text-[11px] text-gray-500 mt-1 block">
              Authorized via Google OAuth consent screen
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-gray-200">
            <span className="text-[11px] text-gray-500 uppercase font-semibold tracking-wider block mb-1">
              Destination Recipient
            </span>
            <span className="text-sm font-semibold text-[#ea580c] truncate block">
              {data?.recipientEmail || "sales@electrasolar.in"}
            </span>
            <span className="text-[11px] text-gray-500 mt-1 block">
              Receives all website quote & contact requests
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-gray-200">
            <span className="text-[11px] text-gray-500 uppercase font-semibold tracking-wider block mb-1">
              Last Diagnostic Test
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              {data?.lastTestStatus === "success" ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <Check className="w-3.5 h-3.5" /> Passed
                </span>
              ) : data?.lastTestStatus === "error" ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
                  <AlertCircle className="w-3.5 h-3.5" /> Failed
                </span>
              ) : (
                <span className="text-xs text-gray-500">Never tested</span>
              )}
            </div>
            <span className="text-[11px] text-gray-500 truncate block mt-1" title={data?.lastTestMessage || ""}>
              {data?.lastTestedAt
                ? new Date(data.lastTestedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                : "Run a test email to verify delivery"}
            </span>
          </div>
        </div>
      </div>

      {/* Recipient & Configuration Settings */}
      <form onSubmit={handleSaveSettings} className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-[#091e3a]">Email Delivery Configuration</h3>
            <p className="text-xs text-gray-500">Configure recipient inbox and custom sender display</p>
          </div>
          <button
            type="button"
            onClick={() => setShowCredentialsForm(!showCredentialsForm)}
            className="inline-flex items-center gap-1.5 text-xs text-[#ea580c] hover:text-orange-700 font-semibold"
          >
            <Settings className="w-3.5 h-3.5" />
            {showCredentialsForm ? "Hide OAuth Credentials" : "Edit OAuth Credentials"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Destination Electra Solar Email *
            </label>
            <input
              type="email"
              required
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="sales@electrasolar.in"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              Public visitors cannot modify this. All quotes and contact form submissions arrive here.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Sender Name Display
            </label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Electra Solar Notifications"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              Friendly sender name displayed in email client header.
            </p>
          </div>
        </div>

        {/* Google Cloud OAuth 2.0 Credentials (Expandable) */}
        {showCredentialsForm && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-gray-200 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-[#ea580c] text-xs font-bold">
              <Key className="w-4 h-4" />
              <span>Google Cloud OAuth 2.0 Credentials (Server-Stored)</span>
            </div>
            <p className="text-xs text-gray-600">
              Obtained from Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">OAuth Client ID</label>
                <input
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="xxxx.apps.googleusercontent.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-300 text-xs text-gray-900 font-mono focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  OAuth Client Secret {data?.hasClientSecret && "(Hidden for security)"}
                </label>
                <input
                  type="password"
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                  placeholder={data?.hasClientSecret ? "•••••••••••••••••••• (Leave blank to keep existing)" : "GOCSPX-xxxx"}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-300 text-xs text-gray-900 font-mono focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Authorized Redirect URI</label>
                <input
                  type="text"
                  value={redirectUri}
                  onChange={(e) => setRedirectUri(e.target.value)}
                  placeholder="http://localhost:3000/api/admin/gmail/callback"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-300 text-xs text-gray-900 font-mono focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
                />
                <span className="text-[11px] text-gray-500 mt-1 block">
                  Must match the Authorized Redirect URI listed in your Google Cloud Console.
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={isSavingConfig}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ea580c] hover:bg-orange-700 text-white font-bold text-xs shadow-md transition-all"
          >
            {isSavingConfig ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Configuration
          </button>
        </div>
      </form>

      {/* Step-by-Step Google Cloud Setup Guide */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-[#091e3a] font-bold text-sm">
          <HelpCircle className="w-4 h-4 text-[#ea580c]" />
          <span>Google Cloud OAuth 2.0 Setup Guide</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-700 leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-[#091e3a] text-white font-bold flex items-center justify-center text-[11px]">
              1
            </span>
            <h4 className="font-bold text-[#091e3a] pt-1">Enable Gmail API</h4>
            <p className="text-gray-600">
              Open <a href="https://console.cloud.google.com" target="_blank" rel="noreferrer" className="text-[#ea580c] underline font-medium">Google Cloud Console</a>, create or select your project, and enable the <strong>Gmail API</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-[#091e3a] text-white font-bold flex items-center justify-center text-[11px]">
              2
            </span>
            <h4 className="font-bold text-[#091e3a] pt-1">Configure Consent Screen</h4>
            <p className="text-gray-600">
              Under <em>OAuth consent screen</em>, choose Internal (Google Workspace) or External, add your support email, and select scope <code className="bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-[11px]">https://www.googleapis.com/auth/gmail.send</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-[#091e3a] text-white font-bold flex items-center justify-center text-[11px]">
              3
            </span>
            <h4 className="font-bold text-[#091e3a] pt-1">Create Web Credentials</h4>
            <p className="text-gray-600">
              Create an OAuth Client ID (Web Application), set Authorized Redirect URI to <code className="bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-[11px]">{redirectUri || "http://localhost:3000/api/admin/gmail/callback"}</code>, paste Client ID & Secret above, and click Connect Gmail.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
