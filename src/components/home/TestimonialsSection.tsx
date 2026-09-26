"use client";

import React, { useState } from "react";

const testimonialsData = [
  { name: "Rohit Deshmukh", university: "Technical University of Munich", course: "MS in Robotics", country: "Germany", rating: "5/5", quote: "UES Abroad made my German public university dream come true. Zero tuition fees, and they coached me for the APS certificate and visa interview from day one." },
  { name: "Meera Nair", university: "Boston University", course: "MS in Data Science", country: "USA", rating: "5/5", quote: "The application fee waivers saved me over $500, and my mentor guided my SOP drafting so perfectly that I got accepted into my first choice." },
  { name: "Karan Johar", university: "University of Melbourne", course: "Master of Business Analytics", country: "Australia", rating: "5/5", quote: "The side-by-side comparison matrices helped me choose Australia over UK based on post-study work rights. Exceptional service." }
];

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  const slide = (dir: number) => {
    let nextIndex = index + dir;
    if (nextIndex < 0) nextIndex = testimonialsData.length - 1;
    if (nextIndex >= testimonialsData.length) nextIndex = 0;
    setIndex(nextIndex);
  };

  return (
    <section id="testimonials-section" className="testimonials-wrap">
      <div className="container">
        <div className="section-header">
          <h2>Student Success Stories</h2>
          <p>Hear from real students placed into world-renowned universities.</p>
        </div>

        <div className="testimonial-carousel-container">
          <div 
            className="testimonial-track" 
            id="testimonial-track-element"
            style={{ transform: `translateX(-${index * 100}%)`, transition: "transform 0.5s ease-in-out", display: "flex", width: "100%" }}
          >
            {testimonialsData.map((t) => (
              <div key={t.name} className="testimonial-slide" style={{ minWidth: "100%", flexShrink: 0 }}>
                <p className="testimonial-text">&ldquo;{t.quote}&rdquo;</p>
                <div className="testimonial-author-meta">
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--primary-glow)", border: "1.5px solid var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <h4>{t.name}</h4>
                    <span>Placed in: {t.university} ({t.country}) | {t.course}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-nav-arrows">
            <button className="carousel-arrow prev" onClick={() => slide(-1)}>‹</button>
            <button className="carousel-arrow next" onClick={() => slide(1)}>›</button>
          </div>
        </div>
      </div>
    </section>
  );
}
