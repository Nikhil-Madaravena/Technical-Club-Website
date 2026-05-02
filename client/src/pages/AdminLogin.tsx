import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import tcLogo from "@/assets/tc-logo.png";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("tc.sac@kitsw.ac.in");
  const [password, setPassword] = useState("tc@123");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="absolute inset-0 bg-radial-glow" />

      <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-2xl">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center">
            <div className="relative mb-4">
              <div className="absolute -inset-3 animate-pulse rounded-full bg-navy/20 blur-xl" />
              <img src={tcLogo} alt="Technical Club KITSW" className="relative h-16 w-16 rounded-full" />
            </div>
            <h1 className="font-display text-xl font-black tracking-wider">ADMIN PORTAL</h1>
            <p className="mt-1 font-display text-[10px] tracking-[0.4em] text-muted-foreground">TECHNICAL CLUB KITSW</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block font-display text-[10px] tracking-widest text-muted-foreground">EMAIL ADDRESS</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@kitsw.ac.in"
                  className="w-full rounded-lg border border-border bg-secondary py-3 pl-10 pr-4 text-sm focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/30" />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-display text-[10px] tracking-widest text-muted-foreground">PASSWORD</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
                  className="w-full rounded-lg border border-border bg-secondary py-3 pl-10 pr-10 text-sm focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/30" />
                <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0" /> {error}
              </motion.div>
            )}

            <button type="submit" disabled={loading}
              className="w-full rounded-lg bg-accent py-3 font-display text-xs tracking-[0.2em] text-background transition-all hover:bg-accent/90 disabled:opacity-60">
              {loading ? "SIGNING IN..." : "SIGN IN TO DASHBOARD"}
            </button>
          </form>

        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <a href="/" className="hover:text-foreground transition-colors">← Back to website</a>
        </p>
      </motion.div>
    </div>
  );
}
