const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Event = require('./models/Event');
const TeamMember = require('./models/TeamMember');
const GalleryImage = require('./models/GalleryImage');

const PLACEHOLDER = 'https://picsum.photos/seed';

const REAL_EVENTS = [
  /* ──────── UPCOMING EVENTS ──────── */
  {
    title: 'SUMSHODHINI\'26',
    description: "The 19th edition of KITSW's national technical extravaganza bringing together engineering and management students across the nation. Featuring cutting-edge technical tracks, hackathons, paper presentations, guest talks, and flagship central competitions.",
    shortDescription: "19th Annual National Technical Symposium of KITSW — October 30th, 2026.",
    date: new Date('2026-10-30'),
    endDate: new Date('2026-10-31'),
    location: 'KITSW Campus, Warangal',
    mode: 'Offline',
    category: 'Competition',
    status: 'upcoming',
    coverImage: `${PLACEHOLDER}/sumshodhini26/800/400`,
    tags: ['sumshodhini26', 'flagship', 'national-fest', 'competition', 'oct30'],
    registrationLink: '#',
    maxParticipants: 1000,
    isHighlighted: true,
    highlights: [
      '19th National Edition',
      '2-Day National Fest (Starts Oct 30, 2026)',
      'Drive Dynamos & Flagship Challenges',
      'National Student Paper Presentations',
      'Workshops & Industry Keynotes'
    ]
  },
  {
    title: 'CODE4KITSW 2026',
    description: 'The annual edition of CODE4KITSW — an exclusive technical, algorithmic, and logical reasoning challenge designed for first-year engineering students to sharpen their problem-solving and coding skills early in their academic journey.',
    shortDescription: 'Exclusive virtual technical & algorithmic challenge for 1st-year students.',
    date: new Date('2026-11-15'),
    time: '7:00 PM – 8:30 PM',
    location: 'Quizizz & Online Judge Platform',
    mode: 'Online',
    category: 'Competition',
    status: 'upcoming',
    coverImage: `${PLACEHOLDER}/code4kitsw26/800/400`,
    tags: ['code4kitsw', '1st-year', 'competition', 'coding', 'online'],
    registrationLink: '#',
    maxParticipants: 300,
    isHighlighted: true,
    highlights: [
      'Exclusively for 1st-Year Students',
      'Logical Reasoning & Coding Rounds',
      'Virtual Competition on Quizizz',
      'Certificates & Prizes for Top Performers'
    ]
  },
  {
    title: 'IDEATHON 2027',
    description: "The flagship annual idea pitching symposium organized by Technical Club KITSW in association with C–I²RE and Institution's Innovation Council (IIC). Student teams of 2–4 pitch innovative technical solutions to be adopted as multidisciplinary engineering projects.",
    shortDescription: 'Annual flagship idea presentation & pitch competition with C-I²RE.',
    date: new Date('2027-03-27'),
    time: '9:30 AM – 2:00 PM',
    location: 'MMH Lab, C-I²RE, KITSW',
    mode: 'Offline',
    category: 'Competition',
    status: 'upcoming',
    coverImage: `${PLACEHOLDER}/ideathon27/800/400`,
    tags: ['ideathon27', 'innovation', 'c-i2re', 'iic', 'pitching'],
    registrationLink: '#',
    maxParticipants: 150,
    isHighlighted: true,
    highlights: [
      'Idea Pitching to C-I²RE & Industry Jury',
      'Projects Adopted for Development',
      'Cash Awards & Seed Funding Mentorship',
      'Open to Multi-Disciplinary Student Teams'
    ]
  },

  /* ──────── COMPLETED & HISTORICAL EVENTS ──────── */
  {
    title: 'SUMSHODHINI\'25',
    description: "National Level Student Technical Symposium conducted under the theme 'Imagination to Innovation', jointly organized by Technical Club KITSW (under Student Activity Centre) and ISTE KITS Student Chapter across all engineering & management departments.\n\nFeatured Central & Technical Club Events:\n• Tech-Tac-Toe (3-Round Debugging & Logic Challenge)\n• Treasure Hunt\n• Prompt Wars with Google Gemini\n• Edutechexpo, Mind Matrix, AlgoRizzM, CineVerse, Spark Sync, Rewind Rush, Battle of Towers, Crazy Carnival, Clash of Minds, Nirmaan, Tech Finity, Tech Junction, Tech Nexus, Mesh with Meshy Minds.",
    shortDescription: 'National Student Technical Symposium themed "Imagination to Innovation".',
    date: new Date('2025-10-18'),
    endDate: new Date('2025-10-19'),
    location: 'KITSW Campus, Warangal (Offline)',
    mode: 'Offline',
    category: 'Competition',
    status: 'completed',
    coverImage: `${PLACEHOLDER}/sumshodhini25/800/400`,
    tags: ['sumshodhini25', 'national-fest', 'imagination-to-innovation', 'competition'],
    registeredCount: 920,
    isHighlighted: true,
    highlights: [
      'National Level Technical Symposium',
      'Theme: "Imagination to Innovation"',
      'Organized by Technical Club & ISTE Student Chapter',
      'President TC: K. Shashikanth | President ISTE: Y. Naga Tharun',
      'Prompt Wars with Google Gemini, Tech-Tac-Toe, Treasure Hunt'
    ],
    organizers: [
      { name: 'K. Shashikanth', role: 'President, Technical Club' },
      { name: 'Y. Naga Tharun', role: 'President, ISTE Student Chapter' }
    ]
  },
  {
    title: 'IDEATHON 2026',
    description: "Organized by Technical Club KITSW in association with C–I²RE (Centre for Innovation Incubation & Entrepreneurship) and Institution's Innovation Council. Idea presentation & pitch competition open to 2–4 member student teams. Chief Guests included Capt. V. Lakshmikantha Rao (KITSW Chairman), P. Narayana Reddy (Treasurer), Vodithala Satish Kumar (Additional Secretary), Prof. K. Ashoka Reddy (Principal), Dr. K. Sridhar (Dean Student Affairs), Dr. K. Raja Narendar Reddy (Head, C-I²RE), and Dr. B. Vijay Kumar (TC Faculty In-charge). 105 registrations with 44 selected for presentation. Featured sample pitches such as AlgoVision AI, AI Digital Addiction Recovery Assistant, Traffic AI, and Smart India Post addressing.",
    shortDescription: 'Idea pitching competition in association with C-I²RE & IIC with cash awards.',
    date: new Date('2026-03-28'),
    time: '9:30 AM – 1:00 PM',
    location: 'MMH Lab, I²RE, KITSW',
    mode: 'Offline',
    category: 'Competition',
    status: 'completed',
    coverImage: `${PLACEHOLDER}/ideathon26/800/400`,
    tags: ['ideathon', 'c-i2re', 'innovation', 'pitching', 'startup'],
    registeredCount: 105,
    shortlistedCount: 44,
    isHighlighted: true,
    highlights: [
      '105 Registrations, 44 Shortlisted',
      'In Association with C-I²RE & IIC',
      'Chief Guest Capt. V. Lakshmikantha Rao',
      '₹1,500 1st Prize & ₹1,000 2nd Prize',
      'Media Coverage in South India Times & Telugu Dailies'
    ],
    support: [
      { name: 'Capt. V. Lakshmikantha Rao', role: 'KITSW Chairman / Former RS MP' },
      { name: 'Prof. K. Ashoka Reddy', role: 'Principal, KITSW' },
      { name: 'Dr. K. Sridhar', role: 'Dean Student Affairs' },
      { name: 'Dr. K. Raja Narendar Reddy', role: 'Head, C-I²RE' },
      { name: 'Dr. B. Vijay Kumar', role: 'TC Faculty In-charge' }
    ],
    organizers: [
      { name: 'K. Shashikanth', role: 'President' },
      { name: 'Nandini Azmeera', role: 'Vice President' },
      { name: 'B. Manaswini', role: 'Joint Secretary' },
      { name: 'Md. Asma', role: 'Joint Secretary' },
      { name: 'N. Sheshanka Desai', role: 'Event Mgmt & Logistics' },
      { name: 'M. Sai Charan', role: 'Membership Coordinator' },
      { name: 'T. Tejaswini', role: 'Documentation & Reporting' }
    ],
    winners: [
      { position: '1st', name: 'Kanukuntla Hari Charan, Sidhartha Thummanapalli', team: 'Branch: CSE', prize: '₹1,500 + Merit Cert' },
      { position: '2nd', name: 'M. Puneeth, N. Sadhveer Chowdary, M.V.S Umesh Chandra, Shazia Taskeen', team: 'Branch: CSE / AIML', prize: '₹1,000 + Merit Cert' },
      { position: '3rd', name: 'Gaurav Sujikumar, Salma Tabassum, D. Shilpa', team: 'Branch: AIML / CSN', prize: 'Merit Certificate' }
    ]
  },
  {
    title: 'TECH–TAC–TOE (Sumshodhini\'25)',
    description: 'Central Technical Club competition organized for Sumshodhini\'25 across 3 challenging rounds: (1) Think N\' Tac (chit-based puzzle decoding & Tic Tac Toe), (2) Code Crackers (debugging buggy 3-4 line C programs), and (3) Tech Blitz (connected-image tech concept guessing). 27 students participated across CSE, ECE, Civil, CSO, CSM, CSD, and CSN branches.',
    shortDescription: 'Sumshodhini\'25 central event combining puzzle decoding, C debugging & tech blitz.',
    date: new Date('2025-10-18'),
    time: '10:00 AM – 11:30 AM',
    location: 'KITSW Campus, Warangal',
    mode: 'Offline',
    category: 'Competition',
    status: 'completed',
    coverImage: `${PLACEHOLDER}/techtactoe/800/400`,
    tags: ['tech-tac-toe', 'sumshodhini25', 'c-debugging', 'puzzles'],
    registeredCount: 27,
    highlights: [
      'Sumshodhini\'25 Central Event',
      '3 Competitive Rounds',
      'Think N\' Tac, Code Crackers & Tech Blitz',
      'Multi-branch Participation'
    ],
    organizers: [
      { name: 'V. Madhusri', role: 'Executive Member' },
      { name: 'B. Anshika Sahasra', role: 'Executive Member' },
      { name: 'G. Manvika', role: 'Executive Member' },
      { name: 'K. Teja Karthik', role: 'Executive Member' },
      { name: 'M. Nikhil', role: 'Executive Member' },
      { name: 'Ch. Udayini', role: 'Executive Member' }
    ],
    winners: [
      { position: '1st', name: 'Chunchula Sri Pranvitha, Kusuma Ishwarya, Kusuma Akshay', team: 'CSE/ECE', prize: '₹500 + Merit Cert' },
      { position: '2nd', name: 'Puneeth, Sadhveer, Saathwiki, Adbutha', team: 'CSE/CSM', prize: '₹300 + Merit Cert' }
    ]
  },
  {
    title: 'SUMSHODHINI\'24',
    description: "The 18th edition of KITSW's annual national technical fest themed 'Innovation Beyond Boundaries', organized by ISTE KITS Student Chapter & Technical Club KITSW across two days. The fest concluded with a valedictory session led by Dr. V. Shankar (Head of CSE-Networks). Featured competitions, workshops, paper/poster presentations, and flagship central events like Drive Dynamos and Treasure Hunt.",
    shortDescription: '18th National Annual Technical Fest themed "Innovation Beyond Boundaries".',
    date: new Date('2024-10-18'),
    endDate: new Date('2024-10-19'),
    location: 'KITSW Campus (offline)',
    category: 'Competition',
    status: 'completed',
    coverImage: `${PLACEHOLDER}/sumshodhini24/800/400`,
    tags: ['sumshodhini', 'national-fest', 'innovation', 'drive-dynamos', 'treasure-hunt'],
    registeredCount: 850,
    isHighlighted: true,
    highlights: [
      '18th National Edition',
      '2-day offline tech fest',
      'Drive Dynamos (Placement Simulator)',
      'Treasure Hunt (₹3,000 Cash Prize)',
      '17 Student Organizing Committees'
    ],
    support: [
      { name: 'Dr. V. Shankar', role: 'Head, CSE-Networks' },
      { name: 'Dr. B. Vijay Kumar', role: 'Technical Club Faculty In-charge' }
    ],
    organizers: [
      { name: 'V. Siddartha', role: 'General Secretary (TC)' },
      { name: 'Nishath Sultana', role: 'General Secretary (TC)' },
      { name: 'A. Abhi Charan', role: 'ISTE President' }
    ]
  },
  {
    title: 'CODE4KITSW',
    description: 'A fully virtual technical skill and logical reasoning competition exclusively designed for 1st-year students to sharpen problem-solving and coding fundamentals. Overseen by Dr. M. Sreelatha (Dean, Student Affairs), M. Narasimha Rao (Associate Dean), and Dr. B. Vijay Kumar (Technical Club Faculty In-charge).',
    shortDescription: 'Virtual technical & problem-solving challenge exclusively for 1st-year students.',
    date: new Date('2024-02-14'),
    time: '7:00 PM – 8:00 PM',
    location: 'Quizizz (Virtual)',
    mode: 'Online',
    category: 'Competition',
    status: 'completed',
    coverImage: `${PLACEHOLDER}/code4kitsw/800/400`,
    tags: ['code4kitsw', '1st-year', 'competition', 'quizizz'],
    registeredCount: 150,
    highlights: [
      '150 1st-year participants',
      'Fully virtual on Quizizz',
      'Logical reasoning & coding'
    ],
    support: [
      { name: 'Dr. M. Sreelatha', role: 'Dean, Student Affairs' },
      { name: 'M. Narasimha Rao', role: 'Associate Dean' },
      { name: 'Dr. B. Vijay Kumar', role: 'Faculty In-charge' }
    ],
    organizers: [
      { name: 'V. Siddartha', role: 'General Secretary' },
      { name: 'G. Krishna Mohan', role: 'Joint Secretary' }
    ],
    winners: [
      { position: '1st', name: 'Md. Nehan', team: 'Roll No: B24CS071', prize: 'Gold' },
      { position: '2nd', name: 'G. Vishnupriya', team: 'Roll No: B24IT010', prize: 'Silver' },
      { position: '3rd', name: 'P. Hansika', team: 'Roll No: B24CS205', prize: 'Bronze' }
    ]
  },
  {
    title: 'IDEATHON 2024',
    description: "A platform for students to pitch their most innovative ideas — the best ones get adopted as multidisciplinary Technical Club projects. Backed by Principal Prof. K. Ashoka Reddy, Dr. V. Shankar (Dean Student Affairs), M. Narasimha Rao (Associate Dean), and Dr. B. Vijay Kumar (Faculty In-charge). ~150 registrations, best 100 shortlisted across 27 distinct pitched ideas. Prof L. Anjaneyulu from NIT Warangal's ECE department served as jury.",
    shortDescription: 'A platform for students to pitch innovative technical ideas adopted as TC projects.',
    date: new Date('2024-01-06'),
    location: 'New Seminar Hall, KITSW (offline)',
    category: 'Competition',
    status: 'completed',
    coverImage: `${PLACEHOLDER}/ideathon24/800/400`,
    tags: ['ideathon', 'innovation', 'projects', 'competition'],
    registeredCount: 150,
    isHighlighted: true,
    winners: [
      { position: '1st', name: 'Nursing Care (M. Rithwik, CH. Rithwik, N. Nagaraj, S. Sai Bharadwaj)', prize: 'Gold' },
      { position: '2nd', name: 'Scan, Pay & Go - supermarket queue elimination (P. Abhinav Reddy, Mohammed Faizan Ahmed)', prize: 'Silver' },
      { position: '3rd', name: 'CCTV-based crime/crowd detection using AIML (P. Rahul, M. Sai Sravani, Ch. Geethika, N. ShreeVansh)', prize: 'Bronze' }
    ],
    highlights: ['150 registrations', '100 shortlisted', '27 distinct ideas', 'NIT Warangal Jury', 'Dedicated event website']
  },
  {
    title: 'WEBINAR: CREATING A POWERFUL & ATTRACTIVE PROFESSIONAL PROFILE',
    description: 'Tech Week 2023 opener featuring guest speaker Uday Damerla (AWS ML Scholar). Guided 450+ students on building impactful LinkedIn profiles, portfolio showcases, and career personal branding.',
    shortDescription: 'Tech Week webinar with AWS ML Scholar Uday Damerla on professional branding.',
    date: new Date('2023-10-11'),
    location: 'Webex (Online)',
    category: 'Guest Lecture',
    status: 'completed',
    coverImage: `${PLACEHOLDER}/webinar23/800/400`,
    tags: ['webinar', 'career', 'tech-week', 'linkedin'],
    registeredCount: 450,
    highlights: ['450 participants', 'AWS ML Scholar Speaker', 'Tech Week 2023']
  },
  {
    title: 'PORTFOLIO MAKING WORKSHOP',
    description: 'Hands-on workshop during Tech Week 2023 guiding students step-by-step to build and deploy their developer portfolios.',
    shortDescription: 'Tech Week workshop on creating developer portfolios.',
    date: new Date('2023-10-25'),
    location: 'Google Meet (Online)',
    category: 'Workshop',
    status: 'completed',
    coverImage: `${PLACEHOLDER}/portfolio23/800/400`,
    tags: ['portfolio', 'web', 'tech-week'],
    highlights: ['Hands-on building', 'Tech Week 2023']
  },
  {
    title: 'RIDDLE SOLVING CHALLENGE',
    description: 'A fast-paced tech riddle solving competition testing analytical thinking and domain knowledge.',
    shortDescription: 'Tech Week competition testing technology riddles and logic.',
    date: new Date('2023-10-26'),
    location: 'Google Meet (Online)',
    category: 'Competition',
    status: 'completed',
    coverImage: `${PLACEHOLDER}/riddles23/800/400`,
    tags: ['riddles', 'logic', 'tech-week'],
    highlights: ['Tech Week 2023']
  },
  {
    title: 'TECHNICAL QUIZ',
    description: 'Comprehensive computer science and technology quiz testing core fundamentals, trends, and trivia.',
    shortDescription: 'Tech Week 2023 closing technical quiz competition.',
    date: new Date('2023-10-26'),
    location: 'Google Meet (Online)',
    category: 'Competition',
    status: 'completed',
    coverImage: `${PLACEHOLDER}/quiz23/800/400`,
    tags: ['quiz', 'cs', 'tech-week'],
    highlights: ['Tech Week 2023']
  },
  {
    title: 'HACKATHON 2025',
    description: 'A 36-hour coding marathon where teams solve real-world problems using technology. Teams competed across AI, Web, and IoT domains.',
    shortDescription: '36-hour coding marathon for real-world problem solving.',
    date: new Date('2025-10-15'),
    endDate: new Date('2025-10-16'),
    location: 'KITSW Campus, Main Block',
    category: 'Hackathon',
    status: 'completed',
    coverImage: `${PLACEHOLDER}/hackathon/800/400`,
    tags: ['coding', 'hackathon', 'ai', 'web'],
    registeredCount: 180,
    isHighlighted: true,
    winners: [
      { position: '1st', name: 'Team Alpha', prize: '₹15,000' },
      { position: '2nd', name: 'Team Beta', prize: '₹10,000' },
      { position: '3rd', name: 'Team Gamma', prize: '₹5,000' },
    ],
    highlights: ['180 participants', '30 teams', '36 hours', '3 domains'],
  },
  {
    title: 'HACKATHON 2026',
    description: 'The flagship annual hackathon is back! A 36-hour marathon open to all students. Theme: Sustainable Tech for a Better Tomorrow.',
    shortDescription: '36-hour coding marathon with sustainability theme.',
    date: new Date('2026-03-15'),
    endDate: new Date('2026-03-16'),
    location: 'KITSW Campus',
    category: 'Hackathon',
    status: 'upcoming',
    coverImage: `${PLACEHOLDER}/hack2026/800/400`,
    tags: ['hackathon', 'sustainability', 'coding'],
    registrationLink: '#',
    maxParticipants: 300,
    isHighlighted: true,
  },
  {
    title: 'GUEST LECTURE: FUTURE OF WEB',
    description: 'Industry expert session on WebAssembly, edge computing, serverless architectures, and the next evolution of the web platform.',
    shortDescription: 'Expert talk on WebAssembly and edge computing.',
    date: new Date('2026-03-05'),
    location: 'Auditorium',
    category: 'Guest Lecture',
    status: 'upcoming',
    coverImage: `${PLACEHOLDER}/weblecture/800/400`,
    tags: ['webassembly', 'edge', 'web'],
  },
  {
    title: 'IOT BOOTCAMP 2026',
    description: 'A 2-day bootcamp covering Arduino, Raspberry Pi, sensor interfacing, and building smart home prototypes.',
    shortDescription: '2-day hands-on IoT bootcamp with hardware.',
    date: new Date('2026-04-05'),
    location: 'Electronics Lab',
    category: 'Workshop',
    status: 'upcoming',
    registrationLink: '#',
    maxParticipants: 60,
  }
];

