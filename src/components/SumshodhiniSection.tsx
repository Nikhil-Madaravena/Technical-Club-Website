import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Code2, Presentation, FlaskConical, Wrench, Mic } from "lucide-react";

const highlights = [
  { icon: Code2, label: "Hackathons", desc: "36-hour coding marathons tackling real-world problems" },
  { icon: FlaskConical, label: "Project Expos", desc: "Showcasing innovative student-built prototypes" },
  { icon: Presentation, label: "Paper Presentations", desc: "Research papers reviewed by industry experts" },
  { icon: Trophy, label: "Coding Contests", desc: "Competitive programming with national-level participants" },
  { icon: Wrench, label: "Workshops", desc: "Hands-on sessions on cutting-edge tools and frameworks" },
  { icon: Mic, label: "Tech Talks", desc: "Keynotes and panels from industry leaders and alumni" },
];

const SumshodhiniSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sumshodhini" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="section-line" />

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-6 text-center"
        >
          <span className="mb-4 inline-block font-display text-[10px] tracking-[0.5em] text-accent">
            FLAGSHIP EVENT
          </span>
          <h2 className="mb-2 font-display text-4xl font-bold tracking-wide sm:text-5xl">
            <span className="text-gradient-brand">SUMSHODHINI</span>
          </h2>
          <p className="mb-2 font-display text-xs tracking-[0.4em] text-muted-foreground">
            THE ANNUAL TECHNICAL FEST
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mb-16 max-w-2xl text-center text-muted-foreground leading-relaxed"
        >
          Sumshodhini is the crown jewel of the Technical Club of KITSW — a multi-day
          technical extravaganza that brings together hundreds of students, industry
          professionals, and academia for an unforgettable celebration of technology and innovation.
        </motion.p>

        {/* Timeline-style highlight cards */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border lg:block" />

          <div className="grid gap-8 lg:grid-cols-2">
            {highlights.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                  className={`group relative flex items-start gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:glow-border-crimson ${
                    isLeft ? "lg:pr-12" : "lg:pl-12"
                  }`}
                >
                  {/* Connector dot on the timeline */}
                  <div
                    className={`absolute top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full border-2 border-accent bg-background lg:block ${
                      isLeft ? "-right-[1.85rem]" : "-left-[1.85rem]"
                    }`}
                  />

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary transition-colors group-hover:border-accent/40">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-display text-sm font-bold tracking-wider">
                      {item.label}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SumshodhiniSection;
