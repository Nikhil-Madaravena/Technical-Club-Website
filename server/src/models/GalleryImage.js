const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    thumbnail: { type: String },
    caption: { type: String, trim: true },
    altText: { type: String, trim: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    eventName: { type: String },
    album: { type: String, default: 'General' },
    year: { type: Number, default: () => new Date().getFullYear() },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    uploadedBy: { type: String, default: 'admin' },
    width: { type: Number },
    height: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model('GalleryImage', galleryImageSchema);
