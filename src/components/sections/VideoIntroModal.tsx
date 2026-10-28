import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Video, ExternalLink, Sparkles, MonitorPlay } from "lucide-react";
import { extractYoutubeId } from "./ShowcaseSection";

interface VideoIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  name?: string;
}

export default function VideoIntroModal({
  isOpen,
  onClose,
  videoUrl = "https://www.youtube.com/watch?v=AgC_Wq7aWYU",
  name = "MD. Rakibul Hasan",
}: VideoIntroModalProps) {
  if (!isOpen) return null;

  const ytId = extractYoutubeId(videoUrl);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl rounded-3xl overflow-hidden border border-slate-700/60 bg-slate-900 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Video size={16} />
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                  Personal & Project Video Walkthrough
                </h3>
                <p className="text-xs text-slate-400">Featuring {name}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video w-full bg-black">
            {ytId ? (
              <iframe
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`}
                title="Video introduction"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {/* Footer Highlights */}
          <div className="p-4 sm:p-5 bg-slate-950/90 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 border-t border-slate-800/80">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Sparkles size={14} />
              Doctoral Researcher (QUB) & Senior Mobile Systems Architect
            </span>
            <div className="flex items-center gap-2">
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-white transition-colors"
              >
                <span>Open in YouTube</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
