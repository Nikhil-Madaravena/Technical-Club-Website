import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { TrendingUp } from "lucide-react";

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || target === 0) return;
    let start = 0;
    const duration = 2200;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-gradient-brand font-display text-5xl font-black sm:text-6xl">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const [stats, setStats] = useState([
    { value: 500, suffix: "+", label: "ACTIVE MEMBERS", description: "Students across all departments" },
    { value: 50,  suffix: "+", label: "EVENTS CONDUCTED", description: "Hackathons, workshops & talks" },
    { value: 20,  suffix: "+", label: "WORKSHOPS", description: "Hands-on skill-building sessions" },
    { value: 27,  suffix: "+", label: "INNOVATIVE PROJECTS", description: "Ideas adopted from Ideathon" },
  ]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    api.stats.getPublic()
      .then(res => {
        if (res.success && res.data) {
          const d = res.data;
          setStats([
            { value: d.members || 500, suffix: "+", label: "ACTIVE MEMBERS", description: "Students across all departments" },
            { value: d.events  || 50,  suffix: "+", label: "EVENTS CONDUCTED", description: "Hackathons, workshops & talks" },
            { value: d.workshops || 20, suffix: "+", label: "WORKSHOPS", description: "Hands-on skill-building sessions" },
            { value: 27, suffix: "+", label: "INNOVATIVE PROJECTS", description: "Ideas adopted from Ideathon" },
          ]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <div className="section-line" />

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-60" />

      <div className="relative mx-auto max-w-5xl px-6 pt-20">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-navy-light/25 bg-navy/10 px-4 py-1.5 font-display text-[9px] tracking-[0.4em] text-navy-light">
            <TrendingUp className="h-3 w-3" />
            BY THE NUMBERS
          </span>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-navy-light/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-navy/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <Counter target={stat.value} suffix={stat.suffix} />
              <p className="mt-2 font-display text-[10px] font-bold tracking-[0.3em] text-foreground">
                {stat.label}
              </p>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                {stat.description}
              </p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-navy-light to-crimson transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
