"use client";

import React from "react";
import { Phone, MessageSquare, Zap, Calculator } from "lucide-react";
import { useEnquiryModal } from "@/components/forms/EnquiryModalContext";
import { COMPANY } from "@/lib/data/company";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileActionDock() {
  const { openEnquiryModal } = useEnquiryModal();
  const pathname = usePathname();

  // Hide dock inside admin panel
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#091e3a]/95 backdrop-blur-lg border-t border-white/15 px-3 py-2 shadow-2xl safe-area-pb">
      <div className="grid grid-cols-4 gap-2 items-center text-center">
        {/* 1. Direct Phone Call */}
        <a
          href={`tel:${COMPANY.contact.salesPhone1}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-white hover:bg-white/10 active:scale-95 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#f97316] mb-1">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold tracking-tight text-gray-200">Call Desk</span>
        </a>

        {/* 2. WhatsApp Chat */}
        <a
          href={`https://wa.me/91${COMPANY.contact.salesPhone1.replace(/\D/g, "")}?text=Hello%20Electra%20Solar,%20I%20am%20interested%20in%20solar%20hybrid%20inverters%20and%20energy%20storage.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-white hover:bg-white/10 active:scale-95 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-1">
            <MessageSquare className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold tracking-tight text-emerald-300">WhatsApp</span>
        </a>

        {/* 3. Solar Calculator */}
        <Link
          href="/calculator"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-white hover:bg-white/10 active:scale-95 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-200 mb-1">
            <Calculator className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold tracking-tight text-gray-200">Calculator</span>
        </Link>

        {/* 4. Instant Quote Modal Trigger */}
        <button
          type="button"
          onClick={() => openEnquiryModal({ source: "Mobile Action Dock" })}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white active:scale-95 transition-all shadow-md font-black"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white mb-1">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-tight text-white">Get Quote</span>
        </button>
      </div>
    </div>
  );
}
