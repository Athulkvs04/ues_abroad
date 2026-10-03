"use client";

import React, { useState } from "react";

interface ResourcesSectionProps {
  onOpenConsultModal?: (source?: string) => void;
}

interface ResourceItem {
  badge: string;
  title: string;
  desc: string;
  previewDetails: {
    summary: string;
    highlights: string[];
    pages: string;
    format: string;
  };
}

const resourcesData: ResourceItem[] = [
  { 
    badge: "Guide", 
    title: "Country Admissions Guide", 
    desc: "Admissions handbook summarizing dates, documentation checklists, and rankings.",
    previewDetails: {
      summary: "Comprehensive handbook covering intake cycles, GPA conversion scales, IELTS/TOEFL score bands, and credential evaluations for USA, UK, Germany, Canada, Ireland, and Australia.",
      highlights: ["Intake deadlines (Fall/Spring/Winter)", "Country-by-country tuition benchmarks", "Post-study work visa rights comparison", "Application fee waiver codes"],
      pages: "28 Pages",
      format: "PDF Handbook"
    }
  },
  { 
    badge: "Checklist", 
    title: "Visa Interview Checklist", 
    desc: "Document requirements, bank certificate guidelines, and typical question forms.",
    previewDetails: {
      summary: "Complete embassy dossier preparation guide: VFS appointment slots, biometric guidelines, blocked account verification, source of funds documentation, and top 20 mock interview questions with model answers.",
      highlights: ["Embassy documentation dossier checklist", "Financial proof of funds formulas", "Top 20 consular interview questions", "Visa approval probability metrics"],
      pages: "16 Pages",
      format: "PDF Checklist & Workbook"
    }
  },
  { 
    badge: "Guide", 
    title: "Scholarship Application Guide", 
    desc: "Detailed list of government grants, private scholarships, and deadline files.",
    previewDetails: {
      summary: "Curated directory of government grants, university merit scholarships, DAAD funding, Erasmus Mundus fellowships, and private trust endowments with verified application guidelines.",
      highlights: ["50+ verified international scholarships", "Eligibility eligibility score matrix", "Scholarship essay writing templates", "Application calendar & deadlines"],
      pages: "34 Pages",
      format: "PDF Directory"
    }
  },
  { 
    badge: "Template", 
    title: "Statement of Purpose (SOP) Guide", 
    desc: "Drafting frameworks, paragraph divisions, and successful model samples.",
    previewDetails: {
      summary: "Battle-tested 5-paragraph SOP framework that helped over 15,000 students secure admits into top 100 global universities, including sample essays with annotations.",
      highlights: ["The 5-paragraph proven structure", "Hook openings that grab admissions officers", "Addressing academic gaps or low GPA", "Annotated sample essays for STEM & MBA"],
      pages: "22 Pages",
      format: "PDF Guide + Word Template"
    }
  },
  { 
    badge: "Template", 
    title: "Letters of Recommendation (LOR)", 
    desc: "Recommendation outline files, formatting layouts, and phrasing tips.",
    previewDetails: {
      summary: "Standard recommendation draft packages for both academic professors and professional managers, tailored to highlight student strengths without sounding repetitive.",
      highlights: ["Academic vs Professional LOR formats", "Key skills matrix for professors to include", "Sample templates for 3 diverse referees", "Etiquette guide for requesting LORs"],
      pages: "14 Pages",
      format: "PDF & Editable Docs"
    }
  },
  { 
    badge: "Template", 
    title: "Academic Resume Template", 
    desc: "Standard resume structures optimized for student evaluation boards.",
    previewDetails: {
      summary: "ATS-optimized international academic CV template designed specifically for university admissions committees, highlighting coursework, research papers, and technical projects.",
      highlights: ["ATS-friendly 1-page & 2-page formats", "Section hierarchy preferred by US/EU faculties", "Quantifying project impacts effectively", "Pre-departure resume polish tips"],
      pages: "8 Pages",
      format: "Editable LaTeX & Word"
    }
  }
];

export function ResourcesSection({ onOpenConsultModal }: ResourcesSectionProps) {
  const [activePreview, setActivePreview] = useState<ResourceItem | null>(null);

  const handleDownload = (title: string) => {
    if (activePreview) setActivePreview(null);
    if (onOpenConsultModal) {
      onOpenConsultModal(`Start My Journey • Download ${title}`);
    }
  };

  return (
    <section id="resources-section" className="resources-wrap py-20 bg-white border-b border-slate-200/60">
      <div className="container">
        <div className="section-header">
          <h2>Resource Library</h2>
          <p>Unlock professional SOP guides, visa mock lists, and budget worksheets instantly.</p>
        </div>

        <div className="resources-grid-layout">
          {resourcesData.map((res) => (
            <div key={res.title} className="resource-card bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 hover:bg-white hover:border-emerald-500/40 hover:shadow-md transition-all h-full flex flex-col justify-between">
              <div>
                <span className="badge">{res.badge}</span>
                <h3>{res.title}</h3>
                <p>{res.desc}</p>
              </div>
              <div className="actions mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <button 
                  className="btn-preview !py-1.5 !px-3 !text-xs font-semibold cursor-pointer" 
                  onClick={() => setActivePreview(res)}
                >
                  Preview
                </button>
                <button 
                  className="btn-download !py-1.5 !px-3 !text-xs font-bold cursor-pointer" 
                  onClick={() => handleDownload(res.title)}
                >
                  Start My Journey
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Resource Preview Modal */}
      {activePreview && (
        <div 
          className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActivePreview(null)}
        >
          <div 
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative text-slate-800 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActivePreview(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
              aria-label="Close Preview"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs">
                {activePreview.badge} Preview
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {activePreview.previewDetails.pages} • {activePreview.previewDetails.format}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
              {activePreview.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
              {activePreview.previewDetails.summary}
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 mb-6">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                Key Document Highlights
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {activePreview.previewDetails.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setActivePreview(null)}
                className="py-3 px-5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition-all cursor-pointer"
              >
                Close Preview
              </button>
              <button 
                onClick={() => handleDownload(activePreview.title)}
                className="flex-1 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Download Full Guide</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
