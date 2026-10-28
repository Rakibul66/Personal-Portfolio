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
import HeroSection from "./components/sections/HeroSection";
import AcademicAndExperienceSection from "./components/sections/AcademicAndExperienceSection";
import SelectedWorks from "./components/sections/SelectedWorks";
import InHouseVenturesSection from "./components/sections/InHouseVenturesSection";
import ShowcaseSection from "./components/sections/ShowcaseSection";
import ClientReviewsSection from "./components/sections/ClientReviewsSection";
import VideoSection from "./components/sections/VideoSection";
import VideoIntroModal from "./components/sections/VideoIntroModal";
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
import {
  initialProfileData,
  initialProjectsData,
  initialShowcasesData,
  initialReviewsData,
} from "./data/initialFallbackData";
import { GlobalSyncIndicator } from "./components/ui/Loaders";

type HireDialogProps = {
  open: boolean;
  onClose: () => void;
};

function HireDialog({ open, onClose }: HireDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-2xl" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 28, scale: 0.98 }}
        transition={{ duration: 0.22 }}
        className="relative w-full max-w-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          aria-label="Close hire options"
        >
          <X size={18} />
        </button>

        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Direct Collaboration</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Hire directly for mobile engineering, Flutter product architecture, telecommunications research, or full-stack delivery.
        </p>

        <div className="space-y-3">
          {Data.hireMarketplaces.map((marketplace) => {
            const Icon = marketplace.icon;
            const content = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-300">
                  <Icon size={19} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    {marketplace.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">{marketplace.info}</span>
                </span>
                {marketplace.href ? <ExternalLink size={16} className="text-cyan-500" /> : null}
              </>
            );

            if (!marketplace.href) {
              return (
                <div
                  key={marketplace.label}
                  className="flex items-center gap-4 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-4 rounded-2xl opacity-60"
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
                className="flex items-center gap-4 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-4 rounded-2xl transition-all hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
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

export default function App() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isHireDialogOpen, setIsHireDialogOpen] = useState(false);

  // Dynamic Live Database States initialized with high-speed instant fallback data
  const [liveProjects, setLiveProjects] = useState<ProjectData[]>(initialProjectsData);
  const [liveExperiences, setLiveExperiences] = useState<ExperienceData[]>([]);
  const [liveProfile, setLiveProfile] = useState<ProfileData>(initialProfileData);
  const [liveShowcases, setLiveShowcases] = useState<ShowcaseVideoData[]>(initialShowcasesData);
  const [liveReviews, setLiveReviews] = useState<ReferenceData[]>(initialReviewsData);
  const [isSyncing, setIsSyncing] = useState<boolean>(true);

  useEffect(() => {
    let completed = 0;
    const checkDone = () => {
      completed++;
      if (completed >= 5) setIsSyncing(false);
    };

    // Parallel background fetch from cloud PostgreSQL with automatic cache resolution
    apiService.getProjects().then((data) => {
      if (data && data.length > 0) setLiveProjects(data);
      checkDone();
    });
    apiService.getExperiences().then((data) => {
      if (data && data.length > 0) setLiveExperiences(data);
      checkDone();
    });
    apiService.getProfile().then((data) => {
      if (data) setLiveProfile(data);
      checkDone();
    });
    apiService.getShowcase().then((data) => {
      if (data && data.length > 0) setLiveShowcases(data);
      checkDone();
    });
    apiService.getReferences().then((data) => {
      if (data && data.length > 0) setLiveReviews(data);
      checkDone();
    });
  }, []);

  return (
    <div className="relative min-h-screen text-slate-800 dark:text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <GlobalSyncIndicator isSyncing={isSyncing} />
      <ParticleField />
      <Header brandName={liveProfile?.name || Data.portfolioConfig.name} profile={liveProfile} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 md:pt-28 pb-16 space-y-16 md:space-y-24">
        {/* Modern Professional Hero Section with Self Image, CV CTA, and Live Visitors */}
        <HeroSection
          profile={liveProfile}
          onOpenVideo={() => setIsVideoModalOpen(true)}
          onOpenHireDialog={() => setIsHireDialogOpen(true)}
        />

        {/* Dynamic PostgreSQL Selected Works Section */}
        <SelectedWorks projects={liveProjects} />

        {/* Professional Experience, Academic Journey & Travel Grants (matching user uploaded designs) */}
        <AcademicAndExperienceSection liveExperiences={liveExperiences} />

        {/* Dynamic In-House Ventures & Income Sites Section */}
        <InHouseVenturesSection />

        {/* Dynamic Project Showcase (Launch Archive) Section from PostgreSQL */}
        {liveShowcases.length > 0 ? (
          <ShowcaseSection videos={liveShowcases} />
        ) : (
          <VideoSection videos={Data.videos} onOpenVideo={() => setIsVideoModalOpen(true)} />
        )}

        {/* Dynamic Client Reviews & Testimonials Section */}
        <ClientReviewsSection reviews={liveReviews} />

        {/* Dynamic Tech Blog Section */}
        <BlogSection />
      </main>

      {/* Clean Bottom Footer */}
      <CleanFooter profile={liveProfile} />

      {/* Dedicated Video Introduction Modal */}
      <VideoIntroModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={liveShowcases[0]?.youtubeUrl || "https://www.youtube.com/watch?v=AgC_Wq7aWYU"}
        name={liveProfile?.name}
      />

      {/* Direct Collaboration Modal */}
      <HireDialog open={isHireDialogOpen} onClose={() => setIsHireDialogOpen(false)} />
    </div>
  );
}
