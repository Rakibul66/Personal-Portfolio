import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Linkedin, Mail, Sun, Moon, Sparkles } from "lucide-react";
import { ProfileData } from "../../services/api";
import { useTheme } from "../../context/ThemeContext";

type HeaderProps = {
  brandName?: string;
  profile?: ProfileData | null;
};

export default function Header({ brandName = "RAKIBUL.H", profile }: HeaderProps) {
  const parts = brandName.includes(".") ? brandName.split(".") : [brandName, "DEV"];
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Projects", path: "/projects" },
    { label: "Ventures", path: "/ventures" },
    { label: "Articles", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  const socialLinks = [];
  if (profile?.linkedinUrl) {
    socialLinks.push({ href: profile.linkedinUrl, icon: Linkedin, label: "LinkedIn" });
  }
  if (profile?.githubUrl) {
    socialLinks.push({ href: profile.githubUrl, icon: Github, label: "GitHub" });
  }
  if (profile?.email) {
    socialLinks.push({ href: `mailto:${profile.email}`, icon: Mail, label: "Email" });
  }

  const finalLinks =
    socialLinks.length > 0
      ? socialLinks
      : [
          { href: "https://linkedin.com/in/rakibul-hasan-roxy", icon: Linkedin, label: "LinkedIn" },
          { href: "https://github.com/Rakibul-Hasan-Roxy", icon: Github, label: "GitHub" },
        ];

  return (
    <header className="fixed top-0 w-full z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 sm:pt-4">
        <div className="rounded-[22px] border border-slate-200/80 dark:border-white/10 px-5 sm:px-6 py-3 flex justify-between items-center backdrop-blur-2xl bg-white/80 dark:bg-slate-950/80 shadow-lg dark:shadow-2xl">
          {/* Logo Brand with avatar thumbnail */}
          <Link to="/" className="display-title text-base sm:text-lg font-black tracking-tight uppercase flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-cyan-500/30 ring-2 ring-cyan-500/20 group-hover:ring-cyan-500/50 transition-all">
              <img
                src={profile?.avatarUrl || "https://avatars.githubusercontent.com/u/32368310?v=4"}
                alt="Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
            <span className="text-slate-900 dark:text-white">
              {parts[0]}
              <span className="text-cyan-500 dark:text-cyan-400">.{parts[1] || "DEV"}</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full px-2.5 py-1 backdrop-blur-md">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-cyan-500 text-white dark:bg-cyan-400 dark:text-slate-950 shadow-md shadow-cyan-500/20"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Controls: Theme Switcher & Social Links */}
          <div className="flex items-center gap-2">
            {/* Light / Dark Mode Switcher */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle light or dark theme"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 transition-all hover:scale-105 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-300 shadow-sm"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-indigo-600" />}
            </button>

            {/* Social Links */}
            <div className="hidden sm:flex items-center gap-1.5">
              {finalLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.label}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 transition-all hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-600 dark:hover:text-cyan-300 shadow-sm"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>

            {/* Admin link badge */}
            <Link
              to="/admin"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 hover:bg-cyan-500/20 transition-all"
            >
              <Sparkles size={13} />
              <span>Admin</span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden justify-center gap-1 mt-2 bg-white/90 dark:bg-slate-950/90 border border-slate-200 dark:border-white/10 rounded-2xl p-1.5 backdrop-blur-xl shadow-md">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex-1 text-center py-2 rounded-xl text-[11px] font-bold transition-all ${
                  isActive
                    ? "bg-cyan-500 text-white dark:bg-cyan-400 dark:text-slate-950 font-extrabold shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
