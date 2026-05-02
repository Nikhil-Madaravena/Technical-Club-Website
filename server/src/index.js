const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = ['http://localhost:5173', 'http://localhost:8080', process.env.FRONTEND_URL].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      // In production, if it doesn't match exactly, we still might want to log it
      console.log('Origin not allowed by CORS:', origin);
      callback(null, true); // Temporarily allow all to fix the blocker
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ── Try to connect to MongoDB ─────────────────────────────────────────────────
let dbConnected = false;

const tryMongo = async () => {
  try {
    const mongoose = require('mongoose');
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 3000 });
    dbConnected = true;
    console.log('✅ MongoDB connected');
    // Register DB routes
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/events', require('./routes/events'));
    app.use('/api/gallery', require('./routes/gallery'));
    app.use('/api/team', require('./routes/team'));
    app.use('/api/contact', require('./routes/contact'));
    app.use('/api/stats', require('./routes/stats'));
    app.use('/api/documents', require('./routes/documents'));
    // Seed if empty
    try { const { seedIfEmpty } = require('./seed'); await seedIfEmpty(); } catch (e) { console.error('Seed Error:', e.message); }
  } catch (err) {
    console.error('MongoDB Initialization Error:', err);
    console.log('⚠️  MongoDB not available — running in mock-data mode');
    // Register mock routes instead
    app.use('/api', require('./routes/mock'));
  }
};

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_, res) =>
  res.json({ status: 'OK', db: dbConnected ? 'mongodb' : 'mock', timestamp: new Date() })
);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal Server Error' });
});

// Boot
tryMongo().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server → http://localhost:${PORT}  (db: ${dbConnected ? 'mongodb' : 'mock'})`));
});

module.exports = app;
