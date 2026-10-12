"use client";

import React, { useState } from "react";
import { 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ChevronDown, 
  Building2, 
  Globe2, 
  FileCheck, 
  Percent
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
    a: "UES Abroad has integrated directly with FairexPay (an RBI Authorised Dealer Category-II partner). When you launch the portal at uesabroad.fairexpay.com, you get real-time institutional wholesale exchange rates, paperless documentation, and direct remittance to your foreign university or blocked account provider."
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

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitted(true);
  };

  return (
    <PublicLayout>
      {/* 1. Hero Section - Clean, Professional White & Emerald Theme */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200/80 pt-16 pb-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-4 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Official FairexPay Integration • RBI Authorised Category-II Dealer</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Student Forex &amp;{" "}
              <span className="text-emerald-700">International Wire Portal</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
              UES Abroad has integrated directly with FairexPay to provide students with institutional wholesale interbank rates, paperless compliance, and guaranteed Swift receipts.
            </p>
          </div>

          {/* Focal Gateway Launch Hero Card - Clean White & Emerald Border */}
          <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-emerald-200/90 p-8 sm:p-12 shadow-lg relative overflow-hidden">
            {/* Top emerald accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-400" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-bold font-mono mb-3">
                  <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>uesabroad.fairexpay.com</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Launch the Dedicated UES Remittance Portal
                </h2>
                <p className="text-sm text-slate-600 mt-2 max-w-lg leading-relaxed">
                  Calculate real-time live interbank exchange rates, lock your rate, and dispatch university tuition or blocked account wires with zero retail bank markup.
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
                <a
                  href="https://uesabroad.fairexpay.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-sm hover:shadow-md active:scale-[0.98] transition-all group"
                >
                  <span>Open Dedicated Portal</span>
                  <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <span className="text-[11px] text-center text-slate-500 font-medium">
                  Instant Access • Zero Branch Visits
                </span>
              </div>
            </div>

            {/* 4 Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <Percent className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Zero Bank Spread</h4>
                  <p className="text-xs text-slate-600 mt-1">Live wholesale interbank pricing saves ₹30k–₹85k per wire</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">12–24h Swift MT103</h4>
                  <p className="text-xs text-slate-600 mt-1">Real-time wire release proof for admissions and visa filing</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">RBI &amp; LRS Compliant</h4>
                  <p className="text-xs text-slate-600 mt-1">Automated digital Form A2 and Section 206C(1G) tax filing</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">5,000+ Universities</h4>
                  <p className="text-xs text-slate-600 mt-1">Expatrio, Fintiba, Coracle, Canada GIC &amp; global campuses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Supported Transfer Purposes - Light Slate Background */}
      <section className="py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Supported International Remittances
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Everything required throughout your global academic journey is processed securely via the portal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PURPOSES.map((p, idx) => (
              <div 
                key={p.id}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>Transfer via Portal</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}

            {/* Portal Action Tile */}
            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/90 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-2">
                  Ready to Transfer?
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Get Started on FairexPay Now
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  No complex bank visits. Complete your wire entirely from home with domestic payment.
                </p>
              </div>
              <a
                href="https://uesabroad.fairexpay.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center transition-all inline-flex items-center justify-center gap-1.5"
              >
                <span>Launch Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 5-Step Process Roadmap - Clean White */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How the Remittance Process Works
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              From portal registration to university fund confirmation in 5 straightforward steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: "01", title: "Open Portal", desc: "Go to uesabroad.fairexpay.com and enter transfer amount." },
              { step: "02", title: "Select Purpose", desc: "Choose Tuition, Blocked Account, or GIC and add details." },
              { step: "03", title: "Digital KYC", desc: "Upload student offer letter and sponsor PAN card." },
              { step: "04", title: "Domestic Pay", desc: "Transfer INR domestically via NEFT / RTGS to secure escrow." },
              { step: "05", title: "Swift MT103", desc: "Receive official Swift confirmation copy in 12–24 hours." }
            ].map((s) => (
              <div key={s.step} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-extrabold text-emerald-700 font-mono block mb-2">Step {s.step}</span>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{s.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Comparison Table: FairexPay vs Traditional Banks */}
      <section className="py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why UES Students Choose FairexPay
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Transparent institutional advantages over high-street retail bank branches.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-4 px-6 text-slate-500 font-bold uppercase tracking-wider text-[11px]">Feature</th>
                    <th className="py-4 px-6 text-emerald-800 font-bold uppercase tracking-wider text-[11px]">FairexPay Portal</th>
                    <th className="py-4 px-6 text-slate-500 font-bold uppercase tracking-wider text-[11px]">Traditional Retail Banks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {COMPARISON_POINTS.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6 font-semibold text-slate-800">{item.feature}</td>
                      <td className="py-4 px-6 text-emerald-700 font-semibold">
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

      {/* 5. Advisory Callback & Lead Form */}
      <section className="py-20 bg-white border-b border-slate-200/80 relative">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-2">
                Need Guidance Before Transferring?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Speak with our Forex Specialist
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
                Have questions about university bank accounts, German blocked account codes, or LRS declarations? Our counsellors guide you free of charge.
              </p>
            </div>

            <div className="w-full md:w-80 shrink-0">
              {leadSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-slate-900">Request Received</h4>
                  <p className="text-xs text-slate-600 mt-1">Our forex desk will contact you within 30 minutes.</p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number (with WhatsApp)"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <select
                      value={leadPurpose}
                      onChange={(e) => setLeadPurpose(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-emerald-600"
                    >
                      <option value="University Tuition Fee Wire">University Tuition Fee Wire</option>
                      <option value="German Blocked Account (Expatrio/Fintiba)">German Blocked Account</option>
                      <option value="Canada GIC Deposit">Canada GIC Deposit</option>
                      <option value="Accommodation Deposit">Accommodation Deposit</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
                  >
                    Request Free Forex Callback
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Frequently Asked Questions */}
      <section className="py-20 bg-slate-50/70">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
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
                className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs"
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
    </PublicLayout>
  );
}
