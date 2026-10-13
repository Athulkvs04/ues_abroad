"use client";

import React from "react";
import Link from "next/link";
import { 
  Building2, 
  Coins, 
  ShieldCheck, 
  GraduationCap, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  Zap, 
  MapPin, 
  Compass,
  Award
} from "lucide-react";

interface ServicesBentoSectionProps {
  onOpenConsultModal?: (source?: string) => void;
}

export function ServicesBentoSection({ onOpenConsultModal }: ServicesBentoSectionProps) {
  return (
    <section id="services-section" className="py-20 lg:py-24 bg-slate-50/70 border-b border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>Relocation &amp; Student Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Everything You Need <span className="text-emerald-700">Beyond Admissions</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From zero-spread tuition remittances to verified housing near your campus and embassy visa clearance — full-stack overseas support under one roof.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
          
          {/* Card 1: Accommodation (7 Cols on desktop) */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200/80 p-7 sm:p-9 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shadow-xs">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-bold border border-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Official Amber Portal
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2.5 group-hover:text-emerald-800 transition-colors">
                Verified Student Accommodation
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Book safe, fully-furnished student residences and studios near top universities worldwide through our dedicated Amber portal with price match guarantees.
              </p>

              {/* City tags */}
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                  Popular Student Hubs
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { city: "London", country: "UK", price: "£185/wk" },
                    { city: "Munich", country: "DE", price: "€490/mo" },
                    { city: "Melbourne", country: "AU", price: "A$290/wk" },
                    { city: "Dublin", country: "IE", price: "€210/wk" },
                    { city: "Toronto", country: "CA", price: "C$950/mo" },
                  ].map((item) => (
                    <div 
                      key={item.city}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-medium text-slate-700"
                    >
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <span><strong>{item.city}</strong> <span className="text-slate-400">({item.price})</span></span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Perks list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-slate-100 mb-6 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Bills, WiFi &amp; utilities included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Price match guarantee on PBSA</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No-visa, no-pay 100% refund</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1M+ verified beds in 250+ cities</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href="https://uesabroad.studentacco.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all group/btn w-full sm:w-auto"
              >
                <span>Launch Amber Housing Portal</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
              <Link
                href="/accommodation"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all w-full sm:w-auto text-center"
              >
                <span>Housing Hub &amp; FAQs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Forex (5 Cols on desktop) */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/80 p-7 sm:p-9 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shadow-xs">
                  <Coins className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-bold border border-emerald-300">
                  <Zap className="w-3.5 h-3.5 text-emerald-700" />
                  Official FairexPay Portal
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2.5 group-hover:text-emerald-800 transition-colors">
                Dedicated Student Remittance Portal
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Direct integration with FairexPay to remit tuition fees, German blocked accounts (Expatrio/Fintiba), and GIC transfers with bank-grade security.
              </p>

              {/* Dedicated Portal Feature Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-800 font-mono">uesabroad.fairexpay.com</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Live Portal</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Calculates real-time live interbank wholesale rates directly inside the portal — no branch queues, no manual margin markups.
                </p>
              </div>

              {/* Perks */}
              <div className="space-y-2.5 mb-6 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>RBI Authorised Category-II Dealer security</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Official MT103 Swift copy dispatched in 12–24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Digital Form A2 &amp; 15CA tax receipts included</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
              <a
                href="https://uesabroad.fairexpay.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all text-center group/btn"
              >
                <span>Launch Dedicated Portal</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
              </a>
              <Link
                href="/forex"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors text-center"
              >
                <span>Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Visa Guidance (6 Cols on desktop) */}
          <div className="lg:col-span-6 rounded-3xl bg-white border border-slate-200/80 p-7 sm:p-9 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shadow-xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  99.2% Visa Success Rate
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2.5 group-hover:text-emerald-800 transition-colors">
                Visa Filing &amp; Embassy Interview Drills
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                Our in-house visa officers conduct 1-on-1 consular interview simulations, sponsor affidavit vetting, and proof-of-funds verification for flawless submission.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>German APS certificate assistance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>US F-1 Visa mock drills</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>UK CAS financial checklist verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Australia GS &amp; Canada SDS filing</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenConsultModal?.("Visa Guidance & Embassy Mock Drills")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 font-bold text-xs transition-all cursor-pointer"
              >
                <span>Book 1-on-1 Visa Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: Exam & Language Prep (6 Cols on desktop) */}
          <div className="lg:col-span-6 rounded-3xl bg-white border border-slate-200/80 p-7 sm:p-9 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shadow-xs">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  Certified Trainers
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2.5 group-hover:text-emerald-800 transition-colors">
                Exam Prep &amp; Language Academy
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                Target high test percentiles with structured training modules, live mock exams, and personalized writing evaluation from certified instructors.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>IELTS Academic &amp; TOEFL iBT coaching</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>GRE Quantitative &amp; Verbal score boosters</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>German Language A1, A2 &amp; B1 batches</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free full-length diagnostic assessment</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenConsultModal?.("Exam Prep & Language Coaching")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 font-bold text-xs transition-all cursor-pointer"
              >
                <span>Get Free Diagnostic Mock Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
