const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const promptRoutes = require('./routes/promptRoutes');
const commentRoutes = require('./routes/commentRoutes');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

// Enable CORS for all origins 
app.use(cors()); 

// Handle JSON request bodies
app.use(express.json());


const connectDB = require('./config/db');
connectDB();  // Connect to MongoDB Atlas

// API Endpoints

// Routes
app.use('/api/prompts', promptRoutes); 

app.use('/api/users', userRoutes);

app.use('/api/comments', commentRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});