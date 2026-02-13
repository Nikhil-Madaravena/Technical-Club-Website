import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Code2, Wrench, Mic, Trophy } from "lucide-react";

const events = [
  {
    title: "HACKATHON 2026",
    date: "March 15-16, 2026",
    location: "KITSW Campus",
    description: "A 36-hour coding marathon to solve real-world problems with technology.",
    tag: "UPCOMING",
    category: "Hackathon",
    icon: Code2,
  },
  {
    title: "AI WORKSHOP SERIES",
    date: "February 28, 2026",
    location: "Seminar Hall",
    description: "Hands-on workshop on building intelligent applications with LLMs and transformers.",
    tag: "UPCOMING",
    category: "Workshop",
    icon: Wrench,
  },
  {
    title: "GUEST LECTURE: FUTURE OF WEB",
    date: "March 5, 2026",
    location: "Auditorium",
    description: "Industry expert session on WebAssembly, edge computing, and the next web.",
    tag: "UPCOMING",
    category: "Guest Lecture",
    icon: Mic,
  },
  {
    title: "CODE SPRINT",
    date: "April 5, 2026",
    location: "CS Lab Complex",
    description: "Competitive programming contest with algorithmic challenges and prizes.",
    tag: "REGISTRATION OPEN",
    category: "Competition",
    icon: Trophy,
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="relative py-32">
      <div className="section-line" />
      <div className="mx-auto max-w-5xl px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-display text-[10px] tracking-[0.5em] text-accent">
            WHAT'S HAPPENING
          </span>
          <h2 className="font-display text-3xl font-bold tracking-wide sm:text-4xl">
            UPCOMING <span className="text-gradient-brand">EVENTS</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:glow-border-navy sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary transition-colors group-hover:border-navy-light/50">
                  <event.icon className="h-5 w-5 text-navy-light transition-colors group-hover:text-accent" />
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-sm font-bold tracking-wider">{event.title}</h3>
                    <span className="rounded-full bg-accent/10 px-3 py-0.5 font-display text-[9px] tracking-wider text-accent">
                      {event.tag}
                    </span>
                    <span className="rounded-full bg-secondary px-3 py-0.5 font-display text-[9px] tracking-wider text-muted-foreground">
                      {event.category}
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground">{event.description}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {event.location}
                    </span>
                  </div>
                </div>
              </div>
              <ArrowRight className="hidden h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent sm:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
