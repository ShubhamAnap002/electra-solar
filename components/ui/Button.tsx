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
        "bg-[#091e3a] hover:bg-[#0c2447] text-white shadow-sm hover:shadow-md focus:ring-[#091e3a]",
      "deye-primary":
        "bg-[#091e3a] hover:bg-[#ea580c] text-white shadow-sm hover:shadow-md focus:ring-[#091e3a]",
      solar:
        "bg-[#ea580c] hover:bg-[#c2410c] text-white shadow-sm hover:shadow-md focus:ring-[#ea580c]",
      "deye-gradient":
        "bg-[#ea580c] hover:bg-[#c2410c] text-white shadow-sm hover:shadow-md focus:ring-[#ea580c]",
      outline:
        "border border-gray-300 hover:border-[#ea580c] hover:bg-orange-50/50 text-[#091e3a] hover:text-[#ea580c] bg-white focus:ring-[#ea580c]",
      secondary:
        "bg-gray-100 hover:bg-gray-200 text-[#091e3a] focus:ring-gray-400 border border-gray-200",
      ghost:
        "text-gray-600 hover:text-[#ea580c] hover:bg-gray-100 focus:ring-gray-300",
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
