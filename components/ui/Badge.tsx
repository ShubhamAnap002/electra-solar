import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "solar" | "green" | "purple" | "slate";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "solar", size = "sm", className }: BadgeProps) {
  const variantStyles = {
    blue: "bg-slate-100 text-[#091e3a] border border-slate-200 font-semibold",
    solar: "bg-orange-50 text-[#ea580c] border border-orange-200 font-bold",
    green: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    purple: "bg-purple-50 text-purple-700 border border-purple-200",
    slate: "bg-gray-100 text-gray-700 border border-gray-200",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-0.5 font-bold uppercase tracking-wider rounded-full",
    md: "text-xs px-3 py-1 font-bold rounded-full",
  };

  return (
    <span className={cn("inline-flex items-center gap-1.5", variantStyles[variant], sizeStyles[size], className)}>
      {children}
    </span>
  );
}
