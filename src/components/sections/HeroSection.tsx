import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Play, MapPin, Sparkles, Eye } from "lucide-react";
import { ProfileData } from "../../services/api";

interface HeroSectionProps {
  profile: ProfileData | null;
  hasVideo?: boolean;
  onOpenVideo?: () => void;
  onOpenHireDialog: () => void;
}

export default function HeroSection({ profile, hasVideo = false, onOpenVideo, onOpenHireDialog }: HeroSectionProps) {
  const [visitorCount] = useState<number>(() => {
    const saved = localStorage.getItem("rakibul_visits");
    if (saved) return parseInt(saved, 10);
    return 1718;
  });

  if (!profile) return null;

  return (
    <section className="relative pt-6 sm:pt-10 pb-8 sm:pb-12">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Bio, Badges, Title, Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Status badge & location */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for High-Impact Roles & Research
            </span>
            {profile.location && (
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <MapPin size={13} className="text-cyan-500" />
                {profile.location}
              </span>
            )}
          </div>

          {/* Main Title & Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              {profile.name}
            </h1>
            {profile.title && (
              <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-300 dark:via-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
                {profile.title}
              </p>
            )}
            {profile.headline && (
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {profile.headline}
              </p>
            )}
          </div>

          {/* Action CTAs: Download CV & Watch Video Intro & Hire */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            {profile.resumeUrl ? (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#944a38] to-[#2d5d54] hover:from-[#a8543f] hover:to-[#366f64] shadow-lg shadow-black/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download size={18} className="transition-transform group-hover:-translate-y-0.5" />
                <span>Download CV</span>
              </a>
            ) : null}

            {/* Video Intro Button - Only if a video demo or intro exists */}
            {hasVideo && (
              <button
                type="button"
                onClick={onOpenVideo}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border border-slate-300 dark:border-white/15 bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-100 hover:border-cyan-500/50 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/10 transition-all shadow-sm backdrop-blur-md"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300">
                  <Play size={12} fill="currentColor" className="ml-0.5" />
                </span>
                <span>Watch Video Intro</span>
              </button>
            )}

            {/* Direct Hire / Collaboration */}
            <button
              type="button"
              onClick={onOpenHireDialog}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
            >
              <Sparkles size={16} />
              <span>Hire Me</span>
            </button>
          </div>
        </motion.div>

        {/* Right Column: High Quality Self Portrait & Visitor Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5 flex flex-col items-center lg:items-end gap-6"
        >
          {/* Main Portrait Card - Only render photo container if avatarUrl is provided */}
          {profile.avatarUrl ? (
            <div className="relative group w-full max-w-sm">
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-cyan-500 to-indigo-500 opacity-30 blur-lg group-hover:opacity-50 transition duration-500" />

              <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-900 shadow-2xl">
                <div className="aspect-[4/4.5] w-full overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-950">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-4 sm:p-5 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{profile.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{profile.title}</p>
                  </div>
                  {hasVideo && (
                    <button
                      type="button"
                      onClick={onOpenVideo}
                      aria-label="Play video introduction"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 text-white shadow-md hover:bg-cyan-600 transition-all hover:scale-110"
                    >
                      <Play size={14} fill="currentColor" className="ml-0.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : null}

          {/* Total Visitors Card */}
          <div className="w-full max-w-sm rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 p-5 shadow-lg backdrop-blur-md flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <Eye size={14} className="text-cyan-500" />
                <span>Homepage Visitors</span>
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {visitorCount.toLocaleString()}
              </div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">
                Total Visits
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20">
                <Sparkles size={11} />
                Live
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
