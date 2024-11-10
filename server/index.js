const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const { initSocket } = require('./socket/index');
const https =require('https');
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
const serverURL = `https://mern-chat-server-q9l2.onrender.com`; // Ensure this uses the correct protocol (http or https)

    setInterval(() => {
      https.get(serverURL, (res) => { // Change to https.get if using HTTP
        console.log(`Server pinged: ${res.statusCode}`);
      }).on("error", (err) => {
        console.error("Error pinging the server:", err.message);
      });
    }, 600000);

module.exports = app;
