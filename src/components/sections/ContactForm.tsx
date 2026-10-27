import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { apiService } from "../../services/api";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");
    setResponseMsg("");

    const res = await apiService.submitMessage(formData);
    if (res.success) {
      setStatus("success");
      setResponseMsg("Thanks! Your message has been received.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
      setResponseMsg(res.message || "Failed to send message. Please try again.");
    }
  };

  return (
    <div className="bg-slate-900/60 border border-white/10 p-6 md:p-8 backdrop-blur-md rounded-xl mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            Send a Direct Message
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Live REST API" />
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Connected to NestJS + PostgreSQL backend
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">YOUR NAME *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Smith"
              className="w-full bg-slate-950/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">EMAIL ADDRESS *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@example.com"
              className="w-full bg-slate-950/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">SUBJECT (OPTIONAL)</label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Project inquiry, consulting, or opportunity"
            className="w-full bg-slate-950/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">MESSAGE *</label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell me about your project, timeline, or requirements..."
            className="w-full bg-slate-950/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
          />
        </div>

        {status === "success" && (
          <div className="flex items-center gap-2 p-3 bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 rounded-lg text-sm">
            <CheckCircle2 size={18} />
            <span>{responseMsg}</span>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 p-3 bg-rose-950/50 border border-rose-500/30 text-rose-300 rounded-lg text-sm">
            <AlertCircle size={18} />
            <span>{responseMsg}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Sending to Database...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
