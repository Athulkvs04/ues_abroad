"use client";

import React from "react";

interface ResourcesSectionProps {
  onOpenConsultModal?: (source?: string) => void;
}

const resourcesData = [
  { badge: "Guide", title: "Country Admissions Guide", desc: "Admissions handbook summarizing dates, documentation checklists, and rankings." },
  { badge: "Checklist", title: "Visa Interview Checklist", desc: "Document requirements, bank certificate guidelines, and typical question forms." },
  { badge: "Guide", title: "Scholarship Application Guide", desc: "Detailed list of government grants, private scholarships, and deadline files." },
  { badge: "Template", title: "Statement of Purpose (SOP) Guide", desc: "Drafting frameworks, paragraph divisions, and successful model samples." },
  { badge: "Template", title: "Letters of Recommendation (LOR)", desc: "Recommendation outline files, formatting layouts, and phrasing tips." },
  { badge: "Template", title: "Academic Resume Template", desc: "Standard resume structures optimized for student evaluation boards." }
];

export function ResourcesSection({ onOpenConsultModal }: ResourcesSectionProps) {
  const handlePreview = (title: string) => {
    alert(`Previewing: ${title}\n\nThis document outlines essential guidelines, checklists, and expert tips for international student applications.`);
  };

  const handleDownload = (title: string) => {
    if (onOpenConsultModal) {
      onOpenConsultModal(`Download Gate: ${title}`);
    } else {
      alert(`Please register or book a session to download: ${title}`);
    }
  };

  return (
    <section id="resources-section" className="resources-wrap">
      <div className="container">
        <div className="section-header">
          <h2>Resource Library</h2>
          <p>Unlock professional SOP guides, visa mock lists, and budget worksheets instantly.</p>
        </div>

        <div className="resources-grid-layout">
          {resourcesData.map((res) => (
            <div key={res.title} className="resource-card glass-card h-full flex flex-col justify-between">
              <div>
                <span className="badge">{res.badge}</span>
                <h3>{res.title}</h3>
                <p>{res.desc}</p>
              </div>
              <div className="actions mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <button className="btn-preview !py-1.5 !px-3 !text-xs font-semibold" onClick={() => handlePreview(res.title)}>Preview</button>
                <button className="btn-download !py-1.5 !px-3 !text-xs font-bold" onClick={() => handleDownload(res.title)}>Start My Journey</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
