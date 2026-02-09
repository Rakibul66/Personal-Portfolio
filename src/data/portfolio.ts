export type HeroStat = {
  value: string;
  label: string;
  detail: string;
};

export type ProjectHighlight = {
  id: string;
  year: string;
  title: string;
  description: string;
  matcap: string;
  accent: string;
  image: string;
};

export type PersonalProject = {
  name: string;
  date: string;
  title: string;
  image: string;
  android: string;
  ios: string;
  description: string;
  technology: string;
  solution: string;
};

export type Project = {
  title: string;
  status: string;
  description: string;
  tags: string[];
  link: string;
};

export type SkillGroup = {
  title: string;
  description: string;
  items: string[];
};

export type Video = {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
};

export type ContactMethod = {
  label: string;
  info: string;
  href: string;
};

export const heroStats: HeroStat[] = [
  {
    value: "12+",
    label: "Immersive installations",
    detail: "Experiences blending physical and digital worlds."
  },
  {
    value: "8k",
    label: "Realtime scenes",
    detail: "Optimized triangles rendered at 120 fps."
  },
  {
    value: "19",
    label: "Global partners",
    detail: "From festivals to cultural institutions."
  }
];

export const projectHighlights: ProjectHighlight[] = [
  {
    id: "tomorrowland",
    year: "2024",
    title: "Tomorrowland Reimagined",
    description:
      "A reactive music pavilion where light, typography, and 3D motion respond to every beat.",
    matcap: "mat-19",
    accent: "linear-gradient(135deg, rgba(127, 141, 255, 0.7), rgba(255, 79, 166, 0.9))",
    image: "/tommorowland.png"
  },
  {
    id: "navy-pier",
    year: "2023",
    title: "Navy Pier Pulse",
    description:
      "A cinematic projection map that charts lightshows and performs an immersive dockside narrative.",
    matcap: "mat-8",
    accent: "linear-gradient(135deg, rgba(5, 45, 99, 0.8), rgba(126, 190, 255, 0.9))",
    image: "/navy-pier.png"
  },
  {
    id: "msi-chicago",
    year: "2022",
    title: "MSI Chicago Ascension",
    description:
      "A tactile layer for museum exhibits controlled through gesture + reactive LED choreography.",
    matcap: "mat-9",
    accent: "linear-gradient(135deg, rgba(255, 205, 149, 0.8), rgba(255, 114, 114, 0.92))",
    image: "/msi-chicago.png"
  },
  {
    id: "phone",
    year: "2021",
    title: "Louise’s Signal",
    description:
      "A storytelling hub that blends archive footage and spatial sound within an interactive app shell.",
    matcap: "mat-12",
    accent: "radial-gradient(circle, rgba(255, 79, 166, 0.9), rgba(5, 45, 99, 0.5))",
    image: "/phone.png"
  },
  {
    id: "kikk",
    year: "2021",
    title: "KIKK Festival Pulse",
    description:
      "An AI-powered light festival explorer that reacts to music metadata and spatial data.",
    matcap: "mat-10",
    accent: "linear-gradient(135deg, rgba(138, 255, 179, 0.85), rgba(118, 104, 255, 0.9))",
    image: "/kikk.png"
  },
  {
    id: "kennedy",
    year: "2020",
    title: "The Kennedy Sequence",
    description:
      "An orchestration of choreography videos, 3D typography, and layered serif callouts.",
    matcap: "mat-8",
    accent: "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(27, 27, 59, 0.9))",
    image: "/kennedy.png"
  },
  {
    id: "opera",
    year: "2019",
    title: "Royal Opera of Wallonia",
    description:
      "A tactile portal for the opera house that mirrors stage lighting and ensemble movement.",
    matcap: "mat-13",
    accent: "linear-gradient(135deg, rgba(255, 82, 82, 0.8), rgba(4, 7, 24, 0.9))",
    image: "/opera.png"
  }
];

