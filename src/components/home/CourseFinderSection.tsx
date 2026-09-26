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
    duration: "2 Years • Fall / Spring Intake",
    tuition: "$45,000 / yr",
    roi: "High ROI • 3 Years STEM OPT Work Rights",
    tags: ["Computer Science", "Master's", "USA", "$30k-$50k"]
  },
  {
    id: "eng-ms-de",
    title: "M.Sc. in Automotive & Robotics Engineering",
    university: "Technical University of Munich • Germany",
    duration: "2 Years • Winter / Summer Intake",
    tuition: "€0 (Free Public Tuition)",
    roi: "100% Scholarship Equivalent • 18 Months Job Seeker",
    tags: ["Engineering", "Master's", "Germany", "Under $15k"]
  },
  {
    id: "data-ms-uk",
    title: "M.Sc. in Business Analytics & FinTech",
    university: "Imperial College London • United Kingdom",
    duration: "1 Year Intensive • September Intake",
    tuition: "£28,000 / yr",
    roi: "Fast Track 1 Year • 2 Years Graduate Route",
    tags: ["Business Analytics", "Master's", "UK", "$30k-$50k"]
  },
  {
    id: "mba-ca",
    title: "Global Master of Business Administration (MBA)",
    university: "University of Toronto • Canada",
    duration: "2 Years • September Intake",
    tuition: "CAD $42,000 / yr",
    roi: "3 Years PGWP • Direct PR Pathway",
    tags: ["Management & MBA", "Master's", "Canada", "$30k-$50k"]
  },
  {
    id: "cyber-au",
    title: "Master of Cybersecurity & Network Systems",
    university: "University of Melbourne • Australia",
    duration: "2 Years • February Intake",
    tuition: "AUD $40,000 / yr",
    roi: "4 Years Post-Study Work Visa • High Demand Skill",
    tags: ["Computer Science", "Master's", "Australia", "$30k-$50k"]
  },
  {
    id: "pharma-ie",
    title: "M.Sc. in Pharmaceutical & Biotech Science",
    university: "Trinity College Dublin • Ireland",
    duration: "1 Year • Autumn Intake",
    tuition: "€18,000 / yr",
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
    <section id="course-finder-section" className="py-20 bg-white border-b border-slate-100">
      <div className="container">
        <div className="section-header">
          <h2>Interactive <span className="accent-text">Course Finder</span></h2>
          <p>Our intelligent recommendation engine aligns your academic profile with top-tier international degree programs.</p>
        </div>

        {/* Recommendation Engine Box */}
        <div className="max-w-5xl mx-auto mt-10 bg-slate-900 rounded-3xl p-8 text-white shadow-premium border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 mb-6 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                ✨ AI-Powered &amp; Rule-Based Engine
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">Find Your Perfect Course Match</h3>
              <p className="text-xs text-slate-400 mt-1">Select your preferred study parameters to unlock tailored university program recommendations.</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-medium">Database Coverage</span>
              <strong className="text-lg text-white font-heading">3,500+ Accredited Degrees</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Degree</label>
              <select 
                value={degree} 
                onChange={(e) => setDegree(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Master's">Master&apos;s / Postgraduate</option>
                <option value="Bachelor's">Bachelor&apos;s / Undergraduate</option>
                <option value="MBA">MBA &amp; Management</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Discipline</label>
              <select 
                value={discipline} 
                onChange={(e) => setDiscipline(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
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
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Preferred Country</label>
              <select 
                value={country} 
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
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
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Tuition Budget</label>
              <select 
                value={budget} 
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="All">Flexible Budget</option>
                <option value="Under $15k">Under $15,000 / yr (€0 Public)</option>
                <option value="$15k-$30k">$15,000 - $30,000 / yr</option>
                <option value="$30k-$50k">$30,000 - $50,000 / yr</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button 
              className="py-3 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg hover:scale-[1.02] transition-all flex items-center gap-2"
              onClick={() => setHasSearched(true)}
            >
              <span>🔍</span>
              <span>Generate Course Recommendations</span>
            </button>
          </div>
        </div>

        {/* Results Area (Lead Capture at Point of Value) */}
        {hasSearched && (
          <div className="max-w-5xl mx-auto mt-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                Recommended Degree Programs <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full ml-2">Found {filteredCourses.length || 3} Matches</span>
              </h3>
              <span className="text-xs text-slate-500">Showing top rule-based matches for your profile</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(filteredCourses.length > 0 ? filteredCourses : coursesDatabase.slice(0, 3)).map((course) => (
                <div key={course.id} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-premium transition-all flex flex-col justify-between h-full">
                  <div>
                    <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{course.tags[0]}</div>
                    <h4 className="text-base font-bold text-slate-900 leading-snug mb-2">{course.title}</h4>
                    <p className="text-xs font-semibold text-slate-600 mb-4">🏫 {course.university}</p>

                    <div className="space-y-2 py-3 border-t border-b border-slate-100 text-xs text-slate-600 mb-6 font-medium">
                      <div className="flex justify-between"><span>Duration:</span><strong className="text-slate-800">{course.duration}</strong></div>
                      <div className="flex justify-between"><span>Tuition:</span><strong className="text-emerald-600">{course.tuition}</strong></div>
                      <div className="flex justify-between"><span>Work Rights:</span><strong className="text-slate-800">{course.roi}</strong></div>
                    </div>
                  </div>

                  <button 
                    className="w-full py-3 px-4 rounded-xl bg-primary text-white font-semibold text-xs shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                    onClick={() => onOpenConsultModal && onOpenConsultModal(`Start My Journey • Course Recommendation (${course.title})`)}
                  >
                    <span>Start My Journey</span>
                    <span>→</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Value Gate Banner */}
            <div className="mt-8 bg-gradient-to-r from-primary/10 via-purple-500/10 to-emerald-500/10 rounded-2xl p-6 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h4 className="text-base font-bold text-slate-900">Want your complete 15-page Personalized Admission Report?</h4>
                <p className="text-xs text-slate-600 mt-1">Includes syllabus comparisons, scholarship deadlines, and visa probability scoring.</p>
              </div>
              <button 
                className="py-3 px-6 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-primary transition-all whitespace-nowrap"
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
