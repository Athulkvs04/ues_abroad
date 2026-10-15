"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  Globe2, 
  Percent,
  PhoneCall
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";

const PURPOSES = [
  { 
    id: "tuition", 
    title: "University Tuition Fees", 
    desc: "Direct SWIFT wire to official university bank account with student ID reference." 
  },
  { 
    id: "blocked", 
    title: "German Blocked Account (Sperrkonto)", 
    desc: "Expatrio, Coracle, or Fintiba funding with official 06-code proof." 
  },
  { 
    id: "gic", 
    title: "Canada GIC ($20,635 CAD)", 
    desc: "Mandatory student living account funding for Canadian SDS study permits." 
  },
  { 
    id: "living", 
    title: "Student Living Expenses & Forex Cards", 
    desc: "Prepaid zero-markup multi-currency student card for flight and initial weeks." 
  },
  { 
    id: "accom", 
    title: "Student Accommodation Deposit", 
    desc: "Rent advances and security deposits to verified PBSA student residences." 
  },
];

const COMPARISON_POINTS = [
  {
    feature: "Exchange Rate Pricing",
    fairexpay: "Live wholesale interbank rates with zero hidden markups",
    traditionalBanks: "Retail markup of 3% – 5% above actual rate",
  },
  {
    feature: "Telegraphic Transfer (TT) Fees",
    fairexpay: "₹0 / Free telegraphic wire processing",
    traditionalBanks: "₹1,500 – ₹3,500 per outward wire",
  },
  {
    feature: "Turnaround Time",
    fairexpay: "12 to 24 business hours to university account",
    traditionalBanks: "3 to 5 business days with delays",
  },
  {
    feature: "Swift MT103 Receipt",
    fairexpay: "Digital instant dispatch within 24 hours",
    traditionalBanks: "Requires manual branch follow-ups",
  },
  {
    feature: "Documentation & Form A2",
    fairexpay: "100% paperless digital generation & submission",
    traditionalBanks: "Multiple physical branch visits & paper forms",
  },
  {
    feature: "Dedicated Student Desk",
    fairexpay: "1-on-1 WhatsApp & phone relationship officer",
    traditionalBanks: "Generic call centers and branch counters",
  },
];

const FAQS = [
  {
    q: "How does the dedicated FairexPay portal work?",
    a: "UES Abroad has partnered with FairexPay to provide students with a secure international wire portal. When you launch the portal at uesabroad.fairexpay.com, you access real-time wholesale exchange rates, paperless LRS documentation, and direct remittance to your foreign university or blocked account provider."
  },
  {
    q: "Why do we use the FairexPay portal instead of displaying rates here?",
    a: "Foreign exchange rates fluctuate continuously during trading hours. The dedicated portal connects directly to live bank treasuries, ensuring you get the exact, real-time rate down to the second without any delayed or estimated numbers."
  },
  {
    q: "How long does it take for the foreign university to receive the funds?",
    a: "Most international student wires are completed within 12 to 24 business hours. You receive an official MT103 Swift confirmation receipt as soon as the wire is released, which you can immediately submit to your university admissions portal or visa file."
  },
  {
    q: "What is Form A2 and does FairexPay generate it automatically?",
    a: "Form A2 is the mandatory RBI declaration for outward remittances under the Liberalised Remittance Scheme (LRS). With FairexPay, Form A2 and the corresponding 15CA documentation are digitally generated and certified within 24 hours of your wire."
  },
  {
    q: "What are the TCS (Tax Collected at Source) rules for student education?",
    a: "Under RBI and Indian Tax rules: if remittances are funded via an authorized education loan, the TCS rate is only 0.5% above ₹7 Lakhs. If funded from personal/parent savings, TCS is 5% above ₹7 Lakhs. TCS is fully refundable and can be claimed back in your annual Income Tax Return (ITR)."
  },
  {
    q: "Can parents or family sponsors transfer on the student's behalf?",
    a: "Yes. Indian parents or legal sponsors can remit funds under their own PAN and LRS quota on behalf of the student by providing the student's admission letter or university invoice."
  }
];

