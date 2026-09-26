"use client";

import React, { useState, useMemo } from "react";

interface ExplorerSectionProps {
  onOpenConsultModal?: (source?: string) => void;
}

const universitiesData = [
  { 
    id: "tum", 
    code: "DE",
    name: "Technical University of Munich", 
    country: "Germany", 
    rank: "37 QS", 
    tuition: "Free (€0)", 
    tuitionVal: 0,
    scholarship: "DAAD Grants", 
    course: "Engineering"
  },
  { 
    id: "bu", 
    code: "US",
    name: "Boston University", 
    country: "USA", 
    rank: "93 QS", 
    tuition: "USD $58,000", 
    tuitionVal: 58000,
    scholarship: "Merit Fellowship", 
    course: "Computer Science"
  },
  { 
    id: "melb", 
    code: "AU",
    name: "University of Melbourne", 
    country: "Australia", 
    rank: "14 QS", 
    tuition: "AUD $44,000", 
    tuitionVal: 44000,
    scholarship: "Group of Eight Award", 
    course: "Business Analytics"
  },
  { 
    id: "oxford", 
    code: "UK",
    name: "University of Oxford", 
    country: "UK", 
    rank: "3 QS", 
    tuition: "GBP £36,000", 
    tuitionVal: 36000,
    scholarship: "Clarendon Scholarship", 
    course: "Computer Science"
  },
  { 
    id: "toronto", 
    code: "CA",
    name: "University of Toronto", 
    country: "Canada", 
    rank: "21 QS", 
    tuition: "CAD $38,000", 
    tuitionVal: 38000,
    scholarship: "President's Scholars", 
    course: "Engineering"
  },
  { 
    id: "trinity", 
    code: "IE",
    name: "Trinity College Dublin", 
    country: "Ireland", 
    rank: "81 QS", 
    tuition: "EUR €20,000", 
    tuitionVal: 20000,
    scholarship: "Global Excellence", 
    course: "Software Dev"
  }
];

export function ExplorerSection({ onOpenConsultModal }: ExplorerSectionProps) {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [course, setCourse] = useState("");
  const [ranking, setRanking] = useState("");
  const [budget, setBudget] = useState("");

  const filteredUniversities = useMemo(() => {
    return universitiesData.filter((uni) => {
      // Search text
      if (search) {
        const q = search.toLowerCase();
        const matchName = uni.name.toLowerCase().includes(q);
        const matchCourse = uni.course.toLowerCase().includes(q);
        const matchCountry = uni.country.toLowerCase().includes(q);
        if (!matchName && !matchCourse && !matchCountry) return false;
      }
      // Country
      if (country && uni.country !== country) return false;
      // Course
      if (course && uni.course !== course) return false;
      // Ranking
      if (ranking) {
        const rankNum = parseInt(uni.rank.split(" ")[0] || "999", 10);
        if (rankNum > parseInt(ranking, 10)) return false;
      }
      // Budget
      if (budget !== "") {
        const maxBudget = parseInt(budget, 10);
        if (uni.tuitionVal > maxBudget) return false;
      }
      return true;
    });
  }, [search, country, course, ranking, budget]);

  return (
    <section id="explorer-section" className="explorer-wrap py-20 bg-slate-50/70 border-b border-slate-200/80">
      <div className="container">
        <div className="section-header">
          <h2>University Explorer</h2>
          <p>Filter and search through world-class institutions matching your academic stats.</p>
        </div>

        {/* Filters Bar matching Screenshot 4 */}
        <div className="explorer-filter-panel bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 mt-8 max-w-5xl mx-auto">
          <div className="search-box-wrap mb-4">
            <input 
              type="text" 
              id="uni-search-input" 
              placeholder="Search by university name or course..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-sm font-medium"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="filter-group flex flex-col gap-1.5">
              <label htmlFor="filter-country" className="text-xs font-bold uppercase tracking-wider text-slate-500">Country</label>
              <select 
                id="filter-country" 
                value={country} 
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="">All Countries</option>
                <option value="USA">United States</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="UK">United Kingdom</option>
                <option value="Ireland">Ireland</option>
              </select>
            </div>
            <div className="filter-group flex flex-col gap-1.5">
              <label htmlFor="filter-course" className="text-xs font-bold uppercase tracking-wider text-slate-500">Course</label>
              <select 
                id="filter-course" 
                value={course} 
                onChange={(e) => setCourse(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="">All Disciplines</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Business Analytics">Business Analytics</option>
                <option value="Engineering">Engineering</option>
                <option value="Software Dev">Software Dev</option>
              </select>
            </div>
            <div className="filter-group flex flex-col gap-1.5">
              <label htmlFor="filter-ranking" className="text-xs font-bold uppercase tracking-wider text-slate-500">Ranking</label>
              <select 
                id="filter-ranking" 
                value={ranking} 
                onChange={(e) => setRanking(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="">Any Ranking</option>
                <option value="50">Top 50 QS World</option>
                <option value="100">Top 100 QS World</option>
              </select>
            </div>
            <div className="filter-group flex flex-col gap-1.5">
              <label htmlFor="filter-budget" className="text-xs font-bold uppercase tracking-wider text-slate-500">Tuition Budget</label>
              <select 
                id="filter-budget" 
                value={budget} 
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="">Any Budget</option>
                <option value="0">Free Tuition (€0)</option>
                <option value="35000">Under $35,000 / yr</option>
                <option value="50000">Under $50,000 / yr</option>
              </select>
            </div>
          </div>
        </div>

        {/* University Cards Grid matching exact Screenshot 4 clean minimal style */}
        <div className="university-cards-grid mt-12" id="university-cards-container">
          {filteredUniversities.length === 0 ? (
            <div className="empty-state col-span-full text-center py-16 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
              <span className="text-4xl block mb-3">🔍</span>
              <h4 className="text-lg font-bold text-slate-800">No matching universities found</h4>
              <p className="text-sm text-slate-500 mt-1">Try adjusting your filters or clearing your search query.</p>
            </div>
          ) : (
            filteredUniversities.map((uni) => (
              <div 
                key={uni.id} 
                className="uni-explorer-card group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between h-full"
              >
                <div>
                  {/* Top Left Country Code e.g. DE, US, AU matching Screenshot 4 */}
                  <div className="text-2xl font-black text-slate-700 tracking-tight">
                    {uni.code}
                  </div>

                  {/* Bold University Name */}
                  <h3 className="text-lg font-bold text-slate-900 mt-3 mb-4 group-hover:text-primary transition-colors">
                    {uni.name}
                  </h3>

                  {/* 3 Neat Lines of Stats matching Screenshot 4 */}
                  <div className="space-y-2 text-xs font-medium text-slate-600 mb-6">
                    <div><strong className="text-slate-900">Rank:</strong> {uni.rank}</div>
                    <div><strong className="text-slate-900">Average Tuition:</strong> {uni.tuition}</div>
                    <div><strong className="text-slate-900">Scholarship:</strong> {uni.scholarship}</div>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <button 
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-primary transition-colors flex items-center justify-center gap-1.5"
                  onClick={() => onOpenConsultModal && onOpenConsultModal(`Start My Journey • Explore (${uni.name})`)}
                >
                  <span>Explore Guide</span>
                  <span>→</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
