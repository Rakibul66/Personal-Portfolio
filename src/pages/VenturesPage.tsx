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
import { apiService, VentureData, ProfileData, resolveMediaUrl } from "../services/api";

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
        if (vList && Array.isArray(vList)) setVentures(vList);
        if (prof) setProfile(prof);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(ventures.length / VENTURES_PER_PAGE);
  const paginatedVentures = ventures.slice(
    (currentPage - 1) * VENTURES_PER_PAGE,
    currentPage * VENTURES_PER_PAGE
  );

  return (
    <div className="relative min-h-screen text-slate-800 dark:text-slate-100 font-sans selection:bg-amber-500/30 overflow-x-hidden">
      <ParticleField />
      <Header brandName={profile?.name} profile={profile} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-20 space-y-12">
        {/* Page Hero Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Flame size={14} />
            <span>Commercial In-House Products & Platforms</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            Ventures & Income Sites
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Self-funded SaaS applications, digital marketplaces, and active recurring monetization projects.
          </p>
        </div>

        {/* Empty State */}
        {!loading && ventures.length === 0 && (
          <div className="text-center py-20 border border-dashed border-slate-300 dark:border-white/10 rounded-3xl p-8 bg-white/40 dark:bg-slate-900/40">
            <Flame size={40} className="mx-auto text-amber-400 mb-3" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No ventures registered yet</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              Add your digital products and recurring platforms from the Admin Studio.
            </p>
          </div>
        )}

        {/* Ventures Grid */}
        {!loading && ventures.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedVentures.map((venture) => (
              <article
                key={venture.id || venture.title}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322]/80 p-7 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/40 hover:-translate-y-1.5 shadow-lg dark:shadow-2xl overflow-hidden"
              >
                <div>
                  {venture.imageUrl && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 mb-6">
                      <img
                        src={resolveMediaUrl(venture.imageUrl)}
                        alt={venture.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      {venture.category || "Venture"}
                    </span>
                    {venture.revenue && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <TrendingUp size={12} />
                        {venture.revenue}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {venture.title}
                  </h3>
                  {venture.tagline && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                      {venture.tagline}
                    </p>
                  )}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5">
                    {venture.description}
                  </p>
                </div>

                <div className="pt-6">
                  <a
                    href={venture.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
                  >
                    <span>{venture.linkText || "Visit Venture"}</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {!loading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>

      <CleanFooter profile={profile} />
    </div>
  );
}
