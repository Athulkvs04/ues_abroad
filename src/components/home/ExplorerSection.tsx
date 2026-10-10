"use client";

import React, { useState, useMemo } from "react";
import { Search, Camera } from "lucide-react";

interface ExplorerSectionProps {
  onOpenConsultModal?: (source?: string) => void;
}

interface UniversityItem {
  id: string;
  flag: string;
  name: string;
  country: string;
  rank: string;
  tuition: string;
  tuitionVal: number;
  scholarship: string;
  course: string;
  banner: string;
  photoTag: string;
}

const universitiesData: UniversityItem[] = [
  { 
    id: "cambridge", 
    flag: "🇬🇧",
    name: "University of Cambridge", 
    country: "UK", 
    rank: "2 QS", 
    tuition: "GBP £22,000 / yr", 
    tuitionVal: 28000,
    scholarship: "Cambridge Trust International (£10k)", 
    course: "Computer Science & Engineering",
    banner: "/universities/cambridge_kings_lawn.webp",
    photoTag: "King's College Lawn & Chapel"
  },
  { 
    id: "oxford", 
    flag: "🇬🇧",
    name: "University of Oxford", 
    country: "UK", 
    rank: "3 QS", 
    tuition: "GBP £26,000 / yr", 
    tuitionVal: 32000,
    scholarship: "Clarendon Fund Full Waiver", 
    course: "Philosophy, Politics & Economics",
    banner: "/universities/oxford_radcliffe_panorama.webp",
    photoTag: "Radcliffe Square & Colleges Panorama"
  },
  { 
    id: "cornell", 
    flag: "🇺🇸",
    name: "Cornell University", 
    country: "USA", 
    rank: "16 QS", 
    tuition: "USD $54,000 / yr", 
    tuitionVal: 54000,
    scholarship: "Tata Scholarship for Indian Students", 
    course: "Robotics & AI Engineering",
    banner: "/universities/cornell_arts_quad.webp",
    photoTag: "Arts Quad & Historic Campus"
  },
  { 
    id: "gmu", 
    flag: "🇺🇸",
    name: "George Mason University", 
    country: "USA", 
    rank: "Tier 1 US", 
    tuition: "USD $36,000 / yr", 
    tuitionVal: 36000,
    scholarship: "Global Discovery Award ($12,000)", 
    course: "Data Analytics & Cyber Security",
    banner: "/universities/gmu_johnson_center.webp",
    photoTag: "Johnson Center & Campus Plaza"
  },
  { 
    id: "herts", 
    flag: "🇬🇧",
    name: "University of Hertfordshire", 
    country: "UK", 
    rank: "Top UK Modern", 
    tuition: "GBP £14,500 / yr", 
    tuitionVal: 18000,
    scholarship: "Chancellor's Award (£4,000 Off)", 
    course: "Computer Science & AI",
    banner: "/universities/hertfordshire_campus.webp",
    photoTag: "De Havilland Campus"
  },
  { 
    id: "coventry", 
    flag: "🇬🇧",
    name: "Coventry University", 
    country: "UK", 
    rank: "Top 30 UK", 
    tuition: "GBP £16,800 / yr", 
    tuitionVal: 21000,
    scholarship: "International Merit Award", 
    course: "Business & Management",
    banner: "/universities/coventry_campus_hub.webp",
    photoTag: "Coventry University Central Plaza"
  },
  { 
    id: "imperial", 
    flag: "🇬🇧",
    name: "Imperial College London", 
    country: "UK", 
    rank: "6 QS", 
    tuition: "GBP £34,000 / yr", 
    tuitionVal: 40000,
    scholarship: "President's Undergraduate Scholarship", 
    course: "Aerospace & Computing",
    banner: "/universities/imperial_queens_lawn.webp",
    photoTag: "Queen's Lawn & Queen's Tower"
  },
  { 
    id: "unsw", 
    flag: "🇦🇺",
    name: "UNSW Sydney", 
    country: "Australia", 
    rank: "19 QS", 
    tuition: "AUD $45,000 / yr", 
    tuitionVal: 45000,
    scholarship: "Future of Change India Award", 
    course: "Cybersecurity & IT",
    banner: "/universities/unsw_orientation.webp",
    photoTag: "UNSW Orientation Festival"
  },
  { 
    id: "newcastle", 
    flag: "🇦🇺",
    name: "University of Newcastle", 
    country: "Australia", 
    rank: "173 QS", 
    tuition: "AUD $32,000 / yr", 
    tuitionVal: 32000,
    scholarship: "Excellence Scholarship (AUD $10k)", 
    course: "Engineering & Healthcare",
    banner: "/universities/newcastle_nuspace.webp",
    photoTag: "NUspace Landmark Campus Building"
  },
  { 
    id: "toronto", 
    flag: "🇨🇦",
    name: "University of Toronto", 
    country: "Canada", 
    rank: "21 QS", 
    tuition: "CAD $38,000 / yr", 
    tuitionVal: 38000,
    scholarship: "International Scholar Award", 
    course: "Data Science & AI",
    banner: "/universities/toronto_campus.webp",
    photoTag: "Historic St. George Campus"
  },
  { 
    id: "trinity", 
    flag: "🇮🇪",
    name: "Trinity College Dublin", 
    country: "Ireland", 
    rank: "81 QS", 
    tuition: "EUR €20,000 / yr", 
    tuitionVal: 22000,
    scholarship: "Global Excellence Award", 
    course: "Pharmaceutical Sciences",
    banner: "/universities/trinity_chapel_steps.webp",
    photoTag: "Historic Chapel Steps & Courtyard"
  },
  { 
    id: "galway", 
    flag: "🇮🇪",
    name: "University of Galway", 
    country: "Ireland", 
    rank: "289 QS", 
    tuition: "EUR €16,500 / yr", 
    tuitionVal: 18000,
    scholarship: "Global Merit Grant (€5,000)", 
    course: "Biomedical & Pharma",
    banner: "/universities/galway_aliceperry.webp",
    photoTag: "Alice Perry Engineering Centre"
  },
  { 
    id: "dcu", 
    flag: "🇮🇪",
    name: "Dublin City University", 
    country: "Ireland", 
    rank: "436 QS", 
    tuition: "EUR €15,000 / yr", 
    tuitionVal: 16500,
    scholarship: "DCU Merit Scholarship", 
    course: "Finance & Accounting",
    banner: "/universities/dcu_helix.webp",
    photoTag: "The Helix Innovation Hub"
  },
  { 
    id: "columbia", 
    flag: "🇺🇸",
    name: "Columbia University", 
    country: "USA", 
    rank: "22 QS", 
    tuition: "USD $52,000 / yr", 
    tuitionVal: 52000,
    scholarship: "Need & Merit Fellowships", 
    course: "Public Health & Policy",
    banner: "/universities/columbia_morningside.webp",
    photoTag: "Morningside Heights Campus"
  },
  { 
    id: "tum", 
    flag: "🇩🇪",
    name: "Technical University of Munich", 
    country: "Germany", 
    rank: "28 QS", 
    tuition: "Free (€0 Public)", 
    tuitionVal: 0,
    scholarship: "DAAD Fellowships", 
    course: "Automotive & Robotics",
    banner: "/universities/tum_garching.webp",
    photoTag: "Garching Research Campus"
  },
  { 
    id: "bsbi", 
    flag: "🇩🇪",
    name: "BSBI Berlin", 
    country: "Germany", 
    rank: "Accredited EU", 
    tuition: "EUR €8,500 / yr", 
    tuitionVal: 9500,
    scholarship: "Early Bird & Merit (Up to 33%)", 
    course: "Global MBA & Business",
    banner: "/universities/humboldt_palace_campus.webp",
    photoTag: "Unter den Linden Historic Campus"
  },
  { 
    id: "northumbria", 
    flag: "🇬🇧",
    name: "Northumbria University", 
    country: "UK", 
    rank: "Top 40 UK", 
    tuition: "GBP £17,500 / yr", 
    tuitionVal: 22000,
    scholarship: "Global Scholarship (£3,000)", 
    course: "Hospitality & Management",
    banner: "/universities/northumbria_campus.webp",
    photoTag: "City Campus Landmark Architecture"
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
      if (course && !uni.course.toLowerCase().includes(course.toLowerCase())) return false;
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
                <option value="Computer">Computer Science & AI</option>
                <option value="Business">Business & Management</option>
                <option value="Engineering">Engineering & Robotics</option>
                <option value="Healthcare">Healthcare & Medicine</option>
                <option value="Pharma">Pharmaceutical Sciences</option>
                <option value="Finance">Finance & Accounting</option>
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
                <option value="0">Free (€0 Public - Germany)</option>
                <option value="20000">Under $20,000 / yr</option>
                <option value="35000">Under $35,000 / yr</option>
                <option value="50000">Under $50,000 / yr</option>
              </select>
            </div>
          </div>
        </div>

        {/* University Cards Grid */}
        <div className="university-cards-grid mt-12" id="university-cards-container">
          {filteredUniversities.length === 0 ? (
            <div className="empty-state col-span-full text-center py-16 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">No matching universities found</h4>
              <p className="text-sm text-slate-500 mt-1">Try adjusting your filters or clearing your search query.</p>
            </div>
          ) : (
            filteredUniversities.map((uni) => (
              <div 
                key={uni.id} 
                className="uni-explorer-card group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden"
              >
                {/* Campus & Student Photo Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img 
                    src={uni.banner} 
                    alt={`${uni.name} campus`} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  {/* Rank badge overlay */}
                  <span className="absolute top-3 right-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm text-slate-900 font-bold text-xs rounded-lg shadow-sm">
                    #{uni.rank}
                  </span>
                  
                  {/* Country Flag */}
                  <span className="absolute bottom-3 left-3 text-lg drop-shadow-sm">{uni.flag}</span>
                  
                  {/* Photo tag descriptor */}
                  {uni.photoTag && (
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 bg-slate-900/80 backdrop-blur-sm text-white/90 text-[10px] font-medium rounded-md shadow-sm flex items-center gap-1 border border-white/10">
                      <Camera className="w-2.5 h-2.5 text-emerald-400" />
                      <span>{uni.photoTag}</span>
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  {/* Bold University Name */}
                  <h3 className="text-base font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors leading-snug">
                    {uni.name}
                  </h3>

                  {/* Stats Recessed Well */}
                  <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100/80 space-y-2 text-xs font-medium text-slate-600 mb-4 flex-1">
                    <div className="flex justify-between items-center"><span className="text-slate-400">Tuition</span><strong className="text-slate-900">{uni.tuition}</strong></div>
                    <div className="flex justify-between items-center"><span className="text-slate-400">Scholarship</span><strong className="text-emerald-600 font-semibold">{uni.scholarship}</strong></div>
                    <div className="flex justify-between items-center"><span className="text-slate-400">Top Course</span><strong className="text-slate-900">{uni.course}</strong></div>
                  </div>

                  {/* Bottom CTA Button */}
                  <button 
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 mt-auto cursor-pointer"
                    onClick={() => onOpenConsultModal && onOpenConsultModal(`Start My Journey • Explore (${uni.name})`)}
                  >
                    <span>Explore Guide</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
