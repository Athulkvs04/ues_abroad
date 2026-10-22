"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  RotateCcw, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  Bot, 
  Printer, 
  Edit3,
  Globe,
  SlidersHorizontal
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { LeadModal } from "@/components/home/LeadModal";

interface SopPreset {
  label: string;
  degree: string;
  course: string;
  country: string;
  university: string;
  background: string;
  experience: string;
  careerGoals: string;
}

const PRESETS: SopPreset[] = [
  {
    label: "MS Computer Science (Germany)",
    degree: "Master's (MS / MSc)",
    course: "Computer Science & Artificial Intelligence",
    country: "Germany",
    university: "Technical University of Munich",
    background: "B.Tech in Computer Science with an 8.4 CGPA, focusing on Distributed Systems, Algorithms, and Deep Learning.",
    experience: "2 years as a Software Engineer building microservices and an autonomous object-detection research project.",
    careerGoals: "Aim to work as an AI Systems Architect in industrial automation, eventually spearheading enterprise machine learning initiatives."
  },
  {
    label: "Data Science & Analytics (USA)",
    degree: "Master's (MS / MSc)",
    course: "Data Science & Analytics",
    country: "United States",
    university: "Cornell University",
    background: "B.E. in Information Technology with strong foundations in Statistical Modeling, Python, and Big Data frameworks.",
    experience: "18 months as a Business Intelligence Analyst optimizing predictive churn models with 94% accuracy.",
    careerGoals: "Aspire to lead Quantitative Analytics teams in financial technology and develop fair, explainable algorithmic intelligence."
  },
  {
    label: "Global MBA (United Kingdom)",
    degree: "Master of Business Administration (MBA)",
    course: "International Business & Strategic Management",
    country: "United Kingdom",
    university: "Coventry University",
    background: "Bachelor of Commerce (Honours) with distinction, concentrating on Corporate Finance and International Economics.",
    experience: "3 years in corporate operations managing cross-functional supply chain logistics and digital transformation audits.",
    careerGoals: "Targeting a Management Consultant role in global strategy advisory to facilitate sustainable supply chain restructuring."
  },
  {
    label: "Robotics & Automation (Canada)",
    degree: "Master's (MASc / MEng)",
    course: "Robotics & Mechatronics Engineering",
    country: "Canada",
    university: "University of Toronto",
    background: "B.Tech in Mechanical Engineering with specialized minors in Embedded Systems, Kinematics, and ROS.",
    experience: "Built an IoT-guided automated guided vehicle (AGV) for internal warehouse inventory tracking.",
    careerGoals: "Aiming to pioneer autonomous manipulation systems and return to advance smart manufacturing ecosystems."
  }
];

