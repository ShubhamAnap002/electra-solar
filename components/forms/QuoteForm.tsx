"use client";

import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
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
  formTitle = "Quote Request",
}: QuoteFormProps) {
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    productModel: initialProductSlug || "sunmagic-three-phase-solar-hybrid-inverter",
    application: "Commercial / Industrial Facility",
    approxCapacity: "25 kVA – 50 kVA",
    message: "",
    website_hp: "", // honeypot
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Sync initialProductSlug if it changes
  useEffect(() => {
    if (initialProductSlug) {
      setFormData((prev) => ({ ...prev, productModel: initialProductSlug }));
    }
  }, [initialProductSlug]);

  // Load dynamically added products if available
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/admin/products");
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus("error");
      setErrorMessage("Please provide your name and a valid telephone number.");
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
      <div className="bg-[#f0f9ff] border border-[#015cbb]/30 rounded-2xl p-8 text-center space-y-4 animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-[#e6f0fa] text-[#015cbb] rounded-full flex items-center justify-center mx-auto ring-8 ring-[#015cbb]/10">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h4 className="text-2xl font-black text-[#222222]">Proposal Request Delivered</h4>
        <p className="text-[#5c5c5c] text-sm max-w-md mx-auto">
          Thank you, <strong className="text-[#222222]">{formData.name}</strong>. Your requirement has been delivered directly to our Pune sales engineering desk. We will reach you on <strong className="text-[#015cbb]">{formData.phone}</strong> to review sizing.
        </p>
        <div className="pt-2 text-xs text-gray-500">
          Immediate engineering requirement? Pune Sales Desk: <strong className="text-[#222222]">+91 98224 12345</strong>
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
        <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-xl text-rose-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#222222] uppercase tracking-wider mb-1.5">
            Full Name <span className="text-[#015cbb]">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Rajesh Patil"
            className="w-full bg-[#f8fafd] border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#015cbb] focus:ring-1 focus:ring-[#015cbb] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#222222] uppercase tracking-wider mb-1.5">
            Telephone / Mobile <span className="text-[#015cbb]">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full bg-[#f8fafd] border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#015cbb] focus:ring-1 focus:ring-[#015cbb] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#222222] uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com"
            className="w-full bg-[#f8fafd] border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#015cbb] focus:ring-1 focus:ring-[#015cbb] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#222222] uppercase tracking-wider mb-1.5">
            City / Project Location
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="e.g. Pune, Chakan, Mumbai"
            className="w-full bg-[#f8fafd] border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#015cbb] focus:ring-1 focus:ring-[#015cbb] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#222222] uppercase tracking-wider mb-1.5">
            Product of Interest
          </label>
          <select
            name="productModel"
            value={formData.productModel}
            onChange={handleChange}
            className="w-full bg-[#f8fafd] border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#222222] focus:outline-none focus:border-[#015cbb] focus:ring-1 focus:ring-[#015cbb] transition-colors"
          >
            {productList.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name} ({p.capacityRange})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#222222] uppercase tracking-wider mb-1.5">
            Application Scenario
          </label>
          <select
            name="application"
            value={formData.application}
            onChange={handleChange}
            className="w-full bg-[#f8fafd] border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#222222] focus:outline-none focus:border-[#015cbb] focus:ring-1 focus:ring-[#015cbb] transition-colors"
          >
            <option value="Residential Bungalow / Villa">Residential Bungalow / Villa</option>
            <option value="Commercial / Industrial Facility">Commercial / Industrial Facility</option>
            <option value="Hospital / Medical Critical Power">Hospital / Medical Critical Power</option>
            <option value="Cold Storage & Food Processing">Cold Storage & Food Processing</option>
            <option value="Substation / Power Utility">Substation / Power Utility</option>
            <option value="Off-Grid Remote Microgrid">Off-Grid Remote Microgrid</option>
          </select>
        </div>
      </div>

      {!isCompact && (
        <div>
          <label className="block text-xs font-bold text-[#222222] uppercase tracking-wider mb-1.5">
            Project Scope or Specific Requirements (Optional)
          </label>
          <textarea
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your connected load, backup hours requirement, existing generator rating..."
            className="w-full bg-[#f8fafd] border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#015cbb] focus:ring-1 focus:ring-[#015cbb] transition-colors resize-none"
          />
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-[#015cbb] hover:bg-[#004896] text-white py-3.5 rounded-full font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Requirements...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>SEND PROPOSAL REQUEST</span>
            </>
          )}
        </button>
      </div>

      <p className="text-[11px] text-center text-gray-500">
        🔒 Confidential. Enquiries delivered directly to our authorized engineering desk. Not persisted in public databases.
      </p>
    </form>
  );
}
