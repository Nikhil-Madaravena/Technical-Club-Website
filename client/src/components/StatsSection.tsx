import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { api } from "@/lib/api";

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || target === 0) return;
    let start = 0;
    const duration = 2000;
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
    <span ref={ref} className="text-gradient-brand font-display text-4xl font-black sm:text-5xl">
      {count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const [stats, setStats] = useState([
    { value: 0, suffix: "+", label: "ACTIVE MEMBERS" },
    { value: 0, suffix: "+", label: "EVENTS CONDUCTED" },
    { value: 0, suffix: "+", label: "WORKSHOPS" },
    { value: 0, suffix: "+", label: "INNOVATIVE PROJECTS" },
  ]);

  useEffect(() => {
    api.stats.getPublic()
      .then(res => {
        if (res.success && res.data) {
          const d = res.data;
          setStats([
            { value: d.members || 500, suffix: "+", label: "ACTIVE MEMBERS" },
            { value: d.events || 50, suffix: "+", label: "EVENTS CONDUCTED" },
            { value: d.workshops || 20, suffix: "+", label: "WORKSHOPS" },
            { value: 15, suffix: "+", label: "INNOVATIVE PROJECTS" },
          ]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative py-24">
      <div className="section-line" />
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-12 px-6 pt-20 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <Counter target={stat.value} suffix={stat.suffix} />
            <p className="mt-2 font-display text-[10px] tracking-[0.3em] text-muted-foreground">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
