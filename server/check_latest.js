const mongoose = require('mongoose');
require('dotenv').config();
const Contact = require('./src/models/Contact');

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  const latest = await Contact.findOne().sort({ createdAt: -1 });
  console.log('Latest Message:', latest);
  await mongoose.disconnect();
}

check();
