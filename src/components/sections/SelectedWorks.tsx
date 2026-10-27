import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, FolderGit2, ArrowRight, ExternalLink } from "lucide-react";
import { ProjectData, resolveMediaUrl } from "../../services/api";

type SelectedWorksProps = {
  projects: ProjectData[];
};

export default function SelectedWorks({ projects }: SelectedWorksProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="section-shell px-0 py-6 sm:py-8">
      <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <FolderGit2 size={20} className="text-cyan-400 shrink-0" />
          <h2 className="display-title text-2xl sm:text-3xl font-black tracking-tight text-white">
            Selected Works & Projects
          </h2>
        </div>

        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors shrink-0"
        >
          View Archive ({projects.length}) <ArrowRight size={14} />
        </Link>
      </div>

      {/* Grid Layout (3 Columns on Large, 2 on Medium, 1 on Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.slice(0, 6).map((project, index) => {
          const coverImg =
            resolveMediaUrl(project.imageUrl) ||
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80";

          return (
            <article
              key={project.id || project.title}
              className="group flex flex-col justify-between rounded-3xl border border-slate-800 bg-[#0d1322]/80 overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-1.5 shadow-2xl"
            >
              <div>
                {/* Image Cover */}
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

                {/* Content */}
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

                  {/* Stack Badges */}
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

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-slate-800/60 mt-4 flex items-center justify-between">
                <div className="flex gap-2.5 pt-4">
                  {project.playStoreUrl && (
                    <a
                      href={project.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      Play Store <ExternalLink size={12} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      Source <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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
    </section>
  );
}
