import tcLogo from "@/assets/tc-logo.png";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

const FooterSection = () => {
  return (
    <footer id="contact" className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img src={tcLogo} alt="TC Logo" className="h-10 w-10 rounded-full" />
              <div>
                <span className="font-display text-sm font-bold tracking-wider">TECHNICAL CLUB</span>
                <span className="block text-[10px] tracking-[0.3em] text-muted-foreground">KITSW</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Invent. Imagine. Inspire. Building the next generation of technologists at KITSW.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-display text-xs font-bold tracking-wider">QUICK LINKS</h4>
            <div className="flex flex-col gap-2">
              {["About", "Domains", "Events", "Team"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-display text-xs font-bold tracking-wider">CONNECT</h4>
            <div className="flex gap-4">
              {[Github, Linkedin, Instagram, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="rounded-lg border border-border p-2.5 text-muted-foreground transition-all hover:border-navy-light/50 hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              technicalclub@kitsw.ac.in
            </p>
          </div>
        </div>

        <div className="section-line mt-12" />
        <p className="mt-6 text-center font-display text-[10px] tracking-[0.3em] text-muted-foreground">
          © 2026 TECHNICAL CLUB KITSW. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
