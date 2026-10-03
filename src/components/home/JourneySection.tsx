"use client";

import React from "react";

export function JourneySection() {
  return (
    <section id="journey-section" className="journey-wrap py-20 bg-white border-b border-slate-200/60">
      <div className="container">
        <div className="section-header">
          <h2>Our Student Journey</h2>
          <p>A step-by-step roadmap showing how we guide you from dreaming to arriving at campus.</p>
        </div>

        <div className="journey-timeline-track">
          <div className="journey-step-item">
            <div className="step-icon">💭</div>
            <div className="step-card bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 hover:bg-white hover:border-emerald-500/40 hover:shadow-md transition-all">
              <h3 className="text-slate-900 font-bold text-lg mb-1.5">1. The Dream</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Evaluate your profile, select ideal courses, and identify career ambitions abroad.</p>
            </div>
          </div>
          <div className="journey-step-item">
            <div className="step-icon">🤝</div>
            <div className="step-card bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 hover:bg-white hover:border-emerald-500/40 hover:shadow-md transition-all">
              <h3 className="text-slate-900 font-bold text-lg mb-1.5">2. Counselling</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Complete documentation assessment and finalize target university shortlists with your mentor.</p>
            </div>
          </div>
          <div className="journey-step-item">
            <div className="step-icon">🎓</div>
            <div className="step-card bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 hover:bg-white hover:border-emerald-500/40 hover:shadow-md transition-all">
              <h3 className="text-slate-900 font-bold text-lg mb-1.5">3. University Prep</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Fine-tune Statement of Purpose drafts, source LORs, and build a strong application portfolio.</p>
            </div>
          </div>
          <div className="journey-step-item">
            <div className="step-icon">✉️</div>
            <div className="step-card bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 hover:bg-white hover:border-emerald-500/40 hover:shadow-md transition-all">
              <h3 className="text-slate-900 font-bold text-lg mb-1.5">4. Application</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Submit applications directly to partner universities with fee waiver codes and tracked deadlines.</p>
            </div>
          </div>
          <div className="journey-step-item">
            <div className="step-icon">📄</div>
            <div className="step-card bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 hover:bg-white hover:border-emerald-500/40 hover:shadow-md transition-all">
              <h3 className="text-slate-900 font-bold text-lg mb-1.5">5. Offer Letter</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Receive conditional or unconditional letters and process tuition deposit transactions securely.</p>
            </div>
          </div>
          <div className="journey-step-item">
            <div className="step-icon">🛂</div>
            <div className="step-card bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 hover:bg-white hover:border-emerald-500/40 hover:shadow-md transition-all">
              <h3 className="text-slate-900 font-bold text-lg mb-1.5">6. Visa Process</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Attend mock embassy interview drills, prepare financial bank files, and submit visa applications.</p>
            </div>
          </div>
          <div className="journey-step-item">
            <div className="step-icon">🧳</div>
            <div className="step-card bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 hover:bg-white hover:border-emerald-500/40 hover:shadow-md transition-all">
              <h3 className="text-slate-900 font-bold text-lg mb-1.5">7. Pre-Departure</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Attend our orientation session: packing checklist, forex card setup, international SIM, abroad bank account opening, travel insurance activation, and emergency contact sheet.</p>
            </div>
          </div>
          <div className="journey-step-item">
            <div className="step-icon">✈️</div>
            <div className="step-card bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 hover:bg-white hover:border-emerald-500/40 hover:shadow-md transition-all">
              <h3 className="text-slate-900 font-bold text-lg mb-1.5">8. Arrival &amp; Beyond</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Airport pickup coordination, on-campus registration, first-week orientation, and ongoing alumni community support.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
