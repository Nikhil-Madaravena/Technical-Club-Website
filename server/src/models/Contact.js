const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['general', 'membership', 'collaboration', 'contact', 'other'], default: 'general' },
    status: { type: String, enum: ['new', 'read', 'pending', 'reviewing', 'shortlisted', 'accepted', 'rejected'], default: 'new' },
    notes: { type: String, default: '' }, // Admin notes
    resumeUrl: { type: String, default: '' }, // for membership requests
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
