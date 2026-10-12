"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Globe2, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight,
  Compass
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";

interface DestinationItem {
  id: string;
  flag: string;
  name: string;
  region: "Europe" | "North America" | "Asia-Pacific";
  tuitionRange: string;
  livingCost: string;
  workRights: string;
  visaSuccess: string;
  intakes: string;
  popularFields: string[];
  highlights: string[];
  banner: string;
}

const DESTINATIONS: DestinationItem[] = [
  {
    id: "germany",
    flag: "🇩🇪",
    name: "Germany",
    region: "Europe",
    tuitionRange: "€0 (Public Universities)",
    livingCost: "€850 – €1,100 / mo",
    workRights: "18 Months Job Seeker Visa",
    visaSuccess: "98% with UES Guidance",
    intakes: "Winter (Oct) & Summer (Apr)",
    popularFields: ["Automotive & Robotics", "Computer Science", "Mechanical Engineering", "Renewable Energy"],
    highlights: ["100% Tuition-Free at Top Public Universities", "EU Blue Card fast-track immigration", "No language barrier for English Master's"],
    banner: "/universities/tum_garching.webp",
  },
  {
    id: "uk",
    flag: "🇬🇧",
    name: "United Kingdom",
    region: "Europe",
    tuitionRange: "£14,000 – £28,000 / yr",
    livingCost: "£800 – £1,300 / mo",
    workRights: "2-Year Graduate Route Visa",
    visaSuccess: "99% Direct CAS Filing",
    intakes: "Sep / Jan / May",
    popularFields: ["Business & MBA", "Artificial Intelligence", "Finance & FinTech", "Healthcare & Nursing"],
    highlights: ["1-Year Fast-Track Master's Degrees", "Russell Group Global Prestige", "No IELTS options for 70%+ English marks"],
    banner: "/universities/cambridge_kings_lawn.webp",
  },
  {
    id: "usa",
    flag: "🇺🇸",
    name: "United States",
    region: "North America",
    tuitionRange: "$24,000 – $55,000 / yr",
    livingCost: "$1,000 – $1,800 / mo",
    workRights: "3-Year STEM OPT Work Rights",
    visaSuccess: "95% Mock Drill Rate",
    intakes: "Fall (Aug) & Spring (Jan)",
    popularFields: ["Computer Science & AI", "Data Science", "Biomedical Engineering", "Quantitative Finance"],
    highlights: ["Highest Global Starting Salaries ($85k+)", "3-Year STEM OPT extension", "Generous TA/RA on-campus assistantships"],
    banner: "/universities/columbia_morningside.webp",
  },
  {
    id: "canada",
    flag: "🇨🇦",
    name: "Canada",
    region: "North America",
    tuitionRange: "CAD $18,000 – $36,000 / yr",
    livingCost: "CAD $900 – $1,400 / mo",
    workRights: "Up to 3-Year PGWP Work Permit",
    visaSuccess: "94% SDS Certified",
    intakes: "Sep / Jan / May",
    popularFields: ["Software Engineering", "Business Analytics", "Supply Chain", "Hospitality Management"],
    highlights: ["Direct Express Entry PR Pathway", "Fast-Track SDS Visa stream", "Post-Graduation Work Permit (PGWP)"],
    banner: "/universities/toronto_campus.webp",
  },
  {
    id: "australia",
    flag: "🇦🇺",
    name: "Australia",
    region: "Asia-Pacific",
    tuitionRange: "AUD $24,000 – $48,000 / yr",
    livingCost: "AUD $1,400 – $1,900 / mo",
    workRights: "Up to 4-Year Post-Study Work",
    visaSuccess: "96% SSVF Compliant",
    intakes: "Feb / Jul / Sep",
    popularFields: ["Cybersecurity", "Mining & Civil Engineering", "Nursing & Public Health", "Information Systems"],
    highlights: ["Regional migration points bonus", "Group of Eight world top 50 rankings", "High student minimum wages (AUD $23.23/hr)"],
    banner: "/universities/unsw_orientation.webp",
  },
  {
    id: "ireland",
    flag: "🇮🇪",
    name: "Ireland",
    region: "Europe",
    tuitionRange: "€12,000 – €24,000 / yr",
    livingCost: "€850 – €1,200 / mo",
    workRights: "2-Year Stamp 1G Stay Back",
    visaSuccess: "98% Official Processing",
    intakes: "Sep & Jan Intake",
    popularFields: ["Biotechnology & Pharma", "Data Analytics", "FinTech", "Cloud Computing"],
    highlights: ["European Silicon Valley (Google, Apple, Meta HQ)", "English-speaking European hub", "High PR transition rate after 2 years"],
    banner: "/universities/trinity_chapel_steps.webp",
  },
  {
    id: "france",
    flag: "🇫🇷",
    name: "France",
    region: "Europe",
    tuitionRange: "€4,000 – €18,000 / yr",
    livingCost: "€700 – €1,100 / mo",
    workRights: "2-Year APS / Post-Study Visa",
    visaSuccess: "97% Campus France Certified",
    intakes: "Sep & Feb Intake",
    popularFields: ["Luxury Brand Management", "Aerospace Engineering", "Fashion & Design", "International Business"],
    highlights: ["State-subsidized tuition for international students", "French CAF housing subsidy covers up to 40% rent", "World-renowned Grandes Écoles"],
    banner: "/destinations/france.webp",
  },
  {
    id: "new_zealand",
    flag: "🇳🇿",
    name: "New Zealand",
    region: "Asia-Pacific",
    tuitionRange: "NZD $22,000 – $38,000 / yr",
    livingCost: "NZD $1,100 – $1,600 / mo",
    workRights: "3-Year Open Work Visa",
    visaSuccess: "96% Verified Submissions",
    intakes: "Feb & Jul Intake",
    popularFields: ["AgriBusiness & Food Tech", "Environmental Science", "IT & Data Science", "Civil Engineering"],
    highlights: ["High quality of life and safe environment", "3-Year post-study open work rights", "Green List fast-track residency pathways"],
    banner: "/destinations/new_zealand.webp",
  },
  {
    id: "uae",
    flag: "🇦🇪",
    name: "United Arab Emirates (Dubai)",
    region: "Asia-Pacific",
    tuitionRange: "AED 40,000 – 80,000 / yr",
    livingCost: "AED 3,000 – 5,500 / mo",
    workRights: "Full-Time Work Opportunities",
    visaSuccess: "99% Fast 7-Day Visa",
    intakes: "Sep & Jan Intake",
    popularFields: ["Global Business & Trade", "Hospitality Management", "Artificial Intelligence", "Architecture"],
    highlights: ["100% Tax-Free High Earning Potential", "British & Australian University Campuses in Dubai", "Fast 7-day student visa turnaround"],
    banner: "/destinations/uae.webp",
  }
];

