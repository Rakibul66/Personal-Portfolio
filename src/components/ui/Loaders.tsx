import React from "react";
import { Loader2 } from "lucide-react";

export function SectionSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-3xl border border-slate-800/80 bg-[#0d1322]/60 overflow-hidden p-6 space-y-4"
        >
          <div className="aspect-[16/10] w-full rounded-2xl bg-slate-800/50" />
          <div className="h-5 w-2/3 rounded-lg bg-slate-800/70" />
          <div className="h-3 w-full rounded bg-slate-800/40" />
          <div className="h-3 w-4/5 rounded bg-slate-800/40" />
          <div className="flex gap-2 pt-2">
            <div className="h-6 w-16 rounded bg-slate-800/60" />
            <div className="h-6 w-16 rounded bg-slate-800/60" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function GlobalSyncIndicator({ isSyncing }: { isSyncing: boolean }) {
  if (!isSyncing) return null;
  return (
    <div className="fixed top-20 right-6 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono shadow-2xl backdrop-blur-md animate-fade-in">
      <Loader2 size={13} className="animate-spin text-cyan-400" />
      <span>Syncing live cloud data...</span>
    </div>
  );
}
