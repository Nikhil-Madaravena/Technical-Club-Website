import React from "react";
import { Link } from "react-router-dom";
import {
  NotepadTextDashed,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: React.ReactNode;
  className?: string;
}

export const Footer = ({
  brandName = "TECHNICAL CLUB",
  brandDescription = "The official technical club of Kakatiya Institute of Technology & Science, Warangal. Fostering innovation, coding excellence, and hardware engineering.",
  socialLinks = [],
  navLinks = [],
  creatorName = "TC Seniors",
  creatorUrl = "#",
  brandIcon,
  className,
}: FooterProps) => {
  return (
    <section className={cn("relative w-full mt-0 overflow-hidden", className)}>
      <footer className="border-t border-neutral-800 bg-black mt-20 relative">
        <div className="max-w-7xl flex flex-col justify-between mx-auto min-h-[30rem] sm:min-h-[35rem] md:min-h-[40rem] relative p-4 py-10">
          <div className="flex flex-col mb-12 sm:mb-20 md:mb-0 w-full">
            <div className="w-full flex flex-col items-center">
              <div className="space-y-2 flex flex-col items-center flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white text-3xl font-extrabold tracking-wider font-display">
                    {brandName}
                  </span>
                </div>
                <p className="text-neutral-400 font-medium text-center w-full max-w-sm sm:w-96 px-4 sm:px-0">
                  {brandDescription}
                </p>
              </div>

              {socialLinks.length > 0 && (
                <div className="flex mb-8 mt-3 gap-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="text-neutral-400 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-6 h-6 hover:scale-110 duration-300">
                        {link.icon}
                      </div>
                      <span className="sr-only">{link.label}</span>
                    </a>
                  ))}
                </div>
              )}

              {navLinks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-neutral-400 max-w-full px-4">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      className="hover:text-white duration-300 hover:font-semibold tracking-wider text-xs uppercase"
                      to={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-20 md:mt-24 flex flex-col gap-2 md:gap-1 items-center justify-center md:flex-row md:items-center md:justify-between px-4 md:px-0 border-t border-neutral-900 pt-6">
            <p className="text-sm text-neutral-500 text-center md:text-left">
              ©{new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            {creatorName && (
              <nav className="flex gap-4">
                <a
                  href={creatorUrl}
                  className="text-sm text-neutral-500 hover:text-white transition-colors duration-300 font-medium"
                >
                  Crafted with ♥ by {creatorName}
                </a>
              </nav>
            )}
          </div>
        </div>

        {/* Large background text - FIXED */}
        <div 
          className="bg-gradient-to-b from-neutral-800/10 via-neutral-900/5 to-transparent bg-clip-text text-transparent leading-none absolute left-1/2 -translate-x-1/2 bottom-40 md:bottom-32 font-extrabold tracking-tighter pointer-events-none select-none text-center px-4"
          style={{
            fontSize: 'clamp(3rem, 12vw, 10rem)',
            maxWidth: '95vw'
          }}
        >
          {brandName.toUpperCase()}
        </div>

        {/* Bottom logo */}
        <div className="absolute hover:border-white duration-400 drop-shadow-[0_0px_20px_rgba(255,255,255,0.15)] bottom-24 md:bottom-20 backdrop-blur-sm rounded-3xl bg-black/60 left-1/2 border-2 border-neutral-800 flex items-center justify-center p-3 -translate-x-1/2 z-10">
          <div className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-gradient-to-br from-red-600 to-crimson rounded-2xl flex items-center justify-center shadow-lg">
            {brandIcon || (
              <Shield className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-white drop-shadow-lg" />
            )}
          </div>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-32 sm:bottom-34 backdrop-blur-sm h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent w-full left-1/2 -translate-x-1/2"></div>

        {/* Bottom shadow */}
        <div className="bg-gradient-to-t from-black via-black/80 blur-[1em] to-black/40 absolute bottom-28 w-full h-24"></div>
      </footer>
    </section>
  );
};
