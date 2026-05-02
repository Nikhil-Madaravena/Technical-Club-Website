const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    shortDescription: { type: String, trim: true },
    date: { type: Date, required: true },
    endDate: { type: Date },
    location: { type: String, required: true },
    category: {
      type: String,
      enum: ['Hackathon', 'Workshop', 'Guest Lecture', 'Competition', 'Seminar', 'Other'],
      default: 'Other',
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    coverImage: { type: String, default: '' },
    images: [{ type: String }],
    tags: [{ type: String }],
    registrationLink: { type: String, default: '' },
    maxParticipants: { type: Number },
    registeredCount: { type: Number, default: 0 },
    winners: [
      {
        position: String,
        name: String,
        team: String,
        prize: String,
      },
    ],
    highlights: [{ type: String }],
    isHighlighted: { type: Boolean, default: false },
    slug: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

// Auto-generate slug from title
eventSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();
  }
  next();
});

module.exports = mongoose.model('Event', eventSchema);
