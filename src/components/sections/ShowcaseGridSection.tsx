import React, { useState } from "react";
import { Play, Video, ExternalLink, X } from "lucide-react";
import { ShowcaseVideoData } from "../../services/api";
import { extractYoutubeId } from "./ShowcaseSection";

interface ShowcaseGridSectionProps {
  videos: ShowcaseVideoData[];
}

export default function ShowcaseGridSection({ videos }: ShowcaseGridSectionProps) {
  const [activeMedia, setActiveMedia] = useState<{
    src: string;
    isYoutube: boolean;
    title: string;
  } | null>(null);

  if (!videos || videos.length === 0) return null;

  return (
    <section id="showcase-grid" className="section-shell space-y-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-white/10">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            <Video size={16} />
            <span>Project Video Demos</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Launch Archive & Demos
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            Live interactive demonstrations, app walkthroughs, and product screencasts.
          </p>
        </div>
      </div>

      {/* Grid of Videos (3 columns on large, 2 on medium, 1 on small) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((item, idx) => {
          const ytId = extractYoutubeId(item.youtubeUrl);
          const thumb =
            item.thumbnail ||
            (ytId
              ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
              : "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80");

          return (
            <article
              key={item.id || idx}
              onClick={() => {
                if (item.videoFile) {
                  setActiveMedia({
                    src: item.videoFile,
                    isYoutube: false,
                    title: item.title,
                  });
                } else if (ytId) {
                  setActiveMedia({
                    src: ytId,
                    isYoutube: true,
                    title: item.title,
                  });
                }
              }}
              className="group cursor-pointer rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322]/80 overflow-hidden backdrop-blur-xl shadow-lg dark:shadow-2xl transition-all duration-300 hover:border-cyan-500/50 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail with centered play badge */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <img
                    src={thumb}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                  {/* Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-13 h-13 rounded-2xl border border-white/20 bg-slate-950/70 text-cyan-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-xl backdrop-blur-sm">
                      <Play fill="currentColor" size={22} className="ml-1" />
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  {item.category && (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full inline-block">
                      {item.category}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs font-bold text-cyan-600 dark:text-cyan-400">
                <span>Watch Walkthrough</span>
                <Play size={12} fill="currentColor" />
              </div>
            </article>
          );
        })}
      </div>

      {/* Video Modal Player */}
      {activeMedia && (
        <div
          className="fixed inset-0 z-[120] bg-black/95 flex items-center justify-center p-4 backdrop-blur-2xl"
          onClick={() => setActiveMedia(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800"
            >
              <X size={18} />
            </button>

            {activeMedia.isYoutube ? (
              <iframe
                src={`https://www.youtube.com/embed/${activeMedia.src}?autoplay=1&rel=0&modestbranding=1`}
                title={activeMedia.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={activeMedia.src}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
