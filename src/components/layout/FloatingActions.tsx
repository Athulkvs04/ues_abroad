"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { useTenant } from "@/components/providers/TenantProvider";

export function FloatingActions() {
  const tenant = useTenant();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

      setScrollProgress(progress);
      setShowScrollTop(scrollTop > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openWhatsApp = () => {
    const cleanNumber = tenant.contact.whatsappNumber.replace(/[^0-9]/g, "");
    const text = encodeURIComponent("Hi UES Abroad, I would like to inquire about study abroad counselling.");
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Thin scroll progress bar pinned to top of viewport */}
      <div
        className="fixed top-0 left-0 z-[60] h-[3px] bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 transition-all duration-100 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden
      />

      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2.5 items-end">
        {/* 1. Floating WhatsApp CTA */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          {/* Subtle Pulse Ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-75 duration-1000 pointer-events-none" />
          
          <button
            onClick={openWhatsApp}
            className="relative w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
            aria-label="Chat with UES Abroad on WhatsApp"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
          </button>

          {/* Tooltip */}
          <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-semibold whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Chat on WhatsApp
          </span>
        </motion.div>

        {/* 2. Scroll To Top Button — visible from 400px, with progress ring */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 12 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              {/* SVG progress ring */}
              <svg
                className="absolute inset-0 w-12 h-12 -rotate-90 pointer-events-none"
                viewBox="0 0 48 48"
                aria-hidden
              >
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="3"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`}
                  className="transition-all duration-150"
                />
              </svg>

              <button
                onClick={scrollToTop}
                className="relative w-12 h-12 rounded-full bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-emerald-700 dark:text-emerald-400 shadow-md hover:shadow-lg flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                aria-label={`Scroll back to top — ${scrollProgress}% of page read`}
              >
                <ArrowUp className="w-4.5 h-4.5" />
              </button>

              {/* Tooltip with percentage */}
              <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-semibold whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Back to top · {scrollProgress}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
