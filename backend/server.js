const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// Import models
require('./models/User');
require('./models/StudentClubProfile');
require('./models/SponsorProfile');
require('./models/Match');
require('./models/MessageThread');

dotenv.config();

const app = express();
// --- CORS CONFIGURATION FOR FRONTEND DEPLOYMENT AND LOCALHOST ---
const allowedOrigins = [
  'https://eventeye-rouge.vercel.app',
  'http://localhost:3000',
  'https://localhost:3000'
];
app.use(
  require('cors')({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

// Add auth routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/matches', require('./routes/matches'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sponsorsync';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('SponsorSync backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
