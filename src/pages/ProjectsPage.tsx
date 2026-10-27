import React, { useState, useEffect, useMemo } from "react";
import {
  FolderGit2,
  Search,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  LayoutGrid,
  Rows,
  Layers,
  Filter,
} from "lucide-react";
import Header from "../components/sections/Header";
import CleanFooter from "../components/sections/CleanFooter";
import ParticleField from "../components/ParticleField";
import Pagination from "../components/ui/Pagination";
import { apiService, ProjectData, ProfileData } from "../services/api";

const ITEMS_PER_PAGE = 6;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  // Filters & State
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewTheme, setViewTheme] = useState<"card" | "showcase" | "minimal">("card");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    Promise.all([apiService.getProjects(), apiService.getProfile()])
      .then(([projs, prof]) => {
        setProjects(projs);
        setProfile(prof);
      })
      .finally(() => setLoading(false));
  }, []);

  // Compute unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        (p.technologies || []).some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [projects, search, selectedCategory]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  return (
    <div className="relative min-h-screen text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <ParticleField />
      <Header brandName={profile?.name} profile={profile} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-20 space-y-12">
        {/* Page Hero Header */}
        <section className="space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-xs font-mono font-bold">
            <FolderGit2 size={13} />
            <span>Architecture & Products</span>
          </div>
          <h1 className="display-title text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-white">
            Engineering Archive &
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500">
              Selected Works Portfolio.
            </span>
          </h1>
          <p className="max-w-2xl text-slate-400 text-base md:text-lg leading-relaxed">
            A comprehensive catalog of production mobile systems, Flutter apps, scalable microservices, and client architectures.
          </p>
        </section>

        {/* Filter Controls Bar with Themes & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0d1322]/80 border border-slate-800/80 backdrop-blur-xl shadow-xl">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by title, stack (Flutter, NestJS)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#080d1a] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Category Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all shrink-0 ${
                    selectedCategory === cat
                      ? "bg-cyan-400 text-slate-950 font-black shadow-md shadow-cyan-400/20"
                      : "bg-[#080d1a] border border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Display Theme Toggles */}
            <div className="flex items-center gap-1 bg-[#080d1a] border border-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setViewTheme("card")}
                title="Grid Theme"
                className={`p-1.5 rounded-lg transition-all ${
                  viewTheme === "card"
                    ? "bg-cyan-400 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewTheme("showcase")}
                title="Cinematic Showcase Theme"
                className={`p-1.5 rounded-lg transition-all ${
                  viewTheme === "showcase"
                    ? "bg-cyan-400 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers size={16} />
              </button>
              <button
                onClick={() => setViewTheme("minimal")}
                title="Compact List Theme"
                className={`p-1.5 rounded-lg transition-all ${
                  viewTheme === "minimal"
                    ? "bg-cyan-400 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Rows size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Projects Render Area */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-mono text-slate-400">Loading catalog from database...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-24 text-center bg-[#0d1322]/50 border border-slate-800/80 rounded-3xl p-8">
            <p className="text-base text-slate-400">No projects found matching your query.</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono rounded-xl"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* THEME 1: MODERN GRID CARDS */}
            {viewTheme === "card" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProjects.map((project, idx) => {
                  const coverImg =
                    project.imageUrl ||
                    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80";
                  return (
                    <article
                      key={project.id || idx}
                      className="group flex flex-col justify-between rounded-3xl border border-slate-800 bg-[#0d1322]/80 overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:-translate-y-1.5 shadow-2xl"
                    >
                      <div>
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 border-b border-slate-800">
                          <img
                            src={coverImg}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80";
                            }}
                          />
                          {project.category && (
                            <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-950/80 border border-white/10 text-cyan-300 font-mono text-[10px] font-bold backdrop-blur-md">
                              {project.category}
                            </span>
                          )}
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                            {project.title}
                          </h3>
                          {project.subtitle && (
                            <p className="text-xs font-semibold text-slate-400 mt-1">
                              {project.subtitle}
                            </p>
                          )}
                          <p className="mt-3 text-xs md:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-1 mt-4">
                            {(project.technologies || []).slice(0, 4).map((tech, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-mono"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 pt-0 border-t border-slate-800/60 mt-4 flex items-center justify-between">
                        <div className="flex gap-2 pt-4">
                          {project.playStoreUrl && (
                            <a
                              href={project.playStoreUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1"
                            >
                              Play Store <ExternalLink size={12} />
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1"
                            >
                              Source <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="pt-4 inline-flex items-center gap-1 text-xs font-extrabold text-cyan-400 hover:underline"
                          >
                            Live Demo <ArrowUpRight size={14} />
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* THEME 2: CINEMATIC SHOWCASE (Alternating Detailed Rows) */}
            {viewTheme === "showcase" && (
              <div className="space-y-12">
                {paginatedProjects.map((project, idx) => {
                  const isReverse = idx % 2 === 1;
                  const coverImg =
                    project.imageUrl ||
                    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80";
                  return (
                    <article
                      key={project.id || idx}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0d1322]/80 border border-slate-800/80 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl transition-all hover:border-cyan-500/40"
                    >
                      <div
                        className={`lg:col-span-6 ${
                          isReverse ? "lg:order-2" : "lg:order-1"
                        } overflow-hidden rounded-2xl border border-white/10 group relative aspect-[16/10] bg-slate-950`}
                      >
                        <img
                          src={coverImg}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {project.category && (
                          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/90 border border-white/10 text-cyan-300 font-mono text-xs font-bold backdrop-blur-md">
                            {project.category}
                          </span>
                        )}
                      </div>

                      <div
                        className={`lg:col-span-6 ${
                          isReverse ? "lg:order-1" : "lg:order-2"
                        } space-y-5`}
                      >
                        <div>
                          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                            Archive Index #{((currentPage - 1) * ITEMS_PER_PAGE) + idx + 1}
                          </span>
                          <h3 className="text-2xl md:text-3xl font-black text-white mt-1">
                            {project.title}
                          </h3>
                          {project.subtitle && (
                            <p className="text-sm font-semibold text-cyan-400 mt-0.5">
                              {project.subtitle}
                            </p>
                          )}
                        </div>

                        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {(project.technologies || []).map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono font-semibold"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-black text-xs hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-400/20"
                            >
                              Open Live Platform <ArrowUpRight size={15} />
                            </a>
                          )}
                          {project.playStoreUrl && (
                            <a
                              href={project.playStoreUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white font-bold text-xs hover:bg-white/10 transition-colors"
                            >
                              Play Store
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white font-bold text-xs hover:bg-white/10 transition-colors"
                            >
                              Source Code
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* THEME 3: MINIMAL STREAMLINED LIST */}
            {viewTheme === "minimal" && (
              <div className="bg-[#0d1322]/80 border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl divide-y divide-slate-800/60">
                {paginatedProjects.map((project, idx) => (
                  <div
                    key={project.id || idx}
                    className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:bg-slate-800/30 transition-colors"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-cyan-400 font-bold">
                          #{((currentPage - 1) * ITEMS_PER_PAGE) + idx + 1}
                        </span>
                        <h4 className="text-lg font-black text-white hover:text-cyan-300">
                          {project.title}
                        </h4>
                        {project.category && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                            {project.category}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">{project.description}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {(project.technologies || []).slice(0, 3).map((t, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 transition-colors"
                            title="Live Preview"
                          >
                            <ArrowUpRight size={16} />
                          </a>
                        )}
                        {project.playStoreUrl && (
                          <a
                            href={project.playStoreUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
                            title="Play Store"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredProjects.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 350, behavior: "smooth" });
              }}
            />
          </>
        )}
      </main>

      <CleanFooter profile={profile} />
    </div>
  );
}
