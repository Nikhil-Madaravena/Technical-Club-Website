import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Linkedin, Github, Mail, ShieldCheck, UserCheck } from "lucide-react";
import { api, getApiOrigin } from "@/lib/api";

const FALLBACK_TEAM_2024 = [
  { name: "B. Badrinarayan", role: "General Secretary", year: "2024", description: "Led student body operations and technical event execution for 2023-24." },
  { name: "Madhukar Pooja", role: "Joint Secretary", year: "2024", description: "Coordinated cross-disciplinary club initiatives and public relations." },
  { name: "Shivani", role: "Joint Secretary", year: "2024", description: "Managed event logistics and student outreach for Tech Week series." },
  { name: "Krishna Mohan G.", role: "Executive Member", year: "2024", description: "Key organizer for Ideathon 2024 and web platform deployment." },
];

const TeamSection = () => {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(2024);

  useEffect(() => {
    setLoading(true);
    api.team.getAll({ isCoreTeam: "true", academicYear: selectedYear.toString() })
      .then(res => {
        if (res.data?.length) {
          setTeam(res.data);
        } else {
          setTeam(selectedYear === 2024 ? FALLBACK_TEAM_2024 : []);
        }
      })
      .catch(() => {
        setTeam(selectedYear === 2024 ? FALLBACK_TEAM_2024 : []);
      })
      .finally(() => setLoading(false));
  }, [selectedYear]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="relative py-32 bg-background overflow-hidden" ref={ref}>
      <div className="section-line" />

      {/* Subtle glow */}
      <div className="pointer-events-none absolute left-1/3 top-1/3 h-[400px] w-[400px] rounded-full bg-navy/8 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-navy-light/30 bg-navy/10 px-4 py-1.5 font-display text-[9px] tracking-[0.4em] text-navy-light uppercase">
            <UserCheck className="h-3 w-3" />
            LEADERSHIP & EXECUTIVE BODY
          </span>
          <h2 className="font-display text-3xl font-bold tracking-wide sm:text-5xl">
            CORE <span className="text-gradient-brand">TEAM</span>
          </h2>
          
          {/* Year Selector */}
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {[2026, 2025, 2024, 2023].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`rounded-full px-5 py-2 font-display text-[10px] font-bold tracking-widest transition-all ${
                  selectedYear === year 
                    ? "bg-gradient-to-r from-navy to-navy-light text-white shadow-md shadow-navy/30" 
                    : "border border-border bg-card/60 text-muted-foreground hover:border-navy-light/40 hover:text-foreground"
                }`}
              >
                AY {year}-{year - 1999}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="py-12 text-center text-xs tracking-widest text-muted-foreground">
            LOADING TEAM ROSTER...
          </div>
        ) : team.length === 0 ? (
          <div className="rounded-2xl border border-border/80 bg-card/40 p-12 text-center text-xs tracking-widest text-muted-foreground">
            NO CORE TEAM RECORDS FOUND FOR AY {selectedYear}-{selectedYear - 1999}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card/60 p-6 text-center backdrop-blur-md transition-all duration-300 hover:border-navy-light/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
              >
                {/* Avatar */}
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-secondary font-display text-lg font-bold text-navy-light transition-colors group-hover:border-navy-light/50">
                  {member.photo ? (
                    <img 
                      src={member.photo.startsWith('http') ? member.photo : `${getApiOrigin()}/uploads/${member.photo}`} 
                      alt={member.name} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    member.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                  )}
                </div>

                <h3 className="mb-1 font-display text-sm font-bold tracking-wider text-foreground">
                  {member.name}
                </h3>
                <span className="mb-3 inline-block rounded-full border border-navy-light/25 bg-navy/10 px-3 py-0.5 font-display text-[9px] font-bold tracking-wider text-navy-light">
                  {member.role.toUpperCase()}
                </span>
                <p className="mb-5 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                  {member.description || "Executive student leader contributing to technical events and club operations."}
                </p>

                {/* Social links */}
                <div className="flex justify-center gap-2.5">
                  {[Linkedin, Github, Mail].map((Icon, j) => (
                    <a
                      key={j}
                      href="#"
                      className="rounded-lg border border-border bg-secondary/50 p-2 text-muted-foreground transition-all hover:border-navy-light/40 hover:text-foreground"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>

                {/* Hover Accent */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-navy-light to-crimson transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
