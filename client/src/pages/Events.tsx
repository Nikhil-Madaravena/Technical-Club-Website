import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, MapPin, Users, Search, Filter, Trophy,
  ArrowRight, Clock, CheckCircle2, ChevronDown, Lightbulb,
  Star, Mic, BookOpen, Award, ExternalLink, Tag, Globe, Monitor, Code, Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { api } from "@/lib/api";

/* ─────────────────────────────────────────────────────────────────
   REAL EVENT DATA (Includes IDEATHON 2026, TECH-TAC-TOE, CODE4KITSW, Sumshodhini'24 & Ideathon 24)
───────────────────────────────────────────────────────────────── */
const FALLBACK_EVENTS = [
  /* ──────── IDEATHON 2026 ──────── */
  {
    _id: "ideathon-2026",
    title: "IDEATHON 2026",
    date: "2026-03-28",
    time: "9:30 AM – 1:00 PM",
    location: "MMH Lab, I²RE, KITSW",
    mode: "Offline",
    category: "Competition",
    status: "completed",
    shortDescription:
      "Pitch competition organized in association with C–I²RE & Institution's Innovation Council — 105 registrations, 44 shortlisted.",
    description:
      "IDEATHON 2026 was organized by Technical Club KITSW in association with C–I²RE (Centre for Innovation Incubation & Entrepreneurship) and Institution's Innovation Council. Chief Guests included Capt. V. Lakshmikantha Rao (KITSW Chairman / former RS MP), P. Narayana Reddy (Treasurer), Vodithala Satish Kumar (Additional Secretary), Prof. K. Ashoka Reddy (Principal), Dr. K. Sridhar (Dean Student Affairs), Dr. K. Raja Narendar Reddy (Head, C-I²RE), and Dr. B. Vijay Kumar (TC Faculty In-charge).\n\nOut of 105 student registrations, 44 were selected for idea presentations. Sample problem statements pitched included AlgoVision AI (DSA visualizer), AI Digital Addiction Recovery Assistant, Traffic AI, Smart India Post addressing, Agriculture Precision Farming, and Food Waste Redistribution System. The event received widespread coverage in South India Times, Telangana Galam, and Janam.",
    registeredCount: 105,
    shortlistedCount: 44,
    tags: ["ideathon-2026", "c-i2re", "iic", "innovation", "startup"],
    coverImage: "https://picsum.photos/seed/ideathon26/800/400",
    highlights: [
      "In Association with C-I²RE & IIC",
      "105 Registrations, 44 Shortlisted",
      "Dignitaries led by Capt. V. Lakshmikantha Rao",
      "₹1,500 1st Prize & ₹1,000 2nd Prize",
      "Covered in South India Times & Dailies"
    ],
    support: [
      { name: "Capt. V. Lakshmikantha Rao", role: "KITSW Chairman / Former RS MP" },
      { name: "Prof. K. Ashoka Reddy", role: "Principal, KITSW" },
      { name: "Dr. K. Sridhar", role: "Dean Student Affairs" },
      { name: "Dr. K. Raja Narendar Reddy", role: "Head, C-I²RE" },
      { name: "Dr. B. Vijay Kumar", role: "TC Faculty In-charge" },
    ],
    organizers: [
      { name: "K. Shashikanth", role: "President" },
      { name: "Nandini Azmeera", role: "Vice President" },
      { name: "B. Manaswini", role: "Joint Secretary" },
      { name: "Md. Asma", role: "Joint Secretary" },
      { name: "N. Sheshanka Desai", role: "Event Mgmt" },
      { name: "M. Sai Charan", role: "Membership Coordinator" },
      { name: "T. Tejaswini", role: "Documentation" }
    ],
    winners: [
      { position: "1st", name: "Kanukuntla Hari Charan, Sidhartha Thummanapalli", team: "Branch: CSE", prize: "₹1,500 + Merit Cert" },
      { position: "2nd", name: "M. Puneeth, N. Sadhveer Chowdary, M.V.S Umesh Chandra, Shazia Taskeen", team: "Branch: CSE / AIML", prize: "₹1,000 + Merit Cert" },
      { position: "3rd", name: "Gaurav Sujikumar, Salma Tabassum, D. Shilpa", team: "Branch: AIML / CSN", prize: "Merit Certificate" },
    ]
  },

  /* ──────── TECH-TAC-TOE (SUMSHODHINI'25) ──────── */
  {
    _id: "tech-tac-toe-2025",
    title: "TECH–TAC–TOE (Sumshodhini'25)",
    date: "2025-10-18",
    time: "10:00 AM – 11:30 AM",
    location: "KITSW Campus, Warangal",
    mode: "Offline",
    category: "Competition",
    status: "completed",
    shortDescription:
      "Central Technical Club event for Sumshodhini'25 — 3 rounds featuring puzzle decoding, C debugging & tech blitz.",
    description:
      "TECH–TAC–TOE was organized by Technical Club KITSW as a central event for Sumshodhini'25. The event challenged 27 registered participants across 3 rounds:\n1. Think N' Tac — chit-based puzzle decoding combined with Tic-Tac-Toe.\n2. Code Crackers — debugging buggy 3-4 line C programs using hint clues.\n3. Tech Blitz — connected-image visual logic rounds to guess tech concepts.\n\nParticipants spanned CSE, ECE, Civil, CSO, CSM, CSD, and CSN branches.",
    registeredCount: 27,
    tags: ["tech-tac-toe", "sumshodhini25", "c-debugging", "puzzles"],
    coverImage: "https://picsum.photos/seed/techtactoe/800/400",
    highlights: [
      "Sumshodhini'25 Central Event",
      "3 Competitive Rounds",
      "Think N' Tac, Code Crackers & Tech Blitz",
      "Multi-branch Participation"
    ],
    organizers: [
      { name: "V. Madhusri", role: "Executive Member" },
      { name: "B. Anshika Sahasra", role: "Executive Member" },
      { name: "G. Manvika", role: "Executive Member" },
      { name: "K. Teja Karthik", role: "Executive Member" },
      { name: "M. Nikhil", role: "Executive Member" },
      { name: "Ch. Udayini", role: "Executive Member" }
    ],
    winners: [
      { position: "1st", name: "Chunchula Sri Pranvitha, Kusuma Ishwarya, Kusuma Akshay", team: "Branches: CSE / ECE", prize: "₹500 + Merit Cert" },
      { position: "2nd", name: "Puneeth, Sadhveer, Saathwiki, Adbutha", team: "Branches: CSE / CSM", prize: "₹300 + Merit Cert" }
    ]
  },

  /* ──────── SUMSHODHINI '24 ──────── */
  {
    _id: "sumshodhini-2024",
    title: "SUMSHODHINI'24",
    date: "2024-10-18",
    endDate: "2024-10-19",
    time: "2-Day National Fest",
    location: "KITSW Campus (Offline)",
    mode: "Offline",
    category: "Competition",
    status: "completed",
    shortDescription:
      "The 18th edition of KITSW's national technical fest themed 'Innovation Beyond Boundaries' — organized by ISTE KITS Student Chapter & Technical Club.",
    description:
      "Sumshodhini'24 (18th Edition) brought together engineering and management students nationwide under the theme 'Innovation Beyond Boundaries'. Organized jointly by the ISTE KITS Student Chapter and Technical Club KITSW across two days, concluding with a valedictory address by Dr. V. Shankar (Head, CSE-Networks).\n\nCentral TC Flagship Events:\n• Drive Dynamos (19 Oct 2024): Simulated placement experience (aptitude, tech & interview rounds) with ₹1,500 cash prize + online internship.\n• Treasure Hunt (19 Oct 2024): Clue-based problem-solving adventure with ₹3,000 cash prize.\n\nFeatured fests & tracks included Paper & Poster Presentations, Panel Discussions, Glitch in Matrix, Jarvis, Techno Fusion, Cyber Clash, Truss Masters, and 17 dedicated student organizing committees.",
    registeredCount: 850,
    tags: ["sumshodhini", "national-fest", "innovation", "drive-dynamos", "treasure-hunt"],
    coverImage: "https://picsum.photos/seed/sumshodhini24/800/400",
    highlights: [
      "18th National Edition",
      "2-Day National Technical Fest",
      "Drive Dynamos (₹1,500 + Internship)",
      "Treasure Hunt (₹3,000 Cash Prize)",
      "Valedictory led by Dr. V. Shankar",
      "17 Organizing Committees",
    ],
    support: [
      { name: "Dr. V. Shankar", role: "Head, CSE-Networks" },
      { name: "Dr. B. Vijay Kumar", role: "Faculty In-charge, Technical Club" },
    ],
    organizers: [
      { name: "V. Siddartha", role: "General Secretary (TC)" },
      { name: "Nishath Sultana", role: "General Secretary (TC)" },
      { name: "A. Abhi Charan", role: "ISTE President" },
    ],
    winners: [
      { position: "1st", name: "Drive Dynamos", team: "Simulated Placement Winner", prize: "₹1,500 + Online Internship" },
      { position: "2nd", name: "Treasure Hunt", team: "Clue-based Navigation Team", prize: "₹3,000 Cash Prize" },
    ]
  },

  /* ──────── CODE4KITSW ──────── */
  {
    _id: "code4kitsw-2024",
    title: "CODE4KITSW",
    date: "2024-02-14",
    time: "7:00 PM – 8:00 PM",
    location: "Quizizz Platform",
    mode: "Online",
    category: "Competition",
    status: "completed",
    shortDescription:
      "A fully virtual technical skill and logical reasoning competition exclusively designed for 1st-year students — 150 participants.",
    description:
      "CODE4KITSW was an exclusive competitive event created to test technical acumen, logical reasoning, and problem-solving skills among first-year engineering students. Conducted virtually on Quizizz, the event saw enthusiastic participation from 150 first-years with overwhelmingly positive feedback.\n\nThe initiative was guided by Dr. M. Sreelatha (Dean, Student Affairs), M. Narasimha Rao (Associate Dean), and Dr. B. Vijay Kumar (Faculty In-charge), and spearheaded by student leaders V. Siddartha (GS) and G. Krishna Mohan (JS).",
    registeredCount: 150,
    tags: ["code4kitsw", "1st-year", "quizizz", "competition", "logic"],
    coverImage: "https://picsum.photos/seed/code4kitsw/800/400",
    highlights: [
      "Exclusively for 1st-Year Students",
      "150 First-Year Participants",
      "Fully Virtual on Quizizz",
      "Guided by Dean Dr. M. Sreelatha",
    ],
    support: [
      { name: "Dr. M. Sreelatha", role: "Dean, Student Affairs" },
      { name: "M. Narasimha Rao", role: "Associate Dean" },
      { name: "Dr. B. Vijay Kumar", role: "Faculty In-charge" },
    ],
    organizers: [
      { name: "V. Siddartha", role: "General Secretary" },
      { name: "G. Krishna Mohan", role: "Joint Secretary" },
    ],
    winners: [
      { position: "1st", name: "Md. Nehan", team: "Roll No: B24CS071", prize: "Gold" },
      { position: "2nd", name: "G. Vishnupriya", team: "Roll No: B24IT010", prize: "Silver" },
      { position: "3rd", name: "P. Hansika", team: "Roll No: B24CS205", prize: "Bronze" },
    ],
  },

  /* ──────── IDEATHON 2024 ──────── */
  {
    _id: "ideathon-2024",
    title: "IDEATHON 2024",
    date: "2024-01-06",
    time: "9:00 AM – 5:00 PM",
    location: "New Seminar Hall, KITSW",
    mode: "Offline",
    category: "Competition",
    status: "completed",
    shortDescription:
      "A platform for students to pitch their most innovative ideas — the best ones get adopted as multidisciplinary Technical Club projects.",
    description:
      "IDEATHON 2024 was a flagship idea-pitching competition where students presented groundbreaking concepts across engineering disciplines. The best pitches were adopted as official Technical Club multidisciplinary projects, with winners later presenting real-time implementations. Backed by the principal and faculty leadership, the event saw ~150 registrations with 100 shortlisted presentations spanning 27 distinct ideas — from 'Screenless Smartphone' to 'Smart Waste Sorting with Computer Vision' to 'Piezoelectric Roads'.\n\nThe club built the first-ever dedicated event website where students could interact with organizers and access event descriptions, aims, instructions, and a sample PPT template.",
    registeredCount: 150,
    shortlistedCount: 100,
    ideasPitched: 27,
    tags: ["ideathon", "innovation", "multidisciplinary", "projects"],
    coverImage: "https://picsum.photos/seed/ideathon24/800/400",
    highlights: [
      "~150 registrations, 100 shortlisted",
      "27 unique ideas pitched",
      "First-ever dedicated event website",
      "Ideas adopted as TC projects",
      "Prof L. Anjaneyulu (NIT Warangal) as jury",
    ],
    jury: [
      { name: "Prof. L. Anjaneyulu", affiliation: "NIT Warangal, ECE Dept. (via Centre for i2re)" },
    ],
    support: [
      { name: "Prof. K. Ashoka Reddy", role: "Principal, KITSW" },
      { name: "Dr. V. Shankar", role: "Dean Student Affairs" },
      { name: "M. Narasimha Rao", role: "Associate Dean" },
      { name: "Dr. B. Vijay Kumar", role: "Faculty In-charge" },
    ],
    organizers: [
      { name: "B. Badrinarayan", role: "General Secretary" },
      { name: "Madhukar Pooja", role: "Joint Secretary" },
      { name: "Shivani", role: "Joint Secretary" },
      { name: "Krishna Mohan G.", role: "Executive" },
    ],
    winners: [
      { position: "1st", name: "\"Nursing Care\"", team: "M. Rithwik · CH. Rithwik · N. Nagaraj · S. Sai Bharadwaj", prize: "Gold" },
      { position: "2nd", name: "\"Scan, Pay & Go\"", team: "P. Abhinav Reddy · Mohammed Faizan Ahmed", prize: "Silver", note: "Supermarket queue elimination" },
      { position: "3rd", name: "\"CCTV Crime/Crowd Detection\"", team: "P. Rahul · M. Sai Sravani · Ch. Geethika · N. ShreeVansh", prize: "Bronze", note: "AIML-based detection system" },
    ],
  },

  /* ──────── TECH WEEK – WEBINAR ──────── */
  {
    _id: "techweek-webinar-2023",
    title: "WEBINAR: POWERFUL PROFESSIONAL PROFILE",
    date: "2023-10-11",
    time: "Online",
    location: "Webex",
    mode: "Online",
    category: "Seminar",
    status: "completed",
    shortDescription:
      "Tech Week opener — guest speaker Uday Damerla (AWS ML Scholar) guided 450+ students on building impactful LinkedIn & portfolio profiles.",
    description:
      "Part of the club's Tech Week series, this webinar had AWS ML Scholar Uday Damerla walk students through the art of crafting a powerful and attractive professional profile. With 450 participants, it was one of the most attended online events run by the Technical Club. Attendees received actionable tips on LinkedIn optimization, showcasing projects, and personal branding for tech careers.",
    registeredCount: 450,
    tags: ["career", "linkedin", "personal-branding", "tech-week"],
    coverImage: "https://picsum.photos/seed/webinar23/800/400",
    highlights: ["450 participants", "AWS ML Scholar as speaker", "Tech Week 2023 opener"],
    speakers: [{ name: "Uday Damerla", credential: "AWS ML Scholar" }],
    winners: [],
  },

  /* ──────── TECH WEEK – PORTFOLIO MAKING ──────── */
  {
    _id: "techweek-portfolio-2023",
    title: "PORTFOLIO MAKING WORKSHOP",
    date: "2023-10-25",
    time: "Online",
    location: "Google Meet",
    mode: "Online",
    category: "Workshop",
    status: "completed",
    shortDescription:
      "Hands-on workshop guiding students to build professional developer portfolios — part of Tech Week 2023.",
    description:
      "A practical, hands-on session where students were walked through building their own developer portfolios from scratch. Participants learned about hosting options, project showcasing, and design principles for tech portfolios. Conducted as part of the broader Tech Week initiative.",
    tags: ["portfolio", "web", "career", "tech-week"],
    coverImage: "https://picsum.photos/seed/portfolio23/800/400",
    highlights: ["Live portfolio building", "Tech Week 2023 session"],
    winners: [],
  },

  /* ──────── TECH WEEK – RIDDLE SOLVING ──────── */
  {
    _id: "techweek-riddle-2023",
    title: "TECH RIDDLE SOLVING CHALLENGE",
    date: "2023-10-26",
    time: "Online",
    location: "Google Meet",
    mode: "Online",
    category: "Competition",
    status: "completed",
    shortDescription:
      "A fun, fast-paced tech riddle competition that tested lateral thinking and tech knowledge — Tech Week 2023.",
    description:
      "Students competed in real-time to solve cleverly crafted technology riddles. The event tested a mix of domain knowledge, lateral thinking, and speed — making it a high-energy and engaging Tech Week activity.",
    tags: ["riddles", "fun", "tech-week", "competition"],
    coverImage: "https://picsum.photos/seed/riddle23/800/400",
    highlights: ["Real-time competition", "Tech Week 2023 session"],
    winners: [],
  },

  /* ──────── TECH WEEK – TECHNICAL QUIZ ──────── */
  {
    _id: "techweek-quiz-2023",
    title: "TECHNICAL QUIZ",
    date: "2023-10-26",
    time: "Online",
    location: "Google Meet",
    mode: "Online",
    category: "Competition",
    status: "completed",
    shortDescription:
      "A comprehensive technical quiz covering CS fundamentals, current tech trends, and domain knowledge — Tech Week 2023.",
    description:
      "This quiz was the capstone event of Tech Week 2023, covering topics from CS fundamentals and programming concepts to current technology trends and industry trivia. Run via Google Meet with live scoring and announcements.",
    tags: ["quiz", "cs-fundamentals", "tech-week", "competition"],
    coverImage: "https://picsum.photos/seed/quiz23/800/400",
    highlights: ["Comprehensive CS coverage", "Live scoring", "Tech Week 2023 closer"],
    winners: [],
  },

  /* ──────── HACKATHON 2025 ──────── */
  {
    _id: "hackathon-2025",
    title: "HACKATHON 2025",
    date: "2025-10-15",
    location: "KITSW Campus",
    mode: "Offline",
    category: "Hackathon",
    status: "completed",
    shortDescription: "36-hour coding marathon — 180 participants, 30 teams building solutions for real-world problems.",
    description:
      "The annual flagship hackathon brought together 180 participants across 30 teams in a 36-hour marathon of building, prototyping, and presenting. Teams tackled themes spanning AI, sustainability, and civic tech. Projects were evaluated by industry mentors and faculty for innovation, technical depth, and impact.",
    registeredCount: 180,
    tags: ["hackathon", "coding", "ai", "sustainability"],
    coverImage: "https://picsum.photos/seed/hack25/800/400",
    highlights: ["36 hours", "30 teams", "180 participants", "Industry mentors"],
    winners: [
      { position: "1st", name: "Team Alpha", prize: "₹15,000" },
      { position: "2nd", name: "Team Beta", prize: "₹10,000" },
      { position: "3rd", name: "Team Gamma", prize: "₹5,000" },
    ],
  },

  /* ──────── UPCOMING HACKATHON 2026 ──────── */
  {
    _id: "hackathon-2026",
    title: "HACKATHON 2026",
    date: "2026-03-15",
    location: "KITSW Campus",
    mode: "Offline",
    category: "Hackathon",
    status: "upcoming",
    shortDescription: "36-hour sustainability-themed coding marathon. Register now to secure your spot!",
    description:
      "The biggest Technical Club hackathon yet — a full 36-hour marathon with a sustainability focus. Teams will build innovative solutions to real environmental and social challenges, evaluated by industry leaders and faculty experts.",
    maxParticipants: 300,
    registrationLink: "#",
    tags: ["hackathon", "sustainability", "coding", "ai"],
    coverImage: "https://picsum.photos/seed/hack26/800/400",
    highlights: ["36-hour marathon", "Sustainability theme", "Industry judges", "₹30,000+ prize pool"],
    winners: [],
  },

  /* ──────── UPCOMING GUEST LECTURE ──────── */
  {
    _id: "guest-lecture-2026",
    title: "GUEST LECTURE: FUTURE OF WEB",
    date: "2026-03-05",
    location: "Main Auditorium, KITSW",
    mode: "Offline",
    category: "Guest Lecture",
    status: "upcoming",
    shortDescription: "Expert talk on WebAssembly, edge computing, and the next decade of web technology.",
    description:
      "A distinguished industry expert will walk students through the evolution of web technology — from WebAssembly and edge runtimes to AI-native applications and the architecture of tomorrow's web.",
    registrationLink: "#",
    tags: ["web", "webassembly", "edge-computing", "guest-lecture"],
    coverImage: "https://picsum.photos/seed/weblec26/800/400",
    highlights: ["Industry expert speaker", "Interactive Q&A", "Certificate of participation"],
    winners: [],
  },

  /* ──────── UPCOMING IOT BOOTCAMP ──────── */
  {
    _id: "iot-bootcamp-2026",
    title: "IOT BOOTCAMP 2026",
    date: "2026-04-05",
    location: "Electronics Lab, KITSW",
    mode: "Offline",
    category: "Workshop",
    status: "upcoming",
    shortDescription: "2-day hands-on IoT bootcamp with hardware kits — sensors, microcontrollers, and live projects.",
    description:
      "An intensive 2-day bootcamp designed for students to get hands-on experience with IoT hardware — including Arduino, Raspberry Pi, various sensors, and MQTT-based communication protocols. Participants build working IoT prototypes by the end.",
    maxParticipants: 60,
    registrationLink: "#",
    tags: ["iot", "hardware", "arduino", "embedded"],
    coverImage: "https://picsum.photos/seed/iotbc26/800/400",
    highlights: ["Hardware kits provided", "2-day intensive", "Live prototype building", "Limited to 60 seats"],
    winners: [],
  },
];

