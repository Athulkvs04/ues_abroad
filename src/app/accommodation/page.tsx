"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Globe2, 
  MapPin, 
  ChevronDown, 
  PhoneCall, 
  HelpCircle,
  Eye,
  BadgePercent,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";

const AMBER_PORTAL_URL = "https://uesabroad.studentacco.com/";

const PORTAL_PILLARS = [
  {
    icon: Eye,
    title: "Live Inventory & 3D Tours",
    badge: "Real-Time Systems",
    desc: "Room availability in student capitals updates minute-by-minute. Our dedicated portal connects directly to live PBSA booking engines with interactive 3D room tours and verified layouts.",
  },
  {
    icon: ShieldCheck,
    title: "100% Scam-Free & Audited",
    badge: "Audited Landlords",
    desc: "Eliminates phantom landlords and unverified social media classifieds. Every property is institutionally verified with legal tenancy contracts valid for embassy visa filing.",
  },
  {
    icon: Clock,
    title: "No Visa, No Pay Safeguard",
    badge: "100% Refundable",
    desc: "Book with complete peace of mind. If your student visa application is delayed or rejected, you receive a 100% full refund on your advance reservation deposit.",
  },
  {
    icon: BadgePercent,
    title: "Price Match Guarantee",
    badge: "Zero Agency Fees",
    desc: "Direct pre-negotiated institutional rates with zero agency markups, zero hidden commissions, and all utility bills (water, heating, WiFi) included in the rent.",
  },
];

const POPULAR_HUBS = [
  { name: "London", country: "United Kingdom", flag: "🇬🇧", tag: "50,000+ Beds" },
  { name: "Dublin", country: "Ireland", flag: "🇮🇪", tag: "Near Trinity & UCD" },
  { name: "Munich", country: "Germany", flag: "🇩🇪", tag: "Anmeldung-Ready" },
  { name: "Melbourne", country: "Australia", flag: "🇦🇺", tag: "PBSA Residences" },
  { name: "Toronto", country: "Canada", flag: "🇨🇦", tag: "Near Transit Lines" },
  { name: "Berlin", country: "Germany", flag: "🇩🇪", tag: "Student WG & Studios" },
];

const FAQS = [
  {
    q: "Why does UES Abroad use a dedicated Amber portal instead of on-site listings?",
    a: "Student housing availability changes continuously across 250+ university cities. Amber (amberstudent.com) is the world's leading student housing platform. Integrating their live portal gives our students real-time inventory, instant price match guarantees, and direct 3D virtual room walkthroughs without relying on outdated static listings."
  },
  {
    q: "What is the 'No Visa, No Pay' policy?",
    a: "If your student visa application is refused or significantly delayed by the embassy, or if you fail to meet your university's conditional academic requirements, you can cancel your booking with zero penalty and receive a 100% refund on your advance deposit upon submitting official documentation."
  },
  {
    q: "Are utility bills and internet included in the rent?",
    a: "Yes. The vast majority of properties on the dedicated UES Abroad portal are Purpose-Built Student Accommodations (PBSAs) where electricity, water, central heating, and high-speed student WiFi are all bundled into your rent, shielding you from seasonal utility spikes."
  },
  {
    q: "Will I receive official proof of accommodation for my visa and city registration?",
    a: "Yes. Once you reserve your room on the portal, an official Tenancy Agreement and Confirmation Letter are immediately generated. In Germany, properties provide the mandatory Wohnungsgeberbestätigung for your Anmeldung (city registration); in the UK and Ireland, the letter serves as official visa accommodation proof."
  }
];

