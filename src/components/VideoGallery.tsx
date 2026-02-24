import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, MonitorPlay } from "lucide-react";
import * as Data from "../data/portfolioData";
import { GlassCard } from "./PortfolioUI";

export const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<Data.Video | null>(null);

  return (
    <section className="space-y-12">
      <div className="flex items-center gap-4">
        <MonitorPlay className="text-cyan-400" size={32} />
        <h2 className="text-4xl font-black tracking-tighter uppercase">Motion Archive</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Data.videos.map((video, i) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            onClick={() => setSelectedVideo(video)}
            className="cursor-pointer group"
          >
            <GlassCard className="h-full border-white/5 group-hover:border-cyan-500/50">
              <div className="relative aspect-video overflow-hidden">
                <img src={Data.getThumbnail(video.youtubeId)} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-cyan-500 p-3 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                    <Play fill="white" size={24} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">{video.title}</h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 uppercase tracking-widest leading-relaxed">{video.description}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-[#020617]/95 backdrop-blur-2xl"
          >
            <button onClick={() => setSelectedVideo(null)} className="absolute top-8 right-8 text-white hover:text-cyan-400 p-2 z-[110]">
              <X size={40} />
            </button>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-6xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <iframe src={Data.getEmbedUrl(selectedVideo.youtubeId)} title={selectedVideo.title} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};