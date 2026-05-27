import { motion } from "framer-motion";
import { Calendar, MapPin, User, ArrowRight, Code2, Wrench, Mic, Trophy } from "lucide-react";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

const categoryIcons: Record<string, any> = {
  "Hackathon": Code2,
  "Workshop": Wrench,
  "Guest Lecture": Mic,
  "Competition": Trophy,
  "Sumshodini": Code2,
};

const EventsSection = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.events.getUpcoming()
      .then(res => setEvents(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && events.length === 0) return null;
  return (
    <section id="events" className="relative py-32">
      <div className="section-line" />
      {loading ? (
        <div className="mx-auto max-w-5xl px-6 pt-20 text-center">
          <p className="text-muted-foreground">Loading events...</p>
        </div>
      ) : (
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
                  {(() => {
                    const Icon = categoryIcons[event.category] || Code2;
                    return <Icon className="h-5 w-5 text-navy-light transition-colors group-hover:text-accent" />;
                  })()}
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-sm font-bold tracking-wider">{event.title}</h3>
                    <span className="rounded-full bg-accent/10 px-3 py-0.5 font-display text-[9px] tracking-wider text-accent">
                      {event.status?.toUpperCase() || "UPCOMING"}
                    </span>
                    <span className="rounded-full bg-secondary px-3 py-0.5 font-display text-[9px] tracking-wider text-muted-foreground">
                      {event.category}
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground">{event.description}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {event.location}
                    </span>
                    {event.organizedBy && (
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                            {event.organizedBy}
                        </span>
                      )}
                  </div>
                </div>
              </div>
              {event.registrationLink ? (
                <a 
                  href={event.registrationLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="rounded-lg bg-accent px-4 py-2 font-display text-[10px] font-bold tracking-widest text-background hover:bg-accent/90 transition-colors"
                >
                  REGISTER NOW
                </a>
              ) : (
                <ArrowRight className="hidden h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent sm:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
      )}
    </section>
  );
};

export default EventsSection;
