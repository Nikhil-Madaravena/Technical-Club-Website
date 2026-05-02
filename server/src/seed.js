const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Event = require('./models/Event');
const TeamMember = require('./models/TeamMember');
const GalleryImage = require('./models/GalleryImage');

const PLACEHOLDER = 'https://picsum.photos/seed';

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

  const eventCount = await Event.countDocuments();
  if (eventCount > 0) return; // already seeded other data

  console.log('🌱 Seeding sample data...');

  // Events
  const events = await Event.insertMany([
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
      title: 'AI WORKSHOP SERIES',
      description: 'Hands-on sessions on building intelligent applications using LLMs, transformers, and prompt engineering techniques.',
      shortDescription: 'Practical AI/ML workshop with LLMs and transformers.',
      date: new Date('2025-11-28'),
      location: 'Seminar Hall, Block C',
      category: 'Workshop',
      status: 'completed',
      coverImage: `${PLACEHOLDER}/aiworkshop/800/400`,
      tags: ['ai', 'ml', 'llm', 'workshop'],
      registeredCount: 95,
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
      title: 'CODE SPRINT 2025',
      description: 'Competitive programming contest with algorithmic challenges, data structures, and dynamic programming problems.',
      shortDescription: 'Competitive programming contest with prizes.',
      date: new Date('2025-09-05'),
      location: 'CS Lab Complex',
      category: 'Competition',
      status: 'completed',
      coverImage: `${PLACEHOLDER}/codesprint/800/400`,
      registeredCount: 120,
      winners: [
        { position: '1st', name: 'Ravi Kumar', prize: '₹5,000' },
        { position: '2nd', name: 'Priya Sharma', prize: '₹3,000' },
      ],
    },
    {
      title: 'IOT BOOTCAMP',
      description: 'A 2-day bootcamp covering Arduino, Raspberry Pi, sensor interfacing, and building smart home prototypes.',
      shortDescription: '2-day hands-on IoT bootcamp with hardware.',
      date: new Date('2026-04-05'),
      location: 'Electronics Lab',
      category: 'Workshop',
      status: 'upcoming',
      registrationLink: '#',
      maxParticipants: 60,
    },
  ]);

  // Achievements removal

  // Team Members (historical and current)
  await TeamMember.insertMany([
    // 2026 Team
    { name: 'Rahul Sharma', academicYear: 2026, role: 'President', domain: 'Web Development', batch: '2022-2026', order: 1, isCoreTeam: true, bio: 'Full-stack developer.', photo: `${PLACEHOLDER}/rahul/200/200` },
    { name: 'Priya Nair', academicYear: 2026, role: 'Vice President', domain: 'AI/ML', batch: '2022-2026', order: 2, isCoreTeam: true, photo: `${PLACEHOLDER}/priya/200/200` },
    { name: 'Karthik Raja', academicYear: 2026, role: 'Secretary', domain: 'Core', batch: '2023-2027', order: 3, isCoreTeam: true, photo: `${PLACEHOLDER}/karthik/200/200` },
    
    // 2025 Team (Alumni/Previous)
    { name: 'Vikram Singh', academicYear: 2025, role: 'President', domain: 'Cybersecurity', batch: '2021-2025', order: 1, isCoreTeam: true, photo: `${PLACEHOLDER}/vikram/200/200` },
    { name: 'Ananya Rao', academicYear: 2025, role: 'Vice President', domain: 'Design', batch: '2021-2025', order: 2, isCoreTeam: true, photo: `${PLACEHOLDER}/ananya/200/200` },
    { name: 'Siddharth M', academicYear: 2025, role: 'Technical Lead', domain: 'Web Development', batch: '2021-2025', order: 3, isCoreTeam: true, photo: `${PLACEHOLDER}/sid/200/200` },
    
    // 2024 Team
    { name: 'Deepak Raj', academicYear: 2024, role: 'President', domain: 'IoT', batch: '2020-2024', order: 1, isCoreTeam: true, photo: `${PLACEHOLDER}/deepak/200/200` },
    { name: 'Sneha Kapur', academicYear: 2024, role: 'Secretary', domain: 'AI/ML', batch: '2020-2024', order: 2, isCoreTeam: true, photo: `${PLACEHOLDER}/sneha/200/200` },
  ]);

  // Documents
  const Document = require('./models/Document');
  await Document.insertMany([
    { title: 'Annual Report 2025', type: 'Report', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', year: 2025 },
    { title: 'Hackathon Permission', type: 'Permission Letter', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', year: 2025 },
    { title: 'Sumshodhini Budget', type: 'Budget', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', year: 2026 },
  ]);

  // Contact Messages & Applications
  const Contact = require('./models/Contact');
  await Contact.insertMany([
    { name: 'Aryan Goel', email: 'aryan@example.com', subject: 'Membership Inquiry', message: 'I would like to join the AI/ML domain. I have experience with Python and Scikit-learn.', type: 'membership', status: 'pending' },
    { name: 'Ishita Paul', email: 'ishita@example.com', subject: 'Sumshodhini Query', message: 'When will the registrations for the main event open?', type: 'contact', status: 'pending' },
    { name: 'Rohan Mehra', email: 'rohan@example.com', subject: 'Collaboration', message: 'Interested in conducting a workshop on Web3.', type: 'contact', status: 'reviewing' },
  ]);

  // Gallery Images
  const albums = ['Hackathon 2025', 'AI Workshop', 'Code Sprint 2025', 'Team Outings'];
  const galleryData = [];
  for (let i = 0; i < 24; i++) {
    galleryData.push({
      url: `${PLACEHOLDER}/${100 + i}/800/600`,
      album: albums[i % albums.length],
      year: i < 12 ? 2025 : 2024,
      caption: `Moment from ${albums[i % albums.length]}`,
      eventName: albums[i % albums.length],
      isFeatured: i < 6,
    });
  }
  await GalleryImage.insertMany(galleryData);

  console.log('✅ Database seeded successfully!');
  console.log(`📧 Admin login: ${process.env.ADMIN_EMAIL || 'admin@kitsw.ac.in'} / ${process.env.ADMIN_PASSWORD || 'Admin@123'}`);
};

// Run standalone
if (require.main === module) {
  mongoose.connect(process.env.MONGO_URI).then(async () => {
    await User.deleteMany({});
    await Event.deleteMany({});
    await TeamMember.deleteMany({});
    await GalleryImage.deleteMany({});
    await seedIfEmpty();
    mongoose.disconnect();
  });
}

module.exports = { seedIfEmpty };
