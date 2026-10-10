"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ArrowRight, 
  ChevronDown, 
  Compass, 
  Calendar, 
  GraduationCap, 
  DollarSign 
} from "lucide-react";
import { useTenant } from "@/components/providers/TenantProvider";

interface HeaderProps {
  onOpenConsultModal?: () => void;
}

export function Header({ onOpenConsultModal }: HeaderProps) {
  const tenant = useTenant();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle header scroll blur effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setResourcesOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setResourcesOpen(false);
    }, 150);
  };

  // 5 core direct links - clean, focused, uncluttered
  const primaryNavLinks = [
    { label: "Destinations", href: isHomePage ? "#destinations-section" : "/#destinations-section" },
    { label: "Universities", href: isHomePage ? "#explorer-section" : "/#explorer-section" },
    { label: "Accommodation", href: "/accommodation" },
    { label: "Services", href: isHomePage ? "#decision-section" : "/#decision-section" },
    { label: "Blogs", href: "/blogs" },
  ];

  // Secondary items grouped into a sleek dropdown
  const moreResources = [
    {
      label: "Our Journey",
      desc: "Step-by-step roadmap from profile to campus arrival",
      href: isHomePage ? "#journey-section" : "/#journey-section",
      icon: Compass,
    },
    {
      label: "Seminars & Events",
      desc: "Live interactive university fairs and webinars",
      href: isHomePage ? "#seminar-section" : "/#seminar-section",
      icon: Calendar,
    },
    {
      label: "Exam & Test Prep",
      desc: "IELTS, TOEFL, GRE, GMAT & language modules",
      href: isHomePage ? "#resources-section" : "/#resources-section",
      icon: GraduationCap,
    },
    {
      label: "Forex & Remittance",
      desc: "Live interbank currency lock & tuition payments",
      href: isHomePage ? "#forex-section" : "/#forex-section",
      icon: DollarSign,
    },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 dark:bg-dark-bg/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-dark-border/80 shadow-xs" 
          : "bg-white/70 dark:bg-dark-bg/70 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center min-w-[170px]">
          <Link 
            href={isHomePage ? "#hero-section" : "/"} 
            className="inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-xl py-1 px-1.5"
            aria-label="UES Abroad Homepage"
          >
            <div className="flex gap-1.5 h-7 items-center">
              <span className="block w-1.5 h-full bg-[#0A7D45] rounded-sm transition-transform group-hover:scale-y-110 duration-300" />
              <span className="block w-1.5 h-full bg-[#00B050] rounded-sm transition-transform group-hover:scale-y-110 duration-300 delay-75" />
              <span className="block w-1.5 h-full bg-[#92D050] rounded-sm transition-transform group-hover:scale-y-110 duration-300 delay-150" />
            </div>
            <div className="flex flex-col leading-tight text-left">
              <span className="text-xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight">
                {tenant.name.split(" ")[0] || "UES"}
              </span>
              <span className="text-[10px] font-heading font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase">
                {tenant.name.split(" ").slice(1).join(" ") || "Abroad"}
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links - Spacious & Uncluttered */}
        <nav className="hidden lg:flex items-center justify-center flex-1 px-6" aria-label="Main Navigation">
          <ul className="flex items-center gap-8 list-none">
            {primaryNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors py-2 px-1 relative group ${
                      isActive
                        ? "text-emerald-700 dark:text-emerald-400 font-semibold"
                        : "text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span 
                      className={`absolute bottom-0 left-0 h-0.5 bg-emerald-600 rounded-full transition-all duration-200 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`} 
                    />
                  </Link>
                </li>
              );
            })}

            {/* "More Resources" Dropdown */}
            <li 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setResourcesOpen((prev) => !prev)}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors py-2 px-1 inline-flex items-center gap-1 cursor-pointer focus:outline-none"
                aria-expanded={resourcesOpen}
                aria-haspopup="true"
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${resourcesOpen ? "rotate-180 text-emerald-600" : ""}`} />
              </button>

              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white dark:bg-dark-surface rounded-2xl shadow-xl border border-slate-200/90 dark:border-dark-border p-2 z-50"
                  >
                    <div className="space-y-1">
                      {moreResources.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setResourcesOpen(false)}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-dark-bg/60 transition-colors group"
                          >
                            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="leading-tight">
                              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 block group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                                {item.label}
                              </span>
                              <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                {item.desc}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>
        </nav>

        {/* Primary CTA Button */}
        <div className="hidden lg:flex items-center justify-end min-w-[170px]">
          <button
            onClick={onOpenConsultModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-sm shadow-xs hover:shadow-sm transition-all group cursor-pointer border border-emerald-500/20"
          >
            <span>Start My Journey</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-surface transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden border-t border-slate-200 dark:border-dark-border bg-white/98 dark:bg-dark-bg/98 backdrop-blur-2xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-5 space-y-5">
              <nav aria-label="Mobile Primary Navigation">
                <ul className="space-y-1 list-none">
                  {primaryNavLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block px-4 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                            isActive
                              ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                              : "text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-dark-surface"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Mobile Secondary Resources Group */}
              <div className="pt-3 border-t border-slate-100 dark:border-dark-border">
                <span className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Explore More
                </span>
                <ul className="space-y-1 list-none">
                  {moreResources.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-surface transition-colors"
                        >
                          <Icon className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-dark-border">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenConsultModal) onOpenConsultModal();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-sm shadow-xs transition-all group"
                >
                  <span>Start My Journey</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