export default function DestinationsPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");

  const filteredDestinations = DESTINATIONS.filter((d) => {
    if (selectedRegion === "All") return true;
    return d.region === selectedRegion;
  });

  return (
    <PublicLayout>
      {/* 1. Hero Header with Authentic Real Historic University Landscape */}
      <section className="relative overflow-hidden min-h-[480px] lg:min-h-[520px] flex items-center bg-slate-950 text-white border-b border-slate-800">
        {/* Full-bleed Real 4K High-Resolution Historic University Campus Landscape */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <Image
            src="/universities/cambridge_kings_real_wide.jpg"
            alt="Historic King's College Chapel Cambridge Architecture"
            fill
            priority
            className="object-cover object-[center_40%] lg:object-[center_35%]"
          />
          {/* Smooth seamless left scrim: provides natural contrast directly on canvas with NO box */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 via-42% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30" />
        </div>

        <div className="container max-w-6xl mx-auto px-4 py-16 lg:py-20 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-xs font-semibold mb-5 backdrop-blur-xs">
              <Globe2 className="w-4 h-4 text-emerald-400" />
              <span>Global Country Guides &amp; Admissions Roadmap</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Compare Premier World <span className="text-emerald-400">Study Destinations</span>
            </h1>
            
            <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-xl">
              Explore 9 world-leading academic nations. Verified tuition fee ranges, living cost benchmarks, and post-study work visa policies to guide your overseas education decision.
            </p>

            {/* Region Filter Tabs directly on canvas - NO box */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              {["All", "Europe", "North America", "Asia-Pacific"].map((reg) => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    selectedRegion === reg
                      ? "bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-400/40 font-extrabold"
                      : "bg-black/40 text-slate-200 border border-white/20 hover:bg-white/15 hover:text-white backdrop-blur-xs"
                  }`}
                >
                  {reg === "All" ? "All Global Destinations" : reg}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Destination Cards Grid with subtle texture */}
      <section className="py-16 bg-slate-50/90 border-b border-slate-200/80 min-h-screen relative">
        {/* Subtle dot mesh background for depth */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-25" 
          style={{
            backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }} 
        />

        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-slate-600 font-medium">
              Showing <strong className="text-slate-900">{filteredDestinations.length}</strong> destination profiles
            </p>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Updated for 2026/2027 Intakes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={dest.banner}
                      alt={`${dest.name} Study Destination`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                    
                    {/* Region Pill */}
                    <div className="absolute top-3.5 right-3.5">
                      <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                        {dest.region}
                      </span>
                    </div>

                    {/* Flag & Name */}
                    <div className="absolute bottom-3.5 left-4 flex items-center gap-2.5">
                      <span className="text-3xl drop-shadow-md">{dest.flag}</span>
                      <div>
                        <h3 className="text-xl font-bold text-white tracking-tight leading-tight drop-shadow-sm">
                          {dest.name}
                        </h3>
                        <span className="text-[11px] text-emerald-300 font-semibold">
                          Intakes: {dest.intakes}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-2.5 mb-5 pb-5 border-b border-slate-100">
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Tuition / yr</span>
                        <span className="text-xs font-bold text-slate-900 mt-0.5 block">{dest.tuitionRange}</span>
                      </div>
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Living Cost</span>
                        <span className="text-xs font-bold text-slate-900 mt-0.5 block">{dest.livingCost}</span>
                      </div>
                    </div>

                    {/* Post Study Work Badge */}
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50/80 border border-emerald-200/60 text-emerald-900 text-xs font-semibold mb-5">
                      <Briefcase className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{dest.workRights}</span>
                    </div>

                    {/* Popular Fields */}
                    <div className="mb-5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Top Disciplines
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {dest.popularFields.map((f) => (
                          <span
                            key={f}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2 mb-2">
                      {dest.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="leading-snug">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/universities`}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <span>View {dest.name} Universities</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Comprehensive Comparison Table */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-3">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>Side-by-Side Analysis</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Country Comparison Matrix
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Direct comparison of post-study work rights, living costs, and average annual tuition fees.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                <tr>
                  <th className="py-4 px-5 font-bold uppercase tracking-wider text-[11px]">Country</th>
                  <th className="py-4 px-5 font-bold uppercase tracking-wider text-[11px]">Tuition / Year</th>
                  <th className="py-4 px-5 font-bold uppercase tracking-wider text-[11px]">Living Cost</th>
                  <th className="py-4 px-5 font-bold uppercase tracking-wider text-[11px]">Stay-Back Visa</th>
                  <th className="py-4 px-5 font-bold uppercase tracking-wider text-[11px]">Work Rights (Study)</th>
                  <th className="py-4 px-5 font-bold uppercase tracking-wider text-[11px]">Visa Success</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DESTINATIONS.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-5 font-bold text-slate-900 flex items-center gap-2">
                      <span className="text-xl">{d.flag}</span>
                      <span>{d.name}</span>
                    </td>
                    <td className="py-4 px-5 text-slate-700 font-semibold">{d.tuitionRange}</td>
                    <td className="py-4 px-5 text-slate-600">{d.livingCost}</td>
                    <td className="py-4 px-5">
                      <span className="inline-flex px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/60">
                        {d.workRights}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-slate-600">20–24 hrs / week</td>
                    <td className="py-4 px-5 font-semibold text-emerald-700">{d.visaSuccess}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Bottom Advisory CTA Banner */}
      <section className="py-16 bg-slate-950 text-white relative overflow-hidden">
        <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Unsure Which Country Best Fits Your Profile?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light">
            Our certified international academic advisors analyze your CGPA, IELTS score, and budget to build a custom shortlist of countries and universities.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/universities"
              className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Explore Universities
            </Link>
            <Link
              href="/forex"
              className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Student Forex Portal
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
