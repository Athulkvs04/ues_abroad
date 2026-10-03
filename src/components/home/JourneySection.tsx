"use client";

import React from "react";

export function JourneySection() {
  return (
    <section id="journey-section" className="journey-wrap">
      <div className="container">
        <div className="section-header">
          <h2>Our Student Journey</h2>
          <p>A step-by-step roadmap showing how we guide you from dreaming to arriving at campus.</p>
        </div>

        <div className="journey-timeline-track">
          <div className="journey-step-item">
            <div className="step-icon">💭</div>
            <div className="step-card glass-card">
              <h3>1. The Dream</h3>
              <p>Evaluate your profile, select ideal courses, and identify career ambitions abroad.</p>
            </div>
          </div>
          <div className="journey-step-item">
            <div className="step-icon">🤝</div>
            <div className="step-card glass-card">
              <h3>2. Counselling</h3>
              <p>Complete documentation assessment and finalize target university shortlists with your mentor.</p>
            </div>
          </div>
          <div className="journey-step-item">
            <div className="step-icon">🎓</div>
            <div className="step-card glass-card">
              <h3>3. University Prep</h3>
              <p>Fine-tune Statement of Purpose drafts, source LORs, and build a strong application portfolio.</p>
            </div>
          </div>
          <div className="journey-step-item">
            <div className="step-icon">✉️</div>
            <div className="step-card glass-card">
              <h3>4. Application</h3>
              <p>Submit applications directly to partner universities with fee waiver codes and tracked deadlines.</p>
            </div>
          </div>
          <div className="journey-step-item">
            <div className="step-icon">📄</div>
            <div className="step-card glass-card">
              <h3>5. Offer Letter</h3>
              <p>Receive conditional or unconditional letters and process tuition deposit transactions securely.</p>
            </div>
          </div>
          <div className="journey-step-item">
            <div className="step-icon">🛂</div>
            <div className="step-card glass-card">
              <h3>6. Visa Process</h3>
              <p>Attend mock embassy interview drills, prepare financial bank files, and submit visa applications.</p>
            </div>
          </div>
          <div className="journey-step-item">
            <div className="step-icon">🧳</div>
            <div className="step-card glass-card">
              <h3>7. Pre-Departure</h3>
              <p>Attend our orientation session: packing checklist, forex card setup, international SIM, abroad bank account opening, travel insurance activation, and emergency contact sheet.</p>
            </div>
          </div>
          <div className="journey-step-item">
            <div className="step-icon">✈️</div>
            <div className="step-card glass-card">
              <h3>8. Arrival & Beyond</h3>
              <p>Airport pickup coordination, on-campus registration, first-week orientation, and ongoing alumni community support.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
