"use client";

import React, { useState } from "react";

interface ExamCenterSectionProps {
  onOpenConsultModal?: (source?: string) => void;
}

const examsData = [
  {
    id: "ielts",
    name: "IELTS Academic",
    badge: "🇬🇧 UK / 🇦🇺 AU / 🇨🇦 CA",
    overview: "The International English Language Testing System is the world's most popular English language proficiency test for global higher education.",
    eligibility: "Anyone seeking international higher education or professional registration abroad.",
    targetScore: "7.0+ Overall (Min 6.5 in each band)",
    countries: "UK, Australia, Canada, USA, Ireland, New Zealand, Germany",
    officialUrl: "https://www.ielts.org",
    youtubeUrl: "https://www.youtube.com/results?search_query=IELTS+Official+Preparation+Tips",
    practiceCount: "12 Free Mock Tests • 40+ Speaking Drills",
    tips: "Focus on academic vocabulary and time management during the Reading section."
  },
  {
    id: "toefl",
    name: "TOEFL iBT",
    badge: "🇺🇸 USA / 🇨🇦 CA",
    overview: "Test of English as a Foreign Language evaluates English proficiency specifically for academic classroom settings in North America.",
    eligibility: "International applicants targeting US and Canadian universities.",
    targetScore: "100+ out of 120 (Min 25 in Writing/Speaking)",
    countries: "USA, Canada, Germany, France, UAE",
    officialUrl: "https://www.ets.org/toefl",
    youtubeUrl: "https://www.youtube.com/results?search_query=TOEFL+iBT+Official+Preparation",
    practiceCount: "8 ETS Official Practice Sets",
    tips: "Practice integrated speaking tasks by summarizing short lectures."
  },
  {
    id: "gre",
    name: "GRE General Test",
    badge: "🇺🇸 USA / 🇩🇪 DE (STEM)",
    overview: "Graduate Record Examinations measures verbal reasoning, quantitative reasoning, and critical writing skills for STEM & Master's programs.",
    eligibility: "Bachelor's degree graduates applying for MS/PhD programs abroad.",
    targetScore: "320+ (165+ Quant for STEM Degrees)",
    countries: "USA, Germany (TU Munich/RWTH), Canada, Singapore",
    officialUrl: "https://www.ets.org/gre",
    youtubeUrl: "https://www.youtube.com/results?search_query=GRE+Official+Preparation+ETS",
    practiceCount: "15 Quant Drills • 500+ Vocabulary Flashcards",
    tips: "Master high-frequency vocabulary and practice timed quantitative data analysis."
  },
  {
    id: "gmat",
    name: "GMAT Focus Edition",
    badge: "🌍 Global MBA & Finance",
    overview: "The Graduate Management Admission Test is specifically tailored for business schools, evaluating executive reasoning and data insights.",
    eligibility: "Applicants targeting MBA, Master of Finance, and Management programs.",
    targetScore: "650+ (700+ for Top 20 Global B-Schools)",
    countries: "USA, UK (Oxford/LBS), France (INSEAD/HEC), Canada",
    officialUrl: "https://www.mba.com",
    youtubeUrl: "https://www.youtube.com/results?search_query=GMAT+Focus+Edition+Official+Prep",
    practiceCount: "10 Executive Reasoning Sets • 5 Mock Exams",
    tips: "Focus heavily on the new Data Insights section and critical reasoning logic."
  },
  {
    id: "duolingo",
    name: "Duolingo English Test (DET)",
    badge: "⚡ Fast 1-Hour Test",
    overview: "An online, adaptive English proficiency test taken from home. Widely accepted across North America and European institutions.",
    eligibility: "Students seeking a fast, affordable alternative to IELTS/TOEFL.",
    targetScore: "125+ out of 160",
    countries: "USA (3000+ Unis), Canada, Ireland, Germany",
    officialUrl: "https://englishtest.duolingo.com",
    youtubeUrl: "https://www.youtube.com/results?search_query=Duolingo+English+Test+Official+Guide",
    practiceCount: "Unlimited 15-Minute Practice Runs",
    tips: "Ensure a quiet room with good lighting and type as much detail as possible in photo descriptions."
  },
  {
    id: "german",
    name: "German Language (A1 - C1)",
    badge: "🇩🇪 Germany Free Tuition",
    overview: "Goethe-Zertifikat / TestDaF proficiency is essential for public university admission and smooth social integration in Germany.",
    eligibility: "Students targeting German public universities or job seeker visas.",
    targetScore: "B2 / C1 for German-taught • A1/A2 for English-taught",
    countries: "Germany, Austria, Switzerland",
    officialUrl: "https://www.goethe.de",
    youtubeUrl: "https://www.youtube.com/results?search_query=Goethe+Institut+Official+German+Learning",
    practiceCount: "20 Grammar Modules • Goethe Mock Papers",
    tips: "Practice noun genders (der/die/das) daily and engage in German listening exercises."
  },
  {
    id: "french",
    name: "French Language (DELF / DALF)",
    badge: "🇫🇷 France & Canada (PR)",
    overview: "Official diploma awarded by the French Ministry of Education. Highly valuable for French Grandes Écoles and Canadian Express Entry PR bonus points.",
    eligibility: "Students studying in France or seeking Canadian immigration advantages.",
    targetScore: "B2 for University Admission • CLB 7 for Canada PR",
    countries: "France, Canada (Quebec & Federal PR), Switzerland",
    officialUrl: "https://www.france-education-international.fr",
    youtubeUrl: "https://www.youtube.com/results?search_query=DELF+B2+Official+Preparation+France",
    practiceCount: "15 Oral Comprehension Tests • DELF Practice",
    tips: "Focus on oral expression and formal French letter writing conventions."
  },
  {
    id: "sat",
    name: "SAT & ACT Digital",
    badge: "🎓 US Undergraduate",
    overview: "Standardized entrance exams required for undergraduate (Bachelor's) admissions and merit scholarships at top US colleges.",
    eligibility: "High school students (Grade 11/12) applying for Bachelor's degrees.",
    targetScore: "1400+ out of 1600 (SAT) / 32+ (ACT)",
    countries: "USA, Canada, Singapore, UAE",
    officialUrl: "https://www.collegeboard.org",
    youtubeUrl: "https://www.youtube.com/results?search_query=Digital+SAT+Official+CollegeBoard+Prep",
    practiceCount: "8 Official Bluebook Digital Mocks",
    tips: "Utilize Desmos graphing calculator shortcuts effectively on the digital math section."
  },
  {
    id: "pte",
    name: "PTE Academic",
    badge: "🤖 AI-Scored Fast Results",
    overview: "Pearson Test of English Academic is a computer-based English language test assessed entirely by AI, delivering results in 48 hours.",
    eligibility: "Students and immigrants targeting Australia, UK, and New Zealand.",
    targetScore: "68+ Overall (Min 62 per communicative skill)",
    countries: "Australia, UK, New Zealand, Canada (IRCC Approved)",
    officialUrl: "https://www.pearsonpte.com",
    youtubeUrl: "https://www.youtube.com/results?search_query=PTE+Academic+Official+Preparation",
    practiceCount: "25 Speaking Repeat Sentence Drills",
    tips: "Speak at a natural, steady pace without hesitations; the AI algorithm rewards fluency."
  }
];

