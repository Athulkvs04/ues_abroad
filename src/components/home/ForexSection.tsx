"use client";

import React, { useState, useEffect } from "react";
import { AlertTriangle, Shield } from "lucide-react";

interface ForexSectionProps {
  onOpenConsultModal?: (source?: string) => void;
}

const DEFAULT_RATES: Record<string, number> = {
  EUR: 90.5,
  USD: 83.8,
  GBP: 106.2,
  CAD: 61.4,
  AUD: 54.8,
};

const CURRENCY_INFO: Record<string, { label: string; flag: string; purpose: string }> = {
  EUR: { label: "EUR (€)", flag: "🇪🇺", purpose: "Germany Blocked Account & Tuition" },
  USD: { label: "USD ($)", flag: "🇺🇸", purpose: "USA Tuition & Living Remittance" },
  GBP: { label: "GBP (£)", flag: "🇬🇧", purpose: "UK CAS Maintenance & University Fees" },
  CAD: { label: "CAD ($)", flag: "🇨🇦", purpose: "Canada GIC & Semester Tuition" },
  AUD: { label: "AUD ($)", flag: "🇦🇺", purpose: "Australia CoE Deposit & Overseas Cover" },
};

type ForexPurpose = "tuition" | "gic" | "blocked";

interface PurposeDetail {
  id: ForexPurpose;
  title: string;
  badge: string;
  defaultCurrency: string;
  defaultAmount: number;
  description: string;
  keyFeature: string;
  presets: { label: string; amount: number }[];
  buttonLabel: string;
}

const FOREX_PURPOSES: Record<ForexPurpose, PurposeDetail> = {
  tuition: {
    id: "tuition",
    title: "Tuition Fee Wire",
    badge: "Direct University Remittance",
    defaultCurrency: "EUR",
    defaultAmount: 10000,
    description: "Official wire transfer directly to recognized foreign universities with zero intermediary telegraphic transfer (TT) deductions.",
    keyFeature: "Official Form A2 receipt & SWIFT MT103 copy generated within 24h for university fee clearance.",
    presets: [
      { label: "Seat Deposit (5,000)", amount: 5000 },
      { label: "Semester Fee (10,000)", amount: 10000 },
      { label: "Annual Tuition (20,000)", amount: 20000 },
    ],
    buttonLabel: "Lock Tuition Rate & Initiate Wire",
  },
  gic: {
    id: "gic",
    title: "Canada GIC & Living",
    badge: "IRCC SDS Visa Mandatory",
    defaultCurrency: "CAD",
    defaultAmount: 20635,
    description: "Mandatory Guaranteed Investment Certificate (GIC) required by IRCC for Canada SDS study permits via CIBC or Scotiabank.",
    keyFeature: "Direct investment confirmation certificate issued for your Canada High Commission visa file.",
    presets: [
      { label: "Mandatory GIC (CAD 20,635)", amount: 20635 },
      { label: "Living Expenses (CAD 10,000)", amount: 10000 },
      { label: "Living + Travel (CAD 25,000)", amount: 25000 },
    ],
    buttonLabel: "Lock CAD Rate for Canada GIC",
  },
  blocked: {
    id: "blocked",
    title: "German Blocked Account",
    badge: "German National Visa (Sperrkonto)",
    defaultCurrency: "EUR",
    defaultAmount: 11904,
    description: "Official legal living-expense requirement mandated by the German Federal Foreign Office (€992/month × 12 months) via Fintiba, Expatrio, or Coracle.",
    keyFeature: "Official 091-Sperrkonto confirmation document accepted at German Embassy & VFS visa appointments.",
    presets: [
      { label: "Mandatory Deposit (€11,904)", amount: 11904 },
      { label: "Deposit + Buffer (€12,050)", amount: 12050 },
      { label: "One Semester (€6,000)", amount: 6000 },
    ],
    buttonLabel: "Lock EUR Rate for German Sperrkonto",
  },
};

