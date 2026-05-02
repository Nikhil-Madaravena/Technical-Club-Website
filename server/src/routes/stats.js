const express = require('express');
const Event = require('../models/Event');
const GalleryImage = require('../models/GalleryImage');
const TeamMember = require('../models/TeamMember');
const Contact = require('../models/Contact');
const { protect } = require('../middleware/auth');

const router = express.Router();

// GET /api/stats — admin dashboard overview
router.get('/', protect, async (req, res) => {
  try {
    const [
      totalEvents, upcomingEvents, completedEvents,
      totalPhotos, totalMembers,
      newMessages, totalMessages,
    ] = await Promise.all([
      Event.countDocuments(),
      Event.countDocuments({ status: { $in: ['upcoming', 'ongoing'] } }),
      Event.countDocuments({ status: 'completed' }),
      GalleryImage.countDocuments(),
      TeamMember.countDocuments({ isActive: true }),
      Contact.countDocuments({ status: 'new' }),
      Contact.countDocuments(),
    ]);

    // Events per month (last 12 months)
    const eventsPerMonth = await Event.aggregate([
      { $match: { date: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) } } },
      { $group: { _id: { month: { $month: '$date' }, year: { $year: '$date' } }, count: { $sum: 1 } } },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    // Events by category
    const eventsByCategory = await Event.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      success: true,
      data: {
        totalEvents, upcomingEvents, completedEvents,
        totalPhotos, totalMembers,
        newMessages, totalMessages,
        eventsPerMonth, eventsByCategory,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/stats/public — public summary for homepage
router.get('/public', async (req, res) => {
  try {
    const [totalEvents, totalPhotos, totalMembers] = await Promise.all([
      Event.countDocuments({ status: 'completed' }),
      GalleryImage.countDocuments(),
      TeamMember.countDocuments({ isActive: true }),
    ]);
    res.json({ success: true, data: { totalEvents, totalPhotos, totalMembers, totalAchievements: 0 } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
