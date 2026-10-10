"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Award,
  ChevronRight,
  CheckCircle2,
  Mail,
  Send,
  Loader2,
  X,
  FileText,
} from "lucide-react";
import { COMPANY } from "@/lib/data/company";

interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const OPEN_ROLES: JobRole[] = [
  {
    id: "solar-design-engineer",
    title: "Solar Design & Proposal Engineer",
    department: "Engineering & Sizing",
    location: "Pune Headquarters (Hinjawadi)",
    type: "Full-Time • Onsite",
    experience: "2 - 5 Years",
    description:
      "Responsible for system sizing, PVsyst solar simulations, Single-Line Diagrams (SLD), and techno-commercial proposals for C&I hybrid solar and BESS microgrid projects.",
    responsibilities: [
      "Prepare detailed engineering SLDs for bi-directional hybrid inverters and DG synchronization panels.",
      "Conduct solar yield and generation simulations using PVsyst, Helioscope, and AutoCAD.",
      "Analyze client load profiles (active/reactive power, peak demand kVA, phase unbalance).",
      "Collaborate with EnerTech factory design teams for custom energy storage architectures.",
    ],
    requirements: [
      "B.E. / B.Tech in Electrical Engineering or Renewable Energy.",
      "Proficiency in PVsyst, AutoCAD, and electrical schematic design.",
      "Hands-on understanding of 3-phase AC distribution, net metering, and transformer sizing.",
      "Strong technical writing and techno-commercial presentation skills.",
    ],
  },
  {
    id: "senior-commissioning-engineer",
    title: "Senior Commissioning Engineer (Hybrid PCU & BESS)",
    department: "Field Operations & Testing",
    location: "Chakan MIDC / Maharashtra Field",
    type: "Full-Time • Field",
    experience: "3 - 7 Years",
    description:
      "Lead onsite pre-commissioning, FAT/SAT testing, DG-inverter synchronization, and grid-interconnection for 10kVA to 300kVA hybrid solar PCUs and LiFePO4 battery containers.",
    responsibilities: [
      "Oversee onsite physical installation, AC/DC cabling, earthing, and protection relays.",
      "Configure inverter parameters, MPPT voltage windows, and BMS communication protocols (CAN/RS485).",
      "Perform live load-testing, islanding tests (< 5ms zero-break transfer), and diesel generator synchronization.",
      "Train client plant engineers and maintenance supervisors on safe operation and routine maintenance.",
    ],
    requirements: [
      "Diploma / Degree in Electrical Engineering.",
      "Proven field experience in commissioning utility/C&I solar inverters, UPS systems, or BESS.",
      "Deep understanding of safety standards (IEC 62109, CEA guidelines, HT/LT electrical codes).",
      "Willingness to travel across industrial zones in Maharashtra and neighboring states.",
    ],
  },
  {
    id: "b2b-sales-manager-ci",
    title: "B2B Technical Sales Manager (C&I Solar & Storage)",
    department: "Commercial & Business Development",
    location: "Pune / Mumbai Industrial Belt",
    type: "Full-Time • Hybrid",
    experience: "4 - 8 Years",
    description:
      "Drive enterprise adoption of high-efficiency solar hybrid inverters and turnkey energy storage solutions across manufacturing plants, hospitals, commercial complexes, and EPC contractors.",
    responsibilities: [
      "Identify and engage plant heads, chief electrical engineers, and CFOs of high-power consuming industries.",
      "Demonstrate ROI, diesel replacement savings, and MSEDCL peak demand tariff reduction using our sizing calculators.",
      "Build long-term relationships with Tier-1 solar EPC contractors, electrical consultants, and architects.",
      "Lead commercial negotiations and contract closures backed by official EnerTech warranty guarantees.",
    ],
    requirements: [
      "B.E. Electrical / MBA Marketing or equivalent technical sales background.",
      "Demonstrated track record of selling B2B solar equipment, inverters, diesel generators, or industrial UPS.",
      "Strong network with industrial clusters (MIDC Chakan, Bhosari, Talegaon, Aurangabad, Navi Mumbai).",
      "Excellent commercial presentation, negotiation, and relationship management capabilities.",
    ],
  },
  {
    id: "field-service-amc-engineer",
    title: "Field Service & Preventive Maintenance Specialist",
    department: "After-Sales & Technical Support",
    location: "Pune Regional Hub",
    type: "Full-Time • Field",
    experience: "1 - 4 Years",
    description:
      "Deliver proactive maintenance, thermal imaging audits, firmware upgrades, and rapid-response breakdown troubleshooting for client solar plants under annual maintenance contracts (AMC).",
    responsibilities: [
      "Execute scheduled preventive maintenance visits (inverter cleaning, torque checking, thermal audits).",
      "Diagnose communication faults, inverter error codes, and battery cell balancing issues.",
      "Support 24/7 industrial SLA response for critical clients (hospitals, data centers, cold chain).",
      "Maintain detailed service reports and replacement component tracking.",
    ],
    requirements: [
      "Diploma in Electrical / Electronics Engineering or ITI Electrician with solar experience.",
      "Hands-on proficiency with multi-meters, clamp meters, IR thermography, and insulation testers.",
      "Customer-centric attitude with strong troubleshooting mindset.",
      "Valid driving license and ability to attend regional breakdown calls promptly.",
    ],
  },
];

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Application form state
  const [applicantName, setApplicantName] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantExp, setApplicantExp] = useState("");
  const [applicantCurrentOrg, setApplicantCurrentOrg] = useState("");
  const [applicantPortfolio, setApplicantPortfolio] = useState("");
  const [applicantNote, setApplicantNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleOpenApply = (role: JobRole) => {
    setSelectedRole(role);
    setIsApplyModalOpen(true);
    setSubmitSuccess(false);
    setSubmitError("");
  };

  const handleCloseApply = () => {
    setIsApplyModalOpen(false);
    setSubmitSuccess(false);
    setSubmitError("");
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantPhone.trim()) {
      setSubmitError("Please provide your name and telephone number.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        name: applicantName.trim(),
        phone: applicantPhone.trim(),
        email: applicantEmail.trim(),
        formType: "Job Application",
        productModel: selectedRole ? selectedRole.title : "General Engineering Application",
        company: applicantCurrentOrg.trim(),
        message: `Position Applied: ${selectedRole?.title} (${selectedRole?.department})
Years of Experience: ${applicantExp}
LinkedIn / Portfolio / Resume Link: ${applicantPortfolio}

Candidate Statement:
${applicantNote}`,
      };

      const res = await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit application");
      }

      setSubmitSuccess(true);
      // Reset form
      setApplicantName("");
      setApplicantPhone("");
      setApplicantEmail("");
      setApplicantExp("");
      setApplicantCurrentOrg("");
      setApplicantPortfolio("");
      setApplicantNote("");
    } catch (err: any) {
      setSubmitError(err.message || "An error occurred while submitting your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* 1. HERO STAGE */}
      <section className="bg-[#091e3a] text-white py-16 lg:py-24 relative overflow-hidden border-b border-[#061528]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl space-y-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-300 font-medium">
              <Link href="/" className="hover:text-[#ea580c] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-[#ea580c] font-bold">Careers</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-200 text-xs font-bold border border-white/15">
              <Users className="w-3.5 h-3.5 text-[#f97316]" />
              <span>Engineering Careers • Electra Solar &amp; EnerTech</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Build the Future of Clean Energy with{" "}
              <span className="text-[#f97316]">
                Electra Solar
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
              Join Pune&apos;s leading turnkey solar engineering and energy storage distributor.
              Work with genuine EnerTech bi-directional hybrid inverters, utility BESS, and zero-break critical power systems.
            </p>
          </div>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 mt-12 border-t border-white/15">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#f97316] flex items-center justify-center border border-orange-500/20 flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">Tier-1 Hardware</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Direct factory access to 10kVA - 300kVA inverters and LiFePO4 storage packs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#f97316] flex items-center justify-center border border-orange-500/20 flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">35+ Years Pedigree</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Backed by EnerTech UPS Pvt. Ltd. (Pune Plant • Estd. 1989) heritage.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#f97316] flex items-center justify-center border border-orange-500/20 flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">High-Impact Growth</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Competitive compensation, field certifications, and leadership acceleration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OPEN ENGINEERING POSITIONS */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-gray-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#ea580c] block mb-1">
              Join Our Engineering Desk
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#091e3a] tracking-tight">
              Open Positions ({OPEN_ROLES.length})
            </h2>
          </div>
          <div className="text-xs text-gray-500">
            Based at Pune Headquarters &amp; Maharashtra Industrial Hubs
          </div>
        </div>

        <div className="space-y-6">
          {OPEN_ROLES.map((role) => (
            <div
              key={role.id}
              className="bg-white border border-gray-200 hover:border-orange-300 rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-100">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-[#ea580c] text-[11px] font-bold border border-orange-200">
                      {role.department}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[11px] font-semibold">
                      {role.type}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#091e3a] group-hover:text-[#ea580c] transition-colors">
                    {role.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-medium pt-1">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {role.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                      {role.experience}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    onClick={() => handleOpenApply(role)}
                    className="w-full sm:w-auto bg-[#091e3a] hover:bg-[#ea580c] text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Apply for Role</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Role Details Grid */}
              <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-600">
                <div>
                  <h4 className="font-bold text-[#091e3a] text-xs uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ea580c]" />
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-1.5 list-disc list-inside text-gray-600 leading-relaxed">
                    {role.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-[#091e3a] text-xs uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ea580c]" />
                    Candidate Profile &amp; Skills
                  </h4>
                  <ul className="space-y-1.5 list-disc list-inside text-gray-600 leading-relaxed">
                    {role.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* General Application Callout */}
        <div className="mt-12 bg-[#091e3a] text-white rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-[#061528]">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black">Don&apos;t see an exact match?</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
              We are constantly scouting for skilled electrical engineers, solar system designers, and site technicians across India. Send us your resume directly.
            </p>
          </div>

          <a
            href={`mailto:${COMPANY.contact.salesEmail}?subject=General%20Engineering%20Career%20Application%20-%20Electra%20Solar`}
            className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all flex items-center gap-2 flex-shrink-0"
          >
            <Mail className="w-4 h-4" />
            <span>Email Resume Directly</span>
          </a>
        </div>
      </section>

      {/* 3. APPLICATION MODAL */}
      {isApplyModalOpen && selectedRole && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 my-8 animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-[#091e3a] text-white p-6 relative">
              <button
                type="button"
                onClick={handleCloseApply}
                className="absolute top-5 right-5 p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-[11px] font-bold text-[#f97316] uppercase tracking-wider mb-1">
                Engineering Application
              </div>
              <h3 className="text-lg font-black">{selectedRole.title}</h3>
              <p className="text-xs text-gray-300 mt-0.5">{selectedRole.location}</p>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {submitSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Application Received!</h4>
                  <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                    Thank you! Your profile has been delivered to our Pune technical hiring desk. We will reach out to you if your profile aligns with our requirements.
                  </p>
                  <button
                    onClick={handleCloseApply}
                    className="mt-4 bg-[#091e3a] hover:bg-[#ea580c] text-white text-xs font-bold px-6 py-2.5 rounded-full transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="space-y-4">
                  {submitError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                      {submitError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="Primary Contact Number"
                        className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="Email Address"
                        className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Years of Experience
                      </label>
                      <input
                        type="text"
                        value={applicantExp}
                        onChange={(e) => setApplicantExp(e.target.value)}
                        placeholder="Relevant Experience"
                        className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Current Company
                      </label>
                      <input
                        type="text"
                        value={applicantCurrentOrg}
                        onChange={(e) => setApplicantCurrentOrg(e.target.value)}
                        placeholder="Current Organization"
                        className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      LinkedIn Profile / Drive Resume Link
                    </label>
                    <input
                      type="url"
                      value={applicantPortfolio}
                      onChange={(e) => setApplicantPortfolio(e.target.value)}
                      placeholder="LinkedIn Profile or Google Drive Resume URL"
                      className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Summary / Note to Hiring Manager
                    </label>
                    <textarea
                      rows={3}
                      value={applicantNote}
                      onChange={(e) => setApplicantNote(e.target.value)}
                      placeholder="Briefly highlight your expertise in hybrid solar, inverters, or electrical engineering..."
                      className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#091e3a] hover:bg-[#ea580c] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Delivering Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
