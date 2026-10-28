import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, Sparkles, MapPin } from "lucide-react";
import { ProfileData, apiService } from "../../services/api";

type CleanFooterProps = {
  profile?: ProfileData | null;
};

export default function CleanFooter({ profile }: CleanFooterProps) {
  const currentYear = new Date().getFullYear();
  const [visitorCount, setVisitorCount] = useState<number>(1718);

  useEffect(() => {
    // Record and fetch genuine database visitor count
    apiService.recordVisit().then((visits) => {
      if (visits) setVisitorCount(visits);
    });
  }, []);

  return (
    <footer className="mt-20 border-t border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-slate-950/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-200/80 dark:border-white/5">
          {/* Left: Identity info */}
          <div className="space-y-2">
            <Link to="/" className="text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              {profile?.name || "MD. RAKIBUL HASAN"}
            </Link>
            {profile?.title && (
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                {profile.title}
              </p>
            )}
            {profile?.location && (
              <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 pt-1">
                <MapPin size={13} className="text-cyan-500" />
                <span>{profile.location}</span>
              </div>
            )}
          </div>

          {/* Right: Live Verified Visitors Card */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-900/90 p-4 sm:p-5 shadow-lg backdrop-blur-md flex items-center gap-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              <Eye size={20} />
            </div>

            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <span>Homepage Visitors</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {visitorCount.toLocaleString()}
              </div>

              <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                Total Visits
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Nav Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © {currentYear} {profile?.name || "MD. Rakibul Hasan"}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/projects" className="hover:text-cyan-500 transition-colors">Projects</Link>
            <Link to="/ventures" className="hover:text-cyan-500 transition-colors">Ventures</Link>
            <Link to="/blog" className="hover:text-cyan-500 transition-colors">Articles</Link>
            <Link to="/contact" className="hover:text-cyan-500 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
