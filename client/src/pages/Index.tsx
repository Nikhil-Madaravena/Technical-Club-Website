import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import DomainsSection from "@/components/DomainsSection";
import SumshodhiniSection from "@/components/SumshodhiniSection";
import EventsSection from "@/components/EventsSection";
import TeamSection from "@/components/TeamSection";
import { Footer } from "@/components/ui/modem-animated-footer";
import { FloatingPathsBackground } from "@/components/ui/floating-paths";
import { ParallaxGallery } from "@/components/ui/3d-parallax-unfurling-gallery";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import tcLogo from "@/assets/tc-logo.png";

const Index = () => {
  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/Nikhil-Madaravena/Technical-Club-Website",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "#",
      label: "LinkedIn",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "#",
      label: "Instagram",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:technicalclub@kitsw.ac.in",
      label: "Email",
    },
  ];

  const navLinks = [
    { label: "About", href: "/#about" },
    { label: "Domains", href: "/#domains" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Team", href: "/#team" },
    { label: "Join Us", href: "/join" },
  ];

  return (
    <FloatingPathsBackground position={1} className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      
      <AboutSection />
      <StatsSection />
      <DomainsSection />
      <SumshodhiniSection />
      
      {/* 3D Parallax Unfurling Gallery Section */}
      <section className="relative py-24 bg-black overflow-hidden border-t border-neutral-900">
        <div className="mx-auto max-w-6xl px-6 mb-16 text-center">
          <span className="mb-4 inline-block font-display text-[10px] tracking-[0.5em] text-accent">
            LIFE AT TC
          </span>
          <h2 className="font-display text-3xl font-bold tracking-wide sm:text-5xl mb-4">
            MEMORIES IN <span className="text-gradient-brand">3D PARALLAX</span>
          </h2>
          <p className="text-sm text-neutral-400 max-w-lg mx-auto">
            Scroll inside the gallery canvas to explore dynamic snapshots of our workshops, code sprints, and tech fests in 3D depth space.
          </p>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ParallaxGallery />
        </div>
      </section>

      <EventsSection />
      <TeamSection />
      
      <Footer
        brandName="TECHNICAL CLUB"
        brandDescription="The official technical club of Kakatiya Institute of Technology & Science, Warangal. Fostering innovation, coding excellence, and hardware engineering."
        socialLinks={socialLinks}
        navLinks={navLinks}
        creatorName="TC Seniors"
        creatorUrl="#"
        brandIcon={<img src={tcLogo} alt="TC Logo" className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 rounded-full border border-white/20" />}
      />
    </FloatingPathsBackground>
  );
};

export default Index;
