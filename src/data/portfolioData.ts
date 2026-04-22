import { 
  Github, 
  Linkedin, 
  Server, 
  Phone, 
  Code, 
  MessageSquare,
  Facebook,
  ShoppingBag,
  Globe
} from "lucide-react";

// --- Types ---
export type HeroStat = { value: string; label: string; detail: string; };
export type ProjectHighlight = {
  id: string;
  year: string;
  title: string;
  description: string;
  stack: string;
  image: string;
  secondaryImage?: string;
  url?: string;
  iosUrl?: string;
  androidUrl?: string;
  links?: { label: string; href: string; variant?: "primary" | "secondary" | "accent" }[];
};
export type Experience = {
  company: string;
  role: string;
  duration: string;
  meta?: string;
  location?: string;
};
export type SkillGroup = { title: string; description: string; items: string[]; icon: any; };
export type Video = { id: string; youtubeId: string; title: string; description: string; };
export type ContactMethod = { label: string; info: string; href: string; icon: any; };

// --- Config ---
export const portfolioConfig = {
  name: "RAKIBUL.H",
  fullName: "MD. Rakibul Hasan",
  title: "Flutter & Native Android Expert",
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
    id: "supersaver",
    year: "2025",
    title: "SuperSaver",
    description: "Modern savings and rewards platform experience built for clarity, trust, and conversion across digital touchpoints.",
    stack: "Web Platform · Product UI",
    image: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/Macbook-Air-www.supersaver.club.webp",
    url: "https://www.supersaver.club/"
  },
  {
    id: "evacado",
    year: "2025",
    title: "Evacado",
    description: "Mobile app for Envato sellers focused on tracking sales performance and managing marketplace insights on the go.",
    stack: "Flutter · Android · iOS",
    image: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/evacado.png",
    iosUrl: "https://apps.apple.com/us/app/evacado-envato-sales-master/id6758573315",
    androidUrl: "https://play.google.com/store/apps/details?id=com.bponi.evacado"
  },
  {
    id: "site-nutritionist",
    year: "2024",
    title: "Site Nutritionist",
    description: "Modern nutritionist website designed for clarity, trust, and conversion across desktop and mobile.",
    stack: "Web Development · Responsive UI",
    image: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/Macbook-Air-site-nutritionist.vercel.app.webp",
    secondaryImage: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/iPhone-13-PRO-site-nutritionist.vercel.app.webp",
    url: "https://site-nutritionist.vercel.app/"
  },
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
    image: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/dhectar_web.webp",
    links: [
      { label: "Website", href: "https://dhectar.com/", variant: "primary" },
      { label: "Dhectar X", href: "https://apps.apple.com/us/app/dhectar-x/id6745840908", variant: "secondary" },
      { label: "Dhectar DAB", href: "https://apps.apple.com/us/app/dhectar-dab/id6744033962", variant: "accent" }
    ]
  },
  {
    id: "gabfest",
    year: "2024",
    title: "GabFest Radio",
    description: "Live radio interface with rich media modules and polished brand animation.",
    stack: "React · Web Player",
    image: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/gabfest_web.au.webp",
    url: "https://thegabfestradio.com.au/"
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
    image: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/geoquake.png",
    androidUrl: "https://play.google.com/store/apps/details?id=com.bponi.earthquake"
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

// --- Experience ---
export const officeExperience: Experience[] = [
  {
    company: "Bponi",
    role: "CEO of Bponi",
    duration: "Jan 2025 - Present",
    meta: "Full-time",
    location: "Dhaka, Bangladesh · On-site",
  },
  {
    company: "DevsNest LLC",
    role: "Software Engineer",
    duration: "Oct 2023 - Feb 2025",
    meta: "Full-time",
    location: "Dhaka, Bangladesh · On-site",
  },
  {
    company: "Artificial Soft",
    role: "Junior Android Developer",
    duration: "Apr 2022 - Sep 2023",
    meta: "Full-time",
    location: "Dhaka, Bangladesh",
  }
];

export const freelanceExperience: Experience[] = [
  {
    company: "SuperSaver",
    role: "Lead Frontend Engineer",
    duration: "May 2023 - Present",
    meta: "Freelance",
  },
  {
    company: "Dehctar",
    role: "Product Engineer",
    duration: "Jan 2022 - Apr 2023",
    meta: "Freelance",
  },
  {
    company: "Jahkno Radio",
    role: "Freelance App Developer",
    duration: "Jul 2021 - Dec 2021",
    meta: "Freelance",
  },
  {
    company: "Switch FM London",
    role: "Creative Tech Partner",
    duration: "Jan 2021 - Jun 2021",
    meta: "Freelance",
  }
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
