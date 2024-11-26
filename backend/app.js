const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const promptRoutes = require('./routes/promptRoutes');
const commentRoutes = require('./routes/commentRoutes');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 5001;

// Configure CORS with specific options
app.use(cors({
  origin: [
    'https://the-agi-prompt-frontend.vercel.app',
    'http://localhost:3001' // for local development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle JSON request bodies
app.use(express.json());


const connectDB = require('./config/db');
connectDB();  // Connect to MongoDB Atlas

// API Endpoints
app.get("/", (req, res) => {
  res.send("Server deployed and running on vercel.");
});

// Routes
app.use('/api/prompts', promptRoutes); 

app.use('/api/users', userRoutes);

app.use('/api/comments', commentRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});