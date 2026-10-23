"use client";

import React, { useState, useMemo } from "react";
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
  User,
  Briefcase,
  Award,
  Plus,
  Trash2,
  SlidersHorizontal,
  Eye,
  Edit3,
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { LeadModal } from "@/components/home/LeadModal";

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

interface Education {
  degree: string;
  institution: string;
  year: string;
  grade: string;
}

interface Experience {
  role: string;
  company: string;
  duration: string;
  highlights: string;
}

interface CvPreset {
  label: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  objective: string;
  education: Education[];
  experience: Experience[];
  skills: string;
  languages: string;
  certifications: string;
}

/* ──────────────────────────────────────────────
   Presets
   ────────────────────────────────────────────── */

const PRESETS: CvPreset[] = [
  {
    label: "Software Engineer (MS Applicant)",
    fullName: "Aditya Sharma",
    email: "aditya.sharma@email.com",
    phone: "+91 98765 43210",
    location: "Bangalore, India",
    objective:
      "Aspiring to pursue a Master's in Computer Science at a globally ranked institution. Eager to apply full-stack engineering and machine learning expertise to cutting-edge research in scalable systems.",
    education: [
      {
        degree: "B.Tech in Computer Science & Engineering",
        institution: "National Institute of Technology, Calicut",
        year: "2019 – 2023",
        grade: "CGPA: 8.6 / 10",
      },
    ],
    experience: [
      {
        role: "Software Engineer",
        company: "Infosys Ltd.",
        duration: "Jul 2023 – Present",
        highlights:
          "Developed microservices powering real-time analytics dashboards for 2M+ users.\nImplemented CI/CD pipelines reducing deployment time by 40%.\nLed migration of legacy monolith to event-driven architecture.",
      },
    ],
    skills:
      "Python, Java, TypeScript, React, Node.js, PostgreSQL, Docker, Kubernetes, TensorFlow, AWS",
    languages: "English (Fluent), Hindi (Native), Malayalam (Conversational)",
    certifications:
      "AWS Solutions Architect Associate, Google Cloud Professional Data Engineer",
  },
  {
    label: "MBA Aspirant (Business Background)",
    fullName: "Priya Menon",
    email: "priya.menon@email.com",
    phone: "+91 90000 12345",
    location: "Mumbai, India",
    objective:
      "Seeking admission to a Global MBA program to build strategic leadership competencies in international business and supply chain management.",
    education: [
      {
        degree: "B.Com (Honours) in Accounting & Finance",
        institution: "Christ University, Bangalore",
        year: "2017 – 2020",
        grade: "CGPA: 8.9 / 10",
      },
    ],
    experience: [
      {
        role: "Operations Analyst",
        company: "Deloitte India",
        duration: "Jan 2021 – Present",
        highlights:
          "Optimized supply chain workflows reducing operational costs by 18%.\nCoordinated cross-functional audits for Fortune 500 clients.\nDrafted quarterly risk assessment reports presented to C-suite stakeholders.",
      },
    ],
    skills:
      "Financial Modeling, SAP ERP, Tableau, Advanced Excel, Strategic Planning, Stakeholder Management",
    languages: "English (Fluent), Hindi (Fluent), Tamil (Conversational)",
    certifications:
      "CFA Level I Passed, Lean Six Sigma Green Belt",
  },
  {
    label: "Mechanical Engineer (Research Focus)",
    fullName: "Rahul Nair",
    email: "rahul.nair@email.com",
    phone: "+91 87654 32100",
    location: "Kochi, India",
    objective:
      "Targeting a Master's in Robotics & Mechatronics to advance research in autonomous systems and smart manufacturing.",
    education: [
      {
        degree: "B.Tech in Mechanical Engineering",
        institution: "IIT Madras",
        year: "2018 – 2022",
        grade: "CGPA: 9.1 / 10",
      },
    ],
    experience: [
      {
        role: "Research Associate",
        company: "IIT Madras Robotics Lab",
        duration: "Aug 2022 – Present",
        highlights:
          "Designed and tested autonomous guided vehicle (AGV) prototypes for warehouse automation.\nPublished 2 papers in IEEE on sensor-fusion navigation algorithms.\nCollaborated with industry partners on predictive maintenance ML models.",
      },
    ],
    skills:
      "SolidWorks, ANSYS, ROS, Python, C++, MATLAB, Computer Vision, PLC Programming",
    languages: "English (Fluent), Malayalam (Native), Hindi (Conversational)",
    certifications: "Certified SolidWorks Professional (CSWP), GATE 2022 AIR 412",
  },
];

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */

