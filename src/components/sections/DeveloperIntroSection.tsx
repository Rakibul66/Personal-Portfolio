import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Sparkles, Mic, ExternalLink } from "lucide-react";
import { ShowcaseVideoData } from "../../services/api";
import { extractYoutubeId } from "./ShowcaseSection";

import "swiper/css";
import "swiper/css/pagination";

interface DeveloperIntroSectionProps {
  videos: ShowcaseVideoData[];
}

export default function DeveloperIntroSection({ videos }: DeveloperIntroSectionProps) {
  if (!videos || videos.length === 0) return null;

  // Single video: render elegant full-width player
  if (videos.length === 1) {
    const video = videos[0];
    const videoSrc = video.youtubeUrl || video.videoFile;
    if (!videoSrc) return null;
    const ytId = extractYoutubeId(videoSrc);

    return (
      <section id="developer-intro" className="space-y-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-white/10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              <Mic size={16} />
              <span>Developer Video Introduction</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {video.title || "Meet the Developer & Engineering Overview"}
            </h2>
            {video.description && (
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
                {video.description}
              </p>
            )}
          </div>
          {video.category && (
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 self-start sm:self-auto">
              {video.category}
            </span>
          )}
        </div>

        {/* Full-width player */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 bg-black shadow-2xl">
          {ytId ? (
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
              title={video.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={videoSrc}
              controls
              className="w-full h-full object-contain"
              poster={video.thumbnail}
            />
          )}
        </div>
      </section>
    );
  }

  // Multiple videos: slider with dots indicators
  return (
    <section id="developer-intro" className="space-y-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-white/10">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            <Mic size={16} />
            <span>Developer Video Introductions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Developer Speech & Video Walkthroughs
          </h2>
        </div>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true, dynamicBullets: true }}
        spaceBetween={24}
        slidesPerView={1}
        className="rounded-3xl overflow-hidden pb-12"
      >
        {videos.map((video, idx) => {
          const videoSrc = video.youtubeUrl || video.videoFile;
          if (!videoSrc) return null;
          const ytId = extractYoutubeId(videoSrc);

          return (
            <SwiperSlide key={video.id || idx}>
              <div className="space-y-3">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 bg-black shadow-2xl">
                  {ytId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
                      title={video.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={videoSrc}
                      controls
                      className="w-full h-full object-contain"
                      poster={video.thumbnail}
                    />
                  )}
                </div>
                <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{video.title}</h3>
                    {video.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{video.description}</p>
                    )}
                  </div>
                  {video.category && (
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                      {video.category}
                    </span>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
