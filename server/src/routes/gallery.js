const express = require('express');
const GalleryImage = require('../models/GalleryImage');
const { uploadToFirebase, isFirebaseConfigured } = require('../lib/firebase');
const path = require('path');
const fs = require('fs');

const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// GET /api/gallery — public
router.get('/', async (req, res) => {
  try {
    const { album, year, eventId, featured, limit = 50, page = 1 } = req.query;
    const filter = {};
    if (album) filter.album = album;
    if (year) filter.year = parseInt(year);
    if (eventId) filter.event = eventId;
    if (featured === 'true') filter.isFeatured = true;

    const total = await GalleryImage.countDocuments(filter);
    const images = await GalleryImage.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('event', 'title date');

    res.json({ success: true, data: images, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/gallery/albums — public
router.get('/albums', async (req, res) => {
  try {
    const albums = await GalleryImage.aggregate([
      { $group: { _id: '$album', count: { $sum: 1 }, cover: { $first: '$url' }, year: { $first: '$year' } } },
      { $sort: { year: -1, _id: 1 } },
    ]);
    res.json({ success: true, data: albums });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/gallery — admin, upload image(s)
router.post('/', protect, upload.array('images', 50), async (req, res) => {
  try {
    const { album, eventName, year, caption, tags, isFeatured, event } = req.body;
    const saved = [];
    
    for (const file of req.files || []) {
      let url = '';
      
      // 1. Prefer Cloudinary (handled by multer-storage-cloudinary, so path is already set)
      if (file.path && file.path.startsWith('http')) {
        url = file.path;
      } 
      // 2. Fallback to Firebase if Cloudinary is not used and Firebase is configured
      else if (isFirebaseConfigured() && file.buffer) {
        try {
          url = await uploadToFirebase(file, 'gallery');
        } catch (error) {
          console.error('Firebase Gallery upload failed:', error.message);
        }
      }
      
      // 3. Last fallback to local storage
      if (!url) {
        if (file.path) {
          url = file.path.startsWith('http') ? file.path : `/uploads/${file.filename}`;
        } else if (file.buffer) {
          const uploadDir = path.join(__dirname, '../../uploads');
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const localPath = unique + path.extname(file.originalname);
          fs.writeFileSync(path.join(uploadDir, localPath), file.buffer);
          url = `/uploads/${localPath}`;
        }
      }

      const img = await GalleryImage.create({
        url,
        album: album || 'General',
        eventName, year, caption, isFeatured,
        event: event || undefined,
        tags: tags ? tags.split(',').map(t => t.trim()) : [],
      });
      saved.push(img);
    }
    res.status(201).json({ success: true, data: saved, count: saved.length });
  } catch (err) {
    console.error('Gallery Upload Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/gallery/:id — admin
router.put('/:id', protect, async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!image) return res.status(404).json({ success: false, message: 'Image not found' });
    res.json({ success: true, data: image });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/gallery/:id — admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const img = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!img) return res.status(404).json({ success: false, message: 'Image not found' });
    res.json({ success: true, message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── Bulk Album Operations ───────────────────────────────────────────────────

// PUT /api/gallery/albums/update — admin, rename/update all in album
router.put('/albums/update', protect, async (req, res) => {
  try {
    const { oldName, newName, year } = req.body;
    if (!oldName || !newName) return res.status(400).json({ success: false, message: 'Old and new name required' });
    
    const updateData = { album: newName };
    if (year) updateData.year = year;
    
    const result = await GalleryImage.updateMany({ album: oldName }, { $set: updateData });
    res.json({ success: true, message: `Updated ${result.modifiedCount} images`, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/gallery/albums/:name — admin, delete entire album
router.delete('/albums/:name', protect, async (req, res) => {
  try {
    const { name } = req.params;
    const result = await GalleryImage.deleteMany({ album: name });
    res.json({ success: true, message: `Deleted album ${name} (${result.deletedCount} images)` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
