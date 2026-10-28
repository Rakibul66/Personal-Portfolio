import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, MapPin, Sparkles } from "lucide-react";
import { ProfileData, resolveMediaUrl } from "../../services/api";

interface HeroSectionProps {
  profile: ProfileData | null;
  onOpenHireDialog?: () => void;
}

export default function HeroSection({ profile, onOpenHireDialog }: HeroSectionProps) {
  if (!profile) return null;

  return (
    <section className="relative pt-6 sm:pt-10 pb-8 sm:pb-12 space-y-10">
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
          {/* Location badge */}
          {profile.location && (
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300">
                <MapPin size={13} className="text-cyan-500" />
                {profile.location}
              </span>
            </div>
          )}

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

          {/* Action CTAs: Download CV Button */}
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
            ) : (
              <a
                href={profile.githubUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#944a38] to-[#2d5d54] hover:from-[#a8543f] hover:to-[#366f64] shadow-lg shadow-black/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download size={18} className="transition-transform group-hover:-translate-y-0.5" />
                <span>Download CV</span>
              </a>
            )}

            {/* Direct Collaboration Option / WhatsApp Link */}
            {profile.whatsapp ? (
              <a
                href={profile.whatsapp.startsWith("http") ? profile.whatsapp : `https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles size={16} />
                <span>Hire Me (WhatsApp)</span>
              </a>
            ) : onOpenHireDialog ? (
              <button
                type="button"
                onClick={onOpenHireDialog}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
              >
                <Sparkles size={16} />
                <span>Work With Me</span>
              </button>
            ) : null}
          </div>
        </motion.div>

        {/* Right Column: High Quality Self Portrait (if uploaded) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5 flex flex-col items-center lg:items-end gap-6"
        >
          {profile.avatarUrl ? (
            <div className="relative group w-full max-w-sm">
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-cyan-500 to-indigo-500 opacity-30 blur-lg group-hover:opacity-50 transition duration-500" />

              <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-900 shadow-2xl">
                <div className="aspect-[4/4.5] w-full overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-950">
                  <img
                    src={resolveMediaUrl(profile.avatarUrl)}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-4 sm:p-5 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{profile.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{profile.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
