import React from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import * as Data from "../../data/portfolioData";

type ProjectShowcaseCardProps = {
  project: Data.ProjectHighlight;
};

function ProjectShowcaseCard({ project }: ProjectShowcaseCardProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(40);

  const smoothRotateX = useSpring(rotateX, { stiffness: 130, damping: 18, mass: 0.3 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 130, damping: 18, mass: 0.3 });
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, rgba(34,211,238,0.22), transparent 45%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const py = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    rotateX.set(-py * 8);
    rotateY.set(px * 10);
    glowX.set((px + 1) * 50);
    glowY.set((py + 1) * 50);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(40);
  };

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      style={{ rotateX: smoothRotateX, rotateY: smoothRotateY, transformStyle: "preserve-3d" }}
      className="cursor-pointer group relative aspect-[16/10] rounded-[8px] overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur-md mx-auto [perspective:1200px]"
    >
      <motion.div style={{ background: glow }} className="absolute inset-0 z-[1]" />
      <div className="absolute inset-0 p-2">
        <img
          src={project.image}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-[8px]"
          alt={project.title}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
    </motion.div>
  );
}

type SelectedWorksProps = {
  projects: Data.ProjectHighlight[];
};

export default function SelectedWorks({ projects }: SelectedWorksProps) {
  return (
    <section className="space-y-12 overflow-visible">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h2 className="text-4xl font-black tracking-tighter uppercase">Selected Works</h2>
          <div className="h-1 w-12 bg-cyan-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {projects.map((project) => (
          <article key={project.id} className="rounded-[8px] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
            <ProjectShowcaseCard project={project} />
            <div className="p-6 md:p-8 space-y-4">
              <div className="space-y-2">
                <span className="text-cyan-400 text-xs font-mono tracking-[0.25em] uppercase">{project.year}</span>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight">{project.title}</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">{project.description}</p>
              <p className="text-sm text-slate-400">{project.stack}</p>
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[8px] bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-4 py-2 transition-colors"
                >
                  Visit Website <ArrowUpRight size={18} />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-[8px] bg-slate-700/60 text-slate-300 font-semibold px-4 py-2 cursor-not-allowed">
                  Website Not Available
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
