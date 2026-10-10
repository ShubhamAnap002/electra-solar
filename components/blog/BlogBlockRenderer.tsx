"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  AlertTriangle,
  Info,
  Lightbulb,
  Calculator,
  Quote,
  ArrowRight,
  CheckCircle2,
  List,
  Sparkles,
} from "lucide-react";
import { BlogBlock } from "@/lib/data/blog";

interface BlogBlockRendererProps {
  blocks: BlogBlock[];
  showTableOfContents?: boolean;
}

export function BlogBlockRenderer({
  blocks,
  showTableOfContents = true,
}: BlogBlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  // Extract headings for Table of Contents
  const headings = blocks.filter(
    (b) => b.type === "heading" && Boolean(b.text?.trim())
  ) as Array<{ id: string; type: "heading"; level: 2 | 3; text: string }>;

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  return (
    <div className="space-y-8">
      {/* 1. Optional Auto-Generated Table of Contents (for long posts with 2+ headings) */}
      {showTableOfContents && headings.length >= 2 && (
        <nav
          aria-label="Table of Contents"
          className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-xs my-8"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ea580c] mb-3.5">
            <List className="w-4 h-4" />
            <span>Table of Contents • Quick Navigation</span>
          </div>
          <ol className="space-y-2 text-xs sm:text-sm">
            {headings.map((h, idx) => {
              const anchor = slugify(h.text);
              return (
                <li
                  key={h.id || idx}
                  className={`${h.level === 3 ? "ml-5 list-[circle]" : "list-decimal"} text-gray-600 hover:text-[#ea580c] transition-colors`}
                >
                  <a
                    href={`#${anchor}`}
                    className="hover:underline font-medium inline-flex items-center gap-1.5"
                  >
                    <span>{h.text}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      )}

      {/* 2. Content Blocks Stream */}
      <div className="space-y-7 text-gray-700 leading-relaxed text-sm sm:text-base">
        {blocks.map((block, idx) => {
          switch (block.type) {
            case "heading": {
              const anchor = slugify(block.text);
              if (block.level === 3) {
                return (
                  <h3
                    key={block.id || idx}
                    id={anchor}
                    className="text-lg sm:text-xl font-black text-[#091e3a] tracking-tight mt-8 mb-3 scroll-mt-24 pt-2"
                  >
                    {block.text}
                  </h3>
                );
              }
              return (
                <h2
                  key={block.id || idx}
                  id={anchor}
                  className="text-xl sm:text-3xl font-black text-[#091e3a] tracking-tight mt-12 mb-4 scroll-mt-24 border-b border-gray-100 pb-3"
                >
                  {block.text}
                </h2>
              );
            }

            case "paragraph": {
              // Split text into double-newline paragraphs for clean typography
              const paragraphs = (block.text || "")
                .split("\n\n")
                .filter((p) => p.trim().length > 0);

              if (paragraphs.length === 0) {
                return (
                  <p key={block.id || idx} className="leading-relaxed whitespace-pre-line">
                    {block.text}
                  </p>
                );
              }

              return (
                <div key={block.id || idx} className="space-y-4">
                  {paragraphs.map((pText, pIdx) => (
                    <p key={pIdx} className="leading-relaxed text-gray-700">
                      {pText}
                    </p>
                  ))}
                </div>
              );
            }

            case "image": {
              const isFull = block.layout === "full";
              const isWide = block.layout === "wide";

              return (
                <figure
                  key={block.id || idx}
                  className={`my-8 ${
                    isFull
                      ? "w-full"
                      : isWide
                      ? "w-full sm:-mx-6 sm:w-[calc(100%+3rem)]"
                      : "max-w-3xl mx-auto"
                  }`}
                >
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-gray-100">
                    <Image
                      src={block.url}
                      alt={block.alt || block.caption || "Blog article technical illustration"}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 896px"
                    />
                  </div>
                  {block.caption && (
                    <figcaption className="text-center text-xs text-gray-500 mt-2.5 italic">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }

            case "callout": {
              const variantStyles = {
                tip: {
                  bg: "bg-emerald-50/80 border-emerald-300 text-emerald-950",
                  icon: <Lightbulb className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
                  defaultTitle: "Engineering Pro-Tip",
                },
                warning: {
                  bg: "bg-amber-50/80 border-amber-300 text-amber-950",
                  icon: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
                  defaultTitle: "Operational Caution",
                },
                info: {
                  bg: "bg-sky-50/80 border-sky-300 text-sky-950",
                  icon: <Info className="w-5 h-5 text-sky-600 flex-shrink-0" />,
                  defaultTitle: "Technical Notice",
                },
                tech: {
                  bg: "bg-orange-50/80 border-orange-300 text-orange-950",
                  icon: <Zap className="w-5 h-5 text-[#ea580c] flex-shrink-0" />,
                  defaultTitle: "Hardware Specification Note",
                },
                calculation: {
                  bg: "bg-indigo-50/80 border-indigo-300 text-indigo-950",
                  icon: <Calculator className="w-5 h-5 text-indigo-600 flex-shrink-0" />,
                  defaultTitle: "Engineering Formula & Math",
                },
              };

              const style = variantStyles[block.variant || "tech"] || variantStyles.tech;

              return (
                <div
                  key={block.id || idx}
                  className={`my-6 p-5 sm:p-6 rounded-2xl border ${style.bg} flex items-start gap-3.5 shadow-2xs`}
                >
                  {style.icon}
                  <div className="space-y-1 w-full">
                    <strong className="text-xs sm:text-sm font-bold uppercase tracking-wider block">
                      {block.title || style.defaultTitle}
                    </strong>
                    <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line opacity-95">
                      {block.text}
                    </p>
                  </div>
                </div>
              );
            }

            case "list": {
              const isNumbered = block.style === "numbered";
              return (
                <div key={block.id || idx} className="my-5 pl-2">
                  {isNumbered ? (
                    <ol className="space-y-2 list-decimal list-inside text-gray-700">
                      {(block.items || []).map((item, iIdx) => (
                        <li key={iIdx} className="leading-relaxed pl-1">
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <ul className="space-y-2.5 text-gray-700">
                      {(block.items || []).map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#ea580c] flex-shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            }

            case "quote": {
              return (
                <blockquote
                  key={block.id || idx}
                  className="my-8 p-6 sm:p-8 rounded-2xl bg-[#091e3a]/5 border-l-4 border-[#ea580c] text-gray-800 italic space-y-2"
                >
                  <Quote className="w-6 h-6 text-[#ea580c]/60 mb-1" />
                  <p className="text-base sm:text-lg font-serif font-medium leading-relaxed">
                    &ldquo;{block.text}&rdquo;
                  </p>
                  {block.author && (
                    <footer className="text-xs text-gray-500 font-sans not-italic font-bold pt-1">
                      — {block.author}
                    </footer>
                  )}
                </blockquote>
              );
            }

            case "table": {
              return (
                <div key={block.id || idx} className="my-8 space-y-2">
                  <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-xs">
                    <table className="w-full text-left text-xs sm:text-sm">
                      {block.headers && block.headers.length > 0 && (
                        <thead className="bg-[#091e3a] text-white">
                          <tr>
                            {block.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3.5 sm:p-4 font-bold tracking-tight">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                      )}
                      <tbody className="divide-y divide-gray-100">
                        {(block.rows || []).map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-gray-50 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-3.5 sm:p-4 text-gray-700">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {block.caption && (
                    <p className="text-xs text-gray-500 text-center italic">{block.caption}</p>
                  )}
                </div>
              );
            }

            case "embed": {
              const isCalc = block.targetType === "calculator";
              const targetUrl = isCalc
                ? "/calculator"
                : block.slug
                ? `/products/${block.slug}`
                : "/products";

              return (
                <div
                  key={block.id || idx}
                  className="my-8 bg-[#091e3a] text-white rounded-2xl p-6 sm:p-7 border border-gray-800 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-5"
                >
                  <div className="space-y-1.5 text-center sm:text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#ea580c] flex items-center gap-1 justify-center sm:justify-start">
                      <Sparkles className="w-3 h-3" />
                      <span>{isCalc ? "Interactive Tool" : "Featured Equipment"}</span>
                    </span>
                    <h4 className="text-lg font-black">{block.title}</h4>
                    <p className="text-xs text-gray-300 max-w-lg leading-relaxed">
                      {block.description}
                    </p>
                  </div>

                  <Link
                    href={targetUrl}
                    className="inline-flex items-center gap-2 bg-[#ea580c] hover:bg-[#c2410c] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition-all whitespace-nowrap flex-shrink-0"
                  >
                    <span>{isCalc ? "Launch Calculator" : "View Hardware"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            }

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
