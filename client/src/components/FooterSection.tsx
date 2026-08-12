import tcLogo from "@/assets/tc-logo.png";
import { Github, Linkedin, Instagram, Mail, MapPin, Phone, ExternalLink } from "lucide-react";

const quickLinks = [
  { label: "About", href: "/#about" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team", href: "/#team" },
  { label: "Sumshodhini", href: "/#sumshodhini" },
  { label: "Join Us", href: "/join" },
];

const socials = [
  { Icon: Github,    href: "#", label: "GitHub"    },
  { Icon: Linkedin,  href: "#", label: "LinkedIn"  },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Mail,      href: "mailto:tc.sac@kitsw.ac.in", label: "Email" },
];

const FooterSection = () => {
  return (
    <footer className="relative border-t border-border/60 bg-card overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-40" />
      <div className="pointer-events-none absolute left-0 top-0 h-[200px] w-[400px] bg-navy/6 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand column */}
          <div className="md:col-span-4">
            <div className="mb-5 flex items-center gap-3">
              <img src={tcLogo} alt="TC Logo" className="h-11 w-11 rounded-full ring-1 ring-border" />
              <div>
                <span className="block font-display text-sm font-bold tracking-wider text-foreground">TECHNICAL CLUB</span>
                <span className="block text-[9px] tracking-[0.35em] text-muted-foreground">KITSW · WARANGAL</span>
              </div>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Invent. Imagine. Inspire. Building the next generation of technologists at Kakatiya Institute of Technology &amp; Science, Warangal.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-navy-light/70" />
                <a href="mailto:tc.sac@kitsw.ac.in" className="hover:text-foreground transition-colors">
                  tc.sac@kitsw.ac.in
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy-light/70" />
                <span>KITSW, Hasanparthy, Warangal — 506015, Telangana</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h4 className="mb-5 font-display text-[10px] font-bold tracking-[0.3em] text-foreground">QUICK LINKS</h4>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 md:grid-cols-1">
              {quickLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex items-center gap-1.5 text-sm text-muted-foreground transition-all hover:text-foreground"
                >
                  <span className="h-px w-0 bg-gradient-to-r from-navy-light to-crimson transition-all group-hover:w-4" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="md:col-span-5">
            <h4 className="mb-5 font-display text-[10px] font-bold tracking-[0.3em] text-foreground">CONNECT WITH US</h4>
            <div className="mb-6 flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground transition-all hover:border-navy-light/40 hover:bg-navy/15 hover:text-foreground hover:shadow-lg hover:shadow-navy/10"
                >
                  <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>

            {/* KITSW link */}
            <a
              href="https://www.kitsw.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2.5 text-xs text-muted-foreground transition-all hover:border-navy-light/30 hover:text-foreground"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Visit KITSW Official Website
            </a>

            {/* Premier student body badge */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-navy-light/20 bg-navy/8 px-3 py-1.5 font-display text-[9px] tracking-widest text-navy-light/80">
              PREMIER STUDENT TECHNICAL BODY · KITSW
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="section-line mt-12" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="font-display text-[9px] tracking-[0.3em] text-muted-foreground">
            © {new Date().getFullYear()} TECHNICAL CLUB KITSW. ALL RIGHTS RESERVED.
          </p>
          <p className="font-display text-[9px] tracking-[0.2em] text-muted-foreground/60">
            INVENT · IMAGINE · INSPIRE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
