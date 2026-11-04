// Dynamic API Client connected to NestJS + PostgreSQL
import {
  initialProfile,
  initialProjects,
  initialExperiences,
  initialVentures,
  initialBlogs,
  initialShowcases,
  initialReferences,
} from "../data/initialData";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Timeout helper: prevents slow Render cold starts or offline backends from freezing the app
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 5000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

// Default high-quality placeholder for mobile/web apps and tech projects
export const DEFAULT_PROJECT_THUMBNAIL = 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=80';
export const DEFAULT_BLOG_THUMBNAIL = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80';

export function resolveMediaUrl(url?: string | null, fallback?: string): string {
  if (!url || typeof url !== 'string' || !url.trim()) return fallback || '';
  let cleanUrl = url.trim();
  if (cleanUrl.startsWith('http://rakibulhr.onrender.com')) {
    cleanUrl = cleanUrl.replace('http://', 'https://');
  }
  // If the image was saved with localhost:4000 during local dev, replace with the live API URL in production
  if (cleanUrl.includes('localhost:4000') && API_BASE_URL && !API_BASE_URL.includes('localhost')) {
    return cleanUrl.replace('http://localhost:4000', API_BASE_URL);
  }
  return cleanUrl;
}

export function getDownloadableCvUrl(url?: string | null): string {
  if (!url) return '';
  let clean = resolveMediaUrl(url);
  // If it's a Cloudinary raw upload missing an extension in the path, tell Cloudinary to attach attachment flag
  if (clean.includes('cloudinary.com') && clean.includes('/raw/upload/')) {
    if (!clean.endsWith('.pdf')) {
      clean = clean.replace('/raw/upload/', '/raw/upload/fl_attachment:Rakibul_Hasan_CV.pdf/');
    }
  }
  return clean;
}

export interface ProjectData {
  id?: string;
  title: string;
  subtitle?: string;
  description: string;
  technologies: string[];
  category?: string;
  imageUrl?: string;
  images?: string[];
  githubUrl?: string;
  liveUrl?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  featured?: boolean;
  order?: number;
}

export interface VentureData {
  id?: string;
  title: string;
  tagline?: string;
  description: string;
  category?: string;
  imageUrl?: string;
  linkUrl: string;
  linkText?: string;
  status?: string;
  revenue?: string;
  order?: number;
}

export interface BlogData {
  id?: string;
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  published?: boolean;
  readingTime?: string;
  createdAt?: string;
}

export interface ExperienceData {
  id?: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  details: string[];
  type: 'EXPERIENCE' | 'EDUCATION' | 'FREELANCE';
}

export interface ReferenceData {
  id?: string;
  name: string;
  role: string;
  company: string;
  email?: string;
  phone?: string;
  feedback?: string;
  avatarUrl?: string;
  rating?: number;
  videoUrl?: string;
  videoType?: 'YOUTUBE' | 'DEVICE' | 'NONE';
  order?: number;
}

export interface ShowcaseVideoData {
  id?: string;
  title: string;
  description?: string;
  youtubeUrl?: string;
  videoFile?: string;
  thumbnail?: string;
  category?: string;
  order?: number;
}

export interface ProfileData {
  name: string;
  title: string;
  headline: string;
  bio?: string;
  avatarUrl?: string;
  resumeUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  introVideoUrl?: string;
  location?: string;
  hobbies: string[];
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// Memory and LocalStorage Cache Helpers for Instant Loading
const CACHE_PREFIX = 'rakibulhr_cache_';

function getCached<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(CACHE_PREFIX + key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

function setCache<T>(key: string, data: T): void {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(data));
  } catch {}
}

