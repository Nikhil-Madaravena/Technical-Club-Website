const express = require('express');
const Event = require('../models/Event');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadToFirebase, isFirebaseConfigured } = require('../lib/firebase');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// GET /api/events — public, with filters
router.get('/', async (req, res) => {
  try {
    const { status, category, year, search, limit = 20, page = 1 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (year) filter.$expr = { $eq: [{ $year: '$date' }, parseInt(year)] };
    if (search) filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];

    const total = await Event.countDocuments(filter);
    const events = await Event.find(filter)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ success: true, data: events, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/events/upcoming — public shortcut
router.get('/upcoming', async (req, res) => {
  try {
    const events = await Event.find({ status: { $in: ['upcoming', 'ongoing'] } })
      .sort({ date: 1 })
      .limit(6);
    res.json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//GET /api/events/sumshodini - public
router.get('/sumshodini', async (req,res)=>{
  try {
    const events = await Event.find({ category : 'Sumshodini' })
      .sort({ date : 1 });
    res.json({ success: true, data: events});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET /api/events/:id — public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/events — admin only
router.post('/', protect, upload.single('coverImage'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      let url = '';
      if (req.file.path && req.file.path.startsWith('http')) {
        url = req.file.path;
      } else if (isFirebaseConfigured() && req.file.buffer) {
        try {
          url = await uploadToFirebase(req.file, 'events');
        } catch (error) {
          console.error('Firebase Event upload failed:', error.message);
        }
      }
      
      if (!url) {
        if (req.file.path) {
          url = req.file.path.startsWith('http') ? req.file.path : `/uploads/${req.file.filename}`;
        } else if (req.file.buffer) {
          const uploadDir = path.join(__dirname, '../../uploads');
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const localPath = unique + path.extname(req.file.originalname);
          fs.writeFileSync(path.join(uploadDir, localPath), req.file.buffer);
          url = `/uploads/${localPath}`;
        }
      }
      data.coverImage = url;
    }
    if (data.tags && typeof data.tags === 'string') data.tags = data.tags.split(',').map(t => t.trim());
    if (data.highlights && typeof data.highlights === 'string') data.highlights = data.highlights.split('\n').filter(Boolean);
    const event = await Event.create(data);
    res.status(201).json({ success: true, data: event });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/events/:id — admin only
router.put('/:id', protect, upload.single('coverImage'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      let url = '';
      if (req.file.path && req.file.path.startsWith('http')) {
        url = req.file.path;
      } else if (isFirebaseConfigured() && req.file.buffer) {
        try {
          url = await uploadToFirebase(req.file, 'events');
        } catch (error) {
          console.error('Firebase Event upload failed:', error.message);
        }
      }
      
      if (!url) {
        if (req.file.path) {
          url = req.file.path.startsWith('http') ? req.file.path : `/uploads/${req.file.filename}`;
        } else if (req.file.buffer) {
          const uploadDir = path.join(__dirname, '../../uploads');
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const localPath = unique + path.extname(req.file.originalname);
          fs.writeFileSync(path.join(uploadDir, localPath), req.file.buffer);
          url = `/uploads/${localPath}`;
        }
      }
      data.coverImage = url;
    }
    if (data.tags && typeof data.tags === 'string') data.tags = data.tags.split(',').map(t => t.trim());
    const event = await Event.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, data: event });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/events/:id — admin only
router.delete('/:id', protect, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
