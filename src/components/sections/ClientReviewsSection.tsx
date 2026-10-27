import React, { useState } from "react";
import {
  Star,
  Quote,
  MessageSquare,
  Play,
  User,
  X,
  Building,
  CheckCircle2,
} from "lucide-react";
import { ReferenceData } from "../../services/api";
import { extractYoutubeId } from "./ShowcaseSection";

interface ClientReviewsSectionProps {
  reviews: ReferenceData[];
}

export default function ClientReviewsSection({ reviews }: ClientReviewsSectionProps) {
  const [activeVideo, setActiveVideo] = useState<{
    src: string;
    isYoutube: boolean;
    name: string;
  } | null>(null);

  if (!reviews || reviews.length === 0) return null;

  return (
    <section id="reviews" className="section-shell px-0 py-6 sm:py-8 space-y-6">
      <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <MessageSquare size={20} className="text-cyan-400 shrink-0" />
          <h2 className="display-title text-2xl sm:text-3xl font-black tracking-tight text-white">
            Client Reviews & Testimonials
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev, idx) => {
          const hasVideo = !!rev.videoUrl;
          const ytId = hasVideo ? extractYoutubeId(rev.videoUrl) : "";
          const isYt = !!ytId && (rev.videoType === "YOUTUBE" || rev.videoUrl?.includes("youtu"));

          return (
            <article
              key={rev.id || idx}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-800 bg-[#0d1322]/80 p-7 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-cyan-400/40 hover:-translate-y-1 overflow-hidden"
            >
              <div className="space-y-5">
                {/* Header with Avatar and Rating */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {rev.avatarUrl ? (
                      <img
                        src={rev.avatarUrl}
                        alt={rev.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-700 bg-slate-900"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300 font-black text-sm">
                        {rev.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4 className="font-extrabold text-white text-base leading-tight">
                        {rev.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {rev.role} {rev.company ? `• ${rev.company}` : ""}
                      </p>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>

                {/* Optional Video Review Teaser Card */}
                {hasVideo && (
                  <div
                    onClick={() => {
                      if (rev.videoUrl) {
                        setActiveVideo({
                          src: rev.videoUrl,
                          isYoutube: isYt,
                          name: rev.name,
                        });
                      }
                    }}
                    className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 cursor-pointer group/video"
                  >
                    {isYt ? (
                      <img
                        src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                        alt="Video review"
                        className="w-full h-full object-cover opacity-70 group-hover/video:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-900">
                        <User className="text-slate-600" size={32} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg group-hover/video:scale-110 transition-transform">
                        <Play fill="currentColor" size={20} className="ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 text-[10px] font-mono font-bold text-cyan-300 backdrop-blur-md">
                      Watch Video Review
                    </span>
                  </div>
                )}

                {/* Text Testimonial */}
                <div className="relative">
                  <Quote size={20} className="text-slate-700 mb-2 opacity-50" />
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed italic">
                    "{rev.feedback || "Exceptional mobile architecture and execution. High reliability and professional delivery on all fronts."}"
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 font-bold">
                  <CheckCircle2 size={13} /> Verified Client
                </span>
                {rev.email && (
                  <span className="text-[10px] font-mono text-slate-500">
                    {rev.email}
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Review Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[120] bg-black/95 flex items-center justify-center p-4 backdrop-blur-2xl animate-fade-in"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-900/80 text-white hover:bg-white hover:text-black transition-colors"
            >
              <X size={20} />
            </button>

            {activeVideo.isYoutube ? (
              <iframe
                src={`https://www.youtube.com/embed/${extractYoutubeId(
                  activeVideo.src
                )}?autoplay=1`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={`${activeVideo.name} review`}
              />
            ) : (
              <video
                src={activeVideo.src}
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
