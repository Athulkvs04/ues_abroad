"use client";

import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";

interface PublicLayoutProps {
  children: React.ReactNode;
  onOpenConsultModal?: () => void;
}

export function PublicLayout({ children, onOpenConsultModal }: PublicLayoutProps) {
  const handleOpenConsultModal = () => {
    if (onOpenConsultModal) {
      onOpenConsultModal();
    } else {
      // Fallback: scroll to journey or contact section
      const journeyElem = document.getElementById("journey") || document.getElementById("services");
      if (journeyElem) {
        journeyElem.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/#journey";
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* 1. Main Navigation Header */}
      <Header onOpenConsultModal={handleOpenConsultModal} />

      {/* 2. Main Page Content */}
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>

      {/* 3. Global Footer */}
      <Footer />

      {/* 4. Floating Actions (WhatsApp, Scroll Top, Theme Toggle) */}
      <FloatingActions />
    </div>
  );
}
