"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2, 
  X, 
  Sparkles,
  BookOpen,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { BlogPost } from "@/data/blogs";

const CATEGORIES = [
  "All",
  "Australia",
  "United Kingdom",
  "Canada",
  "Germany",
  "Ireland",
  "Scholarships",
  "Visa Guides",
] as const;

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Modal / Drawer state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Scholarships" as BlogPost["category"],
    excerpt: "",
    content: "",
    coverImage: "/campus_quad_hero.webp",
    authorName: "UES Admissions Team",
    authorRole: "Senior Study Abroad Counselor",
    readTime: "5 min read",
    tags: "",
    featured: false,
  });

  // Fetch blogs from API
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();
      if (data.success && data.blogs) {
        setBlogs(data.blogs);
      }
    } catch (err) {
      console.error("Failed to load blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchesSearch =
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || b.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchQuery, selectedCategory]);

  const handleOpenCreateModal = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      slug: "",
      category: "Scholarships",
      excerpt: "",
      content: "",
      coverImage: "/campus_quad_hero.webp",
      authorName: "UES Admissions Team",
      authorRole: "Senior Study Abroad Counselor",
      readTime: "5 min read",
      tags: "Study Abroad, Admissions",
      featured: false,
    });
    setIsModalOpen(true);
    setStatusMessage(null);
  };

  const handleOpenEditModal = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      excerpt: blog.excerpt,
      content: blog.content,
      coverImage: blog.coverImage || "/campus_quad_hero.webp",
      authorName: blog.author.name,
      authorRole: blog.author.role,
      readTime: blog.readTime,
      tags: blog.tags.join(", "),
      featured: Boolean(blog.featured),
    });
    setIsModalOpen(true);
    setStatusMessage(null);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      // Only auto-update slug if creating new
      slug: editingBlog ? prev.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.excerpt || !formData.content) {
      setStatusMessage({ type: "error", text: "Title, excerpt, and content are required." });
      return;
    }

    setIsSaving(true);
    setStatusMessage(null);

    try {
      const payload = {
        title: formData.title,
        slug: formData.slug,
        category: formData.category,
        excerpt: formData.excerpt,
        content: formData.content,
        coverImage: formData.coverImage,
        authorName: formData.authorName,
        authorRole: formData.authorRole,
        readTime: formData.readTime,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        featured: formData.featured,
      };

      if (editingBlog) {
        // Update
        const res = await fetch(`/api/admin/blogs/${editingBlog.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setStatusMessage({ type: "success", text: "Article updated successfully!" });
          fetchBlogs();
          setTimeout(() => setIsModalOpen(false), 800);
        } else {
          setStatusMessage({ type: "error", text: data.error || "Failed to update article." });
        }
      } else {
        // Create
        const res = await fetch("/api/admin/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setStatusMessage({ type: "success", text: "New article published successfully!" });
          fetchBlogs();
          setTimeout(() => setIsModalOpen(false), 800);
        } else {
          setStatusMessage({ type: "error", text: data.error || "Failed to publish article." });
        }
      }
    } catch {
      setStatusMessage({ type: "error", text: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchBlogs();
      }
    } catch (err) {
      console.error("Failed to delete blog:", err);
    }
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-emerald-600" />
            Editorial &amp; Blog CMS
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Publish study guides, visa roadmaps, scholarship announcements, and country updates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchBlogs}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
            title="Refresh articles"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleOpenCreateModal}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center gap-2 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Article
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Total Articles
          </span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900">{blogs.length}</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Featured Guides
          </span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-600">
            {blogs.filter((b) => b.featured).length}
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Active Categories
          </span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900">
            {new Set(blogs.map((b) => b.category)).size}
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Avg Read Time
          </span>
          <span className="text-2xl sm:text-3xl font-black text-slate-700">6 min</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, keyword, or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid / Table */}
      {loading ? (
        <div className="py-20 text-center">
          <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-3" />
          <p className="text-slate-500 text-sm font-medium">Loading editorial articles...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200/80 p-8">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No articles found</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
            Try adjusting your search query or create your first study abroad editorial article.
          </p>
          <button
            onClick={handleOpenCreateModal}
            className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs inline-flex items-center gap-2 hover:bg-emerald-500 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Create Article
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col overflow-hidden group"
            >
              {/* Cover Image */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={blog.coverImage || "/campus_quad_hero.webp"}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs">
                    {blog.category}
                  </span>
                  {blog.featured && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {blog.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 mb-2 group-hover:text-emerald-700 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Footer & Actions */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-600 flex items-center gap-1.5 truncate max-w-[140px]">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    {blog.author.name}
                  </span>

                  <div className="flex items-center gap-1">
                    <Link
                      href={`/blogs/${blog.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-slate-50 transition-colors"
                      title="View live article"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleOpenEditModal(blog)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      title="Edit article"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id, blog.title)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal / Drawer for Create & Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingBlog ? "Edit Article" : "Create New Article"}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Publish authoritative study abroad insights directly to /blogs.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              {statusMessage && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                    statusMessage.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-rose-50 text-rose-800 border border-rose-200"
                  }`}
                >
                  {statusMessage.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Complete Guide to Study in Germany Without Tuition Fees"
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {/* Slug & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="study-in-germany-free"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as BlogPost["category"] })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                  >
                    {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Excerpt (Summary &amp; Meta Description) *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="A concise 1-2 sentence overview for cards and Google search snippets..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {/* Cover Image & Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Cover Image Path
                  </label>
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Read Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 6 min read"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Author & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tags (Comma Separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Germany, Tuition, Visa"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Content (Markdown) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Article Content (Supports Markdown headings and bullets) *
                </label>
                <textarea
                  required
                  rows={8}
                  placeholder="Write the full guide here. Use ## for section headings and - for bullet points..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded-sm border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="featuredToggle" className="text-sm font-medium text-slate-700 cursor-pointer">
                  Feature this article prominently on the homepage and blog header
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-xs transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving && <RefreshCw className="w-4 h-4 animate-spin" />}
                  {editingBlog ? "Save Changes" : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
