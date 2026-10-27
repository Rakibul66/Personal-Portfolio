import React from "react";
import { Link } from "react-router-dom";
import { ProfileData } from "../../services/api";

type CleanFooterProps = {
  profile?: ProfileData | null;
};

export default function CleanFooter({ profile }: CleanFooterProps) {
  const currentYear = new Date().getFullYear();
  const name = profile?.name || "MD. Rakibul Hasan";

  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#060a14]/60 backdrop-blur-xl py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <p>© {currentYear} {name}. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link to="/projects" className="hover:text-cyan-400 transition-colors">
            Projects
          </Link>
          <Link to="/blog" className="hover:text-cyan-400 transition-colors">
            Articles
          </Link>
          <Link to="/contact" className="hover:text-cyan-400 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
