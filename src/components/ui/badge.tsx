import React from "react";

export const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 rounded-full bg-gradient-to-br from-slate-500/40 to-slate-900 text-xs font-semibold uppercase tracking-[0.2em] text-slate-100">
    {children}
  </span>
);
