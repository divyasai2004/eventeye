const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = mongoose.model('User');
const MessageThread = mongoose.model('MessageThread');
const Match = mongoose.model('Match');

const router = express.Router();

// Multer setup
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

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

// GET / - get all threads for user
router.get('/', auth, async (req, res) => {
  try {
    const threads = await MessageThread.find({ participants: req.user.userId }).populate('participants', 'email role');
    res.json({ threads });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /:threadId - get messages in a thread
router.get('/:threadId', auth, async (req, res) => {
  try {
    const thread = await MessageThread.findById(req.params.threadId)
      .populate('participants', 'email role')
      .populate('messages.sender', 'email');
    if (!thread || !thread.participants.some(p => p._id.equals(req.user.userId))) {
      return res.status(404).json({ error: 'Thread not found' });
    }
    res.json({ messages: thread.messages });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST / - start new thread or send message (with optional file)
router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    const { recipientId, message } = req.body;
    if (!recipientId && !req.body.recipientEmail) return res.status(400).json({ error: 'recipientId or recipientEmail required' });
    if (!message && !req.file) return res.status(400).json({ error: 'Message text or file required' });
    let recId = recipientId;
    if (!recId && req.body.recipientEmail) {
      const recUser = await User.findOne({ email: req.body.recipientEmail });
      if (!recUser) return res.status(404).json({ error: 'Recipient not found' });
      recId = recUser._id;
    }
    let thread = await MessageThread.findOne({
      participants: { $all: [req.user.userId, recId], $size: 2 }
    });
    if (!thread) {
      thread = new MessageThread({ participants: [req.user.userId, recId], messages: [] });
    }
    const msg = {
      sender: req.user.userId,
      text: message || '',
      timestamp: new Date()
    };
    if (req.file) {
      msg.fileUrl = `/api/messages/files/${req.file.filename}`;
      msg.fileName = req.file.originalname;
    }
    thread.messages.push(msg);
    await thread.save();
    // Auto-create a Match if it doesn't exist
    const existingMatch = await Match.findOne({
      $or: [
        { studentClub: req.user.userId, sponsor: recId },
        { studentClub: recId, sponsor: req.user.userId }
      ]
    });
    if (!existingMatch) {
      // Determine roles
      const senderUser = await User.findById(req.user.userId);
      const recipientUser = await User.findById(recId);
      let studentClub = null, sponsor = null;
      if (senderUser.role === 'studentClub') {
        studentClub = senderUser._id;
        sponsor = recipientUser._id;
      } else {
        studentClub = recipientUser._id;
        sponsor = senderUser._id;
      }
      if (studentClub && sponsor) {
        await Match.create({ studentClub, sponsor });
      }
    }
    res.json({ thread });
  } catch (err) {
    console.error('Error in POST /api/messages:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /:threadId/:messageId - delete a message from a thread
router.delete('/:threadId/:messageId', auth, async (req, res) => {
  try {
    const { threadId, messageId } = req.params;
    const thread = await MessageThread.findById(threadId);
    if (!thread) return res.status(404).json({ error: 'Thread not found' });
    const msg = thread.messages.id(messageId);
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    const senderId = msg.sender && msg.sender._id ? msg.sender._id.toString() : msg.sender.toString();
    if (senderId !== req.user.userId) return res.status(403).json({ error: 'Not authorized to delete this message' });
    thread.messages = thread.messages.filter(m => m._id.toString() !== messageId);
    await thread.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve uploaded files
router.use('/files', express.static(path.join(__dirname, '../uploads')));

module.exports = router; 