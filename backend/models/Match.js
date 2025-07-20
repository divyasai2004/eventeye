const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  studentClub: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sponsor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  matchScore: { type: Number },
  sponsorProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'SponsorProfile' },
  studentClubProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentClubProfile' },
  stage: {
    type: String,
    enum: ['New', 'Contacted', 'In Discussion', 'Proposal Sent', 'Negotiation', 'Deal Closed', 'Rejected'],
    default: 'New',
  },
}, { timestamps: true });

module.exports = mongoose.model('Match', MatchSchema); 