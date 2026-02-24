import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Cpu, Layout } from "lucide-react";
import * as Data from "../data/portfolioData";

// --- IMPORTANT: LINKED EXPORTS ---

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * CORE COMPONENT: GlassCard
 * Explicitly exported for VideoGallery and App
 */
export const GlassCard = ({ children, className = "" }: GlassCardProps) => (
  <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-cyan-500/30 ${className}`}>
    {children}
  </div>
);

export const AnimatedCounter = ({ value }: { value: string | number }) => {
  const numericValue = typeof value === 'string' ? parseInt(value.replace(/\D/g, '')) : value;
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = numericValue / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [numericValue]);

  return (
    <span>
      {count}
      {typeof value === 'string' && value.includes('+') ? '+' : ''}
    </span>
  );
};

export const ProjectModal = ({ 
  project, 
  onClose 
}: { 
  project: Data.ProjectHighlight | null; 
  onClose: () => void; 
}) => {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-[#020617]/95 backdrop-blur-2xl"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white/5 border border-white/10 rounded-[2.5rem] shadow-2xl no-scrollbar"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-20">
              <X size={24} />
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-full min-h-[400px]">
                <img src={project.image} className="absolute inset-0 w-full h-full object-cover" alt={project.title} />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#020617]/20" />
              </div>
              <div className="p-8 lg:p-12 space-y-8 bg-[#020617]/40">
                <div>
                  <span className="text-cyan-500 font-mono text-sm tracking-[0.3em] uppercase">{project.year} Architecture</span>
                  <h2 className="text-4xl lg:text-5xl font-black tracking-tighter mt-2">{project.title}</h2>
                </div>
                <p className="text-slate-400 text-lg leading-relaxed">{project.description}</p>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400"><Cpu size={20} /></div>
                    <div>
                      <h4 className="font-bold text-white">Logic Layer</h4>
                      <p className="text-sm text-slate-500">Optimized high-concurrency architecture.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Layout size={20} /></div>
                    <div>
                      <h4 className="font-bold text-white">Interface Design</h4>
                      <p className="text-sm text-slate-500">Adaptive spatial UI response.</p>
                    </div>
                  </div>
                </div>
                <div className="pt-6">
                  <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
                    Live Transmission <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};