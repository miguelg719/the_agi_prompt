const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all origins 
app.use(cors()); 

// Handle JSON request bodies
app.use(express.json());

// Import the Prompt model
const Prompt = require('./models/prompt');

const connectDB = require('./config/db');
connectDB();  // Connect to MongoDB Atlas

// API Endpoints

// Fetch all prompts from MongoDB
app.get('/api/prompts', async (req, res) => {
  try {
    const prompts = await Prompt.find();  // Retrieve all prompts
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving prompts' });
  }
});

// Fetch a single prompt by ID
app.get('/api/prompts/:id', async (req, res) => {
  const promptId = parseInt(req.params.id);

  try {
    const prompt = await Prompt.findOne({ id: promptId });  // Find by id field

    if (prompt) {
      res.json(prompt);
    } else {
      res.status(404).json({ message: 'Prompt not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving prompt' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});