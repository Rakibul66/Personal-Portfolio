import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Linkedin, Facebook, Twitter, Globe, Mail, Sparkles } from "lucide-react";
import { ProfileData } from "../../services/api";

type HeaderProps = {
  brandName?: string;
  profile?: ProfileData | null;
};

export default function Header({ brandName = "RAKIBUL.H", profile }: HeaderProps) {
  const parts = brandName.includes(".") ? brandName.split(".") : [brandName, "DEV"];
  const location = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Projects", path: "/projects" },
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
    <header className="fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
        <div className="glass-panel rounded-[24px] border border-white/10 px-5 sm:px-7 py-3.5 flex justify-between items-center backdrop-blur-2xl bg-slate-950/80 shadow-2xl">
          {/* Logo Brand */}
          <Link to="/" className="display-title text-lg sm:text-xl font-black tracking-tight uppercase flex items-center gap-2">
            <span>
              {parts[0]}
              <span className="text-cyan-400">.{parts[1] || "DEV"}</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? "bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {finalLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300 shadow-sm"
                >
                  <Icon size={15} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden justify-center gap-1 mt-2.5 bg-slate-950/90 border border-white/10 rounded-2xl p-1.5 backdrop-blur-xl">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex-1 text-center py-2 rounded-xl text-[11px] font-bold transition-all ${
                  isActive
                    ? "bg-cyan-400 text-slate-950 font-extrabold shadow-sm"
                    : "text-slate-400 hover:text-white"
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
