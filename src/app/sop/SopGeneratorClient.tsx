"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  Bot, 
  Printer, 
  Edit3,
  Eye,
  SlidersHorizontal,
  User,
  Clock,
  BookOpen
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { LeadModal } from "@/components/home/LeadModal";

/* ──────────────────────────────────────────────
   Types & Presets
   ────────────────────────────────────────────── */

interface SopPreset {
  label: string;
  fullName: string;
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
    fullName: "Aditya Sharma",
    degree: "Master's (MS / MSc)",
    course: "Computer Science & Artificial Intelligence",
    country: "Germany",
    university: "Technical University of Munich (TUM)",
    background: "B.Tech in Computer Science & Engineering with an 8.6 CGPA from NIT Calicut, focusing on Distributed Systems, Parallel Computing, and Machine Learning.",
    experience: "2 years as a Software Engineer at Infosys developing real-time microservices, complemented by an autonomous vehicle sensor-fusion research project.",
    careerGoals: "Aim to work as an AI Systems Architect in industrial automation, eventually spearheading enterprise machine learning initiatives across European manufacturing hubs."
  },
  {
    label: "Data Science & Analytics (USA)",
    fullName: "Priya Menon",
    degree: "Master's (MS / MSc)",
    course: "Data Science & Analytics",
    country: "United States",
    university: "Cornell University",
    background: "B.E. in Information Technology with an 8.9 CGPA, with strong academic foundations in Statistical Inference, Predictive Modeling, and Big Data frameworks.",
    experience: "18 months as a Business Intelligence Analyst at Deloitte optimizing predictive churn models with 94% accuracy and authoring executive risk dashboards.",
    careerGoals: "Aspire to lead Quantitative Analytics teams in financial technology and develop fair, explainable algorithmic intelligence for enterprise decision systems."
  },
  {
    label: "Global MBA (United Kingdom)",
    fullName: "Rahul Nair",
    degree: "Master of Business Administration (MBA)",
    course: "International Business & Strategic Management",
    country: "United Kingdom",
    university: "University of Oxford (Saïd Business School)",
    background: "Bachelor of Commerce (Honours) with distinction, concentrating on Corporate Finance, International Economics, and Econometrics.",
    experience: "3 years in corporate management consulting directing cross-functional supply chain restructuring and digital transformation audits for global clients.",
    careerGoals: "Targeting a Management Consultant role in global strategy advisory, advising multinational corporations on sustainable supply chain resilience."
  },
  {
    label: "Robotics & Automation (Canada)",
    fullName: "Ananya Rao",
    degree: "Master's (MASc / MEng)",
    course: "Robotics & Mechatronics Engineering",
    country: "Canada",
    university: "University of Toronto",
    background: "B.Tech in Mechanical Engineering with specialized coursework in Embedded Systems, Kinematics, ROS (Robot Operating System), and Computer Vision.",
    experience: "Designed and evaluated an autonomous guided vehicle (AGV) prototype for warehouse inventory logistics during a university research fellowship.",
    careerGoals: "Aiming to pioneer autonomous manipulation systems and return to advance next-generation smart manufacturing and warehouse automation ecosystems."
  },
  {
    label: "Biomedical & MedTech (Ireland)",
    fullName: "Karthik Varma",
    degree: "Master's (MS / MSc)",
    course: "Biomedical Engineering & MedTech Innovation",
    country: "Ireland",
    university: "University of Galway",
    background: "B.Tech in Biomedical Engineering with 8.7 CGPA, focusing on Biomaterials, Bioinstrumentation, and Medical Device Regulatory Standards.",
    experience: "Completed an internship at a diagnostic equipment manufacturer evaluating cardiovascular sensor telemetry and ISO 13485 quality control pipelines.",
    careerGoals: "Aspire to work as a Medical Device R&D Specialist in Europe's premier MedTech cluster, designing minimally invasive surgical technologies."
  },
  {
    label: "Cybersecurity & IT (Australia)",
    fullName: "Sneha Patel",
    degree: "Master's (MS / MSc)",
    course: "Cybersecurity & Cloud Computing",
    country: "Australia",
    university: "UNSW Sydney",
    background: "B.Tech in Information Technology with top marks in Cryptography, Network Defense, Operating Systems, and Cloud Infrastructure.",
    experience: "2 years as an Associate Security Analyst conducting penetration testing, vulnerability remediation, and AWS security architecture assessments.",
    careerGoals: "Aim to work as a Principal Cloud Security Architect in Australia, safeguarding critical digital infrastructure against sovereign threat vectors."
  }
];

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */

