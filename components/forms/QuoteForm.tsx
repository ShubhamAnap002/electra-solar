"use client";

import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, Tag } from "lucide-react";
import { PRODUCTS, Product } from "@/lib/data/products";

interface QuoteFormProps {
  initialProductSlug?: string;
  onSuccess?: () => void;
  isCompact?: boolean;
  formTitle?: string;
}

export function QuoteForm({
  initialProductSlug,
  onSuccess,
  isCompact = false,
  formTitle = "Inquiry Request",
}: QuoteFormProps) {
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    city: "",
    email: "",
    companyAddress: "",
    message: "",
    productModel: initialProductSlug || "",
    website_hp: "", // anti-spam honeypot
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Sync initialProductSlug if changed
  useEffect(() => {
    if (initialProductSlug) {
      setFormData((prev) => ({ ...prev, productModel: initialProductSlug }));
    }
  }, [initialProductSlug]);

  // Load dynamically added products if available
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.products && data.products.length > 0) {
            setProductList(data.products);
          }
        }
      } catch (e) {
        // Fallback to static PRODUCTS
      }
    }
    loadProducts();
  }, []);

  const selectedProduct = productList.find(
    (p) => p.slug === formData.productModel || p.id === formData.productModel || p.name === formData.productModel
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your name and contact mobile number.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          formType: formTitle,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to deliver enquiry. Please contact sales desk directly.");
      }

      setStatus("success");
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Failed to send inquiry. Please call +91 98224 12345 directly.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-8 text-center space-y-4 animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-100/50">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h4 className="text-2xl font-black text-[#091e3a]">Request Submitted Successfully</h4>
        <p className="text-gray-600 text-sm max-w-md mx-auto">
          Thank you, <strong className="text-gray-900">{formData.name}</strong>. Your inquiry has been delivered directly to our sales engineering desk. We will contact you at <strong className="text-[#091e3a]">{formData.phone}</strong>.
        </p>
        <div className="pt-2 text-xs text-gray-500">
          Direct Sales Desk: <strong className="text-gray-900">+91 98224 12345</strong>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Anti-spam honeypot */}
      <input
        type="text"
        name="website_hp"
        value={formData.website_hp}
        onChange={handleChange}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      {status === "error" && (
        <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-md text-rose-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Selected Product Context Badge (if triggered from product page) */}
      {selectedProduct && (
        <div className="flex items-center justify-between px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-[#ea580c]" />
            <span>
              Inquiry for: <strong className="font-bold text-[#091e3a]">{selectedProduct.name}</strong>
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500">{selectedProduct.capacityRange}</span>
        </div>
      )}

      {/* Clean 2-Column Grid Matching Reference Screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column: 5 Inputs */}
        <div className="space-y-3.5">
          <div>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full bg-white border border-[#d1d5db] focus:border-[#111827] focus:ring-1 focus:ring-[#111827] rounded-sm px-4 py-3 text-sm text-gray-900 placeholder-[#9ca3af] outline-none transition-colors"
            />
          </div>

          <div>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full bg-white border border-[#d1d5db] focus:border-[#111827] focus:ring-1 focus:ring-[#111827] rounded-sm px-4 py-3 text-sm text-gray-900 placeholder-[#9ca3af] outline-none transition-colors"
            />
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full bg-white border border-[#d1d5db] focus:border-[#111827] focus:ring-1 focus:ring-[#111827] rounded-sm px-4 py-3 text-sm text-gray-900 placeholder-[#9ca3af] outline-none transition-colors"
            />
          </div>

          <div>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              className="w-full bg-white border border-[#d1d5db] focus:border-[#111827] focus:ring-1 focus:ring-[#111827] rounded-sm px-4 py-3 text-sm text-gray-900 placeholder-[#9ca3af] outline-none transition-colors"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full bg-white border border-[#d1d5db] focus:border-[#111827] focus:ring-1 focus:ring-[#111827] rounded-sm px-4 py-3 text-sm text-gray-900 placeholder-[#9ca3af] outline-none transition-colors"
            />
          </div>
        </div>

        {/* Right Column: Company Address, Message & Submit Request */}
        <div className="flex flex-col gap-3.5 h-full">
          <div>
            <input
              type="text"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              placeholder="Company Address"
              className="w-full bg-white border border-[#d1d5db] focus:border-[#111827] focus:ring-1 focus:ring-[#111827] rounded-sm px-4 py-3 text-sm text-gray-900 placeholder-[#9ca3af] outline-none transition-colors"
            />
          </div>

          <div className="flex-1 flex flex-col min-h-[140px]">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={4}
              className="w-full flex-1 min-h-[130px] bg-white border border-[#d1d5db] focus:border-[#111827] focus:ring-1 focus:ring-[#111827] rounded-sm p-4 text-sm text-gray-900 placeholder-[#9ca3af] outline-none transition-colors resize-none"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-black hover:bg-[#ea580c] text-white py-3.5 font-bold text-sm uppercase tracking-wider rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>SUBMIT REQUEST</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
