const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const Match = mongoose.model('Match');
const StudentClubProfile = mongoose.model('StudentClubProfile');
const SponsorProfile = mongoose.model('SponsorProfile');

const router = express.Router();

// Auth middleware
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Helper: calculate match %
function calculateMatchPercent(studentProfile, sponsorProfile) {
  let score = 0;
  let total = 0;
  // Target Audience
  total++;
  if (
    studentProfile.targetAudience &&
    sponsorProfile.targetAudience &&
    studentProfile.targetAudience.toLowerCase() === sponsorProfile.targetAudience.toLowerCase()
  ) score++;
  // Industry
  total++;
  if (
    studentProfile.theme &&
    sponsorProfile.industry &&
    studentProfile.theme.toLowerCase() === sponsorProfile.industry.toLowerCase()
  ) score++;
  // Goals
  total++;
  if (
    studentProfile.sponsorshipRequirements &&
    sponsorProfile.goals &&
    studentProfile.sponsorshipRequirements.toLowerCase().includes(sponsorProfile.goals.toLowerCase())
  ) score++;
  // Region (optional)
  total++;
  if (
    studentProfile.region &&
    sponsorProfile.region &&
    studentProfile.region.toLowerCase() === sponsorProfile.region.toLowerCase()
  ) score++;
  return Math.round((score / total) * 100);
}

// GET / - get matches for current user, with match %
router.get('/', auth, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const user = await User.findById(userId)
      .populate('studentClubProfile')
      .populate('sponsorProfile');
    let matches = await Match.find({ $or: [ { studentClub: userId }, { sponsor: userId } ] })
      .populate('studentClub', 'email studentClubProfile')
      .populate('sponsor', 'email sponsorProfile');
    // Calculate match % for each
    matches = await Promise.all(matches.map(async match => {
      let percent = 0;
      let studentProfile = null;
      let sponsorProfile = null;
      if (user.role === 'studentClub') {
        studentProfile = user.studentClubProfile || (await StudentClubProfile.findOne({ user: user._id }));
        sponsorProfile = await SponsorProfile.findOne({ user: match.sponsor._id });
      } else {
        sponsorProfile = user.sponsorProfile || (await SponsorProfile.findOne({ user: user._id }));
        studentProfile = await StudentClubProfile.findOne({ user: match.studentClub._id });
      }
      if (studentProfile && sponsorProfile) {
        percent = calculateMatchPercent(studentProfile, sponsorProfile);
      }
      return { ...match.toObject(), matchPercent: percent, studentProfile, sponsorProfile };
    }));
    // Debug logging
    console.log('User:', req.user.userId);
    console.log('Matches found:', matches);
    // Apply filters
    const { industry, audience } = req.query;
    if (industry) {
      matches = matches.filter(m => {
        const sp = m.sponsorProfile || {};
        return sp.industry && sp.industry.toLowerCase() === industry.toLowerCase();
      });
    }
    if (audience) {
      matches = matches.filter(m => {
        const sp = m.sponsorProfile || m.studentProfile || {};
        return sp.targetAudience && sp.targetAudience.toLowerCase() === audience.toLowerCase();
      });
    }
    res.json({ matches });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/matches/analytics
router.get('/analytics', auth, async (req, res) => {
  try {
    let matches;
    if (req.user.role === 'sponsor') {
      matches = await mongoose.model('Match').find({ sponsor: req.user.userId }).populate('studentClubProfile');
    } else if (req.user.role === 'studentClub') {
      matches = await mongoose.model('Match').find({ studentClub: req.user.userId }).populate('sponsorProfile');
    } else {
      return res.status(403).json({ error: 'Forbidden' });
    }
    // Count by event theme (for sponsors) or by industry (for student clubs)
    const byTheme = {};
    const byAudience = {};
    if (req.user.role === 'sponsor') {
    matches.forEach(m => {
      const theme = m.studentClubProfile?.theme || 'Other';
      byTheme[theme] = (byTheme[theme] || 0) + 1;
    });
    matches.forEach(m => {
      const audience = m.studentClubProfile?.targetAudience || 'Other';
      byAudience[audience] = (byAudience[audience] || 0) + 1;
    });
    } else {
      matches.forEach(m => {
        const industry = m.sponsorProfile?.industry || 'Other';
        byTheme[industry] = (byTheme[industry] || 0) + 1;
      });
      matches.forEach(m => {
        const audience = m.sponsorProfile?.targetAudience || 'Other';
        byAudience[audience] = (byAudience[audience] || 0) + 1;
      });
    }
    res.json({ byTheme, byAudience, totalMatches: matches.length });
  } catch (err) {
    console.error('Error in /api/matches/analytics:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/matches/dummy - create a dummy match for demo/testing
router.post('/dummy', auth, async (req, res) => {
  try {
    if (req.user.role !== 'sponsor') return res.status(403).json({ error: 'Forbidden' });
    // Find a random student club
    const studentClubs = await User.find({ role: 'studentClub' });
    let studentClub = studentClubs[Math.floor(Math.random() * studentClubs.length)];
    // If no student club exists, create one with a profile
    if (!studentClub) {
      const newClub = new User({
        role: 'studentClub',
        email: `club${Date.now()}@demo.com`,
        password: 'password',
      });
      await newClub.save();
      const profile = new StudentClubProfile({
        user: newClub._id,
        eventName: 'Demo Event',
        description: 'A demo event for testing',
        theme: 'Tech',
        targetAudience: 'Students',
        expectedReach: 100,
        socialStats: '1000 followers',
        pastEvents: 'DemoCon 2023',
        sponsorshipRequirements: 'Looking for tech sponsors',
      });
      await profile.save();
      newClub.studentClubProfile = profile._id;
      await newClub.save();
      studentClub = newClub;
    }
    // Create a match
    const sponsor = await User.findById(req.user.userId);
    const match = new Match({
      studentClub: studentClub._id,
      sponsor: sponsor._id,
      sponsorProfile: sponsor.sponsorProfile,
      studentClubProfile: studentClub.studentClubProfile,
    });
    await match.save();
    res.json({ success: true, match });
  } catch (err) {
    console.error('Error creating dummy match:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/matches/:id/stage - update match stage
router.patch('/:id/stage', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { stage } = req.body;
    const allowedStages = ['New', 'Contacted', 'In Discussion', 'Proposal Sent', 'Negotiation', 'Deal Closed', 'Rejected'];
    if (!allowedStages.includes(stage)) return res.status(400).json({ error: 'Invalid stage' });
    const match = await Match.findById(id);
    if (!match) return res.status(404).json({ error: 'Match not found' });
    if (String(match.sponsor) !== req.user.userId) return res.status(403).json({ error: 'Not authorized' });
    match.stage = stage;
    await match.save();
    res.json({ success: true, match });
  } catch (err) {
    console.error('Error updating match stage:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 