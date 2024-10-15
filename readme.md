 

### Introduction
 Realtime Chat Application built with the MERN stack. 
 

### Feature
- JWT Authentication
- One-on-one **Private Chat** where users can chat with others privately.
- Create a room and start a **Room Chat** for users who want to broadcast messages to a specific group of users.
- Real-time updates to conversation messages, user online/ offline, read/ unread status, user join/leave room to notify, etc.
- Support both RWD and different themes with light and dark mode

### Technologies
- database - MongoDB
- backend - Express.js & Node.js
- frontend - React.js (with styled-components)
- Real-time messages - Socket.io

 ## for frontend
 Change .env.example file
   - change file name to .env
   - go to https://multiavatar.com to create an account and get your avatar api key
   - change the VITE_SERVER_URL to your local server port (ex. http://localhost:5000 for server listening to port 5000)

 ## for backend 
 
Change .env.example file
   - change file name to .env
   - go to [MongoDB Atlas](https://www.mongodb.com/atlas/database) to create a cluster and change the MONGO_URI  
   - change the CLIENT_URL to your local client port (ex. http://localhost:3000 for client running on port 3000)
   - generate random token for ACCESS/REFRESH_TOKEN_SECRET and also COOKIE_SIGNATURE

 
