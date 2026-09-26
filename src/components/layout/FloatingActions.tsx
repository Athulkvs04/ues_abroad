"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { useTenant } from "@/components/providers/TenantProvider";

export function FloatingActions() {
  const tenant = useTenant();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Check scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 items-end">
      {/* 1. Floating WhatsApp CTA (Faithful to prototype with subtle pulse animation) */}
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

      {/* 2. Scroll To Top Button (Conditional appearance > 300px) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <button
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-slate-800 dark:text-slate-200 shadow-md hover:shadow-lg flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
            <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-semibold whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Back to top
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
