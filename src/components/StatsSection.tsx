import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "ACTIVE MEMBERS" },
  { value: 50, suffix: "+", label: "EVENTS CONDUCTED" },
  { value: 20, suffix: "+", label: "WORKSHOPS" },
  { value: 10, suffix: "+", label: "HACKATHON WINS" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
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
