"use client";

import React, { useState } from "react";

interface DecisionSectionProps {
  onOpenConsultModal?: (source?: string) => void;
}

export function DecisionSection({ onOpenConsultModal }: DecisionSectionProps) {
  const [activeTab, setActiveTab] = useState<"eligibility" | "budget" | "comparison" | "uni-compare" | "timeline">("eligibility");

  // Tab 1 State
  const [eligCountry, setEligCountry] = useState("usa");
  const [eligCgpa, setEligCgpa] = useState("");
  const [eligIelts, setEligIelts] = useState("");
  const [eligResult, setEligResult] = useState<{ matchRate: number; color: string; ieltsVal: string; uniCards: { name: string; flag: string; rank: string; tuition: string; inr: string; courses: string[] }[] } | null>(null);

  // Tab 2 State
  const [calcCountry, setCalcCountry] = useState("usa");
  const [calcCourse, setCalcCourse] = useState("computer_science");
  const [calcDuration, setCalcDuration] = useState(24);
  const [calcCurrency, setCalcCurrency] = useState("USD");
  const [tuition, setTuition] = useState(25000);
  const [living, setLiving] = useState(12000);
  const [visa, setVisa] = useState(1500);
  const [flights, setFlights] = useState(1000);

  // Tab 5 State (Timeline)
  const [backlog, setBacklog] = useState([
    { id: "ms-exams", text: "1. IELTS / GRE / Duolingo Exams" },
    { id: "ms-sop", text: "2. SOP & LOR Draft Finalization" },
    { id: "ms-apply", text: "3. Submit Application & Fee Waivers" },
    { id: "ms-offer", text: "4. Receive Offer Letter & Deposit" },
    { id: "ms-finance", text: "5. Blocked Account & Loan Setup" },
    { id: "ms-visa", text: "6. Embassy Visa Interview Drill" },
    { id: "ms-flight", text: "7. Flight Booking & Pre-Departure" }
  ]);
  const [september, setSeptember] = useState<Array<{ id: string; text: string }>>([]);
  const [january, setJanuary] = useState<Array<{ id: string; text: string }>>([]);
  const [may, setMay] = useState<Array<{ id: string; text: string }>>([]);

  const checkEligibility = () => {
    const cgpaNum = parseFloat(eligCgpa) || 7.5;
    const ieltsNum = parseFloat(eligIelts) || 6.5;

    const uniMap: Record<string, Record<string, { name: string; flag: string; rank: string; tuition: string; inr: string; courses: string[] }[]>> = {
      high: {
        germany: [
          { name: "TU Munich", flag: "🇩🇪", rank: "37 QS", tuition: "€0 / yr", inr: "₹0 (Free)", courses: ["Robotics", "Automotive Eng"] },
          { name: "RWTH Aachen", flag: "🇩🇪", rank: "106 QS", tuition: "€0 / yr", inr: "₹0 (Free)", courses: ["Mechanical Eng", "CS"] },
        ],
        uk: [
          { name: "University of Oxford", flag: "🇬🇧", rank: "3 QS", tuition: "£36,000 / yr", inr: "≈ ₹38L / yr", courses: ["Computer Science", "MBA"] },
          { name: "Imperial College London", flag: "🇬🇧", rank: "6 QS", tuition: "£32,000 / yr", inr: "≈ ₹34L / yr", courses: ["FinTech", "Business Analytics"] },
        ],
        australia: [
          { name: "University of Melbourne", flag: "🇦🇺", rank: "14 QS", tuition: "AUD $44,000 / yr", inr: "≈ ₹24L / yr", courses: ["Business Analytics", "IT"] },
          { name: "UNSW Sydney", flag: "🇦🇺", rank: "19 QS", tuition: "AUD $48,000 / yr", inr: "≈ ₹26L / yr", courses: ["Engineering", "CS"] },
        ],
        canada: [
          { name: "University of Toronto", flag: "🇨🇦", rank: "21 QS", tuition: "CAD $38,000 / yr", inr: "≈ ₹23L / yr", courses: ["Engineering", "MBA"] },
          { name: "UBC Vancouver", flag: "🇨🇦", rank: "34 QS", tuition: "CAD $35,000 / yr", inr: "≈ ₹21L / yr", courses: ["CS", "Sustainability"] },
        ],
        usa: [
          { name: "Boston University", flag: "🇺🇸", rank: "93 QS", tuition: "$58,000 / yr", inr: "≈ ₹48L / yr", courses: ["Data Science", "CS"] },
          { name: "Northeastern University", flag: "🇺🇸", rank: "346 QS", tuition: "$54,000 / yr", inr: "≈ ₹45L / yr", courses: ["CS", "STEM OPT"] },
        ],
      },
      mid: {
        germany: [
          { name: "TU Berlin", flag: "🇩🇪", rank: "154 QS", tuition: "€0 / yr", inr: "₹0 (Free)", courses: ["Engineering", "Physics"] },
          { name: "University of Stuttgart", flag: "🇩🇪", rank: "348 QS", tuition: "€0 / yr", inr: "₹0 (Free)", courses: ["Automotive", "Aerospace"] },
        ],
        uk: [
          { name: "University of Manchester", flag: "🇬🇧", rank: "32 QS", tuition: "£24,000 / yr", inr: "≈ ₹25L / yr", courses: ["Business", "CS"] },
          { name: "King's College London", flag: "🇬🇧", rank: "40 QS", tuition: "£28,000 / yr", inr: "≈ ₹30L / yr", courses: ["Law", "FinTech"] },
        ],
        australia: [
          { name: "Monash University", flag: "🇦🇺", rank: "37 QS", tuition: "AUD $40,000 / yr", inr: "≈ ₹22L / yr", courses: ["Pharmacy", "Engineering"] },
          { name: "University of Sydney", flag: "🇦🇺", rank: "18 QS", tuition: "AUD $42,000 / yr", inr: "≈ ₹23L / yr", courses: ["Medicine", "Business"] },
        ],
        canada: [
          { name: "McGill University", flag: "🇨🇦", rank: "30 QS", tuition: "CAD $28,000 / yr", inr: "≈ ₹17L / yr", courses: ["Medicine", "Law"] },
          { name: "University of Waterloo", flag: "🇨🇦", rank: "112 QS", tuition: "CAD $32,000 / yr", inr: "≈ ₹20L / yr", courses: ["CS", "Engineering"] },
        ],
        usa: [
          { name: "Purdue University", flag: "🇺🇸", rank: "99 QS", tuition: "$28,000 / yr", inr: "≈ ₹23L / yr", courses: ["Engineering", "Aviation"] },
          { name: "UT Austin", flag: "🇺🇸", rank: "67 QS", tuition: "$32,000 / yr", inr: "≈ ₹27L / yr", courses: ["CS", "Business"] },
        ],
      },
      low: {
        germany: [{ name: "Partner Pathway Programs", flag: "🇩🇪", rank: "Partner", tuition: "€0 - €2,000 / yr", inr: "₹0 - ₹2L", courses: ["Foundation", "Bridge Courses"] }],
        uk: [{ name: "Global Partner Colleges", flag: "🇬🇧", rank: "Partner", tuition: "£10,000 - £16,000 / yr", inr: "≈ ₹10-17L", courses: ["Pathway", "Foundation"] }],
        australia: [{ name: "Partner State Universities", flag: "🇦🇺", rank: "Partner", tuition: "AUD $22,000 / yr", inr: "≈ ₹12L", courses: ["Pathway", "Diploma"] }],
        canada: [{ name: "Canadian Community Colleges", flag: "🇨🇦", rank: "Partner", tuition: "CAD $15,000 / yr", inr: "≈ ₹9L", courses: ["Technology", "Business"] }],
        usa: [{ name: "State University Network", flag: "🇺🇸", rank: "Partner", tuition: "$18,000 / yr", inr: "≈ ₹15L", courses: ["Liberal Arts", "Business"] }],
      },
    };

    let tier: "high" | "mid" | "low" = "low";
    let matchRate = 68;
    let color = "#ff9800";
    if (cgpaNum >= 8.5 && ieltsNum >= 7.5) { tier = "high"; matchRate = 94; color = "#00C853"; }
    else if (cgpaNum >= 7.5 && ieltsNum >= 6.5) { tier = "mid"; matchRate = 82; color = "#3B5BDB"; }

    const country = eligCountry as keyof typeof uniMap.high;
    const uniCards = (uniMap[tier][country] || uniMap[tier].usa);
    setEligResult({ matchRate, color, ieltsVal: ieltsNum.toString(), uniCards });
  };

  const handleCountryChange = (val: string) => {
    setCalcCountry(val);
    if (val === "germany") {
      setTuition(0);
      setLiving(11208);
      setVisa(150);
    } else if (val === "uk") {
      setTuition(22000);
      setLiving(13000);
      setVisa(800);
    } else if (val === "canada") {
      setTuition(24000);
      setLiving(15000);
      setVisa(300);
    } else if (val === "australia") {
      setTuition(35000);
      setLiving(24000);
      setVisa(700);
    } else {
      setTuition(28000);
      setLiving(14000);
      setVisa(500);
    }
  };

  const totalCost = tuition + living + visa + flights;
  const rate = calcCurrency === "INR" ? 83.5 : 1;
  const sym = calcCurrency === "INR" ? "₹" : "$";
  const totalSliders = tuition + living + visa + flights;

  const countryComparisonData = [
    { name: "Germany", tuition: "€0 (Public Universities)", living: "€11,208 / yr (Blocked A/C)", visa: "High Success (APS Mandatory)", jobs: "18 Months Job Seeker Visa", pr: "Eligible after 2-3 years work", time: "6 - 8 Weeks" },
    { name: "United States", tuition: "$25,000 - $55,000 / yr", living: "$12,000 - $18,000 / yr", visa: "F-1 Interview Required", jobs: "3 Years STEM OPT", pr: "H-1B to Green Card Pathway", time: "4 - 6 Weeks" },
    { name: "United Kingdom", tuition: "£14,000 - £26,000 / yr", living: "£12,000 - £15,000 / yr", visa: "Points Based (CAS Required)", jobs: "2 Years Graduate Route", pr: "Skilled Worker Visa (5 yrs)", time: "3 - 4 Weeks" },
    { name: "Canada", tuition: "CAD $18,000 - $35,000 / yr", living: "CAD $20,635 / yr (GIC)", visa: "SDS Stream Available", jobs: "Up to 3 Years PGWP", pr: "Express Entry / PNP (Highest PR)", time: "4 - 8 Weeks" },
    { name: "Australia", tuition: "AUD $25,000 - $45,000 / yr", living: "AUD $24,505 / yr", visa: "Genuine Student (GS) Test", jobs: "Up to 4 Years Post-Study Work", pr: "PR Points System Available", time: "3 - 6 Weeks" },
    { name: "Ireland", tuition: "€10,000 - €22,000 / yr", living: "€10,000 - €12,000 / yr", visa: "High Visa Approval Rate", jobs: "2 Years Stay Back Option", pr: "Critical Skills Employment Permit", time: "4 - 6 Weeks" }
  ];

  const universitiesData = [
    { id: "tum", name: "Technical University of Munich", rank: "37 QS", tuition: 0, currency: "EUR", scholarship: "DAAD Grants (100% Waiver)", course: "Engineering" },
    { id: "bu", name: "Boston University", rank: "93 QS", tuition: 58000, currency: "USD", scholarship: "Merit Fellowship ($15k Off)", course: "Computer Science" },
    { id: "melb", name: "University of Melbourne", rank: "14 QS", tuition: 44000, currency: "AUD", scholarship: "Group of Eight Award (25%)", course: "Business Analytics" },
    { id: "oxford", name: "University of Oxford", rank: "3 QS", tuition: 36000, currency: "GBP", scholarship: "Clarendon Scholarship (Full)", course: "Computer Science" },
    { id: "toronto", name: "University of Toronto", rank: "21 QS", tuition: 38000, currency: "CAD", scholarship: "President's Scholars ($20k)", course: "Engineering" }
  ];

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

  return (
    <section id="decision-section" className="decision-wrap py-20 bg-white border-b border-slate-200/60">
      <div className="container">
        <div className="section-header">
          <h2>Smart Decision Center</h2>
          <p>Use our interactive tools to calculate costs, check visa requirements, and sequence milestones.</p>
        </div>

        {/* Interactive Tabs Navigation matching exact Screenshot 5 (5 Tabs) */}
        <div className="decision-tabs-bar flex-wrap !max-w-4xl !gap-1.5 !p-1.5 !mb-10 mx-auto">
          <button className={`decision-tab-btn ${activeTab === "eligibility" ? "active" : ""}`} onClick={() => setActiveTab("eligibility")}>
            <span>🎓</span> Eligibility Checker
          </button>
          <button className={`decision-tab-btn ${activeTab === "budget" ? "active" : ""}`} onClick={() => setActiveTab("budget")}>
            <span>💰</span> Budget Calculator
          </button>
          <button className={`decision-tab-btn ${activeTab === "comparison" ? "active" : ""}`} onClick={() => setActiveTab("comparison")}>
            <span>⚖️</span> Country Comparison
          </button>
          <button className={`decision-tab-btn ${activeTab === "uni-compare" ? "active" : ""}`} onClick={() => setActiveTab("uni-compare")}>
            <span>🏫</span> University Comparison
          </button>
          <button className={`decision-tab-btn ${activeTab === "timeline" ? "active" : ""}`} onClick={() => setActiveTab("timeline")}>
            <span>🗓️</span> Intake Timeline
          </button>
        </div>

        {/* TAB 1: ELIGIBILITY CHECKER */}
        {activeTab === "eligibility" && (
          <div className="decision-content-pane active" id="tool-eligibility">
            <div className="checker-layout-grid">
              <div className="glass-card bg-slate-50/80 border border-slate-200/80 shadow-sm flex flex-col justify-between h-full">
                <div>
                  <h3 className="pane-title text-slate-900">Academic Profile &amp; Exam Readiness</h3>
                  <p className="text-xs text-slate-500 mb-4">Enter your academic scores to evaluate admissions probability.</p>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Target Country</label>
                      <select value={eligCountry} onChange={(e) => setEligCountry(e.target.value)} className="form-control">
                        <option value="usa">United States</option>
                        <option value="germany">Germany</option>
                        <option value="uk">United Kingdom</option>
                        <option value="canada">Canada</option>
                        <option value="australia">Australia</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Bachelor CGPA (out of 10)</label>
                      <input type="number" step="0.1" placeholder="e.g. 8.2" value={eligCgpa} onChange={(e) => setEligCgpa(e.target.value)} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>IELTS / TOEFL Score</label>
                      <input type="number" step="0.5" placeholder="e.g. 7.5" value={eligIelts} onChange={(e) => setEligIelts(e.target.value)} className="form-control" />
                    </div>
                  </div>
                </div>
                <button className="btn-primary-glow w-full mt-6" onClick={checkEligibility}>Evaluate Profile Matches</button>
              </div>

              <div className="glass-card bg-slate-50/80 border border-slate-200/80 shadow-sm flex flex-col justify-between h-full items-center justify-center">
                {!eligResult ? (
                  <div className="empty-state text-center p-8">
                    <span className="text-4xl block mb-3">📊</span>
                    <h4 className="text-lg font-bold text-slate-800">Analyze Profile to View Results</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">Fill in your scores on the left to see matched universities with fees and courses.</p>
                  </div>
                ) : (
                  <div className="w-full flex flex-col h-full">
                    {/* Match score bar */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="pane-title text-slate-900 mb-0">Matched Universities</h3>
                      <span className="text-2xl font-extrabold" style={{ color: eligResult.color }}>{eligResult.matchRate}% Match</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full mb-5 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${eligResult.matchRate}%`, background: eligResult.color }} />
                    </div>

                    {/* University cards */}
                    <div className="space-y-3 flex-1 overflow-y-auto">
                      {eligResult.uniCards.map((u, i) => (
                        <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-primary/40 transition-all">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <span className="text-base mr-1">{u.flag}</span>
                              <span className="font-bold text-slate-900 text-sm">{u.name}</span>
                            </div>
                            <span className="shrink-0 text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">🏆 {u.rank}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                            <div><span className="text-slate-400">Tuition</span><br /><strong className="text-slate-800">{u.tuition}</strong></div>
                            <div><span className="text-slate-400">In INR</span><br /><strong className="text-emerald-600">{u.inr}</strong></div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {u.courses.map((c) => <span key={c} className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{c}</span>)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <button 
                      className="btn-primary-glow w-full mt-4 shrink-0" 
                      onClick={() => onOpenConsultModal && onOpenConsultModal(`Start My Journey • Profile Match (${eligResult.matchRate}%)`)}
                    >
                      Start My Journey
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BUDGET ESTIMATOR */}
        {activeTab === "budget" && (
          <div className="decision-content-pane active" id="tool-budget">
            <div className="checker-layout-grid">
              <div className="glass-card bg-slate-50/80 border border-slate-200/80 shadow-sm flex flex-col justify-between h-full">
                <div>
                  <h3 className="pane-title text-slate-900">Annual Expense Estimator</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Destination Country</label>
                      <select value={calcCountry} onChange={(e) => handleCountryChange(e.target.value)} className="form-control bg-white">
                        <option value="usa">United States</option>
                        <option value="germany">Germany</option>
                        <option value="uk">United Kingdom</option>
                        <option value="canada">Canada</option>
                        <option value="australia">Australia</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Target Course</label>
                      <select value={calcCourse} onChange={(e) => setCalcCourse(e.target.value)} className="form-control bg-white">
                        <option value="computer_science">MS in Computer Science</option>
                        <option value="mba">Master of Business Admin (MBA)</option>
                        <option value="engineering">MS in Engineering</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Duration (Months)</label>
                      <input type="number" value={calcDuration} onChange={(e) => setCalcDuration(parseInt(e.target.value) || 24)} className="form-control bg-white" />
                    </div>
                    <div className="form-group">
                      <label>Currency</label>
                      <select value={calcCurrency} onChange={(e) => setCalcCurrency(e.target.value)} className="form-control bg-white">
                        <option value="USD">USD ($)</option>
                        <option value="INR">INR (₹)</option>
                      </select>
                    </div>
                  </div>

                  <div className="slider-variables-box mt-6 space-y-4">
                    <div className="slider-group">
                      <div className="slider-label flex justify-between text-xs font-semibold text-slate-700"><span>Tuition Fees</span> <strong className="text-primary">{sym}{(tuition * rate).toLocaleString(calcCurrency === "INR" ? "en-IN" : "en-US")}</strong></div>
                      <input type="range" min="0" max="60000" step="1000" value={tuition} onChange={(e) => setTuition(parseInt(e.target.value) || 0)} className="w-full accent-primary" />
                    </div>
                    <div className="slider-group">
                      <div className="slider-label flex justify-between text-xs font-semibold text-slate-700"><span>Living Expenses</span> <strong className="text-sky-600">{sym}{(living * rate).toLocaleString(calcCurrency === "INR" ? "en-IN" : "en-US")}</strong></div>
                      <input type="range" min="0" max="25000" step="500" value={living} onChange={(e) => setLiving(parseInt(e.target.value) || 0)} className="w-full accent-sky-600" />
                    </div>
                    <div className="slider-group">
                      <div className="slider-label flex justify-between text-xs font-semibold text-slate-700"><span>Visa &amp; Insurance</span> <strong className="text-emerald-600">{sym}{(visa * rate).toLocaleString(calcCurrency === "INR" ? "en-IN" : "en-US")}</strong></div>
                      <input type="range" min="0" max="5000" step="100" value={visa} onChange={(e) => setVisa(parseInt(e.target.value) || 0)} className="w-full accent-emerald-600" />
                    </div>
                    <div className="slider-group">
                      <div className="slider-label flex justify-between text-xs font-semibold text-slate-700"><span>Flights &amp; Misc</span> <strong className="text-amber-500">{sym}{(flights * rate).toLocaleString(calcCurrency === "INR" ? "en-IN" : "en-US")}</strong></div>
                      <input type="range" min="0" max="5000" step="100" value={flights} onChange={(e) => setFlights(parseInt(e.target.value) || 0)} className="w-full accent-amber-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card bg-slate-50/80 border border-slate-200/80 shadow-sm flex flex-col justify-between h-full">
                <div>
                  <h3 className="pane-title text-slate-900">Annual Budget Breakdown</h3>
                  <div className="py-6 border-b border-slate-100">
                    <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Total Estimated Budget / Year</span>
                    <h2 className="text-4xl font-extrabold text-slate-900">{sym}{Math.ceil(totalCost * rate).toLocaleString(calcCurrency === "INR" ? "en-IN" : "en-US")}</h2>
                  </div>

                  <div className="my-6">
                    <div className="w-full h-4 bg-slate-100 rounded-full flex overflow-hidden">
                      <div style={{ background: "#3B5BDB", width: totalSliders > 0 ? `${(tuition / totalSliders) * 100}%` : "0%" }} title="Tuition" />
                      <div style={{ background: "#7C4DFF", width: totalSliders > 0 ? `${(living / totalSliders) * 100}%` : "0%" }} title="Living" />
                      <div style={{ background: "#00C853", width: totalSliders > 0 ? `${(visa / totalSliders) * 100}%` : "0%" }} title="Visa" />
                      <div style={{ background: "#ff9800", width: totalSliders > 0 ? `${(flights / totalSliders) * 100}%` : "0%" }} title="Flights" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-semibold text-slate-600">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#3B5BDB]" /> Tuition</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#7C4DFF]" /> Living</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#00C853]" /> Visa/Insurance</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#ff9800]" /> Flights/Misc</span>
                    </div>
                  </div>
                </div>

                <button 
                  className="btn-primary-glow w-full" 
                  onClick={() => onOpenConsultModal && onOpenConsultModal(`Start My Journey • Budget Plan (${sym}${Math.ceil(totalCost * rate).toLocaleString(calcCurrency === "INR" ? "en-IN" : "en-US")})`)}
                >
                  Start My Journey
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COUNTRY COMPARISON */}
        {activeTab === "comparison" && (
          <div className="decision-content-pane active" id="tool-comparison">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {countryComparisonData.map((item) => (
                <div key={item.name} className="glass-card bg-slate-50/80 border border-slate-200/80 shadow-sm flex flex-col justify-between h-full hover:bg-white hover:border-emerald-500/40 hover:shadow-md transition-all">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-primary pb-3 border-b border-slate-100 mb-4">{item.name}</h3>
                    <div className="space-y-3 text-xs text-slate-600">
                      <div className="flex justify-between"><strong className="text-slate-800">Tuition:</strong> <span>{item.tuition}</span></div>
                      <div className="flex justify-between"><strong className="text-slate-800">Living:</strong> <span>{item.living}</span></div>
                      <div className="flex justify-between"><strong className="text-slate-800">Visa Type:</strong> <span>{item.visa}</span></div>
                      <div className="flex justify-between"><strong className="text-slate-800">Post-Study Work:</strong> <span className="font-semibold text-emerald-600">{item.jobs}</span></div>
                      <div className="flex justify-between"><strong className="text-slate-800">PR Pathway:</strong> <span>{item.pr}</span></div>
                      <div className="flex justify-between"><strong className="text-slate-800">Processing Time:</strong> <span>{item.time}</span></div>
                    </div>
                  </div>
                  <button 
                    className="btn-primary-glow w-full mt-6" 
                    onClick={() => onOpenConsultModal && onOpenConsultModal(`Start My Journey • Country Compare (${item.name})`)}
                  >
                    Start My Journey
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: UNIVERSITY COMPARISON MATRIX */}
        {activeTab === "uni-compare" && (
          <div className="decision-content-pane active" id="tool-uni-compare">
            <div className="glass-card bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="pane-title text-slate-900 mb-0">University Side-by-Side Matrix</h3>
                <button 
                  className="btn-primary-glow !py-2 !px-4 text-xs" 
                  onClick={() => onOpenConsultModal && onOpenConsultModal("Start My Journey • Matrix Selection")}
                >
                  Start My Journey
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="comparison-matrix-table w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs uppercase font-bold text-slate-400 bg-slate-50">
                      <th className="p-3">University Name</th>
                      <th className="p-3">QS World Rank</th>
                      <th className="p-3">Tuition Fee Structure</th>
                      <th className="p-3">Scholarship Type</th>
                      <th className="p-3">Target Discipline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {universitiesData.map((uni) => (
                      <tr key={uni.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3 font-bold text-slate-900">{uni.name}</td>
                        <td className="p-3 font-semibold text-amber-600">🏆 {uni.rank}</td>
                        <td className="p-3">{uni.tuition === 0 ? "Free (€0)" : `${uni.currency} $${uni.tuition.toLocaleString("en-US")} / year`}</td>
                        <td className="p-3 font-medium text-emerald-600">🎁 {uni.scholarship}</td>
                        <td className="p-3"><span className="px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-semibold">{uni.course}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: TIMELINE MILESTONES DRAG & DROP */}
        {activeTab === "timeline" && (
          <div className="decision-content-pane active" id="tool-timeline">
            <div className="timeline-instructions-box bg-primary/5 border border-primary/20 p-4 rounded-xl text-xs text-primary font-medium mb-6 flex justify-between items-center">
              <div>
                <strong>Timeline Planner:</strong> Drag milestone cards from the Backlog into your target intake season. Our counsellors will build your personalized roadmap.
              </div>
              <button 
                className="btn-primary-glow !py-2 !px-4 text-xs whitespace-nowrap ml-4" 
                onClick={() => onOpenConsultModal && onOpenConsultModal("Start My Journey • Intake Roadmap")}
              >
                Start My Journey
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div 
                className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 min-h-[250px]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "backlog")}
              >
                <h4 className="text-sm font-bold text-slate-700 mb-3 pb-2 border-b border-slate-200">📌 Milestones Backlog</h4>
                <div className="space-y-2.5">
                  {backlog.map((item) => (
                    <div key={item.id} className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-700 cursor-grab active:cursor-grabbing hover:border-primary/40 transition-all" draggable onDragStart={(e) => handleDragStart(e, item, "backlog")}>{item.text}</div>
                  ))}
                </div>
              </div>

              <div 
                className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 min-h-[250px]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "september")}
              >
                <h4 className="text-sm font-bold text-slate-700 mb-3 pb-2 border-b border-slate-200">🍂 September Intake</h4>
                <div className="space-y-2.5">
                  {september.map((item) => (
                    <div key={item.id} className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-700 cursor-grab active:cursor-grabbing hover:border-primary/40 transition-all" draggable onDragStart={(e) => handleDragStart(e, item, "september")}>{item.text}</div>
                  ))}
                </div>
              </div>

              <div 
                className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 min-h-[250px]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "january")}
              >
                <h4 className="text-sm font-bold text-slate-700 mb-3 pb-2 border-b border-slate-200">❄️ January Intake</h4>
                <div className="space-y-2.5">
                  {january.map((item) => (
                    <div key={item.id} className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-700 cursor-grab active:cursor-grabbing hover:border-primary/40 transition-all" draggable onDragStart={(e) => handleDragStart(e, item, "january")}>{item.text}</div>
                  ))}
                </div>
              </div>

              <div 
                className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 min-h-[250px]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "may")}
              >
                <h4 className="text-sm font-bold text-slate-700 mb-3 pb-2 border-b border-slate-200">🌸 May Intake</h4>
                <div className="space-y-2.5">
                  {may.map((item) => (
                    <div key={item.id} className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-700 cursor-grab active:cursor-grabbing hover:border-primary/40 transition-all" draggable onDragStart={(e) => handleDragStart(e, item, "may")}>{item.text}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
