import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { Badge } from "./components/ui/badge";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import * as Data from "./data/portfolioData";
import { GlassCard, AnimatedCounter, ProjectModal } from "./components/PortfolioUI";
import ParticleField from "./components/ParticleField";
import Header from "./components/sections/Header";
import SelectedWorks from "./components/sections/SelectedWorks";
import VideoSection from "./components/sections/VideoSection";
import FooterSection from "./components/sections/FooterSection";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function App() {
  const [activeProject, setActiveProject] = useState<Data.ProjectHighlight | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <ParticleField />
      <Header brandName={Data.portfolioConfig.name} links={Data.contactMethods} />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 space-y-36">
        <motion.section initial="hidden" whileInView="visible" variants={sectionVariants} viewport={{ once: true }}>
          <Badge className="mb-6 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-4 py-1">
            <Zap size={12} className="mr-2 inline" /> {Data.portfolioConfig.tagline}
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-5">
            {Data.portfolioConfig.fullName.split(" ")[0]}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">{Data.portfolioConfig.title}</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mb-12">{Data.portfolioConfig.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Data.heroStats.map((stat, i) => (
              <GlassCard key={i} className="p-8">
                <div className="text-4xl font-bold text-white mb-2">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-cyan-500 mb-2">{stat.label}</div>
                <div className="text-sm text-slate-300">{stat.detail}</div>
              </GlassCard>
            ))}
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" variants={sectionVariants} viewport={{ once: true }} className="space-y-10">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tighter uppercase">Core Capabilities</h2>
            <div className="h-1 w-12 bg-cyan-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Data.skillGroups.map((group) => (
              <GlassCard key={group.title} className="p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-[8px] bg-cyan-500/10 text-cyan-400">
                    <group.icon size={18} />
                  </div>
                  <h3 className="text-lg font-bold">{group.title}</h3>
                </div>
                <p className="text-sm text-slate-400 mb-4">{group.description}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="px-2.5 py-1 rounded-[8px] bg-white/5 border border-white/10 text-xs text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.section>

        <SelectedWorks projects={Data.projectHighlights} onOpenProject={setActiveProject} />

        <motion.section initial="hidden" whileInView="visible" variants={sectionVariants} viewport={{ once: true }} className="space-y-10">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tighter uppercase">Experience Timeline</h2>
            <div className="h-1 w-12 bg-cyan-500" />
          </div>
          <div className="space-y-4">
            {Data.experienceTimeline.map((exp) => (
              <GlassCard key={`${exp.company}-${exp.duration}`} className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                  <h3 className="text-2xl font-bold text-white">{exp.company}</h3>
                  <span className="text-xs uppercase tracking-[0.2em] text-cyan-400">{exp.duration}</span>
                </div>
                <p className="text-cyan-200 font-semibold mb-2">{exp.role}</p>
                <p className="text-slate-400">{exp.description}</p>
              </GlassCard>
            ))}
          </div>
        </motion.section>

        <VideoSection videos={Data.videos} onOpenVideo={setActiveVideo} />
        <FooterSection contacts={Data.contactMethods} />
      </main>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />

      {activeVideo && (
        <div className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl" onClick={() => setActiveVideo(null)}>
          <div className="relative w-full max-w-5xl aspect-video rounded-[8px] overflow-hidden border border-white/10 shadow-2xl">
            <iframe src={Data.getEmbedUrl(activeVideo)} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
          </div>
        </div>
      )}
    </div>
  );
}
