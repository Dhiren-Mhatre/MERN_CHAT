const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const { initSocket } = require('./socket/index');

const app = express();
require('dotenv').config();

const corsOptions = {
  origin: true,
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SIGNATURE));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hi there!');
});

// Ping endpoint
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connection Success"))
  .catch((err) => console.log('DB connection Error', err.message));

// Start the server
const server = app.listen(process.env.PORT, () => {
  console.log(`App is listening to port ${process.env.PORT}`);
});

// Socket.io
initSocket(server, corsOptions);

// Self-ping every 10 minutes to keep the server active
const pingInterval = 1 * 60 * 1000; // 10 minutes in milliseconds
setInterval(async () => {
  try {
    const fetch = (await import('node-fetch')).default; // Dynamic import of node-fetch
    const response = await fetch(`http://localhost:${process.env.PORT}/ping`);
    if (!response.ok) {
      console.log('Ping failed:', response.status);
    } else {
      console.log('Ping successful:', response.status);
    }
  } catch (err) {
    console.error('Ping error:', err);
  }
}, pingInterval);

module.exports = app;
