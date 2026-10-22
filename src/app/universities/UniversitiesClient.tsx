"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  GraduationCap, 
  Award, 
  ArrowRight, 
  RotateCcw,
  Camera,
  CheckCircle2,
  Bot,
  SlidersHorizontal,
  FileSpreadsheet
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { LeadModal } from "@/components/home/LeadModal";

export interface UniversityItem {
  id: string;
  flag: string;
  name: string;
  country: string;
  rank: string;
  rankVal: number;
  tuition: string;
  tuitionVal: number;
  scholarship: string;
  course: string;
  discipline: string;
  banner: string;
  photoTag: string;
  intakes: string;
}

const AI_INSIGHTS: Record<string, string> = {
  cambridge: "Top 2 QS worldwide. 100% full-ride funding potential for STEM; highest Russell Group employer prestige.",
  oxford: "Top 3 QS. Prestigious Clarendon Fund full fee waiver eligibility for high-merit applicants.",
  cornell: "Ivy League Tier-1. Dedicated Tata Scholarship for Indian applicants; cutting-edge AI & robotics labs.",
  gmu: "Tier-1 US Research institution. High visa clearance rate with generous $12,000 Global Discovery merit grant.",
  herts: "Top UK Modern. Integrated 1-year industry placement with guaranteed £4,000 international scholarship.",
  coventry: "Top 30 UK Student City. 3 flexible intakes (Sep/Jan/May) and £3,500 automatic tuition discount.",
  imperial: "Top 6 QS. World-leading STEM incubator with highest graduate starting salary in London.",
  unsw: "Australian Group of Eight (Go8). 3-year Australian post-study work visa rights & strong cybersecurity demand.",
  newcastle: "Ranked 173 QS. Regional Australia visa extension (+1 extra year work rights) & AUD $10k scholarship.",
  toronto: "Ranked #21 QS globally. 3-year Canadian PGWP work permit eligible; renowned Vector Institute AI tie-ups.",
  trinity: "Ranked #81 QS. Silicon Docks tech corridor access with 2-year Irish stay-back option.",
  galway: "Top Irish Research. Global MedTech hub with €5,000 merit grant and 98% graduate employment.",
  dcu: "Ireland's #1 Young University. FinTech & Quantitative finance curriculum with EU career placement.",
  columbia: "Ivy League #22 QS. Manhattan networking hub & high-impact research labs with need-based fellowships.",
  tum: "Ranked #28 globally. 100% tuition-free public German institution; direct BMW, Siemens & SAP placement pipeline.",
  bsbi: "Accredited EU Campus in Berlin. Fast-track English MBA with up to 33% early bird scholarship.",
  northumbria: "Top 40 UK. AACSB double-accredited business school with £3,000 international waiver."
};

const PROMPT_SUGGESTIONS = [
  { label: "Engineering in Germany (Tuition-Free)", query: "Engineering in Germany free tuition" },
  { label: "Computer Science in UK", query: "Computer Science in UK" },
  { label: "Robotics & AI in USA", query: "Robotics and AI in USA" },
  { label: "Global MBA under £20,000", query: "MBA under 20k" },
  { label: "Data Science & AI in Canada", query: "Data Science AI in Canada" },
  { label: "Pharmaceutical Sciences in Ireland", query: "Pharma in Ireland" }
];

