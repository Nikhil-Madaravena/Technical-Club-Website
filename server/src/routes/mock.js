/**
 * Mock API routes — serves realistic demo data when MongoDB is unavailable.
 * All data is in-memory. Admin login still works via JWT with a static secret.
 */
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'tc_kitsw_mock_secret';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@kitsw.ac.in';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@123';

// ── Mock Data ─────────────────────────────────────────────────────────────────
const PLACEHOLDER = 'https://picsum.photos/seed';

let EVENTS = [
  { _id: '1', title: 'HACKATHON 2026', description: 'The flagship annual hackathon — 36-hour marathon. Theme: Sustainable Tech.', shortDescription: '36-hour coding marathon with sustainability theme.', date: '2026-03-15T00:00:00Z', location: 'KITSW Campus', category: 'Hackathon', status: 'upcoming', coverImage: `${PLACEHOLDER}/hack26/800/400`, tags: ['coding','ai','web'], registrationLink: '#', maxParticipants: 300, isHighlighted: true, registeredCount: 0, highlights: [], winners: [] },
  { _id: '2', title: 'AI WORKSHOP SERIES', description: 'Hands-on sessions on building intelligent applications using LLMs, transformers, and prompt engineering.', shortDescription: 'Hands-on sessions on LLMs and transformers.', date: '2025-11-28T00:00:00Z', location: 'Seminar Hall, Block C', category: 'Workshop', status: 'completed', coverImage: `${PLACEHOLDER}/aiws/800/400`, tags: ['ai','ml','llm'], registeredCount: 95, highlights: ['95 participants', 'Hands-on coding'], winners: [] },
  { _id: '3', title: 'HACKATHON 2025', description: 'A 36-hour coding marathon where teams solved real-world problems using technology. Teams competed across AI, Web, and IoT domains.', shortDescription: '36-hour marathon — 180 participants, 30 teams.', date: '2025-10-15T00:00:00Z', location: 'KITSW Campus, Main Block', category: 'Hackathon', status: 'completed', coverImage: `${PLACEHOLDER}/hack25/800/400`, tags: ['hackathon','ai'], registeredCount: 180, isHighlighted: true, highlights: ['180 participants','30 teams','36 hours','₹30,000 prize pool'], winners: [{ position: '1st', name: 'Team Alpha', prize: '₹15,000' }, { position: '2nd', name: 'Team Beta', prize: '₹10,000' }, { position: '3rd', name: 'Team Gamma', prize: '₹5,000' }] },
  { _id: '4', title: 'GUEST LECTURE: FUTURE OF WEB', description: 'Industry expert session on WebAssembly, edge computing, serverless architectures, and the next evolution of the web platform.', shortDescription: 'Expert talk on WebAssembly and edge computing.', date: '2026-03-05T00:00:00Z', location: 'Auditorium', category: 'Guest Lecture', status: 'upcoming', coverImage: `${PLACEHOLDER}/weblec/800/400`, tags: ['web','wasm'], registrationLink: '#' },
  { _id: '5', title: 'CODE SPRINT 2025', description: 'Competitive programming contest with algorithmic challenges, data structures, and dynamic programming problems.', shortDescription: 'Competitive programming contest with prizes.', date: '2025-09-05T00:00:00Z', location: 'CS Lab Complex', category: 'Competition', status: 'completed', coverImage: `${PLACEHOLDER}/cs25/800/400`, tags: ['competitive','algorithms'], registeredCount: 120, winners: [{ position: '1st', name: 'Ravi Kumar', prize: '₹5,000' }, { position: '2nd', name: 'Priya Sharma', prize: '₹3,000' }] },
  { _id: '6', title: 'IOT BOOTCAMP', description: 'A 2-day bootcamp covering Arduino, Raspberry Pi, sensor interfacing, and building smart home prototypes.', shortDescription: '2-day hands-on IoT bootcamp with hardware.', date: '2026-04-05T00:00:00Z', location: 'Electronics Lab', category: 'Workshop', status: 'upcoming', coverImage: `${PLACEHOLDER}/iotbc/800/400`, tags: ['iot','hardware'], registrationLink: '#', maxParticipants: 60 },
];

