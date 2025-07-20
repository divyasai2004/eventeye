const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  role: { type: String, enum: ['studentClub', 'sponsor'], required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  studentClubProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentClubProfile' },
  sponsorProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'SponsorProfile' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema); 