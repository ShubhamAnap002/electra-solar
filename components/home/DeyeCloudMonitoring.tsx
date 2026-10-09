"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Wifi, Smartphone, Gauge, ShieldCheck, Scale, Calculator } from "lucide-react";

export function DeyeCloudMonitoring() {
  return (
    <section className="py-20 bg-[#f8fafd] border-b border-gray-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Deye Cloud Messaging & Action Pills */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#015cbb] block">
              Digital Platform & Sizing Tools
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-[#222222] tracking-tight">
              Electra & EnerTech Smart Cloud
            </h2>

            <p className="text-[#5c5c5c] text-base leading-relaxed">
              With Electra Solar installations, plant engineers and villa owners gain real-time telemetry across generation, battery state of charge (SoC), and load distribution. Protecting your capital investment and optimizing battery cycle life.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#e6f0fa] flex items-center justify-center text-[#015cbb]">
                  <Wifi className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#222222]">Remote IoT Telemetry</div>
                  <div className="text-[11px] text-[#5c5c5c]">Wi-Fi & 4G RS485 connectivity</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#e6f0fa] flex items-center justify-center text-[#015cbb]">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#222222]">Live Phase Analytics</div>
                  <div className="text-[11px] text-[#5c5c5c]">Track 3-phase load balance</div>
                </div>
              </div>
            </div>

            {/* Deye Style Dual CTA Buttons */}
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/calculator"
                className="bg-gradient-to-r from-[#1e8ec6] to-[#51b2e3] hover:opacity-95 text-white px-6 py-3 rounded-full font-bold text-sm shadow-sm transition-all flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Launch Solar & BESS Calculator</span>
              </Link>

              <Link
                href="/compare"
                className="bg-white hover:bg-gray-50 text-[#015cbb] border border-[#015cbb]/30 px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2"
              >
                <Scale className="w-4 h-4" />
                <span>Compare Inverters</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Telemetry Dashboard Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-sm font-bold text-[#222222]">Live Field Telemetry Station</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#015cbb] bg-[#e6f0fa] px-2.5 py-1 rounded-full">
                  Chakan Plant #04
                </span>
              </div>

              {/* Metric Indicators */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-[#f8fafd] p-4 rounded-xl border border-gray-100">
                  <span className="text-[11px] text-gray-500 block font-medium">Solar PV Array</span>
                  <strong className="text-lg sm:text-xl font-bold font-mono text-[#015cbb]">94.2 kW</strong>
                  <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">Peak Yield</span>
                </div>

                <div className="bg-[#f8fafd] p-4 rounded-xl border border-gray-100">
                  <span className="text-[11px] text-gray-500 block font-medium">Battery SoC</span>
                  <strong className="text-lg sm:text-xl font-bold font-mono text-emerald-600">88.5%</strong>
                  <span className="text-[10px] text-gray-500 block mt-0.5">LFP Storage</span>
                </div>

                <div className="bg-[#f8fafd] p-4 rounded-xl border border-gray-100">
                  <span className="text-[11px] text-gray-500 block font-medium">Active Load</span>
                  <strong className="text-lg sm:text-xl font-bold font-mono text-[#222222]">72.4 kVA</strong>
                  <span className="text-[10px] text-sky-600 font-semibold block mt-0.5">Phase Balanced</span>
                </div>
              </div>

              {/* Power Flow Simulation */}
              <div className="p-4 bg-[#f8fafd] rounded-xl border border-gray-100 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-600 font-medium">
                  <span>Inverter Conversion Efficiency</span>
                  <span className="font-mono font-bold text-[#015cbb]">98.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#1e8ec6] to-[#015cbb] h-2 rounded-full w-[98%]" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-500">
                  <span>Transfer: 0ms Static Bypass</span>
                  <span>DG Sync: Standby Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
