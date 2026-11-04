import {
  ProfileData,
  ProjectData,
  ExperienceData,
  VentureData,
  BlogData,
  ShowcaseVideoData,
  ReferenceData,
} from "../services/api";
import {
  projectHighlights,
  officeExperience,
  freelanceExperience,
  videos,
  portfolioConfig,
  getThumbnail,
} from "./portfolioData";

export const initialProfile: ProfileData = {
  name: portfolioConfig.fullName || "MD. Rakibul Hasan",
  title: portfolioConfig.title || "Flutter & Native Android Expert",
  headline: portfolioConfig.description || "Engineering scalable mobile ecosystems and premium digital products.",
  bio: "CEO at Bponi. Over 5+ years specializing in cross-platform mobile architecture with Flutter, native Android (Kotlin), scalable backend services, and telecommunications engineering.",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
  resumeUrl: "",
  githubUrl: "https://github.com/Rakibul66",
  linkedinUrl: "https://www.linkedin.com/in/rakibul001/",
  facebookUrl: "https://www.facebook.com/Rakibulhasanroxy1466/",
  email: "contact@rakibulhr.dev",
  phone: "+880 1315861003",
  whatsapp: "+8801315861003",
  introVideoUrl: "https://www.youtube.com/watch?v=AgC_Wq7aWYU",
  location: "Dhaka, Bangladesh",
  hobbies: ["Open Source", "Mobile Systems", "Tech Writing"],
};

export const initialProjects: ProjectData[] = projectHighlights.map((p, index) => ({
  id: p.id,
  title: p.title,
  subtitle: p.stack,
  description: p.description,
  technologies: p.stack.split("·").map((s) => s.trim()),
  category:
    p.stack.toLowerCase().includes("flutter") ||
    p.stack.toLowerCase().includes("android") ||
    p.stack.toLowerCase().includes("ios")
      ? "Mobile Application"
      : "Web Platform",
  imageUrl: p.image,
  liveUrl: p.url || (p.links && p.links[0]?.href),
  playStoreUrl: p.androidUrl,
  appStoreUrl: p.iosUrl,
  featured: true,
  order: index,
}));

export const initialExperiences: ExperienceData[] = [
  ...officeExperience.map((exp, idx) => ({
    id: `office-${idx}`,
    role: exp.role,
    company: exp.company,
    location: exp.location,
    period: exp.duration,
    details: [exp.meta || "Full-time"],
    type: "EXPERIENCE" as const,
  })),
  ...freelanceExperience.map((exp, idx) => ({
    id: `freelance-${idx}`,
    role: exp.role,
    company: exp.company,
    location: "Remote",
    period: exp.duration,
    details: [exp.meta || "Freelance"],
    type: "FREELANCE" as const,
  })),
  {
    id: "acad-01",
    role: "B.Sc. in Electronics & Telecommunication Engineering",
    company: "Rajshahi University of Engineering & Technology (RUET)",
    location: "Rajshahi, Bangladesh",
    period: "2016 — 2021",
    details: ["First Class Honors with Distinction", "CGPA: 3.85 / 4.00"],
    type: "EDUCATION" as const,
  },
];

export const initialShowcases: ShowcaseVideoData[] = videos.map((v, index) => ({
  id: v.id,
  title: v.title,
  description: v.description,
  youtubeUrl: `https://www.youtube.com/watch?v=${v.youtubeId}`,
  thumbnail: getThumbnail(v.youtubeId),
  category: "Project Showcase",
  order: index,
}));

