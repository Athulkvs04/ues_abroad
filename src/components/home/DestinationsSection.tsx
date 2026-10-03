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
    tuition: "$25,000 - $55,000 / yr", 
    popular: "Computer Science & AI",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "canada", 
    code: "CANADA",
    name: "Canada", 
    tuition: "CAD $18,000 - $35,000 / yr", 
    popular: "Business Analytics",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "germany", 
    code: "GERMANY",
    name: "Germany", 
    tuition: "€0 (Public Universities)", 
    popular: "Automotive & Robotics",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "uk", 
    code: "UK",
    name: "United Kingdom", 
    tuition: "£14,000 - £26,000 / yr", 
    popular: "FinTech & AI",
    image: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "australia", 
    code: "AUSTRALIA",
    name: "Australia", 
    tuition: "AUD $25,000 - $45,000 / yr", 
    popular: "Cybersecurity & Nursing",
    image: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "ireland", 
    code: "IRELAND",
    name: "Ireland", 
    tuition: "€10,000 - €22,000 / yr", 
    popular: "Software Dev & Pharma",
    image: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "france", 
    code: "FRANCE",
    name: "France", 
    tuition: "€3,000 - €15,000 / yr", 
    popular: "Luxury Brand & Management",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "new_zealand", 
    code: "NEW ZEALAND",
    name: "New Zealand", 
    tuition: "NZD $22,000 - $38,000 / yr", 
    popular: "Agribusiness & IT Systems",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "uae", 
    code: "UAE",
    name: "UAE", 
    tuition: "AED 40,000 - 80,000 / yr", 
    popular: "Global Business & AI",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80" 
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

        <div className="destinations-grid mt-12" id="destinations-grid-container">
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
