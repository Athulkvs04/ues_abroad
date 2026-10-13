"use client";

import React from "react";
import Link from "next/link";
import { 
  Calculator, 
  GraduationCap, 
  Globe, 
  ArrowRight, 
  Sliders, 
  Calendar,
  CheckCircle2
} from "lucide-react";

interface DecisionTeaserSectionProps {
  onOpenConsultModal?: (source?: string) => void;
}

export function DecisionTeaserSection({ onOpenConsultModal }: DecisionTeaserSectionProps) {
  const tools = [
    {
      icon: GraduationCap,
      tag: "Admissions Probability",
      title: "Profile Eligibility Checker",
      description: "Enter your undergraduate CGPA and IELTS score to evaluate admission likelihood across 500+ universities in the US, UK, Germany, and Canada.",
      features: ["500+ Campus Benchmarks", "Direct vs. Pathway Tiering"],
    },
    {
      icon: Calculator,
      tag: "Tuition & Living in ₹",
      title: "Annual Budget Estimator",
      description: "Forecast your total annual outlay including university tuition wires, blocked accounts / GIC living expenses, and visa costs with live currency rates.",
      features: ["Real-time Currency Conversion", "100% Loan Eligible Breakdown"],
    },
    {
      icon: Globe,
      tag: "PSW & PR Pathways",
      title: "Destination & Visa Benchmarks",
      description: "Compare post-study work visa rights (up to 4 years), permanent residency pathways, average living costs, and processing times side-by-side.",
      features: ["6 Major Study Destinations", "Official Embassy Guidelines"],
    },
  ];

  return (
    <section id="decision-section" className="py-20 lg:py-24 bg-slate-50/80 border-b border-slate-200/80 relative">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Planning Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Data-Driven <span className="text-emerald-700">Decision Tools</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Take the guesswork out of studying abroad. Use our free interactive calculators to evaluate eligibility, forecast expenses in INR, and sequence your application milestones.
          </p>
        </div>

        {/* 3 Interactive Tool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.title}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200/70">
                      {tool.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-emerald-700 transition-colors">
                    {tool.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    {tool.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    {tool.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/tools"
                  className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  <span>Open Tool in Decision Center</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom Executive Action Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              Explore All 5 Interactive Calculators
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Includes Intake Timeline sequencing, university matrix comparisons, and profile evaluations — 100% free.
            </p>
          </div>

          <Link
            href="/tools"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-sm hover:shadow transition-all group shrink-0"
          >
            <span>Launch Smart Decision Center</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
