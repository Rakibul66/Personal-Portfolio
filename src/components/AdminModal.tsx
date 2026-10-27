import React, { useState, useEffect } from "react";
import {
  Lock,
  Plus,
  Trash2,
  Mail,
  RefreshCw,
  X,
  LogOut,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Users,
  Heart,
  Globe,
  Save,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import {
  apiService,
  ProjectData,
  ExperienceData,
  ReferenceData,
  ProfileData,
} from "../services/api";

type Tab =
  | "profile"
  | "projects"
  | "companies"
  | "education"
  | "references"
  | "hobbies"
  | "links"
  | "messages";

export default function AdminModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState<string | null>(localStorage.getItem("admin_token"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  // State Collections
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
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [educationList, setEducationList] = useState<ExperienceData[]>([]);
  const [references, setReferences] = useState<ReferenceData[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  // Input States
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // New Project Form
  const [newProject, setNewProject] = useState<ProjectData>({
    title: "",
    subtitle: "",
    description: "",
    technologies: [],
    category: "Mobile App",
    imageUrl: "",
    githubUrl: "",
    liveUrl: "",
    playStoreUrl: "",
    appStoreUrl: "",
    featured: true,
  });
  const [techInput, setTechInput] = useState("");

  // New Company Form
  const [newCompany, setNewCompany] = useState<ExperienceData>({
    role: "",
    company: "",
    location: "",
    period: "",
    details: [],
    type: "EXPERIENCE",
  });
  const [companyDetailsInput, setCompanyDetailsInput] = useState("");

  // New Education Form
  const [newEducation, setNewEducation] = useState<ExperienceData>({
    role: "B.Sc. in Computer Science",
    company: "",
    location: "",
    period: "",
    details: [],
    type: "EDUCATION",
  });

  // New Reference Form
  const [newReference, setNewReference] = useState<ReferenceData>({
    name: "",
    role: "",
    company: "",
    email: "",
    phone: "",
    feedback: "",
  });

  // Hobby input
  const [newHobbyInput, setNewHobbyInput] = useState("");

  // Hotkey toggle: Ctrl+Shift+A or Cmd+Shift+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch all initial data once logged in
  useEffect(() => {
    if (token && isOpen) {
      loadAllData();
    }
  }, [token, isOpen]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [prof, projs, exps, edus, refs, msgs] = await Promise.all([
        apiService.getProfile(),
        apiService.getProjects(),
        apiService.getExperiences("EXPERIENCE"),
        apiService.getExperiences("EDUCATION"),
        apiService.getReferences(),
        token ? apiService.getMessages(token) : [],
      ]);
      if (prof) setProfile(prof);
      setProjects(projs);
      setExperiences(exps);
      setEducationList(edus);
      setReferences(refs);
      setMessages(msgs);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
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
      showToast("Logged in successfully!");
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

  // Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      await apiService.updateProfile(token, profile);
      showToast("Profile & Links saved!");
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create Project
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      const techArray = techInput.split(",").map((t) => t.trim()).filter(Boolean);
      await apiService.createProject(token, {
        ...newProject,
        technologies: techArray.length ? techArray : ["Flutter", "Dart"],
      });
      showToast("Project published!");
      setNewProject({
        title: "",
        subtitle: "",
        description: "",
        technologies: [],
        category: "Mobile App",
        imageUrl: "",
        githubUrl: "",
        liveUrl: "",
        playStoreUrl: "",
        appStoreUrl: "",
        featured: true,
      });
      setTechInput("");
      const updated = await apiService.getProjects();
      setProjects(updated);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!token || !confirm("Delete this project?")) return;
    await apiService.deleteProject(token, id);
    setProjects(projects.filter((p) => p.id !== id));
    showToast("Project deleted");
  };

  // Create Company / Experience
  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      const details = companyDetailsInput.split("\n").map((d) => d.trim()).filter(Boolean);
      await apiService.createExperience(token, {
        ...newCompany,
        details,
        type: "EXPERIENCE",
      });
      showToast("Company experience added!");
      setNewCompany({ role: "", company: "", location: "", period: "", details: [], type: "EXPERIENCE" });
      setCompanyDetailsInput("");
      const updated = await apiService.getExperiences("EXPERIENCE");
      setExperiences(updated);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (!token || !confirm("Delete this record?")) return;
    await apiService.deleteExperience(token, id);
    setExperiences(experiences.filter((e) => e.id !== id));
    setEducationList(educationList.filter((e) => e.id !== id));
    showToast("Deleted");
  };

  // Create Education
  const handleCreateEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      await apiService.createExperience(token, {
        ...newEducation,
        type: "EDUCATION",
      });
      showToast("Education added!");
      setNewEducation({ role: "", company: "", location: "", period: "", details: [], type: "EDUCATION" });
      const updated = await apiService.getExperiences("EDUCATION");
      setEducationList(updated);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create Reference
  const handleCreateReference = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      await apiService.createReference(token, newReference);
      showToast("Reference added!");
      setNewReference({ name: "", role: "", company: "", email: "", phone: "", feedback: "" });
      const updated = await apiService.getReferences();
      setReferences(updated);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReference = async (id: string) => {
    if (!token || !confirm("Delete reference?")) return;
    await apiService.deleteReference(token, id);
    setReferences(references.filter((r) => r.id !== id));
    showToast("Reference deleted");
  };

  // Hobbies Management
  const handleAddHobby = async () => {
    if (!newHobbyInput.trim() || !token) return;
    const updated = [...(profile.hobbies || []), newHobbyInput.trim()];
    setProfile({ ...profile, hobbies: updated });
    setNewHobbyInput("");
    await apiService.updateProfile(token, { hobbies: updated });
    showToast("Hobby added");
  };

  const handleRemoveHobby = async (hobbyToRemove: string) => {
    if (!token) return;
    const updated = (profile.hobbies || []).filter((h) => h !== hobbyToRemove);
    setProfile({ ...profile, hobbies: updated });
    await apiService.updateProfile(token, { hobbies: updated });
    showToast("Hobby removed");
  };

  // Delete Contact Message
  const handleDeleteMessage = async (id: string) => {
    if (!token) return;
    await apiService.deleteMessage(token, id);
    setMessages(messages.filter((m) => m.id !== id));
    showToast("Message deleted");
  };

  return (
    <>
      {/* Floating Admin Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 hover:text-white hover:bg-cyan-500/20 backdrop-blur-md shadow-2xl transition-all duration-300 font-mono text-xs group"
        title="Admin Portal (Hotkey: Ctrl+Shift+A)"
      >
        <Sparkles size={16} className="text-cyan-400 group-hover:rotate-12 transition-transform" />
        <span>Admin Panel</span>
      </button>

      {/* Main Full-Size Admin Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
          <div className="bg-[#0b1120] border border-white/10 rounded-2xl w-full max-w-5xl h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/60">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Lock size={18} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base flex items-center gap-2">
                    Portfolio Master CMS
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      PostgreSQL Live
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">Control projects, companies, links, and messages</p>
                </div>
              </div>

              {toast && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-lg text-xs animate-pulse">
                  <CheckCircle2 size={14} />
                  <span>{toast}</span>
                </div>
              )}

              <div className="flex items-center gap-3">
                {token && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg bg-rose-950/30 border border-rose-900/40"
                  >
                    <LogOut size={13} /> Sign Out
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            {!token ? (
              /* Login State */
              <div className="flex-1 flex items-center justify-center p-6">
                <form
                  onSubmit={handleLogin}
                  className="w-full max-w-md bg-slate-900/80 border border-white/10 rounded-2xl p-8 space-y-5"
                >
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-white">Admin Authentication</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Enter credentials configured in your NestJS environment
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">EMAIL</label>
                    <input
                      type="email"
                      required
                      placeholder="admin@rakibulhr.dev"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">PASSWORD</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-lg text-sm transition-colors disabled:opacity-50"
                  >
                    {loading ? "Verifying Token..." : "Access Control Panel"}
                  </button>
                </form>
              </div>
            ) : (
              /* Authenticated Navigation & Tabs */
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-56 bg-slate-950/80 border-b md:border-b-0 md:border-r border-white/10 p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible">
                  {[
                    { id: "profile", label: "Profile & Bio", icon: Sparkles },
                    { id: "projects", label: `Projects (${projects.length})`, icon: FolderGit2 },
                    { id: "companies", label: `Companies (${experiences.length})`, icon: Briefcase },
                    { id: "education", label: `Education (${educationList.length})`, icon: GraduationCap },
                    { id: "references", label: `References (${references.length})`, icon: Users },
                    { id: "hobbies", label: `Hobbies (${profile.hobbies?.length || 0})`, icon: Heart },
                    { id: "links", label: "Social Links", icon: Globe },
                    { id: "messages", label: `Inbox (${messages.length})`, icon: Mail },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as Tab)}
                        className={`flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                          isActive
                            ? "bg-cyan-400 text-slate-950 font-bold"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Icon size={15} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Main Tab Panel */}
                <div className="flex-1 p-6 overflow-y-auto space-y-6">
                  {/* TAB: PROFILE */}
                  {activeTab === "profile" && (
                    <form onSubmit={handleSaveProfile} className="space-y-4 max-w-2xl">
                      <h4 className="text-lg font-bold text-white">Personal Profile & Bio</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">NAME</label>
                          <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">PROFESSIONAL TITLE</label>
                          <input
                            type="text"
                            value={profile.title}
                            onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                            className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">HEADLINE</label>
                        <input
                          type="text"
                          value={profile.headline}
                          onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">BIO / ABOUT ME</label>
                        <textarea
                          rows={4}
                          value={profile.bio || ""}
                          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">LOCATION</label>
                          <input
                            type="text"
                            value={profile.location || ""}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                            className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">CONTACT EMAIL</label>
                          <input
                            type="email"
                            value={profile.email || ""}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-lg text-sm transition-colors"
                      >
                        <Save size={16} /> Save Profile Changes
                      </button>
                    </form>
                  )}

                  {/* TAB: PROJECTS */}
                  {activeTab === "projects" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-bold text-white">Manage Projects</h4>
                        <span className="text-xs text-slate-400">Total: {projects.length}</span>
                      </div>

                      {/* Add Project Form */}
                      <form
                        onSubmit={handleCreateProject}
                        className="bg-slate-950/60 border border-white/10 rounded-xl p-5 space-y-4"
                      >
                        <h5 className="text-sm font-bold text-cyan-400 flex items-center gap-1.5">
                          <Plus size={16} /> Add New Project
                        </h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">TITLE *</label>
                            <input
                              type="text"
                              required
                              value={newProject.title}
                              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">CATEGORY</label>
                            <input
                              type="text"
                              value={newProject.category}
                              onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">DESCRIPTION *</label>
                          <textarea
                            required
                            rows={3}
                            value={newProject.description}
                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">
                            TECHNOLOGIES (Comma-separated)
                          </label>
                          <input
                            type="text"
                            placeholder="Flutter, Dart, Bloc, REST API, PostgreSQL"
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">GITHUB URL</label>
                            <input
                              type="text"
                              value={newProject.githubUrl || ""}
                              onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">PLAY STORE URL</label>
                            <input
                              type="text"
                              value={newProject.playStoreUrl || ""}
                              onChange={(e) => setNewProject({ ...newProject, playStoreUrl: e.target.value })}
                              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">LIVE / WEB URL</label>
                            <input
                              type="text"
                              value={newProject.liveUrl || ""}
                              onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-lg text-sm transition-colors"
                        >
                          Publish Project
                        </button>
                      </form>

                      {/* Project List */}
                      <div className="space-y-3">
                        {projects.map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center justify-between p-4 bg-slate-950/40 border border-white/10 rounded-xl"
                          >
                            <div>
                              <h5 className="font-bold text-white text-sm">{p.title}</h5>
                              <p className="text-xs text-slate-400 mt-0.5">{p.description.slice(0, 80)}...</p>
                              <div className="flex gap-1.5 mt-2">
                                {p.technologies.map((t, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-0.5 text-[10px] bg-slate-900 border border-white/10 text-cyan-300 rounded"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <button
                              onClick={() => p.id && handleDeleteProject(p.id)}
                              className="p-2 text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB: COMPANIES / EXPERIENCE */}
                  {activeTab === "companies" && (
                    <div className="space-y-6">
                      <h4 className="text-lg font-bold text-white">Work Experience & Companies</h4>

                      <form
                        onSubmit={handleCreateCompany}
                        className="bg-slate-950/60 border border-white/10 rounded-xl p-5 space-y-4"
                      >
                        <h5 className="text-sm font-bold text-cyan-400 flex items-center gap-1.5">
                          <Plus size={16} /> Add Company Experience
                        </h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">ROLE / TITLE *</label>
                            <input
                              type="text"
                              required
                              placeholder="Senior Flutter Developer"
                              value={newCompany.role}
                              onChange={(e) => setNewCompany({ ...newCompany, role: e.target.value })}
                              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">COMPANY NAME *</label>
                            <input
                              type="text"
                              required
                              placeholder="Bponi Technologies"
                              value={newCompany.company}
                              onChange={(e) => setNewCompany({ ...newCompany, company: e.target.value })}
                              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">PERIOD / DURATION *</label>
                            <input
                              type="text"
                              required
                              placeholder="2023 - Present"
                              value={newCompany.period}
                              onChange={(e) => setNewCompany({ ...newCompany, period: e.target.value })}
                              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">LOCATION</label>
                            <input
                              type="text"
                              placeholder="Dhaka, Bangladesh (Remote)"
                              value={newCompany.location || ""}
                              onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
                              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">
                            RESPONSIBILITIES / HIGHLIGHTS (One per line)
                          </label>
                          <textarea
                            rows={3}
                            placeholder="Architected state management using Bloc&#10;Integrated REST API and Payment Gateways"
                            value={companyDetailsInput}
                            onChange={(e) => setCompanyDetailsInput(e.target.value)}
                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-lg text-sm transition-colors"
                        >
                          Save Company Experience
                        </button>
                      </form>

                      <div className="space-y-3">
                        {experiences.map((exp) => (
                          <div
                            key={exp.id}
                            className="flex items-center justify-between p-4 bg-slate-950/40 border border-white/10 rounded-xl"
                          >
                            <div>
                              <h5 className="font-bold text-white text-sm">
                                {exp.role} <span className="text-cyan-400 font-normal">at {exp.company}</span>
                              </h5>
                              <p className="text-xs text-slate-400">{exp.period} • {exp.location}</p>
                            </div>
                            <button
                              onClick={() => exp.id && handleDeleteExperience(exp.id)}
                              className="p-2 text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB: EDUCATION */}
                  {activeTab === "education" && (
                    <div className="space-y-6">
                      <h4 className="text-lg font-bold text-white">Education & Degrees</h4>

                      <form
                        onSubmit={handleCreateEducation}
                        className="bg-slate-950/60 border border-white/10 rounded-xl p-5 space-y-4"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">DEGREE / PROGRAM *</label>
                            <input
                              type="text"
                              required
                              value={newEducation.role}
                              onChange={(e) => setNewEducation({ ...newEducation, role: e.target.value })}
                              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">UNIVERSITY / INSTITUTION *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. University of Dhaka"
                              value={newEducation.company}
                              onChange={(e) => setNewEducation({ ...newEducation, company: e.target.value })}
                              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">PASSING YEAR / PERIOD *</label>
                            <input
                              type="text"
                              required
                              placeholder="2019 - 2023"
                              value={newEducation.period}
                              onChange={(e) => setNewEducation({ ...newEducation, period: e.target.value })}
                              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">LOCATION</label>
                            <input
                              type="text"
                              placeholder="Dhaka, Bangladesh"
                              value={newEducation.location || ""}
                              onChange={(e) => setNewEducation({ ...newEducation, location: e.target.value })}
                              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-lg text-sm transition-colors"
                        >
                          Add Education
                        </button>
                      </form>

                      <div className="space-y-3">
                        {educationList.map((edu) => (
                          <div
                            key={edu.id}
                            className="flex items-center justify-between p-4 bg-slate-950/40 border border-white/10 rounded-xl"
                          >
                            <div>
                              <h5 className="font-bold text-white text-sm">{edu.role}</h5>
                              <p className="text-xs text-slate-400">{edu.company} ({edu.period})</p>
                            </div>
                            <button
                              onClick={() => edu.id && handleDeleteExperience(edu.id)}
                              className="p-2 text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB: REFERENCES */}
                  {activeTab === "references" && (
                    <div className="space-y-6">
                      <h4 className="text-lg font-bold text-white">Professional References & Testimonials</h4>

                      <form
                        onSubmit={handleCreateReference}
                        className="bg-slate-950/60 border border-white/10 rounded-xl p-5 space-y-4"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">FULL NAME *</label>
                            <input
                              type="text"
                              required
                              value={newReference.name}
                              onChange={(e) => setNewReference({ ...newReference, name: e.target.value })}
                              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">DESIGNATION / ROLE *</label>
                            <input
                              type="text"
                              required
                              placeholder="CTO / Lead Architect"
                              value={newReference.role}
                              onChange={(e) => setNewReference({ ...newReference, role: e.target.value })}
                              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">COMPANY *</label>
                            <input
                              type="text"
                              required
                              value={newReference.company}
                              onChange={(e) => setNewReference({ ...newReference, company: e.target.value })}
                              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">EMAIL</label>
                            <input
                              type="email"
                              value={newReference.email || ""}
                              onChange={(e) => setNewReference({ ...newReference, email: e.target.value })}
                              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">PHONE</label>
                            <input
                              type="text"
                              value={newReference.phone || ""}
                              onChange={(e) => setNewReference({ ...newReference, phone: e.target.value })}
                              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">FEEDBACK / NOTE</label>
                          <textarea
                            rows={2}
                            placeholder="Exceptional problem-solving abilities and delivery speed."
                            value={newReference.feedback || ""}
                            onChange={(e) => setNewReference({ ...newReference, feedback: e.target.value })}
                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-lg text-sm transition-colors"
                        >
                          Add Reference
                        </button>
                      </form>

                      <div className="space-y-3">
                        {references.map((ref) => (
                          <div
                            key={ref.id}
                            className="flex items-center justify-between p-4 bg-slate-950/40 border border-white/10 rounded-xl"
                          >
                            <div>
                              <h5 className="font-bold text-white text-sm">
                                {ref.name} — <span className="text-cyan-400 font-normal">{ref.role} at {ref.company}</span>
                              </h5>
                              <p className="text-xs text-slate-400">{ref.email} • {ref.phone}</p>
                              {ref.feedback && <p className="text-xs text-slate-300 italic mt-1">"{ref.feedback}"</p>}
                            </div>
                            <button
                              onClick={() => ref.id && handleDeleteReference(ref.id)}
                              className="p-2 text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB: HOBBIES */}
                  {activeTab === "hobbies" && (
                    <div className="space-y-6">
                      <h4 className="text-lg font-bold text-white">Hobbies & Personal Interests</h4>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="e.g. Open Source, Photography, Hiking..."
                          value={newHobbyInput}
                          onChange={(e) => setNewHobbyInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddHobby())}
                          className="flex-1 bg-slate-950 border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm"
                        />
                        <button
                          onClick={handleAddHobby}
                          className="px-5 py-2 bg-cyan-400 text-slate-950 font-bold rounded-lg text-sm hover:bg-cyan-300"
                        >
                          Add Hobby
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {(profile.hobbies || []).map((hobby, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-white/10 text-cyan-300 text-xs font-mono"
                          >
                            <Heart size={12} className="text-rose-400 fill-rose-400" />
                            {hobby}
                            <button
                              onClick={() => handleRemoveHobby(hobby)}
                              className="text-slate-400 hover:text-rose-400 ml-1"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB: SOCIAL LINKS */}
                  {activeTab === "links" && (
                    <form onSubmit={handleSaveProfile} className="space-y-4 max-w-2xl">
                      <h4 className="text-lg font-bold text-white">Social & Profile Links</h4>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">GITHUB PROFILE URL</label>
                        <input
                          type="text"
                          value={profile.githubUrl || ""}
                          onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">LINKEDIN PROFILE URL</label>
                        <input
                          type="text"
                          value={profile.linkedinUrl || ""}
                          onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">FACEBOOK URL</label>
                          <input
                            type="text"
                            value={profile.facebookUrl || ""}
                            onChange={(e) => setProfile({ ...profile, facebookUrl: e.target.value })}
                            className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">TWITTER / X URL</label>
                          <input
                            type="text"
                            value={profile.twitterUrl || ""}
                            onChange={(e) => setProfile({ ...profile, twitterUrl: e.target.value })}
                            className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-lg text-sm transition-colors"
                      >
                        <Save size={16} /> Save Links
                      </button>
                    </form>
                  )}

                  {/* TAB: MESSAGES */}
                  {activeTab === "messages" && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-bold text-white">Contact Inquiries</h4>
                        <button
                          onClick={loadAllData}
                          className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          <RefreshCw size={12} /> Reload
                        </button>
                      </div>

                      {messages.length === 0 ? (
                        <p className="text-slate-500 text-center py-12">No messages received yet.</p>
                      ) : (
                        messages.map((msg) => (
                          <div
                            key={msg.id}
                            className="bg-slate-950/60 border border-white/10 rounded-xl p-4 text-sm"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <span className="font-bold text-white mr-2">{msg.name}</span>
                                <span className="text-cyan-300 text-xs font-mono">{msg.email}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-slate-500 text-xs font-mono">
                                  {new Date(msg.createdAt).toLocaleString()}
                                </span>
                                <button
                                  onClick={() => handleDeleteMessage(msg.id)}
                                  className="text-slate-500 hover:text-rose-400"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                            <p className="text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-white/5 text-xs">
                              {msg.message}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
