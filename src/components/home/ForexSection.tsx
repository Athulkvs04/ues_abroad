"use client";

import React, { useState } from "react";

interface ForexSectionProps {
  onOpenConsultModal?: (source?: string) => void;
}

export function ForexSection({ onOpenConsultModal }: ForexSectionProps) {
  const [transferType, setTransferType] = useState<"send" | "receive" | "exchange">("send");
  const [amount, setAmount] = useState(10000);
  const [currency, setCurrency] = useState("EUR");

  const rateMap: Record<string, number> = { EUR: 90.5, USD: 83.8, GBP: 106.2, CAD: 61.4, AUD: 54.8 };
  const currentRate = rateMap[currency] || 85;
  const inrEquivalent = Math.ceil(amount * currentRate);

  return (
    <section id="forex-section" className="py-20 bg-white border-b border-slate-100">
      <div className="container">
        <div className="section-header">
          <h2>Student Forex &amp; <span className="accent-text">International Transfers</span></h2>
          <p>Powered in partnership with FairexPay API. Send university tuition, receive living stipends, and exchange currency at 24×7 live interbank rates with zero bank markup.</p>
        </div>

        <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Description Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
              <span>⚡ FairexPay API Partner Service</span>
              <span>•</span>
              <span>24×7 Available</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              Fast, Compliant &amp; Secure Global Student Money Transfers
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Whether you are paying semester tuition to German public universities, setting up a Canadian GIC, or transferring blocked accounts, our integrated FairexPay portal ensures lowest forex spreads and instant compliance certification.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-sm">✓</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">Zero Telegraphic Transfer (TT) Charges for UES Students</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-sm">✓</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">24×7 Instant Wire Transfers &amp; Fee Receipts</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-sm">✓</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">RBI &amp; FinCEN Compliant Digital A2 Form Processing</span>
              </div>
            </div>
          </div>

          {/* Right Calculator Card */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-8 text-white shadow-premium border border-slate-800">
            <div className="flex justify-between items-center pb-6 border-b border-slate-800 mb-6">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <span>💱</span> Live Forex Calculator
              </h4>
              <div className="flex rounded-xl bg-slate-800 p-1 text-xs font-bold">
                <button 
                  className={`px-3 py-1.5 rounded-lg transition-all ${transferType === "send" ? "bg-primary text-white shadow" : "text-slate-400 hover:text-white"}`}
                  onClick={() => setTransferType("send")}
                >
                  Send Money
                </button>
                <button 
                  className={`px-3 py-1.5 rounded-lg transition-all ${transferType === "receive" ? "bg-primary text-white shadow" : "text-slate-400 hover:text-white"}`}
                  onClick={() => setTransferType("receive")}
                >
                  Receive Money
                </button>
                <button 
                  className={`px-3 py-1.5 rounded-lg transition-all ${transferType === "exchange" ? "bg-primary text-white shadow" : "text-slate-400 hover:text-white"}`}
                  onClick={() => setTransferType("exchange")}
                >
                  Exchange
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Select Target Currency &amp; Purpose</label>
                <div className="grid grid-cols-2 gap-3">
                  <select 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="EUR">EUR (€) - Germany Blocked Account / Tuition</option>
                    <option value="USD">USD ($) - USA Tuition &amp; Living</option>
                    <option value="GBP">GBP (£) - UK CAS Maintenance &amp; Fees</option>
                    <option value="CAD">CAD ($) - Canada GIC &amp; Semester Fee</option>
                    <option value="AUD">AUD ($) - Australia CoE Deposit</option>
                  </select>
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary text-right"
                    placeholder="Amount"
                  />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Estimated Equivalent in Indian Rupees</span>
                  <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">₹{inrEquivalent.toLocaleString("en-IN")}</h3>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Live Interbank Rate</span>
                  <strong className="text-sm text-white font-mono">1 {currency} = ₹{currentRate}</strong>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  className="w-full py-4 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                  onClick={() => onOpenConsultModal && onOpenConsultModal(`Start My Journey • Forex Transfer (${currency} ${amount})`)}
                >
                  <span>Start My Journey • Initiate Transfer</span>
                  <span>→</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500 text-center">No login required to calculate rates. Official KYC &amp; wire transfer completed via secure FairexPay gateway.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
