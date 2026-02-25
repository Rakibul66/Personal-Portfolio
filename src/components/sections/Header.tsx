import React from "react";
import * as Data from "../../data/portfolioData";

type HeaderProps = {
  brandName: string;
  links: Data.ContactMethod[];
};

export default function Header({ brandName, links }: HeaderProps) {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-xl font-black tracking-tighter uppercase">
          {brandName.split(".")[0]}<span className="text-cyan-500">.{brandName.split(".")[1]}</span>
        </span>
        <div className="flex gap-5">
          {links.slice(0, 4).map((link, i) => (
            <a key={i} href={link.href} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-all hover:scale-110">
              <link.icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
