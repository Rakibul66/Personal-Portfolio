import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Flame, Globe, ExternalLink, Sparkles, Building2, TrendingUp, DollarSign, ArrowRight } from "lucide-react";
import { apiService, VentureData, resolveMediaUrl } from "../../services/api";

export default function InHouseVenturesSection() {
  const [ventures, setVentures] = useState<VentureData[]>([]);

  useEffect(() => {
    apiService.getVentures().then((data) => {
      if (data && data.length > 0) setVentures(data);
    });
  }, []);

  if (ventures.length === 0) return null;

  return (
    <section id="in-house" className="section-shell px-0 py-6 sm:py-8">
      <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <Flame size={20} className="text-amber-400 shrink-0" />
          <h2 className="display-title text-2xl sm:text-3xl font-black tracking-tight text-white">
            In-House Ventures & Income Sites
          </h2>
        </div>

        <Link
          to="/ventures"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors shrink-0"
        >
          View All ({ventures.length}) <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ventures.slice(0, 3).map((venture, index) => {
          return (
            <article
              key={venture.id || venture.title}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-800 bg-[#0d1322]/80 p-7 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/40 hover:-translate-y-1.5 shadow-2xl overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/[0.05] rounded-full blur-2xl group-hover:bg-amber-500/[0.12] transition-colors" />

              <div>
                {/* Venture Cover / Logo Preview */}
                {venture.imageUrl ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 mb-6">
                    <img
                      src={resolveMediaUrl(venture.imageUrl)}
                      alt={venture.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 mb-6 shadow-sm">
                    <Building2 size={22} />
                  </div>
                )}

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                    {venture.category || "In-House"}
                  </span>
                  {venture.status && (
                    <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {venture.status}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                  {venture.title}
                </h3>
                {venture.tagline && (
                  <p className="text-xs font-mono font-bold text-slate-400 mt-0.5">{venture.tagline}</p>
                )}

                <p className="mt-3 text-xs md:text-sm text-slate-300 leading-relaxed">
                  {venture.description}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-800 flex items-center justify-between">
                {venture.revenue ? (
                  <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1">
                    <TrendingUp size={14} className="text-emerald-400" />
                    {venture.revenue}
                  </span>
                ) : (
                  <span className="text-xs font-mono text-slate-500">Live Operation</span>
                )}

                <a
                  href={venture.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all shadow-md shadow-amber-400/20"
                >
                  <span>{venture.linkText || "Visit Venture"}</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
