"use client";

import React, { useState } from "react";

interface BlogsSectionProps {
  onOpenConsultModal?: (source?: string) => void;
}

const blogsData = [
  {
    id: "blog-1",
    title: "How to Secure a Fully-Funded DAAD Scholarship for Germany",
    category: "Scholarships",
    categoryColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    time: "5 min read",
    author: "Anjali Mehta",
    date: "Sep 2024",
    trending: true,
    summary: "Step-by-step guideline detailing requirements, deadlines, and documentation formats for DAAD.",
    body: "The German Academic Exchange Service (DAAD) offers excellent scholarships for international students worth up to €1,200/month. To qualify, you need:\n\n• A bachelor's degree not older than 6 years\n• At least 2 years of professional work experience (for some programs)\n• A university admission letter or application in process\n• Strong academic transcripts (CGPA 7.5+)\n\nApplication Window: August to October for English-taught Master's programs. Key documents: motivation letter, CV, 2 reference letters, transcripts, degree certificate, language certificate.\n\nPro Tip from UES: Contact your target university's International Office to confirm if they are a DAAD partner institution before applying. Paired with our SOP drafting service, our 2024 batch had an 82% DAAD acceptance rate."
  },
  {
    id: "blog-2",
    title: "Understanding the STEM OPT Extension in USA (3-Year Work Rights)",
    category: "Visa Guide",
    categoryColor: "bg-blue-50 text-blue-800 border-blue-200",
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    time: "8 min read",
    author: "Rahul Sharma",
    date: "Oct 2024",
    trending: true,
    summary: "A comprehensive guide on F-1 student OPT extension limits and employer sponsor validation.",
    body: "Under the USA F-1 visa system, graduates in Science, Technology, Engineering, and Math (STEM) fields can apply for a 24-month Optional Practical Training (OPT) extension, totaling 3 years of work authorization.\n\nEligibility:\n• Must graduate from a US-accredited institution\n• Employer must be enrolled in E-Verify\n• Must apply before your current OPT EAD expires\n\nTimeline:\n• Standard OPT: 12 months\n• STEM Extension: +24 months\n• Total: 36 months\n\nUES Advisory: Start your OPT application at least 90 days before your program end date. We provide complete OPT/STEM advisory as part of our US Post-Arrival package."
  },
  {
    id: "blog-3",
    title: "GIC Deposit Changes for Canada Study Permits (Updated 2024)",
    category: "Visa News",
    categoryColor: "bg-rose-50 text-rose-800 border-rose-200",
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    time: "4 min read",
    author: "Preethi Nair",
    date: "Oct 2024",
    trending: false,
    summary: "Check the updated financial requirements before filing your Study Permit application.",
    body: "Immigration, Refugees and Citizenship Canada (IRCC) has raised the Guaranteed Investment Certificate (GIC) limit to CAD $20,635 to index the rising cost of living.\n\nWhat changed:\n• Old requirement: CAD $10,000\n• New requirement: CAD $20,635\n• Effective: January 2024 applications\n\nWho is affected:\n• Students applying under the Student Direct Stream (SDS)\n• All SDS-eligible countries including India, China, Philippines\n\nGIC must be purchased from IRCC-approved financial institutions: ICICI Bank Canada, SBI Canada, Scotiabank, or RBC.\n\nUES Note: We pre-fill your GIC instruction letter and bank liaison as part of our Canada application package."
  },
  {
    id: "blog-4",
    title: "Germany APS Certificate: The Step Most Students Miss",
    category: "Visa Guide",
    categoryColor: "bg-blue-50 text-blue-800 border-blue-200",
    coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    time: "6 min read",
    author: "Rohan Gupta",
    date: "Aug 2024",
    trending: true,
    summary: "APS verification is mandatory for Indian students applying to German universities. Here's the full process.",
    body: "The Academic Evaluation Centre (APS) certificate is mandatory for Indian students applying to German public universities. Without it, universities will not process your application.\n\nProcess:\n1. Register online at aps-india.de\n2. Submit all academic documents (original + German-certified translation)\n3. Attend an in-person interview at APS Delhi or Chennai\n4. Receive certificate in 3-6 weeks\n\nDocuments required:\n• All mark sheets (10th, 12th, Bachelor's)\n• Degree certificate (original)\n• Birth certificate\n• Valid passport\n\nUES handles the entire APS appointment booking, document preparation, and German translation coordination for our Germany-bound students."
  },
  {
    id: "blog-5",
    title: "Top 5 Scholarships for Indian Students in the UK (2024-25)",
    category: "Scholarships",
    categoryColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    coverImage: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?auto=format&fit=crop&w=800&q=80",
    time: "7 min read",
    author: "Sneha Iyer",
    date: "Sep 2024",
    trending: false,
    summary: "Chevening, Commonwealth, and more — the complete list of funded scholarships for UK-bound students.",
    body: "Here are the top scholarships available for Indian students studying in the UK:\n\n1. Chevening Scholarship (UK Government)\n• Fully funded: tuition + living + flights\n• For: Master's students with 2+ years work experience\n• Deadline: November annually\n\n2. Commonwealth Scholarship (CSCUK)\n• Covers: tuition + living + airfare\n• For: Students from Commonwealth developing countries\n• Deadline: December annually\n\n3. Gates Cambridge Scholarship\n• Full funding for PhD/MS at Cambridge\n• Extremely competitive — 80 places worldwide\n\n4. University-specific scholarships\n• Oxford: Clarendon (Full funding, 100+ awards)\n• Imperial: President's Scholarship (£25,000)\n• UCL: Global Excellence Scholarship (50% fees)\n\nUES Tip: Apply for at least 3 scholarships simultaneously. Our SOP team specializes in scholarship-specific motivation letters."
  },
  {
    id: "blog-6",
    title: "Student Life in Munich: A Real Budget Breakdown",
    category: "Campus Life",
    categoryColor: "bg-amber-50 text-amber-800 border-amber-200",
    coverImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
    time: "6 min read",
    author: "Aditya Rao",
    date: "Oct 2024",
    trending: false,
    summary: "A month-by-month real-world breakdown of living costs for Indian students in Munich.",
    body: "Here is a real monthly budget breakdown from our 2024 alumni currently studying in Munich:\n\nBlocked Account (mandatory): €934/month withdrawn\n\nActual monthly spends:\n• Rent (WG shared room): €550 - €700\n• Public transport (semester ticket): €70 (one-time per semester)\n• Groceries (Aldi/Lidl): €150 - €200\n• Eating out (2-3 times/week): €80 - €120\n• Phone plan: €10 - €20\n• Miscellaneous: €50 - €80\n• Total: ~€860 - €1,120/month\n\nSaving tips:\n• Use the MVV semester ticket — covers all Munich public transport\n• Mensa (university canteen) meals cost €2.50 - €4.50\n• Buy second-hand furniture on Kleinanzeigen before arrival\n• Open a Deutsche Bank student account (zero fees)\n\nUES provides a complete pre-departure city guide and connects you with our Munich alumni WhatsApp group."
  }
];

