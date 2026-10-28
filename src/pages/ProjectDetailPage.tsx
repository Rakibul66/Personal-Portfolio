import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  ArrowUpRight,
  FolderGit2,
  Sparkles,
  Layers,
  CheckCircle2,
} from "lucide-react";
import Header from "../components/sections/Header";
import CleanFooter from "../components/sections/CleanFooter";
import ParticleField from "../components/ParticleField";
import { apiService, ProjectData, ProfileData, resolveMediaUrl } from "../services/api";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<ProjectData | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!id) return;

    setLoading(true);
    Promise.all([
      apiService.getProjectById(id),
      apiService.getProfile(),
      apiService.getProjects(),
    ])
      .then(([foundProject, prof, allProjects]) => {
        setProject(foundProject);
        if (prof) setProfile(prof);
        if (allProjects) {
          setRelatedProjects(
            allProjects.filter((p) => p.id !== id).slice(0, 3)
          );
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const coverImg = project ? resolveMediaUrl(project.imageUrl) : null;

  return (
    <div className="relative min-h-screen text-slate-800 dark:text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <ParticleField />
      <Header brandName={profile?.name} profile={profile} />

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-20 space-y-10">
        {/* Back navigation button */}
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:text-cyan-500 hover:border-cyan-500/40 transition-all backdrop-blur-md"
          >
            <ArrowLeft size={14} />
            <span>Back to Projects</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-24 text-center space-y-4">
            <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-mono text-slate-400">Loading project details...</p>
          </div>
        )}

        {/* Not Found */}
        {!loading && !project && (
          <div className="text-center py-20 border border-dashed border-slate-300 dark:border-white/10 rounded-3xl p-8 bg-white/40 dark:bg-slate-900/40 space-y-4">
            <FolderGit2 size={44} className="mx-auto text-slate-400" />
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Project Not Found</h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              The project you're trying to view does not exist or has been removed.
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-cyan-500 text-white hover:bg-cyan-600 transition-colors"
            >
              Browse All Projects
            </Link>
          </div>
        )}

        {/* Real Project Content */}
        {!loading && project && (
          <article className="space-y-8">
            {/* Header info */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {project.category && (
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    {project.category}
                  </span>
                )}
                {project.featured && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Sparkles size={12} />
                    Featured Project
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                {project.title}
              </h1>

              {project.subtitle && (
                <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium">
                  {project.subtitle}
                </p>
              )}

              {/* Action Links Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-cyan-500 text-white hover:bg-cyan-600 transition-all shadow-md shadow-cyan-500/20"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink size={14} />
                  </a>
                )}
                {project.playStoreUrl && (
                  <a
                    href={project.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-white hover:border-cyan-400/40 transition-all shadow-sm"
                  >
                    <span>Google Play Store</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
                {project.appStoreUrl && (
                  <a
                    href={project.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-white hover:border-cyan-400/40 transition-all shadow-sm"
                  >
                    <span>Apple App Store</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-white hover:border-cyan-400/40 transition-all shadow-sm"
                  >
                    <span>Source Repository</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* High-Resolution Project Preview Cover */}
            {coverImg && (
              <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-950 shadow-2xl">
                <img
                  src={coverImg}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Tech Stack Pills */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Technologies & Architecture Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Overview & Detailed Description */}
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 p-6 sm:p-10 shadow-lg backdrop-blur-xl space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Project Overview & Execution
              </h2>
              <div className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                {project.description}
              </div>
            </div>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <div className="pt-8 space-y-5 border-t border-slate-200 dark:border-white/10">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  More Works
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {relatedProjects.map((rel) => (
                    <Link
                      key={rel.id || rel.title}
                      to={`/projects/${rel.id}`}
                      className="group p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 hover:border-cyan-500/40 transition-all space-y-2"
                    >
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors line-clamp-1">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {rel.description}
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