export function ForexSection({ onOpenConsultModal }: ForexSectionProps) {
  const [purpose, setPurpose] = useState<ForexPurpose>("tuition");
  const [amount, setAmount] = useState<number>(10000);
  const [currency, setCurrency] = useState<string>("EUR");
  const [rates, setRates] = useState<Record<string, number>>(DEFAULT_RATES);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>("Just now");

  // Rate lock form state
  const [lockName, setLockName] = useState("");
  const [lockPhone, setLockPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lockSuccessMessage, setLockSuccessMessage] = useState<string | null>(null);
  const [lockErrorMessage, setLockErrorMessage] = useState<string | null>(null);

  const handlePurposeSelect = (newPurpose: ForexPurpose) => {
    setPurpose(newPurpose);
    const detail = FOREX_PURPOSES[newPurpose];
    setCurrency(detail.defaultCurrency);
    setAmount(detail.defaultAmount);
  };

  useEffect(() => {
    let isMounted = true;
    async function fetchLiveRates() {
      try {
        const res = await fetch("/api/forex/rates");
        if (!res.ok) throw new Error("Failed to fetch rates");
        const data = await res.json();
        if (isMounted && data.rates) {
          setRates(data.rates);
          setIsLive(Boolean(data.isLive));
          setLastUpdated("Live interbank feed");
        }
      } catch (err) {
        console.warn("Forex fetch failed, using fallback:", err);
        if (isMounted) {
          setIsLive(false);
          setLastUpdated("Estimated rate");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchLiveRates();
    return () => {
      isMounted = false;
    };
  }, []);

  const currentRate = rates[currency] || DEFAULT_RATES[currency] || 85;
  const inrEquivalent = Math.ceil(amount * currentRate);
  const estimatedBankMarkup = Math.round(inrEquivalent * 0.025); // ~2.5% typical bank spread savings
  const activeDetail = FOREX_PURPOSES[purpose];

  const handleLockRate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lockName.trim() || !lockPhone.trim()) return;

    setIsSubmitting(true);
    setLockSuccessMessage(null);
    setLockErrorMessage(null);

    try {
      const res = await fetch("/api/forex/rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lockName,
          phone: lockPhone,
          currency,
          amount,
          rate: currentRate,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setLockSuccessMessage(data.message || `Rate locked for ${currency} ${amount.toLocaleString()} (${activeDetail.title})! A FairexPay specialist will call you.`);
        setLockName("");
        setLockPhone("");
      } else {
        setLockErrorMessage(data.error || "Failed to lock rate. Please try again.");
      }
    } catch (err) {
      console.error("Lock rate error:", err);
      setLockErrorMessage("Network error. Please try again or book a consultation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="forex-section" className="py-24 bg-slate-50/80 border-b border-slate-200/70">
      <div className="container max-w-6xl">
        <div className="section-header max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{isLive ? "Live Interbank Rates" : "FairexPay Banking Corridor"}</span>
            <span>•</span>
            <span>Zero Bank Spread</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Student Forex &amp; <span className="accent-text">International Transfers</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed max-w-xl mx-auto">
            Send university tuition, fund German blocked accounts, and pay living expenses at genuine interbank exchange rates with zero hidden markups.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Key Highlights & Trust */}
          <div className="lg:col-span-5 space-y-8 pt-2">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                Save 3% to 5% on Every University Remittance
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Traditional retail banks add hidden currency spreads and wire fees. With UES Abroad and RBI-authorized dealer corridors, student transfers are settled directly with zero bank spread and full digital Form A2 compliance.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">✓</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Zero Telegraphic Transfer (TT) Fees</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">No hidden intermediary correspondent deductions taken from the student tuition amount.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">✓</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Swift Form A2 Receipt within 24 Hours</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">Official legal remittance receipt generated quickly for university fee clearance and visa proof.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">✓</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">RBI Licensed Cat-II Banking Partner</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">Direct settlement through authorized dealers under RBI Liberalised Remittance Scheme.</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 text-xs sm:text-sm text-emerald-950 flex items-center gap-3.5 shadow-sm">
              <Shield className="w-5 h-5 text-emerald-700 shrink-0" />
              <span className="leading-relaxed font-medium">Fully compliant with Reserve Bank of India (RBI) student education guidelines and TCS tax benefits.</span>
            </div>
          </div>

          {/* Right Column: Clean White Currency Calculator Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 lg:p-12 border border-slate-200/90 shadow-sm">
            {/* Purpose Tabs - Informative selection */}
            <div>
              <div className="flex rounded-2xl bg-slate-100/90 p-1.5 text-xs sm:text-sm font-semibold mb-4 gap-2">
                <button 
                  type="button"
                  className={`flex-1 py-3 px-3 rounded-xl transition-all cursor-pointer ${purpose === "tuition" ? "bg-white text-emerald-900 font-bold shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                  onClick={() => handlePurposeSelect("tuition")}
                >
                  Tuition Fee
                </button>
                <button 
                  type="button"
                  className={`flex-1 py-3 px-3 rounded-xl transition-all cursor-pointer ${purpose === "gic" ? "bg-white text-emerald-900 font-bold shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                  onClick={() => handlePurposeSelect("gic")}
                >
                  Living / GIC
                </button>
                <button 
                  type="button"
                  className={`flex-1 py-3 px-3 rounded-xl transition-all cursor-pointer ${purpose === "blocked" ? "bg-white text-emerald-900 font-bold shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                  onClick={() => handlePurposeSelect("blocked")}
                >
                  Blocked Account
                </button>
              </div>

              {/* Dynamic Context Card for the selected purpose */}
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 text-xs text-slate-700">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-emerald-950 text-sm">{activeDetail.title}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 text-[10px] font-bold uppercase tracking-wider">
                    {activeDetail.badge}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed mb-2">
                  {activeDetail.description}
                </p>
                <div className="flex items-center gap-1.5 text-emerald-900 font-medium text-[11px] pt-1.5 border-t border-emerald-200/60">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>{activeDetail.keyFeature}</span>
                </div>
              </div>
            </div>

            {/* Inputs: Amount and Currency */}
            <div className="space-y-7">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    You Send (Foreign Currency)
                  </label>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Purpose: {activeDetail.title}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                  <div className="sm:col-span-5">
                    <select 
                      value={currency} 
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="EUR">🇪🇺 EUR (€)</option>
                      <option value="USD">🇺🇸 USD ($)</option>
                      <option value="GBP">🇬🇧 GBP (£)</option>
                      <option value="CAD">🇨🇦 CAD ($)</option>
                      <option value="AUD">🇦🇺 AUD ($)</option>
                    </select>
                  </div>
                  <div className="sm:col-span-7">
                    <input 
                      type="number" 
                      min="100"
                      step="100"
                      value={amount} 
                      onChange={(e) => setAmount(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full px-4.5 py-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white text-right font-mono transition-all"
                      placeholder="Amount"
                    />
                  </div>
                </div>

                {/* Preset Chips */}
                <div className="mt-3 flex flex-wrap gap-2 items-center">
                  <span className="text-[11px] text-slate-500 font-medium">Quick Presets:</span>
                  {activeDetail.presets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAmount(preset.amount)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        amount === preset.amount
                          ? "bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Converted Summary */}
              <div className="p-6 sm:p-7 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div>
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">
                    Estimated Payable in INR
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-900 font-mono mt-1.5">
                    ₹{inrEquivalent.toLocaleString("en-IN")}
                  </div>
                  <span className="text-xs sm:text-sm text-emerald-800 font-semibold block mt-1.5 leading-relaxed">
                    ✓ Saves ≈ ₹{estimatedBankMarkup.toLocaleString("en-IN")} vs retail banks
                  </span>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className="text-xs text-slate-600 block font-mono font-medium">1 {currency} = ₹{currentRate.toFixed(2)}</span>
                  <span className="inline-block mt-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-800">
                    Live Interbank Rate
                  </span>
                </div>
              </div>

              {/* Rate Lock Form */}
              {lockSuccessMessage ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs sm:text-sm space-y-2">
                  <div className="font-bold flex items-center gap-2 text-emerald-900 text-base">
                    <span>✓</span> {lockSuccessMessage}
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                    Our student forex desk will contact you within 15 minutes to facilitate your {activeDetail.title} with zero bank spread.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleLockRate} className="space-y-5 pt-2">
                  {lockErrorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>{lockErrorMessage}</span>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Student / Sponsor Name</label>
                      <input 
                        type="text"
                        required
                        value={lockName}
                        onChange={(e) => setLockName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Phone Number</label>
                      <input 
                        type="tel"
                        required
                        value={lockPhone}
                        onChange={(e) => setLockPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-50 text-white font-semibold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isSubmitting ? "Locking Rate..." : `${activeDetail.buttonLabel} (1 ${currency} = ₹${currentRate.toFixed(2)})`}</span>
                    <span>→</span>
                  </button>
                </form>
              )}

              {/* Secondary Guidance Link */}
              <div className="text-center pt-2">
                <button 
                  type="button"
                  className="text-xs sm:text-sm text-slate-500 hover:text-emerald-700 transition-colors underline-offset-4 hover:underline cursor-pointer leading-relaxed"
                  onClick={() => onOpenConsultModal && onOpenConsultModal(`Student Forex Assistance: ${activeDetail.title} (${currency} ${amount.toLocaleString()})`)}
                >
                  Need assistance with German Blocked Account or Canada GIC setup? Book free advisory session →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

