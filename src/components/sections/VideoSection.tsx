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
    <section className="space-y-12">
      <div className="flex justify-between items-end">
        <h2 className="text-4xl font-black tracking-tighter uppercase">Process Transmission</h2>
        <div className="flex gap-3">
          <button className="v-prev p-3 rounded-[8px] bg-white/5 border border-white/10 hover:bg-red-500 transition-all z-20"><ChevronLeft size={20} /></button>
          <button className="v-next p-3 rounded-[8px] bg-white/5 border border-white/10 hover:bg-red-500 transition-all z-20"><ChevronRight size={20} /></button>
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
            <div onClick={() => onOpenVideo(video.youtubeId)} className="cursor-pointer group relative aspect-video rounded-[8px] overflow-hidden border border-white/5 bg-slate-900/60">
              <img src={Data.getThumbnail(video.youtubeId)} className="w-full h-full object-cover opacity-70 transition-transform group-hover:scale-110" alt={video.title} loading="lazy" decoding="async" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-[8px] bg-red-600/90 flex items-center justify-center group-hover:scale-110 transition-transform"><Play fill="white" size={28} className="ml-1 text-white" /></div>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black to-transparent">
                <h4 className="font-bold text-white">{video.title}</h4>
                <p className="text-xs text-slate-300 mt-1">{video.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
