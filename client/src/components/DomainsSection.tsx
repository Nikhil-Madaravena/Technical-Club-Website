import { motion } from "framer-motion";
import { Code, Brain, Shield, Globe, Cpu, Database } from "lucide-react";

const domains = [
  { icon: Code, name: "WEB DEVELOPMENT", description: "Full-stack development with modern frameworks and best practices." },
  { icon: Brain, name: "AI & MACHINE LEARNING", description: "Exploring neural networks, deep learning, and intelligent systems." },
  { icon: Shield, name: "CYBERSECURITY", description: "Ethical hacking, penetration testing, and security research." },
  { icon: Globe, name: "OPEN SOURCE", description: "Contributing to global projects and building community-driven software." },
  { icon: Cpu, name: "IOT & EMBEDDED", description: "Hardware programming, sensor networks, and smart systems." },
  { icon: Database, name: "DATA SCIENCE", description: "Analytics, visualization, and data-driven decision making." },
];

const DomainsSection = () => {
  return (
    <section id="domains" className="relative py-32">
      <div className="section-line" />
      <div className="mx-auto max-w-6xl px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-display text-[10px] tracking-[0.5em] text-accent">
            OUR EXPERTISE
          </span>
          <h2 className="font-display text-3xl font-bold tracking-wide sm:text-4xl">
            TECHNICAL <span className="text-gradient-brand">DOMAINS</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain, i) => (
            <motion.div
              key={domain.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all hover:glow-border-crimson"
            >
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-navy/5 transition-transform group-hover:scale-150" />
              <domain.icon className="relative mb-4 h-8 w-8 text-accent" />
              <h3 className="relative mb-2 font-display text-xs font-bold tracking-wider">
                {domain.name}
              </h3>
              <p className="relative text-sm leading-relaxed text-muted-foreground">
                {domain.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DomainsSection;
