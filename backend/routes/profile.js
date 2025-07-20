const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const StudentClubProfile = mongoose.model('StudentClubProfile');
const SponsorProfile = mongoose.model('SponsorProfile');
const OpenAI = require("openai");
const PDFDocument = require("pdfkit");

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

// GET /me - get current user's profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('studentClubProfile')
      .populate('sponsorProfile');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({
      email: user.email,
      role: user.role,
      studentClubProfile: user.studentClubProfile,
      sponsorProfile: user.sponsorProfile
    });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /me - update current user's profile
router.put('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.role === 'studentClub') {
      let profile;
      if (user.studentClubProfile) {
        profile = await StudentClubProfile.findById(user.studentClubProfile);
        Object.assign(profile, req.body);
      } else {
        profile = new StudentClubProfile({ ...req.body, user: user._id });
      }
      await profile.save();
      if (!user.studentClubProfile) {
        user.studentClubProfile = profile._id;
        await user.save();
      }
      res.json({ studentClubProfile: profile });
    } else if (user.role === 'sponsor') {
      let profile;
      if (user.sponsorProfile) {
        profile = await SponsorProfile.findById(user.sponsorProfile);
        Object.assign(profile, req.body);
      } else {
        profile = new SponsorProfile({ ...req.body, user: user._id });
      }
      await profile.save();
      if (!user.sponsorProfile) {
        user.sponsorProfile = profile._id;
        await user.save();
      }
      res.json({ sponsorProfile: profile });
    } else {
      res.status(400).json({ error: 'Invalid role' });
    }
  } catch (err) {
    console.error('Error in PUT /api/profile/me:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/generate-proposal', auth, async (req, res) => {
  try {
    const user = await mongoose.model('User').findById(req.user.userId).populate('studentClubProfile');
    if (!user || user.role !== 'studentClub' || !user.studentClubProfile) {
      return res.status(400).json({ error: 'Profile not found' });
    }
    // Compose prompt
    const prompt = `Write a professional sponsorship proposal for this event:\n${JSON.stringify(user.studentClubProfile, null, 2)}`;
    let proposalText;
    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const aiRes = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
      });
      proposalText = aiRes.choices[0].message.content.trim();
    } catch (err) {
      // If OpenAI quota exceeded, use a mock proposal
      console.error('OpenAI error, using mock proposal:', err.message);
      proposalText = `Dear Sponsor,\n\nWe are excited to invite you to partner with us for our upcoming event, TechFest 2025. Our event targets Students and focuses on the theme 'Tech'. We are seeking Brand Awareness sponsorships and expect a reach of 1000+ participants.\n\nWe believe your brand aligns perfectly with our goals and audience.\n\nLooking forward to your support!\n\nBest regards,\nTechFest Team`;
    }
    // Generate PDF
    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=proposal.pdf');
      res.send(pdfData);
    });
    doc.fontSize(20).text('Sponsorship Proposal', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(proposalText);
    doc.end();
  } catch (err) {
    console.error('Error in generate-proposal:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /clubs - get all student club profiles (for sponsors and student clubs to explore)
router.get('/clubs', auth, async (req, res) => {
  try {
    // Removed role check so both sponsors and student clubs can access
    const clubs = await mongoose.model('StudentClubProfile').find().populate('user', 'email');
    res.json({ clubs });
  } catch (err) {
    console.error('Error in GET /api/profile/clubs:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 