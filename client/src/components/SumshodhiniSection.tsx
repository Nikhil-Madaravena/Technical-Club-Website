import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Code2, Presentation, FlaskConical, Wrench, Mic, ArrowRight, Sparkles } from "lucide-react";

const highlights = [
  { icon: Code2,         label: "Hackathons",          desc: "36-hour coding marathons tackling real-world problems under pressure" },
  { icon: FlaskConical,  label: "Project Expos",        desc: "Showcasing innovative student-built prototypes to industry judges" },
  { icon: Presentation,  label: "Paper Presentations",  desc: "Research papers reviewed by faculty and industry domain experts" },
  { icon: Trophy,        label: "Coding Contests",      desc: "Competitive programming with national-level participants and prizes" },
  { icon: Wrench,        label: "Workshops",            desc: "Hands-on intensive sessions on cutting-edge tools and frameworks" },
  { icon: Mic,           label: "Tech Talks",           desc: "Keynotes and panels from industry leaders, alumni, and researchers" },
];

const SumshodhiniSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sumshodhini" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="section-line" />

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-radial-glow-crimson opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent/4 blur-3xl" />
      <div className="pointer-events-none absolute top-0 right-0 h-[300px] w-[40%] bg-navy/8 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/8 px-4 py-1.5 font-display text-[9px] tracking-[0.4em] text-accent"
          >
            <Sparkles className="h-3 w-3" />
            FLAGSHIP EVENT
          </motion.span>
          <h2 className="mb-3 font-display text-4xl font-black tracking-wide sm:text-6xl">
            <span className="text-gradient-brand">SUMSHODHINI</span>
          </h2>
          <p className="font-display text-xs tracking-[0.5em] text-muted-foreground">
            THE ANNUAL TECHNICAL FEST
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mb-6 max-w-2xl text-center text-base text-muted-foreground leading-relaxed"
        >
          Sumshodhini is the crown jewel of the Technical Club of KITSW — a multi-day
          technical extravaganza bringing together hundreds of students, industry
          professionals, and academia for an unforgettable celebration of technology.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mb-16 flex justify-center"
        >
          <a
            href="/events"
            className="inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/8 px-5 py-2.5 font-display text-[10px] tracking-widest text-accent transition-all hover:border-accent/60 hover:bg-accent/15 hover:glow-crimson"
          >
            VIEW ALL EVENTS <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>

        {/* Timeline cards */}
        <div className="relative">
          {/* Vertical center line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-navy-light/30 via-crimson/30 to-transparent lg:block" />

          <div className="grid gap-6 lg:grid-cols-2">
            {highlights.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className={`group animated-border relative flex items-start gap-5 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-crimson/25 hover:shadow-xl hover:shadow-crimson/8 ${
                    isLeft ? "lg:pr-14" : "lg:pl-14"
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full border-2 border-accent bg-background shadow-[0_0_8px_2px_hsl(var(--crimson)/0.3)] lg:block ${
                      isLeft ? "-right-[1.85rem]" : "-left-[1.85rem]"
                    }`}
                  />

                  {/* Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary transition-all group-hover:border-accent/35 group-hover:bg-accent/8">
                    <item.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent" />
                  </div>

                  <div>
                    <h3 className="mb-1.5 font-display text-sm font-bold tracking-wider text-foreground">
                      {item.label}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-crimson to-navy-light transition-all duration-500 group-hover:w-full" />
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