const seedIfEmpty = async () => {
  console.log('🌱 Checking admin credentials...');

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@kitsw.ac.in';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

  // Always ensure the primary admin exists and has the correct password from .env
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (existingAdmin) {
    existingAdmin.password = adminPassword;
    await existingAdmin.save();
    console.log('✅ Admin credentials synced from .env');
  } else {
    await User.create({
      name: 'Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });
    console.log('✅ Admin user created');
  }

  // Update or insert events so DB has SUMSHODHINI'25 report & leadership
  console.log('🌱 Syncing events into database...');
  for (const evData of REAL_EVENTS) {
    await Event.findOneAndUpdate(
      { title: evData.title },
      evData,
      { upsert: true, new: true }
    );
  }
  console.log('✅ Events database synced with SUMSHODHINI\'25 ("Imagination to Innovation") & President K. Shashikanth!');

  const teamCount = await TeamMember.countDocuments();
  if (teamCount === 0) {
    await TeamMember.insertMany([
      // 2026 Team
      { name: 'K. Shashikanth', academicYear: 2026, role: 'President', domain: 'Executive', batch: '2022-2026', order: 1, isCoreTeam: true, bio: 'President of Technical Club KITSW.' },
      { name: 'Nandini Azmeera', academicYear: 2026, role: 'Vice President', domain: 'Executive', batch: '2022-2026', order: 2, isCoreTeam: true },
      { name: 'B. Manaswini', academicYear: 2026, role: 'Joint Secretary', domain: 'Executive', batch: '2023-2027', order: 3, isCoreTeam: true },
      { name: 'Md. Asma', academicYear: 2026, role: 'Joint Secretary', domain: 'Executive', batch: '2023-2027', order: 4, isCoreTeam: true },
      
      // 2024 Team
      { name: 'V. Siddartha', academicYear: 2024, role: 'General Secretary', domain: 'Executive', batch: '2021-2025', order: 1, isCoreTeam: true },
      { name: 'Nishath Sultana', academicYear: 2024, role: 'General Secretary', domain: 'Executive', batch: '2021-2025', order: 2, isCoreTeam: true },
      { name: 'G. Krishna Mohan', academicYear: 2024, role: 'Joint Secretary', domain: 'Executive', batch: '2021-2025', order: 3, isCoreTeam: true }
    ]);
  }
};

// Run standalone
if (require.main === module) {
  mongoose.connect(process.env.MONGO_URI).then(async () => {
    await seedIfEmpty();
    console.log('✅ Seed script finished successfully!');
    mongoose.disconnect();
  });
}

module.exports = { seedIfEmpty };
