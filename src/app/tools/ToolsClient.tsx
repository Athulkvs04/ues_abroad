"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Calculator, 
  GraduationCap, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  Sliders, 
  Calendar, 
  Layers, 
  PhoneCall, 
  TrendingUp,
  FileText
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { LeadModal } from "@/components/home/LeadModal";

export default function DecisionToolsPage() {
  const [activeTab, setActiveTab] = useState<"eligibility" | "budget" | "comparison" | "uni-compare" | "timeline">("eligibility");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState<string | undefined>(undefined);

  // Tab 1: Profile Eligibility State
  const [eligCountry, setEligCountry] = useState("usa");
  const [eligCgpa, setEligCgpa] = useState("");
  const [eligIelts, setEligIelts] = useState("");
  const [eligResult, setEligResult] = useState<{
    matchRate: number;
    tierLabel: string;
    color: string;
    uniCards: { name: string; countryCode: string; rank: string; tuition: string; inr: string; courses: string[] }[];
  } | null>(null);

  // Tab 2: Budget State
  const [calcCountry, setCalcCountry] = useState("usa");
  const [calcDuration, setCalcDuration] = useState(24);
  const [calcCurrency, setCalcCurrency] = useState("INR");
  const [tuition, setTuition] = useState(25000);
  const [living, setLiving] = useState(12000);
  const [visa, setVisa] = useState(1500);
  const [flights, setFlights] = useState(1000);

  // Tab 5: Intake Timeline Drag & Drop State
  const [backlog, setBacklog] = useState([
    { id: "ms-exams", text: "1. IELTS / GRE / TOEFL Exams" },
    { id: "ms-sop", text: "2. SOP & LOR Draft Finalization" },
    { id: "ms-apply", text: "3. Submit University Applications" },
    { id: "ms-offer", text: "4. Receive Offer Letter & Pay Deposit" },
    { id: "ms-finance", text: "5. Blocked Account & Education Loan" },
    { id: "ms-visa", text: "6. Embassy Visa Appointment & Drill" },
    { id: "ms-flight", text: "7. Flight Booking & Pre-Departure" }
  ]);
  const [september, setSeptember] = useState<Array<{ id: string; text: string }>>([]);
  const [january, setJanuary] = useState<Array<{ id: string; text: string }>>([]);
  const [may, setMay] = useState<Array<{ id: string; text: string }>>([]);

  // Callback form state
  const [cbName, setCbName] = useState("");
  const [cbPhone, setCbPhone] = useState("");
  const [cbCountry, setCbCountry] = useState("United States");
  const [cbSubmitted, setCbSubmitted] = useState(false);

  const handleOpenModal = (source?: string) => {
    setModalSource(source);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalSource(undefined);
  };

  const checkEligibility = () => {
    const cgpaNum = parseFloat(eligCgpa) || 7.5;
    const ieltsNum = parseFloat(eligIelts) || 6.5;

    const uniMap: Record<string, Record<string, { name: string; countryCode: string; rank: string; tuition: string; inr: string; courses: string[] }[]>> = {
      high: {
        germany: [
          { name: "Technical University of Munich", countryCode: "DE", rank: "28 QS", tuition: "€0 / yr", inr: "₹0 (Tuition Free)", courses: ["Robotics & AI", "Mechanical Eng"] },
          { name: "RWTH Aachen University", countryCode: "DE", rank: "106 QS", tuition: "€0 / yr", inr: "₹0 (Tuition Free)", courses: ["Automotive Engineering", "Computer Science"] },
        ],
        uk: [
          { name: "University of Hertfordshire", countryCode: "UK", rank: "Top Modern UK", tuition: "£14,500 / yr", inr: "≈ ₹15.8L / yr", courses: ["Data Science & AI", "Software Eng"] },
          { name: "Coventry University", countryCode: "UK", rank: "Top 30 UK", tuition: "£16,800 / yr", inr: "≈ ₹18.2L / yr", courses: ["Automotive Design", "Management"] },
        ],
        australia: [
          { name: "University of Newcastle", countryCode: "AU", rank: "173 QS", tuition: "AUD $32,000 / yr", inr: "≈ ₹17.6L / yr", courses: ["Biomedical Science", "IT"] },
          { name: "UNSW Sydney", countryCode: "AU", rank: "19 QS", tuition: "AUD $45,000 / yr", inr: "≈ ₹24.8L / yr", courses: ["Cybersecurity", "Computer Science"] },
        ],
        canada: [
          { name: "University of Toronto", countryCode: "CA", rank: "21 QS", tuition: "CAD $38,000 / yr", inr: "≈ ₹23.5L / yr", courses: ["Applied Computing", "MBA"] },
          { name: "UBC Vancouver", countryCode: "CA", rank: "34 QS", tuition: "CAD $35,000 / yr", inr: "≈ ₹21.6L / yr", courses: ["Data Analytics", "Civil Eng"] },
        ],
        usa: [
          { name: "Northeastern University", countryCode: "US", rank: "Top 50 US", tuition: "$34,000 / yr", inr: "≈ ₹28.5L / yr", courses: ["Computer Science", "Information Systems"] },
          { name: "Purdue University", countryCode: "US", rank: "99 QS", tuition: "$28,000 / yr", inr: "≈ ₹23.5L / yr", courses: ["Mechanical & Aerospace", "Industrial Eng"] },
        ],
        ireland: [
          { name: "Trinity College Dublin", countryCode: "IE", rank: "81 QS", tuition: "€22,000 / yr", inr: "≈ ₹19.8L / yr", courses: ["Computer Science", "Finance"] },
          { name: "University College Dublin", countryCode: "IE", rank: "126 QS", tuition: "€19,500 / yr", inr: "≈ ₹17.5L / yr", courses: ["Data Analytics", "Biotech"] },
        ],
      },
      mid: {
        germany: [
          { name: "TU Berlin", countryCode: "DE", rank: "154 QS", tuition: "€0 / yr", inr: "₹0 (Tuition Free)", courses: ["Computer Science", "Physics"] },
          { name: "University of Stuttgart", countryCode: "DE", rank: "348 QS", tuition: "€0 / yr", inr: "₹0 (Tuition Free)", courses: ["Automotive & Aerospace", "Electrical"] },
        ],
        uk: [
          { name: "University of Manchester", countryCode: "UK", rank: "32 QS", tuition: "£24,000 / yr", inr: "≈ ₹26.0L / yr", courses: ["Business Analytics", "CS"] },
          { name: "University of Leeds", countryCode: "UK", rank: "82 QS", tuition: "£23,500 / yr", inr: "≈ ₹25.5L / yr", courses: ["Data Science", "Marketing"] },
        ],
        australia: [
          { name: "Monash University", countryCode: "AU", rank: "37 QS", tuition: "AUD $39,000 / yr", inr: "≈ ₹21.5L / yr", courses: ["Pharmaceutical Science", "Software"] },
          { name: "Deakin University", countryCode: "AU", rank: "233 QS", tuition: "AUD $31,000 / yr", inr: "≈ ₹17.0L / yr", courses: ["Cybersecurity", "Health Sciences"] },
        ],
        canada: [
          { name: "University of Waterloo", countryCode: "CA", rank: "112 QS", tuition: "CAD $32,000 / yr", inr: "≈ ₹19.8L / yr", courses: ["Software Eng", "Mathematics"] },
          { name: "McMaster University", countryCode: "CA", rank: "189 QS", tuition: "CAD $29,000 / yr", inr: "≈ ₹17.9L / yr", courses: ["Biotechnology", "Engineering"] },
        ],
        usa: [
          { name: "UT Arlington", countryCode: "US", rank: "Top US Research", tuition: "$22,000 / yr", inr: "≈ ₹18.5L / yr", courses: ["Computer Science", "Data Science"] },
          { name: "Arizona State University", countryCode: "US", rank: "#1 Innovation", tuition: "$31,000 / yr", inr: "≈ ₹26.0L / yr", courses: ["Software Engineering", "Business"] },
        ],
        ireland: [
          { name: "University of Galway", countryCode: "IE", rank: "289 QS", tuition: "€16,500 / yr", inr: "≈ ₹14.8L / yr", courses: ["Biomedical Engineering", "Cloud Computing"] },
          { name: "Dublin City University", countryCode: "IE", rank: "436 QS", tuition: "€15,000 / yr", inr: "≈ ₹13.5L / yr", courses: ["Electronic Commerce", "FinTech"] },
        ],
      },
      low: {
        germany: [{ name: "German State Pathway Programs", countryCode: "DE", rank: "Accredited", tuition: "€0 – €3,000 / yr", inr: "₹0 – ₹2.7L", courses: ["Foundation", "Language Bridge"] }],
        uk: [{ name: "Pathway & Foundation Colleges", countryCode: "UK", rank: "Partner Modern", tuition: "£11,000 – £15,000 / yr", inr: "≈ ₹12–16L", courses: ["Pre-Master's", "Direct Entry"] }],
        australia: [{ name: "Regional Australian Universities", countryCode: "AU", rank: "Partner Network", tuition: "AUD $24,000 / yr", inr: "≈ ₹13.2L", courses: ["Business", "IT Diploma"] }],
        canada: [{ name: "Canadian Public Colleges (Post-Graduate)", countryCode: "CA", rank: "Public DLI", tuition: "CAD $16,000 / yr", inr: "≈ ₹9.9L", courses: ["Project Management", "IT"] }],
        usa: [{ name: "State University Direct Admissions", countryCode: "US", rank: "Accredited Regional", tuition: "$18,000 / yr", inr: "≈ ₹15.0L", courses: ["Applied Computing", "Management"] }],
        ireland: [{ name: "Technological Universities (TUs)", countryCode: "IE", rank: "State Partner", tuition: "€11,500 / yr", inr: "≈ ₹10.3L", courses: ["Applied Computing", "Business"] }],
      },
    };

    let tier: "high" | "mid" | "low" = "low";
    let matchRate = 65;
    let tierLabel = "Foundation / Pathway Match";
    let color = "#d97706"; // Amber

    if (cgpaNum >= 8.2 && ieltsNum >= 7.0) { 
      tier = "high"; 
      matchRate = 92; 
      tierLabel = "Direct High-Tier Admission";
      color = "#0A7D45"; // Emerald
    } else if (cgpaNum >= 7.0 && ieltsNum >= 6.5) { 
      tier = "mid"; 
      matchRate = 80; 
      tierLabel = "Competitive Direct Admission";
      color = "#059669"; 
    }

    const country = eligCountry as keyof typeof uniMap.high;
    const uniCards = (uniMap[tier][country] || uniMap[tier].usa);
    setEligResult({ matchRate, tierLabel, color, uniCards });
  };

  const handleCountryBudgetChange = (val: string) => {
    setCalcCountry(val);
    if (val === "germany") {
      setTuition(0);
      setLiving(11208);
      setVisa(150);
      setFlights(700);
    } else if (val === "uk") {
      setTuition(20000);
      setLiving(13000);
      setVisa(800);
      setFlights(800);
    } else if (val === "canada") {
      setTuition(22000);
      setLiving(15000);
      setVisa(300);
      setFlights(900);
    } else if (val === "australia") {
      setTuition(32000);
      setLiving(22000);
      setVisa(700);
      setFlights(1000);
    } else if (val === "ireland") {
      setTuition(16000);
      setLiving(11000);
      setVisa(350);
      setFlights(750);
    } else {
      setTuition(28000);
      setLiving(14000);
      setVisa(500);
      setFlights(1000);
    }
  };

  const totalCost = tuition + living + visa + flights;
  const inrRate = 84.5;
  const rate = calcCurrency === "INR" ? inrRate : 1;
  const sym = calcCurrency === "INR" ? "₹" : "$";
  const totalSliders = tuition + living + visa + flights;

  const countryComparisonData = [
    { 
      name: "Germany", 
      tuition: "€0 (Public Universities)", 
      living: "€11,208 / yr (Blocked Account)", 
      visa: "APS Certificate + German Student Visa", 
      jobs: "18-Month Job Seeker Visa", 
      pr: "EU Blue Card / Fast-Track Settlement", 
      time: "6 to 10 Weeks" 
    },
    { 
      name: "United States", 
      tuition: "$22,000 – $48,000 / yr", 
      living: "$12,000 – $18,000 / yr", 
      visa: "F-1 Student Visa (Embassy Interview)", 
      jobs: "Up to 3 Years STEM OPT", 
      pr: "H-1B Dual Intent Pathway", 
      time: "4 to 6 Weeks" 
    },
    { 
      name: "United Kingdom", 
      tuition: "£13,000 – £24,000 / yr", 
      living: "£11,000 – £14,000 / yr", 
      visa: "Student Route (Points-Based CAS)", 
      jobs: "2-Year Graduate Route (PSW)", 
      pr: "Skilled Worker Visa Sponsorship", 
      time: "3 to 4 Weeks" 
    },
    { 
      name: "Canada", 
      tuition: "CAD $16,000 – $32,000 / yr", 
      living: "CAD $20,635 / yr (Mandatory GIC)", 
      visa: "Study Permit (SDS / Non-SDS)", 
      jobs: "Up to 3-Year PGWP", 
      pr: "Express Entry (CEC) / PNP Streams", 
      time: "4 to 8 Weeks" 
    },
    { 
      name: "Australia", 
      tuition: "AUD $24,000 – $42,000 / yr", 
      living: "AUD $24,505 / yr (Financial Capacity)", 
      visa: "Subclass 500 (Genuine Student Test)", 
      jobs: "Up to 4-Year Temporary Graduate (485)", 
      pr: "General Skilled Migration Points", 
      time: "3 to 6 Weeks" 
    },
    { 
      name: "Ireland", 
      tuition: "€11,000 – €22,000 / yr", 
      living: "€10,000 – €12,000 / yr", 
      visa: "Irish Study Visa (Standard Processing)", 
      jobs: "2-Year Stay Back (Third Level Scheme)", 
      pr: "Critical Skills Employment Permit", 
      time: "4 to 6 Weeks" 
    }
  ];

  const universitiesMatrix = [
    { id: "tum", name: "Technical University of Munich", rank: "28 QS", tuition: "Free (€0)", currency: "EUR", scholarship: "DAAD Merit Scholarships", course: "Robotics & Automotive" },
    { id: "herts", name: "University of Hertfordshire", rank: "Top Modern UK", tuition: "£14,500 / yr", currency: "GBP", scholarship: "Vice-Chancellor's Award (£4,000)", course: "Computer Science & AI" },
    { id: "newcastle", name: "University of Newcastle", rank: "173 QS", tuition: "AUD $32,000 / yr", currency: "AUD", scholarship: "ASEAN / South Asia Grant", course: "Engineering & Health" },
    { id: "galway", name: "University of Galway", rank: "289 QS", tuition: "€16,500 / yr", currency: "EUR", scholarship: "Global Merit Scholarship", course: "Biomedical Science" },
    { id: "coventry", name: "Coventry University", rank: "Top 30 UK", tuition: "£16,800 / yr", currency: "GBP", scholarship: "International Academic Merit", course: "Business & Computing" },
  ];

  // Drag and drop timeline helpers
  const handleDragStart = (e: React.DragEvent, item: { id: string; text: string }, sourceCol: string) => {
    e.dataTransfer.setData("itemId", item.id);
    e.dataTransfer.setData("sourceCol", sourceCol);
  };

  const handleDrop = (e: React.DragEvent, targetCol: string) => {
    const itemId = e.dataTransfer.getData("itemId");
    const sourceCol = e.dataTransfer.getData("sourceCol");
    if (!itemId || !sourceCol || sourceCol === targetCol) return;

    let item: { id: string; text: string } | undefined;
    const removeFromCol = (colName: string, setFn: React.Dispatch<React.SetStateAction<Array<{ id: string; text: string }>>>) => {
      if (sourceCol === colName) {
        setFn((prev) => {
          const found = prev.find((i) => i.id === itemId);
          if (found) item = found;
          return prev.filter((i) => i.id !== itemId);
        });
      }
    };

    removeFromCol("backlog", setBacklog);
    removeFromCol("september", setSeptember);
    removeFromCol("january", setJanuary);
    removeFromCol("may", setMay);

    setTimeout(() => {
      if (!item) return;
      const addItem = item;
      const addToCol = (colName: string, setFn: React.Dispatch<React.SetStateAction<Array<{ id: string; text: string }>>>) => {
        if (targetCol === colName) setFn((prev) => [...prev, addItem]);
      };
      addToCol("backlog", setBacklog);
      addToCol("september", setSeptember);
      addToCol("january", setJanuary);
      addToCol("may", setMay);
    }, 10);
  };

  const handleCbSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCbSubmitted(true);
  };

  return (
    <PublicLayout onOpenConsultModal={() => handleOpenModal("Tools Page Header")}>
      {/* 1. Dramatic Authentic Black Hero Header with Seamless Scrim */}
      <section className="relative overflow-hidden min-h-[440px] lg:min-h-[480px] flex items-center bg-black text-white border-b border-neutral-800">
        {/* Full-bleed Real High-Resolution Campus Architecture Landscape */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <Image
            src="/universities/oxford_radcliffe_hero.webp"
            alt="International Academic Campus and Library Architecture"
            fill
            priority
            className="object-cover object-[center_35%] lg:object-[65%_35%]"
          />
          {/* Smooth seamless left scrim: provides authentic contrast directly on pure black canvas */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 via-50% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>

        <div className="container max-w-6xl mx-auto px-4 py-16 lg:py-20 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Plan Your Admissions, Budget &amp;{" "}
              <span className="text-emerald-400">Intake Roadmap</span>
            </h1>

            <p className="mt-5 text-sm sm:text-base text-neutral-200 leading-relaxed font-normal max-w-xl">
              Evaluate your academic eligibility across 500+ global universities, calculate true living costs in INR, compare study destinations side-by-side, and map your application milestones.
            </p>

            <div className="mt-10 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-neutral-200 text-xs font-medium">
              <div>
                <strong className="block text-white text-base font-extrabold">5 Core Tools</strong>
                <span className="text-neutral-400 text-[11px]">Free For All Students</span>
              </div>
              <div>
                <strong className="block text-emerald-400 text-base font-extrabold">Live Currency</strong>
                <span className="text-neutral-400 text-[11px]">USD, EUR, GBP to INR</span>
              </div>
              <div>
                <strong className="block text-white text-base font-extrabold">6 Destinations</strong>
                <span className="text-neutral-400 text-[11px]">PSW &amp; PR Benchmarks</span>
              </div>
              <div>
                <strong className="block text-white text-base font-extrabold">1-on-1 Review</strong>
                <span className="text-neutral-400 text-[11px]">Verified by Counsellors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Executive Tool Workspace */}
      <div className="bg-slate-50/80 min-h-screen py-12 sm:py-16 border-b border-slate-200/80">
        <div className="container max-w-6xl mx-auto px-4">
          
          {/* Executive Tabs Bar (Clean, pill buttons) */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs max-w-3xl mx-auto mb-10">
            <button
              type="button"
              onClick={() => setActiveTab("eligibility")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "eligibility"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Eligibility Checker
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("budget")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "budget"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Budget Calculator
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("comparison")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "comparison"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Country Comparison
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("uni-compare")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "uni-compare"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              University Matrix
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("timeline")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "timeline"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Intake Timeline
            </button>
          </div>

          {/* TAB 1: PROFILE ELIGIBILITY CHECKER */}
          {activeTab === "eligibility" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Input Card */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold mb-3">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Admissions Probability</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Academic Profile Inputs</h3>
                  <p className="text-xs text-slate-500 mt-1 mb-6">
                    Enter your scores to estimate admission probability across partner universities.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Target Destination Country
                      </label>
                      <select
                        value={eligCountry}
                        onChange={(e) => setEligCountry(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-hidden focus:border-emerald-600 focus:bg-white"
                      >
                        <option value="usa">United States</option>
                        <option value="germany">Germany</option>
                        <option value="uk">United Kingdom</option>
                        <option value="canada">Canada</option>
                        <option value="australia">Australia</option>
                        <option value="ireland">Ireland</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Bachelor's CGPA (Scale of 10) or %
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="e.g. 7.8"
                        value={eligCgpa}
                        onChange={(e) => setEligCgpa(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-hidden focus:border-emerald-600 focus:bg-white"
                      >
                      </input>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        IELTS / TOEFL Score
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        placeholder="e.g. 6.5 (or TOEFL 90)"
                        value={eligIelts}
                        onChange={(e) => setEligIelts(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-hidden focus:border-emerald-600 focus:bg-white"
                      >
                      </input>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={checkEligibility}
                  className="w-full mt-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  Evaluate Profile Matches
                </button>
              </div>

              {/* Output Results Card */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm min-h-[420px] flex flex-col justify-between">
                {!eligResult ? (
                  <div className="flex flex-col items-center justify-center my-auto py-12 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
                      <GraduationCap className="w-7 h-7" />
                    </div>
                    <h4 className="text-base font-bold text-slate-800">Ready to Analyze Your Profile</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed">
                      Enter your undergraduate score and language test results on the left to review matched universities with real fee estimates.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Admissions Tier</span>
                        <h4 className="text-lg font-extrabold text-slate-900">{eligResult.tierLabel}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-extrabold text-emerald-700">{eligResult.matchRate}%</span>
                        <span className="text-[11px] text-slate-500 block">Probability</span>
                      </div>
                    </div>

                    <div className="w-full h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-700 bg-emerald-600"
                        style={{ width: `${eligResult.matchRate}%` }} 
                      />
                    </div>

                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Recommended University Matches</h5>
                    <div className="space-y-3">
                      {eligResult.uniCards.map((uni, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-emerald-300 transition-all">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <span className="font-bold text-slate-900 text-sm">{uni.name}</span>
                              <span className="text-xs text-slate-400 ml-2">({uni.countryCode})</span>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                              {uni.rank}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200/60 mt-2">
                            <div>
                              <span className="text-slate-400 text-[11px]">Tuition:</span>{" "}
                              <strong className="text-slate-800">{uni.tuition}</strong>
                            </div>
                            <div>
                              <span className="text-slate-400 text-[11px]">Approx INR:</span>{" "}
                              <strong className="text-emerald-700">{uni.inr}</strong>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5 mt-2.5">
                            {uni.courses.map((c) => (
                              <span key={c} className="text-[10px] font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenModal(`Eligibility Review (${eligResult.matchRate}%)`)}
                      className="w-full mt-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                    >
                      Discuss These Matches with a UES Counselor
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: ANNUAL BUDGET & EXPENSE ESTIMATOR */}
          {activeTab === "budget" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Controls Card */}
              <div className="lg:col-span-6 bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold">
                    <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Annual Budget Variables</span>
                  </div>

                  <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setCalcCurrency("INR")}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        calcCurrency === "INR" ? "bg-white text-emerald-700 shadow-xs" : "text-slate-500"
                      }`}
                    >
                      INR (₹)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcCurrency("USD")}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        calcCurrency === "USD" ? "bg-white text-emerald-700 shadow-xs" : "text-slate-500"
                      }`}
                    >
                      USD ($)
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-6">Estimate Study Expenses</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Target Country
                    </label>
                    <select
                      value={calcCountry}
                      onChange={(e) => handleCountryBudgetChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-hidden focus:border-emerald-600 focus:bg-white"
                    >
                      <option value="usa">United States</option>
                      <option value="germany">Germany</option>
                      <option value="uk">United Kingdom</option>
                      <option value="canada">Canada</option>
                      <option value="australia">Australia</option>
                      <option value="ireland">Ireland</option>
                    </select>
                  </div>
                </div>

                {/* Variable Sliders */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Annual Tuition Fee</span>
                      <strong className="text-emerald-700">
                        {sym}{Math.round(tuition * rate).toLocaleString(calcCurrency === "INR" ? "en-IN" : "en-US")}
                      </strong>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="60000"
                      step="1000"
                      value={tuition}
                      onChange={(e) => setTuition(parseInt(e.target.value) || 0)}
                      className="w-full accent-emerald-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Living Expenses &amp; Rent</span>
                      <strong className="text-sky-700">
                        {sym}{Math.round(living * rate).toLocaleString(calcCurrency === "INR" ? "en-IN" : "en-US")}
                      </strong>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="25000"
                      step="500"
                      value={living}
                      onChange={(e) => setLiving(parseInt(e.target.value) || 0)}
                      className="w-full accent-sky-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Student Visa &amp; Health Insurance</span>
                      <strong className="text-teal-700">
                        {sym}{Math.round(visa * rate).toLocaleString(calcCurrency === "INR" ? "en-IN" : "en-US")}
                      </strong>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="4000"
                      step="100"
                      value={visa}
                      onChange={(e) => setVisa(parseInt(e.target.value) || 0)}
                      className="w-full accent-teal-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Flight Tickets &amp; Initial Setup</span>
                      <strong className="text-amber-700">
                        {sym}{Math.round(flights * rate).toLocaleString(calcCurrency === "INR" ? "en-IN" : "en-US")}
                      </strong>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      step="100"
                      value={flights}
                      onChange={(e) => setFlights(parseInt(e.target.value) || 0)}
                      className="w-full accent-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Total Summary Card */}
              <div className="lg:col-span-6 bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Total Estimated Annual Outlay
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                    {sym}{Math.ceil(totalCost * rate).toLocaleString(calcCurrency === "INR" ? "en-IN" : "en-US")}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Based on typical single student cost of attendance in {calcCountry.toUpperCase()}.
                  </p>

                  {/* Clean Stacked Bar */}
                  <div className="mt-8 mb-6">
                    <div className="w-full h-3 bg-slate-100 rounded-full flex overflow-hidden">
                      <div 
                        style={{ width: totalSliders > 0 ? `${(tuition / totalSliders) * 100}%` : "0%" }} 
                        className="bg-emerald-600"
                        title="Tuition"
                      />
                      <div 
                        style={{ width: totalSliders > 0 ? `${(living / totalSliders) * 100}%` : "0%" }} 
                        className="bg-sky-500"
                        title="Living"
                      />
                      <div 
                        style={{ width: totalSliders > 0 ? `${(visa / totalSliders) * 100}%` : "0%" }} 
                        className="bg-teal-500"
                        title="Visa & Insurance"
                      />
                      <div 
                        style={{ width: totalSliders > 0 ? `${(flights / totalSliders) * 100}%` : "0%" }} 
                        className="bg-amber-500"
                        title="Flights"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-semibold text-slate-700">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                        <span>Tuition: {Math.round((tuition / (totalSliders || 1)) * 100)}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0" />
                        <span>Living: {Math.round((living / (totalSliders || 1)) * 100)}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0" />
                        <span>Visa/Health: {Math.round((visa / (totalSliders || 1)) * 100)}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                        <span>Flights/Misc: {Math.round((flights / (totalSliders || 1)) * 100)}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
                    <div className="flex justify-between">
                      <span>Tuition Wire (SWIFT):</span>
                      <strong>{sym}{Math.round(tuition * rate).toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Living Expenses (GIC / Blocked A/C):</span>
                      <strong>{sym}{Math.round(living * rate).toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-200">
                      <span>Education Loan Eligible:</span>
                      <span className="text-emerald-700 font-bold">100% of Tuition &amp; Living</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenModal(`Budget Plan: ${sym}${Math.ceil(totalCost * rate).toLocaleString()}`)}
                  className="w-full mt-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  Discuss Loan &amp; Financial Planning with UES
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: DESTINATION BENCHMARKS COMPARISON */}
          {activeTab === "comparison" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countryComparisonData.map((c) => (
                <div
                  key={c.name}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-all"
                >
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 mb-4">
                      {c.name}
                    </h3>
                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="text-slate-400 text-[11px] block">Tuition Structure</span>
                        <strong className="text-slate-800">{c.tuition}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[11px] block">Living Cost Benchmark</span>
                        <span className="text-slate-700 font-medium">{c.living}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[11px] block">Post-Study Work (PSW)</span>
                        <strong className="text-emerald-700">{c.jobs}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[11px] block">Visa Framework</span>
                        <span className="text-slate-600">{c.visa}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[11px] block">Settlement &amp; PR Route</span>
                        <span className="text-slate-600">{c.pr}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[11px] block">Average Decision Time</span>
                        <span className="text-slate-700 font-semibold">{c.time}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenModal(`Country Benchmark (${c.name})`)}
                    className="w-full mt-6 py-2.5 rounded-xl bg-slate-50 hover:bg-emerald-600 hover:text-white border border-slate-200 text-slate-800 font-bold text-xs transition-all cursor-pointer"
                  >
                    Shortlist {c.name} Programs
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: UNIVERSITY SIDE-BY-SIDE MATRIX */}
          {activeTab === "uni-compare" && (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">University Side-by-Side Matrix</h3>
                  <p className="text-xs text-slate-500">Benchmark tuition fees, global rankings, and scholarships.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenModal("University Matrix Consultation")}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-xs self-start sm:self-auto cursor-pointer"
                >
                  Request Full University Directory
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-4 px-6">University Name</th>
                      <th className="py-4 px-6">World Rank</th>
                      <th className="py-4 px-6">Tuition Fee Benchmark</th>
                      <th className="py-4 px-6">Scholarship Opportunities</th>
                      <th className="py-4 px-6">Target Disciplines</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {universitiesMatrix.map((uni) => (
                      <tr key={uni.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-6 font-bold text-slate-900">{uni.name}</td>
                        <td className="py-4 px-6 font-semibold text-amber-700">#{uni.rank}</td>
                        <td className="py-4 px-6 font-semibold text-slate-800">{uni.tuition}</td>
                        <td className="py-4 px-6 text-emerald-700 font-medium">{uni.scholarship}</td>
                        <td className="py-4 px-6">
                          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold">
                            {uni.course}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: INTAKE TIMELINE PLANNER */}
          {activeTab === "timeline" && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Interactive Intake Milestone Sequence</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Drag milestones from the Backlog into your target intake season. Our counselors will convert this into your tailored calendar.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenModal("Custom Intake Timeline Planning")}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-xs shrink-0 cursor-pointer"
                >
                  Finalize Roadmap with Counselor
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Backlog Column */}
                <div
                  className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs min-h-[300px]"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, "backlog")}
                >
                  <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100 mb-3">
                    Milestones Backlog
                  </h5>
                  <div className="space-y-2.5">
                    {backlog.map((item) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item, "backlog")}
                        className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 text-xs font-medium text-slate-800 cursor-grab active:cursor-grabbing transition-all"
                      >
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* September Intake Column */}
                <div
                  className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs min-h-[300px]"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, "september")}
                >
                  <h5 className="text-xs font-bold text-emerald-800 uppercase tracking-wider pb-3 border-b border-emerald-100 mb-3">
                    Fall (Sep / Oct)
                  </h5>
                  <div className="space-y-2.5">
                    {september.length === 0 && (
                      <p className="text-[11px] text-slate-400 italic text-center py-8">Drop milestones here</p>
                    )}
                    {september.map((item) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item, "september")}
                        className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs font-semibold text-emerald-950 cursor-grab active:cursor-grabbing transition-all"
                      >
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* January Intake Column */}
                <div
                  className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs min-h-[300px]"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, "january")}
                >
                  <h5 className="text-xs font-bold text-sky-800 uppercase tracking-wider pb-3 border-b border-sky-100 mb-3">
                    Spring (Jan / Feb)
                  </h5>
                  <div className="space-y-2.5">
                    {january.length === 0 && (
                      <p className="text-[11px] text-slate-400 italic text-center py-8">Drop milestones here</p>
                    )}
                    {january.map((item) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item, "january")}
                        className="p-3 rounded-xl bg-sky-50/60 border border-sky-200 text-xs font-semibold text-sky-950 cursor-grab active:cursor-grabbing transition-all"
                      >
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* May Intake Column */}
                <div
                  className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs min-h-[300px]"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, "may")}
                >
                  <h5 className="text-xs font-bold text-amber-800 uppercase tracking-wider pb-3 border-b border-amber-100 mb-3">
                    Summer (May / Jun)
                  </h5>
                  <div className="space-y-2.5">
                    {may.length === 0 && (
                      <p className="text-[11px] text-slate-400 italic text-center py-8">Drop milestones here</p>
                    )}
                    {may.map((item) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item, "may")}
                        className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-semibold text-amber-950 cursor-grab active:cursor-grabbing transition-all"
                      >
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section: Executive Counselor Review Card */}
          <section className="mt-16 pt-12 border-t border-slate-200/80">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Free Profile Evaluation</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Discuss Your Results with an Advisor
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Automated tools provide estimates. Our certified counselors evaluate backlogs, work experience, university fee waivers, and visa interview strategies free of cost.
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Free 1-on-1 counseling for all UES Abroad students</span>
                  </div>
                </div>

                <div className="md:col-span-6">
                  {cbSubmitted ? (
                    <div className="bg-emerald-50/80 rounded-2xl p-6 text-center border border-emerald-200/80">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                      <h4 className="font-bold text-slate-900 text-sm">Request Received</h4>
                      <p className="text-xs text-slate-600 mt-1">Our advisory team will reach out via WhatsApp/phone shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleCbSubmit} className="space-y-3 bg-slate-50/80 p-6 rounded-2xl border border-slate-200/70">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name *"
                          value={cbName}
                          onChange={(e) => setCbName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number (WhatsApp) *"
                          value={cbPhone}
                          onChange={(e) => setCbPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                        />
                        <select
                          value={cbCountry}
                          onChange={(e) => setCbCountry(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs focus:outline-hidden focus:border-emerald-600"
                        >
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Germany">Germany</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                          <option value="Ireland">Ireland</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                      >
                        Request Free Evaluation Call
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      <LeadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        source={modalSource}
      />
    </PublicLayout>
  );
}