const UNIVERSITIES_DATA: UniversityItem[] = [
  { 
    id: "cambridge", 
    flag: "🇬🇧",
    name: "University of Cambridge", 
    country: "UK", 
    rank: "2 QS", 
    rankVal: 2,
    tuition: "GBP £22,000 / yr", 
    tuitionVal: 28000,
    scholarship: "Cambridge Trust International (£10k)", 
    course: "Computer Science & Engineering",
    discipline: "Computer Science",
    banner: "/universities/cambridge_kings_lawn.webp",
    photoTag: "King's College Lawn & Chapel",
    intakes: "Oct Intake"
  },
  { 
    id: "oxford", 
    flag: "🇬🇧",
    name: "University of Oxford", 
    country: "UK", 
    rank: "3 QS", 
    rankVal: 3,
    tuition: "GBP £26,000 / yr", 
    tuitionVal: 32000,
    scholarship: "Clarendon Fund Full Waiver", 
    course: "Philosophy, Politics & Economics",
    discipline: "Business & Management",
    banner: "/universities/oxford_radcliffe_panorama.webp",
    photoTag: "Radcliffe Square & Colleges Panorama",
    intakes: "Oct Intake"
  },
  { 
    id: "cornell", 
    flag: "🇺🇸",
    name: "Cornell University", 
    country: "USA", 
    rank: "16 QS", 
    rankVal: 16,
    tuition: "USD $54,000 / yr", 
    tuitionVal: 54000,
    scholarship: "Tata Scholarship for Indian Students", 
    course: "Robotics & AI Engineering",
    discipline: "Engineering",
    banner: "/universities/cornell_arts_quad.webp",
    photoTag: "Arts Quad & Historic Campus",
    intakes: "Aug / Jan Intake"
  },
  { 
    id: "gmu", 
    flag: "🇺🇸",
    name: "George Mason University", 
    country: "USA", 
    rank: "Tier 1 US", 
    rankVal: 250,
    tuition: "USD $36,000 / yr", 
    tuitionVal: 36000,
    scholarship: "Global Discovery Award ($12,000)", 
    course: "Data Analytics & Cyber Security",
    discipline: "Computer Science",
    banner: "/universities/gmu_johnson_center.webp",
    photoTag: "Johnson Center & Campus Plaza",
    intakes: "Fall / Spring"
  },
  { 
    id: "herts", 
    flag: "🇬🇧",
    name: "University of Hertfordshire", 
    country: "UK", 
    rank: "Top UK Modern", 
    rankVal: 350,
    tuition: "GBP £14,500 / yr", 
    tuitionVal: 18000,
    scholarship: "Chancellor's Award (£4,000 Off)", 
    course: "Computer Science & AI",
    discipline: "Computer Science",
    banner: "/universities/hertfordshire_campus.webp",
    photoTag: "De Havilland Campus",
    intakes: "Sep / Jan Intake"
  },
  { 
    id: "coventry", 
    flag: "🇬🇧",
    name: "Coventry University", 
    country: "UK", 
    rank: "Top 30 UK", 
    rankVal: 400,
    tuition: "GBP £16,800 / yr", 
    tuitionVal: 21000,
    scholarship: "International Merit Award (£3,500)", 
    course: "International Business Management",
    discipline: "Business & Management",
    banner: "/universities/coventry_campus_hub.webp",
    photoTag: "Coventry University Central Plaza",
    intakes: "Sep / Jan / May"
  },
  { 
    id: "imperial", 
    flag: "🇬🇧",
    name: "Imperial College London", 
    country: "UK", 
    rank: "6 QS", 
    rankVal: 6,
    tuition: "GBP £34,000 / yr", 
    tuitionVal: 40000,
    scholarship: "President's Undergraduate Scholarship", 
    course: "Aerospace & Computing",
    discipline: "Engineering",
    banner: "/universities/imperial_queens_lawn.webp",
    photoTag: "Queen's Lawn & Queen's Tower",
    intakes: "Oct Intake"
  },
  { 
    id: "unsw", 
    flag: "🇦🇺",
    name: "UNSW Sydney", 
    country: "Australia", 
    rank: "19 QS", 
    rankVal: 19,
    tuition: "AUD $45,000 / yr", 
    tuitionVal: 45000,
    scholarship: "Future of Change India Award", 
    course: "Cybersecurity & IT",
    discipline: "Computer Science",
    banner: "/universities/unsw_orientation.webp",
    photoTag: "UNSW Orientation Festival",
    intakes: "Feb / Jul / Sep"
  },
  { 
    id: "newcastle", 
    flag: "🇦🇺",
    name: "University of Newcastle", 
    country: "Australia", 
    rank: "173 QS", 
    rankVal: 173,
    tuition: "AUD $32,000 / yr", 
    tuitionVal: 32000,
    scholarship: "Excellence Scholarship (AUD $10k)", 
    course: "Civil & Mechanical Engineering",
    discipline: "Engineering",
    banner: "/universities/newcastle_nuspace.webp",
    photoTag: "NUspace Landmark Campus Building",
    intakes: "Feb / Jul Intake"
  },
  { 
    id: "toronto", 
    flag: "🇨🇦",
    name: "University of Toronto", 
    country: "Canada", 
    rank: "21 QS", 
    rankVal: 21,
    tuition: "CAD $38,000 / yr", 
    tuitionVal: 38000,
    scholarship: "International Scholar Award", 
    course: "Data Science & Artificial Intelligence",
    discipline: "Computer Science",
    banner: "/universities/toronto_campus.webp",
    photoTag: "Historic St. George Campus",
    intakes: "Sep / Jan Intake"
  },
  { 
    id: "trinity", 
    flag: "🇮🇪",
    name: "Trinity College Dublin", 
    country: "Ireland", 
    rank: "81 QS", 
    rankVal: 81,
    tuition: "EUR €20,000 / yr", 
    tuitionVal: 22000,
    scholarship: "Global Excellence Award (€5,000)", 
    course: "Pharmaceutical Sciences",
    discipline: "Medicine & Pharma",
    banner: "/universities/trinity_chapel_steps.webp",
    photoTag: "Historic Chapel Steps & Courtyard",
    intakes: "Sep Intake"
  },
  { 
    id: "galway", 
    flag: "🇮🇪",
    name: "University of Galway", 
    country: "Ireland", 
    rank: "289 QS", 
    rankVal: 289,
    tuition: "EUR €16,500 / yr", 
    tuitionVal: 18000,
    scholarship: "Global Merit Grant (€5,000)", 
    course: "Biomedical & MedTech Engineering",
    discipline: "Engineering",
    banner: "/universities/galway_aliceperry.webp",
    photoTag: "Alice Perry Engineering Centre",
    intakes: "Sep Intake"
  },
  { 
    id: "dcu", 
    flag: "🇮🇪",
    name: "Dublin City University", 
    country: "Ireland", 
    rank: "436 QS", 
    rankVal: 436,
    tuition: "EUR €15,000 / yr", 
    tuitionVal: 16500,
    scholarship: "DCU Merit Scholarship", 
    course: "FinTech & Quantitative Finance",
    discipline: "Business & Management",
    banner: "/universities/dcu_helix.webp",
    photoTag: "The Helix Innovation Hub",
    intakes: "Sep / Jan Intake"
  },
  { 
    id: "columbia", 
    flag: "🇺🇸",
    name: "Columbia University", 
    country: "USA", 
    rank: "22 QS", 
    rankVal: 22,
    tuition: "USD $52,000 / yr", 
    tuitionVal: 52000,
    scholarship: "Ivy League Need & Merit Fellowships", 
    course: "Public Health & Biostatistics",
    discipline: "Medicine & Pharma",
    banner: "/universities/columbia_morningside.webp",
    photoTag: "Morningside Heights Campus",
    intakes: "Fall Intake"
  },
  { 
    id: "tum", 
    flag: "🇩🇪",
    name: "Technical University of Munich", 
    country: "Germany", 
    rank: "28 QS", 
    rankVal: 28,
    tuition: "Free (€0 Public)", 
    tuitionVal: 0,
    scholarship: "DAAD Fellowships & Stipends", 
    course: "Automotive & Robotics Engineering",
    discipline: "Engineering",
    banner: "/universities/tum_garching.webp",
    photoTag: "Garching Research Campus",
    intakes: "Winter / Summer"
  },
  { 
    id: "bsbi", 
    flag: "🇩🇪",
    name: "BSBI Berlin", 
    country: "Germany", 
    rank: "Accredited EU", 
    rankVal: 500,
    tuition: "EUR €8,500 / yr", 
    tuitionVal: 9500,
    scholarship: "Early Bird & Merit (Up to 33% Off)", 
    course: "Global MBA & International Business",
    discipline: "Business & Management",
    banner: "/universities/humboldt_palace_campus.webp",
    photoTag: "Unter den Linden Historic Campus",
    intakes: "Oct / Feb / May"
  },
  { 
    id: "northumbria", 
    flag: "🇬🇧",
    name: "Northumbria University", 
    country: "UK", 
    rank: "Top 40 UK", 
    rankVal: 450,
    tuition: "GBP £17,500 / yr", 
    tuitionVal: 22000,
    scholarship: "Global Scholarship (£3,000 Off)", 
    course: "Hospitality & Supply Chain",
    discipline: "Business & Management",
    banner: "/universities/northumbria_campus.webp",
    photoTag: "City Campus Landmark Architecture",
    intakes: "Sep / Jan Intake"
  }
];

