import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | UES Abroad",
  description: "The page you were looking for could not be found. Let us help you find what you need.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 text-center">
      {/* Decorative Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl" />
      </div>

      {/* Logo */}
      <Link href="/" className="inline-flex items-center gap-2 mb-12 group">
        <div className="flex gap-1 h-6 items-center">
          <span className="block w-1.5 h-full bg-[#0A7D45] rounded-sm" />
          <span className="block w-1.5 h-full bg-[#00B050] rounded-sm" />
          <span className="block w-1.5 h-full bg-[#92D050] rounded-sm" />
        </div>
        <span className="text-xl font-extrabold text-slate-900 tracking-tight">
          UES <span className="text-emerald-600">Abroad</span>
        </span>
      </Link>

      {/* 404 Display */}
      <div className="relative mb-8">
        <div className="text-[9rem] sm:text-[12rem] font-black text-slate-100 leading-none select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl">🗺️</span>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
        This page is off the map.
      </h1>
      <p className="text-slate-500 text-base max-w-md mb-10 leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. But your global education journey doesn&apos;t have to stop here.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
        >
          ← Back to Home
        </Link>
        <Link
          href="/accommodation"
          className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 shadow-sm hover:shadow-md transition-all"
        >
          Browse Accommodation
        </Link>
      </div>

      {/* Quick Links */}
      <div className="w-full max-w-lg">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">
          Popular destinations
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "🇩🇪 Study in Germany", href: "/#destinations-section" },
            { label: "🇬🇧 Study in UK", href: "/#destinations-section" },
            { label: "🇺🇸 Study in USA", href: "/#destinations-section" },
            { label: "🇨🇦 Study in Canada", href: "/#destinations-section" },
            { label: "🇦🇺 Study in Australia", href: "/#destinations-section" },
            { label: "🇮🇪 Study in Ireland", href: "/#destinations-section" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-emerald-700 text-xs font-medium text-center transition-all hover:shadow-sm"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-16 text-xs text-slate-400">
        Need help?{" "}
        <a href="mailto:support@uesabroad.com" className="text-emerald-600 hover:underline font-medium">
          Email us
        </a>{" "}
        or{" "}
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 hover:underline font-medium"
        >
          WhatsApp us
        </a>
      </p>
    </div>
  );
}
