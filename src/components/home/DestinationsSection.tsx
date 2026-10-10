"use client";

import React from "react";

interface DestinationsSectionProps {
  onOpenConsultModal?: (source?: string) => void;
}

const destinationsData = [
  { 
    id: "usa", 
    code: "USA",
    name: "United States", 
    tuition: "$20,000 - $52,000 / yr", 
    popular: "Public Health & Data Science",
    image: "/universities/columbia_morningside.webp" 
  },
  { 
    id: "canada", 
    code: "CANADA",
    name: "Canada", 
    tuition: "CAD $18,000 - $35,000 / yr", 
    popular: "Data Science & Management",
    image: "/universities/toronto_campus.webp" 
  },
  { 
    id: "germany", 
    code: "GERMANY",
    name: "Germany", 
    tuition: "€0 (Public Universities)", 
    popular: "Automotive, Robotics & AI",
    image: "/universities/tum_garching.webp" 
  },
  { 
    id: "uk", 
    code: "UK",
    name: "United Kingdom", 
    tuition: "£10,000 - £35,000 / yr", 
    popular: "Business Management & Medicine",
    image: "/universities/cambridge_kings_lawn.webp" 
  },
  { 
    id: "australia", 
    code: "AUSTRALIA",
    name: "Australia", 
    tuition: "AUD $20,000 - $60,000 / yr", 
    popular: "Engineering, Nursing & Tourism",
    image: "/universities/unsw_orientation.webp" 
  },
  { 
    id: "ireland", 
    code: "IRELAND",
    name: "Ireland", 
    tuition: "€10,000 - €30,000 / yr", 
    popular: "Finance, MedTech & Pharma",
    image: "/universities/trinity_chapel_steps.webp" 
  },
  { 
    id: "france", 
    code: "FRANCE",
    name: "France", 
    tuition: "€3,000 - €15,000 / yr", 
    popular: "Luxury Brand & Management",
    image: "/destinations/france.webp" 
  },
  { 
    id: "new_zealand", 
    code: "NEW ZEALAND",
    name: "New Zealand", 
    tuition: "NZD $22,000 - $38,000 / yr", 
    popular: "Agribusiness & IT Systems",
    image: "/destinations/new_zealand.webp" 
  },
  { 
    id: "uae", 
    code: "UAE",
    name: "UAE", 
    tuition: "AED 40,000 - 80,000 / yr", 
    popular: "Global Business & AI",
    image: "/destinations/uae.webp" 
  }
];

export function DestinationsSection({ onOpenConsultModal }: DestinationsSectionProps) {
  return (
    <section id="destinations-section" className="destinations-wrap py-20 bg-white border-b border-slate-200/60">
      <div className="container">
        <div className="section-header">
          <h2>Explore Popular <span className="accent-text">Study Destinations</span></h2>
          <p>Detailed insight into cost structures, visa protocols, and post-study opportunities.</p>
        </div>

        <div className="destinations-grid mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="destinations-grid-container">
          {destinationsData.map((dest) => (
            <div 
              key={dest.id} 
              className="group relative rounded-2xl overflow-hidden min-h-[400px] flex flex-col justify-between p-6 shadow-md hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Full background image */}
              <img 
                src={dest.image} 
                alt={dest.name} 
                loading="lazy" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0" 
              />
              
              {/* Dark Gradient Overlay matching Screenshot 3 */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-[1]" />
              
              {/* Top Left Badge */}
              <div className="relative z-[2] flex justify-start">
                <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider border border-white/20 shadow-sm">
                  {dest.code}
                </span>
              </div>

              {/* Bottom Content Area */}
              <div className="relative z-[2] flex flex-col justify-end">
                <h3 className="text-2xl font-heading font-bold text-white tracking-tight mb-2">
                  {dest.name}
                </h3>
                
                <div className="space-y-1 text-xs text-slate-200 mb-5 font-medium">
                  <div><strong className="text-white font-semibold">Tuition:</strong> {dest.tuition}</div>
                  <div><strong className="text-white font-semibold">Popular:</strong> {dest.popular}</div>
                </div>

                <button 
                  className="w-full py-2.5 px-4 rounded-xl bg-white text-slate-900 font-bold text-xs uppercase tracking-wider shadow-md hover:bg-slate-100 hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5"
                  onClick={() => onOpenConsultModal && onOpenConsultModal(`Start My Journey • Study in ${dest.name}`)}
                >
                  <span>Explore Guide</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