export const apiService = {
  // Synchronous Initial Getters: Render entire UI within 0.1s (instant loading without blank frames)
  getInitialProfile(): ProfileData {
    return getCached<ProfileData>('profile') || initialProfile;
  },

  getInitialProjects(): ProjectData[] {
    const cached = getCached<ProjectData[]>('projects');
    return cached && cached.length > 0 ? cached : initialProjects;
  },

  getInitialExperiences(type?: string): ExperienceData[] {
    const cacheKey = `experiences_${type || 'all'}`;
    const cached = getCached<ExperienceData[]>(cacheKey);
    if (cached && cached.length > 0) return cached;
    if (type) return initialExperiences.filter((e) => e.type === type);
    return initialExperiences;
  },

  getInitialVentures(): VentureData[] {
    const cached = getCached<VentureData[]>('ventures');
    return cached && cached.length > 0 ? cached : initialVentures;
  },

  getInitialBlogs(): BlogData[] {
    const cached = getCached<BlogData[]>('blogs');
    return cached && cached.length > 0 ? cached : initialBlogs;
  },

  getInitialShowcase(): ShowcaseVideoData[] {
    const cached = getCached<ShowcaseVideoData[]>('showcase');
    return cached && cached.length > 0 ? cached : initialShowcases;
  },

  getInitialReferences(): ReferenceData[] {
    const cached = getCached<ReferenceData[]>('references');
    return cached && cached.length > 0 ? cached : initialReferences;
  },

  getInitialProjectById(id?: string): ProjectData | null {
    if (!id) return null;
    const all = this.getInitialProjects();
    return all.find((p) => p.id === id || p.title.toLowerCase() === id.toLowerCase()) || null;
  },

  getInitialBlogBySlug(slug?: string): BlogData | null {
    if (!slug) return null;
    const all = this.getInitialBlogs();
    return all.find((b) => b.slug === slug || b.id === slug) || null;
  },

  getInitialVisitCount(): number {
    try {
      const cached = localStorage.getItem('rakibulhr_cached_visits');
      return cached ? parseInt(cached, 10) : 0;
    } catch {
      return 0;
    }
  },

  // Public Data Fetching with Stale-While-Revalidate & Resilient Fallbacks
  async getProfile(): Promise<ProfileData> {
    const fallback = getCached<ProfileData>('profile') || initialProfile;
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/profile`, {}, 5000);
      if (res.ok) {
        const data = await res.json();
        if (data && data.name) {
          setCache('profile', data);
          return data;
        }
      }
    } catch {}
    return fallback;
  },

  async getProjects(): Promise<ProjectData[]> {
    const cached = getCached<ProjectData[]>('projects');
    const fallback = cached && cached.length > 0 ? cached : initialProjects;
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/projects`, {}, 5000);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setCache('projects', data);
          return data;
        }
      }
    } catch {}
    return fallback;
  },

  async getProjectById(id: string): Promise<ProjectData | null> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/projects/${id}`, {}, 5000);
      if (res.ok) {
        return await res.json();
      }
    } catch {}
    // Fallback to searching loaded projects list
    const projects = await this.getProjects();
    return projects.find((p) => p.id === id || p.title.toLowerCase() === id.toLowerCase()) || this.getInitialProjectById(id);
  },

  async getVentures(): Promise<VentureData[]> {
    const cached = getCached<VentureData[]>('ventures');
    const fallback = cached && cached.length > 0 ? cached : initialVentures;
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/ventures`, {}, 5000);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setCache('ventures', data);
          return data;
        }
      }
    } catch {}
    return fallback;
  },

  async getBlogs(): Promise<BlogData[]> {
    const cached = getCached<BlogData[]>('blogs');
    const fallback = cached && cached.length > 0 ? cached : initialBlogs;
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/blogs`, {}, 5000);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setCache('blogs', data);
          return data;
        }
      }
    } catch {}
    return fallback;
  },

  async getBlogBySlug(slug: string): Promise<BlogData | null> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/blogs/${slug}`, {}, 5000);
      if (res.ok) {
        return await res.json();
      }
    } catch {}
    // Fallback search through getBlogs if direct slug fails
    const all = await this.getBlogs();
    return all.find((b) => b.slug === slug || b.id === slug) || this.getInitialBlogBySlug(slug);
  },

  async getExperiences(type?: string): Promise<ExperienceData[]> {
    const cacheKey = `experiences_${type || 'all'}`;
    const cached = getCached<ExperienceData[]>(cacheKey);
    const fallback =
      cached && cached.length > 0
        ? cached
        : type
        ? initialExperiences.filter((e) => e.type === type)
        : initialExperiences;
    try {
      const url = type ? `${API_BASE_URL}/profile/experiences?type=${type}` : `${API_BASE_URL}/profile/experiences`;
      const res = await fetchWithTimeout(url, {}, 5000);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setCache(cacheKey, data);
          return data;
        }
      }
    } catch {}
    return fallback;
  },

  async getReferences(): Promise<ReferenceData[]> {
    const cached = getCached<ReferenceData[]>('references');
    const fallback = cached && cached.length > 0 ? cached : initialReferences;
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/profile/references`, {}, 5000);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setCache('references', data);
          return data;
        }
      }
    } catch {}
    return fallback;
  },

  async getShowcase(): Promise<ShowcaseVideoData[]> {
    const cached = getCached<ShowcaseVideoData[]>('showcase');
    const fallback = cached && cached.length > 0 ? cached : initialShowcases;
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/showcase`, {}, 5000);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setCache('showcase', data);
          return data;
        }
      }
    } catch {}
    return fallback;
  },

  async submitMessage(payload: ContactMessagePayload): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }, 7000);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to send message');
      }
      return { success: true, message: 'Message sent successfully!' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Network error, please try again.' };
    }
  },

  async recordVisit(): Promise<number> {
    try {
      // 1. Filter out headless browsers / automated bots client-side
      const isBot = navigator.webdriver || /bot|crawler|spider|headless/i.test(navigator.userAgent);
      if (isBot) {
        const res = await fetchWithTimeout(`${API_BASE_URL}/analytics/visit`, { method: 'GET' }, 4000);
        if (res.ok) {
          const data = await res.json();
          return data.visits;
        }
        return this.getInitialVisitCount();
      }

      // 2. Persistent unique device identifier (stored in localStorage)
      let visitorId = localStorage.getItem('rakibulhr_visitor_id');
      if (!visitorId) {
        visitorId = 'vis_' + Math.random().toString(36).substring(2, 12) + '_' + Date.now().toString(36);
        localStorage.setItem('rakibulhr_visitor_id', visitorId);
      }

      // 3. Prevent duplicate hits within the same day/session
      const today = new Date().toISOString().slice(0, 10);
      const lastRecordedDate = localStorage.getItem('rakibulhr_visit_recorded_date');
      const isAlreadyRecordedToday = lastRecordedDate === today;

      const method = isAlreadyRecordedToday ? 'GET' : 'POST';
      const options: RequestInit = {
        method,
        headers: { 'Content-Type': 'application/json' },
      };
      if (method === 'POST') {
        options.body = JSON.stringify({ visitorId });
      }

      const res = await fetchWithTimeout(`${API_BASE_URL}/analytics/visit`, options, 4000);
      if (res.ok) {
        const data = await res.json();
        if (method === 'POST') {
          localStorage.setItem('rakibulhr_visit_recorded_date', today);
        }
        if (typeof data.visits === 'number') {
          localStorage.setItem('rakibulhr_cached_visits', String(data.visits));
          return data.visits;
        }
      }
    } catch {}
    return this.getInitialVisitCount();
  },

  // Upload image/media/document file from local device to Cloudinary via NestJS server
  async uploadFile(token: string, file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to upload file');
    }

    return response.json();
  },

  // Alias for backward compatibility
  async uploadImage(token: string, file: File): Promise<{ url: string; filename: string }> {
    return this.uploadFile(token, file);
  },

  // Admin Auth
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Invalid email or password');
    }
    return response.json();
  },

  // Admin Operations (Protected by JWT)
  async updateProfile(token: string, data: Partial<ProfileData>) {
    const res = await fetch(`${API_BASE_URL}/profile`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  },

  async createProject(token: string, project: ProjectData) {
    const cleanProject: any = {};
    Object.keys(project).forEach((k) => {
      const val = (project as any)[k];
      if (val !== '' && val !== null && val !== undefined) {
        cleanProject[k] = val;
      }
    });

    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(cleanProject),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(Array.isArray(err.message) ? err.message.join(', ') : err.message || 'Failed to create project');
    }
    return response.json();
  },

  async updateProject(token: string, id: string, project: Partial<ProjectData>) {
    const cleanProject: any = {};
    Object.keys(project).forEach((k) => {
      const val = (project as any)[k];
      if (val !== '' && val !== null && val !== undefined) {
        cleanProject[k] = val;
      }
    });

    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(cleanProject),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(Array.isArray(err.message) ? err.message.join(', ') : err.message || 'Failed to update project');
    }
    return res.json();
  },

  async deleteProject(token: string, id: string) {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete project');
    return res.json();
  },

  // Ventures CRUD
  async createVenture(token: string, venture: VentureData) {
    const cleanVenture: any = {};
    Object.keys(venture).forEach((k) => {
      const val = (venture as any)[k];
      if (val !== '' && val !== null && val !== undefined) {
        cleanVenture[k] = val;
      }
    });

    const res = await fetch(`${API_BASE_URL}/ventures`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(cleanVenture),
    });
    if (!res.ok) throw new Error('Failed to create venture');
    return res.json();
  },

  async updateVenture(token: string, id: string, venture: Partial<VentureData>) {
    const res = await fetch(`${API_BASE_URL}/ventures/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(venture),
    });
    if (!res.ok) throw new Error('Failed to update venture');
    return res.json();
  },

  async deleteVenture(token: string, id: string) {
    const res = await fetch(`${API_BASE_URL}/ventures/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete venture');
    return res.json();
  },

  // Blogs CRUD
  async createBlog(token: string, blog: BlogData) {
    const res = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(blog),
    });
    if (!res.ok) throw new Error('Failed to create blog');
    return res.json();
  },

  async updateBlog(token: string, id: string, blog: Partial<BlogData>) {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(blog),
    });
    if (!res.ok) throw new Error('Failed to update blog');
    return res.json();
  },

  async deleteBlog(token: string, id: string) {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete blog');
    return res.json();
  },

  async createExperience(token: string, exp: ExperienceData) {
    const cleanExp: any = {};
    Object.keys(exp).forEach((k) => {
      const val = (exp as any)[k];
      if (val !== '' && val !== null && val !== undefined) {
        cleanExp[k] = val;
      }
    });

    const res = await fetch(`${API_BASE_URL}/profile/experiences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(cleanExp),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to save experience');
    }
    return res.json();
  },

  async deleteExperience(token: string, id: string) {
    const res = await fetch(`${API_BASE_URL}/profile/experiences/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete experience');
    return res.json();
  },

  async createReference(token: string, ref: ReferenceData) {
    const cleanRef: any = {};
    Object.keys(ref).forEach((k) => {
      const val = (ref as any)[k];
      if (val !== '' && val !== null && val !== undefined) {
        cleanRef[k] = val;
      }
    });

    const res = await fetch(`${API_BASE_URL}/profile/references`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(cleanRef),
    });
    if (!res.ok) throw new Error('Failed to create client review');
    return res.json();
  },

  async updateReference(token: string, id: string, ref: ReferenceData) {
    const cleanRef: any = {};
    Object.keys(ref).forEach((k) => {
      const val = (ref as any)[k];
      if (val !== '' && val !== null && val !== undefined) {
        cleanRef[k] = val;
      }
    });

    const res = await fetch(`${API_BASE_URL}/profile/references/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(cleanRef),
    });
    if (!res.ok) throw new Error('Failed to update client review');
    return res.json();
  },

  async deleteReference(token: string, id: string) {
    const res = await fetch(`${API_BASE_URL}/profile/references/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete reference');
    return res.json();
  },

  // Showcase API
  async createShowcase(token: string, data: ShowcaseVideoData) {
    const cleanData: any = {};
    Object.keys(data).forEach((k) => {
      const val = (data as any)[k];
      if (val !== '' && val !== null && val !== undefined) {
        cleanData[k] = val;
      }
    });

    const res = await fetch(`${API_BASE_URL}/showcase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(cleanData),
    });
    if (!res.ok) throw new Error('Failed to create showcase item');
    return res.json();
  },

  async updateShowcase(token: string, id: string, data: ShowcaseVideoData) {
    const cleanData: any = {};
    Object.keys(data).forEach((k) => {
      const val = (data as any)[k];
      if (val !== '' && val !== null && val !== undefined) {
        cleanData[k] = val;
      }
    });

    const res = await fetch(`${API_BASE_URL}/showcase/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(cleanData),
    });
    if (!res.ok) throw new Error('Failed to update showcase item');
    return res.json();
  },

  async deleteShowcase(token: string, id: string) {
    const res = await fetch(`${API_BASE_URL}/showcase/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete showcase item');
    return res.json();
  },

  async getMessages(token: string) {
    const response = await fetch(`${API_BASE_URL}/messages`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch messages');
    return response.json();
  },

  async deleteMessage(token: string, id: string) {
    const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to delete message');
    return response.json();
  },
};
