import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import DomainsSection from "@/components/DomainsSection";
import SumshodhiniSection from "@/components/SumshodhiniSection";
import EventsSection from "@/components/EventsSection";
import TeamSection from "@/components/TeamSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <DomainsSection />
      <SumshodhiniSection />
      <EventsSection />
      <TeamSection />
      <FooterSection />
    </div>
  );
};

export default Index;
