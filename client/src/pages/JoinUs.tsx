import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Code2, Brain, Shield, Cpu, Smartphone, Palette, Users, Upload, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { api } from "@/lib/api";

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

export default function JoinPage() {
  const [form, setForm] = useState({ name: "", email: "", year: "", why: "", skills: "", linkedin: "" });
  const [resume, setResume] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.year) { setError("Please fill in all required fields."); return; }
    
    setLoading(true); setError("");
    
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("subject", `Membership Request - ${form.name}`);
      formData.append("message", `Year: ${form.year}\nSkills: ${form.skills}\nLinkedIn: ${form.linkedin}\n\nWhy I want to join:\n${form.why}`);
      formData.append("type", "membership");
      if (resume) formData.append("resume", resume);

      await api.contact.submit(formData);
      setSubmitted(true);
    } catch { 
      setError("Something went wrong. Please try again or email us directly."); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[35vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-grid-pattern" />
        <div className="absolute inset-0 bg-radial-glow" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 text-center px-6">
          <span className="mb-4 inline-block font-display text-[10px] tracking-[0.5em] text-accent">BECOME A MEMBER</span>
          <h1 className="font-display text-5xl font-black tracking-wide sm:text-6xl">JOIN <span className="text-gradient-brand">THE CLUB</span></h1>
          <p className="mt-4 max-w-md mx-auto text-sm text-muted-foreground">Be part of a community that builds, learns, and innovates together</p>
        </motion.div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Perks */}
        <div className="mb-16 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Users, title: "500+ Community", desc: "Network with driven peers across all domains" },
            { icon: Code2, title: "Hands-on Projects", desc: "Build real projects with mentorship from seniors" },
            { icon: CheckCircle, title: "Events & Workshops", desc: "Exclusive access to hackathons and expert sessions" },
          ].map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-5">
              <p.icon className="mb-3 h-6 w-6 text-accent" />
              <h3 className="mb-1 font-display text-xs font-bold tracking-wider">{p.title}</h3>
              <p className="text-xs text-muted-foreground">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl border border-green-500/30 bg-green-500/5 p-12 text-center">
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-400" />
            <h2 className="mb-2 font-display text-2xl font-bold tracking-wider text-foreground">APPLICATION RECEIVED!</h2>
            <p className="text-muted-foreground">Thanks, <strong>{form.name}</strong>! We'll review your application and reach out at <strong>{form.email}</strong> within 3-5 days.</p>
          </motion.div>
        ) : (
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-8 space-y-8">
            <h2 className="font-display text-lg font-bold tracking-wider">APPLICATION FORM</h2>

            {/* Basic info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block font-display text-[10px] tracking-widest text-muted-foreground">FULL NAME *</label>
                <input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Your full name"
                  className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm focus:border-accent/50 focus:outline-none" />
              </div>
              <div>
                <label className="mb-2 block font-display text-[10px] tracking-widest text-muted-foreground">COLLEGE EMAIL *</label>
                <input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="you@kitsw.ac.in"
                  className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm focus:border-accent/50 focus:outline-none" />
              </div>
              <div>
                <label className="mb-2 block font-display text-[10px] tracking-widest text-muted-foreground">YEAR OF STUDY *</label>
                <select value={form.year} onChange={e => set("year", e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm focus:border-accent/50 focus:outline-none">
                  <option value="">Select year</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-2 block font-display text-[10px] tracking-widest text-muted-foreground">LINKEDIN (optional)</label>
                <input value={form.linkedin} onChange={e => set("linkedin", e.target.value)} placeholder="linkedin.com/in/you"
                  className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm focus:border-accent/50 focus:outline-none" />
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <label className="mb-3 block font-display text-[10px] tracking-widest text-muted-foreground">UPLOAD RESUME (PDF) *</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-secondary/50 p-8 transition-colors hover:border-accent/50 hover:bg-secondary"
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".pdf" 
                  className="hidden" 
                />
                {resume ? (
                  <div className="flex flex-col items-center text-center">
                    <FileText className="mb-2 h-8 w-8 text-accent" />
                    <p className="font-display text-sm font-bold text-foreground">{resume.name}</p>
                    <p className="text-xs text-muted-foreground">Click to change file</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="font-display text-sm font-bold text-muted-foreground">Click to upload your resume</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">Max size: 10MB (PDF only)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Text fields */}
            <div>
              <label className="mb-2 block font-display text-[10px] tracking-widest text-muted-foreground">RELEVANT SKILLS</label>
              <input value={form.skills} onChange={e => set("skills", e.target.value)} placeholder="e.g. Python, React, Arduino..."
                className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm focus:border-accent/50 focus:outline-none" />
            </div>
            <div>
              <label className="mb-2 block font-display text-[10px] tracking-widest text-muted-foreground">WHY DO YOU WANT TO JOIN?</label>
              <textarea rows={4} value={form.why} onChange={e => set("why", e.target.value)} placeholder="Tell us what excites you about the Technical Club..."
                className="w-full resize-none rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm focus:border-accent/50 focus:outline-none" />
            </div>

            {error && <p className="rounded-lg bg-red-500/10 px-4 py-2 text-xs text-red-400">{error}</p>}

            <button type="submit" disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-accent px-8 py-3 font-display text-xs tracking-widest text-background hover:bg-accent/90 transition-colors disabled:opacity-60">
              {loading ? "SUBMITTING..." : <><Send className="h-4 w-4" /> SUBMIT APPLICATION</>}
            </button>
          </motion.form>
        )}
      </div>
      <FooterSection />
    </div>
  );
}
