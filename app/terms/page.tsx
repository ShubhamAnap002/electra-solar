import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Electra Solar",
  description: "Terms and conditions of quotations, technical sizing estimates, and product orders.",
  alternates: {
    canonical: "https://electrasolar.in/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="py-12 lg:py-16 bg-[#f8fafd] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 text-gray-700 text-sm leading-relaxed">
        <div>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#ea580c] transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-[#091e3a] tracking-tight">Terms & Conditions</h1>
          <div className="w-12 h-1 bg-[#ea580c] my-2 rounded-full" />
          <p className="text-xs text-gray-500 mt-1">Last Updated: October 2026</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 space-y-6 shadow-deye-card">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#091e3a]">1. Scope of Quotations and Sizing</h2>
            <p className="text-gray-600">
              Calculations and estimates generated via the online Sizing Calculator are intended for preliminary architectural sizing. Final electrical ratings, breaker specifications, and single-line diagrams must be validated by an authorized Electra Solar application engineer following an onsite audit.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#091e3a]">2. Product Warranties</h2>
            <p className="text-gray-600">
              Hardware warranties are provided directly by the manufacturer, EnerTech UPS Pvt. Ltd., according to official product warranty terms (typically 5 years for SunMagic hybrid inverters and 10 years performance warranty on LiFePO4 cells). Electra Solar coordinates warranty service, onsite dispatch, and replacement module logistics.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#091e3a]">3. Installation and Commissioning</h2>
            <p className="text-gray-600">
              Turnkey installation services require adherence to local Discom (electricity board) net-metering regulations and CEA safety standards. Earthing resistance must be maintained below 1 Ohm for safety and warranty validity.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
