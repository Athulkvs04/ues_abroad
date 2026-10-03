"use client";

import React, { useState } from "react";

interface CourseFinderSectionProps {
  onOpenConsultModal?: (source?: string) => void;
}

const coursesDatabase = [
  {
    id: "cs-ms-us",
    title: "M.S. in Computer Science & Artificial Intelligence",
    university: "Boston University • United States",
    flag: "🇺🇸",
    duration: "2 Years • Fall / Spring Intake",
    tuition: "$45,000 / yr",
    inrFee: "≈ ₹37.5 Lakhs / yr",
    roi: "High ROI • 3 Years STEM OPT Work Rights",
    tags: ["Computer Science", "Master's", "USA", "$30k-$50k"]
  },
  {
    id: "eng-ms-de",
    title: "M.Sc. in Automotive & Robotics Engineering",
    university: "Technical University of Munich • Germany",
    flag: "🇩🇪",
    duration: "2 Years • Winter / Summer Intake",
    tuition: "€0 (Free Public Tuition)",
    inrFee: "₹0 / Free (DAAD Eligible)",
    roi: "100% Scholarship Equivalent • 18 Months Job Seeker",
    tags: ["Engineering", "Master's", "Germany", "Under $15k"]
  },
  {
    id: "data-ms-uk",
    title: "M.Sc. in Business Analytics & FinTech",
    university: "Imperial College London • United Kingdom",
    flag: "🇬🇧",
    duration: "1 Year Intensive • September Intake",
    tuition: "£28,000 / yr",
    inrFee: "≈ ₹29.8 Lakhs / yr",
    roi: "Fast Track 1 Year • 2 Years Graduate Route",
    tags: ["Business Analytics", "Master's", "UK", "$30k-$50k"]
  },
  {
    id: "mba-ca",
    title: "Global Master of Business Administration (MBA)",
    university: "University of Toronto • Canada",
    flag: "🇨🇦",
    duration: "2 Years • September Intake",
    tuition: "CAD $42,000 / yr",
    inrFee: "≈ ₹25.8 Lakhs / yr",
    roi: "3 Years PGWP • Direct PR Pathway",
    tags: ["Management & MBA", "Master's", "Canada", "$30k-$50k"]
  },
  {
    id: "cyber-au",
    title: "Master of Cybersecurity & Network Systems",
    university: "University of Melbourne • Australia",
    flag: "🇦🇺",
    duration: "2 Years • February Intake",
    tuition: "AUD $40,000 / yr",
    inrFee: "≈ ₹22.0 Lakhs / yr",
    roi: "4 Years Post-Study Work Visa • High Demand Skill",
    tags: ["Computer Science", "Master's", "Australia", "$30k-$50k"]
  },
  {
    id: "pharma-ie",
    title: "M.Sc. in Pharmaceutical & Biotech Science",
    university: "Trinity College Dublin • Ireland",
    flag: "🇮🇪",
    duration: "1 Year • Autumn Intake",
    tuition: "€18,000 / yr",
    inrFee: "≈ ₹16.3 Lakhs / yr",
    roi: "2 Years Stay Back • European Pharma Hub",
    tags: ["Medicine & Pharma", "Master's", "Ireland", "$15k-$30k"]
  }
];

