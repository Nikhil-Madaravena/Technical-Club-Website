const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI).then(async () => {
  const TeamMember = require('./src/models/TeamMember');
  const count = await TeamMember.countDocuments();
  console.log('Team members count:', count);
  const all = await TeamMember.find();
  console.log(all);
  process.exit(0);
});
