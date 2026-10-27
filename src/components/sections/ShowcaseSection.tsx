import React, { useState } from "react";
import { Play, ChevronLeft, ChevronRight, Video, Sparkles, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { ShowcaseVideoData } from "../../services/api";

type ShowcaseSectionProps = {
  videos: ShowcaseVideoData[];
};

export function extractYoutubeId(urlOrId?: string): string {
  if (!urlOrId) return "";
  const trimmed = urlOrId.trim();
  if (trimmed.length === 11 && !trimmed.includes("/") && !trimmed.includes(".")) return trimmed;

  // Handles:
  // - youtube.com/shorts/tCY2M49NiCM
  // - youtube.com/watch?v=tCY2M49NiCM
  // - youtu.be/tCY2M49NiCM
  // - youtube.com/embed/tCY2M49NiCM
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : trimmed;
}

export default function ShowcaseSection({ videos }: ShowcaseSectionProps) {
  const [activeMedia, setActiveMedia] = useState<{
    type: "youtube" | "video";
    src: string;
    title: string;
  } | null>(null);

  if (!videos || videos.length === 0) return null;

  return (
    <section id="showcase" className="section-shell space-y-6 py-6 sm:py-8">
      <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <Video size={20} className="text-cyan-400 shrink-0" />
          <h2 className="display-title text-2xl sm:text-3xl font-black tracking-tight text-white">
            Launch Archive & Video Demos
          </h2>
        </div>

        <div className="flex gap-2">
          <button className="v-prev flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 hover:border-cyan-400/40 hover:text-cyan-300 text-white transition-all shadow-md z-20">
            <ChevronLeft size={16} />
          </button>
          <button className="v-next flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 hover:border-cyan-400/40 hover:text-cyan-300 text-white transition-all shadow-md z-20">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={24}
        loop={videos.length > 2}
        navigation={{ prevEl: ".v-prev", nextEl: ".v-next" }}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1.1 },
          768: { slidesPerView: 2.2 },
          1280: { slidesPerView: 3.2 },
        }}
      >
        {videos.map((item) => {
          const ytId = extractYoutubeId(item.youtubeUrl);
          const thumb =
            item.thumbnail ||
            (ytId
              ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
              : "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80");

          return (
            <SwiperSlide key={item.id || item.title}>
              <div
                onClick={() => {
                  if (item.videoFile) {
                    setActiveMedia({
                      type: "video",
                      src: item.videoFile,
                      title: item.title,
                    });
                  } else if (ytId) {
                    setActiveMedia({
                      type: "youtube",
                      src: ytId,
                      title: item.title,
                    });
                  }
                }}
                className="cursor-pointer group relative aspect-video overflow-hidden rounded-3xl border border-slate-800 bg-[#0d1322]/80 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-1"
              >
                <img
                  src={thumb}
                  className="w-full h-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
                  alt={item.title}
                  loading="lazy"
                />
                
                {/* Play Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-2xl border border-white/20 bg-slate-950/70 text-cyan-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all shadow-xl backdrop-blur-sm">
                    <Play fill="currentColor" size={24} className="ml-1" />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-[#080d1a]/40 to-transparent" />

                <div className="absolute bottom-0 inset-x-0 p-6 space-y-1">
                  {item.category && (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-full inline-block mb-1">
                      {item.category}
                    </span>
                  )}
                  <h4 className="display-title text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-xs text-slate-300 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Video Modal Player (Supports both YouTube embed & uploaded MP4 videos) */}
      {activeMedia && (
        <div
          className="fixed inset-0 z-[120] bg-black/95 flex items-center justify-center p-4 backdrop-blur-2xl animate-fade-in"
          onClick={() => setActiveMedia(null)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-900/80 text-white hover:bg-white hover:text-black transition-colors"
            >
              <X size={20} />
            </button>

            {activeMedia.type === "youtube" ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeMedia.src}?autoplay=1&rel=0`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={activeMedia.title}
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