export default function UniversitiesPage({ initialUniversities }: { initialUniversities?: UniversityItem[] } = {}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedDiscipline, setSelectedDiscipline] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [sortBy, setSortBy] = useState<"ai_match" | "ranking" | "tuition_asc" | "tuition_desc">("ai_match");
  const [aiMode, setAiMode] = useState(true);

  // Lead modal state
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadModalTitle, setLeadModalTitle] = useState("AI Course & University Evaluation");
  const [leadModalSource, setLeadModalSource] = useState("AI_COURSE_FINDER");

  const allUniversities = useMemo(() => {
    if (initialUniversities && initialUniversities.length > 0) {
      const dbNames = new Set(initialUniversities.map((u) => u.name.toLowerCase()));
      const remainingBuiltIns = UNIVERSITIES_DATA.filter((u) => !dbNames.has(u.name.toLowerCase()));
      return [...initialUniversities, ...remainingBuiltIns];
    }
    return UNIVERSITIES_DATA;
  }, [initialUniversities]);

  // Natural Language Intent Detection (clean, without emojis)
  const detectedIntent = useMemo(() => {
    if (!searchTerm.trim()) return null;
    const q = searchTerm.toLowerCase();

    const intents: {
      country?: string;
      discipline?: string;
      budget?: string;
    } = {};

    if (q.includes("germany") || q.includes("german")) intents.country = "Germany";
    else if (q.includes("uk") || q.includes("england") || q.includes("britain") || q.includes("london")) intents.country = "UK";
    else if (q.includes("usa") || q.includes("us ") || q.includes("america") || q.includes("united states")) intents.country = "USA";
    else if (q.includes("australia") || q.includes("sydney")) intents.country = "Australia";
    else if (q.includes("canada") || q.includes("toronto")) intents.country = "Canada";
    else if (q.includes("ireland") || q.includes("dublin")) intents.country = "Ireland";

    if (q.includes("computer science") || q.includes("cs") || q.includes("ai") || q.includes("cyber") || q.includes("data science") || q.includes("software")) {
      intents.discipline = "Computer Science & AI";
    } else if (q.includes("engineering") || q.includes("robotics") || q.includes("mechanical") || q.includes("aerospace") || q.includes("civil")) {
      intents.discipline = "Engineering & Robotics";
    } else if (q.includes("mba") || q.includes("business") || q.includes("management") || q.includes("fintech") || q.includes("finance")) {
      intents.discipline = "Business & MBA";
    } else if (q.includes("pharma") || q.includes("medicine") || q.includes("health") || q.includes("biomedical")) {
      intents.discipline = "Medicine & Pharma";
    }

    if (q.includes("free") || q.includes("zero tuition") || q.includes("€0")) {
      intents.budget = "Free (€0 Public)";
    } else if (q.includes("under 20k") || q.includes("cheap") || q.includes("affordable")) {
      intents.budget = "Under $20k / yr";
    } else if (q.includes("ivy") || q.includes("top 20")) {
      intents.budget = "Ivy / Tier-1";
    }

    return Object.keys(intents).length > 0 ? intents : null;
  }, [searchTerm]);

  const handleSelectPrompt = (promptQuery: string) => {
    setSearchTerm(promptQuery);
  };

  // AI Match Score calculation
  const calculateAiScore = React.useCallback((uni: UniversityItem, query: string): number => {
    let score = 86;
    const q = query.toLowerCase().trim();

    if (q) {
      if (uni.course.toLowerCase().includes(q) || q.includes(uni.course.toLowerCase())) score += 8;
      if (uni.name.toLowerCase().includes(q)) score += 6;
      if (uni.country.toLowerCase().includes(q) || q.includes(uni.country.toLowerCase())) score += 4;
      if (uni.discipline.toLowerCase().includes(q)) score += 4;
    }

    if (selectedCountry !== "all" && uni.country === selectedCountry) score += 4;
    if (selectedDiscipline !== "all" && uni.discipline === selectedDiscipline) score += 4;
    if (selectedBudget === "free" && uni.tuitionVal === 0) score += 5;
    if (selectedBudget === "under20k" && uni.tuitionVal > 0 && uni.tuitionVal <= 20000) score += 4;

    if (uni.rankVal <= 20) score += 3;
    else if (uni.rankVal <= 100) score += 2;

    return Math.min(score, 99);
  }, [selectedCountry, selectedDiscipline, selectedBudget]);

  const filteredUnis = useMemo(() => {
    const list = allUniversities.filter((uni) => {
      // Natural language + search term filtering
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = uni.name.toLowerCase().includes(q);
        const matchesCourse = uni.course.toLowerCase().includes(q);
        const matchesCountry = uni.country.toLowerCase().includes(q);
        const matchesDiscipline = uni.discipline.toLowerCase().includes(q);

        const tokens = q.split(" ").filter((t) => t.length > 2);
        const matchesToken = tokens.some(
          (t) =>
            uni.course.toLowerCase().includes(t) ||
            uni.name.toLowerCase().includes(t) ||
            uni.country.toLowerCase().includes(t) ||
            uni.discipline.toLowerCase().includes(t)
        );

        if (!matchesName && !matchesCourse && !matchesCountry && !matchesDiscipline && !matchesToken) {
          return false;
        }
      }

      // Explicit Country filter
      if (selectedCountry !== "all" && uni.country !== selectedCountry) {
        return false;
      }

      // Explicit Discipline filter
      if (selectedDiscipline !== "all" && uni.discipline !== selectedDiscipline) {
        return false;
      }

      // Explicit Budget filter
      if (selectedBudget === "free" && uni.tuitionVal !== 0) return false;
      if (selectedBudget === "under20k" && (uni.tuitionVal === 0 || uni.tuitionVal > 20000)) return false;
      if (selectedBudget === "20k_35k" && (uni.tuitionVal <= 20000 || uni.tuitionVal > 35000)) return false;
      if (selectedBudget === "above35k" && uni.tuitionVal <= 35000) return false;

      return true;
    });

    return list.sort((a, b) => {
      if (sortBy === "ai_match") {
        const scoreA = calculateAiScore(a, searchTerm);
        const scoreB = calculateAiScore(b, searchTerm);
        if (scoreB !== scoreA) return scoreB - scoreA;
        return a.rankVal - b.rankVal;
      }
      if (sortBy === "ranking") return a.rankVal - b.rankVal;
      if (sortBy === "tuition_asc") return a.tuitionVal - b.tuitionVal;
      if (sortBy === "tuition_desc") return b.tuitionVal - a.tuitionVal;
      return 0;
    });
  }, [allUniversities, searchTerm, selectedCountry, selectedDiscipline, selectedBudget, sortBy, calculateAiScore]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCountry("all");
    setSelectedDiscipline("all");
    setSelectedBudget("all");
    setSortBy("ai_match");
  };

  const openEvaluationModal = (uni?: UniversityItem) => {
    if (uni) {
      setLeadModalTitle(`AI Admission Evaluation for ${uni.name}`);
      setLeadModalSource(`AI_COURSE_FINDER_${uni.id.toUpperCase()}`);
    } else {
      setLeadModalTitle("Export AI Course Shortlist to Counselor");
      setLeadModalSource("AI_COURSE_FINDER_SHORTLIST");
    }
    setLeadModalOpen(true);
  };

  return (
    <PublicLayout>
      {/* 1. Header Hero with Original Authentic High-Resolution Historic University Landscape */}
      <section className="relative overflow-hidden min-h-[480px] lg:min-h-[520px] flex items-center bg-slate-950 text-white border-b border-slate-800">
        {/* Full-bleed Real 6K High-Resolution Historic University Campus Landscape (Original Scrim & Contrast) */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <Image
            src="/universities/oxford_radcliffe_hero.webp"
            alt="Historic Oxford University Radcliffe Camera Architecture"
            fill
            priority
            className="object-cover object-[center_28%] lg:object-[68%_28%]"
          />
          {/* Smooth seamless left scrim: provides natural contrast directly on canvas with NO box */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 via-42% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30" />
        </div>

        <div className="container max-w-6xl mx-auto px-4 py-16 lg:py-20 relative z-10">
          <div className="max-w-2xl">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-xs font-semibold mb-5 backdrop-blur-xs">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>AI Course &amp; University Match Engine</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Explore Top Global Universities &amp;{" "}
              <span className="text-emerald-400">AI Course Pathways</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-xl">
              Search verified public and private institutions across the UK, Germany, USA, Australia, Canada, and Ireland with AI-matched scholarship eligibility, zero-tuition options, and application fee waivers.
            </p>

            {/* Quick Metrics Bar directly on canvas */}
            <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-200 text-xs font-medium max-w-xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100+ Direct University Tie-Ups</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Application Fee Waivers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Merit Scholarships up to 100%</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Campus Photography</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive AI Course Finder & Filter Section */}
      <section className="py-12 bg-slate-50 min-h-screen">
        <div className="container max-w-6xl mx-auto px-4">
          
          {/* Main Search & Control Panel */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs mb-8 space-y-4">
            
            {/* Top Row: Mode Switcher + Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                AI Course Matcher &amp; Global Directory
              </span>

              {/* View Toggle */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setAiMode(true)}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    aiMode 
                      ? "bg-emerald-600 text-white shadow-xs font-bold" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>AI Matcher Mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAiMode(false)}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    !aiMode 
                      ? "bg-slate-800 text-white shadow-xs font-bold" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Classic Directory</span>
                </button>
              </div>
            </div>

            {/* Natural Language Course Search Input */}
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search course name (e.g. Computer Science, MBA, Robotics), university, or country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-20 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all font-medium"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700 px-2 py-1 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Clickable AI Prompt Starters (clean, no emojis) */}
            <div className="pt-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Suggested Course Searches:
              </div>
              <div className="flex flex-wrap gap-2">
                {PROMPT_SUGGESTIONS.map((sug) => (
                  <button
                    key={sug.label}
                    type="button"
                    onClick={() => handleSelectPrompt(sug.query)}
                    className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 text-xs font-medium transition-all cursor-pointer"
                  >
                    {sug.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Detected AI Intent Callout (clean, no emojis) */}
            {detectedIntent && (
              <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/90 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-2 text-emerald-900 font-medium">
                  <Bot className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="font-semibold">AI Identified Intent:</span>
                  {detectedIntent.country && (
                    <span className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 font-bold text-emerald-800">
                      Country: {detectedIntent.country}
                    </span>
                  )}
                  {detectedIntent.discipline && (
                    <span className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 font-bold text-emerald-800">
                      Major: {detectedIntent.discipline}
                    </span>
                  )}
                  {detectedIntent.budget && (
                    <span className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 font-bold text-emerald-800">
                      Budget: {detectedIntent.budget}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="text-emerald-700 hover:text-emerald-900 font-semibold text-[11px] underline cursor-pointer"
                >
                  Clear Intent
                </button>
              </div>
            )}

            {/* Filter Dropdowns Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">Country</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:border-emerald-600 cursor-pointer"
                >
                  <option value="all">All Destinations</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Germany">Germany (Tuition-Free)</option>
                  <option value="USA">United States</option>
                  <option value="Australia">Australia</option>
                  <option value="Canada">Canada</option>
                  <option value="Ireland">Ireland</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">Discipline / Major</label>
                <select
                  value={selectedDiscipline}
                  onChange={(e) => setSelectedDiscipline(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:border-emerald-600 cursor-pointer"
                >
                  <option value="all">All Disciplines</option>
                  <option value="Computer Science">Computer Science &amp; AI</option>
                  <option value="Engineering">Engineering &amp; Robotics</option>
                  <option value="Business & Management">Business &amp; Global MBA</option>
                  <option value="Medicine & Pharma">Pharma &amp; Public Health</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">Tuition Budget</label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:border-emerald-600 cursor-pointer"
                >
                  <option value="all">Any Tuition Budget</option>
                  <option value="free">Free (€0 Public)</option>
                  <option value="under20k">Under $20,000 / yr</option>
                  <option value="20k_35k">$20k – $35k / yr</option>
                  <option value="above35k">$35k+ / yr (Ivy &amp; Tier-1)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">Sort Results</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "ai_match" | "ranking" | "tuition_asc" | "tuition_desc")}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:border-emerald-600 cursor-pointer"
                >
                  <option value="ai_match">AI Match Score (Highest)</option>
                  <option value="ranking">QS World Ranking</option>
                  <option value="tuition_asc">Tuition: Low to High</option>
                  <option value="tuition_desc">Tuition: High to Low</option>
                </select>
              </div>
            </div>

            {/* Results Count + Reset + Export CTA */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500">
                Identified <strong className="text-slate-900 font-bold">{filteredUnis.length}</strong> matching programs across {allUniversities.length} institutions
              </span>

              <div className="flex items-center gap-3">
                {(searchTerm || selectedCountry !== "all" || selectedDiscipline !== "all" || selectedBudget !== "all") && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-slate-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => openEvaluationModal()}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold border border-emerald-200/80 inline-flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Export Shortlist to Counselor</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          {filteredUnis.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto my-12 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Direct Program Matches</h3>
              <p className="text-xs text-slate-500 mt-2 mb-6 leading-relaxed">
                No institutions match your search for &quot;{searchTerm}&quot;. Try adjusting your keywords or clearing active filters.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
                >
                  Clear Filters
                </button>
                <button
                  type="button"
                  onClick={() => openEvaluationModal()}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                >
                  Consult Counselor Free
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUnis.map((uni, idx) => {
                const matchScore = calculateAiScore(uni, searchTerm);
                const aiInsight = AI_INSIGHTS[uni.id] || `${uni.rank} institution in ${uni.country}. Verified admissions pathway with ${uni.scholarship || "merit scholarship"} and dedicated counselor support.`;

                return (
                  <div
                    key={uni.id}
                    className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Campus Image Frame */}
                      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                        <Image
                          src={uni.banner}
                          alt={`${uni.name} Campus`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={idx < 3}
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                        {/* Country Flag Badge (kept clean with flag) */}
                        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-xs text-slate-900 text-xs font-bold border border-white/80 shadow-xs">
                          <span>{uni.flag}</span>
                          <span>{uni.country}</span>
                        </div>

                        {/* Top-Right Badge: AI Match Score (in AI mode) or QS Rank */}
                        {aiMode ? (
                          <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md bg-emerald-700/95 backdrop-blur-xs text-white text-xs font-bold shadow-xs">
                            {matchScore}% Match
                          </div>
                        ) : (
                          <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md bg-emerald-700/90 backdrop-blur-xs text-white text-[11px] font-bold shadow-xs">
                            #{uni.rank}
                          </div>
                        )}

                        {/* Photo Tag Indicator */}
                        <div className="absolute bottom-2.5 left-3 z-10 text-[10px] text-white/90 font-medium flex items-center gap-1 drop-shadow-sm">
                          <Camera className="w-3 h-3 shrink-0" />
                          <span className="truncate max-w-[200px]">{uni.photoTag}</span>
                        </div>

                        {/* Ranking Pill in AI Mode */}
                        {aiMode && (
                          <div className="absolute bottom-2.5 right-3 z-10 text-[10px] bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-white font-bold">
                            #{uni.rank}
                          </div>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="p-5">
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 mb-2">
                          {uni.name}
                        </h3>

                        {/* Course & Metadata Grid */}
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500 flex items-center gap-1">
                              <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Key Course:</span>
                            </span>
                            <span className="font-semibold text-slate-800 text-right truncate max-w-[170px]">
                              {uni.course}
                            </span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Tuition Fees:</span>
                            <span className="font-bold text-emerald-700 font-mono">{uni.tuition}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Intakes:</span>
                            <span className="font-medium text-slate-700">{uni.intakes}</span>
                          </div>
                        </div>

                        {/* Scholarship Tag */}
                        <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100/80 flex items-start gap-1.5">
                          <Award className="w-3.5 h-3.5 text-emerald-700 mt-0.5 shrink-0" />
                          <span className="text-[11px] font-semibold text-emerald-800 leading-tight">
                            {uni.scholarship}
                          </span>
                        </div>

                        {/* AI Program Insight Box (in AI Mode) */}
                        {aiMode && (
                          <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700">
                            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800 mb-1">
                              <Bot className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                              <span>Program Match Insight:</span>
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed">
                              {aiInsight}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Action Footer */}
                    <div className="p-5 pt-0">
                      <button
                        type="button"
                        onClick={() => openEvaluationModal(uni)}
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-emerald-600 text-slate-700 hover:text-white border border-slate-200 hover:border-emerald-600 font-bold text-xs transition-all flex items-center justify-center gap-1.5 text-center cursor-pointer"
                      >
                        <span>Check Admission Eligibility</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Counselling & Shortlist Export Banner */}
          <div className="mt-16 bg-gradient-to-br from-[#0A7D45] via-emerald-700 to-[#075A32] rounded-3xl p-8 sm:p-10 text-white shadow-premium flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold mb-3 border border-white/20">
                100% Free Mentoring
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">
                Can&apos;t find your dream university?
              </h3>
              <p className="text-emerald-100 text-sm leading-relaxed">
                We represent over 500+ global partner institutions across 25 countries with direct application fee waivers and visa filing support.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={() => openEvaluationModal()}
                className="px-6 py-3.5 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-sm shadow-md transition-all whitespace-nowrap cursor-pointer text-center"
              >
                Export Course Shortlist
              </button>
              <Link
                href="/#hero-section"
                className="px-6 py-3.5 rounded-2xl bg-emerald-900/50 hover:bg-emerald-900/70 border border-white/20 text-white font-bold text-sm transition-all whitespace-nowrap text-center"
              >
                Book Free Mentoring
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Lead Evaluation Modal triggered from AI Course Finder */}
      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        title={leadModalTitle}
        source={leadModalSource}
      />
    </PublicLayout>
  );
}
