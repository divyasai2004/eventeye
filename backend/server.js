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
app.use(cors());
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