let ACHIEVEMENTS = [
  { _id: '1', title: '1st Place — Smart India Hackathon 2025', description: 'National-level win for water quality monitoring using IoT sensors and ML.', category: 'Competition', date: '2025-08-20T00:00:00Z', year: 2025, rank: '1st Place', awardedBy: 'Ministry of Education, India', members: ['Arjun Reddy', 'Sai Krishna', 'Meghana Rao'], isHighlighted: true, icon: 'Trophy' },
  { _id: '2', title: 'Best Technical Club — University Awards 2025', description: 'Recognized as the Best Technical Club at the annual KITSW university awards ceremony.', category: 'Award', date: '2025-12-10T00:00:00Z', year: 2025, awardedBy: 'KITSW University', isHighlighted: true, icon: 'Award' },
  { _id: '3', title: '2nd Place — HackWithInfy 2025', description: 'Reached the national finals of Infosys HackWithInfy, securing 2nd position among 10,000+ participants.', category: 'Competition', date: '2025-07-15T00:00:00Z', year: 2025, rank: '2nd Place', awardedBy: 'Infosys', members: ['Varsha Singh', 'Aditya Nair'], icon: 'Medal' },
  { _id: '4', title: '500+ Members Milestone', description: 'Technical Club reached its biggest milestone — over 500 active members across all technical domains.', category: 'Milestone', date: '2025-06-01T00:00:00Z', year: 2025, icon: 'Star' },
  { _id: '5', title: 'Best Paper Award — IEEE Conference', description: 'Club members published and presented "Edge AI for Healthcare" winning best paper at the IEEE International Conference.', category: 'Publication', date: '2025-09-30T00:00:00Z', year: 2025, awardedBy: 'IEEE', members: ['Dr. Faculty Mentor', 'Kiran Patel'], icon: 'BookOpen' },
  { _id: '6', title: 'Top 10 — Google Solution Challenge', description: 'Our team\'s project on accessible education reached the global top 10.', category: 'Competition', date: '2025-04-10T00:00:00Z', year: 2025, rank: 'Top 10', awardedBy: 'Google', members: ['Riya Patel', 'Suresh Rao'], icon: 'Target' },
];

let TEAM = [
  { _id: '1', name: 'Rahul Sharma', role: 'President', domain: 'Web Development', batch: '2022-2026', order: 1, isCoreTeam: true, bio: 'Full-stack developer and tech enthusiast leading the club.', photo: `${PLACEHOLDER}/rahul/200/200`, linkedin: '#', github: '#', isActive: true },
  { _id: '2', name: 'Priya Nair', role: 'Vice President', domain: 'AI/ML', batch: '2022-2026', order: 2, isCoreTeam: true, bio: 'ML researcher and hackathon champion.', photo: `${PLACEHOLDER}/priya/200/200`, linkedin: '#', github: '#', isActive: true },
  { _id: '3', name: 'Aditya Kumar', role: 'Secretary', domain: 'Core', batch: '2023-2027', order: 3, isCoreTeam: true, photo: `${PLACEHOLDER}/aditya/200/200`, isActive: true },
  { _id: '4', name: 'Meghana Rao', role: 'Technical Lead', domain: 'IoT', batch: '2022-2026', order: 4, isCoreTeam: true, photo: `${PLACEHOLDER}/meghana/200/200`, isActive: true },
  { _id: '5', name: 'Sai Kiran', role: 'Design Lead', domain: 'Design', batch: '2023-2027', order: 5, isCoreTeam: true, photo: `${PLACEHOLDER}/saikiran/200/200`, isActive: true },
  { _id: '6', name: 'Varsha Reddy', role: 'Web Dev Lead', domain: 'Web Development', batch: '2023-2027', order: 6, isCoreTeam: false, photo: `${PLACEHOLDER}/varsha/200/200`, isActive: true },
  { _id: '7', name: 'Arjun Patel', role: 'AI/ML Lead', domain: 'AI/ML', batch: '2023-2027', order: 7, isCoreTeam: false, photo: `${PLACEHOLDER}/arjun/200/200`, isActive: true },
  { _id: '8', name: 'Divya Singh', role: 'Cybersecurity Lead', domain: 'Cybersecurity', batch: '2022-2026', order: 8, isCoreTeam: false, photo: `${PLACEHOLDER}/divya/200/200`, isActive: true },
];

