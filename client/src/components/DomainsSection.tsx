import { motion } from "framer-motion";
import { Code, Brain, Shield, Globe, Cpu, Database } from "lucide-react";

const domains = [
  {
    icon: Code,
    name: "WEB DEVELOPMENT",
    description: "Full-stack development with modern frameworks — React, Node.js, and cloud-native architectures.",
    accent: "navy",
  },
  {
    icon: Brain,
    name: "AI & MACHINE LEARNING",
    description: "Exploring neural networks, deep learning, LLMs, and intelligent autonomous systems.",
    accent: "crimson",
  },
  {
    icon: Shield,
    name: "CYBERSECURITY",
    description: "Ethical hacking, penetration testing, cryptography, and applied security research.",
    accent: "navy",
  },
  {
    icon: Globe,
    name: "OPEN SOURCE",
    description: "Contributing to global projects and building community-driven software that scales.",
    accent: "crimson",
  },
  {
    icon: Cpu,
    name: "IOT & EMBEDDED",
    description: "Hardware programming, sensor networks, microcontrollers, and smart systems.",
    accent: "navy",
  },
  {
    icon: Database,
    name: "DATA SCIENCE",
    description: "Analytics, visualization, data pipelines, and data-driven engineering decisions.",
    accent: "crimson",
  },
];

const DomainsSection = () => {
  return (
    <section id="domains" className="relative py-32 overflow-hidden">
      <div className="section-line" />

      {/* Background orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[350px] w-[350px] rounded-full bg-navy/8 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/3 h-[250px] w-[250px] rounded-full bg-crimson/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-navy-light/25 bg-navy/10 px-4 py-1.5 font-display text-[9px] tracking-[0.4em] text-navy-light">
            OUR EXPERTISE
          </span>
          <h2 className="font-display text-3xl font-bold tracking-wide sm:text-5xl">
            TECHNICAL <span className="text-gradient-brand">DOMAINS</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            We operate across six core technical domains — each driven by student leads and backed by faculty mentorship.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain, i) => (
            <motion.div
              key={domain.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="group animated-border relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-navy-light/25 hover:shadow-xl hover:shadow-navy/10"
            >
              {/* Background circle */}
              <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-navy/6 transition-transform duration-500 group-hover:scale-[2] group-hover:bg-navy/8" />

              {/* Icon */}
              <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-secondary transition-all group-hover:border-navy-light/30 group-hover:bg-navy/15">
                <domain.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-navy-light" />
              </div>

              <h3 className="relative mb-3 font-display text-xs font-bold tracking-widest text-foreground">
                {domain.name}
              </h3>
              <p className="relative text-sm leading-relaxed text-muted-foreground">
                {domain.description}
              </p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-navy-light to-crimson transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DomainsSection;
