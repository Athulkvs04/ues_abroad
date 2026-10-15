"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Search, 
  Clock, 
  Calendar, 
  ArrowRight, 
  BookOpen, 

  ChevronRight,
  GraduationCap
} from "lucide-react";
import { blogsData } from "@/data/blogs";
import { PublicLayout } from "@/components/layout/PublicLayout";

const categories = [
  "All",
  "Australia",
  "United Kingdom",
  "Canada",
  "Germany",
  "Ireland",
  "Scholarships",
  "Visa Guides",
];

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredBlog = useMemo(() => {
    return blogsData.find((b) => b.featured) || blogsData[0];
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogsData.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query) ||
        blog.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <PublicLayout>
      <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Editorial Top Hero */}
      <section className="relative overflow-hidden bg-[#090b11] text-white pt-28 pb-16 md:pb-24 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(#0A7D45_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        
        <div className="container relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white">Blogs &amp; Study Guides</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span>Official UES Abroad Publication</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Study Abroad Guides, Visa News &amp; Scholarship Insights
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-300 leading-relaxed">
              Curated by certified admissions advisors from our Palakkad, Calicut, and Bangalore branches. Stay ahead with authentic immigration updates, application roadmaps, and student life playbooks.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by country, visa type, scholarship..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="w-full pt-10 sm:pt-14 pb-12">
        <div className="container">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                  active
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200/90 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Featured Post (Only shown when viewing "All" and no search query) */}
        {selectedCategory === "All" && !searchQuery && featuredBlog && (
          <div className="mt-8 mb-14">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                Featured Spotlight
              </h2>
            </div>

            <Link
              href={`/blogs/${featuredBlog.slug}`}
              className="group block bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 h-64 sm:h-80 lg:h-auto relative overflow-hidden bg-slate-900">
                  <img
                    src={featuredBlog.coverImage}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-lg backdrop-blur-md border shadow-sm ${featuredBlog.categoryColor}`}>
                    {featuredBlog.category}
                  </span>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {featuredBlog.date}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredBlog.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                      {featuredBlog.title}
                    </h3>

                    <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3 sm:line-clamp-4">
                      {featuredBlog.excerpt}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {featuredBlog.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{featuredBlog.author.name}</div>
                      <div className="text-[11px] text-slate-500">{featuredBlog.author.role}</div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 group-hover:translate-x-1 transition-transform">
                      Read Full Guide <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            {selectedCategory === "All" ? "All Articles & Insights" : `${selectedCategory} Guides`}
            <span className="ml-2 text-xs font-bold text-slate-400 bg-slate-200/70 px-2 py-0.5 rounded-full">
              {filteredBlogs.length}
            </span>
          </h2>
          {searchQuery && (
            <span className="text-xs text-slate-500">
              Filtering for &ldquo;{searchQuery}&rdquo;
            </span>
          )}
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No matching articles found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any articles matching your search query. Try searching for a different keyword or browse all categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-5 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="h-48 w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <span
                    className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-md backdrop-blur-md border shadow-xs ${blog.categoryColor}`}
                  >
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

                  <h3 className="font-bold text-slate-900 text-base leading-snug mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed flex-1 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-600 truncate max-w-[140px]">
                      {blog.author.name}
                    </span>
                    <span className="font-bold text-emerald-700 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                      Read Guide <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Personalized Consultation Callout Banner */}
        <div className="mt-16 bg-[#064e3b] border border-emerald-600/40 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-4">
              <GraduationCap className="w-4 h-4" />
              <span>Personalized Study Abroad Advisory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Have questions about your university or visa application?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Our seasoned overseas consultants across Palakkad, Calicut, and Bangalore provide free 1-on-1 profile evaluation, course matching, and visa assistance.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/#decision-section"
                className="px-6 py-3 rounded-xl bg-white text-emerald-950 font-bold text-xs uppercase tracking-wider hover:bg-emerald-50 transition-all shadow-md"
              >
                Book Free Consultation →
              </Link>
              <a
                href="https://wa.me/918440021005?text=Hello%20UES%20Abroad!%20I%20was%20reading%20your%20study%20blogs%20and%20need%20personalized%20counseling."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-700/80 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider border border-emerald-500/30 transition-all"
              >
                WhatsApp Advisor
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </PublicLayout>
  );
}
