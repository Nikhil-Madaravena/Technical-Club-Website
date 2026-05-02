import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import tcLogo from "@/assets/tc-logo.png";

const NAV_LINKS = [
  { label: "Home",         href: "/" },
  { label: "Events",       href: "/events" },
  { label: "Gallery",      href: "/gallery" },
  { label: "Join Us",      href: "/join" },
  { label: "Contact",      href: "/contact" },
];

// Anchor links for homepage sections
const HOME_ANCHORS = [
  { label: "About",   href: "/#about" },
  { label: "Team",    href: "/#team" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const allLinks = isHome
    ? [
        { label: "About",        href: "#about" },
        { label: "Events",       href: "/events" },
        { label: "Gallery",      href: "/gallery" },
        { label: "Team",         href: "#team" },
        { label: "Join Us",      href: "/join" },
        { label: "Contact",      href: "/contact" },
      ]
    : NAV_LINKS;

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={tcLogo} alt="Technical Club KITSW" className="h-10 w-10 rounded-full" />
          <div className="hidden sm:block">
            <span className="font-display text-sm font-bold tracking-wider text-foreground">TECHNICAL CLUB</span>
            <span className="block text-[10px] tracking-[0.3em] text-muted-foreground">KITSW</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {allLinks.map(({ label, href }) =>
            href.startsWith("#") ? (
              <a key={label} href={href}
                className="font-display text-[10px] tracking-widest text-muted-foreground transition-colors hover:text-foreground">
                {label.toUpperCase()}
              </a>
            ) : (
              <Link key={label} to={href}
                className={`font-display text-[10px] tracking-widest transition-colors hover:text-foreground ${location.pathname === href ? "text-foreground" : "text-muted-foreground"}`}>
                {label.toUpperCase()}
              </Link>
            )
          )}
          <Link to="/admin"
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 font-display text-[10px] tracking-widest text-muted-foreground transition-all hover:border-accent/50 hover:text-accent">
            <Shield className="h-3 w-3" /> ADMIN
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="text-foreground md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {allLinks.map(({ label, href }) =>
                href.startsWith("#") ? (
                  <a key={label} href={href} onClick={() => setIsOpen(false)}
                    className="font-display text-sm tracking-widest text-muted-foreground transition-colors hover:text-foreground">
                    {label.toUpperCase()}
                  </a>
                ) : (
                  <Link key={label} to={href} onClick={() => setIsOpen(false)}
                    className="font-display text-sm tracking-widest text-muted-foreground transition-colors hover:text-foreground">
                    {label.toUpperCase()}
                  </Link>
                )
              )}
              <Link to="/admin" onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 font-display text-sm tracking-widest text-accent">
                <Shield className="h-4 w-4" /> ADMIN PANEL
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
