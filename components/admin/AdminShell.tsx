"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { AdminUser } from "@/lib/auth";

interface AdminShellProps {
  children: React.ReactNode;
  user: AdminUser | null;
  gmailConnected: boolean;
  connectedEmail: string | null;
}

export function AdminShell({ children, user, gmailConnected, connectedEmail }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!user && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [user, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#00d2ff] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-400">Authenticating administrator session...</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // Get dynamic page title based on path
  const getPageTitle = () => {
    if (pathname === "/admin") return "Dashboard";
    if (pathname.startsWith("/admin/products/new")) return "Add New Product";
    if (pathname.startsWith("/admin/products")) return "Product Catalogue";
    if (pathname.startsWith("/admin/categories")) return "Product Categories";
    if (pathname.startsWith("/admin/content")) return "Website Content Management";
    if (pathname.startsWith("/admin/media")) return "Media Library";
    if (pathname.startsWith("/admin/seo")) return "SEO Management";
    if (pathname.startsWith("/admin/email")) return "Gmail & Email Integration";
    return "Admin Console";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <AdminSidebar
        onLogout={handleLogout}
        gmailConnected={gmailConnected}
        connectedEmail={connectedEmail}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <AdminHeader
          title={getPageTitle()}
          gmailConnected={gmailConnected}
          connectedEmail={connectedEmail}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
