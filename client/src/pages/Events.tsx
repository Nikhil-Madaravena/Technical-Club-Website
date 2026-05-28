import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Search,
  Filter,
  Trophy,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const CATEGORIES = [
  "All",
  "Hackathon",
  "Workshop",
  "Guest Lecture",
  "Competition",
  "Seminar"
];

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
    shortDescription:
      "National-level technical symposium featuring hackathon, paper presentations, and coding challenges.",
    maxParticipants: 300,
    registrationLink: "#",
    tags: ["coding", "ai", "symposium"],
    coverImage: "https://picsum.photos/seed/sum26/800/400",
  },

  {
    _id: "2",
    title: "AI WORKSHOP SERIES",
    date: "2025-11-28",
    location: "Seminar Hall",
    category: "Workshop",
    organizedBy: "IT",
    status: "completed",
    shortDescription:
      "Hands-on sessions on LLMs, transformers, and real-world AI applications.",
    registeredCount: 95,
    tags: ["ai", "ml"],
    coverImage: "https://picsum.photos/seed/aiws/800/400",
  },

  {
    _id: "3",
    title: "SUMSHODINI HACKATHON 2025",
    date: "2025-10-15",
    location: "KITSW Campus",
    category: "Sumshodini",
    organizedBy: "CSE",
    status: "completed",
    shortDescription:
      "36-hour national hackathon with 180+ participants and intense innovation challenges.",
    registeredCount: 180,
    tags: ["hackathon", "innovation"],
    coverImage: "https://picsum.photos/seed/sumhack25/800/400",
    winners: [
      { position: "1st", name: "Team Alpha", prize: "₹15,000" },
      { position: "2nd", name: "Team Beta", prize: "₹10,000" },
    ],
  },

  {
    _id: "4",
    title: "FUTURE OF WEB TECHNOLOGIES",
    date: "2026-03-05",
    location: "Auditorium",
    category: "Guest Lecture",
    organizedBy: "TC Club",
    status: "upcoming",
    shortDescription:
      "Expert talk on WebAssembly, edge computing, and modern web architecture.",
    tags: ["web", "tech"],
    coverImage: "https://picsum.photos/seed/weblec/800/400",
  },
];

const statusConfig: Record<
  string,
  { label: string; color: string; Icon: any }
> = {
  upcoming: {
    label: "UPCOMING",
    color: "text-accent bg-accent/10",
    Icon: Clock,
  },

  ongoing: {
    label: "ONGOING",
    color: "text-green-400 bg-green-400/10",
    Icon: Clock,
  },

  completed: {
    label: "COMPLETED",
    color: "text-muted-foreground bg-secondary",
    Icon: CheckCircle2,
  },
};

