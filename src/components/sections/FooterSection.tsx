import React from "react";
import { Button } from "../ui/button";
import * as Data from "../../data/portfolioData";

type FooterSectionProps = {
  contacts: Data.ContactMethod[];
};

export default function FooterSection({ contacts }: FooterSectionProps) {
  return (
    <footer className="section-shell px-0 py-8 md:py-10 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-6">
        <span className="eyebrow">Contact</span>
        <h2 className="display-title text-4xl md:text-6xl font-extrabold tracking-[-0.05em] text-white">
          Open for
          <br />
          <span className="text-cyan-300">focused product work.</span>
        </h2>
        <p className="max-w-xl text-slate-400 text-base md:text-lg leading-7">
          Mobile applications, frontend systems, and practical product engineering with a cleaner, more direct delivery style.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => window.open("https://www.fiverr.com/s/42y1wyl", "_blank")} className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-none px-8 h-12">Hire on Fiverr</Button>
          <Button onClick={() => window.open("https://codecanyon.net/user/apptionary/portfolio", "_blank")} variant="outline" className="border-white/10 rounded-none px-8 h-12 bg-transparent hover:bg-white/5">Buy Scripts</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
        {contacts.map((method, i) => (
          <a key={i} href={method.href} target="_blank" rel="noreferrer" className="group section-divider flex flex-col py-5 transition-colors hover:text-cyan-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-cyan-300 transition-colors group-hover:text-cyan-200"><method.icon size={18} /></div>
              <span className="font-bold text-sm uppercase tracking-wider">{method.label}</span>
            </div>
            <span className="text-slate-500 font-mono text-xs truncate">{method.info}</span>
          </a>
        ))}
      </div>
    </footer>
  );
}
