import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { apiService, BlogData, resolveMediaUrl } from "../../services/api";

export default function BlogSection() {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [activeBlog, setActiveBlog] = useState<BlogData | null>(null);

  useEffect(() => {
    apiService.getBlogs().then((data) => setBlogs(data));
  }, []);

  if (blogs.length === 0) return null;

  return (
    <section className="section-shell px-0 py-6 sm:py-8">
      <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <BookOpen size={20} className="text-cyan-400 shrink-0" />
          <h2 className="display-title text-2xl sm:text-3xl font-black tracking-tight text-white">
            Technical Articles & Insights
          </h2>
        </div>

        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors shrink-0"
        >
          View All ({blogs.length}) <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.slice(0, 3).map((blog) => (
          <article
            key={blog.id || blog.title}
            onClick={() => setActiveBlog(blog)}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-slate-900/40 overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
          >
            {blog.coverImage && (
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 border-b border-white/5">
                <img
                  src={resolveMediaUrl(blog.coverImage)}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            )}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Recent"}
                  </span>
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <Clock size={13} />
                    {blog.readingTime || "5 min read"}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {blog.tags.slice(0, 2).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight size={13} />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      {activeBlog && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in"
          onClick={() => setActiveBlog(null)}
        >
          <div
            className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono text-cyan-300">
                {activeBlog.readingTime || "5 min read"}
              </span>
              <button
                onClick={() => setActiveBlog(null)}
                className="text-slate-400 hover:text-white px-2 py-1 rounded bg-white/5"
              >
                Close ✕
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {activeBlog.title}
            </h2>

            <div className="flex flex-wrap gap-2">
              {activeBlog.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line border-t border-white/10 pt-6">
              {activeBlog.content}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
