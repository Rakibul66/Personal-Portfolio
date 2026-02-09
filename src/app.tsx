import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardDescription, CardTitle } from "./components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContentWrapper,
  DialogTitle as ModalTitle
} from "./components/ui/dialog";
import {
  ArrowUpRight,
  Code,
  ExternalLink,
  Github,
  Linkedin,
  Monitor,
  Phone,
  Server,
  Sparkles,
  Wrench
} from "lucide-react";
import { heroStats, videos as youtubeVideos } from "./data/portfolio";
import ParticleField from "./components/ParticleField";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: Github
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: Linkedin
  },
  {
    label: "Fiverr",
    href: "https://fiverr.com",
    icon: Sparkles
  },
  {
    label: "Upwork",
    href: "https://www.upwork.com",
    icon: Wrench
  }
];

const skillCategories = [
  {
    title: "Frontend",
    icon: Monitor,
    items: ["React", "TypeScript", "Tailwind", "Responsive systems"]
  },
  {
    title: "Mobile",
    icon: Phone,
    items: ["Flutter", "React Native", "App Store releases", "Automated QA"]
  },
  {
    title: "Backend",
    icon: Server,
    items: ["Node.js", "Firebase", "GraphQL", "Event-driven APIs"]
  },
  {
    title: "Tools",
    icon: Code,
    items: ["Vite", "GitHub Actions", "Postman", "Sentry & analytics"]
  }
];

const technologies = [
  "React",
  "Flutter",
  "TypeScript",
  "Firebase",
  "GraphQL",
  "Tailwind",
  "Node.js",
  "Vite"
];

const featuredProjects = [
  {
    name: "Dehctar Website",
    description: "React.js marketing site built end-to-end to elevate FinTech storytelling.",
    stack: "React.js",
    image:
      "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/dhectar_web.webp"
  },
  {
    name: "GabFest Radio",
    description: "Live radio interface with rich media modules and polished brand animation.",
    stack: "React",
    image:
      "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/gabfest_web.au.webp"
  },
  {
    name: "Switch FM App",
    description: "iOS SwiftUI experience powering broadcast + streaming features for Switch FM.",
    stack: "iOS SwiftUI",
    image:
      "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/switch.png"
  },
  {
    name: "Wod Watch",
    description: "Flutter-based performance monitoring app tailored for high-impact studio workouts.",
    stack: "Flutter",
    image:
      "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/wod.png"
  },
  {
    name: "Wod Timer",
    description: "Flutter Android/iOS timer for coaches that keeps every WOD simple to track with crisp visuals.",
    stack: "Flutter · Android & iOS",
    image:
      "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/wod%20timers.png"
  },
  {
    name: "Geoquake",
    description: "Flutter data and alert dashboard for earthquake tracking across Android & iOS.",
    stack: "Flutter · Android & iOS",
    image:
      "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/geoquake.png"
  },
  {
    name: "Eman",
    description: "Mobile-first Flutter experience for community wellness spanning Android and iOS.",
    stack: "Flutter · Android & iOS",
    image:
      "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/eman.png"
  }
];

const experienceTimeline = [
  {
    company: "SuperSaver",
    role: "Lead Frontend Engineer",
    duration: "May 2023 – Present",
    description: "Co-led the web platform rewrite, optimizing for conversion and accessibility across 30+ countries."
  },
  {
    company: "Dehctar",
    role: "Product Engineer",
    duration: "Jan 2022 – Apr 2023",
    description: "Built the consumer-facing dashboard, streamlining onboarding through realtime data and micro-interactions."
  },
  {
    company: "Jahkno Radio",
    role: "Freelance App Developer",
    duration: "Jul 2021 – Dec 2021",
    description: "Shipped radio streaming + monetization mobile app that reached 5K daily listeners."
  },
  {
    company: "Switch FM London",
    role: "Creative Tech Partner",
    duration: "Jan 2021 – Jun 2021",
    description: "Directed studio-quality web experiences for live broadcast events and sponsorship showcases."
  },
  {
    company: "Life Mentor",
    role: "Consulting Engineer",
    duration: "Aug 2020 – Jan 2021",
    description: "Designed data-driven coaching tools, pairing scalable APIs with personalized user journeys."
  },
  {
    company: "AynaPay",
    role: "Full-stack Contractor",
    duration: "Feb 2019 – Jul 2020",
    description: "Delivered fintech dashboards for cross-border payments, tracking KPIs for compliance and trust."
  }
];