const categories = ["All", "Scholarships", "Visa Guide", "Visa News", "Campus Life"];

export function BlogsSection({ onOpenConsultModal }: BlogsSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openBlog, setOpenBlog] = useState<typeof blogsData[0] | null>(null);

  const filtered = activeCategory === "All" ? blogsData : blogsData.filter((b) => b.category === activeCategory);

  return (
    <section id="blogs-section" className="blogs-wrap py-24 bg-white border-b border-slate-100">
      <div className="container">
        <div className="section-header">
          <h2>Latest from <span className="accent-text">Blogs &amp; News</span></h2>
          <p>Immigration changes, scholarship deadlines, visa guides, and real student life stories.</p>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                activeCategory === cat
                  ? "bg-slate-900 text-white border-slate-900 shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filtered.map((blog) => (
            <div key={blog.id} className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
              {/* Photo Cover Band */}
              <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-md backdrop-blur-md border shadow-sm ${blog.categoryColor}`}>
                  {blog.category}
                </span>
                {blog.trending && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold bg-slate-900/80 backdrop-blur-sm text-amber-300 border border-slate-700 px-2 py-0.5 rounded-md shadow-sm">
                    Trending
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-slate-900 text-sm leading-snug mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed flex-1 mb-4 line-clamp-3">
                  {blog.summary}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400">
                  <span>{blog.author} · {blog.date}</span>
                  <div className="flex items-center gap-3">
                    <span>{blog.time}</span>
                    <button
                      onClick={() => setOpenBlog(blog)}
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      Read Article →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            className="py-3 px-8 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all"
            onClick={() => onOpenConsultModal && onOpenConsultModal("Blogs • View All")}
          >
            View All Articles →
          </button>
        </div>
      </div>

      {/* Article Drawer / Modal */}
      {openBlog && (
        <div className="fixed inset-0 z-[200] flex justify-end" onClick={() => setOpenBlog(null)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          {/* Drawer panel */}
          <div
            className="relative z-10 w-full max-w-xl bg-white h-full overflow-y-auto shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Editorial Photo Header */}
            <div className="h-56 relative overflow-hidden shrink-0 bg-slate-900">
              <img 
                src={openBlog.coverImage} 
                alt={openBlog.title}
                className="w-full h-full object-cover opacity-80" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <button
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white font-bold text-sm flex items-center justify-center hover:bg-black/60 transition-all"
                onClick={() => setOpenBlog(null)}
                aria-label="Close"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border inline-block mb-2 bg-white/90 backdrop-blur-md ${openBlog.categoryColor}`}>
                  {openBlog.category}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
                  {openBlog.title}
                </h2>
              </div>
            </div>

            {/* Article content */}
            <div className="p-6 sm:p-8 flex-1">
              <div className="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-slate-100">
                <span>By {openBlog.author}</span>
                <span>·</span>
                <span>{openBlog.date}</span>
                <span>·</span>
                <span>{openBlog.time}</span>
              </div>

              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line font-sans">
                {openBlog.body}
              </div>

              <div className="mt-8 p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <p className="text-sm font-bold text-emerald-950 mb-1">Want personalised scholarship guidance?</p>
                <p className="text-xs text-emerald-800 mb-3">Our counsellors will review your profile and match eligible scholarships in a free 30-minute session.</p>
                <button
                  className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                  onClick={() => { setOpenBlog(null); onOpenConsultModal && onOpenConsultModal(`Blogs • ${openBlog.title}`); }}
                >
                  Start My Journey →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
