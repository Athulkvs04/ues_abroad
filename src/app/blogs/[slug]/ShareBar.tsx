"use client";

import React, { useState } from "react";
import { Check, Copy, MessageCircle, ExternalLink } from "lucide-react";

interface ShareBarProps {
  title: string;
  slug: string;
}

export function ShareBar({ title, slug }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/blogs/${slug}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/blogs/${slug}`;
    }
    return `https://uesabroad.com/blogs/${slug}`;
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-400 font-medium hidden sm:inline">Share:</span>
      
      {/* Copy link */}
      <button
        onClick={handleCopy}
        className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors relative shadow-xs flex items-center gap-1.5 text-xs font-semibold"
        title="Copy article link"
        aria-label="Copy article link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 text-[11px]">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span className="text-slate-600 text-[11px] hidden sm:inline">Copy Link</span>
          </>
        )}
      </button>

      {/* WhatsApp Share */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
          `${title} - Read more on UES Abroad: ${getShareUrl()}`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 text-slate-600 transition-colors shadow-xs"
        title="Share to WhatsApp"
        aria-label="Share to WhatsApp"
      >
        <MessageCircle className="w-4 h-4 text-emerald-600" />
      </a>

      {/* LinkedIn Share */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          getShareUrl()
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 text-slate-600 transition-colors shadow-xs"
        title="Share to LinkedIn"
        aria-label="Share to LinkedIn"
      >
        <svg className="w-4 h-4 fill-current text-blue-600" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.4 9.74v-8.37H5.06v8.37z" />
        </svg>
      </a>

      {/* X (formerly Twitter) Share */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(
          getShareUrl()
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors shadow-xs"
        title="Share on X"
        aria-label="Share on X"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
    </div>
  );
}
