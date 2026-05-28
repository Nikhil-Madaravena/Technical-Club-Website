import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Search, Trophy, ArrowRight, Clock, CheckCircle2, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { api } from "@/lib/api";


const STATUSES = ["All", "upcoming", "completed"];


const FALLBACK_EVENTS = [
  {
    _id: "1",
    title: "SUMSHODINI 2026",
    date: "2026-03-15",
    location: "KITSW Campus",
    category: "Sumshodini",
    organizedBy: "CSE",
    status: "upcoming",
    shortDescription: "National-level technical symposium featuring hackathon, paper presentations, and coding challenges.",
    maxParticipants: 300,
    registrationLink: "#",
    tags: ["coding", "ai", "symposium"],
    coverImage: "https://picsum.photos/seed/sum26/800/400"
  },

  {
    _id: "2",
    title: "AI WORKSHOP SERIES",
    date: "2025-11-28",
    location: "Seminar Hall",
    category: "Workshop",
    organizedBy: "IT",
    status: "completed",
    shortDescription: "Hands-on sessions on LLMs, transformers, and real-world AI applications.",
    registeredCount: 95,
    tags: ["ai", "ml"],
    coverImage: "https://picsum.photos/seed/aiws/800/400"
  },

  {
    _id: "3",
    title: "SUMSHODINI HACKATHON 2025",
    date: "2025-10-15",
    location: "KITSW Campus",
    category: "Sumshodini",
    organizedBy: "CSE",
    status: "completed",
    shortDescription: "36-hour national hackathon with 180+ participants and intense innovation challenges.",
    registeredCount: 180,
    tags: ["hackathon", "innovation"],
    coverImage: "https://picsum.photos/seed/sumhack25/800/400",
    winners: [
      { position: "1st", name: "Team Alpha", prize: "₹15,000" },
      { position: "2nd", name: "Team Beta", prize: "₹10,000" }
    ]
  },

  {
    _id: "4",
    title: "FUTURE OF WEB TECHNOLOGIES",
    date: "2026-03-05",
    location: "Auditorium",
    category: "Guest Lecture",
    organizedBy: "TC Club",
    status: "upcoming",
    shortDescription: "Expert talk on WebAssembly, edge computing, and modern web architecture.",
    tags: ["web", "tech"],
    coverImage: "https://picsum.photos/seed/weblec/800/400"
  },

  {
    _id: "5",
    title: "CODE SPRINT 2025",
    date: "2025-09-05",
    location: "CS Lab Complex",
    category: "Competition",
    organizedBy: "IT",
    status: "completed",
    shortDescription: "Competitive programming contest with problem-solving challenges and prizes.",
    registeredCount: 120,
    tags: ["competitive", "coding"],
    coverImage: "https://picsum.photos/seed/cs25/800/400"
  },

  {
    _id: "6",
    title: "IOT BOOTCAMP",
    date: "2026-04-05",
    location: "Electronics Lab",
    category: "Workshop",
    organizedBy: "ME",
    status: "upcoming",
    shortDescription: "Hands-on IoT bootcamp covering sensors, microcontrollers, and real-time systems.",
    maxParticipants: 60,
    registrationLink: "#",
    tags: ["iot", "hardware"],
    coverImage: "https://picsum.photos/seed/iotbc/800/400"
  }
];


const statusConfig: Record<string, { label: string; color: string; Icon: any }> = {
  upcoming: { label: "UPCOMING", color: "text-accent bg-accent/10", Icon: Clock },
  ongoing:  { label: "ONGOING",  color: "text-green-400 bg-green-400/10", Icon: Clock },
  completed:{ label: "COMPLETED",color: "text-muted-foreground bg-secondary", Icon: CheckCircle2 },
};

