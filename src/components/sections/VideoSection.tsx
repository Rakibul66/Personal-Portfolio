import React from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import * as Data from "../../data/portfolioData";

type VideoSectionProps = {
  videos: Data.Video[];
  onOpenVideo: (youtubeId: string) => void;
};

export default function VideoSection({ videos, onOpenVideo }: VideoSectionProps) {
  return (
    <section className="section-shell space-y-12">
      <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-end">
        <div className="space-y-2">
          <span className="eyebrow">Motion</span>
          <h2 className="display-title text-3xl md:text-5xl font-extrabold tracking-[-0.05em]">Launch Archive</h2>
        </div>
        <div className="flex gap-3">
          <button className="v-prev flex h-12 w-12 items-center justify-center border border-white/10 hover:border-cyan-400/30 transition-all z-20"><ChevronLeft size={20} /></button>
          <button className="v-next flex h-12 w-12 items-center justify-center border border-white/10 hover:border-cyan-400/30 transition-all z-20"><ChevronRight size={20} /></button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={30}
        loop
        navigation={{ prevEl: ".v-prev", nextEl: ".v-next" }}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{ 320: { slidesPerView: 1.2 }, 768: { slidesPerView: 2.5 }, 1280: { slidesPerView: 3.5 } }}
      >
        {videos.map((video) => (
          <SwiperSlide key={video.id}>
            <div onClick={() => onOpenVideo(video.youtubeId)} className="cursor-pointer group relative aspect-video overflow-hidden border border-white/[0.08] bg-slate-950/30">
              <img src={Data.getThumbnail(video.youtubeId)} className="w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-110" alt={video.title} loading="lazy" decoding="async" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border border-white/15 bg-black/30 text-cyan-200 flex items-center justify-center group-hover:scale-110 transition-transform"><Play fill="currentColor" size={28} className="ml-1" /></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-[#020611]/[0.15] to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6">
                <h4 className="display-title text-xl font-bold text-white">{video.title}</h4>
                <p className="text-sm text-slate-300 mt-2">{video.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
