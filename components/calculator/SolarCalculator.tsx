"use client";

import React, { useState } from "react";
import {
  Calculator,
  Sun,
  BatteryCharging,
  Zap,
  IndianRupee,
  ArrowRight,
  Sparkles,
  Layers,
  ArrowDown,
  Building2,
  Leaf,
  CheckCircle2,
} from "lucide-react";
import { useEnquiryModal } from "@/components/forms/EnquiryModalContext";

export function SolarCalculator() {
  const { openEnquiryModal } = useEnquiryModal();

  const [propertyType, setPropertyType] = useState<"residential" | "commercial" | "industrial" | "hospital">("residential");
  const [monthlyBill, setMonthlyBill] = useState(12000);
  const [backupHours, setBackupHours] = useState(4);
  const [hasGenerator, setHasGenerator] = useState(false);

  // Solar and sizing algorithms based on Indian tariff slabs & solar insolation:
  const estimatedMonthlyUnits = Math.round(monthlyBill / 9.5);
  const recommendedSolarKWp = Math.max(1, Math.round((estimatedMonthlyUnits / 120) * 10) / 10);

  // Inverter sizing:
  let recommendedInverterKVA = 5;
  let recommendedModel = "SunMagic REeFI 1-Phase Hybrid (5 kVA)";
  let modelSlug = "sunmagic-single-phase-solar-hybrid-inverter";

  if (propertyType === "residential") {
    if (recommendedSolarKWp <= 4) {
      recommendedInverterKVA = 3;
      recommendedModel = "SunMagic REeFI 1-Phase (3 kVA / 48V)";
      modelSlug = "sunmagic-single-phase-solar-hybrid-inverter";
    } else if (recommendedSolarKWp <= 8) {
      recommendedInverterKVA = 6;
      recommendedModel = "SunMagic REeFI 1-Phase (6 kVA / 48V)";
      modelSlug = "sunmagic-single-phase-solar-hybrid-inverter";
    } else {
      recommendedInverterKVA = 10;
      recommendedModel = "SunMagic REeFI 1P / 3P (10 kVA)";
      modelSlug = "sunmagic-single-phase-solar-hybrid-inverter";
    }
  } else if (propertyType === "commercial" || propertyType === "industrial") {
    if (recommendedSolarKWp <= 20) {
      recommendedInverterKVA = 25;
      recommendedModel = "SunMagic REeFI 3-Phase (25 kVA / 240VDC)";
      modelSlug = "sunmagic-three-phase-solar-hybrid-inverter";
    } else if (recommendedSolarKWp <= 45) {
      recommendedInverterKVA = 50;
      recommendedModel = "SunMagic REeFI 3-Phase (50 kVA / 240VDC)";
      modelSlug = "sunmagic-three-phase-solar-hybrid-inverter";
    } else {
      recommendedInverterKVA = 100;
      recommendedModel = "SunMagic REeFI 3-Phase (100 kVA / 480VDC)";
      modelSlug = "sunmagic-three-phase-solar-hybrid-inverter";
    }
  } else {
    // Hospital / critical
    recommendedInverterKVA = 40;
    recommendedModel = "Solar Online UPS (40 kVA with Galvanic Isolation)";
    modelSlug = "solar-online-ups-system";
  }

  // Battery storage sizing:
  const criticalLoadKW = recommendedInverterKVA * 0.6;
  const recommendedBatteryKWh = Math.round(criticalLoadKW * backupHours * 10) / 10;

  // Monthly savings estimation (up to 78% bill reduction):
  const estimatedSavings = Math.round(monthlyBill * 0.78);
  const annualSavings = estimatedSavings * 12;
  const estimatedPaybackYears = propertyType === "residential" ? "3.2" : "2.8";
  const co2OffsetTons = (recommendedSolarKWp * 1.35).toFixed(1);

  return (
    <div className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-10 shadow-deye-card relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#015cbb] block mb-1">
              Engineering Sizing Tool
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#222222] tracking-tight">
              Solar, Inverter &amp; Battery Sizing Assistant
            </h2>
            <p className="text-[#5c5c5c] text-sm mt-1 max-w-xl">
              Calculate exact rooftop solar PV capacity, industrial hybrid inverter rating, and LiFePO4 battery storage based on your facility profile.
            </p>
          </div>
        </div>

        {/* INTERACTIVE POWER FLOW SCHEMATIC (Single Line Diagram Flow) */}
        <div className="mb-10 bg-gradient-to-r from-[#0d1b2a] via-[#142338] to-[#0d1b2a] border border-gray-800 rounded-2xl p-5 sm:p-6 text-white shadow-xl">
          <div className="text-[11px] font-bold text-[#51b2e3] uppercase tracking-wider mb-4 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#51b2e3]" />
              <span>Live Power Flow Schematic (Dynamic Single Line Diagram)</span>
            </span>
            <span className="text-emerald-400 font-mono text-[10px] hidden sm:inline">
              ● REAL-TIME BALANCED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center text-center">
            {/* Node 1: Solar PV */}
            <div className="bg-white/10 border border-white/15 rounded-xl p-3.5 space-y-1 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 mx-auto flex items-center justify-center">
                <Sun className="w-4 h-4" />
              </div>
              <div className="text-[10px] text-gray-300 uppercase font-semibold">Rooftop Solar PV</div>
              <div className="text-base font-extrabold text-white font-mono">{recommendedSolarKWp} kWp</div>
              <div className="text-[10px] text-amber-300 font-mono">~{Math.round(recommendedSolarKWp * 120)} kWh/mo</div>
            </div>

            {/* Node 2: Inverter Center Stage */}
            <div className="bg-[#015cbb]/30 border-2 border-[#51b2e3]/60 rounded-xl p-3.5 space-y-1 shadow-lg ring-2 ring-[#015cbb]/20">
              <div className="w-8 h-8 rounded-lg bg-[#015cbb] text-white mx-auto flex items-center justify-center animate-pulse">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-[10px] text-[#80d8ff] uppercase font-bold">Hybrid PCU Core</div>
              <div className="text-base font-extrabold text-white font-mono">{recommendedInverterKVA} kVA</div>
              <div className="text-[10px] text-gray-300 font-mono">&lt; 5ms Zero-Break</div>
            </div>

            {/* Node 3: Battery Storage */}
            <div className="bg-white/10 border border-white/15 rounded-xl p-3.5 space-y-1 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-400/20 text-[#51b2e3] mx-auto flex items-center justify-center">
                <BatteryCharging className="w-4 h-4" />
              </div>
              <div className="text-[10px] text-gray-300 uppercase font-semibold">LiFePO4 Storage</div>
              <div className="text-base font-extrabold text-white font-mono">{recommendedBatteryKWh} kWh</div>
              <div className="text-[10px] text-[#80d8ff] font-mono">{backupHours}h Autonomy</div>
            </div>

            {/* Node 4: Facility Load */}
            <div className="bg-white/10 border border-white/15 rounded-xl p-3.5 space-y-1 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-emerald-400/20 text-emerald-400 mx-auto flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="text-[10px] text-gray-300 uppercase font-semibold">Facility &amp; Grid</div>
              <div className="text-base font-extrabold text-emerald-400 font-mono">
                {propertyType === "residential" ? "230V 1-Ph" : "415V 3-Ph"}
              </div>
              <div className="text-[10px] text-gray-300 font-mono">
                {hasGenerator ? "+ DG Sync Active" : "Pure Grid Sync"}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 bg-[#f8fafd] border border-gray-200/90 rounded-2xl p-6 sm:p-8">
            {/* Property Selector */}
            <div>
              <label className="block text-xs font-bold text-[#222222] uppercase tracking-wider mb-2.5">
                Facility / Application Profile
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "residential", label: "Home / Villa" },
                  { id: "commercial", label: "Commercial" },
                  { id: "industrial", label: "Industrial" },
                  { id: "hospital", label: "Hospital / Lab" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setPropertyType(item.id as any);
                      if (item.id === "industrial") setMonthlyBill(75000);
                      else if (item.id === "commercial") setMonthlyBill(35000);
                      else if (item.id === "hospital") setMonthlyBill(55000);
                      else setMonthlyBill(12000);
                    }}
                    className={`py-2.5 px-3 rounded-full text-xs font-bold border transition-all text-center ${
                      propertyType === item.id
                        ? "bg-[#015cbb] text-white border-[#015cbb] shadow-sm"
                        : "bg-white text-[#5c5c5c] border-gray-200 hover:border-[#015cbb] hover:text-[#015cbb]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Electricity Bill Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#222222] uppercase tracking-wider">
                  Approx. Monthly Electricity Bill
                </label>
                <span className="font-mono text-base font-extrabold text-[#015cbb] flex items-center">
                  <IndianRupee className="w-4 h-4 mr-0.5" />
                  {monthlyBill.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min={propertyType === "residential" ? 3000 : 15000}
                max={propertyType === "residential" ? 50000 : 300000}
                step={propertyType === "residential" ? 1000 : 5000}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full accent-[#015cbb] h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#5c5c5c] mt-1 font-mono">
                <span>₹{(propertyType === "residential" ? 3000 : 15000).toLocaleString("en-IN")}</span>
                <span>₹{(propertyType === "residential" ? 50000 : 300000).toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Backup Hours Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#222222] uppercase tracking-wider">
                  Desired Battery Backup Autonomy
                </label>
                <span className="font-mono text-base font-extrabold text-[#015cbb]">
                  {backupHours} Hours Backup
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={12}
                step={1}
                value={backupHours}
                onChange={(e) => setBackupHours(Number(e.target.value))}
                className="w-full accent-[#015cbb] h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#5c5c5c] mt-1 font-mono">
                <span>2 Hours (Surge Protection)</span>
                <span>6 Hours</span>
                <span>12 Hours (Full Night)</span>
              </div>
            </div>

            {/* Checkbox: Existing Generator */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="genCheck"
                checked={hasGenerator}
                onChange={(e) => setHasGenerator(e.target.checked)}
                className="w-4 h-4 rounded text-[#015cbb] bg-white border-gray-300 focus:ring-[#015cbb]"
              />
              <label htmlFor="genCheck" className="text-xs text-[#5c5c5c] cursor-pointer select-none">
                We have an existing Diesel Generator (DG Set) to synchronize with solar
              </label>
            </div>
          </div>

          {/* Results Output Column (5 cols) - Deye High Precision Showcase */}
          <div className="lg:col-span-5 bg-white border-2 border-[#015cbb]/30 rounded-2xl p-6 sm:p-8 space-y-5 shadow-lg">
            <div className="text-xs font-bold text-[#015cbb] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Recommended Hardware Architecture</span>
            </div>

            <div className="space-y-3">
              <div className="bg-[#f8fafd] border border-gray-200 rounded-xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#e6f0fa] text-[#015cbb] flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 font-medium">Inverter Rating</div>
                    <div className="text-lg font-extrabold text-[#222222] font-mono">
                      {recommendedInverterKVA} kVA Capacity
                    </div>
                  </div>
                </div>
                <span className="text-xs text-[#015cbb] font-bold bg-[#e6f0fa] px-2.5 py-0.5 rounded-full border border-[#015cbb]/20">
                  {propertyType === "residential" ? "1-Phase" : "3-Phase"}
                </span>
              </div>

              <div className="bg-[#f8fafd] border border-gray-200 rounded-xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#e6f0fa] text-[#015cbb] flex items-center justify-center flex-shrink-0">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 font-medium">Solar Array Rating</div>
                    <div className="text-lg font-extrabold text-[#222222] font-mono">
                      {recommendedSolarKWp} kWp Rooftop PV
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500 font-mono">~{Math.round(recommendedSolarKWp * 120)} kWh/mo</span>
              </div>

              <div className="bg-[#f8fafd] border border-gray-200 rounded-xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#e6f0fa] text-[#015cbb] flex items-center justify-center flex-shrink-0">
                    <BatteryCharging className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 font-medium">Battery Storage Bank</div>
                    <div className="text-lg font-extrabold text-[#015cbb] font-mono">
                      {recommendedBatteryKWh} kWh LiFePO4
                    </div>
                  </div>
                </div>
                <span className="text-xs text-[#015cbb] font-semibold bg-[#e6f0fa] px-2.5 py-0.5 rounded-full border border-[#015cbb]/20">
                  6,000+ Cycles
                </span>
              </div>
            </div>

            {/* Financial ROI & Impact Card */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-[#e6f0fa] border border-[#015cbb]/30 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between text-gray-700">
                <span className="font-medium">Monthly Bill Savings:</span>
                <strong className="text-base font-extrabold text-[#015cbb] font-mono flex items-center">
                  <IndianRupee className="w-3.5 h-3.5" />
                  ~{estimatedSavings.toLocaleString("en-IN")}/mo
                </strong>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#015cbb]/20 text-[11px]">
                <div>
                  <span className="text-gray-500 block">Annual Net Savings</span>
                  <strong className="text-gray-900 font-mono">₹{annualSavings.toLocaleString("en-IN")}/yr</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">Estimated Payback</span>
                  <strong className="text-emerald-700 font-mono">~{estimatedPaybackYears} Years</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">10-Yr Total Savings</span>
                  <strong className="text-[#015cbb] font-mono">₹{(annualSavings * 10).toLocaleString("en-IN")}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block flex items-center gap-1">
                    <Leaf className="w-3 h-3 text-emerald-600" />
                    CO₂ Avoided
                  </span>
                  <strong className="text-emerald-700 font-mono">{co2OffsetTons} Tons/yr</strong>
                </div>
              </div>
            </div>

            {/* Selected Hardware Match */}
            <div className="text-xs text-[#5c5c5c] border-t border-gray-100 pt-3">
              Matched EnerTech Model: <strong className="text-[#222222] block mt-0.5">{recommendedModel}</strong>
            </div>

            <button
              onClick={() => openEnquiryModal({
                productName: recommendedModel,
                source: "Solar Calculator Recommendation",
              })}
              className="w-full bg-gradient-to-r from-[#015cbb] via-[#1e8ec6] to-[#51b2e3] hover:opacity-95 text-white py-3.5 rounded-full font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Get Quotation &amp; Sizing SLD</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
