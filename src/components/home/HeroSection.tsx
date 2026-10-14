"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

interface HeroSectionProps {
  onOpenConsultModal?: () => void;
}

export function HeroSection({ onOpenConsultModal }: HeroSectionProps) {
  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero-section" className="hero-wrap relative overflow-hidden bg-[#090b11] text-white py-20 lg:py-24 border-b border-slate-800/80">
      {/* Full-bleed Real High-Resolution Historic University Campus Landscape */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <Image 
          src="/universities/trinity_parliament_hero.webp" 
          alt="Historic World-Class Collegiate Campus Architecture" 
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] lg:object-[center_32%]"
        />
        {/* Smooth seamless asymmetrical scrim: 100% WCAG contrast on left text while campus shines on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090b11]/95 via-[#090b11]/80 via-48% to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090b11]/90 via-transparent to-black/35 pointer-events-none" />
      </div>

      <div className="container hero-grid-layout relative z-10">
        {/* Left Side: Headlines, Value Prop & CTAs directly on canvas */}
        <div className="hero-details">
          <div className="google-badge-inline !bg-slate-900/80 !border-slate-800 !text-slate-300">
            <span className="flex items-center gap-0.5 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </span>
            <span><strong className="text-white">4.9/5</strong> Google Rating</span>
          </div>
          <h1 className="text-white">
            Your Global Education <br />
            <span className="accent-text">Journey Starts Here.</span>
          </h1>
          <p className="!text-white max-w-xl text-base sm:text-lg leading-relaxed">
            Expert guidance from counselling to campus. Unlock admissions into world-class global universities with end-to-end mentoring.
          </p>
          <div className="hero-button-row">
            <button className="btn-primary-glow" onClick={onOpenConsultModal}>
              Start My Journey
            </button>
            <button 
              className="btn-secondary-glow !text-white !border-slate-700 hover:!bg-slate-800 hover:!border-slate-600" 
              onClick={() => scrollToSection("destinations-section")}
            >
              Explore Destinations
            </button>
          </div>
        </div>

        {/* Right Side: Organic Floating Value Cards Over Campus Backdrop */}
        <div className="hero-image-showcase">
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

      {/* Subtle Campus Landmark Tag (Bottom Right) */}
      <div className="absolute bottom-3 right-6 hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/10 text-[11px] text-slate-300 pointer-events-none z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>Historic Collegiate Quad • Global University Partner</span>
      </div>
    </section>
  );
}
