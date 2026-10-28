// Dynamic API Client connected to NestJS + PostgreSQL

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function resolveMediaUrl(url?: string | null): string {
  if (!url) return '';
  let cleanUrl = url;
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
  // Public Data Fetching with Instant Cache & Background Freshness
  async getProfile(): Promise<ProfileData | null> {
    const cached = getCached<ProfileData>('profile');
    try {
      const res = await fetch(`${API_BASE_URL}/profile`);
      if (res.ok) {
        const data = await res.json();
        setCache('profile', data);
        return data;
      }
    } catch {}
    return cached;
  },

  async getProjects(): Promise<ProjectData[]> {
    const cached = getCached<ProjectData[]>('projects');
    try {
      const res = await fetch(`${API_BASE_URL}/projects`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setCache('projects', data);
          return data;
        }
      }
    } catch {}
    return cached && cached.length > 0 ? cached : [];
  },

  async getProjectById(id: string): Promise<ProjectData | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/projects/${id}`);
      if (res.ok) {
        return await res.json();
      }
    } catch {}
    // Fallback to searching loaded projects list
    const projects = await this.getProjects();
    return projects.find((p) => p.id === id) || null;
  },

  async getVentures(): Promise<VentureData[]> {
    const cached = getCached<VentureData[]>('ventures');
    try {
      const res = await fetch(`${API_BASE_URL}/ventures`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setCache('ventures', data);
          return data;
        }
      }
    } catch {}
    return cached && cached.length > 0 ? cached : [];
  },

  async getBlogs(): Promise<BlogData[]> {
    const cached = getCached<BlogData[]>('blogs');
    try {
      const res = await fetch(`${API_BASE_URL}/blogs`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setCache('blogs', data);
          return data;
        }
      }
    } catch {}
    return cached && cached.length > 0 ? cached : [];
  },

  async getBlogBySlug(slug: string): Promise<BlogData | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/blogs/${slug}`);
      if (res.ok) {
        return await res.json();
      }
    } catch {}
    // Fallback search through getBlogs if direct slug fails
    const all = await this.getBlogs();
    return all.find((b) => b.slug === slug || b.id === slug) || null;
  },

  async getExperiences(type?: string): Promise<ExperienceData[]> {
    const cacheKey = `experiences_${type || 'all'}`;
    const cached = getCached<ExperienceData[]>(cacheKey);
    try {
      const url = type ? `${API_BASE_URL}/profile/experiences?type=${type}` : `${API_BASE_URL}/profile/experiences`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setCache(cacheKey, data);
          return data;
        }
      }
    } catch {}
    return cached && cached.length > 0 ? cached : [];
  },

  async getReferences(): Promise<ReferenceData[]> {
    const cached = getCached<ReferenceData[]>('references');
    try {
      const res = await fetch(`${API_BASE_URL}/profile/references`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setCache('references', data);
          return data;
        }
      }
    } catch {}
    return cached && cached.length > 0 ? cached : [];
  },

  async getShowcase(): Promise<ShowcaseVideoData[]> {
    const cached = getCached<ShowcaseVideoData[]>('showcase');
    try {
      const res = await fetch(`${API_BASE_URL}/showcase`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setCache('showcase', data);
          return data;
        }
      }
    } catch {}
    return cached && cached.length > 0 ? cached : [];
  },

  async submitMessage(payload: ContactMessagePayload): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
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
      // Record one visit per session
      const hasVisited = sessionStorage.getItem('visited_session');
      const method = hasVisited ? 'GET' : 'POST';
      const res = await fetch(`${API_BASE_URL}/analytics/visit`, { method });
      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem('visited_session', 'true');
        return data.visits;
      }
    } catch {}
    return 1718;
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
