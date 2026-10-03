"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Building,
  DollarSign,
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
    avgScore: 78,
    newLeads: 0,
    accommodationCount: 0,
    forexCount: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to load live metrics:", err);
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
      change: `${stats.newLeads} new inquiries`,
      icon: Users,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      href: "/admin/leads",
    },
    {
      label: "Partner Universities",
      value: loading ? "..." : stats.totalUniversities.toString(),
      change: "Across 9 Destinations",
      icon: GraduationCap,
      color: "text-sky-600 bg-sky-50 border-sky-100",
      href: "/admin/universities",
    },
    {
      label: "Active Degree Courses",
      value: loading ? "..." : stats.totalCourses.toString(),
      change: "Live Intakes Configured",
      icon: BookOpen,
      color: "text-amber-600 bg-amber-50 border-amber-100",
      href: "/admin/courses",
    },
    {
      label: "Avg. Lead Intent Score",
      value: loading ? "..." : `${stats.avgScore} / 100`,
      change: "Calculated intent score",
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-semibold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Database Connected & Live</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
            Welcome to {tenant.name} Console
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Centralized administration console for lead lifecycle tracking, university catalog CMS, and student inquiries.
          </p>
        </div>

        <button
          onClick={fetchStats}
          className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 self-start sm:self-center flex items-center gap-2 text-xs font-semibold shadow-xs transition-colors"
        >
          <RefreshCw className={`w-4 h-4 text-emerald-600 ${loading ? "animate-spin" : ""}`} />
          <span>Sync Live Data</span>
        </button>
      </div>

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
            <div className="text-2xl font-bold text-slate-900 mt-1">{stats.accommodationCount} Housing Leads</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Verified student housing inquiries</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
            <Building className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Forex Remittance Referrals</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">{stats.forexCount} Fairexpay Requests</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Foreign exchange rate locking requests</p>
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
              University & Course CMS
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
