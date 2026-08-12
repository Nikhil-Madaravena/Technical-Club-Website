import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import tcLogo from "@/assets/tc-logo.png";

const NAV_LINKS = [
  { label: "Events",  href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Join Us", href: "/join" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen]       = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const allLinks = isHome
    ? [
        { label: "About",   href: "#about" },
        { label: "Events",  href: "/events" },
        { label: "Gallery", href: "/gallery" },
        { label: "Team",    href: "#team" },
        { label: "Join Us", href: "/join" },
        { label: "Contact", href: "/contact" },
      ]
    : NAV_LINKS;

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/90 shadow-lg shadow-background/20 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-navy/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
            <img src={tcLogo} alt="Technical Club KITSW" className="relative h-9 w-9 rounded-full ring-1 ring-border" />
          </div>
          <div className="hidden sm:block">
            <span className="block font-display text-sm font-bold tracking-wider text-foreground">TECHNICAL CLUB</span>
            <span className="block text-[9px] tracking-[0.35em] text-muted-foreground">KITSW · WARANGAL</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {allLinks.map(({ label, href }) =>
            href.startsWith("#") ? (
              <a
                key={label}
                href={href}
                className="rounded-lg px-3 py-2 font-display text-[10px] tracking-widest text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
              >
                {label.toUpperCase()}
              </a>
            ) : (
              <Link
                key={label}
                to={href}
                className={`rounded-lg px-3 py-2 font-display text-[10px] tracking-widest transition-all hover:bg-secondary hover:text-foreground ${
                  location.pathname === href ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label.toUpperCase()}
              </Link>
            )
          )}

          <div className="mx-2 h-5 w-px bg-border" />

          <Link
            to="/admin"
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 font-display text-[10px] tracking-widest text-muted-foreground transition-all hover:border-accent/40 hover:bg-accent/8 hover:text-accent"
          >
            <Shield className="h-3 w-3" /> ADMIN
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-foreground transition-all hover:border-navy-light/40 md:hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? "x" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {allLinks.map(({ label, href }) =>
                href.startsWith("#") ? (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 font-display text-sm tracking-widest text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
                  >
                    {label.toUpperCase()}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <Link
                    key={label}
                    to={href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 font-display text-sm tracking-widest text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
                  >
                    {label.toUpperCase()}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                )
              )}
              <div className="mt-2 border-t border-border pt-2">
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 font-display text-sm tracking-widest text-accent transition-all hover:bg-accent/8"
                >
                  <Shield className="h-4 w-4" /> ADMIN PANEL
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
