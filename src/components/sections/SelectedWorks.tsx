import React from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import * as Data from "../../data/portfolioData";

type ProjectShowcaseCardProps = {
  project: Data.ProjectHighlight;
  onOpen: (project: Data.ProjectHighlight) => void;
};

function ProjectShowcaseCard({ project, onOpen }: ProjectShowcaseCardProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(40);

  const smoothRotateX = useSpring(rotateX, { stiffness: 130, damping: 18, mass: 0.3 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 130, damping: 18, mass: 0.3 });
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, rgba(34,211,238,0.22), transparent 45%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const py = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    rotateX.set(-py * 8);
    rotateY.set(px * 10);
    glowX.set((px + 1) * 50);
    glowY.set((py + 1) * 50);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(40);
  };

  return (
    <motion.div
      onClick={() => onOpen(project)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      style={{ rotateX: smoothRotateX, rotateY: smoothRotateY, transformStyle: "preserve-3d" }}
      className="cursor-pointer group relative aspect-[16/10] rounded-[8px] overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur-md mx-auto [perspective:1200px]"
    >
      <motion.div style={{ background: glow }} className="absolute inset-0 z-[1]" />
      <div className="absolute inset-0 p-2">
        <img
          src={project.image}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-[8px]"
          alt={project.title}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
      <div className="absolute bottom-3 right-3">
        <div className="p-3 rounded-[8px] bg-black/40 border border-white/15 group-hover:bg-cyan-500 transition-all shrink-0">
          <ArrowRight size={24} />
        </div>
      </div>
    </motion.div>
  );
}

type SelectedWorksProps = {
  projects: Data.ProjectHighlight[];
  onOpenProject: (project: Data.ProjectHighlight) => void;
};

export default function SelectedWorks({ projects, onOpenProject }: SelectedWorksProps) {
  return (
    <section className="space-y-12 overflow-visible">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h2 className="text-4xl font-black tracking-tighter uppercase">Selected Works</h2>
          <div className="h-1 w-12 bg-cyan-500" />
        </div>
        <div className="flex gap-3">
          <button className="p-prev p-3 rounded-[8px] bg-white/5 border border-white/10 hover:bg-cyan-500 transition-all z-20"><ChevronLeft size={20} /></button>
          <button className="p-next p-3 rounded-[8px] bg-white/5 border border-white/10 hover:bg-cyan-500 transition-all z-20"><ChevronRight size={20} /></button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay, EffectCoverflow]}
        effect={"coverflow"}
        grabCursor
        centeredSlides
        loop
        navigation={{ prevEl: ".p-prev", nextEl: ".p-next" }}
        autoplay={{ delay: 4200, disableOnInteraction: false }}
        coverflowEffect={{ rotate: 0, stretch: -20, depth: 160, modifier: 1.6, slideShadows: false }}
        breakpoints={{ 320: { slidesPerView: 1.08 }, 1024: { slidesPerView: 1.8 } }}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <ProjectShowcaseCard project={project} onOpen={onOpenProject} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
