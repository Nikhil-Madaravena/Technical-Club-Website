import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle2, MessageSquare, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { api } from "@/lib/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await api.contact.submit({ ...formData, type: "contact" });
      setStatus("success");
      setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="relative pt-32 pb-20 px-6">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px]" />

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Side: Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h1 className="font-display text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                  Have a <span className="text-accent">Query?</span>
                </h1>
                <p className="mt-6 text-lg text-muted-foreground max-w-md">
                  Have questions about Sumshodhini, technical workshops, or how to join the club? Drop us a message and our team will get back to you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold tracking-widest uppercase">Email Us</h3>
                    <a href="mailto:tc.sac@kitsw.ac.in" className="text-muted-foreground mt-1 hover:text-foreground transition-colors block">tc.sac@kitsw.ac.in</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold tracking-widest uppercase">Location</h3>
                    <p className="text-muted-foreground mt-1">KITSW, Hasanparthy, Warangal — 506015, Telangana</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                    <Info className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold tracking-widest uppercase">Office Hours</h3>
                    <p className="text-muted-foreground mt-1">Monday - Friday, 4:00 PM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-accent/5 rounded-[40px] blur-3xl -z-10" />
              <div className="bg-card/50 backdrop-blur-xl border border-border rounded-[40px] p-8 md:p-12 shadow-2xl">
                {status === "success" ? (
                  <div className="py-12 text-center space-y-6">
                    <div className="h-20 w-20 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold uppercase tracking-tight">Message Sent!</h2>
                      <p className="text-muted-foreground mt-2">Thanks for reaching out. We'll get back to you shortly.</p>
                    </div>
                    <button 
                      onClick={() => setStatus("idle")}
                      className="px-8 py-3 rounded-full bg-accent text-background font-display text-xs font-bold tracking-widest uppercase hover:scale-105 transition-all"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-display text-[10px] font-bold tracking-widest text-muted-foreground uppercase ml-1">Full Name</label>
                        <input 
                          required
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-secondary/50 border border-border rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent transition-all"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-display text-[10px] font-bold tracking-widest text-muted-foreground uppercase ml-1">Email Address</label>
                        <input 
                          required
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-secondary/50 border border-border rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-display text-[10px] font-bold tracking-widest text-muted-foreground uppercase ml-1">Subject</label>
                      <select 
                        value={formData.subject}
                        onChange={e => setFormData({...formData, subject: e.target.value})}
                        className="w-full bg-secondary/50 border border-border rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent transition-all appearance-none"
                      >
                        <option>General Inquiry</option>
                        <option>Sumshodhini Query</option>
                        <option>Workshop Question</option>
                        <option>Technical Issue</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="font-display text-[10px] font-bold tracking-widest text-muted-foreground uppercase ml-1">Message</label>
                      <textarea 
                        required
                        rows={5}
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-secondary/50 border border-border rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent transition-all resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button 
                      disabled={status === "submitting"}
                      className="w-full group relative flex items-center justify-center gap-3 bg-accent text-background rounded-2xl py-5 font-display text-xs font-black tracking-widest uppercase overflow-hidden transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      {status === "submitting" ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </button>

                    {status === "error" && (
                      <p className="text-center text-red-400 text-xs font-bold tracking-wide uppercase">Failed to send. Please try again.</p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
