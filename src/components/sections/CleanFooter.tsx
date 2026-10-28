import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { ProfileData } from "../../services/api";

type CleanFooterProps = {
  profile?: ProfileData | null;
};

export default function CleanFooter({ profile }: CleanFooterProps) {
  const currentYear = new Date().getFullYear();

  // If no profile was added, do not render hardcoded footer
  if (!profile || !profile.name) {
    return (
      <footer className="mt-20 border-t border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-slate-950/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>© {currentYear}. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link to="/projects" className="hover:text-cyan-500 transition-colors">Projects</Link>
            <Link to="/ventures" className="hover:text-cyan-500 transition-colors">Ventures</Link>
            <Link to="/blog" className="hover:text-cyan-500 transition-colors">Articles</Link>
            <Link to="/contact" className="hover:text-cyan-500 transition-colors">Contact</Link>
            <Link to="/admin" className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline">Admin Studio</Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-20 border-t border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-slate-950/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-200/80 dark:border-white/5">
          <div className="space-y-2">
            <Link to="/" className="text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              {profile.name}
            </Link>
            {profile.title && (
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                {profile.title}
              </p>
            )}
            {profile.location && (
              <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 pt-1">
                <MapPin size={13} className="text-cyan-500" />
                <span>{profile.location}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-cyan-500 hover:border-cyan-500/30 transition-all shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
            )}
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-cyan-500 hover:border-cyan-500/30 transition-all shadow-sm"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-cyan-500 hover:border-cyan-500/30 transition-all shadow-sm"
                aria-label="Email Me"
              >
                <Mail size={18} />
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © {currentYear} {profile.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/projects" className="hover:text-cyan-500 transition-colors">Projects</Link>
            <Link to="/ventures" className="hover:text-cyan-500 transition-colors">Ventures</Link>
            <Link to="/blog" className="hover:text-cyan-500 transition-colors">Articles</Link>
            <Link to="/contact" className="hover:text-cyan-500 transition-colors">Contact</Link>
            <Link to="/admin" className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline">Admin Studio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
