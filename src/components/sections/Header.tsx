import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Linkedin, Mail, Sun, Moon, Sparkles } from "lucide-react";
import { ProfileData } from "../../services/api";
import { useTheme } from "../../context/ThemeContext";

type HeaderProps = {
  brandName?: string;
  profile?: ProfileData | null;
};

export default function Header({ brandName, profile }: HeaderProps) {
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

  // Derive display brand strictly from profile data
  const displayName = profile?.name || brandName || "";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 sm:h-20 flex justify-between items-center">
          {/* Left section intentionally kept blank */}
          <div className="w-10"></div>

          {/* Navigation Links - centered seamless on background */}
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

          {/* Controls: Admin-Added Social Links */}
          <div className="flex items-center gap-2">
            {/* Social Links from admin */}
            {socialLinks.length > 0 && (
              <div className="hidden sm:flex items-center gap-1.5">
                {socialLinks.map((link, i) => {
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
            )}
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden justify-center gap-1 pb-3 pt-1 border-t border-slate-200/60 dark:border-white/5">
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
