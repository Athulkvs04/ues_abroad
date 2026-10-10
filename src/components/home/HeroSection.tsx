"use client";

import React from "react";
import Image from "next/image";

interface HeroSectionProps {
  onOpenConsultModal?: () => void;
}

export function HeroSection({ onOpenConsultModal }: HeroSectionProps) {
  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero-section" className="hero-wrap relative overflow-hidden bg-[#090b11] text-white py-20 border-b border-slate-800/80">
      {/* Backdrop Glowing Blobs */}
      <div className="glow-blob blob-1" />
      <div className="glow-blob blob-2" />

      <div className="container hero-grid-layout">
        <div className="hero-details">
          <div className="google-badge-inline !bg-slate-900/80 !border-slate-800 !text-slate-300">
            <span className="star-rating">★ ★ ★ ★ ★</span>
            <span><strong className="text-white">4.9/5</strong> Google Rating</span>
          </div>
          <h1 className="text-white">Your Global Education <br /><span className="accent-text">Journey Starts Here.</span></h1>
          <p className="text-slate-300">Expert guidance from counselling to campus. Unlock admissions into world-class global universities with end-to-end mentoring.</p>
          <div className="hero-button-row">
            <button className="btn-primary-glow" onClick={onOpenConsultModal}>Start My Journey</button>
            <button className="btn-secondary-glow !text-white !border-slate-700 hover:!bg-slate-800 hover:!border-slate-600" onClick={() => scrollToSection("destinations-section")}>Explore Destinations</button>
          </div>
        </div>

        {/* Interactive Right-side Hero Showcase */}
        <div className="hero-image-showcase">
          {/* Large Abstract Decorative Frame representing campus life */}
          <div className="showcase-frame relative overflow-hidden">
            <div className="abstract-mesh-grid" />
            <Image 
              src="/campus_quad_hero.webp" 
              alt="Students on global university campus" 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover absolute z-[2] rounded-[inherit]"
            />
          </div>

          {/* Floating Glass Cards (Micro interactions) */}
          <div className="floating-glass-card fc-1 card-tilt">
            <div className="card-glow-indicator green" />
            <div>
              <strong>Free 1-on-1 Profile Evaluation</strong>
              <span className="meta">Zero Service Charges • Certified Advisors</span>
            </div>
          </div>

          <div className="floating-glass-card fc-2 card-tilt">
            <div className="card-glow-indicator blue" />
            <div>
              <strong>Scholarships &amp; Fee Waivers</strong>
              <span className="meta">Direct University Grants Available</span>
            </div>
          </div>

          <div className="floating-glass-card fc-3 card-tilt">
            <div className="card-glow-indicator amber" />
            <div>
              <strong>End-to-End Visa Assistance</strong>
              <span className="meta">SOP Review &amp; Embassy Mock Interviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
