const mongoose = require('mongoose');

const StudentClubProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventName: { type: String, required: true },
  description: { type: String, required: true },
  theme: { type: String, required: true },
  targetAudience: { type: String, required: true },
  expectedReach: { type: Number, required: true },
  socialStats: { type: String },
  pastEvents: { type: String },
  sponsorshipRequirements: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('StudentClubProfile', StudentClubProfileSchema); 
