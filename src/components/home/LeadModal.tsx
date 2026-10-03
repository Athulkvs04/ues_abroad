"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, GraduationCap, Home, DollarSign, FileCheck, X } from "lucide-react";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

export function LeadModal({ isOpen, onClose, source }: LeadModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [service, setService] = useState("admissions");
  const [country, setCountry] = useState("usa");
  const [intake, setIntake] = useState("Fall / Sept");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formError, setFormError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!name || !email || !phone) {
      setFormError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          source: source || "START_MY_JOURNEY",
          targetCountry: country.toUpperCase(),
          targetDegree: service === "admissions" ? "Master's" : service,
          metadata: { service, intake, source },
        }),
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setStep(1);
        setName("");
        setEmail("");
        setPhone("");
        setFormError(null);
        onClose();
      }, 2500);
    } catch (err) {
      console.error("Failed to submit lead to database:", err);
      setFormError("Form submission error. Please try again or reach out on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setSuccess(false);
    onClose();
  };

  const services = [
    { id: "admissions", label: "University Admissions", desc: "Shortlisting, SOPs & University Applications", icon: GraduationCap },
    { id: "housing", label: "Student Accommodation", desc: "Verified Student Dorms & Shared Apartments", icon: Home },
    { id: "forex", label: "Forex & Wire Transfers", desc: "Zero-markup University Tuition & GIC Wires", icon: DollarSign },
    { id: "visa", label: "Visa & Financial File", desc: "Embassy File Preparation & Mock Interviews", icon: FileCheck },
  ];

  return (
    <div className="modal-overlay active fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] overflow-y-auto p-3 sm:p-6 flex items-start justify-center">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl sm:max-w-3xl w-full relative overflow-hidden text-slate-800 my-4 sm:my-8">
        <button 
          onClick={resetAndClose} 
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors font-bold z-10 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>
        
        {/* Header Bar - Clean Light Luxury Styling */}
        <div className="bg-slate-50 border-b border-slate-200/90 px-6 py-6 sm:px-10 sm:py-8 pr-14 sm:pr-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100/70 border border-emerald-200 whitespace-nowrap text-[11px] sm:text-xs">
              ✨ 1-on-1 Advisory
            </span>
            <span>•</span>
            <span className="text-slate-500 font-medium">Step {step} of 2</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
            {source ? source : "Start Your Global Study Journey"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed max-w-xl">
            Connect with senior international counsellors for personalized guidance across universities, visas, accommodations, and forex.
          </p>
        </div>

        {success ? (
          <div className="text-center p-8 sm:p-16 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Inquiry Saved Live to Database!</h3>
            <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Your profile has been routed to our senior regional specialist for <strong>{country.toUpperCase()}</strong>. We will reach out via WhatsApp within 15 minutes.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Recorded in Neon PostgreSQL • 100% Confidential</span>
            </div>
          </div>
        ) : step === 1 ? (
          /* STEP 1: DISCOVERY & PREFERENCES */
          <form onSubmit={handleNextStep} className="p-5 sm:p-10 space-y-6 sm:space-y-8">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                1. What is your primary study objective?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {services.map((item) => {
                  const Icon = item.icon;
                  const isSelected = service === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setService(item.id)}
                      className={`p-3.5 sm:p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-3 sm:gap-3.5 ${
                        isSelected 
                          ? "border-emerald-600 bg-emerald-50/50 shadow-sm ring-1 ring-emerald-600/20" 
                          : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50"
                      }`}
                    >
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"
                      }`}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900">{item.label}</div>
                        <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 leading-relaxed">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  2. Preferred Destination
                </label>
                <select 
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 bg-slate-50/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="usa">🇺🇸 United States</option>
                  <option value="uk">🇬🇧 United Kingdom</option>
                  <option value="germany">🇩🇪 Germany</option>
                  <option value="canada">🇨🇦 Canada</option>
                  <option value="australia">🇦🇺 Australia</option>
                  <option value="ireland">🇮🇪 Ireland</option>
                  <option value="france">🇫🇷 France</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  3. Target Intake Session
                </label>
                <select 
                  value={intake}
                  onChange={(e) => setIntake(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 bg-slate-50/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Fall 2026">Fall 2026 (Aug / Sept)</option>
                  <option value="Spring 2027">Spring 2027 (Jan / Feb)</option>
                  <option value="Fall 2027">Fall 2027</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Continue to Contact Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* STEP 2: STUDENT CONTACT DETAILS */
          <form onSubmit={handleSubmit} className="p-5 sm:p-10 space-y-5 sm:space-y-6">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-center justify-between text-xs text-slate-700">
              <div>
                <span className="text-slate-500 block font-medium">Selected Guidance:</span>
                <strong className="text-emerald-900 font-bold text-sm">
                  {services.find((s) => s.id === service)?.label} • {country.toUpperCase()} ({intake})
                </strong>
              </div>
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline cursor-pointer"
              >
                Change
              </button>
            </div>

            {formError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                ⚠️ {formError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Full Student Name <span className="text-emerald-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Email Address <span className="text-emerald-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. aarav@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  WhatsApp / Phone Number <span className="text-emerald-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="pt-2 flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3.5 px-6 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-sm transition-all cursor-pointer"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {submitting ? (
                  <span>Recording Inquiry...</span>
                ) : (
                  <>
                    <span>Confirm &amp; Book Advisory Session</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
