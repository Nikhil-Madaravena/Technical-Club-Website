import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Github, Mail } from "lucide-react";

const team = [
  {
    name: "Shashikanth",
    role: "President",
    description:
      "Drives the club's vision and oversees all technical initiatives.",
  },
  {
    name: "Nandhini Azmeera",
    role: "Vice President",
    description: "Coordinates cross-team collaboration and event strategy.",
  },
  {
    name: "Manaswini",
    role: "Joint Secretary",
    description: "Manages operations, communications, and member engagement.",
  },
  {
    name: "Md. Asma",
    role: "Joint Secretary",
    description: "Heads security workshops, CTFs, and awareness campaigns.",
  },
  {
    name: "Sai Charan",
    role: "Membership & Volunteer coordinator",
    description: "Leads web development projects and frontend workshops.",
  },
  {
    name: "Shashanka Desai",
    role: "Event Management & Logistics Head",
    description: "Spearheads AI research initiatives and ML bootcamps.",
  },
];

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="relative py-32" ref={ref}>
      <div className="section-line" />
      <div className="mx-auto max-w-6xl px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-display text-[10px] tracking-[0.5em] text-accent">
            THE PEOPLE
          </span>
          <h2 className="font-display text-3xl font-bold tracking-wide sm:text-4xl">
            CORE <span className="text-gradient-brand">TEAM</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group rounded-xl border border-border bg-card p-6 text-center transition-all hover:glow-border-navy"
            >
              {/* Avatar placeholder */}
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-border bg-secondary font-display text-xl font-bold text-navy-light transition-colors group-hover:border-navy-light/50">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              <h3 className="mb-1 font-display text-sm font-bold tracking-wider">
                {member.name}
              </h3>
              <span className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-0.5 font-display text-[9px] tracking-wider text-accent">
                {member.role.toUpperCase()}
              </span>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {member.description}
              </p>

              <div className="flex justify-center gap-3">
                {[Linkedin, Github, Mail].map((Icon, j) => (
                  <a
                    key={j}
                    href="#"
                    className="rounded-lg border border-border p-2 text-muted-foreground transition-all hover:border-navy-light/50 hover:text-foreground"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
