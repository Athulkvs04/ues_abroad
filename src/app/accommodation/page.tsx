"use client";

import React, { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { LeadModal } from "@/components/home/LeadModal";

export default function AccommodationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState<string | undefined>(undefined);
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState("Germany");
  const [housingType, setHousingType] = useState("Shared Apartment (WG)");
  const [budget, setBudget] = useState("€500 - €700 / month");
  const [submitted, setSubmitted] = useState(false);

  const handleOpenModal = (source?: string) => {
    setModalSource(source);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          source: "HOUSING_ACCOMMODATION",
          targetCountry: destination,
          targetDegree: housingType,
          metadata: { budget, destination, housingType },
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit accommodation request:", err);
      alert("Error submitting request. Please try again.");
    }
  };

  return (
    <PublicLayout onOpenConsultModal={() => handleOpenModal("Accommodation Hidden Page")}>
      <div className="bg-slate-900 py-16 text-white border-b border-slate-800">
        <div className="container max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold mb-4">
            <span>🔒 UES Verified Exclusive Access</span>
            <span>•</span>
            <span>Direct Offline Allocation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            International Student <span className="text-primary-light">Accommodation Service</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-3xl leading-relaxed">
            Welcome to the UES Abroad private accommodation allocation portal. We partner with verified student dormitories, private landlords, and campus housing authorities across Europe, North America, and Australia to guarantee zero-brokerage, safe, and furnished student housing before your flight.
          </p>
        </div>
      </div>

      <div className="py-20 bg-slate-50">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">Why UES Verified Housing?</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">🛡️</span>
                    <h4 className="text-base font-bold text-slate-900">100% Scam Protection</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">International students lose thousands to fake rental listings abroad. Every UES property is physically inspected and contract-verified.</p>
                  </div>

                  <div className="space-y-2">
                    <span className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-lg">💰</span>
                    <h4 className="text-base font-bold text-slate-900">Zero Brokerage Fees</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">We negotiate directly with student housing providers (like The Student Hotel, Fintiba Housing, and Unite Students) to waive agency commissions.</p>
                  </div>

                  <div className="space-y-2">
                    <span className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold text-lg">📄</span>
                    <h4 className="text-base font-bold text-slate-900">Visa Proof Guarantee</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Receive official Wohnungsgeberbestätigung (Germany) or proof of accommodation letters required for visa stamping within 48 hours.</p>
                  </div>

                  <div className="space-y-2">
                    <span className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-lg">🤝</span>
                    <h4 className="text-base font-bold text-slate-900">Roommate Matching</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Connect with fellow UES Abroad students traveling to the same university or city to share multi-bedroom apartments.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-3xl text-white shadow-md">
                <h4 className="text-lg font-bold text-white mb-2">How Offline Allocation Works</h4>
                <div className="space-y-4 text-xs text-slate-300 mt-4">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0">1</span>
                    <div><strong>Submit Your Requirements:</strong> Fill out your destination city, campus proximity preference, and monthly budget in the confidential lead form.</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0">2</span>
                    <div><strong>Dedicated Counsellor Call:</strong> Our accommodation officer will contact you within 24 hours with 3-5 shortlisted, verified housing profiles.</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0">3</span>
                    <div><strong>Lease Signing &amp; Key Handover:</strong> We review your lease contract in English/German and coordinate key pickup upon your arrival at the airport.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Lead Capture Form Column */}
            <div className="lg:col-span-5">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-premium sticky top-24">
                <h3 className="text-xl font-bold text-slate-900">Request Housing Allocation</h3>
                <p className="text-xs text-slate-500 mt-1 mb-6">Confidential submission. Your request will be routed directly to UES Offline Housing Officers.</p>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                    <span className="text-4xl block">🎉</span>
                    <h4 className="text-lg font-bold text-emerald-900">Request Received!</h4>
                    <p className="text-xs text-emerald-700">
                      Thank you, <strong>{name}</strong>. An offline accommodation specialist will contact you at <strong>{phone}</strong> within 24 hours with verified housing profiles in <strong>{destination}</strong>.
                    </p>
                    <button 
                      className="mt-4 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                      onClick={() => setSubmitted(false)}
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                        placeholder="Student Full Name"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Phone / WhatsApp Number *</label>
                      <input 
                        type="tel" 
                        required 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                      <input 
                        type="email" 
                        required 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                        placeholder="student@example.com"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Study Destination</label>
                        <select 
                          value={destination} 
                          onChange={(e) => setDestination(e.target.value)}
                          className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
                        >
                          <option value="Germany">Germany</option>
                          <option value="UK">United Kingdom</option>
                          <option value="USA">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                          <option value="Ireland">Ireland</option>
                          <option value="France">France</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Housing Type</label>
                        <select 
                          value={housingType} 
                          onChange={(e) => setHousingType(e.target.value)}
                          className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
                        >
                          <option value="Shared Apartment (WG)">Shared Apartment (WG)</option>
                          <option value="Student Dormitory">Student Dormitory</option>
                          <option value="Private Studio">Private Studio</option>
                          <option value="Homestay">Homestay Family</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Monthly Rent Budget</label>
                      <select 
                        value={budget} 
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
                      >
                        <option value="€400 - €550 / month">Under €550 / $600 per month</option>
                        <option value="€550 - €750 / month">€550 - €750 / $600 - $850 per month</option>
                        <option value="€750 - €1,000 / month">€750 - €1,000 / $850 - $1,100 per month</option>
                        <option value="€1,000+ / month">€1,000+ / $1,100+ Premium Studio</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit"
                        className="w-full py-4 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                      >
                        <span>Start My Journey • Request Allocation</span>
                        <span>→</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400 text-center">Your data is secured under EU/Global GDPR compliance. We never share student details with third-party brokers.</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        source={modalSource} 
      />
    </PublicLayout>
  );
}
