"use client";

import React from "react";

interface BlogsSectionProps {
  onOpenConsultModal?: (source?: string) => void;
}

const blogsData = [
  { id: "blog-1", title: "How to Secure a Fully-Funded DAAD Scholarship for Germany", category: "Scholarships", time: "5 min read", trending: true, summary: "Step-by-step guideline detailing requirements, deadlines, and documentation formats.", body: "The German Academic Exchange Service (DAAD) offers excellent scholarships for international students. To qualify, you need a bachelor's degree not older than 6 years, and at least 2 years of professional work experience. Apply between August and October for English-taught Master courses." },
  { id: "blog-2", title: "Understanding the STEM OPT Extension in USA (3-Year Work Rights)", category: "Visa Guide", time: "8 min read", trending: true, summary: "A comprehensive guide on F-1 student OPT extension limits and sponsor validation.", body: "Under the USA F-1 visa system, graduates in Science, Technology, Engineering, and Math (STEM) fields can apply for a 24-month Optional Practical Training (OPT) extension, totaling 3 years of work authorization. This allows students to gain high-value work experience without immediate H-1B sponsorship requirements." },
  { id: "blog-3", title: "GIC Deposit Changes for Canada Student Visas (SDS Rules)", category: "Visa News", time: "4 min read", trending: false, summary: "Check the updated financial requirements before filing your Study Permit.", body: "Immigration, Refugees and Citizenship Canada (IRCC) has raised the Guaranteed Investment Certificate (GIC) limit to CAD $20,635 to index cost of living. Students applying under the Student Direct Stream (SDS) must purchase the GIC from partner banks before submission." }
];

export function BlogsSection({ onOpenConsultModal }: BlogsSectionProps) {
  const handleReadPost = (title: string, body: string) => {
    alert(`📖 ${title}\n\n${body}`);
    if (onOpenConsultModal) {
      // optional
    }
  };

  return (
    <section id="blogs-section" className="blogs-wrap">
      <div className="container">
        <div className="section-header">
          <h2>Latest from Blogs &amp; News</h2>
          <p>Read about recent immigration changes, exam preparation models, and student life.</p>
        </div>

        <div className="blogs-grid-layout" id="blogs-grid-container">
          {blogsData.map((blog) => (
            <div key={blog.id} className="blog-post-card glass-card h-full flex flex-col justify-between">
              <div>
                <span className="badge">{blog.category} {blog.trending ? "• 🔥 Trending" : ""}</span>
                <h3 style={{ marginTop: "0.5rem" }}>{blog.title}</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.4, marginBottom: "1.5rem" }}>{blog.summary}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "0.75rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                <span>{blog.time}</span>
                <a 
                  style={{ color: "var(--primary)", fontWeight: 600, cursor: "pointer" }} 
                  onClick={() => handleReadPost(blog.title, blog.body)}
                >
                  Read Post →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
