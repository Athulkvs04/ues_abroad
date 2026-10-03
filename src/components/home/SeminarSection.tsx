"use client";

import React, { useState, useEffect } from "react";

interface SeminarSectionProps {
  onOpenConsultModal?: (source?: string) => void;
}

const seminarsData = [
  { id: "s1", title: "Germany Tuition-Free Universities Masterclass", dateStr: "15th Oct 2026", timeStr: "06:00 PM IST", location: "Online Webinar", seats: 14, hoursLeft: 48, minsLeft: 30 },
  { id: "s2", title: "US Visa Interview Drills & Mock Question Prep", dateStr: "18th Oct 2026", timeStr: "07:30 PM IST", location: "Live Zoom", seats: 8, hoursLeft: 120, minsLeft: 15 },
  { id: "s3", title: "UK 2-Year Post-Study Work Visa (Graduate Route)", dateStr: "22nd Oct 2026", timeStr: "05:00 PM IST", location: "Online Webinar", seats: 22, hoursLeft: 216, minsLeft: 45 }
];

export function SeminarSection({ onOpenConsultModal }: SeminarSectionProps) {
  const [seminars] = useState(seminarsData);

  return (
    <section id="seminar-section" className="seminar-wrap py-20 bg-slate-50/80 border-b border-slate-200/70">
      <div className="container">
        <div className="section-header">
          <h2>Upcoming Masterclass Seminars</h2>
          <p>Register for live sessions led by senior academic counsellors and visa officers.</p>
        </div>

        <div className="seminars-cards-grid" id="seminar-cards-container">
          {seminars.map((sem) => (
            <div key={sem.id} className="upcoming-sem-card bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all h-full flex flex-col justify-between">
              <div>
                <span className="badge" style={{ background: "var(--accent-glow)", color: "var(--accent)" }}>{sem.location}</span>
                <h3 style={{ marginTop: "0.75rem" }}>{sem.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem", marginBottom: "1rem" }}>
                  Schedule: {sem.dateStr} at {sem.timeStr}
                </p>
                <div className="countdown-timer-badge" id={`sem-timer-${sem.id}`}>
                  Starts in: {sem.hoursLeft}h {sem.minsLeft}m
                </div>
              </div>
              <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}><strong style={{ color: "var(--success)" }}>{sem.seats} Seats Left</strong></span>
                <button 
                  className="btn-primary-glow" 
                  style={{ padding: "0.5rem 1rem", fontSize: "0.8rem", fontWeight: 700 }} 
                  onClick={() => onOpenConsultModal && onOpenConsultModal(`Start My Journey • Seminar (${sem.title})`)}
                >
                  Start My Journey
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