const marketplaceStats = [
  { label: "Fiverr", value: 142 },
  { label: "Upwork", value: 118 },
  { label: "Freelancer", value: 54 }
];

const incomeChannels = [
  {
    title: "Marketplace Platforms",
    items: ["Fiverr", "Upwork", "Freelancer"]
  },
  {
    title: "Digital Marketplaces",
    items: ["CodeCanyon", "Codester", "Gumroad", "BuyMeACoffee"]
  },
  {
    title: "Direct Clients",
    items: ["Product studios", "SaaS founders", "Agencies"]
  }
];

const videoGallery = youtubeVideos.map((video) => ({
  title: video.title,
  url: `https://www.youtube.com/embed/${video.youtubeId}`,
  thumbnail: `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
  platform: "YouTube",
  description: video.description
}));

type Video = (typeof videoGallery)[number];

const digitalProducts = [
  {
    name: "Premium Dashboard Kit",
    description: "Collection of reusable charts, forms, and components optimized for SaaS sales pages.",
    price: "$49",
    url: "https://gumroad.com/"
  },
  {
    name: "Mobile Growth Templates",
    description: "Flutter + React Native UI kits tuned for launches and MVPs.",
    price: "$39",
    url: "https://gumroad.com/"
  },
  {
    name: "Freelancer Toolkit",
    description: "Proposal + onboarding + delivery templates that save 3+ hours per client.",
    price: "$29",
    url: "https://gumroad.com/"
  }
];

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const listVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.11, duration: 0.5, ease: "easeOut" }
  })
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: custom * 0.1, duration: 0.45, ease: "easeOut" }
  })
};

const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame: number;
    const duration = 1800;
    const startTime = performance.now();

    const update = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        frame = requestAnimationFrame(update);
      }
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <span className="text-5xl font-semibold text-white">{count}</span>;
};

const totalOrders = marketplaceStats.reduce((sum, item) => sum + item.value, 0);

const App = () => {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-slate-100">
      <ParticleField />
      <div className="absolute inset-0 opacity-70">
        <div className="absolute -top-10 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-r from-slate-500 to-slate-900 blur-3xl"></div>
        <div className="absolute bottom-0 right-[-120px] h-[320px] w-[320px] rounded-full bg-gradient-to-r from-slate-600/50 to-cyan-400/40 blur-[120px]"></div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 sm:px-8">
        <motion.section
          className="section-wrapper space-y-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e111a] via-[#080a10]/70 to-[#03050c] p-8 shadow-premium"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className="flex items-center justify-between">
            <Badge>Premium Developer</Badge>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-100 transition hover:border-white/60 hover:bg-white/10"
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-sm uppercase tracking-[0.4em] text-slate-400">Global product partner</div>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              MD. Rakibul Hasan — Flutter & Native Android Expert, CEO @ Bponi
            </h1>
            <p className="text-lg text-slate-300">
              Building scalable mobile solutions, premium SaaS experiences, and digital assets trusted by founders and agencies worldwide.
            </p>
            <div className="grid gap-4 pt-4 text-sm sm:grid-cols-3">
              {heroStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-premium"
                  variants={listVariants}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                >
                  <p className="text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{stat.label}</p>
                  <p className="mt-1 text-xs text-slate-300">{stat.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="solid" size="default" className="flex items-center gap-2">
              Hire Me
              <ExternalLink className="h-4 w-4" />
            </Button>
            <a
              href="#products"
              className="inline-flex items-center gap-2 rounded-full border border-white/50 px-6 py-3 text-base font-semibold text-white transition hover:border-cyan-400/70"
            >
              View Products
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </motion.section>

        <motion.section
          className="grid gap-6 rounded-3xl border border-white/5 bg-[#050b16]/80 p-6 shadow-premium"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Skills & Expertise</p>
              <h2 className="text-2xl font-semibold">End-to-end capability stack</h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
              >
                <Card className="transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <category.icon className="h-6 w-6 text-cyan-300" />
                    <CardTitle>{category.title}</CardTitle>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                    {category.items.map((skill) => (
                      <li key={skill} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="section-wrapper space-y-8 rounded-3xl border border-white/5 bg-gradient-to-br from-[#0a1320]/60 to-[#050b14] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Technologies</p>
              <h2 className="text-2xl font-semibold">Tools I lean on every day</h2>
            </div>
            <Badge>Stable stack</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech}
                className="group flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 text-center font-semibold text-slate-50 transition hover:border-cyan-400/70 hover:bg-cyan-400/10"
                variants={listVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
              >
                <div className="space-y-1">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                    {tech}
                  </p>
                  <p className="text-sm text-slate-200 opacity-0 transition group-hover:opacity-100">
                    {tech} expertise
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="grid gap-6 rounded-3xl border border-white/5 bg-[#050511]/80 p-6 shadow-premium"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Featured work</p>
            <h2 className="text-2xl font-semibold">Selected builds by me</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.name}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
              >
                <Card className="flex flex-col space-y-4 bg-[#040812]/70 border-white/10 transition hover:-translate-y-1">
                  <div className="relative w-full overflow-hidden rounded-2xl border border-white/5 bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="h-48 w-full object-cover transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
                    <a
                      href={project.image}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white transition hover:border-cyan-300 hover:bg-cyan-300/20"
                      aria-label={`Open ${project.name}`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                    <p className="text-sm text-slate-300">{project.description}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">{project.stack}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="grid gap-8 rounded-3xl border border-white/5 bg-[#040812] p-6 shadow-premium"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Career & impact</p>
            <h2 className="text-3xl font-semibold">Trusted global experience timeline</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[9px] top-0 h-full w-[2px] bg-gradient-to-b from-cyan-400 via-transparent to-transparent" />
            <div className="space-y-8">
              {experienceTimeline.map((entry, index) => (
                <motion.div
                  key={entry.company}
                  className="ml-4 flex gap-4"
                  variants={listVariants}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.35 }}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/30 text-sm font-semibold text-cyan-300">
                    •
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-white">{entry.company}</h3>
                      <span className="text-sm text-slate-400">{entry.duration}</span>
                    </div>
                    <p className="text-slate-300">{entry.role}</p>
                    <p className="text-sm text-slate-400">{entry.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          className="grid gap-6 rounded-3xl border border-white/5 bg-gradient-to-br from-[#050511] to-[#03050b] p-6 shadow-premium"
          id="stats"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Marketplace Impact</p>
              <h2 className="text-2xl font-semibold">Verified freelance growth</h2>
            </div>
            <Badge>Total orders</Badge>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            <motion.div
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-6"
              variants={cardVariants}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <p className="text-sm text-slate-400">All platforms</p>
              <AnimatedCounter value={totalOrders} />
              <p className="mt-2 text-sm text-slate-300">contracts delivered globally</p>
            </motion.div>
            {marketplaceStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center"
                variants={cardVariants}
                custom={index + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
              >
                <p className="text-sm text-slate-500">{stat.label}</p>
                <AnimatedCounter value={stat.value} />
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">projects</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="grid gap-6 rounded-3xl border border-white/5 bg-[#050911]/80 p-6 shadow-premium"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Source of income</p>
            <h2 className="text-2xl font-semibold">Diverse, trust-first revenue</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {incomeChannels.map((channel, index) => (
              <motion.div
                key={channel.title}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
              >
                <Card className="bg-[#040812]/70 border-white/10 transition hover:-translate-y-1">
                  <CardTitle>{channel.title}</CardTitle>
                  <CardDescription>
                    {channel.items.map((item) => (
                      <span key={item} className="mr-2 inline-flex items-center gap-2 text-xs text-slate-300">
                        <span className="h-2 w-2 rounded-full bg-cyan-400" />
                        {item}
                      </span>
                    ))}
                  </CardDescription>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="grid gap-6 rounded-3xl border border-white/5 bg-gradient-to-br from-[#050511] to-[#03050b] p-6 shadow-premium"
          id="videos"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Video showcase</p>
            <h2 className="text-2xl font-semibold">Tutorials, demos, walkthroughs</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {videoGallery.map((video, index) => (
              <motion.div
                key={video.title}
                className="cursor-pointer overflow-hidden transition hover:-translate-y-1"
                onClick={() => setActiveVideo(video)}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
              >
                <Card className="space-y-4 bg-[#050b14]/70 border border-white/10">
                  <div className="relative h-48 w-full">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="h-full w-full object-cover transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80" />
                  </div>
                  <div className="mt-3 space-y-1">
                    <p className="text-sm text-slate-400">{video.platform}</p>
                    <p className="text-lg font-semibold text-white">{video.title}</p>
                    <p className="text-xs text-slate-400">{video.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <Dialog open={Boolean(activeVideo)} onOpenChange={(open) => !open && setActiveVideo(null)}>
            <DialogContentWrapper>
              <ModalTitle className="text-lg text-white">{activeVideo?.title}</ModalTitle>
              <div className="mt-4 aspect-video w-full overflow-hidden rounded-2xl bg-black">
                {activeVideo && (
                  <iframe
                    title={activeVideo.title}
                    src={activeVideo.url}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
              <div className="mt-4 flex justify-end">
                <DialogClose asChild>
                  <Button variant="ghost" size="sm">
                    Close
                  </Button>
                </DialogClose>
              </div>
            </DialogContentWrapper>
          </Dialog>
        </motion.section>

        <motion.section
          className="grid gap-6 rounded-3xl border border-white/5 bg-[#03060f]/90 p-6 shadow-premium"
          id="products"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Digital products</p>
            <h2 className="text-2xl font-semibold">Premium assets for builders</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {digitalProducts.map((product, index) => (
              <motion.div
                key={product.name}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
              >
                <Card className="space-y-4">
                  <div className="h-36 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-500/10" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                    <p className="text-sm text-slate-300">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-white">{product.price}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(product.url, "_blank")}
                      className="text-sm"
                    >
                      Buy Now
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="grid gap-6 rounded-3xl border border-white/5 bg-gradient-to-br from-[#0c1118]/80 to-[#050a11] p-8 shadow-premium"
          id="contact"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Let&apos;s build</p>
            <h2 className="text-3xl font-semibold">Let&apos;s build something great</h2>
            <p className="text-slate-300">
              Ready for strategic product partners, premium training, and reliable freelance delivery.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <motion.div
              variants={cardVariants}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <Card className="space-y-2 bg-[#040814]/80">
                <CardTitle>Contact</CardTitle>
                <CardDescription>
                  Email me at
                  <br />
                  <a className="text-cyan-300" href="mailto:hello@devpro.com">
                    hello@devpro.com
                  </a>
                </CardDescription>
              </Card>
            </motion.div>
            <motion.div
              variants={cardVariants}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <Card className="space-y-2 bg-[#040814]/80">
                <CardTitle>WhatsApp</CardTitle>
                <CardDescription>
                  <a className="text-cyan-300" href="https://wa.me/1234567890">
                    +1 (234) 567-890
                  </a>
                </CardDescription>
              </Card>
            </motion.div>
            <motion.div
              variants={cardVariants}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <Card className="space-y-2 bg-[#040814]/80">
                <CardTitle>Marketplace</CardTitle>
                <CardDescription>
                  <div className="flex flex-col gap-2 text-slate-300">
                    <a className="text-cyan-300" href="https://www.fiverr.com">
                      Fiverr
                    </a>
                    <a className="text-cyan-300" href="https://www.upwork.com">
                      Upwork
                    </a>
                    <a className="text-cyan-300" href="https://www.freelancer.com">
                      Freelancer
                    </a>
                  </div>
                </CardDescription>
              </Card>
            </motion.div>
          </div>
          <Button variant="solid" size="default" className="self-start">
            Message and scope new work
          </Button>
        </motion.section>
      </div>
    </div>
  );
};

export default App;
