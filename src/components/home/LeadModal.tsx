"use client";

import React, { useState } from "react";

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

  if (!isOpen) return null;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert("Please fill in all required fields.");
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
        onClose();
      }, 2500);
    } catch (err) {
      console.error("Failed to submit lead to database:", err);
      alert("Form submission error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setSuccess(false);
    onClose();
  };

  return (
    <div className="modal-overlay active flex items-center justify-center p-4 z-[9999]">
      <div className="modal-card bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full relative overflow-hidden text-slate-800">
        <button 
          onClick={resetAndClose} 
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors font-bold z-10"
          aria-label="Close modal"
        >
          ✕
        </button>
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-primary to-slate-900 p-6 text-white">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent mb-1">
            <span>✨ Progressive Onboarding</span>
            <span>•</span>
            <span>Step {step} of 2</span>
          </div>
          <h3 className="text-2xl font-heading font-extrabold text-white">
            {source ? source : "Start My Journey"}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Get personalized mentoring across admissions, accommodation, forex, and visas.
          </p>
        </div>

        {success ? (
          <div className="text-center p-10 space-y-4">
            <div className="text-6xl animate-bounce">🎉</div>
            <h3 className="text-2xl font-bold text-emerald-600">Inquiry Saved Live to Database!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Your profile has been routed to our senior regional director for <strong>{country.toUpperCase()} ({service.toUpperCase()})</strong>. We will reach out within 15 minutes.
            </p>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-800 font-semibold">
              ✓ Recorded in Neon PostgreSQL • 100% Confidential
            </div>
          </div>
        ) : step === 1 ? (
          /* STEP 1: DISCOVERY & PREFERENCES */
          <form onSubmit={handleNextStep} className="p-6 space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">1. What is your primary focus today?</label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: "admissions", label: "🎓 University Admissions", desc: "Shortlisting & SOPs" },
                  { id: "housing", label: "🏠 Student Accommodation", desc: "Dorms & Shared Flats" },
                  { id: "forex", label: "💱 Forex & Money Transfer", desc: "Tuition & GIC Wire" },
                  { id: "visa", label: "📄 Visa & Financial File", desc: "Mock Interview Drills" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setService(item.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      service === item.id 
                        ? "border-primary bg-primary/5 shadow-sm ring-2 ring-primary/20" 
                        : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{item.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">2. Target Destination</label>
                <select 
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:outline-none focus:border-primary"
                >
                  <option value="usa">🇺🇸 United States</option>
                  <option value="uk">🇬🇧 United Kingdom</option>
                  <option value="germany">🇩🇪 Germany</option>
                  <option value="canada">🇨🇦 Canada</option>
                  <option value="australia">🇦🇺 Australia</option>
                  <option value="ireland">🇮🇪 Ireland</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">3. Target Intake</label>
                <select 
                  value={intake}
                  onChange={(e) => setIntake(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:outline-none focus:border-primary"
                >
                  <option value="Fall 2026">Fall 2026 (Aug/Sept)</option>
                  <option value="Spring 2027">Spring 2027 (Jan/Feb)</option>
                  <option value="Fall 2027">Fall 2027</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold text-sm transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              <span>Continue to Contact Details</span>
              <span>→</span>
            </button>
          </form>
        ) : (
          /* STEP 2: STUDENT CONTACT DETAILS */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Full Student Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Aarav Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="e.g. aarav@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">WhatsApp / Phone Number *</label>
              <input
                type="text"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="w-2/3 py-3 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold text-xs transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span>Recording Inquiry...</span>
                ) : (
                  <>
                    <span>Confirm &amp; Record Inquiry</span>
                    <span>✓</span>
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
