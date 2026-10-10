import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { COMPANY } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "Privacy Policy | Electra Solar",
  description: "Privacy policy and data governance practices of Electra Solar Solutions.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 lg:py-16 bg-[#f8fafd] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 text-gray-700 text-sm leading-relaxed">
        <div>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#ea580c] transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-[#091e3a] tracking-tight">Privacy Policy</h1>
          <div className="w-12 h-1 bg-[#ea580c] my-2 rounded-full" />
          <p className="text-xs text-gray-500 mt-1">Last Updated: October 2026</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 space-y-6 shadow-deye-card">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#091e3a]">1. Commitment to Privacy</h2>
            <p className="text-gray-600">
              Electra Solar (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), operating as the official distributor of EnerTech UPS Pvt. Ltd., respects the privacy of our website visitors, customers, and channel partners. This Privacy Policy outlines how we collect, store, and utilize information provided through our digital channels.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#091e3a]">2. Information We Collect</h2>
            <p className="text-gray-600">
              When you submit a quote request, sizing calculator query, or service inquiry on our website, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 text-xs">
              <li>Full Name and Job Title</li>
              <li>Phone / Mobile Number and Email Address</li>
              <li>City, Region, and Project Site Location</li>
              <li>Connected Load requirements, backup duration, and equipment choices</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#091e3a]">3. How Information is Used</h2>
            <p className="text-gray-600">
              We use customer information exclusively to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 text-xs">
              <li>Formulate and deliver customized technical sizing proposals and commercial quotations</li>
              <li>Coordinate onsite physical feasibility audits, load profiling, and field service visits</li>
              <li>Facilitate direct manufacturer warranty registration with EnerTech UPS Pvt. Ltd.</li>
              <li>Communicate critical firmware or product safety bulletins where relevant</li>
            </ul>
            <p className="text-gray-600">
              We do NOT sell, rent, or distribute personal customer records to third-party advertising brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#091e3a]">4. Contact Information</h2>
            <p className="text-gray-600">
              For data privacy inquiries or requests to delete submitted quote records, contact:
            </p>
            <p className="text-xs font-mono text-[#ea580c] font-semibold">
              support@electrasolar.in | +91 9373679255
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
