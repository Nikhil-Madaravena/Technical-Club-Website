import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Lightbulb, Users, Rocket, FlaskConical, Calendar } from "lucide-react";

const pillars = [
  {
    icon: Lightbulb,
    title: "INNOVATION",
    description: "Pushing boundaries through creative problem-solving and emerging technologies.",
  },
  {
    icon: Target,
    title: "SKILL DEVELOPMENT",
    description: "Hands-on workshops, coding sessions, and mentorship programs to sharpen technical abilities.",
  },
  {
    icon: FlaskConical,
    title: "RESEARCH",
    description: "Encouraging undergraduate research in AI, IoT, cybersecurity, and beyond.",
  },
  {
    icon: Users,
    title: "TEAMWORK",
    description: "Building cross-disciplinary teams that tackle complex engineering challenges together.",
  },
  {
    icon: Calendar,
    title: "TECHNICAL EVENTS",
    description: "Organizing hackathons, workshops, and competitions that inspire the campus community.",
  },
  {
    icon: Rocket,
    title: "IMPACT",
    description: "Transforming ideas into real-world projects that solve problems and win accolades.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32" ref={ref}>
      <div className="section-line" />
      <div className="mx-auto max-w-6xl px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-display text-[10px] tracking-[0.5em] text-accent">
            WHO WE ARE
          </span>
          <h2 className="mb-6 font-display text-3xl font-bold tracking-wide sm:text-4xl">
            FORGING THE FUTURE OF <span className="text-gradient-brand">TECHNOLOGY</span>
          </h2>
          <p className="mx-auto max-w-3xl text-muted-foreground leading-relaxed">
            The Technical Club of KITSW is a premier student-driven organization dedicated to
            cultivating innovation, advancing research, and building a vibrant community of future
            engineers. Through hands-on workshops, hackathons, guest lectures, and technical
            competitions, we empower students to develop cutting-edge skills and turn ambitious
            ideas into reality.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:glow-border-navy"
            >
              <pillar.icon className="mb-4 h-8 w-8 text-navy-light transition-colors group-hover:text-accent" />
              <h3 className="mb-2 font-display text-sm font-bold tracking-wider">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
