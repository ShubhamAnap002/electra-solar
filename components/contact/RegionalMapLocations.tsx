"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
  Building2,
  Navigation,
  Compass,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { COMPANY, RegionalOffice } from "@/lib/data/company";

export function RegionalMapLocations() {
  const offices = COMPANY.regionalOffices || [];
  const [selectedOffice, setSelectedOffice] = useState<RegionalOffice>(
    offices[0] || {
      id: "pune",
      city: "Pune",
      state: "Maharashtra",
      title: "Corporate Headquarters & Experience Center",
      address:
        "SR. No. 399/1-2, Plot No. 5, Bhare P.O. Ghotawade, Near Hinjawadi IT Park Phase 2, Pune-412115",
      coordinates: { lat: 18.5913, lng: 73.7389 },
      phone: "+91 9822407189",
      email: "sales@electrasolar.in",
      badge: "HQ & Systems Plant",
      description:
        "Factory engineering linkage, master testing center, 1kVA–300kVA hybrid inverter inventory, and turnkey proposal desk.",
      mapUrl: "https://maps.google.com/?q=18.5913,73.7389",
    }
  );

  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <div className="space-y-4 max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#ea580c] text-xs font-semibold">
          <Navigation className="w-3.5 h-3.5" />
          <span>Regional Hubs &amp; Direct Field Service</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-[#091e3a] tracking-tight">
          Regional Service Centers &amp; Map Coordinates
        </h2>
        <div className="w-16 h-1 bg-[#ea580c] rounded-full" />
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Electra Solar operates dedicated regional engineering centers in{" "}
          <strong className="text-gray-900 font-bold">Pune (HQ)</strong>,{" "}
          <strong className="text-gray-900 font-bold">Mumbai (Commercial Desk)</strong>, and{" "}
          <strong className="text-gray-900 font-bold">Jaipur (North-West Solar Belt)</strong> to deliver
          same-day dispatch, onsite load audits, and rapid engineering support.
        </p>
      </div>

      {/* Location Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {offices.map((office) => {
          const isSelected = selectedOffice.id === office.id;
          return (
            <button
              key={office.id}
              onClick={() => setSelectedOffice(office)}
              type="button"
              className={`text-left p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isSelected
                  ? "bg-[#091e3a] border-[#091e3a] text-white shadow-lg ring-2 ring-orange-500/20"
                  : "bg-white border-gray-200 hover:border-orange-300 text-gray-800 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    isSelected
                      ? "bg-orange-500/20 text-orange-400 border border-orange-400/30"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {office.badge}
                </span>
                <span className="text-xs font-mono opacity-60">
                  {office.coordinates.lat.toFixed(2)}°N, {office.coordinates.lng.toFixed(2)}°E
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <MapPin
                    className={`w-4 h-4 ${
                      isSelected ? "text-[#ea580c]" : "text-gray-400"
                    }`}
                  />
                  <h3 className="text-lg font-black tracking-tight">
                    {office.city},{" "}
                    <span
                      className={`text-sm font-medium ${
                        isSelected ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      {office.state}
                    </span>
                  </h3>
                </div>
                <p
                  className={`text-xs mt-1 line-clamp-1 ${
                    isSelected ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {office.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Map & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Active Location Card & Engineering Specs (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-[11px] font-bold text-[#ea580c] uppercase tracking-wider block">
                  Active Service Hub
                </span>
                <h3 className="text-2xl font-black text-[#091e3a]">
                  {selectedOffice.city} Hub
                </h3>
              </div>
              <span className="bg-orange-50 text-[#ea580c] text-xs font-bold px-3 py-1 rounded-full border border-orange-200">
                {selectedOffice.badge}
              </span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              {selectedOffice.description}
            </p>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <Building2 className="w-4 h-4 text-[#ea580c] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block font-bold">
                    Official Address
                  </strong>
                  <span className="text-gray-600 text-[11px] leading-relaxed block mt-0.5">
                    {selectedOffice.address}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${selectedOffice.phone}`}
                  className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-orange-300 transition-colors group"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ea580c] flex-shrink-0" />
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-gray-400 block uppercase font-bold">
                      Direct Line
                    </span>
                    <strong className="text-gray-900 font-mono text-xs group-hover:text-[#ea580c] truncate block">
                      {selectedOffice.phone}
                    </strong>
                  </div>
                </a>

                <a
                  href={`mailto:${selectedOffice.email}`}
                  className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-orange-300 transition-colors group"
                >
                  <Mail className="w-3.5 h-3.5 text-[#ea580c] flex-shrink-0" />
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-gray-400 block uppercase font-bold">
                      Email Desk
                    </span>
                    <strong className="text-gray-900 font-mono text-xs group-hover:text-[#ea580c] truncate block">
                      {selectedOffice.email}
                    </strong>
                  </div>
                </a>
              </div>
            </div>

            {/* Scope highlights */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                Regional Capabilities
              </span>
              <ul className="text-[11px] text-gray-600 space-y-1.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Onsite Load Harmonic Audits &amp; Sizing S-Curve Analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Emergency Dispatch &amp; Factory Genuine Spare Parts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Certified EnerTech Inverter Testing &amp; Commissioning</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <a
              href={selectedOffice.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-[#ea580c] hover:bg-[#c2410c] text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
            >
              <span>Get GPS Directions on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right: Embedded Interactive Google Map Frame with Live Coordinate Pin (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xs flex flex-col min-h-[460px] relative">
          <div className="p-4 bg-[#091e3a] text-white flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#ea580c] animate-spin-slow" />
              <span className="text-xs font-bold tracking-wide">
                Live Regional Map • {selectedOffice.city} ({selectedOffice.coordinates.lat}°N, {selectedOffice.coordinates.lng}°E)
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-gray-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Verified Facility</span>
            </div>
          </div>

          <div className="w-full h-full flex-grow relative bg-gray-100 min-h-[380px]">
            <iframe
              key={selectedOffice.id}
              title={`Electra Solar ${selectedOffice.city} Office Map`}
              src={`https://maps.google.com/maps?q=${selectedOffice.coordinates.lat},${selectedOffice.coordinates.lng}&hl=en&z=13&output=embed`}
              className="w-full h-full border-0 absolute inset-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="p-3.5 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex flex-wrap items-center justify-between gap-2">
            <span>
              Pinned: <strong>{selectedOffice.title}</strong>
            </span>
            <span className="text-[11px] font-mono">
              Coordinates: {selectedOffice.coordinates.lat}, {selectedOffice.coordinates.lng}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
