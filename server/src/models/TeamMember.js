const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    domain: {
      type: String,
      enum: ['Web Development', 'AI/ML', 'Cybersecurity', 'IoT', 'App Development', 'Design', 'Core', 'Other'],
      default: 'Other',
    },
    batch: { type: String }, // e.g., "2023-2027"
    year: { type: Number }, // year of study (1, 2, 3, 4)
    academicYear: { type: Number, required: true, default: new Date().getFullYear() }, // e.g., 2024 for 2024-25 team
    photo: { type: String, default: '' },
    bio: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    email: { type: String, default: '' },
    order: { type: Number, default: 100 }, // for display ordering
    isActive: { type: Boolean, default: true },
    isCoreTeam: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TeamMember', teamMemberSchema);
