import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import tcLogo from "@/assets/tc-logo.png";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="absolute inset-0 bg-radial-glow" />

      {/* Geometric accent lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute left-0 top-1/3 h-px w-full origin-left"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(215 60% 40% / 0.3), transparent)",
        }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute left-0 top-2/3 h-px w-full origin-right"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(0 80% 50% / 0.3), transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="mx-auto mb-8 w-fit"
        >
          <div className="relative">
            <div className="absolute -inset-4 animate-pulse-glow rounded-full bg-navy/20 blur-2xl" />
            <img
              src={tcLogo}
              alt="Technical Club KITSW"
              className="relative h-32 w-32 rounded-full sm:h-40 sm:w-40"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-2 font-display text-4xl font-black tracking-wider sm:text-6xl lg:text-7xl"
        >
          <span className="text-foreground">TECHNICAL</span>{" "}
          <span className="text-gradient-brand">CLUB</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-6 font-display text-xs tracking-[0.5em] text-muted-foreground sm:text-sm"
        >
          KAKATIYA INSTITUTE OF TECHNOLOGY & SCIENCE — WARANGAL
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12 flex items-center justify-center gap-8"
        >
          {["INVENT", "IMAGINE", "INSPIRE"].map((word, i) => (
            <span
              key={word}
              className="font-display text-xs font-semibold tracking-[0.3em] sm:text-sm"
              style={{
                color: i === 1 ? "hsl(215 55% 50%)" : i === 2 ? "hsl(0 80% 55%)" : "hsl(0 0% 70%)",
              }}
            >
              {word}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#about"
            className="group relative overflow-hidden rounded-lg border border-navy-light/30 bg-navy/20 px-8 py-3 font-display text-xs tracking-widest text-foreground transition-all hover:border-navy-light/60 hover:glow-navy"
          >
            <span className="relative z-10">EXPLORE</span>
          </a>
          <a
            href="#events"
            className="group relative overflow-hidden rounded-lg border border-crimson/30 bg-crimson/10 px-8 py-3 font-display text-xs tracking-widest text-foreground transition-all hover:border-crimson/60 hover:glow-crimson"
          >
            <span className="relative z-10">UPCOMING EVENTS</span>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="h-6 w-6 animate-bounce text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
