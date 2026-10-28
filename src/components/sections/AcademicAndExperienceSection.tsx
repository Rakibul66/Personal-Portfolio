import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Award,
  ExternalLink,
  MapPin,
  Calendar,
  Building,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { ExperienceData } from "../../services/api";

interface AcademicAndExperienceSectionProps {
  liveExperiences?: ExperienceData[];
}

export default function AcademicAndExperienceSection({
  liveExperiences = [],
}: AcademicAndExperienceSectionProps) {
  const [activeTab, setActiveTab] = useState<"all" | "experience" | "academic" | "awards">("all");

  // Professional roles as reflected in user's image media_1793180036514_dc1b7caf.png
  const professionalRoles = [
    {
      id: "role-01",
      number: "ROLE 01",
      role: "Doctoral Researcher",
      organization: "Queen's University Belfast",
      period: "Feb 2025 — Present",
      location: "Belfast, United Kingdom",
      type: "Research & Development",
      highlight: "Advanced wireless communications and mobile intelligence.",
    },
    {
      id: "role-02",
      number: "ROLE 02",
      role: "Graduate Teaching Assistant",
      organization: "Queen's University Belfast",
      period: "Sep 2025 — Present",
      location: "Belfast, United Kingdom",
      type: "Academic & Mentorship",
      highlight: "Mentoring postgraduate engineering labs and software architecture.",
    },
    {
      id: "role-03",
      number: "ROLE 03",
      role: "Lecturer (On Leave)",
      organization: "Rajshahi University of Engineering & Technology (RUET)",
      period: "Dec 2021 — Present",
      location: "Rajshahi, Bangladesh",
      type: "Faculty",
      highlight: "Lecturing in electronics, telecommunications, and system engineering.",
    },
    {
      id: "role-04",
      number: "ROLE 04",
      role: "Intern in Radio Access Network",
      organization: "Robi Axiata Limited",
      period: "Apr 2019 — May 2019",
      location: "Dhaka, Bangladesh",
      type: "Telecommunications",
      highlight: "Telecom network diagnostics and RAN optimization.",
    },
  ];

  // Academic Degrees as reflected in user's image media_1793180036521_a63ae3db.png
  const academicJourney = [
    {
      id: "acad-01",
      number: "1",
      degree: "Doctor of Philosophy (Ph.D.) in Electrical and Electronic Engineering",
      institution: "Queen's University Belfast (QUB)",
      period: "Feb 2025 — Present",
      location: "Belfast, UK",
      grade: "Fully Funded Researcher",
      highlight: "Specializing in next-generation high-speed communications & embedded systems.",
    },
    {
      id: "acad-02",
      number: "2",
      degree: "Master of Science (M.Sc.) in Electronics and Telecommunication Engineering (ETE)",
      institution: "Rajshahi University of Engineering & Technology (RUET)",
      period: "Sep 2021 — Dec 2024",
      location: "Rajshahi, Bangladesh",
      grade: "CGPA: 3.92 / 4.00",
      gradeDetail: "(First Class Honors/Distinction) [First Position]",
    },
    {
      id: "acad-03",
      number: "3",
      degree: "Bachelor of Science (B.Sc.) in Electronics and Telecommunication Engineering (ETE)",
      institution: "Rajshahi University of Engineering & Technology (RUET)",
      period: "Jan 2016 — Mar 2021",
      location: "Rajshahi, Bangladesh",
      grade: "CGPA: 3.85 / 4.00",
      gradeDetail: "(First Class Honors/Distinction) [First Position]",
    },
  ];

  // Travel Grants & Scholarships as reflected in user's image media_1793180036537_466663c8.png
  const travelGrants = [
    "EEECS School Travel Grant for the 2026 IEEE Global Communications Conference (GLOBECOM), Macau, China",
    "EEECS School Travel Grant for the 2026 IEEE International Symposium on Antennas and Propagation and USNC-URSI Radio Science Meeting (AP-S/URSI), Huntington Place Convention Center, Detroit, Michigan, USA [12-17 July 2026]",
    "Telco Renata Travel Grant 2024 (CTTC, Barcelona, Spain)",
    "International Conference on Computer and Information Technology (ICCIT) 2024, 2023, 2022",
    "2024 IEEE International Conference on Communication, Computing and Signal Processing (IICCCS), Asansol, India",
    "International Conference on Electrical, Information and Communication Technology (EICT) 2023 at KUET, Khulna",
  ];

  const scholarships = [
    "Fully Funded PhD Scholarship at Queen's University Belfast [2025-2028]",
    "University Scholarship (UG) for Top results [2017-2020]",
    "SSC Board Scholarship [2013-2015]",
    "JSC Board Scholarship [2010-2013]",
    "PSC Board Scholarship [2008-2010]",
  ];

  return (
    <section id="experience-academic" className="space-y-16 py-4">
      {/* 1. Professional Experience Section */}
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
          <a
            href="https://linkedin.com/in/rakibul-hasan-roxy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
          >
            <span>Extended profile</span>
            <ExternalLink size={13} />
          </a>
        </div>

        {/* 2x2 Grid of Roles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {professionalRoles.map((role, idx) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 p-6 shadow-sm hover:shadow-md hover:border-cyan-500/40 transition-all backdrop-blur-md flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">{role.number}</span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300">
                    {role.period}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {role.role}
                  </h3>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                    {role.organization}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} className="text-cyan-500" />
                  {role.location}
                </span>
                <span className="font-semibold text-cyan-600/80 dark:text-cyan-400/80">{role.type}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. Academic Journey Section */}
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
            Education ↗
          </span>
        </div>

        {/* 3-column Academic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {academicJourney.map((acad, idx) => (
            <motion.div
              key={acad.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 p-6 shadow-sm hover:shadow-md hover:border-cyan-500/40 transition-all backdrop-blur-md flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold text-xs border border-cyan-500/20">
                    {acad.number}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {acad.period}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {acad.degree}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {acad.institution}
                  </p>
                </div>
              </div>

              {/* Grade / Distinction pill badge */}
              <div className="mt-6 rounded-xl border border-amber-500/25 dark:border-amber-400/20 bg-amber-500/5 dark:bg-amber-400/5 p-3.5 space-y-1">
                <div className="text-xs font-bold text-amber-700 dark:text-amber-300">
                  {acad.grade}
                </div>
                {acad.gradeDetail && (
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                    {acad.gradeDetail}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. Awards & Recognition: Grants & Scholarships */}
      <div className="space-y-6">
        <div className="space-y-1.5 border-b border-slate-200/80 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            <Award size={15} />
            <span>Awards & Recognition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Grants and scholarships
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Travel Grants Column */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 p-6 sm:p-7 shadow-sm backdrop-blur-md space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Award size={18} className="text-cyan-500" />
              <span>Travel Grants</span>
            </div>

            <ul className="space-y-3.5">
              {travelGrants.map((grant, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" />
                  <span>{grant}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Scholarships Column */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 p-6 sm:p-7 shadow-sm backdrop-blur-md space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Award size={18} className="text-emerald-500" />
              <span>Scholarships</span>
            </div>

            <ul className="space-y-3.5">
              {scholarships.map((schol, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <span>{schol}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