export const personalProjects: PersonalProject[] = [
  {
    name: "Rakibul Hasan",
    date: "March 29, 2025",
    title: "Focus Flash",
    image: "focus.png",
    android: "https://play.google.com/store/apps/details?id=smartagro",
    ios: "https://apps.apple.com/app/id123456789",
    description:
      "Focus Flash is a productivity app that combines Pomodoro, reminders, and task organization to boost focus and deep work sessions.",
    technology: "Flutter framework and Riverpod state management",
    solution: "Helps reduce distractions and build consistent focus habits."
  },
  {
    name: "Rakibul Hasan",
    date: "May 14, 2025",
    title: "Newsly",
    image: "c.png",
    android:
      "https://www.codester.com/items/53137/newsly-flutter-news-app-for-android-and-ios",
    ios: "https://www.codester.com/items/53137/newsly-flutter-news-app-for-android-and-ios",
    description:
      "Newsly is a fast and modern platform for reading breaking news, trending topics, and personalized articles in one place.",
    technology: "Flutter, GETX, GraphQL API",
    solution: "Delivers an ultimate reading experience with speed and simplicity."
  },
  {
    name: "Rakibul Hasan",
    date: "May 13, 2025",
    title: "Evacado Sales Tracker",
    image: "d.png",
    android:
      "https://codecanyon.net/item/evacado-sales-tracker-app-template-flutter-android-and-ios/56550010",
    ios: "https://apps.apple.com/app/id423456789",
    description:
      "Evacado is a dedicated app for Envato authors to track their sales, earnings, and performance insights in real time.",
    technology: "Flutter, Envato API, GETX",
    solution: "Track and analyze your Envato sales with ease."
  },
  {
    name: "Rakibul Hasan",
    date: "May 11, 2025",
    title: "Finance Hero",
    image: "f.png",
    android: "https://play.google.com/store/apps/details?id=greentracker",
    ios: "https://apps.apple.com/app/id623456789",
    description:
      "Finance Hero helps users manage expenses, income, and carbon footprint while encouraging a sustainable lifestyle.",
    technology: "React Native, Firebase",
    solution: "Promotes financial awareness and eco-friendly living."
  },
  {
    name: "Rakibul Hasan",
    date: "May 5, 2025",
    title: "Daily Workout Coach",
    image: "powerpulse.png",
    android:
      "https://play.google.com/store/apps/details?id=com.fitness.power_pulse",
    ios: "https://apps.apple.com/us/app/powerhaus/id6740179355",
    description:
      "Daily Workout Coach provides guided exercises with animations, categorized routines, and personalized workout tracking.",
    technology: "Flutter, REST APIs",
    solution: "Makes fitness easy with instant workout demos."
  },
  {
    name: "Rakibul Hasan",
    date: "May 5, 2025",
    title: "Eman",
    image: "eman.png",
    android: "https://play.google.com/store/apps/details?id=com.bd.k2k&hl=en",
    ios: "https://apps.apple.com/us/app/eman-islamic-dua-app/id6745274133",
    description:
      "Eman is an Islamic lifestyle app offering authentic duas, prayer times, mosque finders, and reminders.",
    technology: "Flutter, REST APIs",
    solution: "Supports Muslims in daily spiritual and religious practices."
  },
  {
    name: "Rakibul Hasan",
    date: "May 5, 2025",
    title: "Brick Breaks",
    image: "brick.png",
    android: "https://play.google.com/store/apps/details?id=com.bd.k2k&hl=en",
    ios: "https://apps.apple.com/us/app/bodymetric/id6744912462",
    description:
      "Brick Breaks is a classic arcade-style brick breaker game with fun levels, powerups, and addictive gameplay.",
    technology: "Flutter, REST APIs",
    solution: "Brings back retro gaming fun with a modern twist."
  },
  {
    name: "Rakibul Hasan",
    date: "May 5, 2025",
    title: "Focus Dom",
    image: "focus_dom.png",
    android: "https://play.google.com/store/apps/details?id=com.bd.k2k&hl=en",
    ios: "https://apps.apple.com/us/app/bodymetric/id6744912462",
    description:
      "Focus Dom is a deep work companion app with customizable focus timers, distraction blockers, and Hive-based offline support.",
    technology: "Flutter, Riverpod, Hive",
    solution: "Boosts productivity by helping users stay in flow."
  }
];

