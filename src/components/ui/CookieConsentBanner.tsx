"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_KEY = "ues_cookie_consent";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay so the page loads first, then banner slides in
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem(COOKIE_KEY);
        if (!stored) {
          setVisible(true);
        }
      } catch {
        // localStorage blocked (private mode etc.) — just hide
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_KEY, "accepted");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(COOKIE_KEY, "declined");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-5 sm:bottom-5 sm:max-w-sm z-[9999] animate-in slide-in-from-bottom-4 duration-500"
    >
      <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-5 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <span className="text-xl mt-0.5" aria-hidden>🍪</span>
          <div>
            <p className="text-sm font-bold text-slate-900 mb-1">We use cookies</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              We use cookies to improve your experience, analyse site usage, and personalise content. By clicking &quot;Accept&quot;, you consent to our use of cookies. Learn more in our{" "}
              <Link
                href="/privacy-policy"
                className="text-emerald-600 hover:underline font-medium"
                onClick={() => setVisible(false)}
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            id="cookie-accept-btn"
            onClick={handleAccept}
            className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md"
          >
            Accept All
          </button>
          <button
            id="cookie-decline-btn"
            onClick={handleDecline}
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-all"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
