"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, MapPin, Building, CheckCircle2, Clock, Globe, Star } from "lucide-react";

interface AccommodationSectionProps {
  onOpenConsultModal?: (source?: string) => void;
}

const DESTINATION_PREVIEWS = [
  { city: "Munich", country: "Germany", flag: "🇩🇪", priceRange: "€450 – €800 / mo", highlight: "Anmeldung-ready leases" },
  { city: "London", country: "United Kingdom", flag: "🇬🇧", priceRange: "£280 – £420 / wk", highlight: "Campus-adjacent residences" },
  { city: "Dublin", country: "Ireland", flag: "🇮🇪", priceRange: "€700 – €950 / mo", highlight: "Verified WG & student halls" },
  { city: "Melbourne", country: "Australia", flag: "🇦🇺", priceRange: "AUD $280 – $450 / wk", highlight: "Purpose-built student living" },
  { city: "Toronto", country: "Canada", flag: "🇨🇦", priceRange: "CAD $750 – $1,100 / mo", highlight: "On-campus & off-campus options" },
  { city: "Sydney", country: "Australia", flag: "🇦🇺", priceRange: "AUD $320 – $480 / wk", highlight: "Harbourside student studios" },
];

const TRUST_BADGES = [
  {
    icon: CheckCircle2,
    title: "Official City Registration",
    desc: "Every lease supports Anmeldung, UK council registration, and Irish residence cards.",
  },
  {
    icon: Building,
    title: "Campus-Adjacent Locations",
    desc: "Under 20 minutes commute to top partner universities by foot or public transit.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Scam Risk Guarantee",
    desc: "Never send money to unverified private listings. All leases are legally audited.",
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
              <span>100% Verified Student Housing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight">
              Pre-Book Your Student Housing Abroad
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Skip the housing stress and fraudulent listings. UES Abroad partners with verified European and global student residence providers with official registration (<span className="text-emerald-700 font-semibold">Anmeldung</span>) guarantees.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/accommodation"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-all group"
            >
              <span>Browse All Rooms</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* City preview grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {DESTINATION_PREVIEWS.map((dest) => (
            <Link
              key={dest.city}
              href="/accommodation"
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
            </Link>
          ))}
        </div>

        {/* Integration CTA Card - Branded UES Abroad Style (Clean White & Emerald Accent) */}
        <div className="bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/40 rounded-3xl p-7 sm:p-10 relative overflow-hidden border border-emerald-200/90 shadow-sm">
          {/* Ambient subtle brand glows */}
          <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-500/8 blur-3xl -translate-y-1/3 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/8 blur-2xl" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                <span>Full Booking Portal — Coming Soon</span>
              </div>
              <h3 className="text-slate-900 text-2xl sm:text-3xl font-extrabold mb-3 leading-snug tracking-tight">
                Our dedicated accommodation<br className="hidden sm:block" /> booking platform is on its way.
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We're integrating a full end-to-end student housing booking system — browse verified rooms, book securely, and receive your official lease contract, all in one place.
              </p>

              <div className="flex flex-wrap gap-2.5 mt-5">
                {["Live Availability", "Instant Booking", "Lease Verification", "Anmeldung Support"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg bg-white text-slate-700 border border-emerald-200/80 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
                    <Star className="w-3 h-3 text-emerald-600" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/accommodation"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg active:scale-[0.97] transition-all group whitespace-nowrap"
              >
                <Globe className="w-4 h-4" />
                <span>View Available Rooms</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                type="button"
                onClick={() => onOpenConsultModal?.("Accommodation Advisory")}
                className="px-7 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-emerald-300 font-semibold text-sm transition-all whitespace-nowrap text-center cursor-pointer shadow-2xs"
              >
                Request Housing Advisory
              </button>
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
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
