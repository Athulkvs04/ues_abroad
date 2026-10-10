"use client";

import React, { useState } from "react";

function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < n ? "#f59e0b" : "#e2e8f0"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewAvatar({ name, src }: { name: string; src?: string }) {
  const [imgError, setImgError] = useState(false);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setImgError(true)}
        className="w-11 h-11 rounded-full object-cover border-2 border-slate-200 shadow-xs shrink-0"
        loading="lazy"
      />
    );
  }

  return (
    <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border-2 border-emerald-200 shrink-0">
      {initials}
    </div>
  );
}

const googleReviewsData = [
  {
    id: 1,
    name: "Yusuf Khan",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUK4laY8R07FN78ua3I8LOcWpz9OrY1uhywgctpKVZ4KxRFm4kWzg=s100",
    branch: "Palakkad HQ",
    destination: "UK Higher Education",
    rating: 5,
    quote: "Choosing UES Abroad was one of the best decisions I've made. Their professionalism and dedication to student success were evident from the start. I appreciated how they took the time to understand my interests and academic needs, ensuring that I found the right program and university."
  },
  {
    id: 2,
    name: "Shiyas S",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjXJmYOjnGoJ1vMiRLNzFzUY-Imw6jb7DWBiRfUY5dSNhhEoisQ=s100",
    branch: "Palakkad Branch",
    destination: "Europe & UK Admits",
    rating: 5,
    quote: "I am delighted with the services provided by UES ABROAD Palakkad. Nihal and Anoob are exceptional consultants who provided me with personalized guidance and assistance. From helping me choose the right course to handling the visa process, they made my dream of studying abroad a reality."
  },
  {
    id: 3,
    name: "Razeen Mohd",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUOiRL5TmOOAG_Q6bR_JXuxndOJ7FE_4raSw8AsoGe135vNJkoZGA=s100",
    branch: "Palakkad Branch",
    destination: "University Admissions",
    rating: 5,
    quote: "I highly recommend UES ABROAD Palakkad to all students in the area. Nihal and Anoob are knowledgeable consultants who guided me through every step of the study abroad process. From selecting the right university to visa assistance, their personalized attention made me feel confident and supported."
  },
  {
    id: 4,
    name: "Ashik Syed",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVZgFCDTCW8-iZwcLRRWD-N6aB0f0iY-mCTfxQuJa3Xar1ZrdT_=s100",
    branch: "Palakkad Branch",
    destination: "Overseas Study Program",
    rating: 5,
    quote: "Nihal and Anoob from UES ABROAD are true professionals who provided me with exceptional guidance throughout my study abroad journey. From university selection to visa processing, their support was invaluable. I am grateful for their personalized attention and expertise."
  },
  {
    id: 5,
    name: "Mohammed Sinan",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVlFjtUBhxQSDkjo3_vSsNC4R-kkMxzOCpsrjiun6ytRizHV2I=s100",
    branch: "Kerala Regional",
    destination: "Top University Admit",
    rating: 5,
    quote: "Nihal and Anoob from UES ABROAD are the best consultants I have ever come across. Their personalized guidance and attention to detail were instrumental in securing my admission to a top university. They provided me with comprehensive support and made the entire process hassle-free."
  },
  {
    id: 6,
    name: "Abdul Sameeh S",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWURDSzC3-dhu0ICvOZBpadfhBO2I9kkYPgfgiVaAaXYSmLa4S-dA=s100",
    branch: "Palakkad to UK",
    destination: "Master's Degree, UK",
    rating: 5,
    quote: "I got the opportunity to move to UK to continue with my higher studies. When I had the idea of studying abroad, from the very first meeting itself, I was confident and comfortable working with UES Abroad. They were helpful and contactable at any given time. Very informative and specialized in what they do. I highly recommend UES Abroad!"
  },
  {
    id: 7,
    name: "Anandhu Krishna",
    branch: "Calicut Branch",
    destination: "Ireland University & Visa",
    rating: 5,
    quote: "Best study abroad agency in Calicut. Helped me through every step of my Ireland visa processing and university admission without any confusion. From document verification to mock visa interviews, everything was handled professionally. Highly recommended to anyone planning overseas studies!"
  },
  {
    id: 8,
    name: "Fathima Hiba",
    branch: "Palakkad Branch",
    destination: "Univ. of Hertfordshire, UK",
    rating: 5,
    quote: "The team at UES Abroad is genuinely committed to their students. They helped me get admission into University of Hertfordshire with scholarship guidance and visa documentation handled smoothly. Nihal sir and the counselors were available whenever I had questions."
  }
];

export function TestimonialsSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="testimonials-section" className="py-24 bg-slate-50/70 border-b border-slate-200/80">
      <div className="container">
        {/* Header with Google Badge */}
        <div className="section-header max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs mb-4">
            <GoogleIcon className="w-4 h-4" />
            <span className="text-xs font-bold text-slate-700">Google Verified Reviews</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-xs font-extrabold text-amber-500">4.9 ★★★★★</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Real Reviews from <span className="text-emerald-700">Real Students</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            Read authentic reviews from students who trusted UES Abroad for their university applications, visa endorsements, and pre-departure support.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {googleReviewsData.map((r) => {
            const isExpanded = expanded === r.id;
            const isLong = r.quote.length > 130;
            const display = isExpanded ? r.quote : r.quote.slice(0, 130) + (isLong ? "…" : "");

            return (
              <div
                key={r.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Stars + Google Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <Stars n={r.rating} />
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      <GoogleIcon className="w-3 h-3" />
                      <span>Review</span>
                    </div>
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    &ldquo;{display}&rdquo;
                    {isLong && (
                      <button
                        onClick={() => setExpanded(isExpanded ? null : r.id)}
                        className="ml-1 text-emerald-700 font-bold text-xs hover:underline inline-block"
                      >
                        {isExpanded ? "read less" : "read more"}
                      </button>
                    )}
                  </blockquote>
                </div>

                {/* Reviewer Details */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-2">
                  <ReviewAvatar name={r.name} src={r.avatar} />
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 text-sm truncate flex items-center gap-1.5">
                      <span>{r.name}</span>
                      <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate font-medium">{r.branch}</div>
                    <span className="inline-block mt-0.5 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      {r.destination}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* High Trust Proof Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-600 bg-white py-4 px-6 rounded-2xl border border-slate-200/80 shadow-xs max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <GoogleIcon className="w-5 h-5" />
            <span className="font-extrabold text-slate-900">4.9 / 5.0</span>
            <span className="text-slate-500">(240+ Google Reviews)</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-slate-200" />
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>Palakkad HQ &amp; Regional Branches</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-slate-200" />
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>100% Free Transparent Counseling</span>
          </div>
        </div>
      </div>
    </section>
  );
}
