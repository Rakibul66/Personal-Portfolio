import { ProjectData, ExperienceData, ProfileData, ShowcaseVideoData, ReferenceData, BlogData, VentureData } from "../services/api";

export const initialProfileData: ProfileData = {
  name: "MD. Rakibul Hasan",
  title: "Mobile app developer (Flutter, Jetpack Compose, SwiftUI, React Native)",
  headline: "Engineering scalable mobile ecosystems and premium digital products.",
  bio: "Lead Mobile Architect with 4+ years experience shipping mission-critical cross-platform and native applications.",
  avatarUrl: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/evacado.png",
  email: "contact@rakibulhr.dev",
  location: "Dhaka, Bangladesh",
  hobbies: ["Open Source", "Mobile System Architecture", "Clean Code"],
  githubUrl: "https://github.com/Rakibul-Hasan-Roxy",
  linkedinUrl: "https://linkedin.com/in/rakibul-hasan-roxy",
};

export const initialProjectsData: ProjectData[] = [
  {
    id: "init-1",
    title: "Envato Sales Tracker",
    subtitle: "Real-time sales tracking & marketplace insights",
    description: "Envato codecanyon sales tracker mobile application with Envato API integration, tracking daily earnings and conversions.",
    technologies: ["Flutter", "Dart", "REST API", "NestJS"],
    category: "Mobile Application",
    imageUrl: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/evacado.png",
    liveUrl: "https://apps.apple.com/us/app/evacado-envato-sales-master/id6758573315",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.bponi.evacado",
    featured: true,
  },
  {
    id: "init-2",
    title: "Bponi Suite",
    subtitle: "Enterprise HR & Payroll Platform",
    description: "HRM flutter android and ios cross platform application with real-time employee attendance, payroll and operations.",
    technologies: ["Flutter", "Dart", "Rust", "PostgreSQL"],
    category: "Mobile Application",
    imageUrl: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/bponi_suite.png",
    liveUrl: "https://apps.apple.com/us/app/bponi-suite/id6754082422",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.bponi.suite",
    featured: true,
  },
  {
    id: "init-3",
    title: "জমি পরিমাপ ক্যালকুলেটর",
    subtitle: "Smart Land Calculation & Units Tool",
    description: "ভূমি ক্যালকুলেটর অ্যাপটি জমি পরিমাপ ও রূপান্তরের জন্য দ্রুত ও নির্ভুল সমাধান (শতক, কাঠা, বিঘা, একর, বর্গফুট)।",
    technologies: ["Kotlin", "Jetpack Compose", "Room DB"],
    category: "Mobile Application",
    imageUrl: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/wod.png",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.focus.landmine",
    featured: true,
  },
  {
    id: "init-4",
    title: "AYNA ePay",
    subtitle: "Education Fee & Instant Payment Gateway",
    description: "Digital payments process system making tuition and fee payments fast and secure with bKash and card integrations.",
    technologies: ["Flutter", "Dart", "bKash API", "Firebase"],
    category: "Mobile Application",
    imageUrl: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/Macbook-Air-www.supersaver.club.webp",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.ayna.epay",
    featured: true,
  },
  {
    id: "init-5",
    title: "EDUAYNA HR",
    subtitle: "Employee Operations & Organization Flow",
    description: "Human resources app experience built for clear employee workflows, mobile shifts, and clock-in tracking.",
    technologies: ["Flutter", "Dart", "NestJS", "Clean Architecture"],
    category: "Mobile Application",
    imageUrl: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/edu_hr.png",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.eduayna.hr",
    featured: true,
  },
  {
    id: "init-6",
    title: "SuperSaver",
    subtitle: "Rewards & Marketplace Club",
    description: "Modern savings and rewards platform experience built for clarity, trust, and conversion across digital touchpoints.",
    technologies: ["React.js", "Tailwind CSS", "Node.js"],
    category: "Web Platform",
    imageUrl: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/Macbook-Air-www.supersaver.club.webp",
    liveUrl: "https://www.supersaver.club/",
    featured: true,
  },
];

export const initialVenturesData: VentureData[] = [
  {
    id: "v-1",
    title: "FlutterFlow SaaS Kit",
    tagline: "Ready-to-launch starter kits for developers",
    description: "Commercial boilerplate collection generating recurring digital asset income for indie hackers and agencies.",
    category: "Digital Products",
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    linkUrl: "https://rakibulhr.dev",
    linkText: "Visit Platform",
    status: "ACTIVE",
    revenue: "$2.4k/mo",
  },
];

export const initialShowcasesData: ShowcaseVideoData[] = [
  {
    id: "s-1",
    title: "jahkno Radio",
    description: "Audio streaming project demo and live player interface.",
    youtubeUrl: "https://www.youtube.com/watch?v=AgC_Wq7aWYU",
    category: "Audio Streaming",
  },
  {
    id: "s-2",
    title: "Navidium Interface",
    description: "Exploring modern fluid navigation design.",
    youtubeUrl: "https://www.youtube.com/watch?v=ZPHJH1tR864",
    category: "UI Motion",
  },
  {
    id: "s-3",
    title: "FIT Pulse App",
    description: "Fitness-focused application interaction and live charts.",
    youtubeUrl: "https://www.youtube.com/watch?v=G0FwvvtWm9U",
    category: "Health & Fitness",
  },
];

export const initialReviewsData: ReferenceData[] = [
  {
    id: "r-1",
    name: "Md Shanto Islam",
    role: "Digital Marketing Executive",
    company: "Ads Agency LLC",
    feedback: "MD Rakibul developed a mobile app for our ads agency that streamlined our daily payroll, operations, and tracking.",
    rating: 5,
    videoUrl: "https://youtube.com/shorts/tCY2M49NiCM",
    videoType: "YOUTUBE",
  },
];

export const initialBlogsData: BlogData[] = [
  {
    id: "b-1",
    title: "Mastering Clean Architecture in Flutter 3",
    slug: "mastering-clean-architecture-flutter",
    excerpt: "How to decouple presentation, domain business rules, and external data sources for enterprise mobile apps.",
    content: "Clean architecture allows engineering teams to scale without rewriting codebases as UI designs change...",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    tags: ["Flutter", "Architecture", "Mobile"],
    readingTime: "6 min read",
    createdAt: "2026-03-15",
  },
  {
    id: "b-2",
    title: "Optimizing PostgreSQL Queries with Prisma ORM",
    slug: "optimizing-postgresql-queries-prisma",
    excerpt: "Best indexing patterns, connection pooling strategies, and composite keys for sub-100ms API responses.",
    content: "When scaling database calls with Prisma, lean indexes and selective querying make a dramatic difference...",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    tags: ["PostgreSQL", "Prisma", "NestJS"],
    readingTime: "4 min read",
    createdAt: "2026-02-28",
  },
];
