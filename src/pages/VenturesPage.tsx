import React, { useState, useEffect } from "react";
import {
  Flame,
  Globe,
  ExternalLink,
  ArrowUpRight,
  TrendingUp,
  Building2,
  DollarSign,
  Layers,
  Sparkles,
} from "lucide-react";
import Header from "../components/sections/Header";
import CleanFooter from "../components/sections/CleanFooter";
import ParticleField from "../components/ParticleField";
import Pagination from "../components/ui/Pagination";
import { apiService, VentureData, ProfileData } from "../services/api";

const VENTURES_PER_PAGE = 6;

export default function VenturesPage() {
  const [ventures, setVentures] = useState<VentureData[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    Promise.all([apiService.getVentures(), apiService.getProfile()])
      .then(([vList, prof]) => {
        setVentures(vList);
        setProfile(prof);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(ventures.length / VENTURES_PER_PAGE);
  const paginatedVentures = ventures.slice(
    (currentPage - 1) * VENTURES_PER_PAGE,
    currentPage * VENTURES_PER_PAGE
  );

  return (
    <div className="relative min-h-screen text-slate-100 font-sans selection:bg-amber-500/30 overflow-x-hidden">
      <ParticleField />
      <Header brandName={profile?.name} profile={profile} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-20 space-y-12">
        {/* Page Hero Header */}
        <section className="space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-400/20 bg-amber-400/10 text-amber-300 text-xs font-mono font-bold">
            <Flame size={14} className="text-amber-400" />
            <span>Digital Assets & Income Ecosystem</span>
          </div>
          <h1 className="display-title text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-white">
            In-House Ventures &
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400">
              Proprietary SaaS Sites.
            </span>
          </h1>
          <p className="max-w-2xl text-slate-400 text-base md:text-lg leading-relaxed">
            Independent income engines, micro-SaaS platforms, and digital developer boilerplate products designed, bootstrapped, and scaled in-house.
          </p>
        </section>

        {loading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-mono text-slate-400">Loading ventures...</p>
          </div>
        ) : ventures.length === 0 ? (
          <div className="py-24 text-center bg-[#0d1322]/50 border border-slate-800/80 rounded-3xl p-8">
            <p className="text-base text-slate-400">No active ventures registered yet.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedVentures.map((venture) => (
                <article
                  key={venture.id || venture.title}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-800 bg-[#0d1322]/80 p-7 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/40 hover:-translate-y-1.5 shadow-2xl overflow-hidden"
                >
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/[0.05] rounded-full blur-2xl group-hover:bg-amber-500/[0.12] transition-colors" />

                  <div>
                    {venture.imageUrl ? (
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 mb-6">
                        <img
                          src={venture.imageUrl}
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
                      <p className="text-xs font-mono font-bold text-slate-400 mt-0.5">
                        {venture.tagline}
                      </p>
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

                    {venture.linkUrl && (
                      <a
                        href={venture.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-300 hover:text-amber-200 transition-colors"
                      >
                        {venture.linkText || "Visit Venture"} <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={ventures.length}
              itemsPerPage={VENTURES_PER_PAGE}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 350, behavior: "smooth" });
              }}
            />
          </>
        )}
      </main>

      <CleanFooter profile={profile} />
    </div>
  );
}
