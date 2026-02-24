import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Zap, ArrowRight, Cpu, Mail, Briefcase, ChevronLeft, ChevronRight, Play } from "lucide-react";

// --- Swiper ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import * as Data from "./data/portfolioData";
import { GlassCard, AnimatedCounter, ProjectModal } from "./components/PortfolioUI";
import ParticleField from "./components/ParticleField";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function App() {
  const [activeProject, setActiveProject] = useState<Data.ProjectHighlight | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      <ParticleField />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-black tracking-tighter uppercase">
            {Data.portfolioConfig.name.split('.')[0]}<span className="text-cyan-500">.{Data.portfolioConfig.name.split('.')[1]}</span>
          </span>
          <div className="flex gap-5">
            {Data.contactMethods?.slice(0, 4).map((link, i) => (
              <a key={i} href={link.href} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-all hover:scale-110">
                <link.icon size={18}/>
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 space-y-48">
        
        {/* Hero */}
        <motion.section initial="hidden" whileInView="visible" variants={sectionVariants} viewport={{ once: true }}>
          <Badge className="mb-6 bg-cyan-500/10 text-cyan-400 border-cyan-500/20 px-4 py-1">
            <Zap size={12} className="mr-2" /> {Data.portfolioConfig.tagline}
          </Badge>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-8">
            DIGITAL<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">ARCHITECT</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mb-12">{Data.portfolioConfig.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Data.heroStats?.map((stat, i) => (
              <GlassCard key={i} className="p-8">
                <div className="text-4xl font-bold text-white mb-2"><AnimatedCounter value={stat.value} /></div>
                <div className="text-xs font-black uppercase tracking-widest text-cyan-500 mb-2">{stat.label}</div>
                <div className="text-sm text-slate-400">{stat.detail}</div>
              </GlassCard>
            ))}
          </div>
        </motion.section>

        {/* Project Carousel - Cinema Wide */}
        <section className="space-y-12 overflow-visible">
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tighter uppercase">Selected Works</h2>
              <div className="h-1 w-12 bg-cyan-500" />
            </div>
            <div className="flex gap-3">
                <button className="p-prev p-3 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500 transition-all z-20"><ChevronLeft size={20}/></button>
                <button className="p-next p-3 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500 transition-all z-20"><ChevronRight size={20}/></button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow]}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            coverflowEffect={{ rotate: 0, stretch: -20, depth: 150, modifier: 1.5, slideShadows: false }}
            navigation={{ prevEl: '.p-prev', nextEl: '.p-next' }}
            autoplay={{ delay: 4000 }}
            breakpoints={{ 320: { slidesPerView: 1.1 }, 1024: { slidesPerView: 1.8 } }}
          >
            {Data.projectHighlights?.map((project) => (
              <SwiperSlide key={project.id}>
                <motion.div
                  onClick={() => setActiveProject(project)}
                  className="cursor-pointer group relative aspect-[16/10] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-md mx-auto"
                >
                  <div className="absolute inset-0 p-4 md:p-8">
                    <img src={project.image} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" alt={project.title} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end">
                    <div className="text-left">
                      <span className="text-cyan-500 font-mono text-[10px] tracking-[0.3em] uppercase">{project.stack}</span>
                      <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/10 border border-white/10 group-hover:bg-cyan-500 transition-all"><ArrowRight size={24}/></div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Video Carousel */}
        <section className="space-y-12">
          <div className="flex justify-between items-end">
            <h2 className="text-4xl font-black tracking-tighter uppercase">Process Transmission</h2>
            <div className="flex gap-3">
                <button className="v-prev p-3 rounded-full bg-white/5 border border-white/10 hover:bg-red-500 transition-all z-20"><ChevronLeft size={20}/></button>
                <button className="v-next p-3 rounded-full bg-white/5 border border-white/10 hover:bg-red-500 transition-all z-20"><ChevronRight size={20}/></button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={30}
            loop={true}
            navigation={{ prevEl: '.v-prev', nextEl: '.v-next' }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{ 320: { slidesPerView: 1.2 }, 768: { slidesPerView: 2.5 }, 1280: { slidesPerView: 3.5 } }}
          >
            {Data.videos?.map((video) => (
              <SwiperSlide key={video.id}>
                <div onClick={() => setActiveVideo(video.youtubeId)} className="cursor-pointer group relative aspect-video rounded-3xl overflow-hidden border border-white/5 bg-slate-900/60">
                  <img src={Data.getThumbnail(video.youtubeId)} className="w-full h-full object-cover opacity-70 transition-transform group-hover:scale-110" alt={video.title} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-red-600/90 flex items-center justify-center group-hover:scale-110 transition-transform"><Play fill="white" size={28} className="ml-1 text-white" /></div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black to-transparent">
                    <h4 className="font-bold text-white">{video.title}</h4>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Footer */}
        <footer className="pt-20 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h2 className="text-6xl font-black tracking-tighter uppercase text-white">Let's build<br /><span className="text-cyan-500">Together.</span></h2>
              <div className="flex gap-4">
                  <Button onClick={() => window.open('https://www.fiverr.com/s/42y1wyl', '_blank')} className="bg-green-600 hover:bg-green-500 text-white font-bold rounded-full px-8 h-12">Hire on Fiverr</Button>
                  <Button onClick={() => window.open('https://codecanyon.net/user/apptionary/portfolio', '_blank')} variant="outline" className="border-white/10 rounded-full px-8 h-12">Buy Scripts</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Data.contactMethods?.map((method, i) => (
                <a key={i} href={method.href} target="_blank" rel="noreferrer" className="group flex flex-col p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors"><method.icon size={18} /></div>
                    <span className="font-bold text-sm uppercase tracking-wider">{method.label}</span>
                  </div>
                  <span className="text-slate-500 font-mono text-xs truncate">{method.info}</span>
                </a>
              ))}
            </div>
        </footer>
      </main>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      
      {activeVideo && (
        <div className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl" onClick={() => setActiveVideo(null)}>
          <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe src={Data.getEmbedUrl(activeVideo)} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
          </div>
        </div>
      )}
    </div>
  );
}