export const projects: Project[] = [
  {
    title: "Resonance Dashboard",
    status: "Live",
    description:
      "An observability-first control plane for complex Rust services with live query boards and human-readable incident stories.",
    tags: ["Rust", "GraphQL", "OpenTelemetry"],
    link: "https://example.com/resonance"
  },
  {
    title: "Field Pulse",
    status: "Beta",
    description:
      "Mobile-first analytics for field teams that meshes sensor telemetry with micro-moments for richer experimentation.",
    tags: ["Flutter", "Realtime", "CI/CD"],
    link: "https://example.com/field-pulse"
  },
  {
    title: "MetaCast Studio",
    status: "In progress",
    description:
      "A creative platform for storytellers combining motion typographic grids, immersive audio, and lightweight XR layers.",
    tags: ["Next.js", "Framer Motion", "3D"],
    link: "https://example.com/metacast"
  }
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend & Systems",
    description: "Building powerful mental models through Rust and backend ecosystems.",
    items: ["Rust", "Actix-Web", "Axum", "PostgreSQL", "Docker", "Kubernetes", "gRPC"]
  },
  {
    title: "Mobile Development",
    description: "Cross-platform native excellence for iOS and Android.",
    items: ["Flutter", "Native Android", "Kotlin", "Swift", "Riverpod", "Firebase"]
  },
  {
    title: "Architecture & Mentorship",
    description: "Helping developers rebuild and redefine fundamental concepts.",
    items: ["System Design", "Microservices", "CI/CD", "OpenAPI", "GraphQL", "Technical Leadership"]
  }
];

export const contactMethods: ContactMethod[] = [
  {
    label: "Email",
    info: "rakibul@anytimestaff.com",
    href: "mailto:rakibul@anytimestaff.com"
  },
  {
    label: "LinkedIn",
    info: "linkedin.com/in/rakibul-hasan",
    href: "https://linkedin.com/in/rakibul-hasan"
  },
  {
    label: "GitHub",
    info: "github.com/rakibul-roxy",
    href: "https://github.com/rakibul-roxy"
  },
  {
    label: "Signal",
    info: "+880 130 896 6989",
    href: "sms:+8801308966989"
  }
];

export const videos: Video[] = [
  {
    id: "1",
    youtubeId: "AgC_Wq7aWYU",
    title: "jahkno Radio",
    description: "Innovative audio project showcasing creative design and functionality."
  },
  {
    id: "2",
    youtubeId: "ZPHJH1tR864",
    title: "navidium",
    description: "Exploring modern navigation and user experience design."
  },
  {
    id: "3",
    youtubeId: "Aq9es7c7S-0",
    title: "Radio Tube",
    description: "Vintage-inspired design meets modern technology."
  },
  {
    id: "4",
    youtubeId: "G0FwvvtWm9U",
    title: "FIT",
    description: "Fitness-focused application with seamless user interaction."
  },
  {
    id: "5",
    youtubeId: "MaIN_6W5D1E",
    title: "Focus Dom",
    description: "Focus app designed to boost productivity and concentration."
  },
  {
    id: "6",
    youtubeId: "iau7FXSGRvM",
    title: "Dhectar",
    description: "Advanced application with cutting-edge features."
  },
  {
    id: "7",
    youtubeId: "XbnpDCYN69c",
    title: "Wod Watch",
    description: "Workout tracking and fitness monitoring application."
  },
  {
    id: "8",
    youtubeId: "T1oxxUoJwus",
    title: "Project Showcase",
    description: "Latest project and feature demonstration."
  }
];

export const storyTimeline = [
  {
    label: "mindset",
    text: "We treat technology as sculpting clay and light as our brushstroke."
  },
  {
    label: "approach",
    text: "Designing interfaces that breathe with motion, telling stories through responsive 3D and immersive soundscapes."
  },
  {
    label: "outcome",
    text: "Avoided template thinking—we produce unique installations and digital products every time."
  }
];