const CATEGORIES = ["All", "Hackathon", "Workshop", "Guest Lecture", "Competition", "Seminar"];
const STATUSES = ["All", "upcoming", "completed"];

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  upcoming:  { label: "UPCOMING",  color: "badge-upcoming",  dot: "bg-navy-light" },
  ongoing:   { label: "ONGOING",   color: "text-green-400 bg-green-400/10 border border-green-400/25", dot: "bg-green-400" },
  completed: { label: "COMPLETED", color: "badge-completed", dot: "bg-muted-foreground/40" },
};

const categoryIcons: Record<string, any> = {
  "Hackathon":    Monitor,
  "Workshop":     BookOpen,
  "Guest Lecture": Mic,
  "Competition":  Trophy,
  "Seminar":      Globe,
};

const modeIcon: Record<string, any> = {
  "Online":  Globe,
  "Offline": MapPin,
};

/* ─── Win position styles ─── */
const winStyle: Record<string, { icon: string; bg: string; border: string; text: string }> = {
  "1st": { icon: "🥇", bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-400" },
  "2nd": { icon: "🥈", bg: "bg-slate-400/10",  border: "border-slate-400/30",  text: "text-slate-300" },
  "3rd": { icon: "🥉", bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400" },
};

/* ─── IDEATHON detail section ─── */
function IdeathonDetails({ ev }: { ev: any }) {
  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Registrations", value: ev.registeredCount ? `~${ev.registeredCount}` : "—" },
          { label: "Shortlisted", value: ev.shortlistedCount ?? "—" },
          { label: "Ideas Pitched", value: ev.ideasPitched ?? "—" },
        ].map(s => (
          <div key={s.label} className="rounded-lg border border-border bg-secondary/50 p-3 text-center">
            <div className="font-display text-xl font-black text-gradient-brand">{s.value}</div>
            <div className="mt-0.5 font-display text-[9px] tracking-wider text-muted-foreground">{s.label.toUpperCase()}</div>
          </div>
        ))}
      </div>

      {/* About */}
      <div>
        <h4 className="mb-2 flex items-center gap-2 font-display text-[10px] font-bold tracking-widest text-accent">
          <Lightbulb className="h-3 w-3" /> ABOUT THE EVENT
        </h4>
        <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{ev.description}</p>
      </div>

      {/* Highlights */}
      {ev.highlights?.length > 0 && (
        <div>
          <h4 className="mb-2 font-display text-[10px] font-bold tracking-widest text-accent">HIGHLIGHTS</h4>
          <div className="flex flex-wrap gap-2">
            {ev.highlights.map((h: string) => (
              <span key={h} className="rounded-full border border-navy-light/25 bg-navy/10 px-3 py-1 text-xs text-navy-light">
                {h}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Winners */}
      {ev.winners?.length > 0 && (
        <div>
          <h4 className="mb-3 flex items-center gap-2 font-display text-[10px] font-bold tracking-widest text-accent">
            <Trophy className="h-3 w-3" /> WINNERS
          </h4>
          <div className="space-y-2">
            {ev.winners.map((w: any) => {
              const ws = winStyle[w.position] || winStyle["3rd"];
              return (
                <div key={w.position + (w.name || "")} className={`flex items-start gap-3 rounded-xl border ${ws.border} ${ws.bg} p-3`}>
                  <span className="text-xl">{ws.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className={`font-display text-xs font-bold ${ws.text}`}>{w.position} PLACE</div>
                    <div className="mt-0.5 font-semibold text-sm text-foreground">{w.name}</div>
                    {w.team && <div className="mt-0.5 text-xs text-muted-foreground">{w.team}</div>}
                    {w.note && <div className="mt-1 text-[11px] italic text-muted-foreground">{w.note}</div>}
                  </div>
                  {w.prize && <span className={`shrink-0 font-display text-xs font-bold ${ws.text}`}>{w.prize}</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Jury */}
      {ev.jury?.length > 0 && (
        <div>
          <h4 className="mb-2 font-display text-[10px] font-bold tracking-widest text-accent">JURY</h4>
          <div className="space-y-1.5">
            {ev.jury.map((j: any) => (
              <div key={j.name} className="flex items-start gap-2 text-sm">
                <Star className="mt-0.5 h-3 w-3 shrink-0 text-gold" />
                <span className="font-semibold text-foreground">{j.name}</span>
                {j.affiliation && <span className="text-muted-foreground">— {j.affiliation}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Speakers */}
      {ev.speakers?.length > 0 && (
        <div>
          <h4 className="mb-2 font-display text-[10px] font-bold tracking-widest text-accent">SPEAKER</h4>
          <div className="space-y-1.5">
            {ev.speakers.map((sp: any) => (
              <div key={sp.name} className="flex items-center gap-2 text-sm">
                <Mic className="h-3 w-3 text-crimson" />
                <span className="font-semibold text-foreground">{sp.name}</span>
                {sp.credential && <span className="text-muted-foreground">· {sp.credential}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Support */}
      {ev.support?.length > 0 && (
        <div>
          <h4 className="mb-2 font-display text-[10px] font-bold tracking-widest text-accent">DIGNITARIES & ADVISORY GUIDANCE</h4>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {ev.support.map((s: any) => (
              <div key={s.name} className="flex items-start gap-2 text-xs">
                <Award className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
                <div>
                  <span className="font-semibold text-foreground">{s.name}</span>
                  {s.role && <span className="ml-1 text-muted-foreground">· {s.role}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Organizers */}
      {ev.organizers?.length > 0 && (
        <div>
          <h4 className="mb-2 font-display text-[10px] font-bold tracking-widest text-accent">ORGANIZING COMMITTEE</h4>
          <div className="flex flex-wrap gap-2">
            {ev.organizers.map((o: any) => (
              <span key={o.name} className="rounded-full border border-border bg-secondary px-3 py-1 text-xs">
                <span className="font-semibold text-foreground">{o.name}</span>
                {o.role && <span className="ml-1 text-muted-foreground">· {o.role}</span>}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Generic expanded details ─── */
function GenericDetails({ ev }: { ev: any }) {
  return (
    <div className="space-y-5">
      <div>
        <h4 className="mb-2 font-display text-[10px] font-bold tracking-widest text-accent">ABOUT</h4>
        <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{ev.description || ev.shortDescription}</p>
      </div>
      {ev.highlights?.length > 0 && (
        <div>
          <h4 className="mb-2 font-display text-[10px] font-bold tracking-widest text-accent">HIGHLIGHTS</h4>
          <div className="flex flex-wrap gap-2">
            {ev.highlights.map((h: string) => (
              <span key={h} className="rounded-full border border-navy-light/25 bg-navy/10 px-3 py-1 text-xs text-navy-light">{h}</span>
            ))}
          </div>
        </div>
      )}
      {ev.winners?.length > 0 && (
        <div>
          <h4 className="mb-3 flex items-center gap-2 font-display text-[10px] font-bold tracking-widest text-accent">
            <Trophy className="h-3 w-3" /> WINNERS / RECOGNITION
          </h4>
          <div className="space-y-2">
            {ev.winners.map((w: any) => {
              const ws = winStyle[w.position] || winStyle["3rd"];
              return (
                <div key={w.position + (w.name || "")} className={`flex items-center gap-3 rounded-xl border ${ws.border} ${ws.bg} p-3`}>
                  <span className="text-lg">{ws.icon}</span>
                  <span className={`font-display text-xs font-bold ${ws.text}`}>{w.position}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground">{w.name || w.team}</div>
                    {w.team && w.name && <div className="text-xs text-muted-foreground">{w.team}</div>}
                  </div>
                  {w.prize && <span className={`font-display text-xs font-bold ${ws.text}`}>{w.prize}</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {ev.support?.length > 0 && (
        <div>
          <h4 className="mb-2 font-display text-[10px] font-bold tracking-widest text-accent">DIGNITARIES & ADVISORY GUIDANCE</h4>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {ev.support.map((s: any) => (
              <div key={s.name} className="flex items-start gap-2 text-xs">
                <Award className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
                <div>
                  <span className="font-semibold text-foreground">{s.name}</span>
                  {s.role && <span className="ml-1 text-muted-foreground">· {s.role}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {ev.organizers?.length > 0 && (
        <div>
          <h4 className="mb-2 font-display text-[10px] font-bold tracking-widest text-accent">ORGANIZING COMMITTEE</h4>
          <div className="flex flex-wrap gap-2">
            {ev.organizers.map((o: any) => (
              <span key={o.name} className="rounded-full border border-border bg-secondary px-3 py-1 text-xs">
                <span className="font-semibold text-foreground">{o.name}</span>
                {o.role && <span className="ml-1 text-muted-foreground">· {o.role}</span>}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   EVENT CARD
───────────────────────────────────────────────────────────────── */
function EventCard({ event: ev, i, expanded, setExpanded }: any) {
  const cfg = statusConfig[ev.status] || statusConfig.completed;
  const isOpen = expanded === (ev._id || ev.title);
  const CatIcon = categoryIcons[ev.category] || Tag;
  const ModeIcon = modeIcon[ev.mode] || MapPin;
  const isIdeathon = ev.title?.includes("IDEATHON");
  const isSumshodhini = ev.title?.includes("SUMSHODHINI");
  const isCode4Kitsw = ev.title?.includes("CODE4KITSW");
  const isTechTac = ev.title?.includes("TECH–TAC–TOE");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07, duration: 0.5 }}
      className={`animated-border overflow-hidden rounded-2xl border bg-card transition-all duration-300 ${
        isOpen ? "border-navy-light/30 shadow-lg shadow-navy/10" : "border-border"
      } ${isIdeathon ? "ring-1 ring-gold/20" : isSumshodhini ? "ring-1 ring-crimson/30" : isCode4Kitsw ? "ring-1 ring-navy-light/30" : isTechTac ? "ring-1 ring-accent/30" : ""}`}
    >
      {/* Featured Banners */}
      {isIdeathon && (
        <div className="flex items-center gap-2 border-b border-gold/20 bg-gold/5 px-6 py-2">
          <Star className="h-3 w-3 text-gold" />
          <span className="font-display text-[9px] tracking-widest text-gold">FLAGSHIP IDEATHON EVENT</span>
        </div>
      )}
      {isTechTac && (
        <div className="flex items-center gap-2 border-b border-accent/20 bg-accent/5 px-6 py-2">
          <Trophy className="h-3 w-3 text-accent" />
          <span className="font-display text-[9px] tracking-widest text-accent">SUMSHODHINI'25 CENTRAL EVENT · TECH-TAC-TOE</span>
        </div>
      )}
      {isSumshodhini && !isTechTac && (
        <div className="flex items-center gap-2 border-b border-crimson/20 bg-crimson/5 px-6 py-2">
          <Zap className="h-3 w-3 text-crimson" />
          <span className="font-display text-[9px] tracking-widest text-crimson">
            NATIONAL TECHNICAL FEST · SUMSHODHINI
          </span>
        </div>
      )}
      {isCode4Kitsw && (
        <div className="flex items-center gap-2 border-b border-navy-light/20 bg-navy/10 px-6 py-2">
          <Code className="h-3 w-3 text-navy-light" />
          <span className="font-display text-[9px] tracking-widest text-navy-light">EXCLUSIVE FIRST-YEAR COMPETITION · CODE4KITSW</span>
        </div>
      )}

      {/* Card header (clickable) */}
      <button
        className="group w-full p-5 text-left sm:p-6"
        onClick={() => setExpanded(isOpen ? null : (ev._id || ev.title))}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          {/* Category icon */}
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all ${
            isOpen ? "border-navy-light/40 bg-navy/15" : "border-border bg-secondary group-hover:border-navy-light/30"
          }`}>
            <CatIcon className={`h-5 w-5 transition-colors ${isOpen ? "text-navy-light" : "text-muted-foreground group-hover:text-navy-light"}`} />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Badges row */}
            <div className="mb-2.5 flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-display text-[9px] font-bold tracking-wider ${cfg.color}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                {cfg.label}
              </span>
              <span className="badge-category">{ev.category}</span>
              {ev.mode && (
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-1 font-display text-[9px] tracking-wider text-muted-foreground">
                  <ModeIcon className="h-2.5 w-2.5" />
                  {ev.mode}
                </span>
              )}
              {ev.tags?.slice(0, 2).map((t: string) => (
                <span key={t} className="rounded-full border border-border/70 px-2 py-0.5 text-[9px] text-muted-foreground">{t}</span>
              ))}
            </div>

            <h3 className="mb-1.5 font-display text-sm font-bold tracking-wide text-foreground group-hover:text-gradient-brand transition-all sm:text-base">
              {ev.title}
            </h3>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">{ev.shortDescription}</p>

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3 text-navy-light/70" />
                {new Date(ev.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                {ev.time && ev.time !== "Online" && <span className="text-muted-foreground/60">· {ev.time}</span>}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-navy-light/70" />
                {ev.location}
              </span>
              {(ev.registeredCount ?? 0) > 0 && (
                <span className="flex items-center gap-1.5">
                  <Users className="h-3 w-3 text-navy-light/70" />
                  {ev.registeredCount} registered
                </span>
              )}
              {ev.maxParticipants && (
                <span className="flex items-center gap-1.5 text-accent">
                  <Users className="h-3 w-3" />
                  {ev.maxParticipants} seats
                </span>
              )}
            </div>
          </div>

          {/* Expand chevron */}
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-navy-light" : ""}`}
          />
        </div>
      </button>

      {/* Expanded details */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/60 px-5 pb-6 pt-5 sm:px-6">
              {isIdeathon ? <IdeathonDetails ev={ev} /> : <GenericDetails ev={ev} />}

              {/* CTA */}
              {ev.registrationLink && ev.status !== "completed" && (
                <div className="mt-5">
                  <a
                    href={ev.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-navy to-navy-light px-5 py-2.5 font-display text-xs font-bold tracking-wider text-white transition-all hover:shadow-lg hover:shadow-navy/30 hover:scale-[1.02]"
                  >
                    REGISTER NOW <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   EVENTS PAGE
───────────────────────────────────────────────────────────────── */
export default function EventsPage() {
  const [events, setEvents] = useState<any[]>(FALLBACK_EVENTS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    api.events.getAll({ limit: "50" })
      .then(res => { if (res.data?.length) setEvents(res.data); })
      .catch(() => {});
  }, []);

  const filtered = events.filter(ev => {
    const matchSearch =
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      (ev.shortDescription || "").toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || ev.category === category;
    const matchSt = status === "All" || ev.status === status;
    return matchSearch && matchCat && matchSt;
  });

  const upcoming = filtered.filter(e => e.status === "upcoming" || e.status === "ongoing");
  const past     = filtered.filter(e => e.status === "completed" || e.status === "cancelled");

  const totalEvents    = events.length;
  const totalCompleted = events.filter(e => e.status === "completed").length;
  const totalUpcoming  = events.filter(e => e.status === "upcoming").length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[52vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-grid-pattern" />
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="pointer-events-none absolute right-0 top-0 h-[60%] w-[50%] rounded-full bg-crimson/5 blur-3xl" />
        <div className="pointer-events-none absolute left-0 bottom-0 h-[50%] w-[40%] rounded-full bg-navy/10 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
          className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-4 py-2 font-display text-[9px] tracking-[0.4em] text-accent"
          >
            <Trophy className="h-3 w-3" />
            ALL ACTIVITIES · 2023 – 2026
          </motion.div>
          <h1 className="mb-4 font-display text-5xl font-black tracking-wide sm:text-7xl">
            EVENTS <span className="text-gradient-brand">ARCHIVE</span>
          </h1>
          <p className="mx-auto max-w-xl text-base text-muted-foreground">
            Every workshop, hackathon, talk, and competition — curated and documented.
          </p>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-8 flex max-w-sm items-center justify-center gap-0 overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur"
          >
            {[
              { value: totalEvents, label: "Total" },
              { value: totalCompleted, label: "Completed" },
              { value: totalUpcoming, label: "Upcoming" },
            ].map((s, i) => (
              <div key={s.label} className={`flex flex-1 flex-col items-center px-5 py-4 ${i < 2 ? "border-r border-border/60" : ""}`}>
                <span className="font-display text-2xl font-black text-gradient-brand">{s.value}</span>
                <span className="font-display text-[9px] tracking-widest text-muted-foreground">{s.label.toUpperCase()}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Filters */}
      <div className="sticky top-16 z-20 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full rounded-xl border border-border bg-secondary py-2.5 pl-10 pr-4 text-sm focus:border-navy-light/50 focus:outline-none focus:ring-2 focus:ring-navy-light/20 transition-all"
              />
            </div>
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 rounded-xl border border-border bg-secondary px-3 py-2.5">
                <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="bg-transparent text-xs text-foreground focus:outline-none cursor-pointer"
                >
                  {CATEGORIES.map(c => <option key={c} value={c} className="bg-card">{c}</option>)}
                </select>
              </div>
              <div className="flex gap-1.5">
                {STATUSES.map(s => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`rounded-xl px-3.5 py-2.5 font-display text-[10px] font-bold tracking-widest transition-all ${
                      status === s
                        ? "bg-gradient-to-r from-navy to-navy-light text-white shadow-md shadow-navy/20"
                        : "border border-border text-muted-foreground hover:border-navy-light/40 hover:text-foreground"
                    }`}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event lists */}
      <div className="mx-auto max-w-6xl px-6 py-14 space-y-16">
        {upcoming.length > 0 && (
          <div>
            <div className="mb-8 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-gradient-to-b from-navy-light to-crimson" />
              <h2 className="font-display text-xl font-bold tracking-wider">UPCOMING EVENTS</h2>
              <span className="rounded-full border border-navy-light/30 bg-navy/10 px-3 py-1 font-display text-xs font-bold text-navy-light">
                {upcoming.length}
              </span>
            </div>
            <div className="space-y-4">
              {upcoming.map((ev, i) => (
                <EventCard key={ev._id || ev.title} event={ev} i={i} expanded={expanded} setExpanded={setExpanded} />
              ))}
            </div>
          </div>
        )}

        {past.length > 0 && (
          <div>
            <div className="mb-8 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-muted-foreground/40" />
              <h2 className="font-display text-xl font-bold tracking-wider">PAST EVENTS</h2>
              <span className="rounded-full border border-border bg-secondary px-3 py-1 font-display text-xs font-bold text-muted-foreground">
                {past.length}
              </span>
            </div>
            <div className="space-y-4">
              {past.map((ev, i) => (
                <EventCard key={ev._id || ev.title} event={ev} i={i} expanded={expanded} setExpanded={setExpanded} />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-24 text-center"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-secondary">
              <Search className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="font-display text-sm tracking-wider text-muted-foreground">NO EVENTS MATCH YOUR FILTERS</p>
            <button
              onClick={() => { setSearch(""); setCategory("All"); setStatus("All"); }}
              className="mt-4 rounded-xl border border-border px-4 py-2 text-xs text-muted-foreground hover:border-navy-light/40 hover:text-foreground transition-all"
            >
              Reset filters
            </button>
          </motion.div>
        )}
      </div>

      <FooterSection />
    </div>
  );
}
