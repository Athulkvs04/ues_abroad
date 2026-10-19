"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  ArrowRight,
  RefreshCw,
  Building,
  DollarSign,
  Database,
  Terminal,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useTenant } from "@/components/providers/TenantProvider";

interface DashboardStats {
  totalLeads: number;
  totalUniversities: number;
  totalCourses: number;
  avgScore: number;
  newLeads: number;
  accommodationCount: number;
  forexCount: number;
}

export default function AdminDashboardPage() {
  const tenant = useTenant();
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    totalUniversities: 0,
    totalCourses: 0,
    avgScore: 0,
    newLeads: 0,
    accommodationCount: 0,
    forexCount: 0,
  });
  const [isDbConnected, setIsDbConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setIsDbConnected(Boolean(data.isDbConnected));
      }
    } catch (err) {
      console.error("Failed to load live metrics:", err);
      setIsDbConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Student Leads",
      value: loading ? "..." : stats.totalLeads.toString(),
      change: isDbConnected ? `${stats.newLeads} new inquiries` : "0 (DB not connected)",
      icon: Users,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      href: "/admin/leads",
    },
    {
      label: "Partner Universities",
      value: loading ? "..." : stats.totalUniversities.toString(),
      change: isDbConnected ? "Across active destinations" : "0 (DB not connected)",
      icon: GraduationCap,
      color: "text-sky-600 bg-sky-50 border-sky-100",
      href: "/admin/universities",
    },
    {
      label: "Active Degree Courses",
      value: loading ? "..." : stats.totalCourses.toString(),
      change: isDbConnected ? "Live Intakes Configured" : "0 (DB not connected)",
      icon: BookOpen,
      color: "text-amber-600 bg-amber-50 border-amber-100",
      href: "/admin/courses",
    },
    {
      label: "Avg. Lead Intent Score",
      value: loading ? "..." : stats.avgScore > 0 ? `${stats.avgScore} / 100` : "N/A",
      change: isDbConnected ? "Calculated from live inquiries" : "Requires database",
      icon: TrendingUp,
      color: "text-teal-600 bg-teal-50 border-teal-100",
      href: "/admin/leads",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="relative z-10 max-w-2xl">
          {isDbConnected === true ? (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-semibold mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>Database Connected &amp; Live</span>
            </div>
          ) : isDbConnected === false ? (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 text-xs font-semibold mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              <span>Database Not Connected</span>
            </div>
          ) : null}

          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
            Welcome to {tenant.name} Console
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Centralized administration console for lead lifecycle tracking, university catalog CMS, and student inquiries.
          </p>
        </div>

        <button
          onClick={fetchStats}
          className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 self-start sm:self-center flex items-center gap-2 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 text-emerald-600 ${loading ? "animate-spin" : ""}`} />
          <span>Check Connection</span>
        </button>
      </div>

      {/* Database Connection Instructions if Disconnected */}
      {isDbConnected === false && (
        <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Database Standby Mode
              </h3>
              <p className="text-xs text-slate-500">
                All mock/dummy data has been removed. Follow these 2 quick steps to connect your PostgreSQL or Neon database.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                Step 1: Set Environment Variable
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Add your PostgreSQL or NeonDB connection string to your <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-800">.env</code> or hosting dashboard (Vercel / Railway / VPS):
              </p>
              <div className="p-2.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto">
                DATABASE_URL=&quot;postgresql://user:password@host/dbname?sslmode=require&quot;
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                Step 2: Run Prisma Migration
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Apply the production schema to create all required tables (users, leads, universities, courses, blogs):
              </p>
              <div className="p-2.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto flex items-center justify-between">
                <span>npx prisma db push</span>
                <span className="text-slate-500 text-[10px]">terminal</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link key={i} href={stat.href}>
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all hover:-translate-y-0.5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{stat.label}</span>
                  <div className={`p-2.5 rounded-xl border ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-heading font-bold text-slate-900">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 mt-1.5 font-medium">{stat.change}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Auxiliary Inquiries Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Accommodation Requests</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              {loading ? "..." : `${stats.accommodationCount} Housing Leads`}
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              {isDbConnected ? "Verified student housing inquiries" : "Database not connected"}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
            <Building className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Forex Remittance Referrals</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              {loading ? "..." : `${stats.forexCount} Fairexpay Requests`}
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              {isDbConnected ? "Foreign exchange rate locking requests" : "Database not connected"}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-heading font-bold text-slate-900 mb-2">
              Master Student Lead CRM
            </h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Full student profile editor, counselor assignments, instant status badge updates, and accommodation/Forex inquiry sub-panels.
            </p>
          </div>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <span>Open Master Lead CRM</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-heading font-bold text-slate-900 mb-2">
              University &amp; Course CMS
            </h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Manage partner university rankings, locations, degree courses, and annual tuition fees across all 9 destination countries.
            </p>
          </div>
          <Link
            href="/admin/universities"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800 transition-colors"
          >
            <span>Open University CMS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
