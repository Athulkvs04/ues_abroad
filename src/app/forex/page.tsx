"use client";

import React, { useState } from "react";
import { 
  ExternalLink, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ChevronDown, 
  Lock, 
  Building2, 
  Award, 
  PhoneCall,
  Sparkles
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";

const CURRENCY_RATES = {
  EUR: { label: "Euro (€)", rate: 90.65, bankRate: 93.80, min: 1000, preset: 11208, defaultPurpose: "Germany Blocked Account" },
  GBP: { label: "British Pound (£)", rate: 108.40, bankRate: 112.20, min: 1000, preset: 15000, defaultPurpose: "UK Tuition Deposit" },
  USD: { label: "US Dollar ($)", rate: 84.15, bankRate: 86.90, min: 1000, preset: 25000, defaultPurpose: "US University Wire" },
  CAD: { label: "Canadian Dollar (CAD $)", rate: 61.80, bankRate: 64.10, min: 1000, preset: 20635, defaultPurpose: "Canada GIC (Scotiabank)" },
  AUD: { label: "Australian Dollar (AUD $)", rate: 55.40, bankRate: 57.50, min: 1000, preset: 18000, defaultPurpose: "Australia CoE Deposit" },
};

type CurrencyKey = keyof typeof CURRENCY_RATES;

const PURPOSES = [
  { id: "tuition", title: "University Tuition Fees", desc: "Direct SWIFT wire to official university bank account with student ID reference." },
  { id: "blocked", title: "German Blocked Account (Sperrkonto)", desc: "Expatrio, Coracle, or Fintiba funding with official 06-code proof." },
  { id: "gic", title: "Canada GIC (CAD $20,635)", desc: "Mandatory student living account funding for Canadian SDS study permits." },
  { id: "living", title: "Student Living Expenses & Forex Cards", desc: "Prepaid zero-markup multi-currency student card for flight and initial weeks." },
  { id: "accom", title: "Student Accommodation Deposit", desc: "Rent advances and security deposits to verified PBSA student residences." },
];

const FAQS = [
  {
    q: "How does FairexPay offer cheaper rates than retail Indian banks?",
    a: "Retail banks charge a retail forex spread of 3% to 5% above the interbank rate plus hidden wire communication fees. FairexPay is a direct institutional forex platform authorized by the Reserve Bank of India (RBI) that passes live wholesale interbank rates directly to students, saving between ₹25,000 and ₹75,000 per remittance."
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
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyKey>("EUR");
  const [amount, setAmount] = useState<number>(CURRENCY_RATES.EUR.preset);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const curData = CURRENCY_RATES[selectedCurrency];
  const totalInrInterbank = Math.round(amount * curData.rate);
  const totalInrBank = Math.round(amount * curData.bankRate);
  const estimatedSavings = totalInrBank - totalInrInterbank;

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitted(true);
  };

  return (
    <PublicLayout>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200/80 pt-14 pb-20">
        {/* Subtle background ambient brand glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Official FairexPay Integration • RBI Authorised Forex Dealer</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              Student Forex &amp;{" "}
              <span className="accent-text">International Wire Transfers</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Send university tuition fees, fund Germany blocked accounts, and pay Canada GIC at genuine live interbank rates with zero hidden markups.
            </p>
          </div>

          {/* Interactive Calculator + Portal Launch Bento */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Live Calculator Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-emerald-600" />
                      <span>Live Rate Calculator</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">Calculate your instant savings vs traditional retail banks</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60">
                    Live Interbank
                  </span>
                </div>

                {/* Currency selector tabs */}
                <div className="mb-6">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                    Select Target Currency
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {(Object.keys(CURRENCY_RATES) as CurrencyKey[]).map((cur) => (
                      <button
                        key={cur}
                        type="button"
                        onClick={() => {
                          setSelectedCurrency(cur);
                          setAmount(CURRENCY_RATES[cur].preset);
                        }}
                        className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                          selectedCurrency === cur
                            ? "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/20"
                            : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {cur}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount input */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Transfer Amount ({selectedCurrency})
                    </label>
                    <span className="text-xs text-slate-500 font-medium">{curData.defaultPurpose}</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min={100}
                      value={amount}
                      onChange={(e) => setAmount(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-lg font-bold font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      {selectedCurrency}
                    </span>
                  </div>
                </div>

                {/* Conversion Summary Comparison Box */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 border border-emerald-200/80 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold text-slate-600 block uppercase tracking-wider">
                        Estimated Payable via FairexPay
                      </span>
                      <div className="text-3xl sm:text-4xl font-extrabold text-emerald-800 font-mono mt-1">
                        ₹{totalInrInterbank.toLocaleString("en-IN")}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 mt-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>You save ≈ ₹{estimatedSavings.toLocaleString("en-IN")} vs retail banks!</span>
                      </div>
                    </div>

                    <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-emerald-100">
                      <div className="text-xs text-slate-500 font-medium">Interbank Rate</div>
                      <div className="text-sm font-bold text-slate-900 font-mono">1 {selectedCurrency} = ₹{curData.rate.toFixed(2)}</div>
                      <div className="text-[11px] text-slate-500 mt-1">Retail Bank: ₹{curData.bankRate.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="https://uesabroad.fairexpay.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Lock Rate &amp; Transfer on FairexPay</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              </div>
            </div>

            {/* Right: Dedicated Portal Callout Banner */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0A7D45] via-emerald-700 to-[#075A32] rounded-3xl p-7 sm:p-8 text-white relative overflow-hidden shadow-premium flex flex-col justify-between">
              {/* Internal glow */}
              <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent/20 blur-3xl -translate-y-1/3 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-black/15 blur-2xl" />
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold mb-5 border border-white/20">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>Exclusive Student Rates</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 leading-snug">
                  Why 10,000+ Students Remit via FairexPay
                </h3>

                <p className="text-emerald-50/90 text-sm leading-relaxed mb-6">
                  Skip branch queues, paper forms, and expensive bank fees. Every transfer is protected by RBI Authorised Dealer Category-II licenses.
                </p>

                <div className="space-y-3.5">
                  {[
                    "Zero Telegraphic Transfer (TT) Fees",
                    "Official MT103 Swift copy in 12–24h",
                    "Free Form A2 & 15CA tax receipts",
                    "Dedicated WhatsApp & phone support",
                    "Accepted by all universities worldwide"
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 pt-8 mt-6 border-t border-white/15">
                <div className="flex items-center justify-between text-xs text-emerald-100/80">
                  <span>Authorized RBI Portal:</span>
                  <span className="font-mono font-bold text-white">uesabroad.fairexpay.com</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Key Transfer Purposes */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Supported International Remittance Categories
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Every international student requirement handled under RBI Liberalised Remittance Scheme (LRS) regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PURPOSES.map((p) => (
              <div 
                key={p.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center mb-4 font-bold">
                    ✓
                  </div>
                  <h3 className="text-slate-900 font-bold text-base mb-2">{p.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <a
                    href="https://uesabroad.fairexpay.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
                  >
                    <span>Initiate Transfer</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 5-Step Remittance Roadmap */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Simple 24-Hour Process</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              How Student Forex Remittance Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              From invoice verification to campus fee confirmation in 5 easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: "01", title: "Upload Invoice", desc: "Share your university fee notice or account details." },
              { step: "02", title: "Lock Rate", desc: "Lock live interbank rate with zero market spread." },
              { step: "03", title: "Quick KYC", desc: "Instant digital Aadhaar & PAN verification." },
              { step: "04", title: "Transfer INR", desc: "Wire rupees via RTGS/NEFT to RBI escrow account." },
              { step: "05", title: "Swift Receipt", desc: "Receive official Form A2 and MT103 Swift copy in 24h." }
            ].map((st) => (
              <div key={st.step} className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-center flex flex-col justify-between">
                <div>
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-xs inline-flex items-center justify-center mb-3">
                    {st.step}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mb-1.5">{st.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions About Student Forex
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Clear answers on LRS regulations, TCS tax compliance, and Swift confirmation times.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? "rotate-180 text-emerald-600" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 mt-2">
                      <p className="pt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Need Personal Assistance? Contact / Lead CTA */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/40 rounded-3xl p-8 sm:p-12 border border-emerald-200 shadow-sm text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-4">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
              <span>Free Forex Counselling Desk</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              Need Help With Your University Fee Transfer?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Our forex officers verify your university invoice and walk you through the transfer process step-by-step.
            </p>

            {leadSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-100/70 border border-emerald-200 text-emerald-900 max-w-md mx-auto">
                <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto mb-2" />
                <h4 className="font-bold text-base">Request Received!</h4>
                <p className="text-xs text-emerald-800 mt-1">Our student forex desk will call you within 15 minutes to assist with your transfer.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all whitespace-nowrap cursor-pointer"
                >
                  Request Callback
                </button>
              </form>
            )}

            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-emerald-600" /> 100% Encrypted</span>
              <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-emerald-600" /> RBI Authorised</span>
              <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-emerald-600" /> Zero Service Fee</span>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
