"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Globe2, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight
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
    workRights: "2-Year Post-Study Visa",
    visaSuccess: "97% Campus France",
    intakes: "Sep & Jan Intake",
    popularFields: ["Luxury Brand Management", "Aerospace Engineering", "Fashion & Design", "Global MBA"],
    highlights: ["World top 10 Business Schools (HEC, INSEAD)", "French Gov Housing Subsidy (CAF grants up to 40%)", "5-Year Schengen visa privilege"],
    banner: "/destinations/france.webp",
  },
  {
    id: "new_zealand",
    flag: "🇳🇿",
    name: "New Zealand",
    region: "Asia-Pacific",
    tuitionRange: "NZD $22,000 – $38,000 / yr",
    livingCost: "NZD $1,200 – $1,600 / mo",
    workRights: "Up to 3-Year Post-Study Visa",
    visaSuccess: "97% INZ Pathway",
    intakes: "Feb & Jul Intake",
    popularFields: ["Information Technology", "Agriculture & Food Science", "Construction Management", "Tourism"],
    highlights: ["Green List fast-track residency careers", "World #1 for future-focused education", "Safe and welcoming multicultural society"],
    banner: "/destinations/new_zealand.webp",
  },
  {
    id: "uae",
    flag: "🇦🇪",
    name: "United Arab Emirates (Dubai)",
    region: "Asia-Pacific",
    tuitionRange: "AED 40,000 – 80,000 / yr",
    livingCost: "AED 3,000 – 5,000 / mo",
    workRights: "10-Year Golden Visa Pathways",
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
      {/* 1. Hero Header */}
      <section className="bg-white border-b border-slate-200/80 pt-12 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="container max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-4">
              <Globe2 className="w-4 h-4 text-emerald-600" />
              <span>Global Country Guides &amp; Admissions</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Compare Top World <span className="accent-text">Study Abroad Destinations</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Find the perfect country for your career goals, budget, and post-study migration plans. Verified data on tuition fees, work rights, and living expenses.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="mt-8 flex flex-wrap gap-2">
            {["All", "Europe", "North America", "Asia-Pacific"].map((reg) => (
              <button
                key={reg}
                type="button"
                onClick={() => setSelectedRegion(reg)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedRegion === reg
                    ? "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/20"
                    : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {reg === "All" ? "All Global Destinations" : reg}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Destination Cards Grid */}
      <section className="py-14 bg-slate-50 min-h-screen">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest, idx) => (
              <div
                key={dest.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={dest.banner}
                      alt={`${dest.name} Study Destination`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={idx < 3}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/90 backdrop-blur-xs text-slate-900 text-xs font-extrabold shadow-xs">
                      <span className="text-base">{dest.flag}</span>
                      <span>{dest.name}</span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 z-10 text-[11px] text-emerald-300 font-bold drop-shadow-sm flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      <span>{dest.workRights}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500">Average Tuition:</span>
                        <span className="font-bold text-emerald-700 font-mono text-right">{dest.tuitionRange}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500">Living Expenses:</span>
                        <span className="font-semibold text-slate-800">{dest.livingCost}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500">Intakes:</span>
                        <span className="font-medium text-slate-700">{dest.intakes}</span>
                      </div>
                    </div>

                    {/* Key Highlights */}
                    <div className="mt-4 space-y-1.5">
                      {dest.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600 leading-tight">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Popular Degrees */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {dest.popularFields.map((f, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <Link
                    href={`/universities`}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-emerald-600 text-slate-700 hover:text-white border border-slate-200 hover:border-emerald-600 font-bold text-xs transition-all flex items-center justify-center gap-1.5 text-center"
                  >
                    <span>View Universities in {dest.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* 3. Comprehensive Comparison Matrix */}
          <div className="mt-16 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm overflow-x-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Country Comparison Matrix
            </h3>
            <p className="text-xs text-slate-500 mb-6">Side-by-side comparison of post-study stay back, part-time work, and financial requirements.</p>

            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3">Country</th>
                  <th className="py-3 px-3">Tuition / yr</th>
                  <th className="py-3 px-3">Living / mo</th>
                  <th className="py-3 px-3">Post-Study Work</th>
                  <th className="py-3 px-3">Part-Time Work</th>
                  <th className="py-3 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {DESTINATIONS.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{d.flag}</span>
                      <span>{d.name}</span>
                    </td>
                    <td className="py-3 px-3 font-bold text-emerald-700 font-mono">{d.tuitionRange}</td>
                    <td className="py-3 px-3 text-slate-600">{d.livingCost}</td>
                    <td className="py-3 px-3 text-slate-800">{d.workRights}</td>
                    <td className="py-3 px-3 text-slate-600">20 hrs / wk (Full-time in breaks)</td>
                    <td className="py-3 px-3">
                      <Link href="/universities" className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline">
                        Explore →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 4. Bottom Mentoring CTA */}
          <div className="mt-12 bg-gradient-to-br from-[#0A7D45] via-emerald-700 to-[#075A32] rounded-3xl p-8 sm:p-10 text-white shadow-premium text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold mb-3 border border-white/20">
              Personalized Shortlisting
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
              Not sure which destination fits your profile?
            </h3>
            <p className="text-emerald-100 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
              Book a 1-on-1 profile evaluation with our senior education counsellors. We match your academic CGPA, budget, and career goals with the best country pathways.
            </p>
            <Link
              href="/#hero-section"
              className="inline-block px-8 py-3.5 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-sm shadow-md transition-all"
            >
              Start Free Profile Evaluation
            </Link>
          </div>

        </div>
      </section>
    </PublicLayout>
  );
}
