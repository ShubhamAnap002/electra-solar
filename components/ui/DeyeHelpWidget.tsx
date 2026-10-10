"use client";

import React, { useState } from "react";
import { MessageSquare, Phone, Mail, X, Send, Sparkles } from "lucide-react";
import { useEnquiryModal } from "@/components/forms/EnquiryModalContext";
import { COMPANY } from "@/lib/data/company";

export function DeyeHelpWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Quick Contact Popover */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 text-[#1e293b] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#091e3a] flex items-center justify-center text-[#ea580c] font-black text-xs shadow-xs">
                ES
              </div>
              <div>
                <div className="text-xs font-bold text-[#091e3a]">Electra Solar Expert</div>
                <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online • Technical Support
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 space-y-2 text-xs">
            <p className="text-gray-600 leading-relaxed text-[11px]">
              Need help selecting the right solar hybrid inverter, battery storage, or industrial PCU?
            </p>

            <div className="space-y-1.5 pt-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  openEnquiryModal({ source: "Floating Need Help Widget" });
                }}
                className="w-full bg-[#091e3a] hover:bg-[#ea580c] text-white py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <Send className="w-3.5 h-3.5 text-[#ea580c]" />
                <span>Request Sizing &amp; Quote</span>
              </button>

              <a
                href={`tel:${COMPANY.contact.salesPhone1}`}
                className="w-full bg-gray-50 hover:bg-gray-100 text-gray-800 py-2 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 border border-gray-200 transition-colors hover:text-[#ea580c]"
              >
                <Phone className="w-3.5 h-3.5 text-[#ea580c]" />
                <span>Call {COMPANY.contact.salesPhone1}</span>
              </a>

              <a
                href={`https://wa.me/91${COMPANY.contact.salesPhone1.replace(/\D/g, "")}?text=Hello%20Electra%20Solar,%20I%20would%20like%20to%20inquire%20about%20EnerTech%20solar%20hybrid%20inverters`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 py-2 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 border border-emerald-200 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 text-[10px] text-gray-400 text-center">
            Official Distributor of EnerTech UPS Pvt. Ltd.
          </div>
        </div>
      )}

      {/* Main Avatar + Speech Bubble */}
      <div className="flex items-center gap-2">
        {/* White Speech Bubble "Need help?" */}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer bg-white text-gray-800 text-xs font-semibold py-2 px-3.5 rounded-2xl shadow-md border border-gray-100 hover:border-orange-300 transition-all hover:scale-105 flex items-center gap-1.5 select-none relative"
          >
            <span>Need help?</span>
            <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-t border-gray-100 rotate-45 transform pointer-events-none" />
          </div>
        )}

        {/* Clean Professional Avatar Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-12 h-12 rounded-full bg-[#091e3a] hover:bg-[#ea580c] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center text-white group"
          aria-label="Need Help Assistance"
        >
          <MessageSquare className="w-5 h-5 text-white" />
          {/* Notification indicator */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#ea580c] border-2 border-white" />
        </button>
      </div>
    </div>
  );
}