function EventCard({ event: ev, i, expanded, setExpanded }: any) {
  const cfg = statusConfig[ev.status] || statusConfig.completed;
  const isOpen = expanded === ev._id;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="overflow-hidden rounded-xl border border-border bg-card">
      <button className="group flex w-full flex-col gap-4 p-6 text-left sm:flex-row sm:items-center" onClick={() => setExpanded(isOpen ? null : ev._id)}>
        <div className="h-20 w-full shrink-0 overflow-hidden rounded-lg bg-secondary sm:w-32">
          {ev.coverImage && <img src={ev.coverImage} alt={ev.title} className="h-full w-full object-cover" />}
        </div>
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 font-display text-[9px] tracking-wider ${cfg.color}`}><cfg.Icon className="h-2.5 w-2.5" />{cfg.label}</span>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 font-display text-[9px] tracking-wider text-muted-foreground">{ev.category}</span>
            {ev.organizedBy && (<span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[9px] text-accent">{ev.organizedBy}</span>)}
            {ev.tags?.slice(0, 2).map((t: string) => <span key={t} className="rounded-full border border-border px-2 py-0.5 text-[9px] text-muted-foreground">{t}</span>)}
          </div>
          <h3 className="mb-1 font-display text-sm font-bold tracking-wider">{ev.title}</h3>
          {ev.organizedBy && (
            <p className="mb-2 text-[11px] uppercase tracking-[] text-white">Organized by {ev.organizedBy}</p>
          )}
          <p className="mb-3 text-xs text-muted-foreground line-clamp-2">{ev.shortDescription || ev.description}</p>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(ev.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ev.location}</span>
            {ev.registeredCount > 0 && <span className="flex items-center gap-1"><Users className="h-3 w-3" />{ev.registeredCount} registered</span>}
          </div>
        </div>
        <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="border-t border-border px-6 pb-6 pt-4">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="mb-2 font-display text-xs font-bold tracking-widest text-accent">ABOUT</h4>
              <p className="text-sm text-muted-foreground">{ev.description || ev.shortDescription}</p>
              {ev.highlights?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {ev.highlights.map((h: string) => <span key={h} className="rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 text-xs text-accent">{h}</span>)}
                </div>
              )}
            </div>
            {ev.winners?.length > 0 && (
              <div>
                <h4 className="mb-2 font-display text-xs font-bold tracking-widest text-accent">WINNERS</h4>
                <div className="space-y-2">
                  {ev.winners.map((w: any) => (
                    <div key={w.position} className="flex items-center gap-3 rounded-lg bg-secondary p-2">
                      <Trophy className={`h-4 w-4 ${w.position === "1st" ? "text-yellow-400" : w.position === "2nd" ? "text-gray-300" : "text-orange-400"}`} />
                      <span className="font-display text-xs font-bold">{w.position}</span>
                      <span className="flex-1 text-xs">{w.name || w.team}</span>
                      <span className="text-xs text-accent">{w.prize}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {ev.registrationLink && ev.status !== "completed" && (
            <a 
              href={ev.registrationLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-4 py-2 font-display text-xs tracking-widest text-accent hover:bg-accent/20 transition-colors"
            >
              REGISTER NOW <ArrowRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function SumshodiniPage() {
  const [events, setEvents] = useState<any[]>(FALLBACK_EVENTS);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    api.events.getSumshodini()
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setEvents(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const sumshodiniEvents = events.filter(
    ev =>
    ev.category?.toLowerCase() === "sumshodini" ||
    ev.category?.toLowerCase() === "samsodini"
    );
  const filtered = sumshodiniEvents.filter(ev => {
    const matchSearch = ev.title.toLowerCase().includes(search.toLowerCase()) || (ev.shortDescription || "").toLowerCase().includes(search.toLowerCase());
    const matchSt = status === "All" || ev.status === status;
    return matchSearch && matchSt;
  });

  const upcoming = filtered.filter(e => e.status === "upcoming" || e.status === "ongoing");
  const past = filtered.filter(e => e.status === "completed" || e.status === "cancelled");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-grid-pattern" />
        <div className="absolute inset-0 bg-radial-glow" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 text-center">
          <span className="mb-4 inline-block font-display text-[10px] tracking-[0.5em] text-accent"></span>
          <h1 className="font-display text-5xl font-black tracking-wide sm:text-7xl"> <span className="text-gradient-brand">SUMSHODINI</span></h1>
          <p className="mt-4 text-muted-foreground">Every workshop, hackathon, and talk — all in one place</p>
        </motion.div>
      </section>

      <div className="sticky top-16 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary py-2 pl-9 pr-4 text-sm focus:border-accent/50 focus:outline-none" />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              <div className="flex gap-1">
                {STATUSES.map(s => (
                  <button key={s} onClick={() => setStatus(s)}
                    className={`rounded-lg px-3 py-2 font-display text-[10px] tracking-widest transition-all ${status === s ? "bg-accent text-background" : "border border-border text-muted-foreground"}`}>
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 space-y-16">
        {upcoming.length > 0 && (
          <div>
            <h2 className="mb-8 flex items-center gap-3 font-display text-xl font-bold tracking-wider">
              <Clock className="h-5 w-5 text-accent" /> UPCOMING EVENTS
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">{upcoming.length}</span>
            </h2>
            <div className="space-y-4">{upcoming.map((ev, i) => <EventCard key={ev._id} event={ev} i={i} expanded={expanded} setExpanded={setExpanded} />)}</div>
          </div>
        )}
        {past.length > 0 && (
          <div>
            <h2 className="mb-8 flex items-center gap-3 font-display text-xl font-bold tracking-wider">
              <CheckCircle2 className="h-5 w-5 text-muted-foreground" /> PAST EVENTS
              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{past.length}</span>
            </h2>
            <div className="space-y-4">{past.map((ev, i) => <EventCard key={ev._id} event={ev} i={i} expanded={expanded} setExpanded={setExpanded} />)}</div>
          </div>
        )}
        {filtered.length === 0 && <div className="py-20 text-center text-muted-foreground">No Sumshodini events found.</div>}
      </div>
      <FooterSection />
    </div>
  );
}
