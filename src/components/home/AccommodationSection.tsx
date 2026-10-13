"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, MapPin, Building2, CheckCircle2, Globe2, ExternalLink } from "lucide-react";

interface AccommodationSectionProps {
  onOpenConsultModal?: (source?: string) => void;
}

const DESTINATION_PREVIEWS = [
  { city: "London", country: "United Kingdom", flag: "🇬🇧", priceRange: "£180 – £360 / wk", highlight: "50k+ PBSA verified beds" },
  { city: "Munich", country: "Germany", flag: "🇩🇪", priceRange: "€450 – €780 / mo", highlight: "100% Anmeldung-ready" },
  { city: "Dublin", country: "Ireland", flag: "🇮🇪", priceRange: "€190 – €320 / wk", highlight: "Near Trinity & UCD" },
  { city: "Melbourne", country: "Australia", flag: "🇦🇺", priceRange: "A$280 – A$490 / wk", highlight: "PBSA with gyms & study pods" },
  { city: "Toronto", country: "Canada", flag: "🇨🇦", priceRange: "C$850 – C$1,450 / mo", highlight: "Near UofT & subway lines" },
  { city: "Sydney", country: "Australia", flag: "🇦🇺", priceRange: "A$320 – A$520 / wk", highlight: "Harbourside student studios" },
];

const TRUST_BADGES = [
  {
    icon: CheckCircle2,
    title: "100% Verified Inventory",
    desc: "Every property is audited and legally contracted through institutional PBSA providers.",
  },
  {
    icon: Building2,
    title: "All Utility Bills Included",
    desc: "Water, heating, electricity, and high-speed student WiFi covered in rent.",
  },
  {
    icon: ShieldCheck,
    title: "No Visa, No Pay Guarantee",
    desc: "100% refund on advance booking deposits if your student visa is deferred or refused.",
  },
];

export function AccommodationSection({ onOpenConsultModal }: AccommodationSectionProps) {
  return (
    <section id="accommodation-section" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Official Amber Student Integration • 1M+ Verified Beds</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight">
              Pre-Book Verified Student Housing Abroad
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Skip the housing stress and fraudulent listings. UES Abroad has partnered directly with Amber (amberstudent.com) to provide 1M+ verified rooms, private studios, and student residences near top universities worldwide.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://uesabroad.studentacco.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all group"
            >
              <span>Launch Amber Portal</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* City preview grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {DESTINATION_PREVIEWS.map((dest) => (
            <a
              key={dest.city}
              href="https://uesabroad.studentacco.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl border border-slate-200/80 p-4 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{dest.flag}</span>
                <div>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">{dest.city}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{dest.country}</p>
                </div>
              </div>
              <p className="text-xs font-semibold text-emerald-700 font-mono">{dest.priceRange}</p>
              <p className="text-[10px] text-slate-500 leading-snug flex items-start gap-1">
                <MapPin className="w-2.5 h-2.5 mt-0.5 shrink-0 text-slate-400" />
                {dest.highlight}
              </p>
            </a>
          ))}
        </div>

        {/* Integration CTA Card */}
        <div className="bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/40 rounded-3xl p-7 sm:p-10 relative overflow-hidden border border-emerald-200/90 shadow-sm">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4">
                <Globe2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Dedicated Portal: uesabroad.studentacco.com</span>
              </div>
              <h3 className="text-slate-900 text-2xl sm:text-3xl font-extrabold mb-3 leading-snug tracking-tight">
                Search &amp; Reserve Directly on the Co-Branded Amber Portal
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Filter by university proximity, inspect 3D interactive room tours, lock your price match guarantee, and receive official lease documents for your visa file.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="https://uesabroad.studentacco.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all group whitespace-nowrap"
              >
                <span>Open Amber Housing Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="/accommodation"
                className="px-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-all whitespace-nowrap text-center"
              >
                Housing Hub &amp; FAQs
              </Link>
            </div>
          </div>
        </div>

        {/* Value Badges Banner */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TRUST_BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.title} className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{badge.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
