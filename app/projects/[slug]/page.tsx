import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft, MapPin, CheckCircle2, TrendingUp, Sparkles, ShieldCheck } from "lucide-react";
import { getStoredProjects, getStoredProjectBySlug } from "@/lib/store";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const projects = getStoredProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getStoredProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found | Electra Solar" };
  return {
    title: `${project.title} | Electra Solar Case Study`,
    description: `Installation case study: ${project.title} in ${project.location}. System: ${project.capacity}.`,
  };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = getStoredProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  return (
    <div className="py-12 lg:py-16 bg-[#f8fafd] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#ea580c] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/projects" className="hover:text-[#ea580c] transition-colors">
            Projects
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#ea580c] font-semibold">{project.title}</span>
        </div>

        {/* Hero Card */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-deye-card relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#ea580c]">
                {project.category}
              </span>
              <span className="text-xs font-mono text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded border border-gray-200">
                Commissioned {project.completionYear}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#091e3a] tracking-tight">
              {project.title}
            </h1>
            <div className="w-16 h-1 bg-[#ea580c] rounded-full" />

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-[#ea580c]" />
              <span>{project.location}</span>
            </div>

            <div className="inline-block bg-orange-50/70 border border-orange-200 rounded-xl px-4 py-2 font-mono text-[#ea580c] font-bold text-sm sm:text-base">
              Installed Capacity: {project.capacity}
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {project.impactMetrics.map((m, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-5 text-center space-y-1 shadow-sm">
              <span className="text-xs text-gray-500 block">{m.label}</span>
              <strong className="text-2xl font-extrabold text-[#ea580c] font-mono block">
                {m.value}
              </strong>
            </div>
          ))}
        </div>

        {/* Challenge vs Solution Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-3 shadow-sm">
            <div className="text-xs font-bold text-red-600 uppercase tracking-wider">
              Operational Challenge
            </div>
            <h3 className="text-xl font-bold text-[#091e3a]">The Vulnerability</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-3 shadow-sm">
            <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider">
              Engineered Implementation
            </div>
            <h3 className="text-xl font-bold text-[#091e3a]">The Solution</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Products Installed Box */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-deye-card">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#091e3a]">Equipment Installed</h3>
            <div className="w-10 h-0.5 bg-[#ea580c]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.productsInstalled.map((prodName, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <CheckCircle2 className="w-5 h-5 text-[#ea580c] flex-shrink-0" />
                <span className="text-sm font-semibold text-gray-800">{prodName}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Client Quote */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-sm">
          <blockquote className="text-lg sm:text-xl text-gray-700 italic max-w-2xl mx-auto leading-relaxed">
            &ldquo;{project.quoteSnippet}&rdquo;
          </blockquote>
          <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider">
            Verified Plant / Facility Operations Feedback
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <Link href="/projects" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-[#ea580c] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all projects</span>
          </Link>
          <Link href="/contact">
            <Button variant="deye-primary" size="sm">
              <span>Discuss a Similar Project</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
