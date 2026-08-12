import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Lightbulb, Users, Rocket, FlaskConical, Calendar, ArrowRight, ShieldCheck, Award } from "lucide-react";

const pillars = [
  {
    icon: Lightbulb,
    title: "INNOVATION & DISCOVERY",
    description: "Fostering creative problem-solving and nurturing student-led concepts into real-world applications.",
  },
  {
    icon: Target,
    title: "SKILL DEVELOPMENT",
    description: "Hands-on workshops, coding sprints, and structured peer mentorship to master industry tech stacks.",
  },
  {
    icon: FlaskConical,
    title: "APPLIED RESEARCH",
    description: "Encouraging undergraduate research in AI/ML, Embedded IoT systems, Cybersecurity, and Data Science.",
  },
  {
    icon: Users,
    title: "CROSS-DISCIPLINARY TEAMS",
    description: "Uniting engineering students across departments to tackle multi-faceted technical projects.",
  },
  {
    icon: Calendar,
    title: "TECHNICAL SYMPOSIUMS",
    description: "Hosting Sumshodhini, Ideathons, national hackathons, and high-impact webinars with industry experts.",
  },
  {
    icon: Rocket,
    title: "REAL-WORLD IMPACT",
    description: "Translating winning competition prototypes into institutional projects and published student work.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 overflow-hidden bg-background" ref={ref}>
      <div className="section-line" />

      {/* Subtle glowing accents */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-navy/10 blur-[130px]" />
      <div className="pointer-events-none absolute left-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-crimson/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6 pt-20">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-navy-light/30 bg-navy/10 px-4 py-1.5 font-display text-[9px] tracking-[0.4em] text-navy-light uppercase">
            <Award className="h-3 w-3 text-navy-light" />
            ABOUT TECHNICAL CLUB
          </span>
          <h2 className="mb-6 font-display text-3xl font-bold tracking-wide sm:text-5xl">
            FORGING THE FUTURE OF <span className="text-gradient-brand">ENGINEERING</span>
          </h2>
          <p className="mx-auto max-w-3xl text-base text-muted-foreground leading-relaxed">
            The Technical Club of KITSW is the premier student-driven technical body at Kakatiya Institute of Technology &amp; Science, Warangal. Backed by dedicated faculty advisors and executive student leaders, we provide a dynamic ecosystem where students transform curiosity into technical mastery and impactful projects.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-8 backdrop-blur-md transition-all duration-300 hover:border-navy-light/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
            >
              {/* Top Icon & Badge line */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-secondary/80 text-navy-light transition-colors group-hover:border-navy-light/40 group-hover:bg-navy/20 group-hover:text-accent">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <span className="font-display text-[9px] tracking-widest text-muted-foreground/50">
                  0{i + 1}
                </span>
              </div>

              <h3 className="mb-3 font-display text-xs font-bold tracking-widest text-foreground">
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>

              {/* Hover Accent Glow */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-navy-light via-crimson to-navy-light transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>

        {/* Professional Recognition Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 rounded-2xl border border-border/80 bg-card/40 p-8 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-navy-light/30 bg-navy/15 text-navy-light">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold tracking-wider text-foreground">
                OFFICIALLY RECOGNIZED STUDENT BODY
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                Supervised by Dean of Student Affairs &amp; Faculty In-Charge, KITSW Warangal
              </p>
            </div>
          </div>
          
          <a
            href="/join"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-navy to-crimson px-6 py-3 font-display text-xs font-bold tracking-widest text-white transition-all hover:shadow-lg hover:shadow-accent/20 hover:scale-[1.02] shrink-0"
          >
            BECOME A MEMBER <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;
