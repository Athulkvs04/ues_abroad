"use client";

import React, { useState, useEffect, useRef } from "react";
import { LeadModal } from "@/components/home/LeadModal";

// Optimal suppression durations based on conversion analytics:
// 7 days (1 week) is the global benchmark for high-consideration education advising
const SUPPRESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const AUTO_TRIGGER_DELAY_MS = 25000; // 25 seconds delay
const SCROLL_THRESHOLD_PERCENT = 40; // 40% scroll depth

export function SmartLeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [sourceTag, setSourceTag] = useState("POPUP_TIMED_25S");
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Support instant testing via URL query param: e.g. https://uesabroad.com/?popup=true
    const urlParams = new URLSearchParams(window.location.search);
    const forceTest = urlParams.get("popup") === "true";

    if (!forceTest) {
      try {
        // 1. Check if user already submitted a lead inquiry (Permanent suppression)
        const submitted = sessionStorage.getItem("ues_lead_submitted") || localStorage.getItem("ues_lead_submitted");
        if (submitted) {
          return;
        }

        // 2. Check if user dismissed in the current session (Active visit suppression)
        const dismissedSession = sessionStorage.getItem("ues_lead_dismissed_session");
        if (dismissedSession) {
          return;
        }

        // 3. Check 7-day suppression timer
        const dismissedUntil = localStorage.getItem("ues_lead_dismissed_until");
        if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
          return;
        }
      } catch {
        // Ignore storage errors in restricted private browsing modes
      }
    }

    const triggerPopup = (source: string) => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;
      setSourceTag(source);
      setIsOpen(true);
    };

    // Trigger 1: 25 Seconds Engagement Timer
    const timer = setTimeout(() => {
      triggerPopup("POPUP_TIMED_25S");
    }, AUTO_TRIGGER_DELAY_MS);

    // Trigger 2: 40% Scroll Depth
    const handleScroll = () => {
      if (hasTriggeredRef.current) return;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const winHeight = window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      const scrollableDistance = docHeight - winHeight;

      if (scrollableDistance > 100) {
        const currentPercent = (scrollTop / scrollableDistance) * 100;
        if (currentPercent >= SCROLL_THRESHOLD_PERCENT) {
          triggerPopup("POPUP_SCROLL_40");
        }
      }
    };

    // Trigger 3: Robust Multi-engine Desktop Exit-Intent
    // Detects when cursor breaks the top boundary towards browser tabs / URL bar
    const handleExitIntent = (e: MouseEvent) => {
      if (hasTriggeredRef.current) return;

      // Check if mouse is moving upward towards the browser tabs/bookmarks bar
      const toTarget = e.relatedTarget || (e as unknown as { toElement?: Element }).toElement;
      if (!toTarget && e.clientY <= 20) {
        triggerPopup("POPUP_EXIT_INTENT");
      }
    };

    const handleRootMouseLeave = (e: MouseEvent) => {
      if (hasTriggeredRef.current) return;
      if (e.clientY <= 25) {
        triggerPopup("POPUP_EXIT_INTENT");
      }
    };

    // Attach listeners across window, document, and documentElement for cross-browser fidelity
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseout", handleExitIntent);
    document.documentElement.addEventListener("mouseleave", handleRootMouseLeave);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseout", handleExitIntent);
      document.documentElement.removeEventListener("mouseleave", handleRootMouseLeave);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      // 1. Session suppression: Do not interrupt again during current visit
      sessionStorage.setItem("ues_lead_dismissed_session", "true");

      // 2. 7-Day return suppression: Standard etiquette for consulting websites
      localStorage.setItem(
        "ues_lead_dismissed_until",
        (Date.now() + SUPPRESSION_DURATION_MS).toString()
      );
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <LeadModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Plan Your Global Study Journey"
      source={sourceTag}
    />
  );
}
