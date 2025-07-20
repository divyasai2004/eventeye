const mongoose = require('mongoose');

const SponsorProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  brandName: { type: String, required: true },
  website: { type: String },
  industry: { type: String, required: true },
  targetAudience: { type: String, required: true },
  goals: { type: String, required: true },
  region: { type: String },
  budget: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('SponsorProfile', SponsorProfileSchema); 