export default function SopGeneratorClient() {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(0);

  // Form State
  const [fullName, setFullName] = useState(PRESETS[0].fullName);
  const [degree, setDegree] = useState(PRESETS[0].degree);
  const [course, setCourse] = useState(PRESETS[0].course);
  const [country, setCountry] = useState(PRESETS[0].country);
  const [university, setUniversity] = useState(PRESETS[0].university);
  const [background, setBackground] = useState(PRESETS[0].background);
  const [experience, setExperience] = useState(PRESETS[0].experience);
  const [careerGoals, setCareerGoals] = useState(PRESETS[0].careerGoals);

  // UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSop, setGeneratedSop] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<"document" | "raw">("document");

  // Load Preset
  const applyPreset = (index: number) => {
    const p = PRESETS[index];
    setSelectedPreset(index);
    setFullName(p.fullName);
    setDegree(p.degree);
    setCourse(p.course);
    setCountry(p.country);
    setUniversity(p.university);
    setBackground(p.background);
    setExperience(p.experience);
    setCareerGoals(p.careerGoals);
    setGeneratedSop(null);
  };

  // Reset form
  const handleReset = () => {
    setSelectedPreset(null);
    setFullName("");
    setDegree("Master's (MS / MSc)");
    setCourse("");
    setCountry("Germany");
    setUniversity("");
    setBackground("");
    setExperience("");
    setCareerGoals("");
    setGeneratedSop(null);
  };

  /* ── Build Plain-Text SOP ── */
  const buildPlainSopText = React.useCallback((): string => {
    const uniName = university.trim() || `esteemed institutions in ${country}`;
    const courseName = course.trim() || "Advanced Graduate Studies";
    const studentDegree = degree || "Master of Science";
    const candidateName = fullName.trim() || "Prospective Scholar";

    const bannerDivider = "=".repeat(78);
    const sectionDivider = "-".repeat(78);

    const lines: string[] = [];
    lines.push(bannerDivider);
    lines.push("STATEMENT OF PURPOSE");
    lines.push(bannerDivider);
    lines.push(`Applicant:          ${candidateName}`);
    lines.push(`Intended Program:   ${studentDegree} in ${courseName}`);
    lines.push(`Target University:  ${uniName}, ${country}`);
    lines.push(bannerDivider, "");

    lines.push("1. ACADEMIC MOTIVATION & INTELLECTUAL PASSION");
    lines.push(sectionDivider);
    lines.push(
      `The rapid paradigm shift in modern global industry demands an interdisciplinary synthesis of rigorous theoretical mastery and forward-looking empirical application. My profound intellectual curiosity for ${courseName} originates not from abstract ambition, but from firsthand recognition of how structured, scientific methodologies resolve pressing socio-economic and technological complexities. Pursuing the ${studentDegree} in ${courseName} at ${uniName} represents the critical catalyst required to elevate my competencies, expand my analytical acuity, and position me at the leading edge of this dynamic discipline.`,
      ""
    );

    lines.push("2. ACADEMIC FOUNDATIONS & TECHNICAL COMPETENCE");
    lines.push(sectionDivider);
    lines.push(
      `During my undergraduate education, I deliberately cultivated a robust foundation in core disciplines. ${background} Rigorous coursework equipped me with vital problem-solving agility, quantitative rigor, and structured research methodologies. Engaging actively in academic seminars, laboratory investigations, and collaborative capstone initiatives reinforced my determination to probe beyond pre-established textbook frameworks, confirming that transformative breakthroughs emerge at the intersection of persistent experimentation and analytical discipline.`,
      ""
    );

    lines.push("3. APPLIED PROFESSIONAL PROJECTS & INDUSTRY EXPERIENCE");
    lines.push(sectionDivider);
    lines.push(
      `Theoretical principles attain their true potency when tested against authentic industrial and laboratory complexities. In my professional journey, ${experience} Navigating these high-stake technical environments honed my capacity to translate abstract logic into scalable, robust architectures while operating productively within multidisciplinary teams. These experiences underscored my recognition that tackling next-generation challenges requires the advanced graduate specialization, research methodologies, and mentorship provided by ${uniName}.`,
      ""
    );

    lines.push(`4. WHY ${uniName.toUpperCase()} & ${country.toUpperCase()}`);
    lines.push(sectionDivider);
    lines.push(
      `Selecting ${uniName} is an intentional decision driven by the institution's esteemed curriculum, cutting-edge research infrastructure, and distinguished faculty who pioneer international frontiers in ${courseName}. Moreover, ${country} provides an unmatched academic environment celebrated for intellectual rigor, research integrity, and progressive industrial integration. The opportunity to learn under world-class academicians, utilize advanced laboratory facilities, and collaborate with a globally diverse cohort will directly empower my evolution into an innovative researcher and impactful professional.`,
      ""
    );

    lines.push("5. LONG-TERM CAREER VISION & PROFESSIONAL CONTRIBUTION");
    lines.push(sectionDivider);
    lines.push(
      `Upon completing my graduate studies, ${careerGoals} Equipped with the world-class training, global perspective, and practical rigor fostered at ${uniName}, I am prepared to dedicate myself unconditionally to academic excellence and emerge as a responsible global professional. I respectfully present my candidature and eagerly look forward to contributing actively to your vibrant academic community.`,
      ""
    );

    lines.push(bannerDivider);
    return lines.join("\n");
  }, [fullName, university, country, course, degree, background, experience, careerGoals]);

  /* ── Generate Action ── */
  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      setGeneratedSop(buildPlainSopText());
      setIsGenerating(false);
    }, 250);
  };

  /* ── Clipboard ── */
  const handleCopy = () => {
    const text = generatedSop || buildPlainSopText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── TXT Download ── */
  const handleDownloadTxt = () => {
    const text = generatedSop || buildPlainSopText();
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `SOP_${(fullName || "Applicant").replace(/\s+/g, "_")}_${course.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 250);
  };

  /* ── Word (.doc) Download with Clean MSO Margins & Academic Table ── */
  const handleDownloadDoc = () => {
    const uniName = university.trim() || `esteemed institutions in ${country}`;
    const courseName = course.trim() || "Advanced Graduate Studies";
    const studentDegree = degree || "Master of Science";
    const candidateName = fullName.trim() || "Prospective Scholar";

    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Statement of Purpose – ${candidateName}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page Section1 {
            size: 595.3pt 841.9pt; /* A4 */
            margin: 54.0pt 54.0pt 54.0pt 54.0pt; /* 0.75 - 1.0 in margins */
            mso-header-margin: 35.4pt;
            mso-footer-margin: 35.4pt;
            mso-paper-source: 0;
          }
          div.Section1 { page: Section1; }
          body {
            font-family: 'Calibri', 'Times New Roman', 'Arial', sans-serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #0f172a;
          }
          .title {
            font-size: 16pt;
            font-weight: bold;
            text-align: center;
            letter-spacing: 2pt;
            text-transform: uppercase;
            color: #0f172a;
            margin: 0 0 10pt 0;
          }
          table.meta-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 14pt;
            border-bottom: 1.5pt solid #0f172a;
            padding-bottom: 6pt;
          }
          table.meta-table td {
            font-size: 9.5pt;
            padding: 2pt 0;
            color: #334155;
          }
          .section-header {
            font-size: 11pt;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1pt;
            color: #0f172a;
            border-bottom: 1pt solid #cbd5e1;
            padding-bottom: 2pt;
            margin-top: 14pt;
            margin-bottom: 6pt;
          }
          p.body-text {
            font-size: 11pt;
            line-height: 1.55;
            text-align: justify;
            margin: 0 0 10pt 0;
            color: #1e293b;
          }
        </style>
      </head>
      <body>
        <div class="Section1">
          <div class="title">STATEMENT OF PURPOSE</div>

          <table class="meta-table" width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td width="55%"><strong>Applicant:</strong> ${candidateName}</td>
              <td width="45%" align="right"><strong>Target Degree:</strong> ${studentDegree}</td>
            </tr>
            <tr>
              <td><strong>Intended Course:</strong> ${courseName}</td>
              <td align="right"><strong>Target Institution:</strong> ${uniName}, ${country}</td>
            </tr>
          </table>

          <div class="section-header">1. Academic Motivation &amp; Research Objectives</div>
          <p class="body-text">
            The rapid paradigm shift in modern global industry demands an interdisciplinary synthesis of rigorous theoretical mastery and forward-looking empirical application. My profound intellectual curiosity for ${courseName} originates not from abstract ambition, but from firsthand recognition of how structured, scientific methodologies resolve pressing socio-economic and technological complexities. Pursuing the ${studentDegree} in ${courseName} at ${uniName} represents the critical catalyst required to elevate my competencies, expand my analytical acuity, and position me at the leading edge of this dynamic discipline.
          </p>

          <div class="section-header">2. Academic Foundations &amp; Technical Competence</div>
          <p class="body-text">
            During my undergraduate education, I deliberately cultivated a robust foundation in core disciplines. ${background} Rigorous coursework equipped me with vital problem-solving agility, quantitative rigor, and structured research methodologies. Engaging actively in academic seminars, laboratory investigations, and collaborative capstone initiatives reinforced my determination to probe beyond pre-established textbook frameworks, confirming that transformative breakthroughs emerge at the intersection of persistent experimentation and analytical discipline.
          </p>

          <div class="section-header">3. Applied Professional Projects &amp; Industry Experience</div>
          <p class="body-text">
            Theoretical principles attain their true potency when tested against authentic industrial and laboratory complexities. In my professional journey, ${experience} Navigating these high-stake technical environments honed my capacity to translate abstract logic into scalable, robust architectures while operating productively within multidisciplinary teams. These experiences underscored my recognition that tackling next-generation challenges requires the advanced graduate specialization, research methodologies, and mentorship provided by ${uniName}.
          </p>

          <div class="section-header">4. Institutional Alignment: Why ${uniName} &amp; ${country}</div>
          <p class="body-text">
            Selecting ${uniName} is an intentional decision driven by the institution&apos;s esteemed curriculum, cutting-edge research infrastructure, and distinguished faculty who pioneer international frontiers in ${courseName}. Moreover, ${country} provides an unmatched academic environment celebrated for intellectual rigor, research integrity, and progressive industrial integration. The opportunity to learn under world-class academicians, utilize advanced laboratory facilities, and collaborate with a globally diverse cohort will directly empower my evolution into an innovative researcher and impactful professional.
          </p>

          <div class="section-header">5. Long-Term Career Vision &amp; Professional Contribution</div>
          <p class="body-text">
            Upon completing my graduate studies, ${careerGoals} Equipped with the world-class training, global perspective, and practical rigor fostered at ${uniName}, I am prepared to dedicate myself unconditionally to academic excellence and emerge as a responsible global professional. I respectfully present my candidature and eagerly look forward to contributing actively to your vibrant academic community.
          </p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(["\ufeff", content], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Statement_of_Purpose_${(fullName || "Applicant").replace(/\s+/g, "_")}_${course.replace(/\s+/g, "_")}.doc`;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 250);
  };

  /* ── Dedicated Clean Print Function ── */
  const handlePrint = () => {
    const uniName = university.trim() || `esteemed institutions in ${country}`;
    const courseName = course.trim() || "Advanced Graduate Studies";
    const studentDegree = degree || "Master of Science";
    const candidateName = fullName.trim() || "Prospective Scholar";

    const printDocHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Statement of Purpose – ${candidateName}</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 18mm 20mm 18mm 20mm;
          }
          * { box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Times New Roman", Times, Georgia, serif;
            font-size: 10.5pt;
            line-height: 1.5;
            color: #0f172a;
            background: #ffffff;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .header-box {
            text-align: center;
            border-bottom: 2px solid #0f172a;
            padding-bottom: 10px;
            margin-bottom: 14px;
          }
          .title {
            font-size: 17pt;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin: 0 0 6px 0;
            color: #0f172a;
          }
          .meta-row {
            display: flex;
            justify-content: space-between;
            font-size: 9.5pt;
            color: #475569;
            font-family: -apple-system, sans-serif;
            margin-top: 3px;
          }
          .section-heading {
            font-size: 11pt;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #0f172a;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 2px;
            margin-top: 14px;
            margin-bottom: 6px;
            font-family: -apple-system, sans-serif;
            page-break-after: avoid;
            break-after: avoid;
          }
          p.para {
            font-size: 10.5pt;
            line-height: 1.55;
            color: #1e293b;
            text-align: justify;
            margin: 0 0 8px 0;
          }
        </style>
      </head>
      <body>
        <div class="header-box">
          <div class="title">STATEMENT OF PURPOSE</div>
          <div class="meta-row">
            <span><strong>Applicant:</strong> ${candidateName}</span>
            <span><strong>Target Degree:</strong> ${studentDegree}</span>
          </div>
          <div class="meta-row">
            <span><strong>Course:</strong> ${courseName}</span>
            <span><strong>Institution:</strong> ${uniName}, ${country}</span>
          </div>
        </div>

        <div class="section-heading">1. Academic Motivation &amp; Research Objectives</div>
        <p class="para">
          The rapid paradigm shift in modern global industry demands an interdisciplinary synthesis of rigorous theoretical mastery and forward-looking empirical application. My profound intellectual curiosity for ${courseName} originates not from abstract ambition, but from firsthand recognition of how structured, scientific methodologies resolve pressing socio-economic and technological complexities. Pursuing the ${studentDegree} in ${courseName} at ${uniName} represents the critical catalyst required to elevate my competencies, expand my analytical acuity, and position me at the leading edge of this dynamic discipline.
        </p>

        <div class="section-heading">2. Academic Foundations &amp; Technical Competence</div>
        <p class="para">
          During my undergraduate education, I deliberately cultivated a robust foundation in core disciplines. ${background} Rigorous coursework equipped me with vital problem-solving agility, quantitative rigor, and structured research methodologies. Engaging actively in academic seminars, laboratory investigations, and collaborative capstone initiatives reinforced my determination to probe beyond pre-established textbook frameworks, confirming that transformative breakthroughs emerge at the intersection of persistent experimentation and analytical discipline.
        </p>

        <div class="section-heading">3. Applied Professional Projects &amp; Industry Experience</div>
        <p class="para">
          Theoretical principles attain their true potency when tested against authentic industrial and laboratory complexities. In my professional journey, ${experience} Navigating these high-stake technical environments honed my capacity to translate abstract logic into scalable, robust architectures while operating productively within multidisciplinary teams. These experiences underscored my recognition that tackling next-generation challenges requires the advanced graduate specialization, research methodologies, and mentorship provided by ${uniName}.
        </p>

        <div class="section-heading">4. Institutional Alignment: Why ${uniName} &amp; ${country}</div>
        <p class="para">
          Selecting ${uniName} is an intentional decision driven by the institution&apos;s esteemed curriculum, cutting-edge research infrastructure, and distinguished faculty who pioneer international frontiers in ${courseName}. Moreover, ${country} provides an unmatched academic environment celebrated for intellectual rigor, research integrity, and progressive industrial integration. The opportunity to learn under world-class academicians, utilize advanced laboratory facilities, and collaborate with a globally diverse cohort will directly empower my evolution into an innovative researcher and impactful professional.
        </p>

        <div class="section-heading">5. Long-Term Career Vision &amp; Professional Contribution</div>
        <p class="para">
          Upon completing my graduate studies, ${careerGoals} Equipped with the world-class training, global perspective, and practical rigor fostered at ${uniName}, I am prepared to dedicate myself unconditionally to academic excellence and emerge as a responsible global professional. I respectfully present my candidature and eagerly look forward to contributing actively to your vibrant academic community.
        </p>
      </body>
      </html>
    `;

    let iframe = document.getElementById("sop-print-frame") as HTMLIFrameElement;
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.id = "sop-print-frame";
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";
      document.body.appendChild(iframe);
    }

    const printDoc = iframe.contentWindow?.document;
    if (!printDoc) {
      window.print();
      return;
    }

    printDoc.open();
    printDoc.write(printDocHtml);
    printDoc.close();

    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    }, 250);
  };

  /* ── Word Count ── */
  const wordCount = useMemo(() => {
    const text = generatedSop || buildPlainSopText();
    return text.split(/\s+/).filter(Boolean).length;
  }, [generatedSop, buildPlainSopText]);

  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 220));

  return (
    <PublicLayout>
      {/* ──── 1. Clean & Functional Workbench Header ──── */}
      <section className="bg-slate-900 text-white border-y border-slate-800 py-10 sm:py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-semibold mb-3">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>University Admission Toolkit</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Draft &amp; Download Your University{" "}
                <span className="text-emerald-400">Statement of Purpose</span>
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-300 font-normal max-w-2xl leading-relaxed">
                Construct an admission-committee-grade 5-paragraph SOP draft tailored to your target degree, destination country, and past achievements in minutes.
              </p>
            </div>

            {/* Quick Feature Badges */}
            <div className="flex flex-wrap md:flex-col lg:flex-row gap-2 sm:gap-2.5 text-xs font-medium text-slate-300 shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700/80 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                5-Paragraph Standard
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700/80 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Word &amp; TXT Export
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700/80 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Clean A4 Formatting
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ──── 2. Interactive Generator Workspace ──── */}
      <section className="py-8 sm:py-10 bg-slate-50/80 min-h-screen">
        <div className="container max-w-6xl mx-auto px-4">

          {/* Quick Preset Selector */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs mb-10">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
                Select a Verified Applicant Template:
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-emerald-700 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Form
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p, idx) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => applyPreset(idx)}
                  className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
                    selectedPreset === idx
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border-slate-200"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* ──── Left Form: Profile Details ──── */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-700" />
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Applicant Profile Inputs
                  </h2>
                </div>
                <span className="text-xs text-slate-400 font-medium">Admission Parameters</span>
              </div>

              <form onSubmit={handleGenerate} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 tracking-wide">Applicant Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aditya Sharma"
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                  />
                </div>

                {/* Target Degree Level */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 tracking-wide">Target Degree Level</label>
                  <select
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600 focus:bg-white cursor-pointer transition-colors"
                  >
                    <option value="Master's (MS / MSc)">Master&apos;s (MS / MSc)</option>
                    <option value="Master of Business Administration (MBA)">Master of Business Administration (MBA)</option>
                    <option value="Bachelor's (BS / BA)">Bachelor&apos;s (BS / BA)</option>
                    <option value="Doctoral Degree (PhD)">Doctoral Degree (PhD)</option>
                    <option value="Postgraduate Diploma">Postgraduate Diploma</option>
                  </select>
                </div>

                {/* Target Course / Major */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 tracking-wide">Target Course / Major</label>
                  <input
                    type="text"
                    required
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    placeholder="e.g. Computer Science, Mechanical Engineering, MBA"
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                  />
                </div>

                {/* Country & University */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5 tracking-wide">Target Country</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600 focus:bg-white cursor-pointer transition-colors"
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
                    <label className="text-xs font-bold text-slate-700 block mb-1.5 tracking-wide">Target University</label>
                    <input
                      type="text"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="e.g. TUM, Oxford, Toronto"
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Academic Background */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 tracking-wide">Academic Background &amp; Grades</label>
                  <textarea
                    rows={3}
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    placeholder="e.g. B.Tech in CSE with 8.4 CGPA, focused on Data Structures & Operating Systems..."
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600 focus:bg-white resize-none leading-relaxed transition-colors"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 tracking-wide">Work Experience / Projects</label>
                  <textarea
                    rows={3}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 2 years experience as software engineer, worked on scalable microservices..."
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600 focus:bg-white resize-none leading-relaxed transition-colors"
                  />
                </div>

                {/* Career Goals */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 tracking-wide">Short &amp; Long-Term Career Goals</label>
                  <textarea
                    rows={3}
                    value={careerGoals}
                    onChange={(e) => setCareerGoals(e.target.value)}
                    placeholder="e.g. Lead engineering teams in enterprise AI and establish an innovation lab..."
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600 focus:bg-white resize-none leading-relaxed transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-6"
                >
                  <Bot className="w-4 h-4" />
                  <span>{isGenerating ? "Analyzing & Generating Draft..." : "Generate AI Statement of Purpose"}</span>
                </button>
              </form>
            </div>

            {/* ──── Right Pane: Formatted Document & Export ──── */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between min-h-[660px]">
              <div>
                {/* Preview Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Statement of Purpose Preview
                    </h3>
                  </div>

                  {/* Mode Toggle (Formatted vs Raw) */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => setPreviewMode("document")}
                        className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                          previewMode === "document"
                            ? "bg-white text-emerald-800 shadow-xs font-bold"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Formatted View</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!generatedSop) handleGenerate();
                          setPreviewMode("raw");
                        }}
                        className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                          previewMode === "raw"
                            ? "bg-white text-emerald-800 shadow-xs font-bold"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Raw Text</span>
                      </button>
                    </div>

                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1.5 rounded-lg hidden sm:inline-block">
                      {wordCount} Words • {readingTimeMinutes}m Read
                    </span>
                  </div>
                </div>

                {/* Formatted View (Clean Academic Paper Presentation) */}
                {previewMode === "document" ? (
                  <div className="mt-2">
                    <div
                      id="sop-printable-doc"
                      className="bg-white border border-slate-200 rounded-2xl p-7 sm:p-10 shadow-xs text-slate-900 font-serif space-y-6 max-h-[660px] overflow-y-auto leading-relaxed"
                    >
                      {/* Document Letterhead */}
                      <div className="text-center pb-4 border-b-2 border-slate-900 font-sans">
                        <h2 className="text-xl sm:text-2xl font-bold tracking-wider uppercase text-slate-900">
                          STATEMENT OF PURPOSE
                        </h2>
                        <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-600 text-left pt-2.5 border-t border-slate-100">
                          <div>
                            <span className="font-bold text-slate-800">Applicant:</span>{" "}
                            <span>{fullName || "Prospective Scholar"}</span>
                          </div>
                          <div className="sm:text-right">
                            <span className="font-bold text-slate-800">Target Degree:</span>{" "}
                            <span>{degree}</span>
                          </div>
                          <div>
                            <span className="font-bold text-slate-800">Course:</span>{" "}
                            <span>{course || "Graduate Program"}</span>
                          </div>
                          <div className="sm:text-right">
                            <span className="font-bold text-slate-800">Institution:</span>{" "}
                            <span>{university || "Target University"}, {country}</span>
                          </div>
                        </div>
                      </div>

                      {/* Section 1 */}
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1.5 mb-2.5 font-sans">
                          1. Academic Motivation &amp; Research Objectives
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                          The rapid paradigm shift in modern global industry demands an interdisciplinary synthesis of rigorous theoretical mastery and forward-looking empirical application. My profound intellectual curiosity for {course || "this discipline"} originates not from abstract ambition, but from firsthand recognition of how structured, scientific methodologies resolve pressing socio-economic and technological complexities. Pursuing the {degree} in {course || "this field"} at {university || "your institution"} represents the critical catalyst required to elevate my competencies, expand my analytical acuity, and position me at the leading edge of this dynamic discipline.
                        </p>
                      </div>

                      {/* Section 2 */}
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1.5 mb-2.5 font-sans">
                          2. Academic Foundations &amp; Technical Competence
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                          During my undergraduate education, I deliberately cultivated a robust foundation in core disciplines. {background} Rigorous coursework equipped me with vital problem-solving agility, quantitative rigor, and structured research methodologies. Engaging actively in academic seminars, laboratory investigations, and collaborative capstone initiatives reinforced my determination to probe beyond pre-established textbook frameworks, confirming that transformative breakthroughs emerge at the intersection of persistent experimentation and analytical discipline.
                        </p>
                      </div>

                      {/* Section 3 */}
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1.5 mb-2.5 font-sans">
                          3. Applied Professional Projects &amp; Industry Experience
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                          Theoretical principles attain their true potency when tested against authentic industrial and laboratory complexities. In my professional journey, {experience} Navigating these high-stake technical environments honed my capacity to translate abstract logic into scalable, robust architectures while operating productively within multidisciplinary teams. These experiences underscored my recognition that tackling next-generation challenges requires the advanced graduate specialization, research methodologies, and mentorship provided by {university || "your esteemed institution"}.
                        </p>
                      </div>

                      {/* Section 4 */}
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1.5 mb-2.5 font-sans">
                          4. Institutional Alignment: Why {university || "This Institution"} &amp; {country}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                          Selecting {university || "your university"} is an intentional decision driven by the institution&apos;s esteemed curriculum, cutting-edge research infrastructure, and distinguished faculty who pioneer international frontiers in {course || "this field"}. Moreover, {country} provides an unmatched academic environment celebrated for intellectual rigor, research integrity, and progressive industrial integration. The opportunity to learn under world-class academicians, utilize advanced laboratory facilities, and collaborate with a globally diverse cohort will directly empower my evolution into an innovative researcher and impactful professional.
                        </p>
                      </div>

                      {/* Section 5 */}
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1.5 mb-2.5 font-sans">
                          5. Long-Term Career Vision &amp; Professional Contribution
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                          Upon completing my graduate studies, {careerGoals} Equipped with the world-class training, global perspective, and practical rigor fostered at {university || "your university"}, I am prepared to dedicate myself unconditionally to academic excellence and emerge as a responsible global professional. I respectfully present my candidature and eagerly look forward to contributing actively to your vibrant academic community.
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 italic mt-3">
                      Ready to submit! Download as formatted Word (.doc), text (.txt), or print directly to PDF below.
                    </p>
                  </div>
                ) : (
                  /* Raw Monospace Text Editor View */
                  <div className="mt-2 space-y-3">
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 max-h-[520px] overflow-y-auto">
                      <textarea
                        value={generatedSop || buildPlainSopText()}
                        onChange={(e) => setGeneratedSop(e.target.value)}
                        rows={20}
                        className="w-full bg-transparent text-slate-800 text-xs sm:text-sm font-mono leading-relaxed focus:outline-none resize-y"
                        placeholder="Click 'Generate AI Statement of Purpose' to generate text..."
                      />
                    </div>
                    <p className="text-xs text-slate-400 italic">
                      Tip: Edits made here will be reflected when downloading as Plain Text (.txt).
                    </p>
                  </div>
                )}
              </div>

              {/* Action Toolbar */}
              <div className="pt-6 mt-8 border-t border-slate-100 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleDownloadDoc}
                    className="px-4.5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Word (.doc)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadTxt}
                    className="px-4.5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Text (.txt)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-4.5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print / Save PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>
                </div>

                {/* Counselor Polish Upsell Card */}
                <div className="mt-5 p-5 sm:p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-emerald-950">
                      Want an admission counselor to review and refine your SOP?
                    </h4>
                    <p className="text-xs text-emerald-800 leading-normal mt-1">
                      Our admissions experts review drafts for university alignment, grammar, plagiarism, and visa approval odds.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="px-4.5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm transition-all shadow-xs shrink-0 cursor-pointer"
                  >
                    Request Free Review
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* ──── Bottom Guidance Box: Standard 5-Paragraph SOP Structure ──── */}
          <div className="mt-20 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Standard 5-Paragraph SOP Structure Used by Top Universities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5 text-xs sm:text-sm">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-emerald-700 block mb-1 text-xs uppercase tracking-wider">Paragraph 1</span>
                <strong className="text-slate-900 block mb-1 font-bold">Academic Hook &amp; Goal</strong>
                <p className="text-slate-500 leading-relaxed text-xs">
                  Introduction of intellectual passion, core discipline motivator, and why this specific graduate program.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-emerald-700 block mb-1 text-xs uppercase tracking-wider">Paragraph 2</span>
                <strong className="text-slate-900 block mb-1 font-bold">Undergraduate Studies</strong>
                <p className="text-slate-500 leading-relaxed text-xs">
                  Academic trajectory, foundational coursework, undergraduate thesis, and technical competencies developed.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-emerald-700 block mb-1 text-xs uppercase tracking-wider">Paragraph 3</span>
                <strong className="text-slate-900 block mb-1 font-bold">Professional Projects</strong>
                <p className="text-slate-500 leading-relaxed text-xs">
                  Internships, industrial challenges overcome, leadership responsibilities, and research publications.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-emerald-700 block mb-1 text-xs uppercase tracking-wider">Paragraph 4</span>
                <strong className="text-slate-900 block mb-1 font-bold">Why This University</strong>
                <p className="text-slate-500 leading-relaxed text-xs">
                  Specific laboratory, distinguished professors, specialized electives, and campus research ecosystems.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-emerald-700 block mb-1 text-xs uppercase tracking-wider">Paragraph 5</span>
                <strong className="text-slate-900 block mb-1 font-bold">Career Vision &amp; Return</strong>
                <p className="text-slate-500 leading-relaxed text-xs">
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
