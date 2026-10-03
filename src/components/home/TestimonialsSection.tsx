"use client";

import React, { useState } from "react";

// Avatar grid positions in the sprite sheet (4 cols × 2 rows)
// Sprite: 1200×800px — each cell: 300×400px
const DISPLAY = 52;
const SCALE = DISPLAY / 300;

function AvatarSprite({ col, row, name }: { col: number; row: number; name: string }) {
  return (
    <div style={{ width: DISPLAY, height: DISPLAY, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2.5px solid #e2e8f0" }}>
      <div
        style={{
          width: 1200 * SCALE,
          height: 800 * SCALE,
          backgroundImage: "url(/student_avatars.jpg)",
          backgroundSize: `${1200 * SCALE}px ${800 * SCALE}px`,
          backgroundPosition: `-${col * 300 * SCALE}px -${row * 400 * SCALE}px`,
          backgroundRepeat: "no-repeat",
        }}
        role="img"
        aria-label={`${name} photo`}
      />
    </div>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i < n ? "#f59e0b" : "#e2e8f0"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

const testimonialsData = [
  { id: 1, name: "Rohit Deshmukh", col: 0, row: 0, university: "Technical University of Munich", course: "MS in Robotics", country: "Germany", flag: "🇩🇪", year: "2024", rating: 5, quote: "UES Abroad made my German public university dream come true. Zero tuition fees, and they coached me for the APS certificate and visa interview from day one. The DAAD scholarship guidance alone saved me ₹12 lakhs." },
  { id: 2, name: "Priya Singh", col: 1, row: 0, university: "Imperial College London", course: "MSc Business Analytics & FinTech", country: "UK", flag: "🇬🇧", year: "2024", rating: 5, quote: "The application fee waivers saved me over $500, and my mentor guided my SOP so perfectly that I got into Imperial on the first attempt. The document checklist was incredibly thorough." },
  { id: 3, name: "Arjun Kapoor", col: 2, row: 0, university: "University of Toronto", course: "MBA – Rotman School", country: "Canada", flag: "🇨🇦", year: "2023", rating: 5, quote: "UES guided me through GIC setup, SDS stream, and PGWP eligibility in detail. The country comparison tool helped me choose Canada over USA and it was absolutely the right call." },
  { id: 4, name: "Meera Nair", col: 3, row: 0, university: "Boston University", course: "MS in Data Science", country: "USA", flag: "🇺🇸", year: "2023", rating: 5, quote: "From STEM OPT guidance to visa interview prep, every detail was covered. I got 3 admits and UES helped me negotiate a merit scholarship at BU. Forever grateful for this team." },
  { id: 5, name: "Karan Patel", col: 0, row: 1, university: "University of Melbourne", course: "Master of Cybersecurity", country: "Australia", flag: "🇦🇺", year: "2024", rating: 5, quote: "The 4-year post-study work visa for Australia was something I only learned about through UES. Their Forex service also gave the best INR to AUD rate for my CoE deposit — no hidden fees." },
  { id: 6, name: "Sneha Reddy", col: 1, row: 1, university: "Trinity College Dublin", course: "MSc Pharmaceutical Science", country: "Ireland", flag: "🇮🇪", year: "2023", rating: 5, quote: "Ireland was never on my radar. The comparison tool changed everything. UES found me a scholarship, sorted my accommodation in Dublin, and I landed a job here within 6 months of graduating." },
  { id: 7, name: "Aditya Rao", col: 2, row: 1, university: "RWTH Aachen University", course: "MSc Automotive Engineering", country: "Germany", flag: "🇩🇪", year: "2024", rating: 5, quote: "Free tuition at RWTH Aachen seemed too good to be true. UES walked me through every step — APS, blocked account, Anmeldung after arrival. The pre-departure briefing was extremely detailed." },
  { id: 8, name: "Divya Dutta", col: 3, row: 1, university: "University of British Columbia", course: "Master of Engineering Leadership", country: "Canada", flag: "🇨🇦", year: "2023", rating: 5, quote: "My counsellor knew every UBC department's application nuance. She reviewed 4 drafts of my SOP and I made it to UBC's MEL program — one of the most competitive in Canada." },
];

export function TestimonialsSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="testimonials-section" className="py-24 bg-slate-50/70 border-b border-slate-200/80">
      <div className="container">
        <div className="section-header">
          <h2>Student <span className="accent-text">Success Stories</span></h2>
          <p>Real students. Real admits. Hear from our alumni now studying at world-class universities.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonialsData.map((t) => {
            const isExpanded = expanded === t.id;
            const short = t.quote.length > 130;
            const display = isExpanded ? t.quote : t.quote.slice(0, 130) + (short ? "…" : "");
            return (
              <div key={t.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <Stars n={t.rating} />
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{t.flag} {t.year}</span>
                </div>
                <blockquote className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                  &ldquo;{display}&rdquo;
                  {short && (
                    <button onClick={() => setExpanded(isExpanded ? null : t.id)} className="ml-1 text-primary font-semibold text-xs hover:underline">
                      {isExpanded ? "less" : "more"}
                    </button>
                  )}
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <AvatarSprite col={t.col} row={t.row} name={t.name} />
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 text-sm truncate">{t.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{t.university}</div>
                    <span className="inline-block mt-0.5 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{t.course}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2"><span className="text-amber-400 font-bold text-lg">★ 4.9</span><span>Google Rating</span></div>
          <div className="hidden sm:block w-px h-5 bg-slate-200" />
          <span>15,000+ students placed globally</span>
          <div className="hidden sm:block w-px h-5 bg-slate-200" />
          <span>99% visa success rate</span>
        </div>
      </div>
    </section>
  );
}
