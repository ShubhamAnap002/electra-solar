import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { getStoredGmailConfig } from "@/lib/store";
import { AdminShell } from "@/components/admin/AdminShell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const headerList = headers();
  const pathname = headerList.get("x-pathname") || "";

  // Check auth
  const user = getAuthenticatedAdmin();

  // If unauthenticated, redirect to login
  // Note: /admin/login handles its own unauthenticated state
  const isLoginPage = pathname === "/admin/login";

  const gmailConfig = getStoredGmailConfig();

  return (
    <AdminShell
      user={user}
      gmailConnected={gmailConfig.isConnected}
      connectedEmail={gmailConfig.connectedEmail}
    >
      {children}
    </AdminShell>
  );
}
