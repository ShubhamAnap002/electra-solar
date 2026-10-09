"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { PRODUCTS } from "@/lib/data/products";

interface QuoteFormProps {
  initialProductSlug?: string;
  onSuccess?: () => void;
  isCompact?: boolean;
}

export function QuoteForm({ initialProductSlug, onSuccess, isCompact = false }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    productModel: initialProductSlug || "sunmagic-three-phase-solar-hybrid-inverter",
    application: "Commercial / Industrial Facility",
    approxCapacity: "25 kVA – 50 kVA",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus("error");
      setErrorMessage("Please provide your name and a valid phone number.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
      if (onSuccess) onSuccess();
    } catch (err) {
      setStatus("error");
      setErrorMessage("Failed to send inquiry. Please call +91 9822407189 directly.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-[#f0f9ff] border border-[#015cbb]/30 rounded-2xl p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-[#e6f0fa] text-[#015cbb] rounded-full flex items-center justify-center mx-auto ring-8 ring-[#015cbb]/10">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h4 className="text-2xl font-black text-[#222222]">Proposal Request Received</h4>
        <p className="text-[#5c5c5c] text-sm max-w-md mx-auto">
          Thank you, <strong className="text-[#222222]">{formData.name}</strong>. An EnerTech certified application engineer
          will contact you on <strong className="text-[#015cbb]">{formData.phone}</strong> to review sizing and technical specifications.
        </p>
        <div className="pt-2 text-xs text-gray-500">
          Immediate assistance? Direct Pune sales desk: <strong className="text-[#222222]">+91 9822407189</strong>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
            {PRODUCTS.map((p) => (
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
              <span>Submitting Your Requirements...</span>
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
        🔒 Confidential. Your data is protected. Technical sizing provided by certified EnerTech application engineers in Pune.
      </p>
    </form>
  );
}
