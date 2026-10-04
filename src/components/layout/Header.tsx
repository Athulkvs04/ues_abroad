"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { useTenant } from "@/components/providers/TenantProvider";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  onOpenConsultModal?: () => void;
}

export function Header({ onOpenConsultModal }: HeaderProps) {
  const tenant = useTenant();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { label: "Home", href: isHomePage ? "#hero-section" : "/" },
    { label: "Destinations", href: isHomePage ? "#destinations-section" : "/#destinations-section" },
    { label: "Universities", href: isHomePage ? "#explorer-section" : "/#explorer-section" },
    { label: "Services", href: isHomePage ? "#decision-section" : "/#decision-section" },
    { label: "Accommodation", href: "/accommodation", isPage: true },
    { label: "Our Journey", href: isHomePage ? "#journey-section" : "/#journey-section" },
    { label: "Events", href: isHomePage ? "#seminar-section" : "/#seminar-section" },
    { label: "Resources", href: isHomePage ? "#resources-section" : "/#resources-section" },
    { label: "Blogs", href: isHomePage ? "#blogs-section" : "/#blogs-section" },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-white/85 dark:bg-dark-bg/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-dark-border/80 shadow-sm" 
          : "bg-white/60 dark:bg-dark-bg/60 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo (Faithful to approved prototype stripes & typography) */}
        <div className="flex items-center min-w-[180px]">
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

        {/* Desktop Navigation Links - Centered */}
        <nav className="hidden lg:flex items-center justify-center flex-1 px-4" aria-label="Main Navigation">
          <ul className="flex items-center gap-6 xl:gap-7 list-none">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors py-2 px-1 relative group inline-flex items-center gap-1.5 ${
                      isActive
                        ? "text-emerald-700 dark:text-emerald-400 font-semibold"
                        : "text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.isPage && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase tracking-wider dark:bg-emerald-950 dark:text-emerald-300">
                        New
                      </span>
                    )}
                    <span 
                      className={`absolute bottom-0 left-0 h-0.5 bg-emerald-600 rounded-full transition-all duration-200 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`} 
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Primary CTA Button - Generous padding, perfectly centered, Title Case */}
        <div className="hidden lg:flex items-center justify-end min-w-[180px]">
          <button
            onClick={onOpenConsultModal}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all group cursor-pointer border border-emerald-500/20"
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
            className="lg:hidden border-t border-slate-200 dark:border-dark-border bg-white/95 dark:bg-dark-bg/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
              <nav aria-label="Mobile Navigation">
                <ul className="space-y-1 list-none">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                            isActive
                              ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                              : "text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-dark-surface"
                          }`}
                        >
                          <span>{link.label}</span>
                          {link.isPage && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase tracking-wider dark:bg-emerald-950 dark:text-emerald-300">
                              Verified Rooms
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="pt-4 border-t border-slate-200 dark:border-dark-border px-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenConsultModal) onOpenConsultModal();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-sm shadow-sm transition-all group"
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