const ALBUMS = ['Hackathon 2025', 'AI Workshop', 'Code Sprint 2025', 'Team Outings'];
let GALLERY = Array.from({ length: 24 }, (_, i) => ({
  _id: String(i + 1),
  url: `${PLACEHOLDER}/${100 + i}/800/600`,
  album: ALBUMS[i % 4],
  year: i < 12 ? 2025 : 2024,
  caption: `Moment from ${ALBUMS[i % 4]}`,
  eventName: ALBUMS[i % 4],
  isFeatured: i < 6,
  createdAt: new Date().toISOString(),
}));

let MESSAGES = [];

// ── Auth ──────────────────────────────────────────────────────────────────────
const protect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'No token' });
  try {
    jwt.verify(auth.split(' ')[1], JWT_SECRET);
    next();
  } catch { res.status(401).json({ success: false, message: 'Invalid token' }); }
};

router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ id: 'mock-admin', email }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ success: true, token, user: { id: 'mock-admin', name: 'Admin', email, role: 'admin' } });
  }
  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

router.get('/auth/me', protect, (req, res) => {
  res.json({ success: true, user: { id: 'mock-admin', name: 'Admin', email: ADMIN_EMAIL, role: 'admin' } });
});

// ── Events ────────────────────────────────────────────────────────────────────
router.get('/events', (req, res) => {
  let data = [...EVENTS];
  if (req.query.status) data = data.filter(e => e.status === req.query.status);
  if (req.query.category) data = data.filter(e => e.category === req.query.category);
  if (req.query.search) { const s = req.query.search.toLowerCase(); data = data.filter(e => e.title.toLowerCase().includes(s)); }
  res.json({ success: true, data, total: data.length });
});

router.get('/events/upcoming', (req, res) => {
  const data = EVENTS.filter(e => e.status === 'upcoming' || e.status === 'ongoing');
  res.json({ success: true, data });
});

router.get('/events/:id', (req, res) => {
  const ev = EVENTS.find(e => e._id === req.params.id);
  if (!ev) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true, data: ev });
});

router.post('/events', protect, (req, res) => {
  const ev = { ...req.body, _id: Date.now().toString(), createdAt: new Date().toISOString(), winners: [], highlights: [], tags: [] };
  EVENTS.unshift(ev);
  res.status(201).json({ success: true, data: ev });
});

