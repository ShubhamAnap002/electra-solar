import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "solar" | "outline" | "secondary" | "ghost" | "deye-primary" | "deye-gradient";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const variantStyles = {
      primary:
        "bg-[#015cbb] hover:bg-[#004896] text-white shadow-md hover:shadow-lg focus:ring-[#015cbb]",
      "deye-primary":
        "bg-[#015cbb] hover:bg-[#004896] text-white shadow-md hover:shadow-lg focus:ring-[#015cbb]",
      solar:
        "bg-gradient-to-r from-[#1e8ec6] to-[#51b2e3] hover:opacity-95 text-white shadow-md focus:ring-[#1e8ec6]",
      "deye-gradient":
        "bg-gradient-to-r from-[#1e8ec6] to-[#51b2e3] hover:opacity-95 text-white shadow-md focus:ring-[#1e8ec6]",
      outline:
        "border border-[#015cbb] hover:bg-[#e6f0fa] text-[#015cbb] bg-white focus:ring-[#015cbb]",
      secondary:
        "bg-[#f5f7fa] hover:bg-gray-200 text-[#222222] focus:ring-gray-400 border border-gray-200",
      ghost:
        "text-[#5c5c5c] hover:text-[#015cbb] hover:bg-gray-100 focus:ring-gray-300",
    };

    const sizeStyles = {
      sm: "text-xs px-4 py-2 gap-1.5",
      md: "text-sm px-6 py-2.5 gap-2",
      lg: "text-base px-8 py-3.5 gap-2.5 font-bold",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
