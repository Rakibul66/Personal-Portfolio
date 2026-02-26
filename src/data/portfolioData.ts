import { 
  Github, 
  Linkedin, 
  Server, 
  Phone, 
  Code, 
  Mail, 
  MessageSquare,
  Facebook,
  ShoppingBag,
  Globe
} from "lucide-react";

// --- Types ---
export type HeroStat = { value: string; label: string; detail: string; };
export type ProjectHighlight = { id: string; year: string; title: string; description: string; stack: string; image: string; url?: string; };
export type Experience = { company: string; role: string; duration: string; description: string; };
export type SkillGroup = { title: string; description: string; items: string[]; icon: any; };
export type Video = { id: string; youtubeId: string; title: string; description: string; };
export type ContactMethod = { label: string; info: string; href: string; icon: any; };

// --- Config ---
export const portfolioConfig = {
  name: "RAKIBUL.H",
  fullName: "MD. Rakibul Hasan",
  title: "Flutter & Native Android Expert",
  tagline: "Global Product Partner",
  description: "CEO at Bponi. Engineering scalable mobile ecosystems and premium digital products.",
};

// --- Statistics ---
export const heroStats: HeroStat[] = [
  { value: "142+", label: "Global Deliveries", detail: "Solutions delivered across Fiverr and Upwork." },
  { value: "5k+", label: "Daily Listeners", detail: "Reached through specialized radio apps." },
  { value: "30+", label: "Countries", detail: "Products optimized for global markets." }
];

// --- ALL Featured Projects (Optimized for Wide Swiper) ---
export const projectHighlights: ProjectHighlight[] = [
  {
    id: "nutritionist-probal",
    year: "2024",
    title: "Nutritionist Probal",
    description: "Professional nutrition website built with a clean service flow and conversion-focused layout.",
    stack: "Web Development · Responsive UI",
    image: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/Macbook-Air-www.nutritionistprobal.com.webp",
    url: "https://www.nutritionistprobal.com/"
  },
  {
    id: "phoenix-auto-recycle",
    year: "2024",
    title: "Phoenix Auto Recycle",
    description: "Automotive recycling business website designed for trust, discoverability, and fast lead capture.",
    stack: "Web Development · Business Website",
    image: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/Macbook-Air-www.phoenixautorecycle.com.webp",
    url: "https://www.phoenixautorecycle.com/"
  },
  {
    id: "dhectar",
    year: "2024",
    title: "Dehctar Website",
    description: "React.js marketing site built end-to-end to elevate FinTech storytelling.",
    stack: "React.js · Tailwind",
    image: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/dhectar_web.webp"
  },
  {
    id: "gabfest",
    year: "2024",
    title: "GabFest Radio",
    description: "Live radio interface with rich media modules and polished brand animation.",
    stack: "React · Web Player",
    image: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/gabfest_web.au.webp"
  },
  {
    id: "switch-fm",
    year: "2023",
    title: "Switch FM App",
    description: "iOS SwiftUI experience powering broadcast + streaming features for Switch FM.",
    stack: "iOS SwiftUI",
    image: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/switch.png"
  },
  {
    id: "wod-watch",
    year: "2023",
    title: "Wod Watch",
    description: "Flutter-based performance monitoring app tailored for high-impact studio workouts.",
    stack: "Flutter · HealthKit",
    image: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/wod.png"
  },
  {
    id: "wod-timer",
    year: "2023",
    title: "Wod Timer",
    description: "Flutter Android/iOS timer for coaches that keeps every WOD simple to track.",
    stack: "Flutter · UX Design",
    image: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/wod%20timers.png"
  },
  {
    id: "geoquake",
    year: "2022",
    title: "Geoquake",
    description: "Flutter data and alert dashboard for earthquake tracking across platforms.",
    stack: "Flutter · Google Maps",
    image: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/geoquake.png"
  },
  {
    id: "eman-wellness",
    year: "2022",
    title: "Eman",
    description: "Mobile-first Flutter experience for community wellness spanning Android and iOS.",
    stack: "Flutter · Backend",
    image: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/eman.png"
  }
];

// --- ALL Experience ---
export const experienceTimeline: Experience[] = [
  { company: "SuperSaver", role: "Lead Frontend Engineer", duration: "May 2023 – Present", description: "Co-led the web platform rewrite, optimizing for conversion and accessibility across 30+ countries." },
  { company: "Dehctar", role: "Product Engineer", duration: "Jan 2022 – Apr 2023", description: "Built the consumer-facing dashboard, streamlining onboarding through realtime data." },
  { company: "Jahkno Radio", role: "Freelance App Developer", duration: "Jul 2021 – Dec 2021", description: "Shipped radio streaming + monetization app reaching 5K daily listeners." },
  { company: "Switch FM London", role: "Creative Tech Partner", duration: "Jan 2021 – Jun 2021", description: "Directed studio-quality web experiences for live broadcast events." }
];

// --- Skills ---
export const skillGroups: SkillGroup[] = [
  { title: "Mobile Stack", description: "Native-grade excellence.", icon: Phone, items: ["Flutter", "Kotlin", "SwiftUI", "ReactJS", "Java"] },
  { title: "System Logic", description: "Backend architecture.", icon: Server, items: ["Node.js", "PostgreSQL", "Docker", "REST API"] },
  { title: "Engineering", description: "Scalable management.", icon: Code, items: ["System Design", "CI/CD", "AI VIBE Code"] }
];

// --- ALL Videos (YouTube Carousel) ---
export const videos: Video[] = [
  { id: "1", youtubeId: "AgC_Wq7aWYU", title: "jahkno Radio", description: "Audio streaming project demo." },
  { id: "2", youtubeId: "ZPHJH1tR864", title: "Navidium", description: "Exploring modern navigation design." },
  { id: "3", youtubeId: "Aq9es7c7S-0", title: "Radio Tube", description: "Vintage-inspired design meets modern technology." },
  { id: "4", youtubeId: "G0FwvvtWm9U", title: "FIT", description: "Fitness-focused application interaction." },
  { id: "5", youtubeId: "MaIN_6W5D1E", title: "Focus Dom", description: "Focus app designed to boost productivity." },
  { id: "6", youtubeId: "iau7FXSGRvM", title: "Dhectar", description: "Advanced application features." },
  { id: "7", youtubeId: "XbnpDCYN69c", title: "Wod Watch", description: "Workout tracking application." },
  { id: "8", youtubeId: "T1oxxUoJwus", title: "Project Showcase", description: "Latest project demonstration." }
];

// --- Updated Professional Links ---
export const contactMethods: ContactMethod[] = [
  { 
    label: "LinkedIn", 
    info: "rakibul001", 
    href: "https://www.linkedin.com/in/rakibul001/", 
    icon: Linkedin 
  },
  { 
    label: "GitHub", 
    info: "Rakibul66f", 
    href: "https://github.com/Rakibul66", 
    icon: Github 
  },
  { 
    label: "Fiverr", 
    info: "Hire Me", 
    href: "https://www.fiverr.com/s/42y1wyl", 
    icon: ShoppingBag 
  },
  { 
    label: "CodeCanyon", 
    info: "Apptionary", 
    href: "https://codecanyon.net/user/apptionary/portfolio", 
    icon: Globe 
  },
  { 
    label: "Facebook", 
    info: "Connect", 
    href: "https://www.facebook.com/Rakibulhasanroxy1466/", 
    icon: Facebook 
  },
  { 
    label: "Signal", 
    info: "+880 1315861003", 
    href: "sms:+8801315861003", 
    icon: MessageSquare 
  }
];

export const getEmbedUrl = (id: string) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
export const getThumbnail = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
