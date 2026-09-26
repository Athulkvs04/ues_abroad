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
      color: "text-emerald-400",
      href: "/admin/leads",
    },
    {
      label: "Partner Universities",
      value: loading ? "..." : stats.totalUniversities.toString(),
      change: "Across 9 Destinations",
      icon: GraduationCap,
      color: "text-sky-400",
      href: "/admin/universities",
    },
    {
      label: "Active Degree Courses",
      value: loading ? "..." : stats.totalCourses.toString(),
      change: "Live Intakes Configured",
      icon: BookOpen,
      color: "text-amber-400",
      href: "/admin/courses",
    },
    {
      label: "Avg. Lead Intent Score",
      value: loading ? "..." : `${stats.avgScore} / 100`,
      change: "Calculated intent score",
      icon: TrendingUp,
      color: "text-purple-400",
      href: "/admin/leads",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/30 p-6 sm:p-8 overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative z-10 max-w-2xl">
          <Badge variant="primary" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />} className="mb-3">
            Neon Cloud DB Connected
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white">
            Welcome to {tenant.name} Console
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Centralized single admin console for lead lifecycle tracking, university catalog CMS, and Forex/housing inquiries.
          </p>
        </div>

        <button
          onClick={fetchStats}
          className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white self-start sm:self-center flex items-center gap-2 text-xs font-semibold"
        >
          <RefreshCw className={`w-4 h-4 text-emerald-400 ${loading ? "animate-spin" : ""}`} />
          <span>Sync Live Data</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link key={i} href={stat.href}>
              <Card glass padding="md" className="border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-400">{stat.label}</span>
                  <div className={`p-2.5 rounded-xl bg-slate-800/80 ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 mt-1">{stat.change}</div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Auxiliary Inquiries Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold">Accommodation Requests</span>
            <div className="text-2xl font-bold text-sky-400 mt-1">{stats.accommodationCount} Housing Leads</div>
          </div>
          <Building className="w-8 h-8 text-sky-400 opacity-60" />
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold">Forex Remittance Referrals</span>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{stats.forexCount} Fairexpay Requests</div>
          </div>
          <DollarSign className="w-8 h-8 text-emerald-400 opacity-60" />
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card glass padding="lg" className="border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-2">
              📋 Master Student Lead CRM
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Full student profile editor, counselor assignments, instant status badge mutation, and accommodation/Forex inquiry sub-panels.
            </p>
          </div>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-white transition-colors"
          >
            <span>Open Master Lead CRM</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Card>

        <Card glass padding="lg" className="border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-2">
              🏛️ University & Course CMS
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Manage partner university rankings, locations, degree courses, and annual tuition fees across all 9 destination countries.
            </p>
          </div>
          <Link
            href="/admin/universities"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-white transition-colors"
          >
            <span>Open University CMS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Card>
      </div>
    </div>
  );
}
