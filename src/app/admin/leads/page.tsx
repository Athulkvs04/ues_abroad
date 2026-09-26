"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Globe,
  FileText,
  MessageSquare,
  Send,
  X,
  RefreshCw,
  Award,
  Tag,
  Trash2,
  Edit3,
  UserCheck,
  Building,
  DollarSign,
  Save,
  CheckCircle,
} from "lucide-react";

interface UserStaff {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Note {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  score: number;
  targetCountry: string | null;
  targetDegree: string | null;
  budgetApprox: number | null;
  cgpa: number | null;
  englishTest: string | null;
  metadata: any;
  assignedToId: string | null;
  assignedTo?: { id: string; name: string; email: string } | null;
  createdAt: string;
  notes: Note[];
}

interface AccommodationLead {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  targetCountry: string;
  targetCity: string;
  budgetMonthly: number;
  roomPreference: string;
  status: string;
  createdAt: string;
}

interface ForexReferral {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  fromCurrency: string;
  toCurrency: string;
  amountApprox: number;
  status: string;
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [activeTab, setActiveTab] = useState<"STUDENTS" | "HOUSING" | "FOREX">("STUDENTS");

  // Data States
  const [leads, setLeads] = useState<Lead[]>([]);
  const [housingLeads, setHousingLeads] = useState<AccommodationLead[]>([]);
  const [forexLeads, setForexLeads] = useState<ForexReferral[]>([]);
  const [staffUsers, setStaffUsers] = useState<UserStaff[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Modal States
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Lead>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [newNoteText, setNewNoteText] = useState("");

  // Add Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    targetCountry: "United Kingdom",
    targetDegree: "Master's",
    source: "ADMIN_MANUAL",
    status: "NEW",
    notes: "",
  });

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [leadsRes, staffRes, housingRes, forexRes] = await Promise.all([
        fetch("/api/admin/leads"),
        fetch("/api/admin/users"),
        fetch("/api/admin/accommodation"),
        fetch("/api/admin/forex"),
      ]);

      const [leadsData, staffData, housingData, forexData] = await Promise.all([
        leadsRes.json(),
        staffRes.json(),
        housingRes.json(),
        forexRes.json(),
      ]);