export const initialVentures: VentureData[] = [
  {
    id: "bponi",
    title: "Bponi Technologies",
    tagline: "Digital Asset Marketplace & Studio",
    description: "Developing production-grade mobile ecosystems, digital assets, and high-performance apps trusted by businesses globally.",
    category: "Venture Studio",
    imageUrl: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/bponi_suite.png",
    linkUrl: "https://bponi.com",
    linkText: "Visit Bponi",
    status: "ACTIVE",
    revenue: "Active Enterprise",
    order: 0,
  },
  {
    id: "supersaver",
    title: "SuperSaver",
    tagline: "Savings & Rewards Platform",
    description: "Modern savings and digital rewards portal engineered for consumer retention, secure transactions, and multi-vendor campaigns.",
    category: "Fintech Platform",
    imageUrl: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/Macbook-Air-www.supersaver.club.webp",
    linkUrl: "https://www.supersaver.club/",
    linkText: "Visit SuperSaver",
    status: "ACTIVE",
    order: 1,
  },
  {
    id: "evacado",
    title: "Evacado",
    tagline: "Marketplace Sales Master",
    description: "Dedicated mobile platform for Envato marketplace creators to track live analytics, statement updates, and earnings.",
    category: "Mobile SaaS",
    imageUrl: "https://raw.githubusercontent.com/Rakibul66/Recent-Project-Apk/refs/heads/main/roxy_portfolio/evacado.png",
    linkUrl: "https://apps.apple.com/us/app/evacado-envato-sales-master/id6758573315",
    linkText: "View on App Store",
    status: "ACTIVE",
    order: 2,
  },
];

export const initialBlogs: BlogData[] = [
  {
    id: "flutter-production-architecture",
    title: "Architecting High-Scale Flutter Applications: Clean Architecture & BLoC",
    slug: "architecting-high-scale-flutter-applications",
    excerpt: "A deep dive into building modular, maintainable, and offline-first mobile solutions with Flutter and reactive state streams.",
    content: `Building scalable mobile applications requires a robust architecture that isolates business logic from UI rendering. In this article, we explore:

1. **Layered Separation**: UI, Domain, and Data layer separation.
2. **State Management**: Stream-based state flows with BLoC pattern.
3. **Resilience**: Offline data persistence, automatic token refreshes, and network retries.
4. **Testing**: Unit and integration test coverage for core domain models.`,
    coverImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=80",
    tags: ["Flutter", "Mobile", "Architecture", "Clean Code"],
    published: true,
    readingTime: "5 min read",
    createdAt: new Date().toISOString(),
  },
  {
    id: "low-latency-streaming-audio",
    title: "Real-Time Audio Streaming on iOS and Android: Buffering & Codecs",
    slug: "real-time-audio-streaming-mobile",
    excerpt: "Engineering low-latency, resilient audio players with dynamic bitrates, background audio services, and metadata decoding.",
    content: `Audio playback on mobile presents unique challenges across OS lifecycle events. In this post, we explore buffer management, lock screen integrations, and handling intermittent network dropouts smoothly without playback interruption.`,
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    tags: ["Android", "iOS", "SwiftUI", "Streaming"],
    published: true,
    readingTime: "6 min read",
    createdAt: new Date().toISOString(),
  },
  {
    id: "full-stack-nest-postgres",
    title: "Zero-Downtime REST APIs with NestJS, Prisma & Connection Pooling",
    slug: "zero-downtime-rest-apis-nestjs-prisma",
    excerpt: "Optimizing cloud PostgreSQL workloads with Neon serverless connection pooling, edge caching, and automated migrations.",
    content: `Scalable backends depend on disciplined connection management. Discover how to configure Prisma with Neon connection pooling, rate limiters, and JWT security to sustain high concurrent requests on cloud infrastructure.`,
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    tags: ["NestJS", "PostgreSQL", "Backend", "Cloud"],
    published: true,
    readingTime: "7 min read",
    createdAt: new Date().toISOString(),
  },
];

export const initialReferences: ReferenceData[] = [
  {
    id: "ref-01",
    name: "Marcus Vance",
    role: "Product Lead",
    company: "Dhectar Media",
    feedback: "Rakibul is a rare full-spectrum mobile engineer. He architected our fintech and media products with meticulous attention to detail and zero lag.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    videoType: "NONE",
    order: 0,
  },
  {
    id: "ref-02",
    name: "Julian Sterling",
    role: "Director of Engineering",
    company: "Switch FM London",
    feedback: "Exceptional mastery of native Android and cross-platform streaming. Reliable, communicative, and delivers high-performance builds on schedule.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    videoType: "NONE",
    order: 1,
  },
];
