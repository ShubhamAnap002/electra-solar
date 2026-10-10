"use client";

import React, { useState, useEffect } from "react";
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

  const [currentUser, setCurrentUser] = useState<AdminUser | null>(user);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(!user && !isLoginPage);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      setCheckingAuth(false);
      return;
    }

    if (isLoginPage) {
      setCheckingAuth(false);
      return;
    }

    // Verify session via cookie or localStorage token
    const token = typeof window !== "undefined" ? localStorage.getItem("electra_admin_token") : null;

    fetch("/api/admin/auth/me", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if ((data.success || data.authenticated) && data.user) {
          setCurrentUser(data.user);
        } else {
          localStorage.removeItem("electra_admin_token");
          window.location.href = "/admin/login";
        }
      })
      .catch(() => {
        window.location.href = "/admin/login";
      })
      .finally(() => {
        setCheckingAuth(false);
      });
  }, [user, isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checkingAuth || !currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-[#091e3a]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#ea580c] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-500 font-semibold">Verifying administrator session...</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      localStorage.removeItem("electra_admin_token");
      await fetch("/api/admin/auth/logout", { method: "POST" });
      window.location.href = "/admin/login";
    } catch (err) {
      window.location.href = "/admin/login";
    }
  };

  // Get dynamic page title based on path
  const getPageTitle = () => {
    if (pathname === "/admin") return "Dashboard";
    if (pathname.startsWith("/admin/products/new")) return "Add New Product";
    if (pathname.startsWith("/admin/products")) return "Product Catalogue";
    if (pathname.startsWith("/admin/categories")) return "Product Categories";
    if (pathname.startsWith("/admin/blogs/new")) return "New Technical Article";
    if (pathname.startsWith("/admin/blogs")) return "Knowledge Hub Articles";
    if (pathname.startsWith("/admin/projects/new")) return "Add Commissioned Site";
    if (pathname.startsWith("/admin/projects")) return "Turnkey Installations & Projects";
    if (pathname.startsWith("/admin/content")) return "Website Content & FAQs";
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
