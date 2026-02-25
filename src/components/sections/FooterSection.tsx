import React from "react";
import { Button } from "../ui/button";
import * as Data from "../../data/portfolioData";

type FooterSectionProps = {
  contacts: Data.ContactMethod[];
};

export default function FooterSection({ contacts }: FooterSectionProps) {
  return (
    <footer className="pt-20 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-16">
      <div className="space-y-6">
        <h2 className="text-6xl font-black tracking-tighter uppercase text-white">Let&apos;s build<br /><span className="text-cyan-500">Together.</span></h2>
        <div className="flex gap-4">
          <Button onClick={() => window.open("https://www.fiverr.com/s/42y1wyl", "_blank")} className="bg-green-600 hover:bg-green-500 text-white font-bold rounded-[8px] px-8 h-12">Hire on Fiverr</Button>
          <Button onClick={() => window.open("https://codecanyon.net/user/apptionary/portfolio", "_blank")} variant="outline" className="border-white/10 rounded-[8px] px-8 h-12">Buy Scripts</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contacts.map((method, i) => (
          <a key={i} href={method.href} target="_blank" rel="noreferrer" className="group flex flex-col p-6 bg-white/5 rounded-[8px] border border-white/5 hover:bg-white/10 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-cyan-500/10 rounded-[8px] text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors"><method.icon size={18} /></div>
              <span className="font-bold text-sm uppercase tracking-wider">{method.label}</span>
            </div>
            <span className="text-slate-500 font-mono text-xs truncate">{method.info}</span>
          </a>
        ))}
      </div>
    </footer>
  );
}
