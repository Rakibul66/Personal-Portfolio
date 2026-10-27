import React, { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Tag,
  X,
  Share2,
} from "lucide-react";
import Header from "../components/sections/Header";
import CleanFooter from "../components/sections/CleanFooter";
import ParticleField from "../components/ParticleField";
import Pagination from "../components/ui/Pagination";
import { apiService, BlogData, ProfileData } from "../services/api";

const ARTICLES_PER_PAGE = 6;

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  // Search & Filter
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [activeBlog, setActiveBlog] = useState<BlogData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    Promise.all([apiService.getBlogs(), apiService.getProfile()])
      .then(([bList, prof]) => {
        setBlogs(bList);
        setProfile(prof);
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
      const matchSearch =
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        b.content.toLowerCase().includes(search.toLowerCase());
      const matchTag =
        selectedTag === "All" || (b.tags || []).includes(selectedTag);
      return matchSearch && matchTag;
    });
  }, [blogs, search, selectedTag]);

  // Reset page when filtering
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedTag]);

  const totalPages = Math.ceil(filteredBlogs.length / ARTICLES_PER_PAGE);
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    return filteredBlogs.slice(start, start + ARTICLES_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  return (
    <div className="relative min-h-screen text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <ParticleField />
      <Header brandName={profile?.name} profile={profile} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-20 space-y-12">
        {/* Page Hero */}
        <section className="space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-xs font-mono font-bold">
            <BookOpen size={13} />
            <span>Engineering Insights & Publications</span>
          </div>
          <h1 className="display-title text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-white">
            Technical Journal &
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400">
              Architecture Articles.
            </span>
          </h1>
          <p className="max-w-2xl text-slate-400 text-base md:text-lg leading-relaxed">
            Case studies, architectural decisions, and production guides on Flutter, Dart internals, NestJS, and scalable state management.
          </p>
        </section>

        {/* Search & Tags Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0d1322]/80 border border-slate-800/80 backdrop-blur-xl shadow-xl">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search articles by topic, keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#080d1a] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all shrink-0 ${
                  selectedTag === tag
                    ? "bg-cyan-400 text-slate-950 font-black shadow-md shadow-cyan-400/20"
                    : "bg-[#080d1a] border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {tag === "All" ? "All Topics" : `#${tag}`}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-mono text-slate-400">Loading publications...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-24 text-center bg-[#0d1322]/50 border border-slate-800/80 rounded-3xl p-8">
            <p className="text-base text-slate-400">No articles found matching your query.</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedTag("All");
              }}
              className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono rounded-xl"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedBlogs.map((blog) => (
                <article
                  key={blog.id || blog.title}
                  onClick={() => setActiveBlog(blog)}
                  className="group cursor-pointer rounded-3xl border border-slate-800 bg-[#0d1322]/80 overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:-translate-y-1.5 shadow-2xl flex flex-col justify-between"
                >
                  {blog.coverImage ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 border-b border-slate-800">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-32 bg-gradient-to-tr from-cyan-900/20 to-slate-900 border-b border-slate-800 p-6 flex items-end">
                      <BookOpen size={28} className="text-cyan-400/50" />
                    </div>
                  )}

                  <div className="p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-3">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} />
                          {blog.createdAt
                            ? new Date(blog.createdAt).toLocaleDateString()
                            : "Recent"}
                        </span>
                        <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                          <Clock size={13} />
                          {blog.readingTime || "5 min read"}
                        </span>
                      </div>

                      <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="mt-2.5 text-xs md:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {(blog.tags || []).slice(0, 2).map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-black text-cyan-400 group-hover:translate-x-1 transition-transform">
                        Read Story <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredBlogs.length}
              itemsPerPage={ARTICLES_PER_PAGE}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 350, behavior: "smooth" });
              }}
            />
          </>
        )}
      </main>

      {/* Reader Modal */}
      {activeBlog && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fade-in"
          onClick={() => setActiveBlog(null)}
        >
          <div
            className="bg-[#0b101d] border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 sm:p-10 space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs font-mono text-cyan-400 font-bold">
                Technical Publication
              </span>
              <button
                onClick={() => setActiveBlog(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {activeBlog.coverImage && (
              <img
                src={activeBlog.coverImage}
                alt={activeBlog.title}
                className="w-full aspect-[21/9] object-cover rounded-2xl border border-slate-800"
              />
            )}

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {activeBlog.title}
              </h2>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mt-2">
                <span>{new Date(activeBlog.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span className="text-cyan-300">{activeBlog.readingTime}</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line border-t border-slate-800/80 pt-6">
              {activeBlog.content}
            </div>

            <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-800">
              {(activeBlog.tags || []).map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <CleanFooter profile={profile} />
    </div>
  );
}
