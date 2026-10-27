import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Briefcase, ExternalLink, MapPin, X } from "lucide-react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import * as Data from "./data/portfolioData";
import ParticleField from "./components/ParticleField";
import Header from "./components/sections/Header";
import SelectedWorks from "./components/sections/SelectedWorks";
import InHouseVenturesSection from "./components/sections/InHouseVenturesSection";
import ShowcaseSection from "./components/sections/ShowcaseSection";
import ClientReviewsSection from "./components/sections/ClientReviewsSection";
import VideoSection from "./components/sections/VideoSection";
import CleanFooter from "./components/sections/CleanFooter";
import BlogSection from "./components/sections/BlogSection";
import {
  apiService,
  ProjectData,
  ExperienceData,
  ProfileData,
  ShowcaseVideoData,
  ReferenceData,
} from "./services/api";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

type ExperienceStripProps = {
  items: ExperienceData[];
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

        <h3 className="display-title text-2xl font-bold text-white mb-2">Direct Collaboration</h3>
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          Hire directly for mobile engineering, Flutter product architecture, or backend delivery.
        </p>

        <div className="space-y-3">
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
  if (!items || items.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 border border-white/5 bg-white/[0.01]">
        No experience entries found. Add your experience in the Admin Dashboard.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex min-w-full gap-4 md:gap-5">
        {items.map((exp, index) => (
          <motion.div
            key={exp.id || `${exp.company}-${index}`}
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
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">{exp.period}</div>
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

  // Dynamic Live Database States
  const [liveProjects, setLiveProjects] = useState<ProjectData[]>([]);
  const [liveExperiences, setLiveExperiences] = useState<ExperienceData[]>([]);
  const [liveProfile, setLiveProfile] = useState<ProfileData | null>(null);
  const [liveShowcases, setLiveShowcases] = useState<ShowcaseVideoData[]>([]);
  const [liveReviews, setLiveReviews] = useState<ReferenceData[]>([]);

  useEffect(() => {
    // Fetch live projects, experience, showcase videos, reviews, and profile directly from PostgreSQL
    apiService.getProjects().then((data) => {
      if (data && data.length > 0) setLiveProjects(data);
    });
    apiService.getExperiences().then((data) => {
      if (data && data.length > 0) setLiveExperiences(data);
    });
    apiService.getProfile().then((data) => {
      if (data) setLiveProfile(data);
    });
    apiService.getShowcase().then((data) => {
      if (data && data.length > 0) setLiveShowcases(data);
    });
    apiService.getReferences().then((data) => {
      if (data && data.length > 0) setLiveReviews(data);
    });
  }, []);

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
      <Header brandName={liveProfile?.name || Data.portfolioConfig.name} profile={liveProfile} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 md:pt-28 pb-16 space-y-16 md:space-y-20">
        {/* Hero Section with Live Profile Data */}
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
              {liveProfile?.name || Data.portfolioConfig.fullName}
              <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-500">
                {liveProfile?.title || Data.portfolioConfig.title}
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-xl leading-relaxed">
              {liveProfile?.headline || "Mobile and web product engineering with clear systems and reliable execution."}
            </p>
          </div>
        </motion.section>

        {/* Dynamic PostgreSQL Selected Works Section */}
        <SelectedWorks projects={liveProjects} />

        {/* Dynamic In-House Ventures & Income Sites Section */}
        <InHouseVenturesSection />

        {/* Experience Section */}
        <motion.section initial="hidden" whileInView="visible" variants={sectionVariants} viewport={{ once: true }} className="section-shell">
          <div className="mb-8 space-y-2">
            <span className="eyebrow">Career & Roles</span>
            <h2 className="display-title text-3xl md:text-5xl font-extrabold tracking-[-0.05em]">Work Experience</h2>
          </div>
          <div>
            <ExperienceStrip items={liveExperiences.length > 0 ? liveExperiences : (Data.officeExperience as any)} />
          </div>
        </motion.section>

        {/* Dynamic Project Showcase (Launch Archive) Section from PostgreSQL */}
        {liveShowcases.length > 0 ? (
          <ShowcaseSection videos={liveShowcases} />
        ) : (
          <VideoSection videos={Data.videos} onOpenVideo={setActiveVideo} />
        )}

        {/* Dynamic Client Reviews & Testimonials Section */}
        <ClientReviewsSection reviews={liveReviews} />

        {/* Dynamic Tech Blog Section */}
        <BlogSection />
      </main>

      {/* Clean Bottom Footer */}
      <CleanFooter profile={liveProfile} />

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
