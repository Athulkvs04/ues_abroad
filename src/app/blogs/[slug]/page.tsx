import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { 
  getBlogBySlug, 
  getAllBlogs, 
  getRelatedBlogs 
} from "@/data/blogs";
import { 
  Clock, 
  Calendar, 
  ArrowLeft, 
  CheckCircle2, 
  Share2, 
  MessageCircle, 
  PhoneCall, 
  MapPin, 
  GraduationCap, 
  ArrowRight,
  BookOpen
} from "lucide-react";
import { ShareBar } from "./ShareBar";
import { PublicLayout } from "@/components/layout/PublicLayout";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllBlogs().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found | UES Abroad",
      description: "The requested study abroad guide could not be located.",
    };
  }

  return {
    title: `${blog.title} | UES Abroad Guides`,
    description: blog.excerpt,
    keywords: [...blog.tags, blog.category, "UES Abroad", "Study Abroad Palakkad", "Study Abroad Calicut"],
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: blog.coverImage, width: 1200, height: 630, alt: blog.title }],
      type: "article",
      publishedTime: blog.date,
      authors: [blog.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const related = getRelatedBlogs(slug, 3);

  // Simple formatting helper for markdown headings, lists, and paragraphs
  const renderFormattedContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];

    const flushList = (keyPrefix: string) => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`${keyPrefix}-list`} className="space-y-2.5 my-4">
            {currentList.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-slate-700 text-sm sm:text-base leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
        const itemText = trimmed.replace(/^[-•]\s*/, "");
        // Format bold text inside list item
        const formatted = itemText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        currentList.push(formatted);
      } else {
        flushList(`flush-${index}`);

        if (trimmed.startsWith("### ")) {
          elements.push(
            <h3 key={index} className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3 tracking-tight">
              {trimmed.replace(/^###\s*/, "")}
            </h3>
          );
        } else if (trimmed.startsWith("## ")) {
          elements.push(
            <h2 key={index} className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-10 mb-4 tracking-tight">
              {trimmed.replace(/^##\s*/, "")}
            </h2>
          );
        } else if (trimmed.length > 0) {
          // Format bold in paragraphs
          const formatted = trimmed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
          elements.push(
            <p
              key={index}
              className="text-slate-700 text-sm sm:text-base leading-relaxed my-3"
              dangerouslySetInnerHTML={{ __html: formatted }}
            />
          );
        }
      }
    });

    flushList("final");
    return elements;
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-white">
      {/* Editorial Header */}
      <div className="bg-slate-50/70 border-b border-slate-200/80 pt-28 pb-12">
        <div className="container max-w-4xl">
          {/* Breadcrumb Back Link */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Blogs</span>
          </Link>

          {/* Meta Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${blog.categoryColor}`}>
              {blog.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {blog.date}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5" />
              {blog.readTime}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {blog.title}
          </h1>

          {/* Subtitle / Excerpt */}
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {blog.excerpt}
          </p>

          {/* Author info & Interactive Share Bar */}
          <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center border border-emerald-200">
                {blog.author.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{blog.author.name}</div>
                <div className="text-xs text-slate-500">{blog.author.role}</div>
              </div>
            </div>

            <ShareBar title={blog.title} slug={blog.slug} />
          </div>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className="container max-w-5xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Article Main Column */}
          <article className="lg:col-span-8">
            {/* Featured Image */}
            <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-200 mb-8 aspect-video relative bg-slate-900">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Key Takeaways Callout Box */}
            {blog.keyTakeaways && blog.keyTakeaways.length > 0 && (
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 sm:p-7 mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  <h2 className="text-sm sm:text-base font-bold text-emerald-950 uppercase tracking-wider">
                    Key Highlights &amp; Summary
                  </h2>
                </div>
                <ul className="space-y-2 sm:space-y-2.5">
                  {blog.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-900 leading-relaxed">
                      <span className="font-bold text-emerald-700 shrink-0">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Formatted Content */}
            <div className="text-slate-800 leading-relaxed font-sans text-base">
              {renderFormattedContent(blog.content)}
            </div>

            {/* Tags Pill Bar */}
            <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-2">Tags:</span>
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors px-3 py-1 rounded-lg"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author Attribution Card */}
            <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-700 text-white font-bold text-base flex items-center justify-center shrink-0">
                UES
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Published by {blog.author.name}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  UES Abroad is an official overseas education advisory network with branches in Palakkad (HQ), Calicut, Ottapalam, Mannarkkad, Bangalore, and Hyderabad. Our certified counsellors have guided 15,000+ students into top international universities worldwide.
                </p>
              </div>
            </div>
          </article>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Consultation Action Widget */}
            <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-sm border-2 border-emerald-100 sticky top-28">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-4">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                <span>Free 1-on-1 Counseling</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 leading-snug">
                Planning to study in {blog.category}?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Connect with our certified counsellors for university shortlisting, tuition fee waivers, and visa guidance.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={`https://wa.me/918440021005?text=Hello%20UES%20Abroad!%20I%20am%20reading%20your%20article%20on%20${encodeURIComponent(blog.title)}%20and%20would%20like%20guidance.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href="tel:+918440021005"
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-200 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-700" />
                  <span>Call +91 84400 21005</span>
                </a>
              </div>

              {/* Branch quick info */}
              <div className="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-600 space-y-2.5 bg-slate-50/80 -mx-6 -mb-6 sm:-mx-7 sm:-mb-7 p-5 rounded-b-3xl">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Palakkad HQ:</strong> 1st Floor V Square, Head Post Office Road</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Calicut:</strong> 3rd Floor, AKK Building, Nadakkavu Cross Rd</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Articles Section */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Related Study Guides &amp; Insights
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  More articles to help prepare your global education journey.
                </p>
              </div>
              <Link
                href="/blogs"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"
              >
                <span>View all blogs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blogs/${rel.slug}`}
                  className="group bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <div className="h-40 relative bg-slate-100 overflow-hidden">
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md border ${rel.categoryColor}`}>
                      {rel.category}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="text-[11px] text-slate-400 mb-1 flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{rel.readTime}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-700 transition-colors mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 flex-1">
                      {rel.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </PublicLayout>
  );
}
