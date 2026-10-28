import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Search,
} from "lucide-react";
import Header from "../components/sections/Header";
import CleanFooter from "../components/sections/CleanFooter";
import ParticleField from "../components/ParticleField";
import Pagination from "../components/ui/Pagination";
import { apiService, BlogData, ProfileData, resolveMediaUrl } from "../services/api";

const ARTICLES_PER_PAGE = 6;

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  // Search & Filter
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    Promise.all([apiService.getBlogs(), apiService.getProfile()])
      .then(([bList, prof]) => {
        if (bList && Array.isArray(bList)) setBlogs(bList);
        if (prof) setProfile(prof);
      })
      .finally(() => setLoading(false));
  }, []);

  // Collect unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => (b.tags || []).forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, [blogs]);

  // Filtered Articles
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchesTag =
        selectedTag === "All" || (b.tags && b.tags.includes(selectedTag));
      const q = search.toLowerCase();
      const matchesSearch =
        !search ||
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        (b.tags && b.tags.some((t) => t.toLowerCase().includes(q)));
      return matchesTag && matchesSearch;
    });
  }, [blogs, selectedTag, search]);

  const totalPages = Math.ceil(filteredBlogs.length / ARTICLES_PER_PAGE);
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    return filteredBlogs.slice(start, start + ARTICLES_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  return (
    <div className="relative min-h-screen text-slate-800 dark:text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <ParticleField />
      <Header brandName={profile?.name} profile={profile} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-20 space-y-12">
        {/* Page Hero Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <BookOpen size={14} />
            <span>Technical Publications & Insights</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            Engineering Articles & Notes
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Deep-dives into mobile architectures, telecommunications, embedded engineering, and production systems.
          </p>
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by article title, tag, or topic..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/70 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {allTags.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag(tag);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedTag === tag
                      ? "bg-cyan-500 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-cyan-400/40"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Empty State */}
        {!loading && filteredBlogs.length === 0 && (
          <div className="text-center py-20 border border-dashed border-slate-300 dark:border-white/10 rounded-3xl p-8 bg-white/40 dark:bg-slate-900/40">
            <BookOpen size={40} className="mx-auto text-slate-400 mb-3" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No articles found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              {search || selectedTag !== "All"
                ? "No articles matched your active search query."
                : "No articles published yet. Publish technical writings from the Admin Studio."}
            </p>
          </div>
        )}

        {/* Articles Grid */}
        {!loading && filteredBlogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedBlogs.map((blog) => (
              <Link
                key={blog.id || blog.slug}
                to={`/blog/${blog.slug || blog.id}`}
                className="group rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-cyan-500/50 hover:-translate-y-1.5 shadow-lg dark:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  {blog.coverImage && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-white/10">
                      <img
                        src={resolveMediaUrl(blog.coverImage)}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-cyan-500" />
                        {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Recent"}
                      </span>
                      {blog.readingTime && (
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-cyan-500" />
                          {blog.readingTime}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {blog.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-cyan-600 dark:text-cyan-400">
                  <span>Read Full Article</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {!loading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>

      <CleanFooter profile={profile} />
    </div>
  );
}