export default function SopGeneratorClient() {
  const [degree, setDegree] = useState(PRESETS[0].degree);
  const [course, setCourse] = useState(PRESETS[0].course);
  const [country, setCountry] = useState(PRESETS[0].country);
  const [university, setUniversity] = useState(PRESETS[0].university);
  const [background, setBackground] = useState(PRESETS[0].background);
  const [experience, setExperience] = useState(PRESETS[0].experience);
  const [careerGoals, setCareerGoals] = useState(PRESETS[0].careerGoals);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSop, setGeneratedSop] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const applyPreset = (preset: SopPreset) => {
    setDegree(preset.degree);
    setCourse(preset.course);
    setCountry(preset.country);
    setUniversity(preset.university);
    setBackground(preset.background);
    setExperience(preset.experience);
    setCareerGoals(preset.careerGoals);
    setGeneratedSop(null);
  };

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const uniName = university.trim() || `prestigious institutions in ${country}`;
      const courseName = course.trim() || "Advanced Graduate Studies";
      const studentDegree = degree || "Master of Science";

      const p1 = `STATEMENT OF PURPOSE\n\nApplicant: Prospective Scholar\nIntended Program: ${studentDegree} in ${courseName}\nTarget Institution: ${uniName}, ${country}\n\n1. Academic Motivation & Introduction\nThe rapid paradigm shift in modern industry demands an interdisciplinary synthesis of rigorous theoretical mastery and forward-looking application. My profound intellectual curiosity for ${courseName} originates not from abstract ambition, but from firsthand recognition of how structured methodologies solve pressing real-world challenges. Pursuing the ${studentDegree} in ${courseName} at ${uniName} represents the pivotal catalyst required to elevate my competencies and cultivate the analytical acuity necessary to contribute substantively to this field.`;

      const p2 = `2. Academic Foundations & Technical Competence\nDuring my undergraduate education, I deliberately cultivated a robust foundation in core disciplines. ${background} Rigorous coursework equipped me with vital problem-solving agility, quantitative rigor, and structured research methodologies. Engaging actively in academic seminars and collaborative lab projects reinforced my determination to probe beyond pre-established textbook frameworks, confirming that transformative breakthroughs emerge at the intersection of persistent experimentation and empirical discipline.`;

      const p3 = `3. Applied Professional Projects & Practical Experience\nTheoretical principles attain their true potency when tested against authentic industrial complexities. In my practical journey, ${experience} Navigating these high-stake technical environments honed my capacity to translate abstract logic into scalable, robust architectures while operating within multidisciplinary teams. These experiences underscored my recognition that tackling next-generation challenges requires the advanced graduate specialization provided by ${uniName}.`;

      const p4 = `4. Why ${uniName} and ${country}\nSelecting ${uniName} is an intentional decision driven by the institution's esteemed curriculum, world-class research facilities, and renowned faculty who lead international frontiers in ${courseName}. Moreover, ${country} provides an unmatched academic environment celebrated for academic excellence, state-of-the-art laboratory infrastructure, and progressive industrial integration. The opportunity to study under distinguished academicians and collaborate with a globally diverse cohort will directly empower my evolution into an innovative researcher and agile practitioner.`;

      const p5 = `5. Long-Term Career Vision & Conclusion\nUpon completing my graduate studies, ${careerGoals} Equipped with the world-class training, global perspective, and practical rigor fostered at ${uniName}, I am prepared to dedicate myself unconditionally to academic excellence and emerge as a responsible global professional. I respectfully present my candidature and eagerly look forward to contributing actively to your academic community.`;

      const fullDraft = [p1, p2, p3, p4, p5].join("\n\n");
      setGeneratedSop(fullDraft);
      setIsGenerating(false);
    }, 400);
  };

  const handleCopy = () => {
    if (!generatedSop) return;
    navigator.clipboard.writeText(generatedSop);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!generatedSop) return;
    const blob = new Blob([generatedSop], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `SOP_${course.replace(/\s+/g, "_")}_${country}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadDoc = () => {
    if (!generatedSop) return;
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Statement of Purpose</title>
      <style>
        body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.5; color: #111; }
        h1 { font-size: 16pt; font-weight: bold; text-align: center; margin-bottom: 24pt; }
        p { margin-bottom: 12pt; text-align: justify; }
      </style>
      </head>
      <body>
        <h1>STATEMENT OF PURPOSE</h1>
        ${generatedSop
          .split("\n\n")
          .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
          .join("")}
      </body>
      </html>
    `;
    const blob = new Blob(["\ufeff", content], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Statement_of_Purpose_${course.replace(/\s+/g, "_")}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <PublicLayout>
      {/* 1. Hero Header */}
      <section className="relative overflow-hidden min-h-[420px] flex items-center bg-slate-950 text-white border-b border-slate-800">
        <div className="absolute inset-0 pointer-events-none select-none">
          <Image
            src="/universities/oxford_radcliffe_hero.webp"
            alt="Historic Oxford University Radcliffe Camera Architecture"
            fill
            priority
            className="object-cover object-[center_28%] lg:object-[68%_28%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 via-42% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30" />
        </div>

        <div className="container max-w-6xl mx-auto px-4 py-16 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-xs font-semibold mb-5 backdrop-blur-xs">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>AI Statement of Purpose Generator</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Draft &amp; Download Your University{" "}
              <span className="text-emerald-400">Statement of Purpose</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-xl">
              Construct a tailored, admission-committee-grade 5-paragraph SOP draft tailored to your target degree, destination country, and past achievements in minutes. Download as Word or text for immediate editing.
            </p>

            <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-200 text-xs font-medium max-w-xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>5-Paragraph Standard</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Word &amp; TXT Export</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Plagiarism Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Free Counselor Review</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Generator Workspace */}
      <section className="py-12 bg-slate-50 min-h-screen">
        <div className="container max-w-6xl mx-auto px-4">

          {/* Quick Preset Selector */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs mb-8">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
              Load Preset Profile Template:
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => applyPreset(p)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    p.label === course || p.country === country
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Form: Profile Details */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Applicant Profile Inputs
                  </h2>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Step 1 of 2</span>
              </div>

              <form onSubmit={handleGenerate} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Target Degree Level</label>
                  <select
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-emerald-600 cursor-pointer"
                  >
                    <option value="Master's (MS / MSc)">Master&apos;s (MS / MSc)</option>
                    <option value="Master of Business Administration (MBA)">Master of Business Administration (MBA)</option>
                    <option value="Bachelor's (BS / BA)">Bachelor&apos;s (BS / BA)</option>
                    <option value="Doctoral Degree (PhD)">Doctoral Degree (PhD)</option>
                    <option value="Postgraduate Diploma">Postgraduate Diploma</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Target Course / Major</label>
                  <input
                    type="text"
                    required
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    placeholder="e.g. Computer Science, Mechanical Engineering, MBA"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Target Country</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-emerald-600 cursor-pointer"
                    >
                      <option value="Germany">Germany</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Ireland">Ireland</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Target University</label>
                    <input
                      type="text"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="e.g. TUM, Oxford, Toronto"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Academic Background &amp; Grades</label>
                  <textarea
                    rows={2}
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    placeholder="e.g. B.Tech in CSE with 8.2 CGPA, focused on Data Structures & Operating Systems..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-emerald-600 resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Work Experience / Projects</label>
                  <textarea
                    rows={2}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 1.5 years experience as software intern, worked on scalable API pipelines..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-emerald-600 resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Short &amp; Long-Term Career Goals</label>
                  <textarea
                    rows={2}
                    value={careerGoals}
                    onChange={(e) => setCareerGoals(e.target.value)}
                    placeholder="e.g. Lead engineering teams in enterprise AI and establish a specialized consultancy..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-emerald-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Bot className="w-4 h-4" />
                  <span>{isGenerating ? "Analyzing & Generating Draft..." : "Generate AI Statement of Purpose"}</span>
                </button>
              </form>
            </div>

            {/* Right Pane: Generated SOP Document & Export Tools */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between min-h-[580px]">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Generated Statement of Purpose
                    </h3>
                  </div>

                  {generatedSop && (
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                        {generatedSop.split(/\s+/).filter(Boolean).length} Words
                      </span>
                    </div>
                  )}
                </div>

                {/* Document Display / Empty State */}
                {!generatedSop ? (
                  <div className="py-20 text-center max-w-sm mx-auto">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-7 h-7" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900">Your Draft Will Appear Here</h4>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Complete your profile parameters on the left or select a preset template, then click &quot;Generate AI Statement of Purpose&quot;.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleGenerate()}
                      className="mt-6 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>Generate Sample SOP Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 space-y-4">
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 max-h-[500px] overflow-y-auto">
                      <textarea
                        value={generatedSop}
                        onChange={(e) => setGeneratedSop(e.target.value)}
                        rows={18}
                        className="w-full bg-transparent text-slate-800 text-xs sm:text-sm font-normal leading-relaxed focus:outline-none resize-y font-serif"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 italic">
                      Tip: You can edit directly in the text box above before downloading.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Toolbar */}
              {generatedSop && (
                <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadDoc}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download as Word (.doc)</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadTxt}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download as Text (.txt)</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied to Clipboard!" : "Copy Text"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handlePrint}
                      className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print</span>
                    </button>
                  </div>

                  {/* Counselor Polish Upsell Card */}
                  <div className="mt-4 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-emerald-950">
                        Want a human admission counselor to review this draft?
                      </h4>
                      <p className="text-[11px] text-emerald-800 leading-tight mt-0.5">
                        Our admission committee reviews drafts for university-specific alignment, plagiarism, and visa approval odds.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-all shadow-xs shrink-0 cursor-pointer"
                    >
                      Request Free Review
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Bottom Guidance Box */}
          <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              Standard 5-Paragraph SOP Structure Used by Top Universities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-emerald-700 block mb-1">Paragraph 1</span>
                <strong className="text-slate-900 block mb-1">Academic Hook &amp; Goal</strong>
                <p className="text-slate-500 leading-relaxed">
                  Introduction of intellectual passion, core discipline motivator, and why this specific graduate program.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-emerald-700 block mb-1">Paragraph 2</span>
                <strong className="text-slate-900 block mb-1">Undergraduate Studies</strong>
                <p className="text-slate-500 leading-relaxed">
                  Academic trajectory, foundational coursework, undergraduate thesis, and technical competencies developed.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-emerald-700 block mb-1">Paragraph 3</span>
                <strong className="text-slate-900 block mb-1">Professional Projects</strong>
                <p className="text-slate-500 leading-relaxed">
                  Internships, industrial challenges overcome, leadership responsibilities, and research publications.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-emerald-700 block mb-1">Paragraph 4</span>
                <strong className="text-slate-900 block mb-1">Why This University</strong>
                <p className="text-slate-500 leading-relaxed">
                  Specific laboratory, distinguished professors, specialized electives, and campus research ecosystems.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-emerald-700 block mb-1">Paragraph 5</span>
                <strong className="text-slate-900 block mb-1">Career Vision &amp; Return</strong>
                <p className="text-slate-500 leading-relaxed">
                  Immediate short-term and 5-year career objectives, economic value, and strong final summary statement.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Lead Review Modal */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Free SOP Review for ${course || "Target Program"}`}
        source="SOP_GENERATOR_PAGE"
      />
    </PublicLayout>
  );
}