export default function AccommodationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadCountry, setLeadCountry] = useState("United Kingdom");
  const [leadCity, setLeadCity] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          phone: leadPhone,
          source: "HOUSING_AMBER_PORTAL_PAGE",
          targetCountry: leadCountry,
          targetDegree: "Student Housing Assistance",
          metadata: {
            preferredCity: leadCity,
            portal: "uesabroad.studentacco.com",
          },
        }),
      });
      setLeadSubmitted(true);
    } catch (err) {
      console.error("Failed to submit housing request:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      {/* 1. Dramatic Authentic Hero Header with Seamless Left Scrim */}
      <section className="relative overflow-hidden min-h-[480px] lg:min-h-[520px] flex items-center bg-slate-950 text-white border-b border-slate-800">
        {/* Full-bleed Real High-Resolution Studio Architecture Landscape */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <Image
            src="/universities/amber_studio_hero.webp"
            alt="Verified Student Accommodation Studio Loft"
            fill
            priority
            className="object-cover object-[center_35%] lg:object-[65%_35%]"
          />
          {/* Smooth seamless left scrim: provides authentic contrast directly on canvas with NO box */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 via-45% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/30" />
        </div>

        <div className="container max-w-6xl mx-auto px-4 py-16 lg:py-20 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-xs font-semibold mb-5 backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Official Amber Student Integration • 1M+ Verified Beds</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Pre-Book Verified Student Housing <br />
              <span className="text-emerald-400">Via Dedicated Amber Portal</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-xl">
              Skip unverified classifieds and deposit fraud. Access 1M+ verified student rooms, private studios, and student residences near 5,000+ top campuses with guaranteed partner pricing.
            </p>

            {/* Direct Gateway Launch CTA Row */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-lg">
              <a
                href={AMBER_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base shadow-lg hover:shadow-emerald-500/25 transition-all group cursor-pointer"
              >
                <span>Launch Housing Portal</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#why-portal"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 backdrop-blur-xs transition-all text-center"
              >
                <span>Why We Use Amber</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick Metrics Bar directly on canvas */}
            <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-200 text-xs font-medium">
              <div>
                <strong className="block text-white text-base font-extrabold">1,000,000+</strong>
                <span className="text-slate-400 text-[11px]">Verified Beds</span>
              </div>
              <div>
                <strong className="block text-white text-base font-extrabold">250+ Cities</strong>
                <span className="text-slate-400 text-[11px]">UK, EU, ANZ &amp; US</span>
              </div>
              <div>
                <strong className="block text-emerald-400 text-base font-extrabold">100% Refund</strong>
                <span className="text-slate-400 text-[11px]">No Visa, No Pay</span>
              </div>
              <div>
                <strong className="block text-white text-base font-extrabold">₹0 Markup</strong>
                <span className="text-slate-400 text-[11px]">Price Match Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Clean Executive Light Body Area */}
      <div className="relative bg-slate-50/80 min-h-screen border-b border-slate-200/80">
        {/* Section A: Why UES Abroad Uses the Dedicated Portal */}
        <section id="why-portal" className="py-16 sm:py-20">
          <div className="container max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>The Amber Partnership Advantage</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Why We Built a Dedicated Housing Portal
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
                Rather than showing static, delayed listings, UES Abroad integrated directly with Amber to give you verified live availability and scam protection.
              </p>
            </div>

            {/* 4 Focused Pillars Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {PORTAL_PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="bg-white/95 rounded-3xl border border-slate-200/90 p-7 sm:p-8 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group backdrop-blur-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-105 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200/70">
                          {pillar.badge}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">Integrated on studentacco.com</span>
                      <a
                        href={AMBER_PORTAL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                      >
                        <span>Explore on Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section B: Featured Student Hubs Quick-Launch */}
        <section className="py-12 sm:py-16 border-t border-slate-200/80">
          <div className="container max-w-6xl mx-auto px-4 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold mb-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Direct City Jump-Links</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Search Top Campus Hubs on Amber
                </h2>
              </div>

              <a
                href={AMBER_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-xs shrink-0 self-start sm:self-auto"
              >
                <span>Browse All 250+ Cities</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {POPULAR_HUBS.map((hub) => (
                <a
                  key={hub.name}
                  href={AMBER_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/95 rounded-2xl border border-slate-200/80 p-4 text-center shadow-xs hover:border-emerald-300 hover:shadow-md transition-all group block"
                >
                  <span className="text-2xl block mb-2">{hub.flag}</span>
                  <strong className="block text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {hub.name}
                  </strong>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    {hub.country}
                  </span>
                  <span className="mt-3 inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[10px] font-bold">
                    {hub.tag}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Section C: Laser-Focused FAQs (Only 4 Sharp Questions) */}
        <section className="py-16 sm:py-20 border-t border-slate-200/80">
          <div className="container max-w-3xl mx-auto px-4 relative z-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold mb-3">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span>Quick Answers</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={faq.q}
                    className="bg-white/95 rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs transition-all backdrop-blur-xs"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-emerald-600" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                        <p className="pt-3">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section D: Compact Counselor Assistance Callback — Clean Executive Light Card */}
        <section className="py-16 border-t border-slate-200/80">
          <div className="container max-w-4xl mx-auto px-4 relative z-10">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Personalized Guidance</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Prefer Counselor Assistance?
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    If you have specific lease dates, roommate preferences, or need help shortlisting halls near your faculty, request a free callback.
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Free advisory for UES Abroad students</span>
                  </div>
                </div>

                <div className="md:col-span-6">
                  {leadSubmitted ? (
                    <div className="bg-emerald-50/80 rounded-2xl p-6 text-center border border-emerald-200/80">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                      <h4 className="font-bold text-slate-900 text-sm">Request Received</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        Our housing desk will connect with you via WhatsApp/phone within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} className="space-y-3 bg-slate-50/80 p-6 rounded-2xl border border-slate-200/70">
                      <div>
                        <input
                          type="text"
                          required
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          placeholder="Your Name *"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2.5">
                        <input
                          type="tel"
                          required
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          placeholder="Phone / WhatsApp *"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                        />
                        <select
                          value={leadCountry}
                          onChange={(e) => setLeadCountry(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs focus:outline-hidden focus:border-emerald-600"
                        >
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Ireland">Ireland</option>
                          <option value="Germany">Germany</option>
                          <option value="Australia">Australia</option>
                          <option value="Canada">Canada</option>
                          <option value="United States">United States</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:opacity-60"
                      >
                        {isSubmitting ? "Submitting..." : "Request Housing Callback"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section E: Legal & Compliance Note */}
        <section className="py-8 border-t border-slate-200/80 text-slate-500 text-[11px]">
          <div className="container max-w-6xl mx-auto px-4">
            <p className="leading-relaxed text-center">
              UES Abroad facilitates student accommodation discovery in partnership with Amber Student (amberstudent.com / uesabroad.studentacco.com). Tenancy agreements, property inspection terms, and deposit policies are governed directly between the student and the respective PBSA provider.
            </p>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
