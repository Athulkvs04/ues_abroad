"use client";

import React, { useEffect, useState } from "react";

export function TrustSection() {
  const [placed, setPlaced] = useState(15000);
  const [destinations, setDestinations] = useState(45);
  const [partners, setPartners] = useState(320);
  const [rate, setRate] = useState(99);

  return (
    <section id="trust-section" className="trust-container">
      <div className="container">
        <div className="trust-counters-grid">
          <div className="stat-box">
            <h2 className="counter">{placed.toLocaleString("en-US")}+</h2>
            <span>Students Placed</span>
          </div>
          <div className="stat-box">
            <h2 className="counter">{destinations}+</h2>
            <span>Study Destinations</span>
          </div>
          <div className="stat-box">
            <h2 className="counter">{partners}+</h2>
            <span>Partner Universities</span>
          </div>
          <div className="stat-box">
            <h2 className="counter">{rate}%</h2>
            <span>Visa Success Rate</span>
          </div>
        </div>

        {/* Infinite Rolling Marquee of University Partners */}
        <div className="partner-marquee-container">
          <div className="marquee-track">
            <span className="marquee-item">Technical University of Munich</span>
            <span className="marquee-item">Boston University</span>
            <span className="marquee-item">University of Melbourne</span>
            <span className="marquee-item">University of Oxford</span>
            <span className="marquee-item">University of Toronto</span>
            <span className="marquee-item">Imperial College London</span>
            <span className="marquee-item">National University of Singapore</span>
            <span className="marquee-item">Technical University of Munich</span>
            <span className="marquee-item">Boston University</span>
            <span className="marquee-item">University of Melbourne</span>
          </div>
        </div>
      </div>
    </section>
  );
}
