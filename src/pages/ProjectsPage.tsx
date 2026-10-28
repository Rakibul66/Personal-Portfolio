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
import { apiService, ProjectData, ProfileData, resolveMediaUrl } from "../services/api";
import { SectionSkeleton } from "../components/ui/Loaders";

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
        if (projs && Array.isArray(projs)) setProjects(projs);
        if (prof) setProfile(prof);
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

  // Filter projects by Search & Category
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        !search ||
        project.title.toLowerCase().includes(q) ||
        (project.subtitle && project.subtitle.toLowerCase().includes(q)) ||
        (project.description && project.description.toLowerCase().includes(q)) ||
        (project.technologies &&
          project.technologies.some((t) => t.toLowerCase().includes(q)));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, search]);

  // Pagination Slice
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="relative min-h-screen text-slate-800 dark:text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <ParticleField />
      <Header brandName={profile?.name} profile={profile} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-20 space-y-12">
        {/* Page Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <FolderGit2 size={14} />
            <span>Curated Portfolio Archive</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            Engineering & Product Archive
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Live database archive of production mobile applications, web platforms, and engineering systems.
          </p>
        </div>

        {/* Toolbar: Search, Filters & View Themes */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, stack, keyword..."
              value={search}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/70 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* View Themes Toggle */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-950/60 self-start md:self-auto">
            <button
              onClick={() => setViewTheme("card")}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewTheme === "card"
                  ? "bg-cyan-500 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="Modern Grid Cards"
            >
              <LayoutGrid size={15} />
              <span className="hidden sm:inline">Cards</span>
            </button>
            <button
              onClick={() => setViewTheme("showcase")}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewTheme === "showcase"
                  ? "bg-cyan-500 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="High-Impact Showcase"
            >
              <Layers size={15} />
              <span className="hidden sm:inline">Showcase</span>
            </button>
            <button
              onClick={() => setViewTheme("minimal")}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewTheme === "minimal"
                  ? "bg-cyan-500 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="Minimal Compact List"
            >
              <Rows size={15} />
              <span className="hidden sm:inline">Compact</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        {categories.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className="flex items-center gap-1 text-xs font-bold text-slate-400 mr-2 shrink-0">
              <Filter size={13} />
              Categories:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                    : "bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-cyan-400/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && <SectionSkeleton />}

        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-20 border border-dashed border-slate-300 dark:border-white/10 rounded-3xl p-8 bg-white/40 dark:bg-slate-900/40">
            <FolderGit2 size={40} className="mx-auto text-slate-400 mb-3" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No projects found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              {search || selectedCategory !== "All"
                ? "No projects matched your active filters. Try resetting search."
                : "No projects have been added yet in the Admin Studio."}
            </p>
          </div>
        )}

        {/* Cards Grid Theme */}
        {!loading && viewTheme === "card" && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProjects.map((project) => (
              <article
                key={project.id || project.title}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322]/80 overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/50 hover:-translate-y-1.5 shadow-lg dark:shadow-2xl"
              >
                <div>
                  {project.imageUrl && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                      <img
                        src={resolveMediaUrl(project.imageUrl)}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                        {project.category || "Application"}
                      </span>
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20">
                          <Sparkles size={10} /> Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {project.subtitle}
                      </p>
                    )}
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 text-white hover:bg-cyan-600 transition-all shadow-md shadow-cyan-500/20"
                    >
                      <span>Live Site</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                  {project.playStoreUrl && (
                    <a
                      href={project.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-cyan-400/40 transition-all text-slate-700 dark:text-white"
                    >
                      <span>Play Store</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Minimal / Compact View Theme */}
        {!loading && viewTheme === "minimal" && filteredProjects.length > 0 && (
          <div className="divide-y divide-slate-200 dark:divide-white/10 border border-slate-200 dark:border-white/10 rounded-2xl bg-white/70 dark:bg-slate-900/60 overflow-hidden backdrop-blur-xl">
            {paginatedProjects.map((project) => (
              <div
                key={project.id || project.title}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                      {project.category || "App"}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {project.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 text-white hover:bg-cyan-600 transition-colors inline-flex items-center gap-1"
                    >
                      <span>Visit</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                  {project.playStoreUrl && (
                    <a
                      href={project.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      <span>App</span>
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </div>
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
