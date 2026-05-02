import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Github, Mail } from "lucide-react";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

const TeamSection = () => {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setLoading(true);
    api.team.getAll({ isCoreTeam: "true", academicYear: selectedYear.toString() })
      .then(res => setTeam(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [selectedYear]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!loading && team.length === 0) return null;

  return (
    <section id="team" className="relative py-32" ref={ref}>
      <div className="section-line" />
      {loading ? (
        <div className="mx-auto max-w-6xl px-6 pt-20 text-center">
          <p className="text-muted-foreground">Loading team...</p>
        </div>
      ) : (
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
          
          {/* Year Selector */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[2026, 2025, 2024, 2023].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`rounded-full px-6 py-2 font-display text-[10px] font-bold tracking-widest transition-all ${
                  selectedYear === year 
                    ? "bg-accent text-background shadow-lg shadow-accent/20" 
                    : "border border-border text-muted-foreground hover:border-accent/50 hover:text-accent"
                }`}
              >
                {year}-{year - 1999}
              </button>
            ))}
          </div>
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
              {/* Avatar */}
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-secondary font-display text-xl font-bold text-navy-light transition-colors group-hover:border-navy-light/50">
                {member.photo ? (
                  <img 
                    src={member.photo.startsWith('http') ? member.photo : `${import.meta.env.VITE_API_URL.replace('/api', '')}/uploads/${member.photo}`} 
                    alt={member.name} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                )}
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
      )}
    </section>
  );
};


export default TeamSection;
