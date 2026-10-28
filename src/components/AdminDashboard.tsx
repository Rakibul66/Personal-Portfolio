import React, { useState, useEffect } from "react";
import {
  FolderGit2,
  Briefcase,
  GraduationCap,
  Users,
  Heart,
  Globe,
  Mail,
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Search,
  CheckCircle2,
  TrendingUp,
  LayoutDashboard,
  LogOut,
  Save,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Layers,
  X,
  ArrowLeft,
  Eye,
  Filter,
  Upload,
  Loader2,
  Image as ImageIcon,
  Flame,
  DollarSign,
  Building2,
  Video,
  Star,
  Quote,
} from "lucide-react";
import {
  apiService,
  ProjectData,
  ExperienceData,
  ReferenceData,
  ProfileData,
  BlogData,
  VentureData,
  ShowcaseVideoData,
} from "../services/api";
import TechSelector from "./TechSelector";

interface AdminDashboardProps {
  onClose: () => void;
}

type Tab =
  | "dashboard"
  | "ventures"
  | "projects"
  | "showcase"
  | "blogs"
  | "companies"
  | "education"
  | "references"
  | "hobbies"
  | "links"
  | "messages";

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("admin_token"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Sub-view mode for clean list -> full create/edit screen flow
  const [viewMode, setViewMode] = useState<"list" | "create" | "edit">("list");

  // Search filter query
  const [searchQuery, setSearchQuery] = useState("");

  // Data Collections
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    title: "",
    headline: "",
    bio: "",
    avatarUrl: "",
    resumeUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    facebookUrl: "",
    twitterUrl: "",
    email: "",
    phone: "",
    location: "",
    hobbies: [],
  });
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [ventures, setVentures] = useState<VentureData[]>([]);
  const [editingVentureId, setEditingVentureId] = useState<string | null>(null);
  const [uploadingVentureImage, setUploadingVentureImage] = useState(false);

  const [ventureForm, setVentureForm] = useState<VentureData>({
    title: "",
    tagline: "",
    description: "",
    category: "In-House Venture",
    imageUrl: "",
    linkUrl: "",
    linkText: "Visit Venture",
    status: "ACTIVE",
    revenue: "$1.5k/mo",
  });

  // Upload handler for Ventures
  const handleVentureFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    setUploadingVentureImage(true);
    try {
      const res = await apiService.uploadImage(token, file);
      setVentureForm((prev) => ({ ...prev, imageUrl: res.url }));
      showToast("Venture image uploaded!");
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploadingVentureImage(false);
    }
  };
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [educationList, setEducationList] = useState<ExperienceData[]>([]);
  const [references, setReferences] = useState<ReferenceData[]>([]);
  const [showcases, setShowcases] = useState<ShowcaseVideoData[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  // Editing Item IDs
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingShowcaseId, setEditingShowcaseId] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(null);
  const [editingReferenceId, setEditingReferenceId] = useState<string | null>(null);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingBlogImage, setUploadingBlogImage] = useState(false);
  const [uploadingShowcaseVideo, setUploadingShowcaseVideo] = useState(false);
  const [uploadingReviewVideo, setUploadingReviewVideo] = useState(false);
  const [uploadingReviewAvatar, setUploadingReviewAvatar] = useState(false);

  // File upload handler for Projects
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    setUploadingImage(true);
    try {
      const res = await apiService.uploadImage(token, file);
      setProjectForm((prev) => ({ ...prev, imageUrl: res.url }));
      showToast("Project cover image uploaded from device!");
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // File upload handler for Blogs
  const handleBlogFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    setUploadingBlogImage(true);
    try {
      const res = await apiService.uploadImage(token, file);
      setBlogForm((prev) => ({ ...prev, coverImage: res.url }));
      showToast("Article cover image uploaded from device!");
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploadingBlogImage(false);
    }
  };

  // Form States
  const [projectForm, setProjectForm] = useState<ProjectData>({
    title: "",
    subtitle: "",
    description: "",
    technologies: ["Flutter", "Dart", "NestJS", "PostgreSQL"],
    category: "Mobile Application",
    imageUrl: "",
    githubUrl: "",
    liveUrl: "",
    playStoreUrl: "",
    appStoreUrl: "",
    featured: true,
  });

  const [blogForm, setBlogForm] = useState<BlogData>({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    tags: ["Flutter", "Architecture"],
    published: true,
    readingTime: "5 min read",
  });
  const [blogTagsInput, setBlogTagsInput] = useState("Flutter, Architecture");

  const [companyForm, setCompanyForm] = useState<ExperienceData>({
    role: "",
    company: "",
    location: "",
    period: "",
    details: [],
    type: "EXPERIENCE",
  });
  const [companyDetailsInput, setCompanyDetailsInput] = useState("");

  const [educationForm, setEducationForm] = useState<ExperienceData>({
    role: "B.Sc. in Computer Science & Engineering",
    company: "",
    location: "",
    period: "",
    details: [],
    type: "EDUCATION",
  });

  const [referenceForm, setReferenceForm] = useState<ReferenceData>({
    name: "",
    role: "",
    company: "",
    email: "",
    phone: "",
    feedback: "",
    avatarUrl: "",
    rating: 5,
    videoUrl: "",
    videoType: "YOUTUBE",
  });

  const [showcaseForm, setShowcaseForm] = useState<ShowcaseVideoData>({
    title: "",
    description: "",
    youtubeUrl: "",
    videoFile: "",
    thumbnail: "",
    category: "Product Demo",
  });

  // Showcase Video upload handler
  const handleShowcaseVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    setUploadingShowcaseVideo(true);
    try {
      const res = await apiService.uploadImage(token, file);
      setShowcaseForm((prev) => ({ ...prev, videoFile: res.url }));
      showToast("Showcase video uploaded from device!");
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploadingShowcaseVideo(false);
    }
  };

  // Review Video upload handler
  const handleReviewVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    setUploadingReviewVideo(true);
    try {
      const res = await apiService.uploadImage(token, file);
      setReferenceForm((prev) => ({ ...prev, videoUrl: res.url, videoType: "DEVICE" }));
      showToast("Client review video uploaded from device!");
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploadingReviewVideo(false);
    }
  };

  // Review Avatar upload handler
  const handleReviewAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    setUploadingReviewAvatar(true);
    try {
      const res = await apiService.uploadImage(token, file);
      setReferenceForm((prev) => ({ ...prev, avatarUrl: res.url }));
      showToast("Client avatar uploaded!");
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploadingReviewAvatar(false);
    }
  };

  const [newHobbyInput, setNewHobbyInput] = useState("");

  // Upload Progress & Modal Feedback States
  const [cvUploading, setCvUploading] = useState(false);
  const [cvProgress, setCvProgress] = useState(0);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoProgress, setPhotoProgress] = useState(0);

  // Success Dialog State
  const [successDialog, setSuccessDialog] = useState<{
    open: boolean;
    title: string;
    message: string;
  }>({
    open: false,
    title: "",
    message: "",
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [prof, projs, vnts, blgs, exps, edus, refs, shws, msgs] = await Promise.all([
        apiService.getProfile(),
        apiService.getProjects(),
        apiService.getVentures(),
        apiService.getBlogs(),
        apiService.getExperiences("EXPERIENCE"),
        apiService.getExperiences("EDUCATION"),
        apiService.getReferences(),
        apiService.getShowcase(),
        token ? apiService.getMessages(token) : [],
      ]);
      if (prof) setProfile(prof);
      setProjects(projs);
      setVentures(vnts);
      setBlogs(blgs);
      setExperiences(exps);
      setEducationList(edus);
      setReferences(refs);
      setShowcases(shws);
      setMessages(msgs);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadData();
  }, [token]);

  // Tab switch resets view mode to list
  const switchTab = (tab: Tab) => {
    setActiveTab(tab);
    setViewMode("list");
    setSearchQuery("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiService.login(email, password);
      localStorage.setItem("admin_token", res.access_token);
      setToken(res.access_token);
      setEmail("");
      setPassword("");
      showToast("Signed in successfully");
    } catch (err: any) {
      alert(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
  };

  // --- VENTURES CRUD ---
  const openNewVentureForm = () => {
    setEditingVentureId(null);
    setVentureForm({
      title: "",
      tagline: "",
      description: "",
      category: "In-House Venture",
      imageUrl: "",
      linkUrl: "",
      linkText: "Visit Venture",
      status: "ACTIVE",
      revenue: "$1.5k/mo",
    });
    setViewMode("create");
  };

  const openEditVentureForm = (v: VentureData) => {
    setEditingVentureId(v.id || null);
    setVentureForm({
      title: v.title,
      tagline: v.tagline || "",
      description: v.description,
      category: v.category || "In-House Venture",
      imageUrl: v.imageUrl || "",
      linkUrl: v.linkUrl,
      linkText: v.linkText || "Visit Venture",
      status: v.status || "ACTIVE",
      revenue: v.revenue || "",
    });
    setViewMode("edit");
  };

  const handleSaveVenture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      if (editingVentureId) {
        await apiService.updateVenture(token, editingVentureId, ventureForm);
        showToast("Venture updated successfully");
      } else {
        await apiService.createVenture(token, ventureForm);
        showToast("Venture added to database");
      }
      setViewMode("list");
      const updated = await apiService.getVentures();
      setVentures(updated);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVenture = async (id: string) => {
    if (!token || !confirm("Delete this venture?")) return;
    await apiService.deleteVenture(token, id);
    setVentures(ventures.filter((v) => v.id !== id));
    showToast("Venture removed");
  };

  // --- PROJECT CRUD ---
  const openNewProjectForm = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: "",
      subtitle: "",
      description: "",
      technologies: ["Flutter", "Dart"],
      category: "Mobile Application",
      imageUrl: "",
      githubUrl: "",
      liveUrl: "",
      playStoreUrl: "",
      appStoreUrl: "",
      featured: true,
    });
    setViewMode("create");
  };

  const openEditProjectForm = (p: ProjectData) => {
    setEditingProjectId(p.id || null);
    setProjectForm({
      title: p.title,
      subtitle: p.subtitle || "",
      description: p.description,
      technologies: p.technologies || [],
      category: p.category || "Mobile Application",
      imageUrl: p.imageUrl || "",
      githubUrl: p.githubUrl || "",
      liveUrl: p.liveUrl || "",
      playStoreUrl: p.playStoreUrl || "",
      appStoreUrl: p.appStoreUrl || "",
      featured: p.featured ?? true,
    });
    setViewMode("edit");
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      if (editingProjectId) {
        await apiService.updateProject(token, editingProjectId, projectForm);
        showToast("Project updated successfully");
      } else {
        await apiService.createProject(token, projectForm);
        showToast("Project saved successfully");
      }
      setViewMode("list");
      const updated = await apiService.getProjects();
      setProjects(updated);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!token || !confirm("Are you sure you want to delete this project?")) return;
    await apiService.deleteProject(token, id);
    setProjects(projects.filter((p) => p.id !== id));
    showToast("Project deleted");
  };

  // --- BLOG CRUD ---
  const openNewBlogForm = () => {
    setEditingBlogId(null);
    setBlogForm({
      title: "",
      excerpt: "",
      content: "",
      coverImage: "",
      tags: ["Flutter", "Engineering"],
      published: true,
      readingTime: "5 min read",
    });
    setBlogTagsInput("Flutter, Engineering");
    setViewMode("create");
  };

  const openEditBlogForm = (b: BlogData) => {
    setEditingBlogId(b.id || null);
    setBlogForm({
      title: b.title,
      excerpt: b.excerpt,
      content: b.content,
      coverImage: b.coverImage || "",
      tags: b.tags || [],
      published: b.published ?? true,
      readingTime: b.readingTime || "5 min read",
    });
    setBlogTagsInput((b.tags || []).join(", "));
    setViewMode("edit");
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      const tags = blogTagsInput.split(",").map((t) => t.trim()).filter(Boolean);
      if (editingBlogId) {
        await apiService.updateBlog(token, editingBlogId, { ...blogForm, tags });
        showToast("Article updated successfully");
      } else {
        await apiService.createBlog(token, { ...blogForm, tags });
        showToast("Article published successfully");
      }
      setViewMode("list");
      const updated = await apiService.getBlogs();
      setBlogs(updated);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!token || !confirm("Are you sure you want to delete this article?")) return;
    await apiService.deleteBlog(token, id);
    setBlogs(blogs.filter((b) => b.id !== id));
    showToast("Article removed");
  };

  // --- COMPANY / EXPERIENCE CRUD ---
  const openNewCompanyForm = () => {
    setEditingExperienceId(null);
    setCompanyForm({ role: "", company: "", location: "", period: "", details: [], type: "EXPERIENCE" });
    setCompanyDetailsInput("");
    setViewMode("create");
  };

  const handleSaveCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      const details = companyDetailsInput.split("\n").map((d) => d.trim()).filter(Boolean);
      await apiService.createExperience(token, { ...companyForm, details, type: "EXPERIENCE" });
      showToast("Company experience saved");
      setViewMode("list");
      const updated = await apiService.getExperiences("EXPERIENCE");
      setExperiences(updated);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (!token || !confirm("Delete this entry?")) return;
    await apiService.deleteExperience(token, id);
    setExperiences(experiences.filter((e) => e.id !== id));
    setEducationList(educationList.filter((e) => e.id !== id));
    showToast("Entry removed");
  };

  // --- EDUCATION CRUD ---
  const openNewEducationForm = () => {
    setEditingEducationId(null);
    setEducationForm({
      role: "B.Sc. in Computer Science & Engineering",
      company: "",
      location: "",
      period: "",
      details: [],
      type: "EDUCATION",
    });
    setViewMode("create");
  };

  const openEditEducationForm = (edu: ExperienceData) => {
    setEditingEducationId(edu.id || null);
    setEducationForm({
      role: edu.role,
      company: edu.company,
      location: edu.location || "",
      period: edu.period,
      details: edu.details || [],
      type: "EDUCATION",
    });
    setViewMode("edit");
  };

  const handleSaveEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      await apiService.createExperience(token, {
        ...educationForm,
        type: "EDUCATION",
        details: educationForm.details || [],
      });
      showToast("Education record saved");
      setViewMode("list");
      const updated = await apiService.getExperiences("EDUCATION");
      setEducationList(updated);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- SHOWCASE (VIDEO DEMOS) CRUD ---
  const openNewShowcaseForm = () => {
    setEditingShowcaseId(null);
    setShowcaseForm({
      title: "",
      description: "",
      youtubeUrl: "",
      videoFile: "",
      thumbnail: "",
      category: "Product Demo",
    });
    setViewMode("create");
  };

  const openEditShowcaseForm = (s: ShowcaseVideoData) => {
    setEditingShowcaseId(s.id || null);
    setShowcaseForm({
      title: s.title,
      description: s.description || "",
      youtubeUrl: s.youtubeUrl || "",
      videoFile: s.videoFile || "",
      thumbnail: s.thumbnail || "",
      category: s.category || "Product Demo",
      order: s.order || 0,
    });
    setViewMode("edit");
  };

  const handleSaveShowcase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      if (editingShowcaseId) {
        await apiService.updateShowcase(token, editingShowcaseId, showcaseForm);
        showToast("Showcase video updated successfully");
      } else {
        await apiService.createShowcase(token, showcaseForm);
        showToast("Showcase video added");
      }
      setViewMode("list");
      const updated = await apiService.getShowcase();
      setShowcases(updated);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteShowcase = async (id: string) => {
    if (!token || !confirm("Delete this showcase item?")) return;
    await apiService.deleteShowcase(token, id);
    setShowcases(showcases.filter((s) => s.id !== id));
    showToast("Showcase video removed");
  };

  // --- CLIENT REVIEWS / REFERENCES CRUD ---
  const openNewReferenceForm = () => {
    setEditingReferenceId(null);
    setReferenceForm({
      name: "",
      role: "",
      company: "",
      email: "",
      phone: "",
      feedback: "",
      avatarUrl: "",
      rating: 5,
      videoUrl: "",
      videoType: "YOUTUBE",
    });
    setViewMode("create");
  };

  const openEditReferenceForm = (r: ReferenceData) => {
    setEditingReferenceId(r.id || null);
    setReferenceForm({
      name: r.name,
      role: r.role,
      company: r.company,
      email: r.email || "",
      phone: r.phone || "",
      feedback: r.feedback || "",
      avatarUrl: r.avatarUrl || "",
      rating: r.rating || 5,
      videoUrl: r.videoUrl || "",
      videoType: r.videoType || "YOUTUBE",
    });
    setViewMode("edit");
  };

  const handleSaveReference = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      if (editingReferenceId) {
        await apiService.updateReference(token, editingReferenceId, referenceForm);
        showToast("Review updated successfully");
      } else {
        await apiService.createReference(token, referenceForm);
        showToast("Client review saved");
      }
      setViewMode("list");
      const updated = await apiService.getReferences();
      setReferences(updated);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReference = async (id: string) => {
    if (!token || !confirm("Delete review?")) return;
    await apiService.deleteReference(token, id);
    setReferences(references.filter((r) => r.id !== id));
    showToast("Review removed");
  };

  // --- HOBBIES ---
  const handleAddHobby = async () => {
    if (!newHobbyInput.trim() || !token) return;
    const updated = [...(profile.hobbies || []), newHobbyInput.trim()];
    setProfile({ ...profile, hobbies: updated });
    setNewHobbyInput("");
    await apiService.updateProfile(token, { hobbies: updated });
    showToast("Hobby saved");
  };

  const handleRemoveHobby = async (hobby: string) => {
    if (!token) return;
    const updated = (profile.hobbies || []).filter((h) => h !== hobby);
    setProfile({ ...profile, hobbies: updated });
    await apiService.updateProfile(token, { hobbies: updated });
    showToast("Hobby removed");
  };

  // --- PROFILE & SOCIAL LINKS ---
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      await apiService.updateProfile(token, profile);
      setSuccessDialog({
        open: true,
        title: "Saved Successfully!",
        message: "Your profile information, bio, CV, and social links have been updated and are live.",
      });
      showToast("Profile & Links saved");
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- MESSAGES ---
  const handleDeleteMessage = async (id: string) => {
    if (!token) return;
    await apiService.deleteMessage(token, id);
    setMessages(messages.filter((m) => m.id !== id));
    showToast("Message deleted");
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#090d16] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-slate-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-cyan-500/20">
              R
            </div>
            <span className="text-2xl font-black tracking-tight text-white">RakibulHR.Studio</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-black tracking-tight text-white">
            Admin Authentication
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Secure Full-Control Portfolio CMS
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-[#111827] py-8 px-6 shadow-2xl rounded-3xl sm:px-10 border border-slate-800">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-mono font-bold tracking-wider uppercase text-slate-400">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@rakibulhr.dev"
                  className="mt-1.5 block w-full rounded-xl bg-[#090d16] border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold tracking-wider uppercase text-slate-400">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="mt-1.5 block w-full rounded-xl bg-[#090d16] border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-lg shadow-cyan-500/20 text-sm font-extrabold text-slate-950 bg-cyan-400 hover:bg-cyan-300 focus:outline-none transition-all disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Sign in to Dashboard"}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-300 font-medium"
              >
                ← Back to Public Website
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] flex text-slate-100 font-sans antialiased selection:bg-cyan-500/30">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#0d1322] border-r border-slate-800/80 flex flex-col justify-between shrink-0 shadow-2xl z-20">
        <div>
          {/* Brand Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-md shadow-cyan-500/30">
                R
              </div>
              <div>
                <span className="font-black text-white text-base tracking-tight block">RakibulHR</span>
                <span className="text-[10px] font-mono text-cyan-400 block -mt-0.5">Control Studio</span>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Connected" />
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3.5 mb-2 block">
              Menu
            </span>
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "ventures", label: `In-House Ventures (${ventures.length})`, icon: Flame },
              { id: "projects", label: `Projects (${projects.length})`, icon: FolderGit2 },
              { id: "showcase", label: `Showcase Videos (${showcases.length})`, icon: Video },
              { id: "blogs", label: `Articles / Blog (${blogs.length})`, icon: BookOpen },
              { id: "companies", label: `Companies (${experiences.length})`, icon: Briefcase },
              { id: "education", label: `Education (${educationList.length})`, icon: GraduationCap },
              { id: "references", label: `Client Reviews (${references.length})`, icon: Users },
              { id: "hobbies", label: `Hobbies (${profile.hobbies?.length || 0})`, icon: Heart },
              { id: "links", label: "Profile & Links", icon: Globe },
              { id: "messages", label: `Inquiries (${messages.length})`, icon: Mail },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => switchTab(item.id as Tab)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20 font-extrabold"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Bottom Controls */}
        <div className="p-4 border-t border-slate-800/60 space-y-2">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-xl transition-all"
          >
            <ArrowUpRight size={14} className="text-cyan-400" /> View Live Website
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-rose-400 hover:bg-rose-950/30 rounded-xl transition-colors"
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Header Navbar */}
        <header className="h-20 bg-[#0d1322]/80 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {viewMode !== "list" && activeTab !== "dashboard" && activeTab !== "links" && activeTab !== "hobbies" && (
              <button
                onClick={() => setViewMode("list")}
                className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 mr-2 py-1.5 px-3 rounded-lg bg-cyan-950/40 border border-cyan-800/50"
              >
                <ArrowLeft size={14} /> Back to List
              </button>
            )}
            <h1 className="text-xl font-black text-white capitalize tracking-tight">
              {activeTab === "dashboard"
                ? "Overview & Metrics"
                : viewMode === "create"
                ? `Create New ${activeTab.slice(0, -1)}`
                : viewMode === "edit"
                ? `Edit ${activeTab.slice(0, -1)}`
                : activeTab}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {toast && (
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold shadow-lg animate-fade-in">
                <CheckCircle2 size={15} />
                <span>{toast}</span>
              </div>
            )}
            <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center text-xs font-black shadow-md">
                RH
              </div>
              <div>
                <p className="text-xs font-bold text-white">Rakibul Hasan</p>
                <p className="text-[10px] text-cyan-400 font-mono">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body Container */}
        <main className="p-8 space-y-8 flex-1 max-w-7xl mx-auto w-full">
          {/* TAB 1: DASHBOARD METRICS */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Portfolio Projects", value: projects.length, icon: FolderGit2, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
                  { title: "Articles & Blog", value: blogs.length, icon: BookOpen, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
                  { title: "Client Inquiries", value: messages.length, icon: Mail, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
                  { title: "Companies & Roles", value: experiences.length, icon: Briefcase, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={i}
                      className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{stat.title}</span>
                        <div className={`p-2.5 rounded-xl border ${stat.bg} ${stat.color}`}>
                          <Icon size={18} />
                        </div>
                      </div>
                      <div className="mt-5">
                        <span className="text-3xl font-black text-white">{stat.value}</span>
                        <span className="block text-xs font-medium text-slate-500 mt-1">Active in PostgreSQL</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Inquiries & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#0f172a] border border-slate-800/80 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-extrabold text-white text-base">Latest Contact Submissions</h3>
                    <button
                      onClick={() => switchTab("messages")}
                      className="text-xs font-bold text-cyan-400 hover:underline"
                    >
                      View All ({messages.length})
                    </button>
                  </div>
                  {messages.length === 0 ? (
                    <p className="text-xs text-slate-500 py-10 text-center">No messages received yet.</p>
                  ) : (
                    <div className="divide-y divide-slate-800/60">
                      {messages.slice(0, 4).map((msg) => (
                        <div key={msg.id} className="py-3.5 flex justify-between items-start">
                          <div>
                            <p className="text-xs font-bold text-white">{msg.name}</p>
                            <p className="text-xs text-cyan-400 font-mono mt-0.5">{msg.email}</p>
                            <p className="text-xs text-slate-300 mt-1.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                              {msg.message}
                            </p>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-white text-base mb-4">Quick Shortcuts</h3>
                    <div className="space-y-2.5">
                      <button
                        onClick={() => { switchTab("projects"); openNewProjectForm(); }}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs font-bold text-white transition-all"
                      >
                        <span className="flex items-center gap-2"><Plus size={15} className="text-cyan-400" /> New Project</span>
                        <ArrowUpRight size={14} className="text-slate-500" />
                      </button>
                      <button
                        onClick={() => { switchTab("blogs"); openNewBlogForm(); }}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-xs font-bold text-white transition-all"
                      >
                        <span className="flex items-center gap-2"><Plus size={15} className="text-emerald-400" /> New Blog Article</span>
                        <ArrowUpRight size={14} className="text-slate-500" />
                      </button>
                      <button
                        onClick={() => { switchTab("companies"); openNewCompanyForm(); }}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-xs font-bold text-white transition-all"
                      >
                        <span className="flex items-center gap-2"><Plus size={15} className="text-purple-400" /> New Experience</span>
                        <ArrowUpRight size={14} className="text-slate-500" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => switchTab("links")}
                    className="mt-6 w-full py-2.5 bg-cyan-400 text-slate-950 text-xs font-extrabold rounded-xl hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-400/20"
                  >
                    Edit Bio & Profile Links
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IN-HOUSE VENTURES */}
          {activeTab === "ventures" && (
            <div className="space-y-6">
              {viewMode === "list" ? (
                <>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0f172a] border border-slate-800/80 p-5 rounded-2xl shadow-xl">
                    <div>
                      <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                        <Flame className="text-amber-400" size={20} />
                        In-House Ventures & Income Sites
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Manage your own internal SaaS products, income sites, and commercial ventures
                      </p>
                    </div>
                    <button
                      onClick={openNewVentureForm}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-amber-400/20"
                    >
                      <Plus size={16} /> Add New Venture
                    </button>
                  </div>

                  {/* List / Table of Ventures */}
                  <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#131d33] border-b border-slate-800 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          <th className="py-4 px-6">Venture</th>
                          <th className="py-4 px-6">Category</th>
                          <th className="py-4 px-6">Status / Revenue</th>
                          <th className="py-4 px-6">Link</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-xs">
                        {ventures.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="py-12 text-center text-slate-500">
                              No ventures found. Click "Add New Venture" above to create one.
                            </td>
                          </tr>
                        ) : (
                          ventures.map((v) => (
                            <tr key={v.id} className="hover:bg-slate-800/30 transition-colors">
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-3">
                                  {v.imageUrl ? (
                                    <img
                                      src={v.imageUrl}
                                      alt={v.title}
                                      className="w-10 h-10 rounded-lg object-cover border border-slate-700 bg-slate-900 shrink-0"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                                      <Flame size={18} />
                                    </div>
                                  )}
                                  <div>
                                    <span className="font-extrabold text-white text-sm block">{v.title}</span>
                                    <span className="text-slate-400 text-xs block line-clamp-1">{v.tagline || v.description}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-amber-300 font-mono text-[11px] font-semibold">
                                  {v.category}
                                </span>
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                                    v.status === "ACTIVE" 
                                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                                      : "bg-slate-800 text-slate-400 border border-slate-700"
                                  }`}>
                                    {v.status}
                                  </span>
                                  {v.revenue && (
                                    <span className="text-slate-300 font-mono font-bold text-xs">
                                      {v.revenue}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                {v.linkUrl ? (
                                  <a
                                    href={v.linkUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-cyan-400 hover:underline flex items-center gap-1 font-mono text-xs"
                                  >
                                    {v.linkText || "Visit"} <ExternalLink size={12} />
                                  </a>
                                ) : (
                                  <span className="text-slate-600 font-mono text-xs">—</span>
                                )}
                              </td>
                              <td className="py-4 px-6 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => openEditVentureForm(v)}
                                    className="p-2 text-slate-400 hover:text-amber-300 hover:bg-slate-800 rounded-lg transition-colors"
                                    title="Edit Venture"
                                  >
                                    <Edit2 size={16} />
                                  </button>
                                  <button
                                    onClick={() => v.id && handleDeleteVenture(v.id)}
                                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors"
                                    title="Delete Venture"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                /* CREATE / EDIT VENTURE FULL VIEW */
                <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-8 shadow-2xl space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                    <div>
                      <h3 className="text-xl font-black text-white flex items-center gap-2">
                        <Flame className="text-amber-400" size={22} />
                        {editingVentureId ? "Edit Venture Details" : "Create New In-House Venture"}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Add title, tagline, revenue metrics, external URLs, and upload cover artwork
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setViewMode("list")}
                      className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveVenture} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                          Venture / Site Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={ventureForm.title}
                          onChange={(e) => setVentureForm({ ...ventureForm, title: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                          placeholder="e.g. FlutterFlow SaaS Kit, DevIncomeHub"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                          Tagline / Subtitle
                        </label>
                        <input
                          type="text"
                          value={ventureForm.tagline || ""}
                          onChange={(e) => setVentureForm({ ...ventureForm, tagline: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                          placeholder="e.g. High-conversion mobile boilerplate for indie hackers"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                          Category
                        </label>
                        <input
                          type="text"
                          value={ventureForm.category || "In-House Venture"}
                          onChange={(e) => setVentureForm({ ...ventureForm, category: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                          placeholder="e.g. Micro-SaaS, Digital Product, Content Hub"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                          Status
                        </label>
                        <select
                          value={ventureForm.status || "ACTIVE"}
                          onChange={(e) => setVentureForm({ ...ventureForm, status: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="GROWING">GROWING</option>
                          <option value="BETA">BETA</option>
                          <option value="ACQUIRED">ACQUIRED</option>
                          <option value="INACTIVE">INACTIVE</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                          Monthly Revenue / Metric
                        </label>
                        <input
                          type="text"
                          value={ventureForm.revenue || ""}
                          onChange={(e) => setVentureForm({ ...ventureForm, revenue: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                          placeholder="e.g. $2.4k/mo, 10k Active Users"
                        />
                      </div>
                    </div>

                    {/* Image Upload from Device or URL */}
                    <div className="p-4 rounded-xl bg-[#090d16] border border-slate-800 space-y-3">
                      <label className="block text-xs font-mono font-bold text-slate-300 uppercase">
                        Venture Cover / Logo (Device Upload or URL)
                      </label>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors border border-slate-700 shrink-0">
                          {uploadingVentureImage ? (
                            <>
                              <Loader2 size={16} className="animate-spin text-amber-400" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload size={16} className="text-amber-400" />
                              Upload From Device
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            disabled={uploadingVentureImage}
                            onChange={handleVentureFileUpload}
                            className="hidden"
                          />
                        </label>
                        <span className="text-xs text-slate-500 font-mono">OR paste URL:</span>
                        <input
                          type="url"
                          value={ventureForm.imageUrl || ""}
                          onChange={(e) => setVentureForm({ ...ventureForm, imageUrl: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="flex-1 w-full bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      {ventureForm.imageUrl && (
                        <div className="pt-2 flex items-center gap-3">
                          <img
                            src={ventureForm.imageUrl}
                            alt="Preview"
                            className="h-16 w-28 object-cover rounded-lg border border-slate-700"
                          />
                          <button
                            type="button"
                            onClick={() => setVentureForm({ ...ventureForm, imageUrl: "" })}
                            className="text-xs text-rose-400 hover:underline"
                          >
                            Remove image
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                          External Link URL
                        </label>
                        <input
                          type="url"
                          value={ventureForm.linkUrl || ""}
                          onChange={(e) => setVentureForm({ ...ventureForm, linkUrl: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                          placeholder="https://myventure.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                          Link Button Text
                        </label>
                        <input
                          type="text"
                          value={ventureForm.linkText || "Visit Venture"}
                          onChange={(e) => setVentureForm({ ...ventureForm, linkText: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                          placeholder="e.g. Visit Website, Try Demo"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                        Description / Overview *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={ventureForm.description}
                        onChange={(e) => setVentureForm({ ...ventureForm, description: e.target.value })}
                        className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                        placeholder="Write a clear overview of the venture, market traction, technical stack, or purpose..."
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-7 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-amber-400/20"
                      >
                        {editingVentureId ? "Save Changes" : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode("list")}
                        className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              {viewMode === "list" ? (
                <>
                  {/* Top Header with Add Button */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0f172a] border border-slate-800/80 p-5 rounded-2xl shadow-xl">
                    <div>
                      <h3 className="text-lg font-black text-white tracking-tight">Portfolio Projects</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Manage case studies, store links, and technology stacks</p>
                    </div>
                    <button
                      onClick={openNewProjectForm}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-cyan-400/20"
                    >
                      <Plus size={16} /> Add New Project
                    </button>
                  </div>

                  {/* List / Table of Projects */}
                  <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#131d33] border-b border-slate-800 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          <th className="py-4 px-6">Project Title</th>
                          <th className="py-4 px-6">Category</th>
                          <th className="py-4 px-6">Technologies</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-xs">
                        {projects.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="py-12 text-center text-slate-500">
                              No projects found. Click "Add New Project" above to create one.
                            </td>
                          </tr>
                        ) : (
                          projects.map((p) => (
                            <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                              <td className="py-4 px-6">
                                <span className="font-extrabold text-white text-sm block">{p.title}</span>
                                <span className="text-slate-400 text-xs block line-clamp-1 mt-0.5">{p.description}</span>
                              </td>
                              <td className="py-4 px-6">
                                <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-[11px] font-semibold">
                                  {p.category}
                                </span>
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex flex-wrap gap-1 max-w-sm">
                                  {p.technologies.map((t, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 text-slate-300 text-[10px] font-mono font-medium"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="py-4 px-6 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => openEditProjectForm(p)}
                                    className="p-2 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 rounded-lg transition-colors"
                                    title="Edit Project"
                                  >
                                    <Edit2 size={16} />
                                  </button>
                                  <button
                                    onClick={() => p.id && handleDeleteProject(p.id)}
                                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors"
                                    title="Delete Project"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                /* CREATE / EDIT PROJECT FULL SCREEN VIEW */
                <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-8 shadow-2xl space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                    <div>
                      <h3 className="text-xl font-black text-white">
                        {editingProjectId ? "Edit Project Details" : "Create New Project"}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">Configure project titles, technology tags, and marketplace URLs</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setViewMode("list")}
                      className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProject} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                          Project Title *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Evacado - Envato Sales Master"
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                          Category *
                        </label>
                        <select
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                        >
                          <option value="Mobile Application">Mobile Application (Flutter / Native)</option>
                          <option value="Web Platform">Web Platform / Frontend</option>
                          <option value="Full-Stack System">Full-Stack System</option>
                          <option value="Open-Source Package">Open-Source Package / Plugin</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                        Description *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Detail features, architecture (Bloc/Riverpod), and problems solved..."
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    {/* Tech Selector */}
                    <div>
                      <TechSelector
                        selected={projectForm.technologies}
                        onChange={(techs) => setProjectForm({ ...projectForm, technologies: techs })}
                      />
                    </div>

                    {/* Media Upload from Device or Paste URL */}
                    <div className="p-5 rounded-2xl bg-[#090d16] border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="block text-xs font-mono font-bold text-slate-300 uppercase">
                            Project Cover Image
                          </label>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Upload screenshot directly from your Mac / device, or paste a URL
                          </p>
                        </div>
                        {projectForm.imageUrl && (
                          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 size={12} /> Image Attached
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Option A: Direct Device File Upload */}
                        <div className="border border-dashed border-slate-700 hover:border-cyan-400/60 rounded-xl p-4 flex flex-col items-center justify-center text-center bg-[#0d1322]/50 transition-colors">
                          <input
                            type="file"
                            id="project-file-upload"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <label
                            htmlFor="project-file-upload"
                            className="cursor-pointer flex flex-col items-center gap-2"
                          >
                            <div className="p-3 rounded-full bg-cyan-950/40 text-cyan-400 border border-cyan-800/60">
                              {uploadingImage ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />}
                            </div>
                            <span className="text-xs font-bold text-white">
                              {uploadingImage ? "Uploading from Mac..." : "Upload from Device"}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              Supports PNG, JPG, WEBP, SVG up to 10MB
                            </span>
                          </label>
                        </div>

                        {/* Option B: Direct URL Input & Preview */}
                        <div className="space-y-2">
                          <label className="block text-[11px] font-mono text-slate-400 uppercase">
                            Or Paste Image URL
                          </label>
                          <input
                            type="text"
                            placeholder="https://images.unsplash.com/... or raw image URL"
                            value={projectForm.imageUrl || ""}
                            onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                            className="w-full bg-[#0d1322] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                          />
                          {projectForm.imageUrl && (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-700 max-h-28">
                              <img
                                src={projectForm.imageUrl}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                          GitHub Repository URL
                        </label>
                        <input
                          type="text"
                          placeholder="https://github.com/..."
                          value={projectForm.githubUrl || ""}
                          onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                          Google Play Store URL
                        </label>
                        <input
                          type="text"
                          placeholder="https://play.google.com/..."
                          value={projectForm.playStoreUrl || ""}
                          onChange={(e) => setProjectForm({ ...projectForm, playStoreUrl: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                          Live / Apple App Store URL
                        </label>
                        <input
                          type="text"
                          placeholder="https://..."
                          value={projectForm.liveUrl || ""}
                          onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-7 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-cyan-400/20"
                      >
                        {editingProjectId ? "Save Changes" : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode("list")}
                        className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB: SHOWCASE VIDEOS (LAUNCH ARCHIVE) */}
          {activeTab === "showcase" && (
            <div className="space-y-6">
              {viewMode === "list" ? (
                <>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0f172a] border border-slate-800/80 p-5 rounded-2xl shadow-xl">
                    <div>
                      <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                        <Video className="text-cyan-400" size={20} />
                        Launch Archive & Showcase Demos
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Manage project walkthroughs, YouTube product videos, and uploaded device MP4 clips
                      </p>
                    </div>
                    <button
                      onClick={openNewShowcaseForm}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-cyan-400/20"
                    >
                      <Plus size={16} /> Add Showcase Video
                    </button>
                  </div>

                  {/* List / Table of Showcase Videos */}
                  <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#131d33] border-b border-slate-800 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          <th className="py-4 px-6">Video / Title</th>
                          <th className="py-4 px-6">Category</th>
                          <th className="py-4 px-6">Source Type</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-xs">
                        {showcases.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="py-12 text-center text-slate-500">
                              No showcase videos found. Click "Add Showcase Video" to add one.
                            </td>
                          </tr>
                        ) : (
                          showcases.map((s) => (
                            <tr key={s.id} className="hover:bg-slate-800/30 transition-colors">
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-3">
                                  {s.thumbnail ? (
                                    <img
                                      src={s.thumbnail}
                                      alt={s.title}
                                      className="w-12 h-8 rounded-lg object-cover border border-slate-700 bg-slate-900 shrink-0"
                                    />
                                  ) : (
                                    <div className="w-12 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300 shrink-0">
                                      <Video size={16} />
                                    </div>
                                  )}
                                  <div>
                                    <span className="font-extrabold text-white text-sm block">{s.title}</span>
                                    <span className="text-slate-400 text-xs block line-clamp-1">{s.description}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-[11px]">
                                  {s.category || "Demo"}
                                </span>
                              </td>
                              <td className="py-4 px-6">
                                {s.videoFile ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                    Device Upload (MP4)
                                  </span>
                                ) : (
                                  <a
                                    href={s.youtubeUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-rose-400 hover:underline flex items-center gap-1 font-mono text-xs"
                                  >
                                    YouTube Link <ExternalLink size={12} />
                                  </a>
                                )}
                              </td>
                              <td className="py-4 px-6 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => openEditShowcaseForm(s)}
                                    className="p-2 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 rounded-lg transition-colors"
                                    title="Edit Video"
                                  >
                                    <Edit2 size={16} />
                                  </button>
                                  <button
                                    onClick={() => s.id && handleDeleteShowcase(s.id)}
                                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors"
                                    title="Delete Video"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                /* CREATE / EDIT SHOWCASE VIDEO */
                <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-8 shadow-2xl space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                    <div>
                      <h3 className="text-xl font-black text-white flex items-center gap-2">
                        <Video className="text-cyan-400" size={22} />
                        {editingShowcaseId ? "Edit Showcase Video" : "Add Showcase Video"}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Add project title, category, and attach a YouTube link or upload directly from device
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setViewMode("list")}
                      className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveShowcase} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                          Project / Video Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={showcaseForm.title}
                          onChange={(e) => setShowcaseForm({ ...showcaseForm, title: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                          placeholder="e.g. jahkno Radio App Demo, FitPulse Walkthrough"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                          Category / Tag
                        </label>
                        <input
                          type="text"
                          value={showcaseForm.category || "Product Demo"}
                          onChange={(e) => setShowcaseForm({ ...showcaseForm, category: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                          placeholder="e.g. Mobile Demo, Clean Architecture"
                        />
                      </div>
                    </div>

                    {/* YouTube URL or Direct Upload */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                          YouTube URL or ID
                        </label>
                        <input
                          type="text"
                          value={showcaseForm.youtubeUrl || ""}
                          onChange={(e) => setShowcaseForm({ ...showcaseForm, youtubeUrl: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                          placeholder="https://www.youtube.com/watch?v=... or AgC_Wq7aWYU"
                        />
                      </div>

                      {/* Device Video Upload */}
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                          OR Upload Video From Device (MP4/WebM)
                        </label>
                        <div className="flex items-center gap-3">
                          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors border border-slate-700">
                            {uploadingShowcaseVideo ? (
                              <>
                                <Loader2 size={16} className="animate-spin text-cyan-400" />
                                Uploading Video...
                              </>
                            ) : (
                              <>
                                <Upload size={16} className="text-cyan-400" />
                                Select Video File
                              </>
                            )}
                            <input
                              type="file"
                              accept="video/*"
                              disabled={uploadingShowcaseVideo}
                              onChange={handleShowcaseVideoUpload}
                              className="hidden"
                            />
                          </label>
                          {showcaseForm.videoFile && (
                            <span className="text-xs font-mono text-emerald-400 truncate max-w-xs">
                              Video Ready!
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                        Description / Walkthrough Summary
                      </label>
                      <textarea
                        rows={3}
                        value={showcaseForm.description || ""}
                        onChange={(e) => setShowcaseForm({ ...showcaseForm, description: e.target.value })}
                        className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                        placeholder="Brief overview of features demonstrated in this video..."
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-7 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-cyan-400/20"
                      >
                        {editingShowcaseId ? "Save Changes" : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode("list")}
                        className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ARTICLES & BLOGS */}
          {activeTab === "blogs" && (
            <div className="space-y-6">
              {viewMode === "list" ? (
                <>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0f172a] border border-slate-800/80 p-5 rounded-2xl shadow-xl">
                    <div>
                      <h3 className="text-lg font-black text-white tracking-tight">Articles & Blog Posts</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Publish engineering insights, architecture patterns, and tutorials</p>
                    </div>
                    <button
                      onClick={openNewBlogForm}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-emerald-400/20"
                    >
                      <Plus size={16} /> New Article
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {blogs.length === 0 ? (
                      <div className="col-span-2 bg-[#0f172a] border border-slate-800/80 p-12 text-center text-slate-500 rounded-2xl">
                        No articles published yet. Click "New Article" to create your first tech post.
                      </div>
                    ) : (
                      blogs.map((b) => (
                        <div key={b.id} className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all">
                          <div>
                            <div className="flex justify-between items-start">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                                {b.readingTime || "5 min read"}
                              </span>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => openEditBlogForm(b)}
                                  className="text-slate-400 hover:text-cyan-400 p-1 rounded-lg hover:bg-slate-800 transition-colors"
                                  title="Edit Article"
                                >
                                  <Edit2 size={15} />
                                </button>
                                <button
                                  onClick={() => b.id && handleDeleteBlog(b.id)}
                                  className="text-slate-400 hover:text-rose-400 p-1 rounded-lg hover:bg-rose-950/30 transition-colors"
                                  title="Delete Article"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </div>
                            <h4 className="font-extrabold text-white text-base mt-3">{b.title}</h4>
                            <p className="text-xs text-slate-400 mt-1.5 line-clamp-3 leading-relaxed">{b.excerpt}</p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-slate-800/80">
                            {b.tags.map((t, idx) => (
                              <span key={idx} className="text-[10px] font-mono bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                                #{t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              ) : (
                /* CREATE BLOG FULL SCREEN VIEW */
                <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-8 shadow-2xl space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                    <div>
                      <h3 className="text-xl font-black text-white">
                        {editingBlogId ? "Edit Tech Article" : "Create Tech Article"}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">Write tutorials and insights for other engineers and recruiters</p>
                    </div>
                    <button onClick={() => setViewMode("list")} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveBlog} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                          Article Title *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Architectural Patterns in Large-Scale Flutter Apps"
                          value={blogForm.title}
                          onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                          Tags (Comma-Separated)
                        </label>
                        <input
                          type="text"
                          value={blogTagsInput}
                          onChange={(e) => setBlogTagsInput(e.target.value)}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    {/* Blog Cover Image Section */}
                    <div className="p-5 rounded-2xl bg-[#090d16] border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="block text-xs font-mono font-bold text-slate-300 uppercase">
                            Article Cover Image
                          </label>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Upload article header directly from your Mac / device, or paste a URL
                          </p>
                        </div>
                        {blogForm.coverImage && (
                          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 size={12} /> Image Attached
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Device Upload */}
                        <div className="border border-dashed border-slate-700 hover:border-emerald-400/60 rounded-xl p-4 flex flex-col items-center justify-center text-center bg-[#0d1322]/50 transition-colors">
                          <input
                            type="file"
                            id="blog-file-upload"
                            accept="image/*"
                            onChange={handleBlogFileUpload}
                            className="hidden"
                          />
                          <label
                            htmlFor="blog-file-upload"
                            className="cursor-pointer flex flex-col items-center gap-2"
                          >
                            <div className="p-3 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-800/60">
                              {uploadingBlogImage ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />}
                            </div>
                            <span className="text-xs font-bold text-white">
                              {uploadingBlogImage ? "Uploading from Mac..." : "Upload Cover from Device"}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              Supports PNG, JPG, WEBP, SVG
                            </span>
                          </label>
                        </div>

                        {/* Paste URL & Preview */}
                        <div className="space-y-2">
                          <label className="block text-[11px] font-mono text-slate-400 uppercase">
                            Or Paste Image URL
                          </label>
                          <input
                            type="text"
                            placeholder="https://images.unsplash.com/... or raw image URL"
                            value={blogForm.coverImage || ""}
                            onChange={(e) => setBlogForm({ ...blogForm, coverImage: e.target.value })}
                            className="w-full bg-[#0d1322] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                          />
                          {blogForm.coverImage && (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-700 max-h-28">
                              <img
                                src={blogForm.coverImage}
                                alt="Blog Cover Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                        Short Summary / Excerpt *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="A concise 1-2 sentence preview..."
                        value={blogForm.excerpt}
                        onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                        className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                        Article Content (Markdown Supported) *
                      </label>
                      <textarea
                        required
                        rows={10}
                        placeholder="Write detailed explanations, architecture breakdown, and code snippets..."
                        value={blogForm.content}
                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                        className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-7 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-emerald-400/20"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode("list")}
                        className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: COMPANIES */}
          {activeTab === "companies" && (
            <div className="space-y-6">
              {viewMode === "list" ? (
                <>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0f172a] border border-slate-800/80 p-5 rounded-2xl shadow-xl">
                    <div>
                      <h3 className="text-lg font-black text-white tracking-tight">Work Experience & Companies</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Past and current organizational roles</p>
                    </div>
                    <button
                      onClick={openNewCompanyForm}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-cyan-400/20"
                    >
                      <Plus size={16} /> Add Experience
                    </button>
                  </div>

                  <div className="space-y-3">
                    {experiences.length === 0 ? (
                      <div className="bg-[#0f172a] border border-slate-800/80 p-12 text-center text-slate-500 rounded-2xl">
                        No work experience added yet.
                      </div>
                    ) : (
                      experiences.map((exp) => (
                        <div key={exp.id} className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-5 flex justify-between items-center shadow-xl">
                          <div>
                            <h4 className="font-extrabold text-white text-base">
                              {exp.role} <span className="text-cyan-400 font-normal">at {exp.company}</span>
                            </h4>
                            <p className="text-xs text-slate-400 font-mono mt-0.5">{exp.period} • {exp.location}</p>
                          </div>
                          <button
                            onClick={() => exp.id && handleDeleteExperience(exp.id)}
                            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </>
              ) : (
                <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-8 shadow-2xl space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                    <div>
                      <h3 className="text-xl font-black text-white">Add Work Experience</h3>
                      <p className="text-xs text-slate-400 mt-1">Specify role responsibilities and duration</p>
                    </div>
                    <button onClick={() => setViewMode("list")} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveCompany} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">Role / Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="Lead Mobile Engineer"
                          value={companyForm.role}
                          onChange={(e) => setCompanyForm({ ...companyForm, role: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">Company Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Bponi Technologies"
                          value={companyForm.company}
                          onChange={(e) => setCompanyForm({ ...companyForm, company: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">Period *</label>
                        <input
                          type="text"
                          required
                          placeholder="2023 - Present"
                          value={companyForm.period}
                          onChange={(e) => setCompanyForm({ ...companyForm, period: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">Location</label>
                        <input
                          type="text"
                          placeholder="Dhaka, Bangladesh"
                          value={companyForm.location || ""}
                          onChange={(e) => setCompanyForm({ ...companyForm, location: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                        Key Responsibilities (One line each)
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Architected mobile apps using Bloc&#10;Integrated REST API and payment gateways"
                        value={companyDetailsInput}
                        onChange={(e) => setCompanyDetailsInput(e.target.value)}
                        className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-7 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-cyan-400/20"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode("list")}
                        className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: EDUCATION */}
          {activeTab === "education" && (
            <div className="space-y-6">
              {viewMode === "list" ? (
                <>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0f172a] border border-slate-800/80 p-5 rounded-2xl shadow-xl">
                    <div>
                      <h3 className="text-lg font-black text-white tracking-tight">Education & Degrees</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Academic qualifications and certifications</p>
                    </div>
                    <button
                      onClick={openNewEducationForm}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-cyan-400/20"
                    >
                      <Plus size={16} /> Add Degree
                    </button>
                  </div>

                  <div className="space-y-3">
                    {educationList.length === 0 ? (
                      <div className="bg-[#0f172a] border border-slate-800/80 p-12 text-center text-slate-500 rounded-2xl">
                        No education records found.
                      </div>
                    ) : (
                      educationList.map((edu) => (
                        <div key={edu.id} className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-5 flex justify-between items-center shadow-xl">
                          <div>
                            <h4 className="font-extrabold text-white text-base">{edu.role}</h4>
                            <p className="text-xs text-slate-400 font-mono mt-0.5">{edu.company} ({edu.period})</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openEditEducationForm(edu)}
                              className="text-slate-400 hover:text-cyan-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                              title="Edit Degree"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => edu.id && handleDeleteExperience(edu.id)}
                              className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-950/30 transition-colors"
                              title="Delete Degree"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              ) : (
                <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-8 shadow-2xl space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                    <div>
                      <h3 className="text-xl font-black text-white">Add Academic Qualification</h3>
                      <p className="text-xs text-slate-400 mt-1">Specify degree and institution name</p>
                    </div>
                    <button onClick={() => setViewMode("list")} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveEducation} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">Degree / Program *</label>
                        <input
                          type="text"
                          required
                          value={educationForm.role}
                          onChange={(e) => setEducationForm({ ...educationForm, role: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">University / Institution *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. University of Dhaka"
                          value={educationForm.company}
                          onChange={(e) => setEducationForm({ ...educationForm, company: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">Passing Year / Period *</label>
                        <input
                          type="text"
                          required
                          placeholder="2019 - 2023"
                          value={educationForm.period}
                          onChange={(e) => setEducationForm({ ...educationForm, period: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">Location</label>
                        <input
                          type="text"
                          placeholder="Dhaka, Bangladesh"
                          value={educationForm.location || ""}
                          onChange={(e) => setEducationForm({ ...educationForm, location: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-7 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-cyan-400/20"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode("list")}
                        className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB: CLIENT REVIEWS & REFERENCES */}
          {activeTab === "references" && (
            <div className="space-y-6">
              {viewMode === "list" ? (
                <>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0f172a] border border-slate-800/80 p-5 rounded-2xl shadow-xl">
                    <div>
                      <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                        <Users className="text-cyan-400" size={20} />
                        Client Reviews & Testimonials
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Manage client reviews, ratings, photos, and attached YouTube/device video testimonials
                      </p>
                    </div>
                    <button
                      onClick={openNewReferenceForm}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-cyan-400/20"
                    >
                      <Plus size={16} /> Add Client Review
                    </button>
                  </div>

                  <div className="space-y-3">
                    {references.length === 0 ? (
                      <div className="bg-[#0f172a] border border-slate-800/80 p-12 text-center text-slate-500 rounded-2xl">
                        No client reviews added yet. Click "Add Client Review" to create one.
                      </div>
                    ) : (
                      references.map((r) => (
                        <div key={r.id} className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
                          <div className="flex items-start gap-4">
                            {r.avatarUrl ? (
                              <img src={r.avatarUrl} alt={r.name} className="w-12 h-12 rounded-xl object-cover border border-slate-700 bg-slate-900 shrink-0" />
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300 font-bold shrink-0">
                                {r.name.slice(0, 2).toUpperCase()}
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-extrabold text-white text-base">
                                  {r.name}
                                </h4>
                                <span className="text-cyan-400 text-xs">· {r.role} {r.company ? `at ${r.company}` : ""}</span>
                                {r.videoUrl && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                                    <Video size={10} /> Video Attached
                                  </span>
                                )}
                              </div>
                              {r.email && <p className="text-xs text-slate-400 font-mono mt-0.5">{r.email}</p>}
                              {r.feedback && (
                                <p className="text-xs italic text-slate-300 mt-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                                  "{r.feedback}"
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              onClick={() => openEditReferenceForm(r)}
                              className="p-2 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 rounded-lg transition-colors"
                              title="Edit Review"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => r.id && handleDeleteReference(r.id)}
                              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors"
                              title="Delete Review"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              ) : (
                /* CREATE / EDIT CLIENT REVIEW */
                <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-8 shadow-2xl space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                    <div>
                      <h3 className="text-xl font-black text-white flex items-center gap-2">
                        <Users className="text-cyan-400" size={22} />
                        {editingReferenceId ? "Edit Client Review" : "Add Client Review & Video"}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Add client recommendation, avatar picture, star rating, and attach a video URL or upload
                      </p>
                    </div>
                    <button onClick={() => setViewMode("list")} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveReference} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">Client Name *</label>
                        <input
                          type="text"
                          required
                          value={referenceForm.name}
                          onChange={(e) => setReferenceForm({ ...referenceForm, name: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                          placeholder="e.g. David Vance"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">Role & Company *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Founder at AppLaunch Studio"
                          value={referenceForm.role}
                          onChange={(e) => setReferenceForm({ ...referenceForm, role: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">Company Name</label>
                        <input
                          type="text"
                          placeholder="DevsNest LLC"
                          value={referenceForm.company}
                          onChange={(e) => setReferenceForm({ ...referenceForm, company: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">Rating (1 to 5 Stars)</label>
                        <select
                          value={referenceForm.rating || 5}
                          onChange={(e) => setReferenceForm({ ...referenceForm, rating: Number(e.target.value) })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                        >
                          <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                          <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                          <option value={3}>⭐⭐⭐ (3 Stars)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">Email Address (Optional)</label>
                        <input
                          type="text"
                          placeholder="alex@company.com"
                          value={referenceForm.email || ""}
                          onChange={(e) => setReferenceForm({ ...referenceForm, email: e.target.value })}
                          className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    {/* Client Avatar Upload / URL */}
                    <div className="p-4 rounded-xl bg-[#090d16] border border-slate-800 space-y-3">
                      <label className="block text-xs font-mono font-bold text-slate-300 uppercase">
                        Client Photo / Avatar
                      </label>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors border border-slate-700 shrink-0">
                          {uploadingReviewAvatar ? (
                            <>
                              <Loader2 size={16} className="animate-spin text-cyan-400" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload size={16} className="text-cyan-400" />
                              Upload Client Photo
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            disabled={uploadingReviewAvatar}
                            onChange={handleReviewAvatarUpload}
                            className="hidden"
                          />
                        </label>
                        <span className="text-xs text-slate-500 font-mono">OR paste Image URL:</span>
                        <input
                          type="url"
                          value={referenceForm.avatarUrl || ""}
                          onChange={(e) => setReferenceForm({ ...referenceForm, avatarUrl: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="flex-1 w-full bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    {/* Optional Video Review (YouTube or Device Upload) */}
                    <div className="p-4 rounded-xl bg-[#090d16] border border-slate-800 space-y-3">
                      <label className="block text-xs font-mono font-bold text-slate-300 uppercase flex items-center gap-2">
                        <Video size={14} className="text-purple-400" />
                        Optional Video Review (YouTube Link OR Upload from Device)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 mb-1">
                            YouTube URL / ID:
                          </label>
                          <input
                            type="text"
                            placeholder="https://www.youtube.com/watch?v=..."
                            value={referenceForm.videoUrl || ""}
                            onChange={(e) => setReferenceForm({ ...referenceForm, videoUrl: e.target.value, videoType: "YOUTUBE" })}
                            className="w-full bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 mb-1">
                            Upload Video File (MP4/WebM):
                          </label>
                          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors border border-slate-700">
                            {uploadingReviewVideo ? (
                              <>
                                <Loader2 size={16} className="animate-spin text-purple-400" />
                                Uploading Video...
                              </>
                            ) : (
                              <>
                                <Upload size={16} className="text-purple-400" />
                                Choose Video From Device
                              </>
                            )}
                            <input
                              type="file"
                              accept="video/*"
                              disabled={uploadingReviewVideo}
                              onChange={handleReviewVideoUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                      {referenceForm.videoUrl && (
                        <div className="text-xs font-mono text-emerald-400 flex items-center gap-2 pt-1">
                          <CheckCircle2 size={14} /> Attached Video Source Ready
                          <button
                            type="button"
                            onClick={() => setReferenceForm({ ...referenceForm, videoUrl: "", videoType: "NONE" })}
                            className="text-rose-400 hover:underline ml-2"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">Testimonial / Review Text *</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Write the client's detailed feedback, project results, or recommendation..."
                        value={referenceForm.feedback || ""}
                        onChange={(e) => setReferenceForm({ ...referenceForm, feedback: e.target.value })}
                        className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-7 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-cyan-400/20"
                      >
                        {editingReferenceId ? "Save Changes" : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode("list")}
                        className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: HOBBIES */}
          {activeTab === "hobbies" && (
            <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-8 shadow-xl space-y-6">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Heart size={18} className="text-rose-500 fill-rose-500" />
                  Hobbies & Interests
                </h3>
                <p className="text-xs text-slate-400 mt-1">Personal passions displayed on your public profile</p>
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="e.g. Open Source, Cloud Architecture, Drone Photography..."
                  value={newHobbyInput}
                  onChange={(e) => setNewHobbyInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddHobby())}
                  className="flex-1 bg-[#090d16] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={handleAddHobby}
                  className="px-6 py-3 bg-cyan-400 text-slate-950 font-black rounded-xl text-xs hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-400/20"
                >
                  Add Hobby
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-3">
                {(profile.hobbies || []).map((h, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 text-xs font-mono font-bold"
                  >
                    {h}
                    <button onClick={() => handleRemoveHobby(h)} className="text-slate-500 hover:text-rose-400 ml-1">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: PROFILE & SOCIAL LINKS */}
          {activeTab === "links" && (
            <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-8 shadow-xl space-y-6">
              <div>
                <h3 className="text-lg font-black text-white">Profile, Bio & Social Links</h3>
                <p className="text-xs text-slate-400 mt-1">Configure your personal brand, bio, and social media presence</p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">Professional Title</label>
                    <input
                      type="text"
                      value={profile.title}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                      className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">Headline / Elevator Pitch</label>
                  <input
                    type="text"
                    value={profile.headline}
                    onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                    className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">GitHub URL</label>
                    <input
                      type="text"
                      value={profile.githubUrl || ""}
                      onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                      className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">LinkedIn URL</label>
                    <input
                      type="text"
                      value={profile.linkedinUrl || ""}
                      onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                      className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">Contact Email</label>
                    <input
                      type="email"
                      value={profile.email || ""}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">WhatsApp (e.g. +8801700000000)</label>
                    <input
                      type="text"
                      placeholder="+8801..."
                      value={profile.whatsapp || ""}
                      onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
                      className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">Location</label>
                    <input
                      type="text"
                      value={profile.location || ""}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="w-full bg-[#090d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* CV / Resume Upload & Direct URL */}
                <div className="p-5 rounded-2xl border border-slate-800 bg-[#090d16]/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-xs font-mono font-bold text-cyan-400 uppercase">CV / Resume Document</label>
                      <p className="text-[11px] text-slate-400 mt-0.5">Upload a PDF/Word CV or enter an external document URL</p>
                    </div>
                    {profile.resumeUrl && (
                      <a
                        href={profile.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-mono"
                      >
                        <ExternalLink size={12} />
                        View Current CV
                      </a>
                    )}
                  </div>

                  {/* Animated Progress Bar during upload */}
                  {cvUploading && (
                    <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30">
                      <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
                        <span className="flex items-center gap-1.5">
                          <Loader2 size={13} className="animate-spin text-cyan-400" />
                          Uploading CV to Cloudinary...
                        </span>
                        <span className="font-bold">{cvProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-2 rounded-full transition-all duration-200"
                          style={{ width: `${cvProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Paste PDF link or upload via button ->"
                      value={profile.resumeUrl || ""}
                      onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                      className="flex-1 bg-black/40 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                    <label className={`cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-bold transition-all shrink-0 ${cvUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                      {cvUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                      <span>{cvUploading ? "Uploading..." : "Upload CV (PDF)"}</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        disabled={cvUploading}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file || !token) return;
                          setCvUploading(true);
                          setCvProgress(15);
                          const progressTimer = setInterval(() => {
                            setCvProgress((prev) => (prev < 90 ? prev + 12 : prev));
                          }, 180);
                          try {
                            const res = await apiService.uploadFile(token, file);
                            clearInterval(progressTimer);
                            setCvProgress(100);
                            setProfile((prev) => ({ ...prev, resumeUrl: res.url }));
                            setTimeout(() => {
                              setCvUploading(false);
                              setCvProgress(0);
                              setSuccessDialog({
                                open: true,
                                title: "Upload Complete!",
                                message: "Your CV document has been successfully uploaded to cloud storage and linked to your profile.",
                              });
                            }, 400);
                          } catch (err: any) {
                            clearInterval(progressTimer);
                            setCvUploading(false);
                            setCvProgress(0);
                            alert("CV Upload Failed: " + err.message);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* Profile Photo / Avatar Upload */}
                <div className="p-5 rounded-2xl border border-slate-800 bg-[#090d16]/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-xs font-mono font-bold text-cyan-400 uppercase">Profile Photo / Avatar</label>
                      <p className="text-[11px] text-slate-400 mt-0.5">Upload your headshot image or paste an image URL</p>
                    </div>
                    {profile.avatarUrl && (
                      <img
                        src={profile.avatarUrl}
                        alt="Avatar Preview"
                        className="w-10 h-10 rounded-full object-cover border border-cyan-400"
                      />
                    )}
                  </div>

                  {/* Animated Progress Bar during upload */}
                  {photoUploading && (
                    <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30">
                      <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
                        <span className="flex items-center gap-1.5">
                          <Loader2 size={13} className="animate-spin text-cyan-400" />
                          Uploading image to Cloudinary...
                        </span>
                        <span className="font-bold">{photoProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-indigo-400 h-2 rounded-full transition-all duration-200"
                          style={{ width: `${photoProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Paste image link or upload via button ->"
                      value={profile.avatarUrl || ""}
                      onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                      className="flex-1 bg-black/40 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                    <label className={`cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-bold transition-all shrink-0 ${photoUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                      {photoUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                      <span>{photoUploading ? "Uploading..." : "Upload Photo"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={photoUploading}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file || !token) return;
                          setPhotoUploading(true);
                          setPhotoProgress(15);
                          const progressTimer = setInterval(() => {
                            setPhotoProgress((prev) => (prev < 90 ? prev + 12 : prev));
                          }, 180);
                          try {
                            const res = await apiService.uploadFile(token, file);
                            clearInterval(progressTimer);
                            setPhotoProgress(100);
                            setProfile((prev) => ({ ...prev, avatarUrl: res.url }));
                            setTimeout(() => {
                              setPhotoUploading(false);
                              setPhotoProgress(0);
                              setSuccessDialog({
                                open: true,
                                title: "Upload Complete!",
                                message: "Your profile photo has been successfully uploaded to Cloudinary.",
                              });
                            }, 400);
                          } catch (err: any) {
                            clearInterval(progressTimer);
                            setPhotoUploading(false);
                            setPhotoProgress(0);
                            alert("Photo Upload Failed: " + err.message);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-7 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-cyan-400/20"
                >
                  Save
                </button>
              </form>
            </div>
          )}

          {/* TAB 9: INBOX */}
          {activeTab === "messages" && (
            <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-8 shadow-xl space-y-5">
              <div>
                <h3 className="text-lg font-black text-white">Client & Recruiter Inquiries</h3>
                <p className="text-xs text-slate-400 mt-1">Real-time incoming submissions from the portfolio contact form</p>
              </div>

              {messages.length === 0 ? (
                <div className="p-12 text-center text-slate-500 bg-[#090d16] rounded-2xl border border-slate-800">
                  Inbox is currently empty.
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((m) => (
                    <div key={m.id} className="p-5 rounded-2xl border border-slate-800 bg-[#090d16] flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-white text-sm">{m.name}</span>
                          <span className="text-cyan-400 text-xs font-mono">({m.email})</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-2 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed">
                          {m.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-slate-500 font-mono">{new Date(m.createdAt).toLocaleString()}</span>
                        <button onClick={() => handleDeleteMessage(m.id)} className="text-slate-500 hover:text-rose-400 p-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Modern Feedback Dialog (Upload Complete & Saved Successfully) */}
      {successDialog.open && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0f172a] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <CheckCircle2 size={28} />
            </div>
            <div>
              <h4 className="text-xl font-black text-white">{successDialog.title}</h4>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                {successDialog.message}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSuccessDialog({ open: false, title: "", message: "" })}
              className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs transition-all shadow-md shadow-cyan-400/20"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