export default function ForexPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadPurpose, setLeadPurpose] = useState("University Tuition Fee Wire");
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
          email: `${leadName.toLowerCase().replace(/\s+/g, ".")}@inquiry.uesabroad.com`,
          phone: leadPhone,
          source: "FOREX_FAIREXPAY_PAGE",
          targetCountry: "Global",
          targetDegree: "Tuition / Forex Remittance",
          metadata: {
            purpose: leadPurpose,
            portal: "uesabroad.fairexpay.com",
          },
        }),
      });
      setLeadSubmitted(true);
    } catch (err) {
      console.error("Failed to submit forex request:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      {/* 1. Dramatic Authentic Hero Header with Seamless Left Scrim */}
      <section className="relative overflow-hidden min-h-[480px] lg:min-h-[520px] flex items-center bg-slate-950 text-white border-b border-slate-800">
        {/* Full-bleed Real High-Resolution Banking Architecture Landscape */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <Image
            src="/universities/fairexpay_banking_hero.webp"
            alt="International Banking and Financial District Architecture"
            fill
            priority
            className="object-cover object-[center_35%] lg:object-[65%_35%]"
          />
          {/* Smooth seamless left scrim: provides authentic contrast directly on canvas with NO box */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 via-45% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/30" />
        </div>

        <div className="container max-w-6xl mx-auto px-4 py-20 lg:py-24 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Student Forex &amp;{" "}
              <span className="text-emerald-400">International Wire Portal</span>
            </h1>

            <p className="mt-5 text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-xl">
              Lock live wholesale exchange rates for university tuition, German blocked accounts (Expatrio, Coracle, Fintiba), and Canada GIC with zero retail markups and paperless compliance.
            </p>

            {/* Direct Gateway Launch CTA Row */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-lg">
              <a
                href="https://uesabroad.fairexpay.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base shadow-lg hover:shadow-emerald-500/25 transition-all group cursor-pointer"
              >
                <span>Launch FairexPay Portal</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#remittance-purposes"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 backdrop-blur-xs transition-all text-center"
              >
                <span>Supported Wires</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick Metrics Bar directly on canvas */}
            <div className="mt-10 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-200 text-xs font-medium">
              <div>
                <strong className="block text-emerald-400 text-base font-extrabold">0% Spread</strong>
                <span className="text-slate-400 text-[11px]">Interbank Wholesale</span>
              </div>
              <div>
                <strong className="block text-white text-base font-extrabold">12–24h Swift</strong>
                <span className="text-slate-400 text-[11px]">MT103 Proof</span>
              </div>
              <div>
                <strong className="block text-white text-base font-extrabold">100% Digital</strong>
                <span className="text-slate-400 text-[11px]">Paperless Form A2</span>
              </div>
              <div>
                <strong className="block text-white text-base font-extrabold">5,000+ Campuses</strong>
                <span className="text-slate-400 text-[11px]">Direct Wire Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Clean Executive Light Body Area */}
      <div className="relative bg-slate-50/80 min-h-screen border-b border-slate-200/80">
        {/* Section A: Supported Transfer Purposes */}
        <section id="remittance-purposes" className="py-16 sm:py-20">
          <div className="container max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold mb-3">
                <Globe2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Global Student Payments</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Supported International Remittances
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
                Everything required throughout your overseas academic journey is processed securely via the portal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PURPOSES.map((p, idx) => (
                <div 
                  key={p.id}
                  className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold mb-4 group-hover:scale-105 transition-transform">
                      0{idx + 1}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                    <span>Transfer via Portal</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}

              {/* Portal Action Card — Clean Light Executive Design */}
              <div className="p-7 rounded-3xl bg-emerald-50/80 border-2 border-emerald-500/30 shadow-xs flex flex-col justify-between relative overflow-hidden">
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-2">
                    Live Portal Access
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Ready to Remit Funds?
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Zero retail bank margin, zero branch visits. Calculate live rates and dispatch university wires in 15 minutes.
                  </p>
                </div>
                <a
                  href="https://uesabroad.fairexpay.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs text-center transition-all inline-flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Launch FairexPay Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section B: Comparison Table: FairexPay vs Traditional Banks */}
        <section className="py-16 sm:py-20 border-t border-slate-200/80">
          <div className="container max-w-5xl mx-auto px-4 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold mb-3">
                <Percent className="w-3.5 h-3.5 text-emerald-700" />
                <span>Institutional Advantage</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Why UES Students Choose FairexPay
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Transparent wholesale pricing vs. high-street retail bank branches.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100/90 text-slate-800">
                      <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-slate-700">Feature</th>
                      <th className="py-4 px-6 text-emerald-700 font-bold uppercase tracking-wider text-[11px]">FairexPay Portal</th>
                      <th className="py-4 px-6 text-slate-500 font-bold uppercase tracking-wider text-[11px]">Traditional Retail Banks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {COMPARISON_POINTS.map((item, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                        <td className="py-4 px-6 font-semibold text-slate-800">{item.feature}</td>
                        <td className="py-4 px-6 text-emerald-800 font-semibold">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{item.fairexpay}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-slate-500">{item.traditionalBanks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section C: Advisory Callback & Lead Form — Clean Executive Light Card */}
        <section className="py-16 sm:py-20 border-t border-slate-200/80">
          <div className="container max-w-4xl mx-auto px-4 relative z-10">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Free Forex Advisory</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Speak with our Forex Specialist
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Have questions about university bank accounts, German blocked account codes, or LRS declarations? Our counsellors guide you free of charge.
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Free advisory for all UES Abroad students</span>
                  </div>
                </div>

                <div className="md:col-span-6">
                  {leadSubmitted ? (
                    <div className="bg-emerald-50/80 rounded-2xl p-6 text-center border border-emerald-200/80">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                      <h4 className="font-bold text-slate-900 text-sm">Request Received</h4>
                      <p className="text-xs text-slate-600 mt-1">Our forex desk will contact you on WhatsApp/phone shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} className="space-y-3 bg-slate-50/80 p-6 rounded-2xl border border-slate-200/70">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name *"
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number (WhatsApp) *"
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                        />
                        <select
                          value={leadPurpose}
                          onChange={(e) => setLeadPurpose(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs focus:outline-hidden focus:border-emerald-600"
                        >
                          <option value="University Tuition Fee Wire">Tuition Wire</option>
                          <option value="German Blocked Account (Expatrio/Fintiba)">Blocked Account</option>
                          <option value="Canada GIC Deposit">Canada GIC</option>
                          <option value="Accommodation Deposit">Accommodation</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:opacity-60"
                      >
                        {isSubmitting ? "Submitting Request..." : "Request Free Forex Callback"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section D: Frequently Asked Questions */}
        <section className="py-16 sm:py-20 border-t border-slate-200/80">
          <div className="container max-w-3xl mx-auto px-4 relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Forex &amp; Remittance FAQs
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2">
                Everything you need to know about LRS limits, TCS tax rules, and wire security.
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => (
                <div 
                  key={idx}
                  className="rounded-2xl border border-slate-200/90 bg-white/95 overflow-hidden shadow-xs backdrop-blur-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${openFaq === idx ? "rotate-180 text-emerald-600" : "text-slate-400"}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="https://uesabroad.fairexpay.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-sm hover:shadow transition-all"
              >
                <span>Launch Dedicated FairexPay Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