export function CvBuilderClient() {
  // Preset selector
  const [selectedPreset, setSelectedPreset] = useState<number | null>(0);

  // Form State
  const [fullName, setFullName] = useState(PRESETS[0].fullName);
  const [email, setEmail] = useState(PRESETS[0].email);
  const [phone, setPhone] = useState(PRESETS[0].phone);
  const [location, setLocation] = useState(PRESETS[0].location);
  const [objective, setObjective] = useState(PRESETS[0].objective);

  const [education, setEducation] = useState<Education[]>(PRESETS[0].education);
  const [experience, setExperience] = useState<Experience[]>(PRESETS[0].experience);
  const [skills, setSkills] = useState(PRESETS[0].skills);
  const [languages, setLanguages] = useState(PRESETS[0].languages);
  const [certifications, setCertifications] = useState(PRESETS[0].certifications);

  // UI State
  const [generatedCv, setGeneratedCv] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<"document" | "raw">("document");

  // Load Preset
  const handleLoadPreset = (index: number) => {
    const p = PRESETS[index];
    setSelectedPreset(index);
    setFullName(p.fullName);
    setEmail(p.email);
    setPhone(p.phone);
    setLocation(p.location);
    setObjective(p.objective);
    setEducation(p.education);
    setExperience(p.experience);
    setSkills(p.skills);
    setLanguages(p.languages);
    setCertifications(p.certifications);
    setGeneratedCv("");
  };

  // Reset form
  const handleReset = () => {
    setSelectedPreset(null);
    setFullName("");
    setEmail("");
    setPhone("");
    setLocation("");
    setObjective("");
    setEducation([{ degree: "", institution: "", year: "", grade: "" }]);
    setExperience([{ role: "", company: "", duration: "", highlights: "" }]);
    setSkills("");
    setLanguages("");
    setCertifications("");
    setGeneratedCv("");
  };

  /* ── Education CRUD ── */
  const addEducation = () => {
    setEducation((prev) => [
      ...prev,
      { degree: "", institution: "", year: "", grade: "" },
    ]);
  };
  const removeEducation = (idx: number) => {
    setEducation((prev) => prev.filter((_, i) => i !== idx));
  };
  const updateEducation = (idx: number, field: keyof Education, value: string) => {
    setEducation((prev) =>
      prev.map((edu, i) => (i === idx ? { ...edu, [field]: value } : edu))
    );
  };

  /* ── Experience CRUD ── */
  const addExperience = () => {
    setExperience((prev) => [
      ...prev,
      { role: "", company: "", duration: "", highlights: "" },
    ]);
  };
  const removeExperience = (idx: number) => {
    setExperience((prev) => prev.filter((_, i) => i !== idx));
  };
  const updateExperience = (idx: number, field: keyof Experience, value: string) => {
    setExperience((prev) =>
      prev.map((exp, i) => (i === idx ? { ...exp, [field]: value } : exp))
    );
  };

  /* ── Clean Bullet Parser ── */
  const parseHighlights = (text: string): string[] => {
    if (!text.trim()) return [];
    return text
      .split(/\n|\r\n/)
      .flatMap((line) => line.split(/(?<=[.!?])\s+(?=[A-Z])/))
      .map((item) => item.trim().replace(/^[-•*]\s*/, ""))
      .filter((item) => item.length > 0)
      .map((item) => (item.endsWith(".") ? item : `${item}.`));
  };

  /* ── Build Plain-Text CV Helper ── */
  const buildPlainText = React.useCallback((): string => {
    const bannerDivider = "=".repeat(78);
    const sectionDivider = "-".repeat(78);
    const sections: string[] = [];

    // Header
    sections.push(bannerDivider);
    sections.push(`${(fullName || "YOUR NAME").toUpperCase()}`);
    sections.push(`${[email, phone, location].filter(Boolean).join("  |  ")}`);
    sections.push(bannerDivider, "");

    // Objective
    if (objective.trim()) {
      sections.push("CAREER OBJECTIVE");
      sections.push(sectionDivider);
      sections.push(objective.trim(), "");
    }

    // Education
    const validEdu = education.filter((e) => e.degree.trim());
    if (validEdu.length > 0) {
      sections.push("EDUCATION");
      sections.push(sectionDivider);
      validEdu.forEach((edu) => {
        const leftLine = edu.degree;
        const rightLine = edu.year || "";
        const pad = Math.max(2, 78 - leftLine.length - rightLine.length);
        sections.push(`${leftLine}${" ".repeat(pad)}${rightLine}`);

        const subLeft = edu.institution;
        const subRight = edu.grade ? `Grade: ${edu.grade}` : "";
        const subPad = Math.max(2, 78 - subLeft.length - subRight.length);
        sections.push(`${subLeft}${" ".repeat(subPad)}${subRight}`, "");
      });
    }

    // Experience
    const validExp = experience.filter((e) => e.role.trim());
    if (validExp.length > 0) {
      sections.push("PROFESSIONAL EXPERIENCE");
      sections.push(sectionDivider);
      validExp.forEach((exp) => {
        const leftLine = `${exp.role} — ${exp.company || "Company"}`;
        const rightLine = exp.duration || "";
        const pad = Math.max(2, 78 - leftLine.length - rightLine.length);
        sections.push(`${leftLine}${" ".repeat(pad)}${rightLine}`);

        const bullets = parseHighlights(exp.highlights);
        bullets.forEach((b) => {
          sections.push(`  • ${b}`);
        });
        sections.push("");
      });
    }

    // Skills
    if (skills.trim()) {
      sections.push("TECHNICAL SKILLS & COMPETENCIES");
      sections.push(sectionDivider);
      sections.push(
        skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .join("  |  "),
        ""
      );
    }

    // Certifications
    if (certifications.trim()) {
      sections.push("CERTIFICATIONS & ACHIEVEMENTS");
      sections.push(sectionDivider);
      certifications.split(",").forEach((cert) => {
        if (cert.trim()) sections.push(`  • ${cert.trim()}`);
      });
      sections.push("");
    }

    // Languages
    if (languages.trim()) {
      sections.push("LANGUAGES");
      sections.push(sectionDivider);
      sections.push(languages.trim(), "");
    }

    sections.push(bannerDivider);
    return sections.join("\n");
  }, [fullName, email, phone, location, objective, education, experience, skills, certifications, languages]);

  /* ── Generate Plain-Text CV ── */
  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      setGeneratedCv(buildPlainText());
      setIsGenerating(false);
    }, 200);
  };

  /* ── Clipboard ── */
  const handleCopy = () => {
    const text = generatedCv || buildPlainText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── TXT Download ── */
  const handleDownloadTxt = () => {
    const text = generatedCv || buildPlainText();
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `CV_${(fullName || "Applicant").replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 250);
  };

  /* ── Word (.doc) Download with Clean Table Structure ── */
  const handleDownloadDoc = () => {
    const validEdu = education.filter((e) => e.degree.trim());
    const validExp = experience.filter((e) => e.role.trim());

    const eduHtml = validEdu
      .map(
        (edu) => `
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-top:4pt;margin-bottom:2pt;">
          <tr>
            <td align="left" style="font-size:10.5pt;font-weight:bold;color:#0f172a;padding:0;">${edu.degree}</td>
            <td align="right" style="font-size:9.5pt;font-weight:bold;color:#475569;padding:0;white-space:nowrap;">${edu.year || ""}</td>
          </tr>
          <tr>
            <td align="left" style="font-size:9.5pt;font-style:italic;color:#334155;padding:0;">${edu.institution}</td>
            <td align="right" style="font-size:9pt;font-weight:bold;color:#047857;padding:0;">${edu.grade || ""}</td>
          </tr>
        </table>
      `
      )
      .join("");

    const expHtml = validExp
      .map((exp) => {
        const bullets = parseHighlights(exp.highlights)
          .map((h) => `<li style="margin-bottom:2pt;font-size:9.5pt;line-height:1.35;color:#334155;">${h}</li>`)
          .join("");
        return `
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-top:6pt;margin-bottom:2pt;">
          <tr>
            <td align="left" style="font-size:10.5pt;font-weight:bold;color:#0f172a;padding:0;">${exp.role} &mdash; <span style="font-weight:normal;color:#334155;">${exp.company || "Company"}</span></td>
            <td align="right" style="font-size:9.5pt;font-weight:bold;color:#475569;padding:0;white-space:nowrap;">${exp.duration || ""}</td>
          </tr>
        </table>
        <ul style="margin:2pt 0 6pt 16pt;padding:0;">${bullets}</ul>
      `;
      })
      .join("");

    const certList = certifications
      .split(",")
      .filter((c) => c.trim())
      .map((c) => `<li style="margin-bottom:2pt;font-size:9.5pt;color:#334155;">${c.trim()}</li>`)
      .join("");

    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>CV – ${fullName || "Applicant"}</title>
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
            margin: 40.0pt 48.0pt 40.0pt 48.0pt;
            mso-header-margin: 35.4pt;
            mso-footer-margin: 35.4pt;
            mso-paper-source: 0;
          }
          div.Section1 { page: Section1; }
          body {
            font-family: 'Calibri', 'Arial', sans-serif;
            font-size: 10pt;
            line-height: 1.35;
            color: #111827;
            margin: 0;
            padding: 0;
          }
          .name-header {
            text-align: center;
            font-size: 18pt;
            font-weight: bold;
            letter-spacing: 2pt;
            color: #0f172a;
            text-transform: uppercase;
            margin: 0 0 3pt 0;
          }
          .contact-bar {
            text-align: center;
            font-size: 9.5pt;
            color: #475569;
            margin-bottom: 8pt;
            padding-bottom: 6pt;
            border-bottom: 2pt solid #0f172a;
          }
          .section-title {
            font-size: 11pt;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1.2pt;
            color: #0f172a;
            border-bottom: 1.5pt solid #0f172a;
            padding-bottom: 2pt;
            margin-top: 11pt;
            margin-bottom: 4pt;
          }
          p.body-text {
            margin: 0 0 4pt 0;
            line-height: 1.4;
            color: #334155;
            text-align: justify;
          }
          ul { margin: 2pt 0 4pt 16pt; padding: 0; }
        </style>
      </head>
      <body>
        <div class="Section1">
          <div class="name-header">${(fullName || "YOUR NAME").toUpperCase()}</div>
          <div class="contact-bar">${[email, phone, location].filter(Boolean).join(" &nbsp;|&nbsp; ")}</div>

          ${objective.trim() ? `<div class="section-title">Career Objective</div><p class="body-text">${objective.trim()}</p>` : ""}
          ${eduHtml ? `<div class="section-title">Education</div>${eduHtml}` : ""}
          ${expHtml ? `<div class="section-title">Professional Experience</div>${expHtml}` : ""}
          ${skills.trim() ? `<div class="section-title">Technical Skills &amp; Competencies</div><p class="body-text">${skills.trim()}</p>` : ""}
          ${certList ? `<div class="section-title">Certifications &amp; Achievements</div><ul>${certList}</ul>` : ""}
          ${languages.trim() ? `<div class="section-title">Languages</div><p class="body-text">${languages.trim()}</p>` : ""}
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(["\ufeff", content], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `CV_${(fullName || "Applicant").replace(/\s+/g, "_")}.doc`;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 250);
  };

  /* ── Dedicated Clean Print Function ── */
  const handlePrint = () => {
    const validEdu = education.filter((e) => e.degree.trim());
    const validExp = experience.filter((e) => e.role.trim());

    const eduPrintHtml = validEdu
      .map(
        (edu) => `
        <div class="entry">
          <div class="entry-row">
            <span class="entry-title">${edu.degree}</span>
            <span class="entry-meta">${edu.year || ""}</span>
          </div>
          <div class="entry-row sub">
            <span class="entry-inst">${edu.institution}</span>
            <span class="entry-grade">${edu.grade || ""}</span>
          </div>
        </div>
      `
      )
      .join("");

    const expPrintHtml = validExp
      .map((exp) => {
        const bullets = parseHighlights(exp.highlights)
          .map((h) => `<li>${h}</li>`)
          .join("");
        return `
        <div class="entry">
          <div class="entry-row">
            <span class="entry-title">${exp.role} <span class="entry-company">— ${exp.company || "Company"}</span></span>
            <span class="entry-meta">${exp.duration || ""}</span>
          </div>
          <ul class="highlights">${bullets}</ul>
        </div>
      `;
      })
      .join("");

    const certList = certifications
      .split(",")
      .filter((c) => c.trim())
      .map((c) => `<li>${c.trim()}</li>`)
      .join("");

    const printDocHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>CV – ${fullName || "Applicant"}</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 14mm 16mm 14mm 16mm;
          }
          * { box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            font-size: 9.5pt;
            line-height: 1.4;
            color: #0f172a;
            background: #ffffff;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .cv-header {
            text-align: center;
            border-bottom: 2px solid #0f172a;
            padding-bottom: 8px;
            margin-bottom: 12px;
          }
          .name {
            font-size: 19pt;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #0f172a;
            margin: 0 0 4px 0;
          }
          .contact {
            font-size: 9pt;
            color: #475569;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 12px;
          }
          .section-title {
            font-size: 10.5pt;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            color: #0f172a;
            border-bottom: 1.5px solid #0f172a;
            padding-bottom: 2px;
            margin-top: 12px;
            margin-bottom: 6px;
            page-break-after: avoid;
            break-after: avoid;
          }
          .entry {
            margin-bottom: 8px;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .entry-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          }
          .entry-title {
            font-weight: 700;
            font-size: 9.5pt;
            color: #0f172a;
          }
          .entry-company {
            font-weight: 500;
            color: #334155;
          }
          .entry-meta {
            font-size: 8.5pt;
            font-weight: 600;
            color: #475569;
            white-space: nowrap;
          }
          .entry-row.sub {
            font-size: 9pt;
            color: #334155;
            font-style: italic;
            margin-top: 1px;
            margin-bottom: 2px;
          }
          .entry-grade {
            font-style: normal;
            font-weight: 600;
            color: #047857;
          }
          ul.highlights {
            margin: 2px 0 4px 16px;
            padding: 0;
          }
          ul.highlights li {
            font-size: 9pt;
            line-height: 1.35;
            color: #334155;
            margin-bottom: 2px;
          }
          p.body-p {
            font-size: 9pt;
            line-height: 1.4;
            color: #334155;
            margin: 0 0 5px 0;
            text-align: justify;
          }
        </style>
      </head>
      <body>
        <div class="cv-header">
          <div class="name">${(fullName || "YOUR NAME").toUpperCase()}</div>
          <div class="contact">
            ${[email, phone, location].filter(Boolean).map((item) => `<span>${item}</span>`).join(" <span>•</span> ")}
          </div>
        </div>

        ${objective.trim() ? `<div class="section-title">Career Objective</div><p class="body-p">${objective.trim()}</p>` : ""}
        ${eduPrintHtml ? `<div class="section-title">Education</div>${eduPrintHtml}` : ""}
        ${expPrintHtml ? `<div class="section-title">Professional Experience</div>${expPrintHtml}` : ""}
        ${skills.trim() ? `<div class="section-title">Technical Skills &amp; Competencies</div><p class="body-p">${skills.trim()}</p>` : ""}
        ${certList ? `<div class="section-title">Certifications &amp; Achievements</div><ul class="highlights">${certList}</ul>` : ""}
        ${languages.trim() ? `<div class="section-title">Languages</div><p class="body-p">${languages.trim()}</p>` : ""}
      </body>
      </html>
    `;

    // Create or reuse hidden iframe
    let iframe = document.getElementById("cv-print-frame") as HTMLIFrameElement;
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.id = "cv-print-frame";
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
  const wordCount = useMemo(
    () => (generatedCv ? generatedCv.split(/\s+/).filter(Boolean).length : 0),
    [generatedCv]
  );

  /* ────────────── RENDER ────────────── */
  return (
    <PublicLayout>
      {/* ──── 1. Clean & Functional Workbench Header ──── */}
      <section className="bg-emerald-50/50 border-y border-emerald-100/80 py-9 sm:py-10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-emerald-800 border border-emerald-200/80 shadow-2xs text-xs font-semibold mb-3">
                <FileText className="w-3.5 h-3.5 text-emerald-700" />
                <span>University Admission Toolkit</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Build &amp; Download Your Clean{" "}
                <span className="text-emerald-700">Academic CV</span>
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal max-w-2xl leading-relaxed">
                Create an admission-ready Curriculum Vitae tailored for university applications across the UK, USA, Germany, Canada, Australia, and Ireland.
              </p>
            </div>

            {/* Quick Feature Badges */}
            <div className="flex flex-wrap md:flex-col lg:flex-row gap-2 sm:gap-2.5 text-xs font-medium text-slate-700 shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-emerald-200/80 shadow-2xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Standard A4 Formatting
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-emerald-200/80 shadow-2xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Word &amp; TXT Download
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-emerald-200/80 shadow-2xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Direct PDF Print
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ──── 2. Interactive CV Builder Workspace ──── */}
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
              {PRESETS.map((preset, idx) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleLoadPreset(idx)}
                  className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
                    selectedPreset === idx
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border-slate-200"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Builder Grid: Form on Left, Formatted Preview & Export on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* ──── Left: Form Inputs ──── */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-5">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-700" />
                  Your Profile &amp; Background
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                  Enter your academic credentials and work history to generate a clean, university-aligned CV.
                </p>
              </div>

              <form onSubmit={handleGenerate} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 tracking-wide">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aditya Sharma"
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5 tracking-wide">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aditya@email.com"
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5 tracking-wide">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 tracking-wide">City, Country</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Bangalore, India"
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                  />
                </div>

                {/* Objective */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 tracking-wide">
                    Career Objective / Summary
                  </label>
                  <textarea
                    rows={3}
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    placeholder="2-3 sentences summarizing your academic background and goals for studying abroad..."
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600 focus:bg-white resize-none leading-relaxed transition-colors"
                  />
                </div>

                {/* Education Section */}
                <fieldset className="space-y-4 pt-3 border-t border-slate-100">
                  <legend className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <GraduationCap className="w-3.5 h-3.5" /> Education
                  </legend>
                  {education.map((edu, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 relative"
                    >
                      {education.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEducation(idx)}
                          className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                          aria-label="Remove education entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(idx, "degree", e.target.value)}
                        placeholder="Degree (e.g. B.Tech in Computer Science)"
                        className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600"
                      />
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(idx, "institution", e.target.value)}
                        placeholder="Institution Name"
                        className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600"
                      />
                      <div className="grid grid-cols-2 gap-2.5">
                        <input
                          type="text"
                          value={edu.year}
                          onChange={(e) => updateEducation(idx, "year", e.target.value)}
                          placeholder="Years (e.g. 2019 – 2023)"
                          className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600"
                        />
                        <input
                          type="text"
                          value={edu.grade}
                          onChange={(e) => updateEducation(idx, "grade", e.target.value)}
                          placeholder="Grade / CGPA"
                          className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addEducation}
                    className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5 cursor-pointer pt-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Another Qualification
                  </button>
                </fieldset>

                {/* Experience Section */}
                <fieldset className="space-y-4 pt-3 border-t border-slate-100">
                  <legend className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Briefcase className="w-3.5 h-3.5" /> Professional Experience
                  </legend>
                  {experience.map((exp, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 relative"
                    >
                      {experience.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeExperience(idx)}
                          className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                          aria-label="Remove experience entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <div className="grid grid-cols-2 gap-2.5">
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => updateExperience(idx, "role", e.target.value)}
                          placeholder="Job Title / Role"
                          className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(idx, "company", e.target.value)}
                          placeholder="Company / Organization"
                          className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => updateExperience(idx, "duration", e.target.value)}
                        placeholder="Duration (e.g. Jul 2023 – Present)"
                        className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600"
                      />
                      <textarea
                        rows={3}
                        value={exp.highlights}
                        onChange={(e) => updateExperience(idx, "highlights", e.target.value)}
                        placeholder="Key responsibilities and achievements (one per line or separated by periods)..."
                        className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600 resize-none leading-relaxed"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addExperience}
                    className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5 cursor-pointer pt-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Another Role
                  </button>
                </fieldset>

                {/* Skills */}
                <div className="pt-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 tracking-wide">
                    Technical Skills &amp; Competencies
                  </label>
                  <textarea
                    rows={2}
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="Comma-separated list: Python, React, Docker, AWS, SQL..."
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600 focus:bg-white resize-none leading-relaxed transition-colors"
                  />
                </div>

                {/* Certifications */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 tracking-wide">
                    Certifications &amp; Achievements
                  </label>
                  <input
                    type="text"
                    value={certifications}
                    onChange={(e) => setCertifications(e.target.value)}
                    placeholder="Comma-separated: AWS Certified, GATE 2022..."
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                  />
                </div>

                {/* Languages */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 tracking-wide">Languages</label>
                  <input
                    type="text"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    placeholder="English (Fluent), Hindi (Native)..."
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                  />
                </div>

                {/* Generate Button */}
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-6"
                >
                  <Bot className="w-4 h-4" />
                  <span>{isGenerating ? "Formatting Clean CV..." : "Generate & Preview CV"}</span>
                </button>
              </form>
            </div>

            {/* ──── Right: Formatted Document Preview & Export ──── */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between min-h-[660px]">
              <div>
                {/* Preview Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      CV Document Preview
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
                          if (!generatedCv) handleGenerate();
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

                    {wordCount > 0 && (
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1.5 rounded-lg hidden sm:inline-block">
                        {wordCount} Words
                      </span>
                    )}
                  </div>
                </div>

                {/* Formatted View (Clean Academic A4 Document Sheet) */}
                {previewMode === "document" ? (
                  <div className="mt-2">
                    <div
                      id="cv-printable-doc"
                      className="bg-white border border-slate-200 rounded-2xl p-7 sm:p-10 shadow-xs text-slate-900 font-sans space-y-6 max-h-[660px] overflow-y-auto"
                    >
                      {/* CV Header */}
                      <div className="text-center pb-4 border-b-2 border-slate-900">
                        <h2 className="text-xl sm:text-2xl font-bold tracking-wider uppercase text-slate-900">
                          {(fullName || "YOUR FULL NAME").toUpperCase()}
                        </h2>
                        <div className="mt-2.5 flex flex-wrap justify-center items-center gap-2.5 text-xs text-slate-600">
                          {email && <span>{email}</span>}
                          {email && phone && <span>•</span>}
                          {phone && <span>{phone}</span>}
                          {(email || phone) && location && <span>•</span>}
                          {location && <span>{location}</span>}
                        </div>
                      </div>

                      {/* Career Objective */}
                      {objective && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1.5 mb-2.5">
                            Career Objective
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                            {objective}
                          </p>
                        </div>
                      )}

                      {/* Education */}
                      {education.some((e) => e.degree.trim()) && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1.5 mb-2.5">
                            Education
                          </h4>
                          <div className="space-y-3">
                            {education
                              .filter((e) => e.degree.trim())
                              .map((edu, idx) => (
                                <div key={idx} className="text-xs sm:text-sm">
                                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                                    <span>{edu.degree}</span>
                                    <span className="text-xs font-semibold text-slate-500">
                                      {edu.year}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-baseline text-slate-600 italic mt-0.5">
                                    <span>{edu.institution}</span>
                                    {edu.grade && (
                                      <span className="not-italic font-semibold text-emerald-700">
                                        {edu.grade}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Professional Experience */}
                      {experience.some((e) => e.role.trim()) && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1.5 mb-2.5">
                            Professional Experience
                          </h4>
                          <div className="space-y-3.5">
                            {experience
                              .filter((e) => e.role.trim())
                              .map((exp, idx) => {
                                const bullets = parseHighlights(exp.highlights);
                                return (
                                  <div key={idx} className="text-xs sm:text-sm">
                                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                                      <span>
                                        {exp.role}{" "}
                                        <span className="font-medium text-slate-600">
                                          — {exp.company || "Company"}
                                        </span>
                                      </span>
                                      <span className="text-xs font-semibold text-slate-500">
                                        {exp.duration}
                                      </span>
                                    </div>
                                    {bullets.length > 0 && (
                                      <ul className="mt-1.5 space-y-1.5 list-disc list-inside text-slate-700 pl-1">
                                        {bullets.map((b, bIdx) => (
                                          <li key={bIdx} className="leading-relaxed">
                                            {b}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      )}

                      {/* Technical Skills */}
                      {skills.trim() && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1.5 mb-2.5">
                            Technical Skills &amp; Competencies
                          </h4>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {skills
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean)
                              .map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200"
                                >
                                  {skill}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Certifications */}
                      {certifications.trim() && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1.5 mb-2.5">
                            Certifications &amp; Achievements
                          </h4>
                          <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-slate-700 pl-1">
                            {certifications
                              .split(",")
                              .map((c) => c.trim())
                              .filter(Boolean)
                              .map((cert, idx) => (
                                <li key={idx} className="leading-relaxed">{cert}</li>
                              ))}
                          </ul>
                        </div>
                      )}

                      {/* Languages */}
                      {languages.trim() && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1.5 mb-2.5">
                            Languages
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{languages.trim()}</p>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 italic mt-3">
                      Ready to export! Use the clean Word download, TXT download, or Print to PDF below.
                    </p>
                  </div>
                ) : (
                  /* Raw Monospace Text Editor View */
                  <div className="mt-2 space-y-3">
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 max-h-[520px] overflow-y-auto">
                      <textarea
                        value={generatedCv}
                        onChange={(e) => setGeneratedCv(e.target.value)}
                        rows={22}
                        className="w-full bg-transparent text-slate-800 text-xs sm:text-sm font-mono leading-relaxed focus:outline-none resize-y"
                        placeholder="Click 'Generate & Preview CV' to build raw plain text..."
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

                {/* Counselor Upsell */}
                <div className="mt-5 p-5 sm:p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-emerald-950">
                      Want an admission counselor to review your CV?
                    </h4>
                    <p className="text-xs text-emerald-800 leading-normal mt-1">
                      Our experts review CVs for international admission guidelines, ATS keywords, and university formatting.
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

          {/* ──── Bottom: CV Section Guide ──── */}
          <div className="mt-20 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Standard Academic CV Structure for University Admissions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 text-xs sm:text-sm">
              {[
                {
                  title: "Contact Info",
                  desc: "Name, phone, email, and city or country. Keep it concise and professional.",
                },
                {
                  title: "Career Objective",
                  desc: "2–3 sentence summary of your academic goals and why you're applying.",
                },
                {
                  title: "Education",
                  desc: "Degrees with institutions, years, and grades (CGPA, percentage, or GPA).",
                },
                {
                  title: "Experience",
                  desc: "Internships, jobs, or research with quantifiable achievements and impact.",
                },
                {
                  title: "Skills",
                  desc: "Technical tools, programming languages, frameworks, and soft skills.",
                },
                {
                  title: "Certifications",
                  desc: "Professional certificates, test scores (GATE, GRE, IELTS), and awards.",
                },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <strong className="text-slate-900 block mb-1.5 font-bold">{item.title}</strong>
                  <p className="text-slate-500 leading-relaxed text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Lead Review Modal */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Free CV Review for ${fullName || "Your Profile"}`}
        source="CV_BUILDER_PAGE"
      />
    </PublicLayout>
  );
}

export default CvBuilderClient;
