"use client";

import React from "react";
import {
  Lightbulb,
  Handshake,
  GraduationCap,
  Send,
  FileText,
  Shield,
  Luggage,
  Plane,
} from "lucide-react";

export function JourneySection() {
  const steps = [
    {
      icon: <Lightbulb className="w-5 h-5 text-primary" />,
      title: "1. The Dream",
      desc: "Evaluate your profile, select ideal courses, and identify career ambitions abroad.",
    },
    {
      icon: <Handshake className="w-5 h-5 text-primary" />,
      title: "2. Counselling",
      desc: "Complete documentation assessment and finalize target university shortlists with your mentor.",
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-primary" />,
      title: "3. University Prep",
      desc: "Fine-tune Statement of Purpose drafts, source LORs, and build a strong application portfolio.",
    },
    {
      icon: <Send className="w-5 h-5 text-primary" />,
      title: "4. Application",
      desc: "Submit applications directly to partner universities with fee waiver codes and tracked deadlines.",
    },
    {
      icon: <FileText className="w-5 h-5 text-primary" />,
      title: "5. Offer Letter",
      desc: "Receive conditional or unconditional letters and process tuition deposit transactions securely.",
    },
    {
      icon: <Shield className="w-5 h-5 text-primary" />,
      title: "6. Visa Process",
      desc: "Attend mock embassy interview drills, prepare financial bank files, and submit visa applications.",
    },
    {
      icon: <Luggage className="w-5 h-5 text-primary" />,
      title: "7. Pre-Departure",
      desc: "Orientation briefing: packing checklist, forex card setup, international SIM, and overseas travel insurance.",
    },
    {
      icon: <Plane className="w-5 h-5 text-primary" />,
      title: "8. Arrival & Beyond",
      desc: "Airport pickup coordination, on-campus registration, first-week orientation, and ongoing alumni community support.",
    },
  ];

  return (
    <section id="journey-section" className="journey-wrap py-20 bg-white border-b border-slate-200/60">
      <div className="container">
        <div className="section-header">
          <h2>Our Student Journey</h2>
          <p>A step-by-step roadmap showing how we guide you from dreaming to arriving at campus.</p>
        </div>

        <div className="journey-timeline-track">
          {steps.map((step, idx) => (
            <div key={idx} className="journey-step-item flex items-center gap-6 sm:gap-8 relative">
              <div className="step-icon shrink-0">
                {step.icon}
              </div>
              <div className="step-card bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 hover:bg-white hover:border-emerald-500/40 hover:shadow-md transition-all">
                <h3 className="text-slate-900 font-bold text-lg mb-1.5">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
