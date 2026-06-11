import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Briefcase, ExternalLink, MapPin, X } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import * as Data from "./data/portfolioData";
import ParticleField from "./components/ParticleField";
import Header from "./components/sections/Header";
import SelectedWorks from "./components/sections/SelectedWorks";
import VideoSection from "./components/sections/VideoSection";
import FooterSection from "./components/sections/FooterSection";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

type ExperienceStripProps = {
  items: Data.Experience[];
};

type HireDialogProps = {
  open: boolean;
  onClose: () => void;
};

function HireDialog({ open, onClose }: HireDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#020617]/95 p-4 backdrop-blur-2xl" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 28, scale: 0.98 }}
        transition={{ duration: 0.22 }}
        className="relative w-full max-w-xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close hire options"
        >
          <X size={18} />
        </button>

        <div className="pr-10">
          <span className="eyebrow">Passive Stream</span>
          <h2 className="display-title mt-3 text-3xl font-extrabold tracking-[-0.04em] text-white sm:text-4xl">
            Hire for Build Work
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Choose a marketplace to support or purchase ready build assets.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {Data.hireMarketplaces.map((marketplace) => {
            const Icon = marketplace.icon;
            const content = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                  <Icon size={19} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold uppercase tracking-[0.2em] text-white">
                    {marketplace.label}
                  </span>
                  <span className="mt-1 block text-sm text-slate-500">{marketplace.info}</span>
                </span>
                {marketplace.href ? <ExternalLink size={18} className="text-cyan-200" /> : null}
              </>
            );

            if (!marketplace.href) {
              return (
                <div
                  key={marketplace.label}
                  className="flex items-center gap-4 border border-white/10 bg-white/[0.02] p-4 opacity-60"
                  aria-disabled="true"
                >
                  {content}
                </div>
              );
            }

            return (
              <a
                key={marketplace.label}
                href={marketplace.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 border border-white/10 bg-white/[0.03] p-4 transition-all hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.06]"
              >
                {content}
              </a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

function ExperienceStrip({ items }: ExperienceStripProps) {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex min-w-full gap-4 md:gap-5">
        {items.map((exp, index) => (
          <motion.div
            key={`${exp.company}-${exp.duration}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="min-w-[280px] max-w-[320px] flex-1 border border-white/10 bg-white/[0.02] p-5 md:min-w-[320px] md:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 text-cyan-300">
                  <Briefcase size={16} />
                </span>
                <div>
                  <h3 className="display-title text-xl md:text-2xl font-bold tracking-tight text-white">{exp.role}</h3>
                  <p className="mt-1 text-sm md:text-base text-slate-200">{exp.company}</p>
                </div>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-500">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </span>
            </div>

            <div className="mt-5 space-y-3 pl-14">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">{exp.duration}</div>
              {exp.meta ? <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{exp.meta}</div> : null}
              {exp.location ? (
                <div className="inline-flex items-center gap-2 text-xs text-slate-400">
                  <MapPin size={13} className="text-cyan-300" />
                  {exp.location}
                </div>
              ) : null}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [experienceTab, setExperienceTab] = useState<"office" | "freelance">("office");
  const [isHireDialogOpen, setIsHireDialogOpen] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroGridY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroGlowY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroAccentY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <div className="relative min-h-screen text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <ParticleField />
      <Header brandName={Data.portfolioConfig.name} links={Data.contactMethods} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 md:pt-32 pb-20 space-y-28 md:space-y-36">
        <motion.section
          ref={heroRef}
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true }}
          className="relative section-shell overflow-hidden px-1 py-7 sm:py-8 lg:py-12"
        >
          <motion.div style={{ y: heroGridY }} className="hero-grid absolute inset-0 opacity-70" />
          <motion.div style={{ y: heroGlowY }} className="absolute -top-24 right-[-8%] h-64 w-64 rounded-full bg-cyan-400/[0.08] blur-3xl" />
          <motion.div style={{ y: heroAccentY }} className="absolute bottom-[-5rem] left-[8%] h-52 w-52 rounded-full bg-lime-300/[0.05] blur-3xl" />

          <div className="relative max-w-5xl">
            <h1 className="display-title text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-[-0.05em] leading-[0.95] mb-5">
              {Data.portfolioConfig.fullName}
              <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-500">
                {Data.portfolioConfig.title}
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-xl mb-8 leading-relaxed">
              Mobile and web product engineering with clear systems and reliable execution.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#selected-works"
                className="inline-flex items-center gap-2 rounded-[14px] bg-cyan-400 px-5 py-3 text-slate-950 font-bold transition-transform hover:scale-[1.02]"
              >
                Explore Projects <ArrowUpRight size={18} />
              </a>
              <button
                type="button"
                onClick={() => setIsHireDialogOpen(true)}
                className="inline-flex items-center gap-2 rounded-[14px] border border-white/[0.15] bg-white/5 px-5 py-3 text-white font-semibold transition-colors hover:bg-white/10"
              >
                Hire for Build Work <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" variants={sectionVariants} viewport={{ once: true }} className="section-shell">
          <div className="mb-8 space-y-2">
            <span className="eyebrow">Capabilities</span>
            <h2 className="display-title text-3xl md:text-5xl font-extrabold tracking-[-0.05em]">Systems And Operations</h2>
          </div>
          <a
            href={Data.affiliateBanner.href}
            target="_blank"
            rel="noreferrer"
            className="group relative flex min-h-20 w-full overflow-hidden border border-cyan-300/20 bg-slate-950/70 px-5 py-4 shadow-[0_18px_60px_rgba(2,8,23,0.32)] transition-all hover:-translate-y-0.5 hover:border-cyan-200/45 hover:bg-slate-900/80 md:h-20 md:items-center md:py-0"
          >
            <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(125,211,252,0.16),rgba(217,249,157,0.08)_45%,transparent_76%)] opacity-80 transition-opacity group-hover:opacity-100" />
            <div className="relative flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-5">
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-lime-200">
                  {Data.affiliateBanner.eyebrow}
                </span>
                <div className="mt-1 flex min-w-0 flex-col gap-1 md:flex-row md:items-baseline md:gap-3">
                  <h3 className="truncate text-base font-extrabold text-white sm:text-lg md:text-xl">
                    {Data.affiliateBanner.title}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {Data.affiliateBanner.detail}
                  </span>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-[14px] bg-cyan-300 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-950 transition-transform group-hover:scale-[1.02] md:self-auto">
                View Deal <ArrowUpRight size={16} />
              </span>
            </div>
          </a>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {Data.skillGroups.map((group) => (
              <div key={group.title} className="section-divider pt-6">
                <div className="flex items-center gap-3 mb-5 text-cyan-300">
                  <div>
                    <group.icon size={18} />
                  </div>
                  <h3 className="display-title text-xl font-bold tracking-tight">{group.title}</h3>
                </div>
                <p className="text-sm text-slate-400 mb-5 leading-6">{group.description}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="px-0 py-1 text-xs text-slate-300 mr-4">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <SelectedWorks projects={Data.projectHighlights} />

        <motion.section initial="hidden" whileInView="visible" variants={sectionVariants} viewport={{ once: true }} className="section-shell space-y-8">
          <div className="space-y-2">
            <span className="eyebrow">Experience</span>
            <h2 className="display-title text-3xl md:text-5xl font-extrabold tracking-[-0.05em]">Career Journey</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setExperienceTab("office")}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-[0.26em] transition-colors ${
                experienceTab === "office"
                  ? "border border-cyan-300 text-cyan-200"
                  : "border border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              Office
            </button>
            <button
              type="button"
              onClick={() => setExperienceTab("freelance")}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-[0.26em] transition-colors ${
                experienceTab === "freelance"
                  ? "border border-cyan-300 text-cyan-200"
                  : "border border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              Freelance
            </button>
          </div>
          <div>
            <ExperienceStrip items={experienceTab === "office" ? Data.officeExperience : Data.freelanceExperience} />
          </div>
        </motion.section>

        <VideoSection videos={Data.videos} onOpenVideo={setActiveVideo} />
        <FooterSection contacts={Data.contactMethods} />
      </main>

      {activeVideo && (
        <div className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl" onClick={() => setActiveVideo(null)}>
          <div className="relative w-full max-w-5xl aspect-video rounded-[8px] overflow-hidden border border-white/10 shadow-2xl">
            <iframe src={Data.getEmbedUrl(activeVideo)} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
          </div>
        </div>
      )}

      <HireDialog open={isHireDialogOpen} onClose={() => setIsHireDialogOpen(false)} />
    </div>
  );
}
