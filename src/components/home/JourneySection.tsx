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
              <p>Evaluate your profile, select ideal courses, and identify career ambitions.</p>
            </div>
          </div>
          <div className="journey-step-item">
            <div className="step-icon">🤝</div>
            <div className="step-card glass-card">
              <h3>2. Counselling</h3>
              <p>Complete documentation assessment and finalize target university shortlists.</p>
            </div>
          </div>
          <div className="journey-step-item">
            <div className="step-icon">🎓</div>
            <div className="step-card glass-card">
              <h3>3. University Prep</h3>
              <p>Fine-tune Statement of Purpose (SOP) drafts and source reference credentials.</p>
            </div>
          </div>
          <div className="journey-step-item">
            <div className="step-icon">✉️</div>
            <div className="step-card glass-card">
              <h3>4. Application</h3>
              <p>Submit application forms directly to partner universities with waiver codes.</p>
            </div>
          </div>
          <div className="journey-step-item">
            <div className="step-icon">📄</div>
            <div className="step-card glass-card">
              <h3>5. Offer Letter</h3>
              <p>Receive conditional or unconditional letters and process deposit transactions.</p>
            </div>
          </div>
          <div className="journey-step-item">
            <div className="step-icon">🛂</div>
            <div className="step-card glass-card">
              <h3>6. Visa Process</h3>
              <p>Attend mock interview drills and prepare financial bank files.</p>
            </div>
          </div>
          <div className="journey-step-item">
            <div className="step-icon">✈️</div>
            <div className="step-card glass-card">
              <h3>7. Fly Abroad</h3>
              <p>Arrange shared flats, book flight tickets, and attend pre-departure orientations.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
