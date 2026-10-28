import React from "react";
import { Video, ExternalLink, Sparkles } from "lucide-react";
import { ShowcaseVideoData } from "../../services/api";
import { extractYoutubeId } from "./ShowcaseSection";

interface FullWidthVideoSectionProps {
  videos: ShowcaseVideoData[];
}

export default function FullWidthVideoSection({ videos }: FullWidthVideoSectionProps) {
  if (!videos || videos.length === 0) return null;

  // Use the primary or latest showcase video input from admin panel
  const primaryVideo = videos[0];
  const videoSrc = primaryVideo.youtubeUrl || primaryVideo.videoFile;
  if (!videoSrc) return null;

  const ytId = extractYoutubeId(videoSrc);

  return (
    <section id="featured-video" className="section-shell space-y-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-white/10">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            <Video size={16} />
            <span>Featured Video Presentation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {primaryVideo.title || "Product Engineering & Video Walkthrough"}
          </h2>
          {primaryVideo.description && (
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
              {primaryVideo.description}
            </p>
          )}
        </div>

        {primaryVideo.category && (
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 self-start sm:self-auto">
            {primaryVideo.category}
          </span>
        )}
      </div>

      {/* Full-Width Video Player Container */}
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 bg-black shadow-2xl">
        {ytId ? (
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
            title={primaryVideo.title || "Video presentation"}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            src={videoSrc}
            controls
            className="w-full h-full object-contain"
            poster={primaryVideo.thumbnail}
          />
        )}
      </div>
    </section>
  );
}
