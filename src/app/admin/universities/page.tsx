"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  GraduationCap,
  Plus,
  Search,
  MapPin,
  Globe,
  RefreshCw,
  Edit3,
  Trash2,
  X,
  Save,
  BookOpen,
} from "lucide-react";

interface Country {
  id: string;
  name: string;
  currencySymbol: string;
}

interface University {
  id: string;
  name: string;
  locationCity: string;
  globalRanking: number | null;
  approxTuitionYearly: number;
  approxLivingYearly: number;
  overview: string;
  country: {
    id: string;
    name: string;
    currencySymbol: string;
  };
  _count: {
    courses: number;
  };
}

export default function AdminUniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUni, setEditingUni] = useState<University | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Forms
  const [addForm, setAddForm] = useState({
    name: "",
    countryId: "",
    locationCity: "",
    globalRanking: "",
    approxTuitionYearly: "25000",
    approxLivingYearly: "12000",
    overview: "",
  });

  const [editForm, setEditForm] = useState<Partial<University>>({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [uniRes, countryRes] = await Promise.all([
        fetch("/api/admin/universities"),
        fetch("/api/admin/countries"),
      ]);

      const [uniData, countryData] = await Promise.all([
        uniRes.json(),
        countryRes.json(),
      ]);

      if (uniData.success) setUniversities(uniData.universities);
      if (countryData.success) {
        setCountries(countryData.countries);
        if (countryData.countries.length > 0) {
          setAddForm((prev) => ({ ...prev, countryId: countryData.countries[0].id }));
        }
      }
    } catch (err) {
      console.error("Failed to load university catalog:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchData]);

  // Create University
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/universities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      });
      const data = await res.json();
      if (data.success) {
        setUniversities([data.university, ...universities]);
        setShowAddModal(false);
        setAddForm({
          name: "",
          countryId: countries[0]?.id || "",
          locationCity: "",
          globalRanking: "",
          approxTuitionYearly: "25000",
          approxLivingYearly: "12000",
          overview: "",
        });
      }
    } catch (err) {
      console.error("Failed to create university:", err);
    }
  };

  // Edit University
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUni) return;

    try {
      const res = await fetch(`/api/admin/universities/${editingUni.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (data.success) {
        setUniversities((prev) =>
          prev.map((u) => (u.id === data.university.id ? data.university : u))
        );
        setEditingUni(null);
      }
    } catch (err) {
      console.error("Failed to edit university:", err);
    }
  };

  // Delete University
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/universities/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setUniversities((prev) => prev.filter((u) => u.id !== id));
        setDeleteConfirmId(null);
      }
    } catch (err) {
      console.error("Failed to delete university:", err);
    }
  };

  const filtered = universities.filter(
    (uni) =>
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.locationCity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-sky-400" />
            University Catalog CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Full 100% CRUD control over partner universities, global rankings, and tuition fees in Neon DB
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-sky-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add University</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 ml-2" />
        <input
          type="text"
          placeholder="Search by university name, destination country, or city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent border-none text-sm text-white placeholder-slate-500 focus:outline-none"
        />
      </div>

      {/* Universities Table */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-sky-400 mb-2" />
            <p className="text-sm">Loading university catalog from Neon PostgreSQL...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No universities found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">University Name</th>
                  <th className="px-6 py-4">Country & City</th>
                  <th className="px-6 py-4">Global Rank</th>
                  <th className="px-6 py-4">Tuition Fee / Yr</th>
                  <th className="px-6 py-4">Active Courses</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((uni) => (
                  <tr key={uni.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">{uni.name}</td>
                    <td className="px-6 py-4">
                      <div className="text-slate-200 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-sky-400" />
                        {uni.country.name}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {uni.locationCity}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-amber-400">
                      {uni.globalRanking ? `#${uni.globalRanking}` : "Unranked"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-emerald-400">
                      {uni.country.currencySymbol}
                      {uni.approxTuitionYearly.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      <span className="inline-flex items-center gap-1 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold text-white">
                        <BookOpen className="w-3 h-3 text-sky-400" />
                        {uni._count?.courses || 0} Courses
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingUni(uni);
                          setEditForm({
                            name: uni.name,
                            locationCity: uni.locationCity,
                            globalRanking: uni.globalRanking || 0,
                            approxTuitionYearly: uni.approxTuitionYearly,
                            approxLivingYearly: uni.approxLivingYearly,
                            overview: uni.overview,
                          });
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 border border-transparent hover:border-sky-500/30"
                        title="Edit University"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(uni.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30"
                        title="Delete University"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD UNIVERSITY MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-sky-400" />
                Add Partner University
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">University Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. University of Manchester"
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Destination Country</label>
                  <select
                    value={addForm.countryId}
                    onChange={(e) => setAddForm({ ...addForm, countryId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500"
                  >
                    {countries.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Campus City</label>
                  <input
                    type="text"
                    placeholder="e.g. Manchester"
                    value={addForm.locationCity}
                    onChange={(e) => setAddForm({ ...addForm, locationCity: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Global Ranking (#)</label>
                  <input
                    type="number"
                    placeholder="e.g. 28"
                    value={addForm.globalRanking}
                    onChange={(e) => setAddForm({ ...addForm, globalRanking: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Tuition Fee / Yr</label>
                  <input
                    type="number"
                    placeholder="25000"
                    value={addForm.approxTuitionYearly}
                    onChange={(e) => setAddForm({ ...addForm, approxTuitionYearly: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Overview Description</label>
                <textarea
                  rows={2}
                  placeholder="Overview info..."
                  value={addForm.overview}
                  onChange={(e) => setAddForm({ ...addForm, overview: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500"
                />
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
                  className="w-1/2 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl"
                >
                  Save University
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT UNIVERSITY MODAL */}
      {editingUni && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-sky-400" />
                Edit University
              </h3>
              <button onClick={() => setEditingUni(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">University Name</label>
                <input
                  type="text"
                  value={editForm.name || ""}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Campus City</label>
                  <input
                    type="text"
                    value={editForm.locationCity || ""}
                    onChange={(e) => setEditForm({ ...editForm, locationCity: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Global Ranking (#)</label>
                  <input
                    type="number"
                    value={editForm.globalRanking || 0}
                    onChange={(e) => setEditForm({ ...editForm, globalRanking: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tuition Fee / Yr</label>
                <input
                  type="number"
                  value={editForm.approxTuitionYearly || 0}
                  onChange={(e) => setEditForm({ ...editForm, approxTuitionYearly: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingUni(null)}
                  className="w-1/2 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-red-500/30 rounded-3xl w-full max-w-sm p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mx-auto border border-red-500/20">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-heading font-bold text-white">Delete University?</h3>
            <p className="text-xs text-slate-400">
              This will permanently delete this university and its associated degree courses from Neon PostgreSQL.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="w-1/2 py-2.5 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="w-1/2 py-2.5 bg-red-600 text-white font-semibold text-xs rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