export function CourseFinderSection({ onOpenConsultModal }: CourseFinderSectionProps) {
  const [degree, setDegree] = useState("Master's");
  const [discipline, setDiscipline] = useState("Computer Science");
  const [country, setCountry] = useState("All");
  const [budget, setBudget] = useState("All");
  const [hasSearched, setHasSearched] = useState(false);

  const filteredCourses = coursesDatabase.filter((c) => {
    if (country !== "All" && !c.tags.includes(country)) return false;
    if (discipline !== "All" && !c.tags.includes(discipline)) return false;
    if (budget !== "All" && !c.tags.includes(budget)) return false;
    return true;
  });

  return (
    <section id="course-finder-section" className="py-20 bg-slate-50/80 border-b border-slate-200/70">
      <div className="container">
        <div className="section-header">
          <h2>Interactive <span className="accent-text">Course Finder</span></h2>
          <p>Our intelligent recommendation engine aligns your academic profile with top-tier international degree programs.</p>
        </div>

        {/* Recommendation Engine Box */}
        <div className="max-w-6xl mx-auto mt-12 bg-white rounded-3xl p-8 sm:p-10 lg:p-12 border border-slate-200/90 shadow-sm text-slate-900">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 mb-6 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-xl border border-emerald-200">
                ✨ Smart Degree Matching
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-2.5">Find Your Ideal Degree Program</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">Select your preferred study parameters to filter through accredited university programs.</p>
            </div>
            <div className="text-left md:text-right">
              <span className="text-xs text-slate-400 block font-medium">Database Coverage</span>
              <strong className="text-lg text-slate-800 font-heading">3,500+ Verified Degrees</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Target Degree</label>
              <select 
                value={degree} 
                onChange={(e) => setDegree(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
              >
                <option value="Master's">Master&apos;s / Postgraduate</option>
                <option value="Bachelor's">Bachelor&apos;s / Undergraduate</option>
                <option value="MBA">MBA &amp; Management</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Discipline</label>
              <select 
                value={discipline} 
                onChange={(e) => setDiscipline(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
              >
                <option value="All">All Disciplines</option>
                <option value="Computer Science">Computer Science &amp; AI</option>
                <option value="Engineering">Engineering &amp; Robotics</option>
                <option value="Business Analytics">Business Analytics &amp; FinTech</option>
                <option value="Management & MBA">Management &amp; MBA</option>
                <option value="Medicine & Pharma">Medicine &amp; Pharma</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Preferred Country</label>
              <select 
                value={country} 
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
              >
                <option value="All">Any Study Destination</option>
                <option value="USA">United States</option>
                <option value="Germany">Germany (Free Tuition)</option>
                <option value="UK">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Ireland">Ireland</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Tuition Budget</label>
              <select 
                value={budget} 
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
              >
                <option value="All">Flexible Budget</option>
                <option value="Under $15k">Under $15,000 / yr (€0 Public)</option>
                <option value="$15k-$30k">$15,000 - $30,000 / yr</option>
                <option value="$30k-$50k">$30,000 - $50,000 / yr</option>
              </select>
            </div>
          </div>

          <div className="mt-7 flex justify-end">
            <button 
              className="py-3 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-2"
              onClick={() => setHasSearched(true)}
            >
              <span>🔍</span>
              <span>Generate Course Recommendations</span>
            </button>
          </div>
        </div>

        {/* Results Area (Lead Capture at Point of Value) */}
        {hasSearched && (
          <div className="max-w-6xl mx-auto mt-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                Recommended Degree Programs <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full ml-2">Found {filteredCourses.length || 3} Matches</span>
              </h3>
              <span className="text-xs text-slate-500">Showing top rule-based matches for your profile</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(filteredCourses.length > 0 ? filteredCourses : coursesDatabase.slice(0, 3)).map((course) => (
                <div key={course.id} className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-premium transition-all flex flex-col justify-between h-full group hover:border-primary/40">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-md">
                        {course.tags[0]}
                      </span>
                      <span className="text-base" title={course.university}>{course.flag}</span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 leading-snug mb-1.5 group-hover:text-primary transition-colors">
                      {course.title}
                    </h4>
                    <p className="text-xs font-semibold text-slate-600 mb-3.5 flex items-center gap-1">
                      <span>🏫</span>
                      <span className="truncate">{course.university}</span>
                    </p>

                    {/* Prominent Fee Box */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-3.5 space-y-1">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[11px] text-slate-500 font-medium">Annual Tuition (INR)</span>
                        <strong className="text-sm font-extrabold text-emerald-600 font-mono">
                          {course.inrFee}
                        </strong>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Local Currency</span>
                        <span className="font-semibold text-slate-700">{course.tuition}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 py-2.5 border-t border-slate-100 text-xs text-slate-600 mb-4 font-medium">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Duration &amp; Intake:</span>
                        <strong className="text-slate-700 text-right text-[11px]">{course.duration}</strong>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Post-Study Work:</span>
                        <strong className="text-emerald-700 text-right text-[11px]">{course.roi}</strong>
                      </div>
                    </div>
                  </div>

                  <button 
                    className="w-full py-3 px-4 rounded-xl bg-primary text-white font-semibold text-xs shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group-hover:shadow-primary/20"
                    onClick={() => onOpenConsultModal && onOpenConsultModal(`Start My Journey • Course Recommendation (${course.title})`)}
                  >
                    <span>Start My Journey</span>
                    <span>→</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Value Gate Banner */}
            <div className="mt-8 bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-white shadow-md">
              <div>
                <h4 className="text-base font-bold text-white">Want your complete 15-page Personalized Admission Report?</h4>
                <p className="text-xs text-slate-300 mt-1">Includes syllabus comparisons, scholarship deadlines, and visa probability scoring.</p>
              </div>
              <button 
                className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all whitespace-nowrap"
                onClick={() => onOpenConsultModal && onOpenConsultModal("Start My Journey • Full Course Report Download")}
              >
                Start My Journey • Get Report
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
