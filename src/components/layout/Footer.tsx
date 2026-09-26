"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useTenant } from "@/components/providers/TenantProvider";

export function Footer() {
  const tenant = useTenant();

  return (
    <footer className="w-full bg-slate-900 dark:bg-dark-surface/90 text-slate-300 pt-16 pb-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-Column Footer Grid Layout (Recreating approved prototype hierarchy) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-slate-800">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 group focus:outline-none"
              aria-label="UES Abroad Homepage"
            >
              <div className="flex gap-1 h-6 items-center">
                <span className="block w-1.5 h-full bg-[#0A7D45] rounded-sm" />
                <span className="block w-1.5 h-full bg-[#00B050] rounded-sm" />
                <span className="block w-1.5 h-full bg-[#92D050] rounded-sm" />
              </div>
              <span className="text-2xl font-heading font-extrabold text-white tracking-tight">
                {tenant.name.split(" ")[0] || "UES"} <span className="text-primary">{tenant.name.split(" ").slice(1).join(" ") || "Abroad"}</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              A premier global admissions consultancy helping students fulfill their academic goals with end-to-end guidance modules, visa counseling, and university placement.
            </p>
          </div>

          {/* Column 2: Destinations */}
          <div>
            <h4 className="text-white font-heading font-semibold text-base mb-5 tracking-wide">
              Destinations
            </h4>
            <ul className="space-y-3 list-none">
              {[
                { label: "Study in USA", href: "#destinations-section" },
                { label: "Study in UK", href: "#destinations-section" },
                { label: "Study in Canada", href: "#destinations-section" },
                { label: "Study in Germany", href: "#destinations-section" },
                { label: "Study in Australia", href: "#destinations-section" },
                { label: "Study in Ireland", href: "#destinations-section" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Admissions & Services */}
          <div>
            <h4 className="text-white font-heading font-semibold text-base mb-5 tracking-wide">
              Admissions
            </h4>
            <ul className="space-y-3 list-none">
              {[
                { label: "University Explorer", href: "#explorer-section" },
                { label: "Eligibility Checker", href: "#decision-section" },
                { label: "Budget Planner", href: "#decision-section" },
                { label: "Intake Timeline", href: "#decision-section" },
                { label: "Preparation Exams", href: "#resources-section" },
                { label: "Student Testimonials", href: "#testimonials-section" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-4">
            <h4 className="text-white font-heading font-semibold text-base mb-5 tracking-wide">
              Contact Us
            </h4>
            <div className="space-y-3.5 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-1" />
                <div>
                  <span className="block text-xs text-slate-500 uppercase font-semibold">Email</span>
                  <a href={`mailto:${tenant.contact.emailAdmissions}`} className="hover:text-white transition-colors">
                    {tenant.contact.emailAdmissions}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-1" />
                <div>
                  <span className="block text-xs text-slate-500 uppercase font-semibold">Phone</span>
                  <a href={`tel:${tenant.contact.phone}`} className="hover:text-white transition-colors">
                    {tenant.contact.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                <div>
                  <span className="block text-xs text-slate-500 uppercase font-semibold">Address</span>
                  <span className="leading-snug block">{tenant.contact.address}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {tenant.legalName}. Built as a Premium Showcase Presentation Prototype.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-slate-400 transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