export function ExamCenterSection({ onOpenConsultModal }: ExamCenterSectionProps) {
  const [activeExamId, setActiveExamId] = useState("ielts");
  const activeExam = examsData.find((e) => e.id === activeExamId) || examsData[0];

  return (
    <section id="exam-center-section" className="py-20 bg-slate-50/70 border-b border-slate-200/80">
      <div className="container">
        <div className="section-header">
          <h2>Global <span className="accent-text">Exam Preparation Hub</span></h2>
          <p>This is NOT a coaching platform. We provide curated self-study roadmaps, official mock tests, and expert tips to help you ace your entrance exams.</p>
        </div>

        {/* Exam Selection Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 max-w-4xl mx-auto">
          {examsData.map((exam) => (
            <button
              key={exam.id}
              onClick={() => setActiveExamId(exam.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeExamId === exam.id
                  ? "bg-slate-900 text-white shadow-md scale-105"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {exam.name}
            </button>
          ))}
        </div>

        {/* Active Exam Hub Card */}
        <div className="max-w-5xl mx-auto mt-10 bg-white rounded-3xl border border-slate-200/80 shadow-premium overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-light border border-primary/30 text-xs font-bold uppercase tracking-wider">
                {activeExam.badge}
              </span>
              <h3 className="text-3xl font-bold text-white mt-3">{activeExam.name} Preparation Hub</h3>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">{activeExam.overview}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center min-w-[200px]">
              <span className="text-[11px] text-slate-400 uppercase font-bold block">Target Score Benchmark</span>
              <strong className="text-xl text-emerald-400 font-extrabold block mt-1">{activeExam.targetScore}</strong>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span>📋</span> Eligibility &amp; Acceptance
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Who should take this:</strong> {activeExam.eligibility}<br />
                  <strong className="mt-1 block">Accepted Destinations:</strong> {activeExam.countries}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span>💡</span> Expert Test-Day Tip
                </h4>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-900 text-xs font-medium">
                  &quot;{activeExam.tips}&quot;
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span>📚</span> Free Practice Materials &amp; Mock Drills
                </h4>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <strong className="text-sm font-bold text-slate-900 block">{activeExam.practiceCount}</strong>
                    <span className="text-xs text-slate-500">Curated by UES Senior Counsellors • Instant PDF Download</span>
                  </div>
                  <button 
                    className="py-2.5 px-5 rounded-xl bg-primary text-white font-bold text-xs shadow-sm hover:bg-primary/90 transition-all"
                    onClick={() => onOpenConsultModal && onOpenConsultModal(`Start My Journey • Download ${activeExam.name} Practice Kit`)}
                  >
                    Start My Journey • Get Kit
                  </button>
                </div>
              </div>
            </div>

            {/* Right Action Column */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Official Resources</h4>
                <p className="text-xs text-slate-500 mb-4">Access official registration portals and free YouTube masterclasses from test creators.</p>
                
                <div className="space-y-2.5">
                  <a 
                    href={activeExam.officialUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-between hover:bg-slate-100 transition-all"
                  >
                    <span>🌐 Official Registration Website</span>
                    <span>↗</span>
                  </a>
                  <a 
                    href={activeExam.youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-red-50 border border-red-200 text-red-700 font-bold text-xs flex items-center justify-between hover:bg-red-100 transition-all"
                  >
                    <span>▶️ Official YouTube Preparation</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <span className="text-[11px] text-slate-500 block mb-2 font-medium">Need score evaluation or waiver guidance?</span>
                <button 
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-primary transition-all flex items-center justify-center gap-2"
                  onClick={() => onOpenConsultModal && onOpenConsultModal(`Start My Journey • ${activeExam.name} Counselling`)}
                >
                  <span>Start My Journey</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
