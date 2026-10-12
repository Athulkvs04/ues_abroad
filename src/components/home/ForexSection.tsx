"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Shield, Zap, TrendingUp, ArrowRight } from "lucide-react";

interface ForexSectionProps {
  onOpenConsultModal?: (source?: string) => void;
}

const TRANSFER_FEATURES = [
  {
    icon: Zap,
    title: "Live Interbank Rates",
    desc: "Zero retail markup on GBP, EUR, USD, CAD & AUD transfers to universities worldwide.",
  },
  {
    icon: Shield,
    title: "RBI Licensed & Compliant",
    desc: "All remittances processed under RBI LRS guidelines with official Form A2 receipts issued within 24 hours.",
  },
  {
    icon: TrendingUp,
    title: "3–5% Savings vs Banks",
    desc: "Tuition fees, Canada GIC, Germany blocked accounts — all at rates retail banks can't match.",
  },
];

export function ForexSection({ onOpenConsultModal }: ForexSectionProps) {
  return (
    <section id="forex-section" className="py-20 bg-white border-b border-slate-200/80 relative">
      <div className="container max-w-5xl relative z-10">
        {/* Header */}
        <div className="section-header max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Powered by FairexPay — RBI Authorised Forex Dealer</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
            Student Forex &amp;{" "}
            <span className="accent-text">International Transfers</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Send tuition fees, fund Germany blocked accounts, and pay Canada GIC at genuine interbank rates with zero hidden charges.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {TRANSFER_FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-slate-50/70 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100/80 border border-emerald-200/80 text-emerald-700 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-slate-900 font-bold text-base mb-2">{feat.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main FairexPay Banner Card */}
        <div className="relative bg-gradient-to-br from-[#0A7D45] via-emerald-700 to-[#075A32] rounded-3xl p-8 sm:p-10 overflow-hidden shadow-premium text-white">
          {/* Internal ambient brand glow */}
          <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent/15 blur-3xl -translate-y-1/3 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-black/15 blur-2xl" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold mb-4 border border-white/20 backdrop-blur-xs">
                <span>🔗</span>
                <span>uesabroad.fairexpay.com</span>
              </div>
              <h3 className="text-white text-2xl sm:text-3xl font-extrabold mb-3 leading-snug">
                Ready to transfer? Get the best rate now.
              </h3>
              <p className="text-emerald-50/90 text-sm sm:text-base leading-relaxed">
                Our dedicated portal on FairexPay gives you live INR rates, instant quotes, and a seamless transfer experience — all in one place.
              </p>

              <div className="flex flex-wrap gap-2.5 mt-5 text-xs font-semibold">
                {["Tuition Fee Wire", "Canada GIC", "Germany Sperrkonto", "Living Expenses"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-end gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="https://uesabroad.fairexpay.com"
                target="_blank"
                rel="noopener noreferrer"
                id="forex-portal-cta"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white text-emerald-900 font-bold text-base shadow-lg hover:shadow-xl hover:bg-emerald-50 active:scale-[0.97] transition-all group whitespace-nowrap w-full sm:w-auto"
              >
                <span>Go to FairexPay Portal</span>
                <ExternalLink className="w-4.5 h-4.5 text-emerald-700 transition-transform group-hover:scale-110" />
              </a>
              <p className="text-emerald-100/70 text-xs text-center">
                Opens in new tab · Secured by FairexPay
              </p>
            </div>
          </div>
        </div>

        {/* Advisory fallback & Full Guide Link */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-8 text-sm">
          <Link
            href="/forex"
            className="text-emerald-700 hover:text-emerald-800 font-bold inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Explore Dedicated Forex Guide &amp; Rates</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="hidden sm:inline text-slate-300">•</span>
          <button
            type="button"
            className="text-slate-600 hover:text-emerald-700 font-medium transition-colors underline-offset-4 hover:underline cursor-pointer inline-flex items-center gap-1.5"
            onClick={() => onOpenConsultModal?.("Forex Assistance — FairexPay Integration")}
          >
            <span>Need transfer help? Book free advisory session</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
