"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  BookOpen,
  Plus,
  Search,
  GraduationCap,
  Globe,
  RefreshCw,
  Edit3,
  Trash2,
  X,
  Save,
  Clock,
} from "lucide-react";

interface UniversityOption {
  id: string;
  name: string;
  country: {
    name: string;
    currencySymbol: string;
  };
}

interface Course {
  id: string;
  title: string;
  degreeLevel: string;
  durationMonths: number;
  tuitionFee: number;
  overview: string;
  university: {
    id: string;
    name: string;
    country: {
      name: string;
      currencySymbol: string;
    };
  };
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [universities, setUniversities] = useState<UniversityOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Forms
  const [addForm, setAddForm] = useState({
    title: "",
    universityId: "",
    degreeLevel: "MASTER",
    durationMonths: "24",
    tuitionFee: "25000",
    overview: "",
  });

  const [editForm, setEditForm] = useState<Partial<Course>>({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [courseRes, uniRes] = await Promise.all([
        fetch("/api/admin/courses"),
        fetch("/api/admin/universities"),
      ]);

      const [courseData, uniData] = await Promise.all([
        courseRes.json(),
        uniRes.json(),
      ]);

      if (courseData.success) setCourses(courseData.courses);
      if (uniData.success) {
        setUniversities(uniData.universities);
        if (uniData.universities.length > 0) {
          setAddForm((prev) => ({ ...prev, universityId: uniData.universities[0].id }));
        }
      }
    } catch (err) {
      console.error("Failed to load degree courses catalog:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Create Course
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      });
      const data = await res.json();
      if (data.success) {
        setCourses([data.course, ...courses]);
        setShowAddModal(false);
        setAddForm({
          title: "",
          universityId: universities[0]?.id || "",
          degreeLevel: "MASTER",
          durationMonths: "24",
          tuitionFee: "25000",
          overview: "",
        });
      }
    } catch (err) {
      console.error("Failed to create course:", err);
    }
  };

  // Edit Course
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    try {
      const res = await fetch(`/api/admin/courses/${editingCourse.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (data.success) {
        setCourses((prev) =>
          prev.map((c) => (c.id === data.course.id ? data.course : c))
        );
        setEditingCourse(null);
      }
    } catch (err) {
      console.error("Failed to edit course:", err);
    }
  };

  // Delete Course
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/courses/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setCourses((prev) => prev.filter((c) => c.id !== id));
        setDeleteConfirmId(null);
      }
    } catch (err) {
      console.error("Failed to delete course:", err);
    }
  };

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.university.country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-400" />
            Degree Courses CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Full 100% CRUD control over Bachelor&apos;s, Master&apos;s, and MBA degree programs in Neon DB
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
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-amber-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Course</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 ml-2" />
        <input
          type="text"
          placeholder="Search by degree title, university, or country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent border-none text-sm text-white placeholder-slate-500 focus:outline-none"
        />
      </div>

      {/* Courses Table */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-amber-400 mb-2" />
            <p className="text-sm">Loading course catalog from Neon PostgreSQL...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No courses found matching filter.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Course Title</th>
                  <th className="px-6 py-4">University & Country</th>
                  <th className="px-6 py-4">Degree Level</th>
                  <th className="px-6 py-4">Duration</th>
                  <th className="px-6 py-4">Tuition Fee</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">{course.title}</td>
                    <td className="px-6 py-4">
                      <div className="text-slate-200 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                        {course.university.name}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Globe className="w-3 h-3" />
                        {course.university.country.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30">
                        {course.degreeLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      <div className="flex items-center gap-1 text-xs">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {course.durationMonths} Months
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-emerald-400">
                      {course.university.country.currencySymbol}
                      {course.tuitionFee.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingCourse(course);
                          setEditForm({
                            title: course.title,
                            degreeLevel: course.degreeLevel,
                            durationMonths: course.durationMonths,
                            tuitionFee: course.tuitionFee,
                            overview: course.overview,
                          });
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/30"
                        title="Edit Course"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(course.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30"
                        title="Delete Course"
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

      {/* ADD COURSE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                Add Degree Program
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. M.Sc. Data Science & AI"
                  value={addForm.title}
                  onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">University Partner</label>
                <select
                  value={addForm.universityId}
                  onChange={(e) => setAddForm({ ...addForm, universityId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                >
                  {universities.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.country.name})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Level</label>
                  <select
                    value={addForm.degreeLevel}
                    onChange={(e) => setAddForm({ ...addForm, degreeLevel: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="MASTER">MASTER</option>
                    <option value="BACHELOR">BACHELOR</option>
                    <option value="MBA">MBA</option>
                    <option value="PHD">PHD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Duration (Mos)</label>
                  <input
                    type="number"
                    value={addForm.durationMonths}
                    onChange={(e) => setAddForm({ ...addForm, durationMonths: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Tuition Fee</label>
                  <input
                    type="number"
                    value={addForm.tuitionFee}
                    onChange={(e) => setAddForm({ ...addForm, tuitionFee: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Program Overview</label>
                <textarea
                  rows={2}
                  placeholder="Degree description..."
                  value={addForm.overview}
                  onChange={(e) => setAddForm({ ...addForm, overview: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
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
                  className="w-1/2 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl"
                >
                  Save Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT COURSE MODAL */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-400" />
                Edit Degree Program
              </h3>
              <button onClick={() => setEditingCourse(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Course Title</label>
                <input
                  type="text"
                  value={editForm.title || ""}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Degree Level</label>
                  <select
                    value={editForm.degreeLevel || "MASTER"}
                    onChange={(e) => setEditForm({ ...editForm, degreeLevel: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="MASTER">MASTER</option>
                    <option value="BACHELOR">BACHELOR</option>
                    <option value="MBA">MBA</option>
                    <option value="PHD">PHD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Duration (Mos)</label>
                  <input
                    type="number"
                    value={editForm.durationMonths || 24}
                    onChange={(e) => setEditForm({ ...editForm, durationMonths: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tuition Fee</label>
                <input
                  type="number"
                  value={editForm.tuitionFee || 0}
                  onChange={(e) => setEditForm({ ...editForm, tuitionFee: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="w-1/2 py-2.5 bg-slate-800 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl flex items-center justify-center gap-1.5"
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
            <h3 className="text-lg font-heading font-bold text-white">Delete Course?</h3>
            <p className="text-xs text-slate-400">
              This will permanently delete this degree program from Neon PostgreSQL.
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