router.put('/events/:id', protect, (req, res) => {
  const idx = EVENTS.findIndex(e => e._id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Not found' });
  EVENTS[idx] = { ...EVENTS[idx], ...req.body };
  res.json({ success: true, data: EVENTS[idx] });
});

router.delete('/events/:id', protect, (req, res) => {
  EVENTS = EVENTS.filter(e => e._id !== req.params.id);
  res.json({ success: true, message: 'Deleted' });
});

// ── Gallery ───────────────────────────────────────────────────────────────────
router.get('/gallery', (req, res) => {
  let data = [...GALLERY];
  if (req.query.album) data = data.filter(g => g.album === req.query.album);
  if (req.query.year)  data = data.filter(g => g.year === parseInt(req.query.year));
  res.json({ success: true, data, total: data.length });
});

router.get('/gallery/albums', (req, res) => {
  const albumMap = {};
  GALLERY.forEach(g => {
    if (!albumMap[g.album]) albumMap[g.album] = { _id: g.album, count: 0, cover: g.url, year: g.year };
    albumMap[g.album].count++;
  });
  res.json({ success: true, data: Object.values(albumMap) });
});

router.post('/gallery', protect, (req, res) => {
  const img = { ...req.body, _id: Date.now().toString(), url: `${PLACEHOLDER}/${Date.now()}/800/600`, createdAt: new Date().toISOString() };
  GALLERY.unshift(img);
  res.status(201).json({ success: true, data: [img], count: 1 });
});

router.delete('/gallery/:id', protect, (req, res) => {
  GALLERY = GALLERY.filter(g => g._id !== req.params.id);
  res.json({ success: true, message: 'Deleted' });
});

// ── Team ──────────────────────────────────────────────────────────────────────
router.get('/team', (req, res) => {
  let data = TEAM.filter(m => m.isActive);
  if (req.query.isCoreTeam === 'true') data = data.filter(m => m.isCoreTeam);
  res.json({ success: true, data });
});

// ── Achievements ──────────────────────────────────────────────────────────────
router.get('/achievements', (req, res) => {
  let data = [...ACHIEVEMENTS];
  if (req.query.category) data = data.filter(a => a.category === req.query.category);
  res.json({ success: true, data });
});

router.post('/achievements', protect, (req, res) => {
  const a = { ...req.body, _id: Date.now().toString(), year: new Date(req.body.date).getFullYear() };
  ACHIEVEMENTS.unshift(a);
  res.status(201).json({ success: true, data: a });
});

router.delete('/achievements/:id', protect, (req, res) => {
  ACHIEVEMENTS = ACHIEVEMENTS.filter(a => a._id !== req.params.id);
  res.json({ success: true, message: 'Deleted' });
});

// ── Contact ───────────────────────────────────────────────────────────────────
router.post('/contact', (req, res) => {
  const msg = { ...req.body, _id: Date.now().toString(), status: 'new', createdAt: new Date().toISOString() };
  MESSAGES.unshift(msg);
  res.status(201).json({ success: true, message: 'Message received!' });
});

router.get('/contact', protect, (req, res) => {
  let data = [...MESSAGES];
  if (req.query.status) data = data.filter(m => m.status === req.query.status);
  res.json({ success: true, data });
});

router.patch('/contact/:id/status', protect, (req, res) => {
  const m = MESSAGES.find(m => m._id === req.params.id);
  if (m) m.status = req.body.status;
  res.json({ success: true, data: m });
});

router.delete('/contact/:id', protect, (req, res) => {
  MESSAGES = MESSAGES.filter(m => m._id !== req.params.id);
  res.json({ success: true, message: 'Deleted' });
});

// ── Stats ─────────────────────────────────────────────────────────────────────
router.get('/stats', protect, (req, res) => {
  const eventsByCategory = [...new Set(EVENTS.map(e => e.category))].map(cat => ({
    _id: cat, count: EVENTS.filter(e => e.category === cat).length
  }));
  res.json({
    success: true,
    data: {
      totalEvents: EVENTS.length,
      upcomingEvents: EVENTS.filter(e => e.status === 'upcoming').length,
      completedEvents: EVENTS.filter(e => e.status === 'completed').length,
      totalPhotos: GALLERY.length,
      totalMembers: TEAM.filter(m => m.isActive).length,
      totalAchievements: ACHIEVEMENTS.length,
      newMessages: MESSAGES.filter(m => m.status === 'new').length,
      totalMessages: MESSAGES.length,
      eventsPerMonth: [],
      eventsByCategory,
    },
  });
});

router.get('/stats/public', (req, res) => {
  res.json({
    success: true,
    data: {
      totalEvents: EVENTS.filter(e => e.status === 'completed').length,
      totalPhotos: GALLERY.length,
      totalMembers: TEAM.filter(m => m.isActive).length,
      totalAchievements: ACHIEVEMENTS.length,
    },
  });
});

module.exports = router;
