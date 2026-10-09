import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Factory, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { COMPANY } from "@/lib/data/company";

export function OfficialDistributorSection() {
  const rel = COMPANY.distributorRelationship;

  return (
    <section className="py-20 bg-[#f8fafd] border-b border-gray-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Deye Style Visual Credibility Box (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-white border border-gray-200 p-8 shadow-lg overflow-hidden">
              <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#015cbb] block">
                    Verified Partnership
                  </span>
                  <h4 className="text-xl font-bold text-[#222222] tracking-tight">
                    Authorized Distribution
                  </h4>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#e6f0fa] border border-[#015cbb]/30 flex items-center justify-center text-[#015cbb]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              {/* EnerTech Logo & Parent Badge */}
              <div className="bg-[#f5f7fa] border border-gray-200 rounded-xl p-5 mb-6 text-center space-y-2">
                <div className="relative h-14 w-44 mx-auto">
                  <Image
                    src="/images/brand/enertech-partner.png"
                    alt="EnerTech UPS Official Manufacturer"
                    fill
                    className="object-contain"
                    sizes="176px"
                  />
                </div>
                <div className="text-xs text-[#222222] font-semibold">
                  {rel.principalCompany}
                </div>
                <div className="text-[11px] text-[#015cbb] font-mono font-bold">
                  {rel.experienceYears}
                </div>
              </div>

              {/* Manufacturing Location Badge */}
              <div className="space-y-3.5 text-xs text-[#5c5c5c]">
                <div className="flex items-start gap-3">
                  <Factory className="w-4 h-4 text-[#015cbb] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#222222] block">Manufacturing Facility</strong>
                    <span className="text-[#5c5c5c] text-[11px]">
                      Hinjawadi Industrial Corridor, Pune, Maharashtra
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="w-4 h-4 text-[#015cbb] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#222222] block">Verified Footprint</strong>
                    <span className="text-[#5c5c5c] text-[11px]">
                      {rel.installationsCount}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100 text-[11px] text-[#5c5c5c] flex items-center justify-between">
                <span>Verified Direct Support</span>
                <span className="text-[#015cbb] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#015cbb]" />
                  Authentic Hardware
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Strategic Explanation (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#015cbb] block">
              Official Distributor & Engineering Channel
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-[#222222] tracking-tight leading-tight">
              Backed by EnerTech’s 35+ Years of Indigenous Power Electronics Pedigree
            </h2>

            <div className="w-16 h-1 bg-[#015cbb]" />

            <p className="text-[#5c5c5c] text-base leading-relaxed">
              Electra Solar operates as the authorized distributor and turnkey solution provider for EnerTech UPS Pvt. Ltd. (Pune).
              We bridge heavy industrial manufacturing excellence with direct on-site execution: delivering
              system sizing, installation, commissioning, and prompt engineering support across Maharashtra.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-1.5 shadow-sm">
                <div className="font-bold text-[#222222] text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#015cbb]" />
                  <span>Direct Factory Warranty</span>
                </div>
                <p className="text-xs text-[#5c5c5c] leading-relaxed">
                  Every SunMagic hybrid inverter and BESS unit carries genuine manufacturer warranties backed directly by EnerTech’s Pune plant.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-1.5 shadow-sm">
                <div className="font-bold text-[#222222] text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#015cbb]" />
                  <span>Genuine Spares & Fast SLA</span>
                </div>
                <p className="text-xs text-[#5c5c5c] leading-relaxed">
                  Direct access to factory spare parts, IGBT bridge assemblies, and DSP firmware updates for zero extended downtime.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-1.5 shadow-sm">
                <div className="font-bold text-[#222222] text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#015cbb]" />
                  <span>DG Synchronization</span>
                </div>
                <p className="text-xs text-[#5c5c5c] leading-relaxed">
                  Engineered governor integration to run solar alongside diesel generator sets without reverse power trips.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-1.5 shadow-sm">
                <div className="font-bold text-[#222222] text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#015cbb]" />
                  <span>100% Phase Unbalance</span>
                </div>
                <p className="text-xs text-[#5c5c5c] leading-relaxed">
                  Independent DSP phase modulation tolerates drastic single-phase load imbalances on 3-phase machinery.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#015cbb] hover:text-[#004896] transition-colors"
              >
                <span>Read more about our distributor engineering credentials</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
