"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Settings, 
  LogOut, 
  Globe,
  Menu,
  X,
  Newspaper,
  Database,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { useTenant } from "@/components/providers/TenantProvider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const tenant = useTenant();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDbConnected, setIsDbConnected] = useState<boolean | null>(null);

  // Check database connectivity
  useEffect(() => {
    async function checkDb() {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setIsDbConnected(Boolean(data.isDbConnected));
      } catch {
        setIsDbConnected(false);
      }
    }
    checkDb();
  }, [pathname]);

  // If on login page, render clean without admin sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Lead CRM", href: "/admin/leads", icon: Users },
    { label: "Universities", href: "/admin/universities", icon: GraduationCap },
    { label: "Courses", href: "/admin/courses", icon: BookOpen },
    { label: "Blogs & Editorial", href: "/admin/blogs", icon: Newspaper },
    { label: "Site Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-white border-r border-slate-200/90 z-50 transform transition-transform duration-300 flex flex-col shadow-xs ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-heading font-bold flex items-center justify-center text-lg shadow-sm">
              UES
            </div>
            <div>
              <span className="font-heading font-bold text-slate-900 block leading-tight">
                Admin Console
              </span>
              <span className="text-xs text-emerald-600 font-semibold tracking-wide">
                {tenant.name}
              </span>
            </div>
          </Link>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 lg:hidden transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  isActive
                    ? "bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200/80 shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-emerald-700" : "text-slate-500"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 space-y-1.5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-colors"
          >
            <Globe className="w-4 h-4 shrink-0 text-slate-500" />
            <span>View Public Website</span>
          </a>

          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 shadow-xs">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 lg:hidden transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            {/* Database Status Indicator */}
            {isDbConnected !== null && (
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                isDbConnected
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : "bg-amber-50 text-amber-800 border-amber-200"
              }`}>
                <span className={`w-2 h-2 rounded-full ${isDbConnected ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                <span>{isDbConnected ? "DB Connected" : "DB Not Connected"}</span>
              </div>
            )}

            <div className="text-right hidden sm:block">
              <span className="text-sm font-semibold text-slate-900 block leading-tight">
                Super Admin
              </span>
              <span className="text-xs text-slate-500">admin@uesabroad.com</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200/80 flex items-center justify-center font-heading font-bold text-sm shadow-xs">
              SA
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-slate-50">
          {/* Global DB Not Connected Banner */}
          {isDbConnected === false && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs animate-fadeIn">
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5 sm:mt-0">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold flex items-center gap-1.5">
                    <span>Database Not Connected</span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-200/70 text-amber-900">
                      Standby Mode
                    </span>
                  </h4>
                  <p className="text-xs text-amber-800/90 mt-0.5">
                    The admin panel is accessible across all tabs, but no dummy data is displayed. Configure <code className="font-mono bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-bold">DATABASE_URL</code> in your environment variables to save and view live student leads, universities, and courses.
                  </p>
                </div>
              </div>
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
}
