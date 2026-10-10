"use client";

import React from "react";

const stats = [
  { value: "10,000+", label: "Students Placed" },
  { value: "15+", label: "Years of Experience" },
  { value: "100+", label: "Global University Tie-Ups" },
  { value: "98%", label: "Visa Success Rate" },
];

export function TrustSection() {
  return (
    <section id="trust-section" className="trust-container bg-slate-50/70 border-y border-slate-200/60">
      <div className="container">
        <div className="trust-counters-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-box">
              <h2 className="counter">{s.value}</h2>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Infinite Rolling Marquee of University Partners */}
        <div className="partner-marquee-container">
          <div className="marquee-track">
            <span className="marquee-item">University of Hertfordshire (UK)</span>
            <span className="marquee-item">University of Newcastle (Australia)</span>
            <span className="marquee-item">University of Queensland (Australia)</span>
            <span className="marquee-item">UNSW Sydney (Australia)</span>
            <span className="marquee-item">University of Galway (Ireland)</span>
            <span className="marquee-item">Dublin City University (Ireland)</span>
            <span className="marquee-item">Coventry University (UK)</span>
            <span className="marquee-item">Northumbria University (UK)</span>
            <span className="marquee-item">Birmingham City University (UK)</span>
            <span className="marquee-item">Berlin School of Business &amp; Innovation</span>
            <span className="marquee-item">Deakin University (Australia)</span>
            <span className="marquee-item">University of Hertfordshire (UK)</span>
            <span className="marquee-item">University of Newcastle (Australia)</span>
            <span className="marquee-item">University of Queensland (Australia)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
