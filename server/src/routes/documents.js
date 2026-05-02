const express = require('express');
const Document = require('../models/Document');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// GET /api/documents — admin only
router.get('/', protect, async (req, res) => {
  try {
    const { type, eventId, year } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (eventId) filter.event = eventId;
    if (year) filter.year = parseInt(year);

    const docs = await Document.find(filter)
      .sort({ createdAt: -1 })
      .populate('event', 'title date');

    res.json({ success: true, data: docs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/documents — admin only
router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    const { title, type, event, year } = req.body;
    if (!req.file) return res.status(400).json({ success: false, message: 'File is required' });

    const doc = await Document.create({
      title,
      type: type || 'Other',
      url: req.file.path.startsWith('http') ? req.file.path : `/uploads/${req.file.filename}`,
      event: event || undefined,
      year: year || new Date().getFullYear(),
      uploadedBy: req.user._id
    });

    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/documents/:id — admin only
router.delete('/:id', protect, async (req, res) => {
  try {
    const doc = await Document.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });
    res.json({ success: true, message: 'Document deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
