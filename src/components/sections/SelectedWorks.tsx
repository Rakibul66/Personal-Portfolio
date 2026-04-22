import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import * as Data from "../../data/portfolioData";

type ProjectShowcaseCardProps = {
  project: Data.ProjectHighlight;
  reverse?: boolean;
};

function StoreLinks({ project }: { project: Data.ProjectHighlight }) {
  if (project.links?.length) {
    return (
      <div className="flex flex-wrap gap-3">
        {project.links.map((link) => {
          const className =
            link.variant === "primary"
              ? "inline-flex items-center gap-2 rounded-[14px] bg-cyan-400 px-4 py-2 text-slate-950 font-bold transition-transform hover:scale-[1.02]"
              : link.variant === "accent"
                ? "inline-flex items-center gap-2 rounded-[14px] border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-100 font-semibold transition-colors hover:bg-cyan-400/[0.15]"
                : "inline-flex items-center gap-2 rounded-[14px] border border-white/[0.15] bg-white/[0.06] px-4 py-2 text-white font-semibold transition-colors hover:bg-white/10";

          return (
            <a
              key={`${project.id}-${link.label}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {link.label} <ArrowUpRight size={17} />
            </a>
          );
        })}
      </div>
    );
  }

  if (!project.url && !project.iosUrl && !project.androidUrl) {
    return (
      <span className="inline-flex items-center gap-2 rounded-[14px] bg-slate-700/60 text-slate-300 font-semibold px-4 py-2 cursor-not-allowed">
        Link Not Available
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-[14px] bg-cyan-400 px-4 py-2 text-slate-950 font-bold transition-transform hover:scale-[1.02]"
        >
          Visit Website <ArrowUpRight size={17} />
        </a>
      ) : null}
      {project.iosUrl ? (
        <a
          href={project.iosUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-[14px] border border-white/[0.15] bg-white/[0.06] px-4 py-2 text-white font-semibold transition-colors hover:bg-white/10"
        >
          App Store <ArrowUpRight size={17} />
        </a>
      ) : null}
      {project.androidUrl ? (
        <a
          href={project.androidUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-[14px] border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-100 font-semibold transition-colors hover:bg-cyan-400/[0.15]"
        >
          Google Play <ArrowUpRight size={17} />
        </a>
      ) : null}
    </div>
  );
}

function ProjectShowcaseCard({ project, reverse = false }: ProjectShowcaseCardProps) {
  const frameAlignment = reverse ? "lg:order-2" : "";
  const contentAlignment = reverse ? "lg:order-1" : "";
  const cardRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [18, -18]);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="section-divider py-10 md:py-14"
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className={`relative plain-surface min-h-[280px] overflow-hidden ${frameAlignment}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.06),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.7, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-[560px] pt-4 md:pt-8"
          >
            <div className="overflow-hidden border border-white/[0.08] bg-slate-950/70 shadow-[0_16px_40px_rgba(2,8,23,0.28)]">
              <img
                src={project.image}
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                alt={project.title}
                loading="lazy"
                decoding="async"
              />
            </div>

            {project.secondaryImage ? (
              <motion.div
                style={{ y: phoneY }}
                initial={{ opacity: 0, x: reverse ? -28 : 28, y: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.18, duration: 0.65 }}
                className={`absolute -bottom-2 ${reverse ? "left-0 sm:left-2" : "right-0 sm:right-2"} w-24 sm:w-28 md:w-32 overflow-hidden border border-cyan-300/20 bg-slate-950/85 shadow-xl`}
              >
                <img
                  src={project.secondaryImage}
                  className="aspect-[9/16] w-full object-cover"
                  alt={`${project.title} mobile preview`}
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            ) : null}
          </motion.div>
        </div>

        <div className={`p-2 sm:p-3 ${contentAlignment}`}>
          <div className="mb-4 flex items-center gap-3">
            <span className="eyebrow !mb-0">{project.year}</span>
          </div>
          <h3 className="display-title text-3xl md:text-4xl font-extrabold tracking-[-0.05em] text-white mb-4">
            {project.title}
          </h3>
          <p className="text-slate-300 leading-7 text-base md:text-lg mb-5">{project.description}</p>
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/90 mb-7">{project.stack}</p>
          <StoreLinks project={project} />
        </div>
      </div>
    </motion.article>
  );
}

type SelectedWorksProps = {
  projects: Data.ProjectHighlight[];
};

export default function SelectedWorks({ projects }: SelectedWorksProps) {
  return (
    <section id="selected-works" className="section-shell space-y-10">
      <div className="space-y-2">
        <span className="eyebrow">Portfolio</span>
        <h2 className="display-title text-3xl md:text-5xl font-extrabold tracking-[-0.05em]">
          Selected Missions
        </h2>
      </div>

      <div className="space-y-0">
        {projects.map((project, index) => (
          <ProjectShowcaseCard key={project.id} project={project} reverse={index % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