      if (leadsData.success) setLeads(leadsData.leads);
      if (staffData.success) setStaffUsers(staffData.users);
      if (housingData.success) setHousingLeads(housingData.inquiries);
      if (forexData.success) setForexLeads(forexData.referrals);
    } catch (err) {
      console.error("Failed to load lead datasets:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Open Edit Profile Modal
  const openLeadModal = (lead: Lead) => {
    setSelectedLead(lead);
    setEditForm({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      targetCountry: lead.targetCountry || "",
      targetDegree: lead.targetDegree || "",
      budgetApprox: lead.budgetApprox || 0,
      cgpa: lead.cgpa || 0,
      englishTest: lead.englishTest || "",
      assignedToId: lead.assignedToId || "",
    });
    setIsEditingProfile(false);
  };

  // Status Change Handler
  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Counselor Assignment Handler
  const handleAssignCounselor = async (leadId: string, staffId: string) => {
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignedToId: staffId || null }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.map((l) => (l.id === leadId ? data.lead : l)));
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead(data.lead);
        }
      }
    } catch (err) {
      console.error("Failed to assign counselor:", err);
    }
  };

  // Full Profile Edit Save Handler
  const handleSaveProfileEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;

    try {
      const res = await fetch(`/api/admin/leads/${selectedLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedLead(data.lead);
        setLeads((prev) => prev.map((l) => (l.id === data.lead.id ? data.lead : l)));
        setIsEditingProfile(false);
      }
    } catch (err) {
      console.error("Failed to save profile changes:", err);
    }
  };

  // Delete Lead Handler
  const handleDeleteLead = async (leadId: string) => {
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l.id !== leadId));
        setDeleteConfirmId(null);
        if (selectedLead?.id === leadId) {
          setSelectedLead(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  // Add Note Handler
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNoteText.trim()) return;

    try {
      const res = await fetch(`/api/admin/leads/${selectedLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteContent: newNoteText }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedLead(data.lead);
        setLeads((prev) => prev.map((l) => (l.id === data.lead.id ? data.lead : l)));
        setNewNoteText("");
      }
    } catch (err) {
      console.error("Failed to add note:", err);
    }
  };

  // Create Manual Lead Handler
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLeadForm),
      });
      const data = await res.json();
      if (data.success) {
        setLeads([data.lead, ...leads]);
        setShowAddModal(false);
        setNewLeadForm({
          name: "",
          email: "",
          phone: "",
          targetCountry: "United Kingdom",
          targetDegree: "Master's",
          source: "ADMIN_MANUAL",
          status: "NEW",
          notes: "",
        });
      }
    } catch (err) {
      console.error("Failed to create lead:", err);
    }
  };

  // Filter Logic
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery);

    const matchesSource =
      sourceFilter === "ALL" ||
      lead.source.toLowerCase() === sourceFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "ALL" || lead.status === statusFilter;

    return matchesSearch && matchesSource && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      NEW: { label: "● Received / New", color: "bg-blue-500/10 text-blue-400 border-blue-500/30" },
      CONTACTED: { label: "● Contacted", color: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
      COUNSELLING_SCHEDULED: { label: "● Counseling Scheduled", color: "bg-purple-500/10 text-purple-400 border-purple-500/30" },
      APPLICATION_IN_PROGRESS: { label: "● Application Submitted", color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30" },
      ENROLLED: { label: "● Visa / Enrolled", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
      ARCHIVED: { label: "● Archived", color: "bg-slate-500/10 text-slate-400 border-slate-500/30" },
    };

    return statusMap[status] || { label: status, color: "bg-slate-500/10 text-slate-400 border-slate-500/30" };
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-400" />
            Master CRM & Student Leads
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time lead lifecycle management, counselor assignments, and housing/Forex inquiries
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAllData}
            className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
            title="Refresh Inquiries"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Lead</span>
          </button>
        </div>
      </div>

      {/* Primary Inquiry Navigation Sub-Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab("STUDENTS")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
            activeTab === "STUDENTS"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Student Leads ({leads.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("HOUSING")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
            activeTab === "HOUSING"
              ? "bg-sky-500/10 text-sky-400 border border-sky-500/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Housing Inquiries ({housingLeads.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("FOREX")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
            activeTab === "FOREX"
              ? "bg-purple-500/10 text-purple-400 border border-purple-500/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Forex Requests ({forexLeads.length})</span>
        </button>
      </div>

      {/* TAB 1: MAIN STUDENT LEADS */}
      {activeTab === "STUDENTS" && (
        <div className="space-y-6">
          {/* Metrics Summary Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs text-slate-400">Total Leads Ingested</span>
              <div className="text-2xl font-bold text-white mt-1">{leads.length}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs text-slate-400">New Inquiries</span>
              <div className="text-2xl font-bold text-blue-400 mt-1">
                {leads.filter((l) => l.status === "NEW").length}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs text-slate-400">In Counseling</span>
              <div className="text-2xl font-bold text-purple-400 mt-1">
                {leads.filter((l) => l.status === "COUNSELLING_SCHEDULED").length}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs text-slate-400">Applications / Enrolled</span>
              <div className="text-2xl font-bold text-emerald-400 mt-1">
                {leads.filter((l) => l.status === "ENROLLED" || l.status === "APPLICATION_IN_PROGRESS").length}
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 space-y-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: "ALL", label: "All Sources" },
                { id: "COURSE_FINDER", label: "Course Finder" },
                { id: "1:1 Expert Call", label: "1:1 Expert Call" },
                { id: "FOREX", label: "Forex Calculator" },
                { id: "RESOURCE_VAULT", label: "Resource Vault" },
                { id: "ADMIN_MANUAL", label: "Admin Manual" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSourceFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    sourceFilter === tab.id
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                      : "bg-slate-800/80 text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by student name, email, or phone number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-48 px-3 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">Received / New</option>
                <option value="CONTACTED">Contacted</option>
                <option value="COUNSELLING_SCHEDULED">Counseling Scheduled</option>
                <option value="APPLICATION_IN_PROGRESS">Application Submitted</option>
                <option value="ENROLLED">Visa / Enrolled</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>

          {/* CRM Leads Table */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-slate-400">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-emerald-400 mb-2" />
                <p className="text-sm">Loading student leads from Neon PostgreSQL...</p>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="p-12 text-center text-slate-500">No student leads found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950/80 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Student Info</th>
                      <th className="px-6 py-4">Target Country & Degree</th>
                      <th className="px-6 py-4">Assigned Counselor</th>
                      <th className="px-6 py-4">Status Selector</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredLeads.map((lead) => {
                      const badge = getStatusBadge(lead.status);
                      return (
                        <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-white">{lead.name}</div>
                            <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                              <span>{lead.email}</span>
                              <span>•</span>
                              <span>{lead.phone}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-slate-200">{lead.targetCountry || "Not Specified"}</div>
                            <div className="text-xs text-slate-400">{lead.targetDegree || "Master's"}</div>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={lead.assignedToId || ""}
                              onChange={(e) => handleAssignCounselor(lead.id, e.target.value)}
                              className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none"
                            >
                              <option value="">-- Unassigned --</option>
                              {staffUsers.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name} ({user.role})
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                              className={`px-3 py-1.5 rounded-full text-xs font-semibold border cursor-pointer focus:outline-none transition-all ${badge.color}`}
                            >
                              <option value="NEW" className="bg-slate-900 text-white">● Received / New</option>
                              <option value="CONTACTED" className="bg-slate-900 text-white">● Contacted</option>
                              <option value="COUNSELLING_SCHEDULED" className="bg-slate-900 text-white">● Counseling Scheduled</option>
                              <option value="APPLICATION_IN_PROGRESS" className="bg-slate-900 text-white">● Application Submitted</option>
                              <option value="ENROLLED" className="bg-slate-900 text-white">● Visa / Enrolled</option>
                              <option value="ARCHIVED" className="bg-slate-900 text-white">● Archived</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button
                              onClick={() => openLeadModal(lead)}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 inline-flex items-center gap-1"
                            >
                              <FileText className="w-3.5 h-3.5 text-emerald-400" />
                              View / Edit Profile
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(lead.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: HOUSING / ACCOMMODATION INQUIRIES */}
      {activeTab === "HOUSING" && (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          {housingLeads.length === 0 ? (
            <div className="p-12 text-center text-slate-500">No housing requests logged yet.</div>
          ) : (
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Target Country & City</th>
                  <th className="px-6 py-4">Monthly Budget</th>
                  <th className="px-6 py-4">Room Preference</th>
                  <th className="px-6 py-4">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {housingLeads.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-800/40">
                    <td className="px-6 py-4 font-semibold text-white">{h.studentName}</td>
                    <td className="px-6 py-4">
                      {h.targetCountry} ({h.targetCity})
                    </td>
                    <td className="px-6 py-4 text-emerald-400 font-semibold">${h.budgetMonthly} / mo</td>
                    <td className="px-6 py-4">{h.roomPreference}</td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {h.phone} | {h.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* TAB 3: FOREX REMITTANCE REQUESTS */}
      {activeTab === "FOREX" && (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          {forexLeads.length === 0 ? (
            <div className="p-12 text-center text-slate-500">No Forex money transfer requests logged yet.</div>
          ) : (
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Customer Name</th>
                  <th className="px-6 py-4">Phone / Email</th>
                  <th className="px-6 py-4">Currency Pair</th>
                  <th className="px-6 py-4">Approx Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {forexLeads.map((fx) => (
                  <tr key={fx.id} className="hover:bg-slate-800/40">
                    <td className="px-6 py-4 font-semibold text-white">{fx.name}</td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {fx.phone} {fx.email ? `| ${fx.email}` : ""}
                    </td>
                    <td className="px-6 py-4 font-semibold text-purple-400">
                      {fx.fromCurrency} ➔ {fx.toCurrency}
                    </td>
                    <td className="px-6 py-4 text-emerald-400 font-semibold">
                      {fx.amountApprox.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {fx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* COMPREHENSIVE EDITABLE LEAD PROFILE MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-emerald-400" />
                  Student Lead Profile Editor
                </h3>
                <p className="text-xs text-slate-400">ID: {selectedLead.id}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isEditingProfile
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                      : "bg-slate-800 text-slate-300 hover:text-white"
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingProfile ? "Cancel Editing" : "Edit Profile"}</span>
                </button>

                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Editable Profile Form */}
            {isEditingProfile ? (
              <form onSubmit={handleSaveProfileEdit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Student Full Name</label>
                    <input
                      type="text"
                      value={editForm.name || ""}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      value={editForm.email || ""}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Mobile Phone Number</label>
                    <input
                      type="text"
                      value={editForm.phone || ""}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Assign Counselor</label>
                    <select
                      value={editForm.assignedToId || ""}
                      onChange={(e) => setEditForm({ ...editForm, assignedToId: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="">-- Unassigned --</option>
                      {staffUsers.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.name} ({u.role})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Target Country</label>
                    <input
                      type="text"
                      value={editForm.targetCountry || ""}
                      onChange={(e) => setEditForm({ ...editForm, targetCountry: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Target Degree</label>
                    <input
                      type="text"
                      value={editForm.targetDegree || ""}
                      onChange={(e) => setEditForm({ ...editForm, targetDegree: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Approx Budget (INR ₹)</label>
                    <input
                      type="number"
                      value={editForm.budgetApprox || 0}
                      onChange={(e) => setEditForm({ ...editForm, budgetApprox: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Academic CGPA</label>
                    <input
                      type="number"
                      step="0.1"
                      value={editForm.cgpa || 0}
                      onChange={(e) => setEditForm({ ...editForm, cgpa: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Read-Only Profile View */
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-semibold">Student Name</span>
                    <div className="text-base font-bold text-white mt-0.5">{selectedLead.name}</div>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-semibold">Email Address</span>
                    <div className="text-sm font-medium text-slate-200 mt-0.5">{selectedLead.email}</div>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-semibold">Mobile Number</span>
                    <div className="text-sm font-medium text-slate-200 mt-0.5">{selectedLead.phone}</div>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-semibold">Assigned Counselor</span>
                    <div className="text-sm font-semibold text-emerald-400 mt-0.5">
                      {selectedLead.assignedTo?.name || "Unassigned"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <span className="text-xs text-slate-400">Target Country</span>
                    <div className="text-sm font-semibold text-white mt-0.5">{selectedLead.targetCountry || "N/A"}</div>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <span className="text-xs text-slate-400">Target Degree</span>
                    <div className="text-sm font-semibold text-white mt-0.5">{selectedLead.targetDegree || "N/A"}</div>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <span className="text-xs text-slate-400">Approx Budget</span>
                    <div className="text-sm font-semibold text-emerald-400 mt-0.5">
                      {selectedLead.budgetApprox ? `₹${selectedLead.budgetApprox.toLocaleString()}` : "N/A"}
                    </div>
                  </div>
                </div>

                {/* Notes Feed */}
                <div className="space-y-3">
                  <h4 className="text-sm font-heading font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    Internal Admin Notes Log
                  </h4>

                  <div className="max-h-36 overflow-y-auto space-y-2 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                    {selectedLead.notes.length === 0 ? (
                      <p className="text-xs text-slate-500 italic">No admin notes logged yet.</p>
                    ) : (
                      selectedLead.notes.map((note) => (
                        <div key={note.id} className="text-xs text-slate-300 border-b border-slate-800/60 pb-2 last:border-none">
                          <div className="flex justify-between text-slate-500 text-[10px] mb-1">
                            <span>{note.author}</span>
                            <span>{new Date(note.createdAt).toLocaleString()}</span>
                          </div>
                          <div>{note.content}</div>
                        </div>
                      ))
                    )}
                  </div>

                  <form onSubmit={handleAddNote} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add follow-up remark..."
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post Note</span>
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LEAD DELETION CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-red-500/30 rounded-3xl w-full max-w-sm p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mx-auto border border-red-500/20">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-heading font-bold text-white">Delete Student Lead?</h3>
            <p className="text-xs text-slate-400">
              This action cannot be undone. All notes and history associated with this lead will be permanently deleted from Neon PostgreSQL.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="w-1/2 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteLead(deleteConfirmId)}
                className="w-1/2 py-2.5 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-red-600/20"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK ADD LEAD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                Add New Student Lead
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Roy"
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. ananya@gmail.com"
                  value={newLeadForm.email}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Mobile Phone Number *</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210"
                  value={newLeadForm.phone}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Country</label>
                  <select
                    value={newLeadForm.targetCountry}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, targetCountry: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Germany">Germany</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Degree</label>
                  <select
                    value={newLeadForm.targetDegree}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, targetDegree: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Master's">Master's</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="MBA">MBA</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
