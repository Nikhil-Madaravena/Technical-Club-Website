const express = require('express');
const TeamMember = require('../models/TeamMember');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadToFirebase, isFirebaseConfigured } = require('../lib/firebase');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// GET /api/team — public
router.get('/', async (req, res) => {
  try {
    const { domain, isCoreTeam, academicYear } = req.query;
    const filter = { isActive: true };
    if (domain) filter.domain = domain;
    if (isCoreTeam === 'true') filter.isCoreTeam = true;
    if (academicYear) filter.academicYear = parseInt(academicYear);
    const members = await TeamMember.find(filter).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: members });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/team — admin
router.post('/', protect, upload.single('photo'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      let url = '';
      if (req.file.path && req.file.path.startsWith('http')) {
        url = req.file.path;
      } else if (isFirebaseConfigured() && req.file.buffer) {
        try {
          url = await uploadToFirebase(req.file, 'team');
        } catch (error) {
          console.error('Firebase Team upload failed:', error.message);
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
      data.photo = url;
    }
    const member = await TeamMember.create(data);
    res.status(201).json({ success: true, data: member });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/team/:id — admin
router.put('/:id', protect, upload.single('photo'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      let url = '';
      if (req.file.path && req.file.path.startsWith('http')) {
        url = req.file.path;
      } else if (isFirebaseConfigured() && req.file.buffer) {
        try {
          url = await uploadToFirebase(req.file, 'team');
        } catch (error) {
          console.error('Firebase Team upload failed:', error.message);
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
      data.photo = url;
    }
    const member = await TeamMember.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!member) return res.status(404).json({ success: false, message: 'Member not found' });
    res.json({ success: true, data: member });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/team/:id — admin
router.delete('/:id', protect, async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Member removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
