"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  FileText,
  BookOpen,
  Briefcase,
  Image as ImageIcon,
  Globe,
  Mail,
  ExternalLink,
  LogOut,
  Sun,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  onLogout: () => void;
  gmailConnected: boolean;
  connectedEmail: string | null;
}

export function AdminSidebar({ onLogout, gmailConnected, connectedEmail }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // If on login page, don't render sidebar
  if (pathname === "/admin/login") return null;

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="w-4 h-4" />,
      exact: true,
    },
    {
      label: "Products",
      href: "/admin/products",
      icon: <Package className="w-4 h-4" />,
    },
    {
      label: "Categories",
      href: "/admin/categories",
      icon: <Layers className="w-4 h-4" />,
    },
    {
      label: "Blogs & Knowledge",
      href: "/admin/blogs",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      label: "Installations & Projects",
      href: "/admin/projects",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      label: "Website Content & FAQs",
      href: "/admin/content",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      label: "Media Library",
      href: "/admin/media",
      icon: <ImageIcon className="w-4 h-4" />,
    },
    {
      label: "SEO Management",
      href: "/admin/seo",
      icon: <Globe className="w-4 h-4" />,
    },
    {
      label: "Gmail Lead Sync",
      href: "/admin/email",
      icon: <Mail className="w-4 h-4" />,
      badge: gmailConnected ? "Active" : "Connect",
      badgeColor: gmailConnected
        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
        : "bg-amber-500/20 text-amber-300 border-amber-500/30",
    },
  ];

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <>
      {/* Mobile Hamburger Toggle Bar */}
      <div className="lg:hidden bg-[#091e3a] text-white p-4 flex items-center justify-between border-b border-white/10 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Sun className="w-5 h-5 text-[#ea580c]" />
          <span className="font-black text-sm tracking-tight text-white">
            ELECTRA <span className="text-[#ea580c]">ADMIN</span>
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#091e3a] text-white border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ea580c] flex items-center justify-center flex-shrink-0 shadow-sm">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-base font-black tracking-tight leading-none text-white">
                ELECTRA <span className="text-[#ea580c]">SOLAR</span>
              </div>
              <div className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mt-1">
                Master CMS Panel
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 py-2">
              Management Modules
            </div>

            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? "bg-[#ea580c] text-white font-bold shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={active ? "text-white" : "text-gray-400"}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full border font-bold ${
                        active
                          ? "bg-white/20 text-white border-transparent"
                          : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Utility & User Profile */}
        <div className="p-4 border-t border-white/10 space-y-2">
          {/* Live Website Shortcut */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <ExternalLink className="w-4 h-4 text-[#ea580c]" />
              <span>View Public Website</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </Link>

          {/* Logout Action */}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-rose-100 hover:bg-rose-500/20 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}
    </>
  );
}
