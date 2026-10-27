export interface TechCategory {
  category: string;
  options: string[];
}

export const TECH_OPTIONS: TechCategory[] = [
  {
    category: "Mobile",
    options: [
      "Flutter",
      "Dart",
      "Kotlin",
      "Jetpack Compose",
      "KMP (Kotlin Multiplatform)",
      "SwiftUI",
      "Swift",
      "React Native",
      "Android SDK",
      "iOS SDK",
      "Bloc / Riverpod",
    ],
  },
  {
    category: "Frontend",
    options: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5 / CSS3",
      "Redux / Zustand",
      "Three.js / WebGL",
      "Vue.js",
    ],
  },
  {
    category: "Backend & Database",
    options: [
      "NestJS",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma ORM",
      "TypeORM",
      "MongoDB",
      "Firebase",
      "Supabase",
      "Redis",
      "REST API",
      "GraphQL",
      "WebSockets",
    ],
  },
  {
    category: "Deployment & DevOps",
    options: [
      "Docker",
      "Render",
      "Neon.tech",
      "Railway",
      "Vercel",
      "AWS",
      "Google Cloud",
      "CI/CD (GitHub Actions)",
      "Play Store Console",
      "App Store Connect",
    ],
  },
];
