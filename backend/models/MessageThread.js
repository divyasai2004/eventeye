const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String },
  timestamp: { type: Date, default: Date.now },
  fileUrl: { type: String },
  fileName: { type: String }
});

const MessageThreadSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [MessageSchema]
}, { timestamps: true });

module.exports = mongoose.model('MessageThread', MessageThreadSchema); 