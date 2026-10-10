"use client";

import React from "react";

interface FinalCtaSectionProps {
  onOpenConsultModal?: (source?: string) => void;
}

export function FinalCtaSection({ onOpenConsultModal }: FinalCtaSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#090b11] text-white py-24 border-t border-slate-800">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/15 via-emerald-500/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[300px] h-[300px] bg-accent/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="container max-w-5xl mx-auto px-4 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-accent text-xs font-semibold tracking-wide uppercase">
          <span>Your Global Future Awaits</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
          Ready to Begin Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-teal-300">
            Study Abroad Adventure?
          </span>
        </h2>

        <p className="max-w-2xl mx-auto text-lg text-slate-300 leading-relaxed font-normal">
          Take the first step today. Let our senior academic counsellors and visa officers guide you from profile evaluation to your campus arrival.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onOpenConsultModal && onOpenConsultModal("Final CTA • Start My Journey")}
            className="btn-primary-glow !py-4 !px-8 !text-base font-bold shadow-xl hover:shadow-premium transition-all transform hover:-translate-y-1"
          >
            Start My Journey
          </button>
          <a
            href="#destinations-section"
            className="btn-secondary-glow !text-white !border-slate-700 hover:!bg-slate-800/80 hover:!border-slate-600 !py-4 !px-8 !text-base font-semibold"
          >
            Explore Destinations
          </a>
        </div>

        <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto text-slate-400 text-xs font-medium">
          <div className="flex items-center justify-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span> 100% Visa Assistance
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span> Zero Brokerage Housing
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span> Scholarship Mentoring
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span> Preferential Forex Rates
          </div>
        </div>
      </div>
    </section>
  );
}
