import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
  BookOpen,
  Sparkles,
  Check,
} from "lucide-react";
import Header from "../components/sections/Header";
import CleanFooter from "../components/sections/CleanFooter";
import ParticleField from "../components/ParticleField";
import { apiService, BlogData, ProfileData, resolveMediaUrl } from "../services/api";

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [article, setArticle] = useState<BlogData | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [recentArticles, setRecentArticles] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!slug) return;

    setLoading(true);
    Promise.all([
      apiService.getBlogBySlug(slug),
      apiService.getProfile(),
      apiService.getBlogs(),
    ])
      .then(([foundArticle, prof, allArticles]) => {
        setArticle(foundArticle);
        if (prof) setProfile(prof);
        if (allArticles) {
          setRecentArticles(
            allArticles.filter((b) => b.slug !== slug && b.id !== slug).slice(0, 3)
          );
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen text-slate-800 dark:text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <ParticleField />
      <Header brandName={profile?.name} profile={profile} />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-20 space-y-10">
        {/* Back navigation button */}
        <div>
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:text-cyan-500 hover:border-cyan-500/40 transition-all backdrop-blur-md"
          >
            <ArrowLeft size={14} />
            <span>Back to All Articles</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-24 text-center space-y-4">
            <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-mono text-slate-400">Loading publication...</p>
          </div>
        )}

        {/* Article Not Found */}
        {!loading && !article && (
          <div className="text-center py-20 border border-dashed border-slate-300 dark:border-white/10 rounded-3xl p-8 bg-white/40 dark:bg-slate-900/40 space-y-4">
            <BookOpen size={44} className="mx-auto text-slate-400" />
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Article Not Found</h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              The article you're trying to read does not exist or may have been unlisted.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-cyan-500 text-white hover:bg-cyan-600 transition-colors"
            >
              Browse Articles
            </Link>
          </div>
        )}

        {/* Real Article Content */}
        {!loading && article && (
          <article className="space-y-8">
            {/* Metadata Bar */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-cyan-500" />
                    {article.createdAt ? new Date(article.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "Recent"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 font-semibold">
                    <Clock size={13} />
                    {article.readingTime || "5 min read"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:text-cyan-500 transition-colors"
                  title="Copy article link"
                >
                  {copied ? <Check size={13} className="text-emerald-500" /> : <Share2 size={13} />}
                  <span>{copied ? "Link Copied" : "Share"}</span>
                </button>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                {article.title}
              </h1>

              {/* Excerpt / Lead */}
              {article.excerpt && (
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed border-l-2 border-cyan-500 pl-4">
                  {article.excerpt}
                </p>
              )}

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {article.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Cover Image */}
            {article.coverImage && (
              <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-950 shadow-xl">
                <img
                  src={resolveMediaUrl(article.coverImage)}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Main Article Body */}
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 p-6 sm:p-10 shadow-lg backdrop-blur-xl">
              <div className="prose prose-slate dark:prose-invert max-w-none text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                {article.content}
              </div>
            </div>

            {/* Author Card */}
            {profile && (
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-900/50 backdrop-blur-md flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-[11px] font-mono uppercase font-bold text-cyan-600 dark:text-cyan-400">
                    Published by
                  </div>
                  <div className="text-base font-bold text-slate-900 dark:text-white">
                    {profile.name}
                  </div>
                  {profile.title && (
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {profile.title}
                    </div>
                  )}
                </div>

                <Link
                  to="/contact"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-white hover:bg-cyan-600 transition-colors shrink-0"
                >
                  Contact Author
                </Link>
              </div>
            )}

            {/* More Articles */}
            {recentArticles.length > 0 && (
              <div className="pt-8 space-y-5 border-t border-slate-200 dark:border-white/10">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Continue Reading
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {recentArticles.map((rec) => (
                    <Link
                      key={rec.id || rec.slug}
                      to={`/blog/${rec.slug || rec.id}`}
                      className="group p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 hover:border-cyan-500/40 transition-all space-y-2"
                    >
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors line-clamp-2">
                        {rec.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {rec.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        )}
      </main>

      <CleanFooter profile={profile} />
    </div>
  );
}
