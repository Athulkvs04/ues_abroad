"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTenant } from "@/components/providers/TenantProvider";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  onOpenConsultModal?: () => void;
}

export function Header({ onOpenConsultModal }: HeaderProps) {
  const tenant = useTenant();
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
    { label: "Home", href: "#hero-section" },
    { label: "Destinations", href: "#destinations-section" },
    { label: "Universities", href: "#explorer-section" },
    { label: "Services", href: "#decision-section" },
    { label: "Our Journey", href: "#journey-section" },
    { label: "Events", href: "#seminar-section" },
    { label: "Resources", href: "#resources-section" },
    { label: "Blogs", href: "#blogs-section" },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-white/85 dark:bg-dark-bg/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-dark-border/80 shadow-sm" 
          : "bg-white/60 dark:bg-dark-bg/60 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo (Faithful to approved prototype stripes & typography) */}
        <Link 
          href="#hero-section" 
          className="inline-flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl p-1"
          aria-label="UES Abroad Homepage"
        >
          <div className="flex gap-1 h-7 items-center">
            <span className="block w-1.5 h-full bg-[#0A7D45] rounded-sm transition-transform group-hover:scale-y-110 duration-300" />
            <span className="block w-1.5 h-full bg-[#00B050] rounded-sm transition-transform group-hover:scale-y-110 duration-300 delay-75" />
            <span className="block w-1.5 h-full bg-[#92D050] rounded-sm transition-transform group-hover:scale-y-110 duration-300 delay-150" />
          </div>
          <div className="flex flex-col leading-none text-left">
            <span className="text-xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight">
              {tenant.name.split(" ")[0] || "UES"}
            </span>
            <span className="text-[10px] font-heading font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase">
              {tenant.name.split(" ").slice(1).join(" ") || "Abroad"}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
          <ul className="flex items-center gap-6 list-none">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors py-2 px-1 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-200 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Primary CTA */}
        <div className="hidden lg:flex items-center">
          <Button
            variant="primary"
            size="md"
            onClick={onOpenConsultModal}
            className="shadow-md hover:shadow-premium font-semibold text-xs py-2.5 px-4"
          >
            Start My Journey
          </Button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
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
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-800 dark:text-slate-100 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="pt-4 border-t border-slate-200 dark:border-dark-border px-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenConsultModal) onOpenConsultModal();
                  }}
                  className="w-full justify-center font-bold"
                >
                  Start My Journey
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