function EventCard({
  event: ev,
  i,
  setSelectedEvent,
}: any) {
  const cfg = statusConfig[ev.status] || statusConfig.completed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      className="overflow-hidden rounded-xl border border-border bg-card"
    >
      <button
        className="group flex w-full flex-col gap-4 p-6 text-left sm:flex-row sm:items-center"
        onClick={() => setSelectedEvent(ev)}
      >
        <div className="h-20 w-full shrink-0 overflow-hidden rounded-lg bg-secondary sm:w-32">
          {ev.coverImage && (
            <img
              src={ev.coverImage}
              alt={ev.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span
              className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 font-display text-[9px] tracking-wider ${cfg.color}`}
            >
              <cfg.Icon className="h-2.5 w-2.5" />
              {cfg.label}
            </span>

            <span className="rounded-full bg-secondary px-2.5 py-0.5 font-display text-[9px] tracking-wider text-muted-foreground">
              {ev.category}
            </span>

            {ev.tags?.slice(0, 2).map((t: string) => (
              <span
                key={t}
                className="rounded-full border border-border px-2 py-0.5 text-[9px] text-muted-foreground"
              >
                {t}
              </span>
            ))}

            {ev.organizedBy && (
              <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[9px] text-accent">
                Organized by {ev.organizedBy}
              </span>
            )}
          </div>

          <h3 className="mb-1 font-display text-sm font-bold tracking-wider">
            {ev.title}
          </h3>

          <p className="mb-3 text-xs text-muted-foreground line-clamp-2">
            {ev.shortDescription || ev.description}
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />

              {new Date(ev.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>

            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {ev.location}
            </span>

            {ev.registeredCount > 0 && (
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {ev.registeredCount} registered
              </span>
            )}
          </div>
        </div>

        <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>(FALLBACK_EVENTS);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [status, setStatus] = useState("All");

  const [selectedEvent, setSelectedEvent] =
    useState<any | null>(null);

  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedEvent]);

  const filtered = events.filter((ev) => {
    const matchSearch =
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      (ev.shortDescription || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchCat =
      category === "All" || ev.category === category;

    const matchSt =
      status === "All" || ev.status === status;

    return matchSearch && matchCat && matchSt;
  });

  const upcoming = filtered.filter(
    (e) =>
      e.status === "upcoming" ||
      e.status === "ongoing"
  );

  const past = filtered.filter(
    (e) =>
      e.status === "completed" ||
      e.status === "cancelled"
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-grid-pattern" />
        <div className="absolute inset-0 bg-radial-glow" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <span className="mb-4 inline-block font-display text-[10px] tracking-[0.5em] text-accent">
            ALL ACTIVITIES
          </span>

          <h1 className="font-display text-5xl font-black tracking-wide sm:text-7xl">
            EVENTS{" "}
            <span className="text-gradient-brand">
              ARCHIVE
            </span>
          </h1>

          <p className="mt-4 text-muted-foreground">
            Every workshop, hackathon, and talk —
            all in one place
          </p>
        </motion.div>
      </section>

      <div className="sticky top-16 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full rounded-lg border border-border bg-secondary py-2 pl-9 pr-4 text-sm focus:border-accent/50 focus:outline-none"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto">
              <div className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-2">
                <Filter className="h-3.5 w-3.5 text-muted-foreground" />

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="bg-transparent text-xs focus:outline-none"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-1">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`rounded-lg px-3 py-2 font-display text-[10px] tracking-widest transition-all ${
                      status === s
                        ? "bg-accent text-background"
                        : "border border-border text-muted-foreground"
                    }`}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-16 px-6 py-12">
        {upcoming.length > 0 && (
          <div>
            <h2 className="mb-8 flex items-center gap-3 font-display text-xl font-bold tracking-wider">
              <Clock className="h-5 w-5 text-accent" />

              UPCOMING EVENTS

              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
                {upcoming.length}
              </span>
            </h2>

            <div className="space-y-4">
              {upcoming.map((ev, i) => (
                <EventCard
                  key={ev._id}
                  event={ev}
                  i={i}
                  setSelectedEvent={setSelectedEvent}
                />
              ))}
            </div>
          </div>
        )}

        {past.length > 0 && (
          <div>
            <h2 className="mb-8 flex items-center gap-3 font-display text-xl font-bold tracking-wider">
              <CheckCircle2 className="h-5 w-5 text-muted-foreground" />

              PAST EVENTS

              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                {past.length}
              </span>
            </h2>

            <div className="space-y-4">
              {past.map((ev, i) => (
                <EventCard
                  key={ev._id}
                  event={ev}
                  i={i}
                  setSelectedEvent={setSelectedEvent}
                />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No events found matching your filters.
          </div>
        )}
      </div>

      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl"
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute right-4 top-4 text-xl text-muted-foreground hover:text-white"
            >
              ✕
            </button>

            {selectedEvent.coverImage && (
              <img
                src={selectedEvent.coverImage}
                alt={selectedEvent.title}
                className="mb-6 h-64 w-full rounded-xl object-cover"
              />
            )}

            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
                {selectedEvent.category}
              </span>

              {selectedEvent.organizedBy && (
                <span className="rounded-full border border-accent/30 px-3 py-1 text-xs text-accent">
                  Organized by{" "}
                  {selectedEvent.organizedBy}
                </span>
              )}
            </div>

            <h2 className="mb-4 font-display text-3xl font-bold">
              {selectedEvent.title}
            </h2>

            <p className="mb-6 leading-relaxed text-muted-foreground">
              {selectedEvent.description ||
                selectedEvent.shortDescription}
            </p>

            <div className="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />

                {new Date(
                  selectedEvent.date
                ).toLocaleDateString("en-IN")}
              </span>

              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {selectedEvent.location}
              </span>

              {selectedEvent.registeredCount > 0 && (
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {selectedEvent.registeredCount} registered
                </span>
              )}
            </div>

            {selectedEvent.winners?.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 font-display text-sm tracking-widest text-accent">
                  WINNERS
                </h3>

                <div className="space-y-2">
                  {selectedEvent.winners.map((w: any) => (
                    <div
                      key={w.position}
                      className="flex items-center gap-3 rounded-lg bg-secondary p-3"
                    >
                      <Trophy className="h-4 w-4 text-yellow-400" />

                      <span className="font-display text-xs font-bold">
                        {w.position}
                      </span>

                      <span className="flex-1 text-sm">
                        {w.name || w.team}
                      </span>

                      <span className="text-sm text-accent">
                        {w.prize}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedEvent.registrationLink &&
              selectedEvent.status !==
                "completed" && (
                <a
                  href={selectedEvent.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-display text-sm tracking-widest text-background hover:opacity-90"
                >
                  REGISTER NOW

                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
          </motion.div>
        </div>
      )}

      <FooterSection />
    </div>
  );
}