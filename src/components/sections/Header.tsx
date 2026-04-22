import React from "react";
import * as Data from "../../data/portfolioData";

type HeaderProps = {
  brandName: string;
  links: Data.ContactMethod[];
};

export default function Header({ brandName, links }: HeaderProps) {
  return (
    <nav className="fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
        <div className="glass-panel rounded-[22px] border border-white/10 px-5 py-4 flex justify-between items-center">
          <span className="display-title text-lg sm:text-xl font-black tracking-tight uppercase">
            {brandName.split(".")[0]}<span className="text-cyan-400">.{brandName.split(".")[1]}</span>
        </span>
          <div className="flex gap-3 sm:gap-4">
            {links.slice(0, 4).map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:-translate-y-0.5 hover:border-cyan-400/30 hover:text-cyan-300"
              >
                <link.icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
