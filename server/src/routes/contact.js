const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Contact = require('../models/Contact');
const { protect } = require('../middleware/auth');
const { uploadToFirebase, isFirebaseConfigured } = require('../lib/firebase');

const router = express.Router();

// Multer setup: use memory storage if Firebase is configured, otherwise use local disk storage
const uploadDir = path.join(__dirname, '../../uploads/documents');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = isFirebaseConfigured() 
  ? multer.memoryStorage() 
  : multer.diskStorage({
      destination: (req, file, cb) => cb(null, uploadDir),
      filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + path.extname(file.originalname));
      }
    });

const fileFilter = (req, file, cb) => {
  const allowed = /pdf|doc|docx/;
  if (allowed.test(path.extname(file.originalname).toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and Word documents are allowed'), false);
  }
};

const uploadDocument = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit

// POST /api/contact — public (submit a message/join request with optional resume)
router.post('/', uploadDocument.single('resume'), async (req, res) => {
  try {
    const { name, email, subject, message, type } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    
    let resumeUrl = '';

    if (req.file) {
      if (isFirebaseConfigured()) {
        try {
          resumeUrl = await uploadToFirebase(req.file, 'resumes');
        } catch (error) {
          console.error('Firebase upload failed, falling back to local storage:', error.message);
          // If memory storage is used, we might not have a filename, so we'll save it locally now
          const uploadDir = path.join(__dirname, '../../uploads/documents');
          if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const localPath = unique + path.extname(req.file.originalname);
          fs.writeFileSync(path.join(uploadDir, localPath), req.file.buffer);
          resumeUrl = `/uploads/documents/${localPath}`;
        }
      } else if (req.file.filename) {
        resumeUrl = `/uploads/documents/${req.file.filename}`;
      }
    }

    const contact = await Contact.create({ 
      name, 
      email, 
      subject: subject || 'General Inquiry', 
      message, 
      type, 
      resumeUrl 
    });
    
    res.status(201).json({ success: true, message: 'Message received! We will get back to you soon.' });
  } catch (err) {
    console.error('Contact Submission Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/contact — admin only
router.get('/', protect, async (req, res) => {
  try {
    const { status, type } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    const messages = await Contact.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/contact/:id/status — admin
router.patch('/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/contact/:id — admin
router.delete('/:id', protect, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
