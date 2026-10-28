import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, ExternalLink, MapPin } from "lucide-react";
import { ExperienceData } from "../../services/api";

interface AcademicAndExperienceSectionProps {
  liveExperiences?: ExperienceData[];
}

export default function AcademicAndExperienceSection({
  liveExperiences = [],
}: AcademicAndExperienceSectionProps) {
  // Filter by type added from admin panel: "EXPERIENCE", "EDUCATION", "AWARD"
  const professionalExperiences = liveExperiences.filter(
    (exp) => !exp.type || exp.type === "EXPERIENCE" || exp.type === "FREELANCE"
  );
  const academicEducations = liveExperiences.filter((exp) => exp.type === "EDUCATION");

  // If nothing has been added by admin yet, do not render empty containers
  if (liveExperiences.length === 0) {
    return null;
  }

  return (
    <section id="experience-academic" className="space-y-16 py-4">
      {/* 1. Professional Experience Section (Only if admin added experiences) */}
      {professionalExperiences.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                <Briefcase size={15} />
                <span>Experience</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Professional experience
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {professionalExperiences.map((exp, idx) => (
              <motion.div
                key={exp.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 p-6 shadow-sm hover:shadow-md hover:border-cyan-500/40 transition-all backdrop-blur-md flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">
                      ROLE {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300">
                      {exp.period}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                      {exp.company}
                    </p>
                  </div>

                  {exp.details && exp.details.length > 0 && (
                    <ul className="space-y-1 pt-2">
                      {exp.details.map((detail, dIdx) => (
                        <li key={dIdx} className="text-xs text-slate-500 dark:text-slate-400">
                          • {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {exp.location && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={12} className="text-cyan-500" />
                      {exp.location}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Academic Journey Section (Only if admin added educations) */}
      {academicEducations.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                <GraduationCap size={15} />
                <span>Profile</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Academic journey
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Education
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {academicEducations.map((acad, idx) => (
              <motion.div
                key={acad.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 p-6 shadow-sm hover:shadow-md hover:border-cyan-500/40 transition-all backdrop-blur-md flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold text-xs border border-cyan-500/20">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {acad.period}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {acad.role}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {acad.company}
                    </p>
                  </div>
                </div>

                {acad.details && acad.details.length > 0 && (
                  <div className="mt-6 rounded-xl border border-amber-500/25 dark:border-amber-400/20 bg-amber-500/5 dark:bg-amber-400/5 p-3.5 space-y-1">
                    {acad.details.map((detail, dIdx) => (
                      <div key={dIdx} className="text-xs font-bold text-amber-700 dark:text-amber-300">
                        {detail}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
