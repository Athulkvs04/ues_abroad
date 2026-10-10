"use client";

import React, { useState } from "react";
import Link from "next/link";
import { blogsData } from "@/data/blogs";
import { ArrowRight, Clock } from "lucide-react";

interface BlogsSectionProps {
  onOpenConsultModal?: (source?: string) => void;
}

const categories = ["All", "Australia", "United Kingdom", "Canada", "Germany", "Scholarships", "Visa Guides"];

export function BlogsSection({ onOpenConsultModal }: BlogsSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" 
    ? blogsData.slice(0, 6) 
    : blogsData.filter((b) => b.category === activeCategory).slice(0, 6);

  return (
    <section id="blogs-section" className="blogs-wrap py-24 bg-white border-b border-slate-200/60">
      <div className="container">
        {/* Section Header */}
        <div className="section-header max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
            <span>Study Abroad Knowledge Vault</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Latest Guides &amp; <span className="text-emerald-700">Immigration News</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            In-depth guides on scholarships, visa requirements, IELTS waivers, and country comparisons written by our certified advisors.
          </p>
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
            <Link
              key={blog.id}
              href={`/blogs/${blog.slug}`}
              className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Photo Cover Band */}
              <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-md backdrop-blur-md border shadow-xs ${blog.categoryColor}`}>
                  {blog.category}
                </span>
                {blog.trending && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold bg-slate-900/90 backdrop-blur-sm text-amber-300 border border-slate-700 px-2 py-0.5 rounded-md shadow-xs">
                    Trending
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {blog.readTime}
                  </span>
                  <span>·</span>
                  <span>{blog.date}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed flex-1 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400">
                  <span className="truncate max-w-[130px] font-medium text-slate-600">
                    {blog.author.name}
                  </span>
                  <span className="text-emerald-700 font-bold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    Read Guide →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button leading to dedicated /blogs hub */}
        <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 py-3.5 px-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md group"
          >
            <span>Explore All Blogs &amp; Guides</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button
            onClick={() => onOpenConsultModal && onOpenConsultModal("Blogs Section Consultation")}
            className="py-3 px-6 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition-all"
          >
            Request 1-on-1 Profile Review
          </button>
        </div>
      </div>
    </section>
  );
}
