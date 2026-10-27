import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Send, MessageSquare, CheckCircle2 } from "lucide-react";
import Header from "../components/sections/Header";
import CleanFooter from "../components/sections/CleanFooter";
import ParticleField from "../components/ParticleField";
import ContactForm from "../components/sections/ContactForm";
import { apiService, ProfileData } from "../services/api";

export default function ContactPage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    apiService.getProfile().then((data) => setProfile(data));
  }, []);

  const email = profile?.email || "contact@rakibulhr.dev";
  const location = profile?.location || "Dhaka, Bangladesh";
  const phone = profile?.phone || "+880 1700-000000";

  return (
    <div className="relative min-h-screen text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <ParticleField />
      <Header brandName={profile?.name} profile={profile} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-20 space-y-16">
        {/* Page Hero */}
        <section className="space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-xs font-mono font-bold">
            <MessageSquare size={13} />
            <span>Initiate Direct Collaboration</span>
          </div>
          <h1 className="display-title text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-white">
            Let's Engineer Something
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500">
              Reliable, Fast & Scalable.
            </span>
          </h1>
          <p className="max-w-2xl text-slate-400 text-base md:text-lg leading-relaxed">
            Available for principal mobile architecture, full-stack Flutter contracts, SaaS technical advisory, and high-impact build work.
          </p>
        </section>

        {/* Contact Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href={`mailto:${email}`}
            className="group p-8 rounded-3xl bg-[#0d1322]/80 border border-slate-800 backdrop-blur-xl hover:border-cyan-400/40 hover:-translate-y-1 transition-all shadow-xl space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
              <Mail size={22} />
            </div>
            <h3 className="text-lg font-black text-white">Email Inquiries</h3>
            <p className="text-xs text-slate-400">Direct inbox with 24-hour turnaround</p>
            <p className="text-sm font-mono font-bold text-cyan-300 pt-2 truncate">{email}</p>
          </a>

          <a
            href={profile?.linkedinUrl || "https://linkedin.com/in/rakibul-hasan-roxy"}
            target="_blank"
            rel="noreferrer"
            className="group p-8 rounded-3xl bg-[#0d1322]/80 border border-slate-800 backdrop-blur-xl hover:border-cyan-400/40 hover:-translate-y-1 transition-all shadow-xl space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-300 group-hover:scale-110 transition-transform">
              <Linkedin size={22} />
            </div>
            <h3 className="text-lg font-black text-white">Professional Network</h3>
            <p className="text-xs text-slate-400">Connect for long-term contract roles</p>
            <p className="text-sm font-mono font-bold text-sky-300 pt-2">LinkedIn Profile</p>
          </a>

          <div className="p-8 rounded-3xl bg-[#0d1322]/80 border border-slate-800 backdrop-blur-xl shadow-xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-300">
              <MapPin size={22} />
            </div>
            <h3 className="text-lg font-black text-white">Global Delivery Hub</h3>
            <p className="text-xs text-slate-400">Remote asynchronous & synchronous overlap</p>
            <p className="text-sm font-mono font-bold text-emerald-300 pt-2">{location}</p>
          </div>
        </div>

        {/* Dedicated Message Form Card */}
        <div className="bg-[#0d1322]/90 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-2xl">
          <div className="max-w-2xl mb-8 space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              Direct Message Channel
            </span>
            <h2 className="text-3xl font-black text-white">Send A Project Proposal</h2>
            <p className="text-sm text-slate-400">
              Fill out the details below and your brief will be saved directly into the studio database and forwarded immediately.
            </p>
          </div>

          <ContactForm />
        </div>
      </main>

      <CleanFooter profile={profile} />
    </div>
  );
}
