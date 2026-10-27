// Dynamic API Client connected to NestJS + PostgreSQL

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function resolveMediaUrl(url?: string | null): string {
  if (!url) return '';
  // If the image was saved with localhost:4000 during local dev, replace with the live API URL in production
  if (url.includes('localhost:4000') && API_BASE_URL && !API_BASE_URL.includes('localhost')) {
    return url.replace('http://localhost:4000', API_BASE_URL);
  }
  return url;
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
  location?: string;
  hobbies: string[];
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export const apiService = {
  // Public Data Fetching
  async getProfile(): Promise<ProfileData | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/profile`);
      if (!res.ok) return null;
      return res.json();
    } catch {
      return null;
    }
  },

  async getProjects(): Promise<ProjectData[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/projects`);
      if (!res.ok) return [];
      return res.json();
    } catch {
      return [];
    }
  },

  async getVentures(): Promise<VentureData[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/ventures`);
      if (!res.ok) return [];
      return res.json();
    } catch {
      return [];
    }
  },

  async getBlogs(): Promise<BlogData[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/blogs`);
      if (!res.ok) return [];
      return res.json();
    } catch {
      return [];
    }
  },

  async getExperiences(type?: string): Promise<ExperienceData[]> {
    try {
      const url = type ? `${API_BASE_URL}/profile/experiences?type=${type}` : `${API_BASE_URL}/profile/experiences`;
      const res = await fetch(url);
      if (!res.ok) return [];
      return res.json();
    } catch {
      return [];
    }
  },

  async getReferences(): Promise<ReferenceData[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/profile/references`);
      if (!res.ok) return [];
      return res.json();
    } catch {
      return [];
    }
  },

  async getShowcase(): Promise<ShowcaseVideoData[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/showcase`);
      if (!res.ok) return [];
      return res.json();
    } catch {
      return [];
    }
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

  // Upload image file from local device to NestJS server
  async uploadImage(token: string, file: File): Promise<{ url: string; filename: string }> {
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
      throw new Error(err.message || 'Failed to upload image file');
    }

    return response.json();
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
