"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { COMPANY } from "@/lib/data/company";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#f8fafd] border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#015cbb] block">
            Technical Support & Clarity
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#222222] tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-[#015cbb] mx-auto mt-2 mb-3" />
          <p className="text-[#5c5c5c] text-sm">
            Answers to frequent technical, phase unbalance, warranty, and DG synchronization questions.
          </p>
        </div>

        <div className="space-y-3.5">
          {COMPANY.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-gray-50/50"
                >
                  <span className={`font-bold text-sm sm:text-base ${isOpen ? "text-[#015cbb]" : "text-[#222222]"}`}>
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#f0f4f8] flex items-center justify-center flex-shrink-0 text-gray-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#015cbb] text-white" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[#5c5c5c] leading-relaxed border-t border-gray-100 pt-4 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                    <div className="mt-3 text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                      Technical Category: <span className="text-[#015cbb]">{faq.category}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
